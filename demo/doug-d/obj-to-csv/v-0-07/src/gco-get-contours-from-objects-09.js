// copyright Theo Armour. MIT license.
/* global THREE, MMS, GCOdivToggles, GCOchkLabels, drawPlacard, GCOdivMessage, GCOchkPoints,
GCOrngContoursCount, GCOoutContourCount, GCOrngContourPosition, GCOoutContourPosition, GCOdivStatsNew,
scene, mesh, meshPlane */
// jshint esversion: 6
// jshint loopfunc: true


const GCO = {};

GCO.contoursLength = 16;
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
<!--
		<div>
			<input type=checkbox onchange="GCO.contoursSegments.visible=!GCO.contoursSegments.visible" checked >
			contour segments
		</div>
-->
		<div>
			<input type=checkbox onchange="GCO.contourLines.visible=!GCO.contourLines.visible" checked >
			contour lines
		</div>

		<div>
			<input type=checkbox id=GCOchkPoints onchange=GCO.toggleContourPoints() checked >
			contour points
		</div>

		<div>
			<input type=checkbox id=GCOchkClosed onchange=GCO.toggleClosed() checked >
			closed
		</div>

		<div>
			<input type=checkbox onchange="mesh.visible=!mesh.visible" checked >
			model
		</div>

		<div>
			<input type=checkbox id=GCOchkLabels onchange="GCO.toggleLabels()" >
			labels
		</div>

	</div>


	<p>
		number of contours <output id=GCOoutContourCount >${GCO.contoursLength}</output><br>
		<input type="range" id="GCOrngContoursCount" min=1 max=256 step=1 value=${GCO.contoursLength}
		oninput="GCO.reset();GCO.contoursLength=this.value;GCOoutContourCount.innerHTML=this.value;" >
	</p>

	<p>
		<button title="pressMe" onclick=GCO.getContourPoints(); ><b>get multiple contours</b></button>

		<button title="pressMe" onclick=GCO.getContourPoints(32); >32</button>

		<button title="pressMe" onclick=GCO.getContourPoints(64); >64</button>

		<button title="pressMe" onclick=GCO.getContourPoints(128); >128</button>
	</p>

	<hr>

	<p>
		single contour position <output id=GCOoutContourPosition >${GCO.constant + 50}</output>%<br>
		<input type="range" id="GCOrngContourPosition" min=0 max=100 step=1 value=${GCO.constant + 50}
		oninput="GCO.setContourPosition();" >
	</p>

	<p>
		<button title="pressMe" onclick=GCO.getContourPoints(1); ><b>get single contour</b></button>
	</p>

	<hr>

	<p>
		<button onclick=GCO.removeShortSegments(); >remove very short segments</button><br>
		Click until number removed is 0
	</p>

	<p>
		<button onclick=GCO.joinAdjacentSegments(); >join adjacent segments</button>
	</p>

	<div id=GCOdivMessage ></div>

	<div id=GCOdivStatsNew >Click until number no longer changes</div>

	<div id=GCOdivJoinSegments > </div>


