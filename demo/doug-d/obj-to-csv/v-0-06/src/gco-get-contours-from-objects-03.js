// copyright Theo Armour. MIT license.
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, meshPlane, controls */
// jshint esversion: 6
// jshint loopfunc: true

let count = 12
let limit = 1;

let plane;
let points;
let contour;
let contours = new THREE.Group();
let pointsOfIntersection;
let contourGroup;
let tolerance = 0.01;
const GCO = {};

GCO.contoursLength = 12;
GCO.constant = 0;
GCO.tolerance = 0.01;

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
		<button title="pressMe" onclick=GCO.getContourPoints(12); ><b>get multiple contours</b></button>
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
	pointsOfIntersection = new THREE.Geometry();

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

	meshPlane.geometry.center()
	meshPlane.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -50));

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

	iii = 0
	count = 12;

	const box3 = new THREE.Box3().setFromObject(mesh);
	const size = box3.getSize(new THREE.Vector3());
	delta = size.z / ( count - 1 );

	meshPlane.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, -delta  + 1 ) );

	// for (let i = 0; i < count; i++) {

	// 	let elevation = i * delta + box3.min.z;

	// 	elevation = count === 1 ? 0 : elevation;

	// 	GCO.setContourPlaneElevation(elevation);

	// 	meshPlane.position.z = elevation;

	// 	//


	// }

	drawContour();

	GCOdivMessage.innerHTML = GCO.getMessage();

	scene.add( contours );

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



function drawContours(lim = 1) {

	bBox = new THREE.Box3().setFromObject( mesh );

	pointsOfIntersection = new THREE.Geometry();
	contours = new THREE.Group();

	// count = 0
	// limit = lim;

	const height = bBox.max.z - bBox.min.z;
	delta = height / limit;

	if ( limit > 1 ) {

		delta = height / limit;
		meshPlane.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, -delta  + 1 ) );

	} else {

		delta = height / 2
		//meshPlane.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0.5 * height ) );

	}

	drawContour();

}


function drawContour() {

	if ( iii < count ) {

		iii++;

		meshPlane.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, delta));
		meshPlane.updateMatrix();

		console.log('meshPlane.position.z', meshPlane.position.z);

		drawIntersectionPoints();

	} else {

		scene.add( contours );

	}

}

function drawIntersectionPoints() { // split into separate functions to reduce redundancy

	var mathPlane = new THREE.Plane();

	const planePointA = new THREE.Vector3();
	const planePointB = new THREE.Vector3();
	const planePointC = new THREE.Vector3();

	meshPlane.updateMatrix();

	meshPlane.localToWorld(
		planePointA.copy(meshPlane.geometry.vertices[meshPlane.geometry.faces[0].a])
	);
	meshPlane.localToWorld(
		planePointB.copy(meshPlane.geometry.vertices[meshPlane.geometry.faces[0].b])
	);
	meshPlane.localToWorld(
		planePointC.copy(meshPlane.geometry.vertices[meshPlane.geometry.faces[0].c])
	);

	mathPlane.setFromCoplanarPoints(planePointA, planePointB, planePointC);

	var a = new THREE.Vector3(),
	b = new THREE.Vector3(),
	c = new THREE.Vector3();

	mesh.geometry.faces.forEach(function(face, idx) {

		mesh.localToWorld(a.copy(mesh.geometry.vertices[face.a]));
		mesh.localToWorld(b.copy(mesh.geometry.vertices[face.b]));
		mesh.localToWorld(c.copy(mesh.geometry.vertices[face.c]));

		const lineAB = new THREE.Line3(a, b);
		const lineBC = new THREE.Line3(b, c);
		const lineCA = new THREE.Line3(c, a);

		setPointOfIntersection(lineAB, mathPlane, idx);
		setPointOfIntersection(lineBC, mathPlane, idx);
		setPointOfIntersection(lineCA, mathPlane, idx);

	});

	var pointsMaterial = new THREE.PointsMaterial({
		size: 3,
		color: 0x00ff00
	});

	const points = new THREE.Points(pointsOfIntersection, pointsMaterial);
	//console.log('points', points);
	scene.add(points);


	const segmentVertices = getContours(pointsOfIntersection.vertices, [], true);

	const contour = new THREE.Group();

	segmentVertices.forEach( vertices => {

		let geometry = new THREE.Geometry();

		//console.log( 'vv', vertices );

		geometry.vertices = vertices;

		const line = new THREE.Line(
			geometry,
			new THREE.LineBasicMaterial({
				color: Math.random() * 0xffffff //0x777777 + 0x777777
			})
		);

		contour.add(line);

	});

	contours.add( contour );

	//console.log("segmentVertices", segmentVertices);
	drawContour();

}


