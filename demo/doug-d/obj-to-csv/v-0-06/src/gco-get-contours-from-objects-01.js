// copyright Theo Armour. MIT license.
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, meshPlane, controls */
// jshint esversion: 6
// jshint loopfunc: true

const GCO = {};

GCO.contoursLength = 12;
GCO.constant = 0;
GCO.tolerance = 0.01;

GCO.contourLines = new THREE.Group();

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
			<input type=checkbox onchange="GCO.contours.visible=!GCO.contourLines.visible" checked >
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
		<button title="pressMe" onclick=GCO.getContourPoints(); ><b>get multiple contours</b></button>
	</p>

	<hr>

	<p>
		contour position <output id=GCOoutContourPosition >${GCO.constant + 50}</output>%<br>
		<input type="range" id="GCOrngContourPosition" min=0 max=100 step=1 value=${GCO.constant + 50}
		oninput="GCO.setContourPosition();" >
	</p>

	<p>
		<button title="pressMe" onclick=GCO.getContourPoints(1); ><b>get single contour</b></button>

		<button onclick=GCO.drawPointsOfIntersection(); >points of intersection</button>
	</p>

	<div id=GCOdivMessage ></div>


</details>
`;

	return htm;
};

GCO.reset = function () {

	scene.remove(GCO.contourPoints, GCO.contoursSegments, GCO.contourLines);

	contours = new THREE.Group();

	GCO.pointsOfIntersection = new THREE.Geometry();
	GCO.contourPoints = new THREE.Group();
	GCO.contoursSegments = new THREE.Group();
	GCO.contourLines = new THREE.Group();
	GCO.contourLines.name = "GCO.contourLines";

	GCO.contoursVertices = [];
	GCO.countFaces = 0;
	GCO.smallSegments = 0;

	// GCO.vertexFound = 0;
	// GCO.vertexNext = 0;
	GCO.verticesFound = 0;
	// GCO.notFound = 0;

	scene.add(GCO.contourPoints);
	scene.add(GCO.contoursSegments);
	//scene.add(GCO.contourLines);

	//meshPlane.position.z = -50;
	meshPlane.material.opacity = 0.2;

	MMS.setOpacity(85);

	mesh.material.opacity = 0.85;
	mesh.updateMatrix();

	GCOdivMessage.innerHTML = "";

	const checkBoxes = GCOdivToggles.querySelectorAll("input");

	checkBoxes.forEach( box => box.checked = true );

};

GCO.getMessage = function () {

	//GCO.contoursSegments.visible = false;
	mesh.material.opacity = 0.2;
	meshPlane.material.opacity = 0.2;

	const pts = GCO.contourPoints.children.reduce((acc, child) => {

		acc += child.geometry.vertices.length;

		return acc;
	}, 0);

	const segs = GCO.contoursSegments.children.reduce((acc, child) => {

		acc += child.children.length;

		return acc;
	}, 0);

	const lins = GCO.contourLines.children.length;


	const htm =
`
Plane elevation: ${ GCO.constant.toLocaleString()}<br>
Points of intersection: ${GCO.pointsOfIntersection.vertices.length.toLocaleString() }<br>
Faces: ${ GCO.countFaces.toLocaleString()}<br>

GCO.smallSegments: ${ GCO.smallSegments}<br>

GCO.verticesFound: ${ GCO.verticesFound.toLocaleString() }<br>
GCO.contourPoints: ${ pts }</br>
GCO.contoursSegments: ${ segs }</br>

GCO.contourLines: ${ lins }</br>
<!--
<br>
GCO.vertexFound: ${ GCO.vertexFound}<br>
GCO.vertexNext: ${ GCO.vertexNext}<br>
GCO.notFound: ${ GCO.notFound }<br>
-->
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

GCO.getContourPoints = function ( count =  GCO.contoursLength ) {

	GCO.reset();

	const box3 = new THREE.Box3().setFromObject(mesh);
	const size = box3.getSize(new THREE.Vector3());
	const delta = size.z / ( count - 1 );

	for (let i = 0; i < count; i++) {

		let elevation = i * delta + box3.min.z;

		elevation = count === 1 ? 0 : elevation;

		GCO.setContourPlaneElevation( elevation);

		GCO.getPointsOfIntersection(); //add requestAnimationFrame

		const contours = GCO.getContours();

		GCO.contourLines.add(contours);

	}

	GCOdivMessage.innerHTML = GCO.getMessage();

};


GCO.setContourPlaneElevation = function ( elevation = meshPlane.position.z ) {

	GCO.constant = elevation;

	const box3 = new THREE.Box3().setFromObject(mesh);

	if (GCO.constant - box3.min.z < 0.001) {

		GCO.constant += 0.01;

	} else if (GCO.constant - box3.max.z < 0.001) {

		GCO.constant -= 0.01;

	}

	meshPlane.position.z = GCO.constant;

}

