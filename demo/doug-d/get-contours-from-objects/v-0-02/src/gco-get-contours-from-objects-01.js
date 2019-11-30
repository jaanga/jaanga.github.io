const GCO = {};

GCO.length = 3;
let limit = 1;

let plane;
let points;


let contour;
let contours = new THREE.Group();
let pointsOfIntersection;
let contourGroup;

var tolerance = 0.001;

GCO.contourPoints = undefined;

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

	window.addEventListener( "onresetall", GCO.reset, false );

	const htm =
		`
<details open>

	<summary>Get contour points</summary>

	<p>
		<button id="pressMe" onclick=GCO.getContourPoints(); ><b>get points</b></button>
	</p>

	number of contours <output id=GCOoutContourCount >${ GCO.length }</output><br>
	<input type="range" id="GCOrngContoursCount" min=1 max=256 step=1 value=${ GCO.length } oninput="GCO.reset();GCO.length=this.value;GCOoutContourCount.innerHTML=this.value;" >
</p>
</details>
`;

	return htm;

};


GCO.reset = function () {

	scene.remove( GCO.contourPoints )

}


GCO.getContourPoints = function () {

	GCO.contourPoints = new THREE.Group();
	GCO.contourLines = [];

	scene.add(GCO.contourPoints);

	//mesh.geometry.computeBoundingBox();
	const box = new THREE.Box3().setFromObject( mesh );
	const size = box.getSize(new THREE.Vector3());
	const delta = size.z / GCO.length;

	//arr = Array( count ).fill( Math.random())
	//console.log( 'arr', arr );

	for ( let i = 0; i < GCO.length; i++ ) {

		const constant = i * delta + box.min.z;

		GCO.getPoints(constant);

		//add requestAnimationFrame

	}

	GCO.getContours();

}


GCO.getPoints = function (constant = 0) {

	GCO.pointsOfIntersection = new THREE.Geometry();
	GCO.linesOfIntersection = [];

	normal = new THREE.Vector3(0, 0, 1);

	plane = new THREE.Plane( normal, constant )

	//console.log({ plane });

	const a = new THREE.Vector3();
	const b = new THREE.Vector3();
	const c = new THREE.Vector3();

	meshes = mesh.geometry ? [mesh] : mesh.children;

	for ( let child of meshes) {

		//console.log('child', child);

		child.geometry = child.geometry.type === "BufferGeometry" ?
			new THREE.Geometry().fromBufferGeometry(child.geometry) : child.geometry;

		//console.log('chgeo', child.geometry);

		child.geometry.faces.forEach(function (face, idx) {

			//console.log('ch', child);

			child.localToWorld(a.copy(child.geometry.vertices[face.a]));
			child.localToWorld(b.copy(child.geometry.vertices[face.b]));
			child.localToWorld(c.copy(child.geometry.vertices[face.c]));

			const lineAB = new THREE.Line3(a, b);
			const lineBC = new THREE.Line3(b, c);
			const lineCA = new THREE.Line3(c, a);

			GCO.setPointOfIntersection(lineAB, plane, idx);
			GCO.setPointOfIntersection(lineBC, plane, idx);
			GCO.setPointOfIntersection(lineCA, plane, idx);

		});
	}


	const pointsMaterial = new THREE.PointsMaterial({size: 3, color: 0xffffff * Math.random() });

	const points = new THREE.Points(GCO.pointsOfIntersection, pointsMaterial);
	GCO.contourPoints.add(points);

	//addLine( GCO.pointsOfIntersection.vertices )


	GCO.contourLines.push( GCO.linesOfIntersection )

}




GCO.setPointOfIntersection = function (line, plane, faceIndex) {

	const pointOfIntersection = plane.intersectLine(line, new THREE.Vector3());

	if (pointOfIntersection) {

		//console.log("ptInt", pointOfIntersection);

		poi = pointOfIntersection.clone();
		poi.faceIndex = faceIndex;
		//p.checked = false;
		GCO.pointsOfIntersection.vertices.push(poi);

		const ll = line.clone();
		ll.faceIndex = faceIndex;
		ll.intersect = pointOfIntersection.clone();
		ll.index = GCO.linesOfIntersection.length;
		GCO.linesOfIntersection.push( ll );

	}

};


