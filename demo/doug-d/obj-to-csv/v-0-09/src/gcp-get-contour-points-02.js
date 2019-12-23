// copyright Theo Armour. MIT license.
/* global THREE, MMS, GCOdivToggles, GCOchkLabels, drawPlacard, GCOdivMessage, GCOchkPoints,
GCOrngContoursCount, GCOoutContourCount, GCOrngContourPosition, GCOoutContourPosition, GCOdivStatsNew,
scene, mesh, meshPlane */
// jshint esversion: 6
// jshint loopfunc: true

const GCP = {};

GCP.constant = 1;
GCP.tolerance = 0.0005;

GCP.contours = [];
GCP.pointOfIntersection = new THREE.Vector3();
GCP.pointsOfIntersection = new THREE.Geometry();


THREE.Vector3.prototype.equals = function (v, tolerance) {

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




GCP.getIntersectionPoints = function () {

	const normal = new THREE.Vector3(0, 0, -1);
	const plane = new THREE.Plane(normal, GCO.constant);

	const a = new THREE.Vector3();
	const b = new THREE.Vector3();
	const c = new THREE.Vector3();

	const meshes = mesh.geometry ? [mesh] : mesh.children;

	GCP.pointsOfIntersection = new THREE.Geometry();

	for (let mesh of meshes) {

		//mesh.geometry = new THREE.Geometry().fromBufferGeometry(mesh.geometry);

		mesh.geometry =
		mesh.geometry.type === "BufferGeometry" ?
			new THREE.Geometry().fromBufferGeometry( mesh.geometry)
			: mesh.geometry;

		mesh.geometry.faces.forEach(function (face, idx) {

			mesh.localToWorld(a.copy(mesh.geometry.vertices[face.a]));
			mesh.localToWorld(b.copy(mesh.geometry.vertices[face.b]));
			mesh.localToWorld(c.copy(mesh.geometry.vertices[face.c]));

			const lineAB = new THREE.Line3(a, b);
			const lineBC = new THREE.Line3(b, c);
			const lineCA = new THREE.Line3(c, a);

			GCP.setPointOfIntersection(lineAB, plane, idx);
			GCP.setPointOfIntersection(lineBC, plane, idx);
			GCP.setPointOfIntersection(lineCA, plane, idx);

		});

		GCO.countFaces = mesh.geometry.faces.length;
		GCO.countVertices = mesh.geometry.vertices.length;

	}

	GCO.points.push(...GCP.pointsOfIntersection.vertices);
	// var pointsMaterial = new THREE.PointsMaterial({
	//   size: .5,
	//   color: 0x00ff00
	// });
	// var points = new THREE.Points(GCP.pointsOfIntersection, pointsMaterial);
	// scene.add(points);

	contours = GCP.getContours(GCP.pointsOfIntersection.vertices, [], true);
	//console.log("contours", GCP.contours);

	//requestAnimationFrame(GCO.drawLines);


	//GCO.contourLines.add(contour);

	return contours;



	GCO.drawContour();

}


GCP.setPointOfIntersection = function (line, plane, faceIdx) {

	//console.log("line", line);

	GCP.pointOfIntersection = plane.intersectLine(line, new THREE.Vector3());

	if (GCP.pointOfIntersection) {

		let p = GCP.pointOfIntersection.clone();
		p.faceIndex = faceIdx;
		p.checked = false;
		GCP.pointsOfIntersection.vertices.push(p);

	}

}



GCP.getContours = function (points, contours, firstRun) {

	//console.log("firstRun:", firstRun);

	let contour = []; // not a const!!
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

	};

	contour = GCP.getContour(secondPoint, points, contour);

	if (contour) {

		contours.push(contour);

		let allChecked = 0;

		points.forEach(p => allChecked += p.checked === true ? 1 : 0);

		//console.log('points.length', points.length, 'allChecked', allChecked, points.length - allChecked );

		if (points.length - allChecked > 2) {

			return GCP.getContours(points, contours, false);

		} else {

			//console.log('contours', contours);
		}

	}

	return contours;

};


GCP.getContour = function (currentPoint, points, contour) {

	const p1Index = GCP.getNearestPointIndex(currentPoint, points);
	let p1 = points[p1Index];
	if (!p1) { return contour; }

	if (!p1) { console.log('gc', p1, p1Index, currentPoint, points, contour); }

	p1.checked = true;

	const p2Index = GCP.getPairIndex(p1, p1Index, points);
	let p2 = points[p2Index];
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

};


GCP.getNearestPointIndex = function (currentPoint, points) {

	let index = 0;

	for (let point of points) {

		if (point.checked === false && point.equals(currentPoint, GCP.tolerance)) { break; }
		index++;

	}

	return index;

};


GCP.getPairIndex = function (currentPoint, pointIndex, points) {

	let index = 0;

	for (let point of points) {

		if (index !== pointIndex && point.checked === false && point.faceIndex === currentPoint.faceIndex) { break; }
		index++;

	}

	return index;

};