GCO.getPointsOfIntersection = function () {

	//GCO.pointsOfIntersection = new THREE.Geometry();
	GCO.contourSegment = new THREE.Group();
	GCO.contoursSegments.add(GCO.contourSegment);

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
			//console.log('lineAB', lineAB);
			const lineBC = new THREE.Line3(b, c);
			const lineCA = new THREE.Line3(c, a);

			GCO.vertices = [];

			GCO.setPointOfIntersection(lineAB, plane, idx);
			GCO.setPointOfIntersection(lineBC, plane, idx);
			GCO.setPointOfIntersection(lineCA, plane, idx);

			if (GCO.vertices.length) {

				const segment = GCO.addLine(GCO.vertices);

				segment.geometry.computeBoundingSphere();
				radius = segment.geometry.boundingSphere.radius;
				if ( 2 * radius < GCO.tolerance) { GCO.smallSegments++ }

				GCO.contourSegment.add(segment);

			}

			GCO.verticesFound += GCO.vertices.length;
			GCO.countFaces++;

		} );
	}

	// const pointsMaterial = new THREE.PointsMaterial({ size: 2, color: 0xffffff * Math.random() });
	// const points = new THREE.Points(GCO.pointsOfIntersection, pointsMaterial);
	// GCO.contourPoints.add(points);

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


GCO.drawPointsOfIntersection = function () {

	const pointsMaterial = new THREE.PointsMaterial({ size: 3, color: 0xffffff * Math.random() });
	const points = new THREE.Points(GCO.pointsOfIntersection, pointsMaterial);
	GCO.contourPoints.add(points);

	// draw the jumble of lines;
	//line = GCO.addLine( points.geometry.vertices )
	//scene.add(line);

};



GCO.addLine = function (vertices) {

	// const v = function (x, y, z) { return new THREE.Vector3(x, y, z); };

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;
	const material = new THREE.LineBasicMaterial({color: 0x000000});
	const line = new THREE.Line(geometry, material);

	// v1 = vertices[0];
	// v2 = vertices[vertices.length - 1];

	// dir = v2.clone().sub(v1.clone()).normalize();
	// length = v1.distanceTo(v2);

	// const arrowHelper = new THREE.ArrowHelper( dir, v1, length, 0xffffff * Math.random() );
	// line.add(  arrowHelper );

	return line;

};


GCO.getContours = function () {

	const polygonVertices = getPolygons( GCO.pointsOfIntersection.vertices, [], true);
	//console.log("polygonVertices", polygonVertices);

	const contour = new THREE.Group();

	polygonVertices.forEach( vertices => {

		let geometry = new THREE.Geometry();

		geometry.vertices = vertices;

		const polygon = new THREE.Line(
			geometry,
			new THREE.LineBasicMaterial({
				color: Math.random() * 0xffffff //0x777777 + 0x777777
			})
		);

		contour.add( polygon );

	});


	return contour;


}



function getPolygons(points, segments, firstRun) {

	//console.log("firstRun:", firstRun);

	let segment = [];

	// find first line for the contour
	let firstPointIndex = 0;
	let secondPointIndex = 0;
	let firstPoint, secondPoint;

	for (let i = 0; i < points.length; i++) {

		if (points[i].checked == true) continue;

		firstPointIndex = i;
		firstPoint = points[firstPointIndex];
		firstPoint.checked = true;
		secondPointIndex = getPairIndex(firstPoint, firstPointIndex, points);
		secondPoint = points[secondPointIndex];
		secondPoint.checked = true;
		segment.push(firstPoint.clone());
		segment.push(secondPoint.clone());
		break;

	}

	segment = getSegment(secondPoint, points, segment);
	segments.push(segment);

	let allChecked = 0;

	points.forEach(p => {
		allChecked += p.checked === true ? 1 : 0;
	});
	//console.log("allChecked: ", allChecked == points.length);

	if (allChecked !== points.length) {

		return getPolygons( points, segments, false);

	}

	//console.log('segments', segments);
	return segments;

}

let pointPrevious

function getSegment(currentPoint, points, segment) {

	//if ( segment[ 0 ].equals( pointFirst, tolerance ) ) { console.log( '', 23 ); }
	if ( currentPoint === pointPrevious ) { return segment; }

	pointPrevious = currentPoint;

	let p1Index = getNearestPointIndex(currentPoint, points);
	let p1 = points[p1Index];
	p1.checked = true;

	let p2Index = getPairIndex(p1, p1Index, points);
	let p2 = points[p2Index];
	p2.checked = true;


	let isClosed = p2.equals(segment[0], GCO.tolerance);
	if ( !isClosed ) {

		//ctr = getSegment(p2, points, segment);
		//return segment;
		//console.log( '', currentPoint, segment );
		//if ( p2 && p2.x ) {

		if ( segment[ 0 ].equals( p2, tolerance ) ) {
			//console.log( 'p2', p2 )
			return segment;

		} else {

			segment.push(p2.clone());
			return getSegment(p2, points, segment);

		}

	} else {

		segment.push( segment[0].clone());
		return segment;
	}
}



function getNearestPointIndex(point, points) {

	// let index = 0;
	// for (let i = 0; i < points.length; i++) {
	// 	let p = points[i];
	// 	if (p.checked == false && p.equals(point, tolerance)) {
	// 		index = i;
	// 		break;
	// 	}
	// }
	// return index;

	//console.log('pp', points);
	let index = points.findIndex(p => ( p.checked === false && p.equals(point, GCO.tolerance ) ));

	//console.log('index', index);

	return index = index === -1 ? 0 : index;
}

function getPairIndex(point, pointIndex, points) {

	// let index = 0;
	// for (let i = 0; i < points.length; i++) {
	// 	let p = points[i];
	// 	if (i != pointIndex && p.checked == false && p.faceIndex == point.faceIndex) {
	// 		index = i;
	// 		break;
	// 	}
	// }
	// return index;

	let index = points.findIndex((p, idx) =>
		idx !== pointIndex && p.checked === false && p.faceIndex === point.faceIndex);

	//console.log('index', index);

	return index = index === -1 ? 0 : index;

}
