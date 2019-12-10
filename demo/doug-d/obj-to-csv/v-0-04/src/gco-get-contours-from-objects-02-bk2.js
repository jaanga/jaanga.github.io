// copyright Theo Armour. MIT license.
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, meshPlane, controls */
// jshint esversion: 6
// jshint loopfunc: true

const GCO = {};

GCO.contoursLength = 12;
GCO.constant = 0;
GCO.tolerance = 0.01;

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

	const htm = `
<details open>

	<summary>Get contour points</summary>

	<p>Adjust contour line parameters. Generate vertices. Draw points and lines.</p>

	<div id=GCOdivToggles >
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
	</div>


	<p>
		number of contours <output id=GCOoutContourCount >${GCO.contoursLength}</output><br>
		<input type="range" id="GCOrngContoursCount" min=1 max=256 step=1 value=${GCO.contoursLength}
		oninput="GCO.reset();GCO.contoursLength=this.value;GCOoutContourCount.innerHTML=this.value;" >
	</p>

	<p>
		<button id="pressMe" onclick=GCO.getContourPoints(); ><b>get multiple contours</b></button>
	</p>

	<hr>

	<p>
		contour position <output id=GCOoutContourPosition >${GCO.constant + 50}%</output><br>
		<input type="range" id="GCOrngContourPosition" min=0 max=100 step=1 value=${GCO.constant + 50}
		oninput="GCO.setContourPosition();" >
	</p>

	<p>
		<button id="pressMe" onclick=GCO.getContourSingle(); ><b>get single contour</b></button>
	</p>

	<div id=GCOdivMessage ></div>


</details>
`;

	return htm;
};

GCO.reset = function () {

	meshPlane.position.z = -50;

	scene.remove(GCO.contourPoints, GCO.contourSegments, GCO.contourLines);

	const checkBoxes = GCOdivToggles.querySelectorAll("input");

	checkBoxes.forEach( box => box.checked = true );

};





GCO.getContourSingle = function() {
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
	} else if (GCO.constant - box3.max.z < 0.001) {
		GCO.constant -= 0.01;
	}

	GCO.Intersection();

	console.log("constant", GCO.constant);
	//add requestAnimationFrame

	GCO.getContourVertices();
};

GCO.setContourPosition = function() {
	mesh.geometry.computeBoundingBox();

	const size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());

	//console.log('size', size);

	meshPlane.position.z = (size.z * GCOrngContourPosition.value) / 100 - 0.5 * size.z;

	GCOoutContourPosition.innerHTML = (100 * GCOrngContourPosition.value) / 100;
};

GCO.getContourPoints = function () {

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
	const delta = size.z / ( GCO.contoursLength - 1 );

	for (let i = 0; i < GCO.contoursLength; i++) {

		GCO.constant = i * delta + box3.min.z;

		if (GCO.constant - box3.min.z < 0.001) {
			GCO.constant += 0.01;
		} else if (GCO.constant - box3.max.z < 0.001) {
			GCO.constant -= 0.01;
		}

		meshPlane.position.z = GCO.constant;

		//console.log('constant', GCO.constant);

		GCO.Intersection(); //add requestAnimationFrame

		GCOdivMessage.innerHTML = `<p>${i} height: ${GCO.constant.toFixed(2)} points: ${
			GCO.contourPoints.children[i].geometry.vertices.length
		}</p>`;
	}

	GCO.getContourVertices();
};



GCO.Intersection = function () {

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

		child.geometry =
			child.geometry.type === "BufferGeometry"
				? new THREE.Geometry().fromBufferGeometry(child.geometry)
				: child.geometry;

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
				const segment = GCO.addLine(GCO.vertices);
				GCO.contourSegment.add(segment);
			}

		});
	}

	const pointsMaterial = new THREE.PointsMaterial({size: 3, color: 0xffffff * Math.random()});
	const points = new THREE.Points(GCO.pointsOfIntersection, pointsMaterial);

	GCO.contourPoints.add(points);
	//console.log('GCO.contourPoints', GCO.contourPoints );

	GCO.contourSegments.add(GCO.contourSegment);
};


// to be simplified

