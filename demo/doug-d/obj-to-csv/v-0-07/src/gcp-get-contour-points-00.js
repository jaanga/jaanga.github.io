// copyright Theo Armour. MIT license.
/* global THREE, MMS, GCOdivToggles, GCOchkLabels, drawPlacard, GCOdivMessage, GCOchkPoints,
GCOrngContoursCount, GCOoutContourCount, GCOrngContourPosition, GCOoutContourPosition, GCOdivStatsNew,
scene, mesh, meshPlane */
// jshint esversion: 6
// jshint loopfunc: true

const GCP = {};


GCP.tolerance = 0.01;
var contours;

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

GCP.pointOfIntersection = new THREE.Vector3();
GCP.pointsOfIntersection = new THREE.Geometry();


var a = new THREE.Vector3(),
	b = new THREE.Vector3(),
	c = new THREE.Vector3();

var planePointA = new THREE.Vector3(),
	planePointB = new THREE.Vector3(),
	planePointC = new THREE.Vector3();

var lineAB = new THREE.Line3(),
	lineBC = new THREE.Line3(),
	lineCA = new THREE.Line3();


GCP.drawIntersectionPoints = function () {

	var mathPlane = new THREE.Plane();
	plane.localToWorld(planePointA.copy(plane.geometry.vertices[plane.geometry.faces[0].a]));
	plane.localToWorld(planePointB.copy(plane.geometry.vertices[plane.geometry.faces[0].b]));
	plane.localToWorld(planePointC.copy(plane.geometry.vertices[plane.geometry.faces[0].c]));
	mathPlane.setFromCoplanarPoints(planePointA, planePointB, planePointC);

	obj = mesh;

	obj.geometry = new THREE.Geometry().fromBufferGeometry( obj.geometry)
	obj.geometry.faces.forEach(function(face, idx) {
	  obj.localToWorld(a.copy(obj.geometry.vertices[face.a]));
	  obj.localToWorld(b.copy(obj.geometry.vertices[face.b]));
	  obj.localToWorld(c.copy(obj.geometry.vertices[face.c]));
	  lineAB = new THREE.Line3(a, b);
	  lineBC = new THREE.Line3(b, c);
	  lineCA = new THREE.Line3(c, a);
	  GCP.setPointOfIntersection(lineAB, mathPlane, idx);
	  GCP.setPointOfIntersection(lineBC, mathPlane, idx);
	  GCP.setPointOfIntersection(lineCA, mathPlane, idx);
	});

	var pointsMaterial = new THREE.PointsMaterial({
	  size: .5,
	  color: 0x00ff00
	});
	var points = new THREE.Points(GCP.pointsOfIntersection, pointsMaterial);
	scene.add(points);

	contours = GCP.getContours(GCP.pointsOfIntersection.vertices, [], true);
	// console.log("contours", contours);

	// contours.forEach(cntr => {
	// 	const cntrGeom = new THREE.Geometry();
	// 	cntrGeom.vertices = cntr;
	// 	const contour = new THREE.Line(cntrGeom, new THREE.LineBasicMaterial({
	// 	  color: Math.random() * 0xffffff //0x777777 + 0x777777
	// 	}));
	// 	scene.add(contour);
	// });

  }


GCP.setPointOfIntersection = function(line, plane, faceIdx) {

	GCP.pointOfIntersection = plane.intersectLine(line, new THREE.Vector3() );

	if (GCP.pointOfIntersection) {
		const p = GCP.pointOfIntersection.clone();
		p.faceIndex = faceIdx;
		p.checked = false;
		GCP.pointsOfIntersection.vertices.push(p);
	}
}

GCP.getContours = function(points, contours, firstRun) {

	//console.log("firstRun:", firstRun);

	let contour = [];

	// find first line for the contour
	let firstPointIndex = 0;
	let secondPointIndex = 0;
	let firstPoint, secondPoint;

	for (let i = 0; i < points.length; i++) {

		if (points[i].checked == true) continue;

		firstPointIndex = i;
		firstPoint = points[firstPointIndex];
		firstPoint.checked = true;
		//console.log('firstPointIndex', i);

		secondPointIndex = GCP.getPairIndex(firstPoint, firstPointIndex, points);
		secondPoint = points[secondPointIndex];
		secondPoint.checked = true;
		//console.log('secondPointIndex', secondPointIndex);

		contour.push(firstPoint.clone());
		contour.push(secondPoint.clone());

		break;

	}

	contour = GCP.getContour(secondPoint, points, contour);

	if (contour ) {

		contours.push(contour);

		let allChecked = 0;

		points.forEach(p => allChecked += p.checked === true ? 1 : 0 );
		console.log('allChecked', allChecked, 'points.length', points.length);

		if (points.length - allChecked > 2) {

			return GCP.getContours(points, contours, false);

		}

	}


	return contours;

}

GCP.getContour = function(currentPoint, points, contour) {

	const p1Index = GCP.getNearestPointIndex(currentPoint, points);
	const p1 = points[p1Index];
	p1.checked = true;

	const p2Index = GCP.getPairIndex(p1, p1Index, points);
	const p2 = points[p2Index];
	p2.checked = true;

	const isClosed = p2.equals(contour[0], GCP.tolerance);

	if (!isClosed) {
		contour.push(p2.clone());
		return GCP.getContour(p2, points, contour);
	} else {
		//console.log('p2', p2);
		contour.push(contour[0].clone());
		return contour;
	}
}


GCP.getNearestPointIndex = function( currentPoint, points) {

	let index = 0;

	for ( let point of points) {

		if (point.checked === false && point.equals(currentPoint, GCP.tolerance)) { break; }
		index++;

	}

	return index;

}


GCP.getPairIndex = function(point, pointIndex, points) {

	let index = 0;
	for (let i = 0; i < points.length; i++) {

		const p = points[i];
		if (i != pointIndex && p.checked === false && p.faceIndex === point.faceIndex) {
			index = i;
			break;
		}
	}
	return index;

}

GCP.mmmmgetPairIndex = function( currentPoint, pointIndex, points) {

	let index = 0;

	for (let point of points) {

		if ( index !== pointIndex && point.checked === false && point.faceIndex === currentPoint.faceIndex) { break; }
		index++;

	}

	return index;

}
