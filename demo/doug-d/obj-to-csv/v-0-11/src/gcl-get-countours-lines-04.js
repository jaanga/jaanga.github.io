// copyright Theo Armour. MIT license.
/* global THREE, scene, GCP */
// jshint esversion: 6
// jshint loopfunc: true


const GCL = {};

GCL.tolerance = 0.0001;
GCL.contourLines = undefined;
GCL.pointsRemaining = undefined;

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



GCL.getMenu = function () {

	const htm =

		`
<details id-getGCL open>

	<summary>Get contour lines </summary>

	<p>
		<button onclick=GCL.getContourLines(); >get contour lines </button>
	</p>
	<p>
		<button onclick=GCL.removeShortSegments(); >remove very short polylines</button><br>
		Click until number removed is 0
	</p>

	<div id=GCLdivStatsNew ></div>

	<p>
		<button onclick=GCL.joinAdjacentSegments(); >join adjacent polylines</button>
	</p>

	<div id=GCLdivJoinSegments > </div>

	<hr>

</details>

`;

	return htm;

};

GCL.reset = function () {

	scene.remove(GCL.contourLines);

	GCL.contourLines = new THREE.Group();

	scene.add(GCL.contourLines);

};

GCL.getContourLines = function () {

	GCP.isolines.forEach((isoline, index) => {

		GCL.pointsRemaining = isoline.length;

		console.log('index', index);
		GCL.isoline = isoline;

		GCL.points = isoline.map(line => line.intersection);

		const contours = GCL.getContours( GCL.points, [], true);

		//console.log('con', contours);

		contours.forEach(contour => GCL.addLine(contour ));

	});

};


GCL.getContours = function (points, contours, firstRun) {

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

		secondPointIndex = GCL.getPairIndex(firstPoint, firstPointIndex, points);
		secondPoint = points[secondPointIndex];
		secondPoint.checked = true;
		//console.log('secondPointIndex', secondPointIndex);

		contour.push(firstPoint.clone());
		contour.push(secondPoint.clone());

		break;

	}

	contour = GCL.getContour(secondPoint, points, contour);

	if (contour) {

		contours.push(contour);

		let allChecked = 0;

		points.forEach(p => allChecked += p.checked === true ? 1 : 0);

		//console.log('points.length', points.length, 'allChecked', allChecked, points.length - allChecked );

		if (points.length - allChecked > 2) {

			return GCL.getContours(points, contours, false);

		} else {

			//console.log('contours', contours);
		}

	}

	return contours;

};


GCL.getContour = function (currentPoint, points, contour) {

	const p1Index = GCL.getNearestPointIndex(currentPoint, points);
	let p1 = points[p1Index];

	// (!p1) { console.log('gc', p1, p1Index, currentPoint, points, contour); }
	if (!p1) { return contour; }

	p1.checked = true;

	const p2Index = GCL.getPairIndex(p1, p1Index, points);
	let p2 = points[p2Index];
	p2.checked = true;

	const isClosed = p2.equals(contour[0], GCL.tolerance);

	if (!isClosed) {

		contour.push(p2.clone());
		return GCL.getContour(p2, points, contour);

	} else {

		//console.log('p2', p2);
		contour.push(contour[0].clone());
		return contour;

	}

};


GCL.getNearestPointIndex = function (currentPoint, points) {

	let index = 0;

	for (let point of points) {

		if (point.checked === false && point.equals(currentPoint, GCL.tolerance)) { break; }
		index++;

	}

	return index;

};


GCL.getPairIndex = function (currentPoint, pointIndex, points) {

	let index = 0;

	for (let point of points) {

		if (index !== pointIndex && point.checked === false && point.faceIndex === currentPoint.faceIndex) { break; }
		index++;

	}

	return index;

};


GCL.addLine = function (vertices, color = "red") {

	if (vertices.length < 2) {

		console.log('vertices', vertices);

		return;

	}

	//console.log('vertices.length', vertices.length);
	//console.log('vertices', vertices);

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;

	const material = new THREE.LineBasicMaterial({ color: color });
	const line = new THREE.Line(geometry, material);

	GCL.contourLines.add(line);

};
