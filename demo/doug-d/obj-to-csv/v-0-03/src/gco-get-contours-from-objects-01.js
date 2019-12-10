// copyright Theo Armour. MIT license.
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, meshPlane, controls */
// jshint esversion: 6
// jshint loopfunc: true



const GCO = {};

GCO.contoursLength = 128;
GCO.constant = 0;
GCO.tolerance = 0.001;

GCO.contourPoints = new THREE.Group();
GCO.contourSegments = new THREE.Group();
GCO.contourLines = new THREE.Group();

THREE.Vector3.prototype.equals = function(v, tolerance) {

	if (tolerance === undefined) {

		return v.x === this.x && v.y === this.y && v.z === this.z;

	} else {

		return (
			Math.abs(v.x - this.x) < tolerance &&
			Math.abs(v.y - this.y) < tolerance &&
			Math.abs(v.z - this.z) < tolerance
		);
	}

};



GCO.getMenu = function () {

	window.addEventListener("onresetall", GCO.reset, false);

	const htm =
		`
<details open>

	<summary>Get contour points</summary>

	<p>Adjust contour line parameters. Generate vertices. Draw points and lines.</p>

	<p>
		Toggles
	</p>

	<div>

		<input type=checkbox onchange="GCO.contourSegments.visible=!GCO.contourSegments.visible" checked >
		contour segments
	</div>
	<div>
		<input type=checkbox onchange="GCO.contourLines.visible=!GCO.contourLines.visible" checked >
		contour lines
	</div>

	<div>
		<input type=checkbox onchange="GCO.contourPoints.visible=!GCO.contourPoints.visible" checked >
		contour points
	</div>
	<div>
		<input type=checkbox onchange="mesh.visible=!mesh.visible" checked >
		model
	</div>



	<p>
		number of contours <output id=GCOoutContourCount >${ GCO.contoursLength }</output><br>
		<input type="range" id="GCOrngContoursCount" min=1 max=256 step=1 value=${ GCO.contoursLength }
		oninput="GCO.reset();GCO.contoursLength=this.value;GCOoutContourCount.innerHTML=this.value;" >
	</p>

	<p>
		<button title="pressMe" onclick=GCO.getContourPoints(); ><b>get multiple contours</b></button>
	</p>

	<hr>

	<p>
		contour position <output id=GCOoutContourPosition >${ GCO.constant + 50 }%</output><br>
		<input type="range" id="GCOrngContourPosition" min=0 max=100 step=1 value=${ GCO.constant + 50 }
		oninput="GCO.setContourPosition();" >
	</p>

	<p>
		<button title="pressMe" onclick=GCO.getContourSingle(); ><b>get single contour</b></button>
	</p>

	<div id=GCOdivMessage ></div>


</details>
`;

	return htm;

};


GCO.reset = function () {

	scene.remove(GCO.contourPoints, GCO.contourSegments, GCO.contourLines);

};



GCO.getContourSingle = function () {

	GCO.reset();

	GCO.contourPoints = new THREE.Group();
	GCO.contourSegments = new THREE.Group();
	GCO.contourLines = new THREE.Group();

	scene.add(GCO.contourPoints);
	scene.add(GCO.contourSegments);
	scene.add(GCO.contourLines);

	mesh.updateMatrix();

	const box3 = new THREE.Box3().setFromObject(mesh);
	const size = box3.getSize(new THREE.Vector3());

	GCO.constant = meshPlane.position.z;

	if (GCO.constant - box3.min.z < 0.001) {

		GCO.constant += 0.01;
	}

	GCO.getPoints();

	console.log('constant', GCO.constant);
	//add requestAnimationFrame

	GCO.getContourVertices();

};


GCO.setContourPosition = function () {

	mesh.geometry.computeBoundingBox();

	const size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());

	//console.log('size', size);

	meshPlane.position.z = size.z * GCOrngContourPosition.value / 100 - (0.5 * size.z);

	GCOoutContourPosition.innerHTML = 100 * GCOrngContourPosition.value / 100;

};



