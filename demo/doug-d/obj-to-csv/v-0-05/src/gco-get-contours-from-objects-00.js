// copyright Theo Armour. MIT license.
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, meshPlane, controls */
// jshint esversion: 6
// jshint loopfunc: true

const GCO = {};

GCO.contoursLength = 12;
GCO.constant = 0;
GCO.tolerance = 0.01;

xxx = 0;

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

			<input type=checkbox onchange="GCO.contoursSegments.visible=!GCO.contoursSegments.visible" checked >
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

	scene.remove(GCO.contourPoints, GCO.contoursSegments, GCO.contourLines);

	GCO.contourPoints = new THREE.Group();
	GCO.contoursSegments = new THREE.Group();
	GCO.contourLines = new THREE.Group();
	GCO.contoursVertices = [];
	GCO.countFaces = 0;
	GCO.smallSegments = 0;

	GCO.vertexFound = 0;
	GCO.vertexNext = 0;
	GCO.verticesFound = 0;
	GCO.notFound = 0;

	//scene.add(GCO.contourPoints);
	scene.add(GCO.contoursSegments);
	scene.add(GCO.contourLines);

	meshPlane.position.z = -50;

	mesh.updateMatrix();

	GCOdivMessage.innerHTML = "";

	const checkBoxes = GCOdivToggles.querySelectorAll("input");

	checkBoxes.forEach( box => box.checked = true );

};

GCO.getMessage = function () {

	pts = GCO.contourPoints.children.reduce((acc, child) => {

		acc += child.geometry.vertices.length;

		return acc;
	}, 0);

	segs = GCO.contoursSegments.children.reduce((acc, child) => {

		acc += child.children.length;

		return acc;
	}, 0);

	lins = GCO.contourLines.children.reduce((acc, child) => {

		acc += child.children.length

		return acc;

	}, 0);


	const htm =
`
GCO.constant: ${ GCO.constant}<br>
GCO.pointsOfIntersection: ${GCO.pointsOfIntersection.vertices.length}<br>
GCO.countFaces: ${ GCO.countFaces}<br>
GCO.smallSegments: ${ GCO.smallSegments}<br>

GCO.contourPoints: ${ pts }</br>
GCO.contoursSegments: ${ segs }</br>

GCO.contourLines: ${ lins }</br>
<br>
GCO.vertexFound: ${ GCO.vertexFound}<br>
GCO.vertexNext: ${ GCO.vertexNext}<br>
GCO.verticesFound: ${ GCO.verticesFound}<br>
GCO.notFound: ${ GCO.notFound }<br>
`;

	return htm;

};


GCO.setContourPosition = function () {

	mesh.geometry.computeBoundingBox();

	const size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());

	//console.log('size', size);

	meshPlane.position.z = (size.z * GCOrngContourPosition.value) / 100 - 0.5 * size.z;

	GCOoutContourPosition.innerHTML = (100 * GCOrngContourPosition.value) / 100;

};

GCO.getContourPoints = function () {

	GCO.reset();

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

		GCO.getPointsOfIntersection(); //add requestAnimationFrame

		// GCOdivMessage.innerHTML = `<p>${i} height: ${GCO.constant.toFixed(2)} points: ${
		// 	GCO.contourPoints.children[i].geometry.vertices.length
		// 	}</p>`;

	}

	//GCO.getContourVertices();

	GCOdivMessage.innerHTML = GCO.getMessage();
};




GCO.getContourSingle = function() {
	GCO.reset();

	meshPlane.position.z = 0;

	GCO.constant = meshPlane.position.z;

	const box3 = new THREE.Box3().setFromObject(mesh);

	// if (GCO.constant - box3.min.z < 0.001) {
	// 	GCO.constant += 0.01;
	// } else if (GCO.constant - box3.max.z < 0.001) {
	// 	GCO.constant -= 0.01;
	// }

	GCO.getPointsOfIntersection();

	//GCO.getContourVertices();

	GCO.joinSegments();

	GCOdivMessage.innerHTML = GCO.getMessage();
};