GCO.getContours = function () {

	console.log('loi', GCO.contourLines);


	for (let contour of GCO.contourLines ) {

		for (let i = 0; i < contour.length; i++) {

			addLine([contour[i++].intersect, contour[i].intersect])

		}

	}

}


function addLine( vertices ) {

	// const v = function (x, y, z) { return new THREE.Vector3(x, y, z); };
	const geometry = new THREE.Geometry();
	geometry.vertices = vertices || [ v( -10, 0, 0 ),  v( 0, 10, -10 ), v( 10, 0, 0 ) ];
	const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const line = new THREE.Line( geometry, material );

	scene.add( line );
	//return line;

}


GCO.vvvgetContours = function () {

	console.log('loi', GCO.contourLines);

	contour = GCO.contourLines[ 2 ];

	const vertices = [contour[0].intersect, contour[1].intersect ];

	faceIndex = contour[0].faceIndex;

	console.log();

	let index = 0;

	for (let i = 0; i < contour.length; i++) {

		vertexNext = GCO.getNextVertex( index );
		console.log('vertexNext', vertexNext);

		//if (!vertexNext) { break; }

		index = vertexNext.index;

		//if (index === 0) { break; }

		vertices.push(vertexNext.intersect);

	}


	// vertexNext2 = GCO.getNextVertex( vertexNext.index );
	// console.log('vertexNext', vertexNext2);

	// vertices.push(vertexNext2.intersect);

	// vertexNext3 = GCO.getNextVertex( vertexNext.index );
	// console.log('vertexNext', vertexNext2);

	// vertices.push(vertexNext3.intersect);

	console.log('vv', vertices);

	addLine( vertices )

}


GCO.getNextVertex = function(index) {

	linesNext = contour.filter(line => line.intersect.equals(contour[index].intersect) )
	console.log('linesNext', linesNext);

	lineNext = linesNext.find(
		line => line.faceIndex !== contour[ index ].faceIndex
	)

	console.log('lineNext', lineNext);

	if (!lineNext) { return contour[index + 1];}

	faceNext = lineNext.faceIndex;

	console.log('faceNext', faceNext);

	vertexNext = contour.find( line => line.intersect.equals( lineNext.intersect ) === false && line.faceIndex === faceNext )

	return vertexNext;


}




GCO.cccgetContours = function () {

	//console.log('loi', GCO.contourLines);

	//console.log('poi', GCO.pointsOfIntersection);

	for (let lines of GCO.contourLines ) {
	//lines = GCO.contourLines[1];

		console.log('lines', lines);

		const line0 = lines[0];
		let faceIndex = line0.faceIndex;

		console.log('faceIndex 0', line0.faceIndex );

		for (let i = 0; i < lines.length; i++) {

			//console.log('line', lines[ 0 ]);

			const index = lines.findIndex(line => line.faceIndex === faceIndex );
			console.log('index/fi', index, faceIndex);

			faceIndex = GCO.getNext(lines, index);
			console.log('fi New', faceIndex);

			if (faceIndex === lines[0].faceIndex) { console.log('', 55555555555555 );break; }

		}

	// 	if (arr.length > 7) {
	// 	const geometry = new THREE.BoxGeometry( 5, 4, 7);
	// 	const material = new THREE.MeshNormalMaterial();
	// 	const mesh = new THREE.Mesh(geometry, material);
	// 	mesh.position.set( point.x, point.y, point.z )
	// 	scene.add(mesh);


	}

}


GCO.getNext = function (lines, index) {

	const line0 = lines[index];

	//console.log('line0', line0);

	const arr = lines.filter( (line, index ) =>
		(line0.start.x === line.start.x && line0.start.y === line.start.y && line0.start.z === line.start.z &&
			line0.end.x === line.end.x && line0.end.y === line.end.y && line0.end.z === line.end.z) ||

		(line0.start.x === line.end.x && line0.start.y === line.end.y && line0.start.z === line.end.z &&
			line0.end.x === line.start.x && line0.end.y === line.start.y && line0.end.z === line.start.z)
	);

	const fi = arr[1].faceIndex;

	console.log('arr fi', arr, fi) // .map( pt => pt.faceIndex ) );

	return fi;

}



















GCO.bbbinit = function () {

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