GCO.setPointOfIntersection = function(line, plane, index) {
	//console.log('plane', plane);

	const pointOfIntersection = plane.intersectLine(line, new THREE.Vector3());

	if (pointOfIntersection) {
		GCO.pointsOfIntersection.vertices.push(pointOfIntersection.clone());
		GCO.vertices.push(pointOfIntersection.clone());
	}


};



GCO.addLine = function(vertices) {
	// const v = function (x, y, z) { return new THREE.Vector3(x, y, z); };

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	const material = new THREE.LineBasicMaterial({color: 0x000000});
	const line = new THREE.Line(geometry, material);

	return line;

};



GCO.getContourVertices = function () {

	for (let contourSegments of GCO.contourSegments.children) {
		//contourLine = GCO.contourSegments.children[1];

		GCO.contourLine = new THREE.Group();
		GCO.contourVertices = [];

		const segments = contourSegments.children;
		//console.log('segments', segments);

		const contourVertices = segments[0].geometry.vertices;
		//console.log('contourVertices', contourVertices );

		GCO.getNextVertex(contourVertices[0], contourVertices, segments.slice(1));

	}

	let idx = 0;
	GCO.contourLines.children.forEach( child => child.children.forEach( line => idx++))
	console.log('lines', idx);
};



GCO.getNextVertex = function (vertex, contourVertices, segments) {

	//console.log('vertex', vertex, segments.length);

	let vertexFound;
	let vertexNext;
	let index;

	for (let segment of segments) {

		const verticesSegment = segment.geometry.vertices;
		// console.log('verticesSegment', verticesSegment);

		vertexFound = verticesSegment.find(vertexSegment =>
			vertexSegment.equals(vertex, GCO.tolerance)
		);




		verticesFound = verticesSegment.filter(vertexSegment =>
			vertexSegment.equals(vertex, GCO.tolerance)
		);

		if (verticesFound.length) {

			//console.log('segments.length', segments.length );
			//console.log('vertices found ', verticesFound.length);

			if (verticesFound.length === 2) {
				//console.log('v0=v1', verticesFound[ 0 ].equals(verticesFound[1 ], GCO.tolerance));

				if (verticesFound[0].equals(verticesFound[1], GCO.tolerance)) {

					index = segments.indexOf(segment);
					//console.log('index', index);
					segments.splice(index, 1);

					break;

				};

				//console.log('vertex', vertex);
				//console.log('vert found 0', verticesFound[ 0 ] );
				//console.log('vert found 1', verticesFound[1]);
				//console.log('v=v0', verticesFound[ 0 ].equals(vertex, GCO.tolerance));

				//vertexNext = verticesSegment.find(vertex => !verticesFound[ 0 ].equals(vertex, GCO.tolerance));
			};


		}



		if (vertexFound) {

			index = segments.indexOf(segment);

			//console.log('next', vertexFound.equals(vertexNext, GCO.tolerance))

			vertexNext = verticesSegment.find(vertex => !vertexFound.equals(vertex, GCO.tolerance));

			// if (vertexNext) {

			// 	console.log('found = next', vertexFound.equals(vertexNext, GCO.tolerance))

			// }

			break;

		}

	}


	if (vertexNext) {

		//console.log("vertexFound", vertexFound, "vertexNext", vertexNext);

		contourVertices.push(vertexNext);

		segments.splice(index, 1);

		GCO.getNextVertex(vertexNext, contourVertices, segments)

	} else {

		if (GCO.contourLine.children.length) {

			const lineLast = GCO.contourLine.children[ GCO.contourLine.children.length - 1 ]

			const vertexLast = lineLast.geometry.vertices[1];

			if ( vertexLast && vertexLast.equals( contourVertices[ 0] , GCO.tolerance )) {

		 		//console.log(' skip one' );
			 	contourVertices.shift()

			}

		}

		GCO.contourVertices.push(...contourVertices);

		const line = GCO.addLine( contourVertices);

		line.material = new THREE.LineBasicMaterial({color: 0xffffff * Math.random() });

		GCO.contourLine.add(line);

		if (segments.length) {

			contourVertices = segments[ 0 ].geometry.vertices;

			GCO.getNextVertex(contourVertices[0], contourVertices, segments.slice( 1 ) )

		} else {

			GCO.contourLines.add( GCO.contourLine );

		}

	}

};