function setPointOfIntersection(line, plane, faceIdx) {

	//console.log("line", line);

	const pointOfIntersection = plane.intersectLine( line, new THREE.Vector3() );

	if (pointOfIntersection) {

		let p = pointOfIntersection.clone();
		p.faceIndex = faceIdx;
		p.checked = false;
		pointsOfIntersection.vertices.push(p);

	}
}


function getContours(points, contours, firstRun) {

	//console.log("firstRun:", firstRun);

	let contour = [];

	// find first line for the contour
	let firstPointIndex = 0;
	let secondPointIndex = 0;
	let firsPoint, secondPoint;

	for (let i = 0; i < points.length; i++) {

		if (points[i].checked == true) continue;

		firstPointIndex = i;
		firstPoint = points[firstPointIndex];
		firstPoint.checked = true;
		secondPointIndex = getPairIndex(firstPoint, firstPointIndex, points);
		secondPoint = points[secondPointIndex];
		secondPoint.checked = true;
		contour.push(firstPoint.clone());
		contour.push(secondPoint.clone());
		break;

	}

	contour = getContour(secondPoint, points, contour);
	contours.push(contour);

	let allChecked = 0;
	points.forEach(p => {
		allChecked += p.checked === true ? 1 : 0;
	});
	//console.log("allChecked: ", allChecked == points.length);

	if (allChecked !== points.length) {

		return getContours( points, contours, false);

	}

	return contours;
}

let pointPrevious

function getContour(currentPoint, points, contour) {

	//if ( contour[ 0 ].equals( pointFirst, tolerance ) ) { console.log( '', 23 ); }
	if ( currentPoint === pointPrevious ) { return contour; }

	pointPrevious = currentPoint;

	let p1Index = getNearestPointIndex(currentPoint, points);
	let p1 = points[p1Index];
	p1.checked = true;
	let p2Index = getPairIndex(p1, p1Index, points);
	let p2 = points[p2Index];
	p2.checked = true;
	const tmp = contour[ 0 ];
	let isClosed = p2.equals(contour[0], tolerance);
	if ( !isClosed ) {

		//ctr = getContour(p2, points, contour);
		//return contour;
		//console.log( '', currentPoint, contour );
		//if ( p2 && p2.x ) {

		if ( contour[ 0 ].equals( p2, tolerance ) ) {
			//console.log( 'p2', p2 )
			return contour;

		} else {

			contour.push(p2.clone());
			return getContour(p2, points, contour);

		}

	} else {

		contour.push( contour[0].clone());
		return contour;
	}
}

function getNearestPointIndex(point, points) {

	let index = 0;
	for (let i = 0; i < points.length; i++) {
		let p = points[i];
		if (p.checked == false && p.equals(point, tolerance)) {
			index = i;
			break;
		}
	}
	return index;

}

function getPairIndex(point, pointIndex, points) {

	let index = 0;
	for (let i = 0; i < points.length; i++) {
		let p = points[i];
		if (i != pointIndex && p.checked == false && p.faceIndex == point.faceIndex) {
			index = i;
			break;
		}
	}
	return index;

}