</details>
`;

	return htm;
};

GCO.reset = function () {

	scene.remove(GCO.contourPoints, GCO.labels, GCO.contoursSegments, GCO.contourLines);

	GCO.constant = 0;
	GCO.index = 0;

	GCO.pointsOfIntersection = new THREE.Geometry();
	GCO.points = [];
	GCO.contourPoints = new THREE.Group();
	GCO.labels = new THREE.Group();
	//GCO.contoursSegments = new THREE.Group();
	GCO.contourLines = new THREE.Group();
	GCO.contourLines.name = "GCO.contourLines";
	GCO.closed = new THREE.Group();
	GCO.telltales = new THREE.Group();

	GCO.countFaces = 0;
	GCO.countVertices = 0;

	scene.add(GCO.contourPoints);
	scene.add(GCO.labels);
	//scene.add(GCO.contoursSegments);
	scene.add(GCO.contourLines);
	scene.add(GCO.closed );
	scene.add(GCO.telltales);

	meshPlane.material.opacity = 0.2;

	MMS.setOpacity(85);

	//mesh.updateMatrix();

	GCOdivMessage.innerHTML = "";

	const checkBoxes = GCOdivToggles.querySelectorAll("input");

	checkBoxes.forEach(box => box.checked = true);

	GCOchkPoints.checked = false;
	GCOchkLabels.checked = false;
	GCOchkClosed.checked = false;

	GCO.timeStart = performance.now();

};


GCO.getMessage = function () {

	//GCO.contoursSegments.visible = false;
	mesh.material.opacity = 0.2;
	meshPlane.material.opacity = 0.2;

	segs = GCO.contourLines.children.reduce((acc, child) => {

		acc += child.children.length;

		return acc;

	}, 0);

	const lins = GCO.contourLines.children.length;


	const htm =
`
Current or latest contour<br>
Plane elevation: ${ GCO.constant.toLocaleString()}<br>
Points of intersection: ${GCO.pointsOfIntersection.vertices.length.toLocaleString()}<br>
<br>
OBJ file<br>
Faces: ${ GCO.countFaces.toLocaleString()}<br>
Vertices: ${ GCO.countVertices.toLocaleString()}<br>
<br>
Contours<br>
Count: ${ lins }</br>
Segments: ${ segs.toLocaleString()}</br>
Points: ${ GCO.points.length.toLocaleString() }</br>
<p>
Time: ${ GCO.timeTaken.toLocaleString() } milliseconds
</p>
`;

	return htm;

};


GCO.toggleContourPoints = function () {

	if (GCO.contourPoints.children.length === 0) {

		const geometry = new THREE.Geometry();
		geometry.vertices = GCO.points;

		const pointsMaterial = new THREE.PointsMaterial({ size: 0.3, color: 0x00ff00 });

		const points = new THREE.Points(geometry, pointsMaterial);
		// //console.log('points', points);

		GCO.contourPoints.add(points);

		GCO.contourPoints.visible = false;

	}

	GCO.contourPoints.visible = !GCO.contourPoints.visible;

};



GCO.toggleClosed= function () {

	if ( GCO.closed.children.length === 0) {

		GCO.contourLines.children.forEach((contours, index) => {

			for (let contour of contours.children) {


				const vertexStart = contour.geometry.vertices[0];

				const vertexEnd = contour.geometry.vertices[contour.geometry.vertices.length - 1];

				const closed = vertexStart.equals(vertexEnd,1 )

				console.log('closed', closed);

				console.log( 'vertexStart', vertexStart );
				console.log('vertexEnd', vertexEnd);

				if ( closed ) {

					let geometryTT = new THREE.BoxGeometry(0.3, 0.3, 0.9);
					let materialTT = new THREE.MeshBasicMaterial({ color: "red" });
					let touching = new THREE.Mesh(geometryTT, materialTT);
					touching.position.copy(vertexStart);
					GCO.closed.add( touching );


					geometryTT = new THREE.BoxGeometry(0.3, 0.3, 0.9);
					materialTT = new THREE.MeshBasicMaterial({ color: "blue" });
					touching = new THREE.Mesh(geometryTT, materialTT);
					touching.position.copy(vertexEnd);
					GCO.closed.add( touching );


				}

				//let elevation = index * GCO.delta + GCO.box3.max.z;
				// const label = drawPlacard(index + "", 0.02, 120, GCO.box3.min.x - 5, 0, elevation);
				// GCO.labels.add(label);

			}

		});

		GCO.closed.visible = false;

	}

	GCO.closed.visible = !GCO.closed.visible;

};


GCO.toggleLabels = function () {


	if ( GCO.labels.children.length === 0) {

		GCO.contourLines.children.forEach((contour, index) => {

			let elevation = index * GCO.delta + GCO.box3.max.z;
			const label = drawPlacard(index + "", 0.02, 120, GCO.box3.min.x - 5, 0, elevation);
			GCO.labels.add(label);

		});

		GCO.labels.visible = false;

	}

	GCO.labels.visible = !GCO.labels.visible;

};



GCO.getContourPoints = function ( count =  GCO.contoursLength ) {

	GCO.reset();

	GCO.count = count;

	GCO.contoursLength = GCO.count;
	GCOrngContoursCount.value = GCO.count;
	GCOoutContourCount.innerHTML = GCO.count;

	GCO.box3 = new THREE.Box3().setFromObject(mesh);
	const size = GCO.box3.getSize(new THREE.Vector3());

	if ( GCO.count === 1) {

		GCO.delta =  0;

	} else {

		GCO.delta = - size.z / (GCO.count - 1);

	}

	GCO.delta = GCO.count > 1 ? - size.z / ( GCO.count - 1 ) : size.z / 2;

	GCO.drawContour();

};


GCO.setContourPlaneElevation = function (elevation = meshPlane.position.z) {

	GCO.constant = elevation;

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

	meshPlane.position.z = (size.z * GCOrngContourPosition.value) / 100 - 0.5 * size.z;

	GCOoutContourPosition.innerHTML = (100 * GCOrngContourPosition.value) / 100;

};


GCO.drawContour = function () {

	if (GCO.index < GCO.contoursLength) {

		let elevation = GCO.index * GCO.delta + GCO.box3.max.z;

		elevation = GCO.count === 1 ? meshPlane.position.z : elevation;

		GCO.setContourPlaneElevation(elevation);

		//console.log(GCO.index, 'meshPlane.position.z', meshPlane.position.z);

		GCO.index++;

		GCOdivMessage.innerHTML = `<p>index ${GCO.index}</p>`;

		console.log( "index", GCO.index, "elevation", elevation);

		requestAnimationFrame( GCO.drawIntersectionPoints );

	} else {

		GCO.timeTaken = performance.now() - GCO.timeStart;
		GCOdivMessage.innerHTML = GCO.getMessage();

	}

};



GCO.drawIntersectionPoints = function () {

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
			child.geometry.type === "BufferGeometry" ?
				new THREE.Geometry().fromBufferGeometry(child.geometry)
				: child.geometry;


		child.geometry.faces.forEach(function (face, idx) {

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

		GCO.countFaces = child.geometry.faces.length;
		GCO.countVertices = child.geometry.vertices.length;

	}


	const segmentVertices = GCO.getContours(GCO.pointsOfIntersection.vertices, [], true);
	//console.log('segmentVertices', segmentVertices );

	const firstFirstPoint = GCO.pointsOfIntersection.vertices[0];

	const contour = new THREE.Group();

	for ( let i = 0; i < segmentVertices.length; i++ ) {

		let vertices = segmentVertices[i];

		vertices = vertices.filter( vertex => !vertex.equals(firstFirstPoint));

		// if (vertices.length <= 3 && vertices[0].distanceTo(vertices[vertices.length - 1]) < 0.01) {
		// 	continue;
		// }

		const dis = vertices[0].distanceTo(vertices[vertices.length - 1]);
		//console.log( 'dis0', dis);

		if (dis < 0.8 && dis > 0 ) {

			vertices.push(vertices[0]);

		} else {

		// 	if (dis > 0 && vertices.length < 4  ) {

		// 		console.log('dis', dis, 'len', vertices.length);
		// 		console.log(GCO.index, 'vertices', i, vertices);

		// 	}
		}


		const geometry = new THREE.Geometry();
		geometry.vertices = vertices;

		const material = new THREE.LineBasicMaterial({ color: 0xffffff * Math.random() });
		const line = new THREE.Line(geometry, material);

		contour.add(line);

	}

	GCO.points.push(...segmentVertices.flatMap(vertices => vertices));

	GCO.contourLines.add(contour);

	//if (GCO.index < GCO.contoursLength) {
	GCO.drawContour();
	//}

};


GCO.setPointOfIntersection = function (line, plane, faceIdx) {

	//console.log("line", line);

	const pointOfIntersection = plane.intersectLine(line, new THREE.Vector3());

	if (pointOfIntersection) {

		let p = pointOfIntersection.clone();
		p.faceIndex = faceIdx;
		p.checked = false;
		GCO.pointsOfIntersection.vertices.push(p);

	}

	GCO.countEdges++;

};


GCO.getContours = function (points, contours, firstRun) {

	//console.log("firstRun:", firstRun);
	// console.log('points', points);

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

	if (secondPoint) {

		contour = GCO.getContour(secondPoint, points, contour);

	}

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

};



GCO.getContour = function (currentPoint, points, contour) {

	//if (!currentPoint) { console.log('!currentPoint'); return;}
	//if ( contour[ 0 ].equals( pointFirst, GCO.tolerance ) ) { console.log( '', 23 ); }



	if (currentPoint === pointPrevious) { return contour; }

	pointPrevious = currentPoint;

	let p1Index = GCO.getNearestPointIndex(currentPoint, points);
	let p1 = points[p1Index];
	p1.checked = true;

	let p2Index = GCO.getPairIndex(p1, p1Index, points);
	let p2 = points[p2Index];
	p2.checked = true;
	


	// let tmp = contour[0];

	// if (!tmp) {
	// 	console.log('tmp', tmp, currentPoint, points);

	// 	tmp = currentPoint.clone();
	// 	//return;

	// 	tmp = [points[points.length - 1].clone()];
	// }

	let isClosed = p2.equals(contour[0], GCO.tolerance);

	if (!isClosed) {

		  contour.push(p2.clone());
		return GCO.getContour(p2, points, contour);


		// } else {

		// 	if (p2 && points) {

		// 		contour.push(p2.clone());
		// 		const contourNew = GCO.getContour(p2, points, contour);
		// 		return contourNew;

		// 	} else {

		// 		console.log('never here', 23);
		// 	}

		// }

	} else {

		contour.push(contour[0].clone());
		return contour;
	}
};



//let timeTotal = 0;

GCO.getNearestPointIndex = function (point, points) {

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

	//return index = index === -1 ? 0 : index;
	// 2pms
};


GCO.getPairIndex = function (point, pointIndex, points) {

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

	//return index = index === -1 ? 0 : index;
	// 24 ms

};


//////////


GCO.removeShortSegments = function () {

	const vertexArrays = GCO.contourLines.children[0].children.map(line => line.geometry.vertices);
	//console.log('test vertexArrays', vertexArrays );

	const segmentsStart = GCO.contourLines.children.reduce((acc, child) => acc += child.children.length, 0);

	let count = 0;

	for (let i = 0; i < GCO.contourLines.children.length; i++) {

		const lines = GCO.contourLines.children[i];

		//console.log('short lines', lines.children.length);

		for (let j = 0; j < lines.children.length; j++) {

			const line = lines.children[j];

			const length = GCO.getLength(line);

			if (length < 0.09) {

				console.log('j', j, 'length', length, "line", line);

				GCO.contourLines.children[i].children.splice(j, 1);

				count++;

			}
		}

	}

	console.log('short line count', count);

	const segmentsEnd = GCO.contourLines.children.reduce((acc, child) => acc += child.children.length, 0);

	GCOdivStatsNew.innerHTML = `<p>segments removed: ${ segmentsStart - segmentsEnd }<br>segments now: ${segmentsEnd}</p>`;

};


GCO.joinAdjacentSegments = function () {

	scene.remove(GCO.telltales);

	GCO.telltales = new THREE.Group();

	const segmentsStart = GCO.contourLines.children.reduce((acc, child) => acc += child.children.length, 0);

	let count = 0;

	for (let i = 0; i < GCO.contourLines.children.length; i++) {

		lines = GCO.contourLines.children[i];

		console.log( "\n\nindex",i );
		console.log( 'extra lines length', lines.children.length);

		if (lines.children.length === 1) { continue; }

		for (let j = 0; j < lines.children.length; j++) {

			let line = lines.children[j];


			console.log('extra line vertices ', line.geometry.vertices.length);

			if (line.geometry.vertices.length < 4) {

				length = GCO.getLength(line);

				console.log('j', j, 'length', length);

			} else if ( j < lines.children.length - 1 ) {

				point = line.geometry.vertices[line.geometry.vertices.length - 1]

				points = lines.children[ j + 1].geometry.vertices

				//pt = GCO.getNearestPointIndex(point, points)

				let index = 999;

				for (let i = 0; i < points.length; i++) {

					const p = points[i];
					if ( p.equals(point, 0.01 )) {

						index = i;
						break;
					}
				}

				if (index !== 999) {

					console.log('index nearest', index, point, points[index]);

					console.log('v1', line.geometry.vertices, points);

					lines.remove( lines.children[j] );

					geometry = line.geometry;
					geometry.vertices.push(...points);

					material = new THREE.LineBasicMaterial({ color: "magenta"});
					lineNew = new THREE.Line(geometry, material);

					lines.add( lineNew);

					console.log('v2', line.geometry.vertices, points );

					//lines.children.splice(j + 1, 1)

					lines.remove( lines.children[ j + 1 ] )

					const pointFirst = line.geometry.vertices[0];
					//console.log('test pointFirst', pointFirst);

					let geometryTT = new THREE.BoxGeometry(0.3, 0.3, 0.9);
					let materialTT = new THREE.MeshBasicMaterial({ color: "red" });
					const telltale = new THREE.Mesh(geometryTT, materialTT);
					telltale.position.copy(pointFirst);
					GCO.telltales.add( telltale );


				}

			}

			count++;

		}

		count = count - 1;

		scene.add(GCO.telltales);
		//count += lines.children.length - 1;

	}

	console.log('extra line total count', count);

	const segmentsEnd = GCO.contourLines.children.reduce((acc, child) => acc += child.children.length, 0);

	GCOdivJoinSegments.innerHTML = `<p>segments removed: ${ segmentsStart - segmentsEnd }<br>segments now: ${segmentsEnd}</p>`;

};



GCO.getLength = function (line) {

	line.computeLineDistances();

	const length = line.geometry.lineDistances.reduce((acc, distance) => acc += distance, 0);

	return length;


};