GCO.getContourPoints = function () {

	GCO.reset();

	GCO.contourPoints = new THREE.Group();
	GCO.contourSegments = new THREE.Group();
	GCO.contourLines = new THREE.Group();
	GCO.contourVertices = [];

	scene.add(GCO.contourPoints);
	scene.add(GCO.contourSegments);
	scene.add(GCO.contourLines);

	mesh.updateMatrix();

	const box3 = new THREE.Box3().setFromObject(mesh);
	const size = box3.getSize(new THREE.Vector3());
	const delta = size.z / GCO.contoursLength;

	GCO.elevations = [];

	for (let i = 0; i <= GCO.contoursLength; i++) {

		GCO.constant = i * delta + box3.min.z;

		if (GCO.constant - box3.min.z < 0.001) {

			GCO.constant += 0.01;

		} else if (GCO.constant - box3.max.z < 0.001) {

			GCO.constant -= 0.01;

		}

		meshPlane.position.z = GCO.constant;

		GCO.elevations.push( [ GCO.constant, 0 ] )

		//console.log('constant', GCO.constant);

		GCO.getPoints(); //add requestAnimationFrame

		GCOdivMessage.innerHTML = `<p>${i} height: ${GCO.constant.toFixed(2) } points: ${ GCO.contourPoints.children[ i ].geometry.vertices.length }</p>`;

	}

	GCO.getContourVertices();

};


GCO.getPoints = function () {

	GCO.pointsOfIntersection = new THREE.Geometry();
	GCO.contourSegment = new THREE.Group();

	const normal = new THREE.Vector3(0, 0, -1);

	const plane = new THREE.Plane(normal, GCO.constant);

	const a = new THREE.Vector3();
	const b = new THREE.Vector3();
	const c = new THREE.Vector3();

	const meshes = mesh.geometry ? [mesh] : mesh.children;

	for (let child of meshes) {

		//console.log('child', child);

		child.geometry = child.geometry.type === "BufferGeometry" ?
			new THREE.Geometry().fromBufferGeometry(child.geometry) : child.geometry;

		child.geometry.faces.forEach(function (face, idx) {

			child.localToWorld(a.copy(child.geometry.vertices[face.a]));
			child.localToWorld(b.copy(child.geometry.vertices[face.b]));
			child.localToWorld(c.copy(child.geometry.vertices[face.c]));

			const lineAB = new THREE.Line3(a, b);
			const lineBC = new THREE.Line3(b, c);
			const lineCA = new THREE.Line3(c, a);

			GCO.vertices = [];

			GCO.setPointOfIntersection(lineAB, plane, idx);
			GCO.setPointOfIntersection(lineBC, plane, idx);
			GCO.setPointOfIntersection(lineCA, plane, idx);

			if (GCO.vertices.length) {

				//console.log('vertices', GCO.vertices);
				const line = GCO.addLine(GCO.vertices);
				GCO.contourSegment.add(line);
			}

		});
	}

	const pointsMaterial = new THREE.PointsMaterial({ size: 3, color: 0xffffff * Math.random() });
	const points = new THREE.Points(GCO.pointsOfIntersection, pointsMaterial);

	GCO.contourPoints.add(points);
	//console.log('GCO.contourPoints', GCO.contourPoints );
	GCO.contourSegments.add(GCO.contourSegment);


};


GCO.setPointOfIntersection = function (line, plane, index ) {
	//console.log('plane', plane);

	const pointOfIntersection = plane.intersectLine(line, new THREE.Vector3());

	if (pointOfIntersection) {

		GCO.pointsOfIntersection.vertices.push(pointOfIntersection.clone());
		GCO.vertices.push(pointOfIntersection);

	}

};


GCO.addLine = function (vertices) {

	// const v = function (x, y, z) { return new THREE.Vector3(x, y, z); };
	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	const material = new THREE.LineBasicMaterial({ color: 0x000000 });
	const line = new THREE.Line(geometry, material);

	//GCO.contourLine.add( line );
	return line;

};



GCO.getContourVertices = function () {

	console.log('segments', GCO.contourSegments.children.length);

	GCO.contourSegments.children.forEach((contourSegments, index) => {

		const segments = contourSegments.children;

		const contourVertices = segments[0].geometry.vertices;
		//console.log('contourVertices', contourVertices );

		GCO.getNextVertex(contourVertices[1], contourVertices, segments.slice(1), index);
	} );

	GCO.test();

};