GCO.joinSegments = function () {

	const segments = GCO.contourSegment.children;
	//console.log('segments', segments);

	GCO.segPairs = segments.map( seg => [ seg.geometry.vertices[0], seg.geometry.vertices[1] ] )
	console.log('GCO.segVertices', GCO.segVertices);

	segmentStart = GCO.segPairs[0];

	polygon = [...segmentStart];
	//console.log('polygon', polygon);

	polygons = [];

	GCO.findMatch(segmentStart);

	//segments.forEach( child => child.visible = false );

}


GCO.findMatch = function (segment) {
	//console.log('segment', segment);

	let polygonLast = polygon[ polygon.length - 1 ]

	const pairs0 = GCO.segPairs.filter(pair => { // finds current segment and two adjoining segments
		match1 = GCO.getVertexMatch(segment[0], pair[0]);
		match2 = GCO.getVertexMatch(segment[0], pair[1]);
		match3 = GCO.getVertexMatch(segment[1], pair[0]);
		match4 = GCO.getVertexMatch(segment[1], pair[1]);
		return match1 || match2 || match3 || match4;
	});
	//console.log('pairs0', pairs0);


	const segmentsAdjoin = pairs0.filter(pair => { // drop current segment - leaves two adjoining

		match1 = GCO.getVertexMatch(segment[0], pair[0]);
		//match2 = !GCO.getVertexMatch(segment[0], pair[1]);
		//match3 = !GCO.getVertexMatch(segment[1], pair[0]);
		match4 = GCO.getVertexMatch(segment[1], pair[1]);

		//console.log('p1', match1, match4);
		return ( match1 && match4 ) === false;

	});
	//console.log('segmentsAdjoin', segmentsAdjoin);

	const segmentNext = segmentsAdjoin.find(pair => {

		match1 = GCO.getVertexMatch( pair[0], polygonLast );

		match2 = GCO.getVertexMatch( pair[1], polygonLast );

		//console.log('snext', match1, match2);
		return match1 || match2;

	});


	if (segmentNext) {

		console.log('segmentNext', segmentNext );

		index = GCO.segPairs.indexOf(segmentNext);

		console.log('index', index);

		vertexNext = GCO.getVertexMatch( polygonLast, segmentNext[ 0 ] ) ? segmentNext[ 1 ] : segmentNext[ 0 ];

		backToStart = GCO.getVertexMatch( vertexNext, polygon[ 0 ]);

		console.log('backToStart', backToStart);


		xxx++;

		if (xxx > 500 ) return;

		if (!backToStart) {

			polygon.push( vertexNext)

			console.log('polygon', polygon);
			
			GCO.findMatch(segmentNext);


		} else {

			const line = GCO.addLine( polygon );

			line.material = new THREE.LineBasicMaterial({color: 0xff00ff });

			GCO.contourLines.add(line);


			console.log('segmentsAdjoin', segmentsAdjoin);

			segmentGo = GCO.segPairs[index + 1];

			polygons.push(polygon);

			polygon = [...segmentGo];

			GCO.findMatch(segmentGo);


		}


	}

}


GCO.getVertexMatch = function (vertex1, vertex2) {

	const tolerance = 0.001;

	const match =
	Math.abs(vertex1.x - vertex2.x) < tolerance &&
	Math.abs(vertex1.y - vertex2.y) < tolerance &&
	Math.abs(vertex1.z - vertex2.z) < tolerance ?
	true : false;

	//console.log('match', match);

	return match;

};



GCO.getPointsOfIntersection = function () {

	GCO.pointsOfIntersection = new THREE.Geometry();
	GCO.contourSegment = new THREE.Group();
	GCO.contoursSegments.add(GCO.contourSegment);

	const normal = new THREE.Vector3(0, 0, -1);

	const plane = new THREE.Plane(normal, GCO.constant);

	const a = new THREE.Vector3();
	const b = new THREE.Vector3();
	const c = new THREE.Vector3();

	const meshes = mesh.geometry ? [mesh] : mesh.children;

	let count;

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
			//console.log('lineAB', lineAB);
			const lineBC = new THREE.Line3(b, c);
			const lineCA = new THREE.Line3(c, a);

			GCO.vertices = [];

			GCO.setPointOfIntersection(lineAB, plane, idx);
			GCO.setPointOfIntersection(lineBC, plane, idx);
			GCO.setPointOfIntersection(lineCA, plane, idx);

			if (GCO.vertices.length) {
				//console.log('vertices', GCO.vertices.length);

				const segment = GCO.addLine(GCO.vertices);

				segment.geometry.computeBoundingSphere();
				radius = segment.geometry.boundingSphere.radius;
				if ( 2 * radius < GCO.tolerance) { GCO.smallSegments++ }

				GCO.contourSegment.add(segment);

			}

			GCO.countFaces++;

		} );
	}

	const pointsMaterial = new THREE.PointsMaterial({ size: 2, color: 0xffffff * Math.random() });
	const points = new THREE.Points(GCO.pointsOfIntersection, pointsMaterial);
	GCO.contourPoints.add(points);

	//console.log('GCO.contourPoints', GCO.contourPoints.children[ 0 ].geometry.vertices.length );

	//line = GCO.addLine( points.geometry.vertices )

	//scene.add( line )
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



