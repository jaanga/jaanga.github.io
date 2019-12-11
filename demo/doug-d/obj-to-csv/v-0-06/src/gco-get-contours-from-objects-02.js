// copyright Theo Armour. MIT license.
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, meshPlane, controls */
// jshint esversion: 6
// jshint loopfunc: true


const GCO = {};

GCO.contoursLength = 12;
GCO.constant = 0;
GCO.tolerance = 0.01;


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
<!--
		<button onclick=GCO.drawPointsOfIntersection(); >points of intersection</button>
-->
		</p>

	<div id=GCOdivMessage ></div>


</details>
`;

	return htm;
};

GCO.reset = function () {

	scene.remove(GCO.contourPoints, GCO.contoursSegments, GCO.contourLines);

	GCO.constant = 0;
	GCO.index = 0;
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
	scene.add(GCO.contourLines);

	meshPlane.material.opacity = 0.2;

	MMS.setOpacity(85);

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
GCO.contourPoints: ${ pts.toLocaleString() }</br>
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




GCO.getContourPoints = function ( count =  GCO.contoursLength ) {

	GCO.reset();

	GCO.count = count;

	GCO.contoursLength = GCO.count;
	GCOrngContoursCount.value = GCO.count;
	GCOoutContourCount.innerHTML = GCO.count;

	GCO.box3 = new THREE.Box3().setFromObject(mesh);
	const size = GCO.box3.getSize(new THREE.Vector3());

	GCO.delta = GCO.count > 1 ? size.z / ( GCO.count - 1 ) : size.z / 2;

	GCO.drawContour();

	GCOdivMessage.innerHTML = GCO.getMessage();

};


GCO.setContourPlaneElevation = function (elevation = meshPlane.position.z) {

	GCO.constant = elevation;

	const box3 = new THREE.Box3().setFromObject(mesh);

	if (GCO.constant - GCO.box3.min.z < 0.001) {

		GCO.constant += 0.01;

	} else if (GCO.constant - GCO.box3.max.z < 0.001) {

		GCO.constant -= 0.01;

	}

	meshPlane.position.z = GCO.constant;

};

GCO.setContourPosition = function () {

	mesh.geometry.computeBoundingBox();

	const size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());

	//console.log('size', size);

	meshPlane.position.z = (size.z * GCOrngContourPosition.value) / 100 - 0.5 * size.z;

	GCOoutContourPosition.innerHTML = (100 * GCOrngContourPosition.value) / 100;


};


GCO.drawContour = function() {

	if ( GCO.index < GCO.contoursLength ) {

		let elevation = GCO.index * GCO.delta + GCO.box3.min.z;

		elevation = GCO.count === 1 ? 0 : elevation;

		GCO.setContourPlaneElevation( elevation);

		//console.log(GCO.index, 'meshPlane.position.z', meshPlane.position.z);

		GCO.index++;

		GCO.drawIntersectionPoints();


	} else {



	}

}

function test() {

	pointFirst = GCO.pointsOfIntersection.vertices[0];
	console.log('pointFirst', pointFirst);

	geometry = new THREE.BoxGeometry( 1, 1, 1);
	material = new THREE.MeshNormalMaterial( { opacity: 0.85, side:2, transparent: true });
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.copy( pointFirst )
	scene.add(mesh);

	lines = GCO.contourLines.children[0].children.map( line => line.geometry.vertices )

	console.log('lines', lines);

}



GCO.drawIntersectionPoints = function() { // split into separate functions to reduce redundancy

	const normal = new THREE.Vector3(0, 0, -1);

	const plane = new THREE.Plane(normal, GCO.constant);

	const a = new THREE.Vector3();
	const b = new THREE.Vector3();
	const c = new THREE.Vector3();

	const meshes = mesh.geometry ? [mesh] : mesh.children;

	GCO.pointsOfIntersection = new THREE.Geometry();

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

		} );
	}



	const segmentVertices = GCO.getContours(GCO.pointsOfIntersection.vertices, [], true);
	//console.log('segmentVertices', segmentVertices );

	const firstFirstPoint = GCO.pointsOfIntersection.vertices[ 0 ]

	const contour = new THREE.Group();

	segmentVertices.forEach(vertices => {

		vertices = vertices.filter((vertex, idx) => !vertex.equals(firstFirstPoint))
		//console.log('vertices', vertices);

		const geometry = new THREE.Geometry();

		geometry.vertices = vertices;
		const material = new THREE.LineBasicMaterial({ color: 0xffffff * Math.random() })
		const line = new THREE.Line( geometry, material );

		contour.add(line);

	});

	var pointsMaterial = new THREE.PointsMaterial({
		size: 3,
		color: 0x00ff00
	});

	const points = new THREE.Points(GCO.pointsOfIntersection, pointsMaterial);
	//console.log('points', points);
	GCO.contourPoints.add(points);
	GCO.contourLines.add( contour );

	GCO.drawContour();

}


GCO.setPointOfIntersection = function(line, plane, faceIdx) {

	//console.log("line", line);

	const pointOfIntersection = plane.intersectLine( line, new THREE.Vector3() );

	if (pointOfIntersection) {

		let p = pointOfIntersection.clone();
		p.faceIndex = faceIdx;
		p.checked = false;
		GCO.pointsOfIntersection.vertices.push(p);

	}
}

let pointPrevious;

GCO.getContours = function (points, contours, firstRun) {

	//console.log("firstRun:", firstRun);

	let contour = [];

	// find first line for the contour
	let firstPointIndex = 0;
	let secondPointIndex = 0;
	let firstPoint;
	let secondPoint;

	for (let i = 0; i < points.length; i++) {

		if (points[i].checked == true) continue;

		firstPointIndex = i;
		firstPoint = points[firstPointIndex];
		firstPoint.checked = true;
		secondPointIndex = GCO.getPairIndex(firstPoint, firstPointIndex, points);
		secondPoint = points[secondPointIndex];
		secondPoint.checked = true;
		contour.push(firstPoint.clone());
		contour.push(secondPoint.clone());
		break;

	}

	contour = GCO.getContour(secondPoint, points, contour);

	if (contour && contour.length) {
		contours.push(contour);

	} else {
		//console.log('contour', secondPoint, points, contour);
	}


	let allChecked = 0;

	points.forEach(p => { allChecked += p.checked === true ? 1 : 0; });
	//console.log("allChecked: ", allChecked == points.length);

	if (allChecked !== points.length) {

		return GCO.getContours(points, contours, false);

	}

	return contours;

}



GCO.getContour = function(currentPoint, points, contour) {

	//if (!currentPoint) { console.log('!currentPoint'); return;}
	//if ( contour[ 0 ].equals( pointFirst, GCO.tolerance ) ) { console.log( '', 23 ); }
	if ( currentPoint === pointPrevious ) { return contour; }

	pointPrevious = currentPoint;

	let p1Index = GCO.getNearestPointIndex(currentPoint, points);
	let p1 = points[p1Index];
	p1.checked = true;

	let p2Index = GCO.getPairIndex(p1, p1Index, points);
	let p2 = points[p2Index];
	p2.checked = true;

	const tmp = contour[0];

	if (!tmp) {
		//console.log('tmp', tmp, currentPoint, points);


		tmp = pointPrevious;

		//contour = [ points[ points.length - 1 ].clone() ];
	}

	let isClosed = p2.equals( tmp, GCO.tolerance);

	if ( !isClosed ) {

		//ctr = GCO.getContour(p2, points, contour);
		//return contour;
		//console.log( '', currentPoint, contour );
		//if ( p2 && p2.x ) {

		if ( tmp.equals( p2, GCO.tolerance ) ) {
			//console.log( 'p2', p2 )
			console.log('isClosed', isClosed, currentPoint, tmp );
			return contour;

		} else {

			if (p2 && points) {

				contour.push(p2.clone());
				contourNew = GCO.getContour(p2, points, contour);
				return contourNew;

			} else {

				console.log('never here', 23);
			}

		}

	} else {
		contour.push( contour[0].clone());
		return contour;
	}
}


//let timeTotal = 0;


GCO.getNearestPointIndex = function(point, points) {

	//const timeStart = performance.now();

	let index = 0;
	for (let i = 0; i < points.length; i++) {

		const p = points[i];
		if (p.checked === false && p.equals(point, GCO.tolerance)) {

			index = i;
			break;
		}
	}

	//console.log('index', index, timeTotal += performance.now() - timeStart );
	return index;
	// 15ms

	//console.log('pp', points);
	//let index = points.findIndex(p => ( p.checked === false && p.equals(point, GCO.tolerance ) ));

	return index = index === -1 ? 0 : index;
	// 2pms
}

GCO.getPairIndex = function(point, pointIndex, points) {

	//const timeStart = performance.now();

	let index = 0;
	for (let i = 0; i < points.length; i++) {

		const p = points[i];
		if (i !== pointIndex && p.checked === false && p.faceIndex === point.faceIndex) {

			index = i;
			break;
		}
	}

	//console.log('index', index, timeTotal += performance.now() - timeStart );
	return index;
	// 12ms


	// let index = points.findIndex((p, idx) =>
	// 	idx !== pointIndex && p.checked === false && p.faceIndex === point.faceIndex);

	return index = index === -1 ? 0 : index;
	// 24 ms

}