GCO.test = function() {

	//console.log('GCO.contourVertices', GCO.contourVertices);

	console.log('21', GCO.contourSegments.children[21]);

	segments21 = GCO.contourSegments.children[21].children;

	console.log('s21', segments21 );

	segments21.forEach(line => {

		vs = line.geometry.vertices;

		dis = vs[0].distanceTo(vs[1]);
		//console.log('dis', dis < GCO.tolerance, dis );

	} )



	// contourLines = GCO.contourLines.children;

	// console.log('cl', contourLines.length);

	// contourLines.forEach((line, index) => {

	// 	vertices = line.geometry.vertices;

	// 	const z = vertices[ 0 ].z

	// 	elev = GCO.elevations.find(elev => Math.abs( elev[0] - z ) < 0.001 )

	// 	if (elev) {

	// 		elev[1] += vertices.length;
	// 		idx = GCO.elevations.indexOf( elev )
	// 		//console.log('l', idx, index, vertices.length, elev[ 0], elev[ 1 ]);

	// 	} else {

	// 		console.log('zzzzzzz', z);
	// 	}


	// });

	//console.log('', GCO.elevations[66]);

	issues = GCO.elevations.filter(elev =>  elev[ 1 ] < 5 )

	//console.log('issues', issues);

}

GCO.getNextVertex = function (vertex, vertices, segments, count ) {

	let vertexFound;
	let vertexNext;
	let index;

	//if (count === 21) { console.log('ss', segments.length ); }

	idx = 0;
	for (let segment of segments) {

		idx++;
		const segmentVertices = segment.geometry.vertices;

		vertexFound = segmentVertices.find(segmentVertex => segmentVertex.equals(vertex, GCO.tolerance));

		if (vertexFound) {

			vertexNext = segmentVertices.find(vertex => vertex !== vertexFound);

			if (!vertexNext) { console.log('', 23);}

			vertices.push(vertexNext);

			index = segments.indexOf(segment);

			segments.splice(index, 1);

			if (segments.length) {


				GCO.getNextVertex(vertexNext, vertices, segments, count);

			} else {

				//console.log('idx', count, idx);
				line = GCO.addLine(vertices);

				line.material = new THREE.LineBasicMaterial({ color: 0xff0000 });

				GCO.contourLines.add(line);

				GCO.contourVertices.push( vertices )

			}

			break;

		} else {

			if (count > 20 && count < 22) {

				console.log('idx', count, idx, vertices.length, segments.length, idx === segments.length );

				if ( 265 === segments.length) {


					const line = GCO.addLine(vertices);

					line.material = new THREE.LineBasicMaterial({ color: 0xff0000 });

					GCO.contourLines.add(line);

					GCO.contourVertices.push(vertices);

					console.log('', idx, segments.length, line  );
					break;

				}

			}

			if (vertex.equals(vertices[0], GCO.tolerance)) {

				//console.log('', vertex, vertices[0], vertices.length, segments.length);

				const line = GCO.addLine(vertices);

				line.material = new THREE.LineBasicMaterial({ color: 0xff0000 });

				GCO.contourLines.add(line);

				GCO.contourVertices.push(vertices);


				const segment0 = segments[0];

				//if (!segment0) { continue; }

				const verticesContour = segment0.geometry.vertices;
				//console.log('verticesContour', verticesContour );

				GCO.getNextVertex(verticesContour[1], verticesContour, segments.slice(1), count );



				break;

			} else {

				//console.log('oops1');

				//if (count === 21) {

					// index = segments.indexOf(segment);

					// segments.splice(index, 1);

					//const segment0 = segments[0];

					// if ( segment0) {

					// 	const verticesContour = segment0.geometry.vertices;
					// 	//console.log('verticesContour', verticesContour );
					// 	GCO.getNextVertex(verticesContour[1], verticesContour, segments.slice(1), count);

					// }


				// 	const vs = segment.geometry.vertices
				// 	console.log('ss.len', segments.length, vertex, vs[ 0 ], vs[ 1 ]);
				// }
			}

		}

	}

};