GCO.addLine = function (vertices) {

	// const v = function (x, y, z) { return new THREE.Vector3(x, y, z); };

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	const material = new THREE.LineBasicMaterial({color: 0x000000});
	const line = new THREE.Line(geometry, material);

	v1 = vertices[0];
	v2 = vertices[vertices.length - 1];

	dir = v2.clone().sub(v1.clone()).normalize();
	length = v1.distanceTo(v2);

	var arrowHelper = new THREE.ArrowHelper( dir, v1, length, 0xffffff * Math.random() );

	scene.add(  arrowHelper );

	return line;

};



GCO.getContourVertices = function () {

	for (let contourSegments of GCO.contoursSegments.children) {

		//contourLine = GCO.contoursSegments.children[1];
		GCO.contourSegments = contourSegments.clone().children;

		GCO.contourVertices = [];
		GCO.contoursVertices.push(GCO.contourVertices);
		GCO.contourLine = new THREE.Group();
		GCO.contourLines.add(GCO.contourLine);

		//const segments = contourSegments.children;
		//console.log('segments', segments);

		const contourVertices = GCO.contourSegments[ 0 ].geometry.vertices;
		//console.log('contourVertices', contourVertices );

		GCO.vertexStart = contourVertices[0];

		GCO.getNextVertex(contourVertices[ 1 ], contourVertices );

	}

};




GCO.getNextVertex = function (vertex, contourVertices) {

	//console.log('vertex', vertex, segments.length);

	let vertexFound;
	let vertexNext;
	let verticesFound = 0;
	let index = 0;
	let verticesSegment;
	let segment;
	let obj;

	obj = GCO.findVertex(vertex);

	if (obj) {

		GCO.vertexFound++;

		const vertexNext = obj.segment.geometry.vertices.find(vertex => !obj.vertexFound.equals(vertex, GCO.tolerance));

		if (vertexNext) {

			GCO.processVertex( vertexNext, contourVertices )

		}
		//break;

	} else {

		// //console.log('not found');
		///const obj = GCO.findVertex(vertex, GCO.contourSegments);

		// if (obj) {

		// 	console.log('', thing);

			//GCO.processVertex(obj.vertex, obj.segement)

			// vertexFound = vertex;

			// const index = segments.indexOf(segment);

			// segments.splice(index, 1);

			// verticesSegment = segment.geometry.vertices;

			// vertexNextNext = verticesSegment.find(vertex => !vertexFound.equals(vertex, GCO.tolerance));

			// break;

		// } else {

		// 	GCO.notFound++;

		// }

	}

}


GCO.findVertex = function( vertex ) {

	//console.log( index, 'not found vertex', vertex);
	// console.log("vertex start", GCO.vertexStart);
	// console.log('verticesSegment 0', verticesSegment[ 0 ]);
	// console.log('verticesSegment 1', verticesSegment[ 1 ]);
	//console.log('segments', segments);
	//console.log('GCO.contourSegments', GCO.contourSegments);


	for (segment of GCO.contourSegments ) {

		//console.log('segment', segment);

		const verticesSegment = segment.geometry.vertices;
		//console.log('verticesSegment', verticesSegment);

		const vertexFound = verticesSegment.find(vertexSegment =>
			vertexSegment.equals(vertex, GCO.tolerance ));

		if (vertexFound) {

			//console.log('found', vertexFound, segment );

			return { vertexFound, segment };

		}

	}

}


