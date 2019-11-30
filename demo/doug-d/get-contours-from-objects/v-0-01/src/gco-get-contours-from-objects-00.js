const GCO = {};

let count = 0
let limit = 1;

let plane;
let points;
let contour;
let contours = new THREE.Group();
let pointsOfIntersection;
let contourGroup;

var tolerance = 0.001;

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

	const htm =
		`
<details open>

	<summary>Get contours</summary>

	<p>
		<button id="pressMe" onclick=drawContours(); ><b>draw contour line </b></button>
	</p>
	<p>
		<button id="pressMe" onclick=drawContours(5); ><b>draw 5 contour lines</b></button>
	</p>
	<p>
		<button id="pressMe" onclick=drawContours(20); ><b>draw 20 contour lines</b></button>
	</p>
	<p>
		<button id="pressMe" onclick=drawContours(64); ><b>draw 64 contour lines</b></button>
	</p>
	<p>
		<button id="pressMe" onclick=drawContours(128); ><b>draw 128 contour lines</b></button>
	</p >
</details>
`;

	return htm;

};


GCO.init = function () {

	var planeGeom = new THREE.PlaneGeometry( 100, 100);
	//planeGeom.rotateX(-Math.PI / 2);
	plane = new THREE.Mesh(
		planeGeom,
		new THREE.MeshBasicMaterial({
			color: "lightgray",
			transparent: true,
			opacity: 0.125,
			side: THREE.DoubleSide
		})
	);
	//plane.position.z = -50;
	//plane.rotation.x = 0.05;
	scene.add(plane);

}


function drawContour() {

	if ( count < limit ) {

		count++;

		//plane.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, delta ) );

		drawIntersectionPoints();

	} else {

		scene.add( contours );

	}

}


function drawContours(lim = 1) {

	bBox = new THREE.Box3().setFromObject( mesh );

	plane.geometry.center();
	plane.position.z = 0;
	//plane.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, bBox.min.z + 0 ) );

	pointsOfIntersection = new THREE.Geometry();
	contours = new THREE.Group();

	count = 0
	limit = lim;

	const height = bBox.max.z - bBox.min.z;
	delta = height / limit;

	if ( limit > 1 ) {

		delta = height / limit;
		//plane.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, -delta  + 1 ) );

	} else {

		delta = height / 2
		//plane.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0.5 * height ) );

	}

	drawContour();

}


function drawIntersectionPoints() { // split into separate functions to reduce redundancy

	var mathPlane = new THREE.Plane();

	const planePointA = new THREE.Vector3();
	const planePointB = new THREE.Vector3();
	const planePointC = new THREE.Vector3();

	plane.localToWorld(
		planePointA.copy(plane.geometry.vertices[plane.geometry.faces[0].a])
	);
	plane.localToWorld(
		planePointB.copy(plane.geometry.vertices[plane.geometry.faces[0].b])
	);
	plane.localToWorld(
		planePointC.copy(plane.geometry.vertices[plane.geometry.faces[0].c])
	);

	mathPlane.setFromCoplanarPoints(planePointA, planePointB, planePointC);
	console.log({ mathPlane });

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

	points = new THREE.Points(pointsOfIntersection, pointsMaterial);
	scene.add(points);

	const segmentVertices = getContours(pointsOfIntersection.vertices, [], true);
	console.log("segmentVertices", segmentVertices);

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

	drawContour();

}



function setPointOfIntersection(line, plane, faceIdx) {

	const pointOfIntersection = plane.intersectLine( line, new THREE.Vector3() );

	console.log("pointOfIntersection", pointOfIntersection);

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