GCO.processVertex = function( vertexNext, contourVertices, segment ) {

	GCO.vertexNext++;

	segments = GCO.contourSegments;

	//const index = segments.indexOf( segment );

	//segments.splice(index, 1);

	contourVertices.push(vertexNext);

	if ( vertexNext.equals( GCO.vertexStart, GCO.tolerance)) {

		const line = GCO.addLine( contourVertices );

		line.material = new THREE.LineBasicMaterial({color: 0xffffff * Math.random() });

		GCO.contourLine.add(line);

		//const index = segments.indexOf(segment);

		// if (segments.length > 1) {

		// 	segments.splice(index, 1);
		// 	//console.log('seg', segments);

		// }

		//console.log('segments', segments);

		//if (segments.length) {

			contourVertices = segments[0].geometry.vertices;
			//console.log('contourVertices', contourVertices );

			vertexNext = contourVertices[0];

			GCO.vertexStart = vertexNext;

		//}

	}

	GCO.getNextVertex(vertexNext, contourVertices );

}


/*

	else {


		if (vertexFound) {

			GCO.vertexFound++;

			const index = segments.indexOf(segment);

			segments.splice(index, 1);

			GCO.vertexStart = vertexNext;

			vertexNext = verticesSegment.find(vertex => !vertexFound.equals(vertex, GCO.tolerance));


		} else {

			console.log('not found ', vertex);

			const index = segments.indexOf(segment);

			if (segments.length > 1) {

				segments.splice(index, 1);
				//console.log('seg', segments);
				contourVertices = segments[0].geometry.vertices;
				//console.log('contourVertices', contourVertices );
			}

			vertexNext = contourVertices[0];

			//GCO.vertexStart = vertexNext;

			//GCO.getNextVertex(vertexNext, contourVertices, segments);

		}

		if (vertexNext) {

			GCO.vertexNext++;

			// console.log('vertexNext New', vertexNext);

			// const index = segments.indexOf(segment);

			// if (segments.length > 1) {
			// 	segments.splice(index, 1);
			// 	//console.log('seg', segments);
			// 	contourVertices = segments[0].geometry.vertices;
			// 	//console.log('contourVertices', contourVertices );
			// }

			// vertexNext = contourVertices[0];

			GCO.vertexStart = vertexNext;

			GCO.getNextVertex(vertexNext, contourVertices, segments);

		}

	}

};

*/


GCO.secondPass = function () {

	idx = 0;
	xxx = 0

	for (contourLine of GCO.contourLines.children) {

		if (contourLine.children.length > 1) {

			//console.log('contourLine.children', idx, contourLine.children);


			contourLine.children

			GCO.verticesFirst = [];

			ccc = 0;
			for (let line of contourLine.children) {

				lll= GCO.addLine( line.geometry.vertices )

				lll.position.z += 10 + 3 * ccc++;

				lll.material = new THREE.LineBasicMaterial({color: 0xffffff * Math.random() });
				scene.add(lll)
				//console.log('lll', lll);

				lll.geometry.computeBoundingSphere()
				if (lll.geometry && lll.geometry.boundingSphere.radius < 0.01) {

					console.log( 'small', xxx++, lll, lll.geometry.boundingSphere.radius );
				}

				vertex = line.geometry.vertices[ 0 ];

				GCO.verticesFirst.push(vertex);
			}


			//console.log('GCO.verticesFirst', GCO.verticesFirst);

			const line = contourLine.children[0]

			GCO.getNextLine(line, contourLine, line.geometry.vertices);

			idx++;

		} else {

			console.log('short line ');

		}

	}

}


GCO.getNextLine = function( line, contourLine, verticesNew ) {

	vertexLast = line.geometry.vertices[ line.geometry.vertices.length - 1 ];

	console.log('vl', vertexLast );


	for (vertex of GCO.verticesFirst) {

		//console.log('vertex', vertex);


		if (vertex.equals(vertexLast, GCO.tolerance)) {

			idx = GCO.verticesFirst.indexOf( vertex )
			console.log('bingo', idx, contourLine.children[ idx ] );

			verticesNew.push( ...contourLine.children[ idx ].geometry.vertices)

			break;
		}

	}

}

