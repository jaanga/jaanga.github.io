// copyright Theo Armour. MIT license.
/* global THREE, MMS, GCOdivToggles, GCOchkLabels, drawPlacard, GCOdivMessage, GCOchkPoints,
GCOrngContoursCount, GCOoutContourCount, GCOrngContourPosition, GCOoutContourPosition, GCOdivStatsNew,
scene, mesh, meshPlane */
// jshint esversion: 6
// jshint loopfunc: true

const GCO = {};

GCO.contoursLength = 16;
GCO.constant = 1;
GCO.contourPoints = undefined;

GCO.getMenu = function () {

	window.addEventListener("onresetall", GCO.reset, false);

	const htm = `
	<details open>

		<summary>Get contour points</summary>

		<p>Adjust contour line parameters. Generate vertices. Draw points and lines.</p>


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

		<div id=GCOdivMessage >Statistics will appear here</div>

		<hr>

		<div id=GCOdivToggles >
			<p>
				Toggles
			</p>

			<div>
				<input type=checkbox onchange="mesh.visible=!mesh.visible" checked >
				OBJ model
			</div>
			<div>
				<input type=checkbox onchange="GCO.contourLines.visible=!GCO.contourLines.visible" checked >
				contour lines
			</div>
			<div title="Zoom way in in order to view the points" >
				<input type=checkbox id=GCOchkPoints onchange=GCO.toggleContourPoints() checked >
				contour points
			</div>
			<div title="Display start (red) and end (blue) of each polyline" >
				<input type=checkbox id=GCOchkClosed onchange=GCO.toggleClosed() checked >
				polylines start and end
			</div>
			<div title=Show very tiny line segments" >
				<input type=checkbox id=GCOchkShortPolylines onchange="GCO.toggleShortPolylines();" checked >
				very short polylines <span id=GCOspnShortPolylines ></span>
			</div>
				<div title="" >
				<input type=checkbox id=GCOchkMultiplePolylines onchange="GCO.toggleMultiplePolylines();" checked >
				contours w/ > 1 polylines <span id=GCOspnMultiplePolylines ></span>
			</div>
			</div>
			<div title="" >
				<input type=checkbox id=GCOchkClosedPolylines onchange="GCO.toggleClosedPolylines();" checked >
				closed polylines<span id=GCOspnClosedPolylines ></span>
			</div>

			<div title="" >
				<input type=checkbox id=GCOchkClockwise onchange="GCO.toggleClockwise();" checked >
				clockwise or not<span id=GCOspnClockwise ></span>
			</div>

			<div title="Display tags with the elevation of each contour" >
				<input type=checkbox id=GCOchkLabels onchange="GCO.toggleLabels()" >
				level labels
			</div>

		</div>

		<hr>

		<p>
			<button onclick=GCO.removeShortSegments(); >remove very short polylines</button><br>
			Click until number removed is 0
		</p>

		<div id=GCOdivStatsNew ></div>

		<p>
			<button onclick=GCO.joinAdjacentSegments(); >join adjacent polylines</button>
		</p>

		<div id=GCOdivJoinSegments > </div>


	</details>
	`;

	return htm;
};



GCO.reset = function () {

	scene.remove(GCO.contourPoints, GCO.labels, GCO.contourLines);

	GCO.constant = 0;
	GCO.index = 0;

	GCO.pointsOfIntersection = new THREE.Geometry();
	GCO.points = [];
	GCO.contourPoints = new THREE.Group();
	GCO.labels = new THREE.Group();
	GCO.contourLines = new THREE.Group();
	GCO.contourLines.name = "GCO.contourLines";
	GCO.closed = new THREE.Group();
	GCO.shortPolylines = new THREE.Group();
	GCO.telltales = new THREE.Group();

	GCO.countFaces = 0;
	GCO.countVertices = 0;

	scene.add(GCO.contourPoints);
	scene.add(GCO.labels);
	scene.add(GCO.contourLines);
	scene.add(GCO.closed);
	scene.add(GCO.shortPolylines);
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
	GCOchkShortPolylines.checked = false;
	GCOchkMultiplePolylines.checked = false;
	GCOchkClosedPolylines.checked = false;
	GCOchkClockwise.checked = false;

	GCO.timeStart = performance.now();

};


GCO.getMessage = function () {

	mesh.material.opacity = 0.2;
	meshPlane.material.opacity = 0.2;

	const polylines = GCO.contourLines.children.reduce((acc, child) => {

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
Count: ${ lins}</br>
Polylines: ${ polylines.toLocaleString()}</br>
Points: ${ GCO.points.length.toLocaleString()}</br>
<p>
Time: ${ GCO.timeTaken.toLocaleString()} milliseconds
</p>
`;

	return htm;

};


function getStats() {

	const vertices = contours.reduce((acc, contour) => acc += contour.length, 0)

	const htm =
		`
	<p>contours: ${ contours.length}</p>
	<p>vertices: ${ vertices}</p>
	`;

	divStats.innerHTML = htm;

}


////////// draw contours

GCO.setContourPosition = function () {

	mesh.geometry.computeBoundingBox();

	const size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());

	meshPlane.position.z = (size.z * GCOrngContourPosition.value) / 100 - 0.5 * size.z;

	GCOoutContourPosition.innerHTML = (100 * GCOrngContourPosition.value) / 100;

};


GCO.getContourPoints = function (count = GCO.contoursLength) {

	GCO.reset();

	GCO.count = count;

	GCO.contoursLength = GCO.count;
	GCOrngContoursCount.value = GCO.count;
	GCOoutContourCount.innerHTML = GCO.count;

	GCO.box3 = new THREE.Box3().setFromObject(mesh);
	const size = GCO.box3.getSize(new THREE.Vector3());

	if (GCO.count === 1) {

		GCO.delta = 0;

	} else {

		GCO.delta = - size.z / (GCO.count - 1);

	}

	GCO.delta = GCO.count > 1 ? - size.z / (GCO.count - 1) : size.z / 2;

	GCO.drawContour();

};


GCO.drawContour = function () {

	if (GCO.index < GCO.contoursLength) {

		let elevation = GCO.index * GCO.delta + GCO.box3.max.z;

		elevation = GCO.count === 1 ? meshPlane.position.z : elevation;

		GCO.setContourPlaneElevation(elevation);

		//console.log(GCO.index, 'meshPlane.position.z', meshPlane.position.z);

		GCO.index++;

		GCO.contours = GCP.getIntersectionPoints();

		GCOdivMessage.innerHTML =
			`
	<p>
	index ${GCO.index}<br>
	elevation ${ elevation.toFixed(2)}<br>
	polylines ${GCO.contours.length}
	</p>
	`;

		console.log("index", GCO.index);

		//console.log('GCO.contours', GCO.contours);

		GCO.drawLines(GCO.contours);

		requestAnimationFrame(GCO.drawContour);


	} else {

		GCO.timeTaken = performance.now() - GCO.timeStart;
		GCOdivMessage.innerHTML = GCO.getMessage();

	}

};


GCO.drawLines = function () {

	const lines = new THREE.Group();

	for (let vertices of contours) {

		const geometry = new THREE.Geometry();
		geometry.vertices = vertices;

		const material = new THREE.LineBasicMaterial({ color: 0xffffff * Math.random() });
		const line = new THREE.Line(geometry, material);

		lines.add(line);

	}
	GCO.contourLines.add(lines);


}

GCO.setContourPlaneElevation = function (elevation = meshPlane.position.z) {

	GCO.constant = elevation;

	if (GCO.constant - GCO.box3.min.z < 0.001) {

		GCO.constant += 0.01;

	} else if (GCO.constant - GCO.box3.max.z < 0.001) {

		GCO.constant -= 0.01;

	}

	meshPlane.position.z = GCO.constant;

};



////////// toggles


GCO.toggleContourPoints = function () {

	if (GCO.contourPoints.children.length === 0) {

		const geometry = new THREE.Geometry();
		geometry.vertices = GCO.points;

		const pointsMaterial = new THREE.PointsMaterial({ size: 0.5, color: 0x00ff00 });

		const points = new THREE.Points(geometry, pointsMaterial);
		// //console.log('points', points);

		GCO.contourPoints.add(points);

		GCO.contourPoints.visible = false;

	}

	GCO.contourPoints.visible = !GCO.contourPoints.visible;

};



GCO.toggleClosed = function () {

	if (GCO.closed.children.length === 0) {

		GCO.contourLines.children.forEach((contours, index) => {

			for (let contour of contours.children) {


				const vertexStart = contour.geometry.vertices[0];

				const vertexEnd = contour.geometry.vertices[contour.geometry.vertices.length - 1];

				const closed = vertexStart.equals(vertexEnd, 1)

				console.log('closed', closed);

				console.log('vertexStart', vertexStart);
				console.log('vertexEnd', vertexEnd);

				if (closed) {

					let geometryTT = new THREE.BoxGeometry(0.3, 0.9, 0.3);
					let materialTT = new THREE.MeshBasicMaterial({ color: "red" });
					let touching = new THREE.Mesh(geometryTT, materialTT);
					touching.position.copy(vertexStart);
					GCO.closed.add(touching);


					geometryTT = new THREE.BoxGeometry(0.3, 0.3, 0.9);
					materialTT = new THREE.MeshBasicMaterial({ color: "blue" });
					touching = new THREE.Mesh(geometryTT, materialTT);
					touching.position.copy(vertexEnd);
					GCO.closed.add(touching);


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


GCO.toggleShortPolylines = function () {

	if (GCO.shortPolylines.children.length === 0) {

		let count = 0;

		for (let i = 0; i < GCO.contourLines.children.length; i++) {

			const lines = GCO.contourLines.children[i];

			//console.log('short lines', lines.children.length);

			for (let j = 0; j < lines.children.length; j++) {

				const line = lines.children[j];

				const length = GCO.getLength(line);


				if (length < 0.09) {
					count++;

					vertexStart = line.geometry.vertices[0]
					vertexEnd = line.geometry.vertices[ line.geometry.vertices.length - 1 ]
					console.log('j', j, 'length', length, "line", line);

					let geometryTT = new THREE.BoxGeometry(0.3, 2, 0.3);
					let materialTT = new THREE.MeshBasicMaterial({ color: "magenta" });
					let touching = new THREE.Mesh(geometryTT, materialTT);
					touching.position.copy(vertexStart);
					GCO.shortPolylines.add(touching);


					geometryTT = new THREE.BoxGeometry(0.3, 0.3, 2);
					materialTT = new THREE.MeshBasicMaterial({ color: "cyan" });
					touching = new THREE.Mesh(geometryTT, materialTT);
					touching.position.copy(vertexEnd);
					GCO.shortPolylines.add(touching);

	//				GCO.contourLines.children[i].children.splice(j, 1);


				}
			}

		}

		GCO.shortPolylines.visible = false;

		console.log('short line count', count);

		GCOspnShortPolylines.innerHTML = `${ count } found`
	}

	GCO.shortPolylines.visible = !GCO.shortPolylines.visible;


}


GCO.toggleMultiplePolylines = function () {

	if ( GCOchkMultiplePolylines.checked ) {

		GCO.contourLines.children.forEach((contour, index) => {

			console.log('contour.length', contour.children.length);

			if (contour.children.length === 1) {

				contour.visible = false;
			} else {

				console.log('', contour.children);

			}


		});

	} else {

		GCO.contourLines.children.forEach(contour => contour.visible = true);

	}

};


GCO.toggleClosedPolylines = function () {

	if ( GCOchkClosedPolylines.checked ) {

		GCO.contourLines.children.forEach(contours => {


			for ( let contour of contours.children ) {

				//console.log( 'cc', contour );
				const vertices = contour.geometry.vertices;

				//console.log( '', vertices );
				const vertexStart = vertices[0];
				const vertexEnd = vertices[vertices.length - 1];

				if (vertexStart.equals(vertexEnd, GCO.tolerance ) ) {

					contour.visible = true;

				} else {

					contour.visible = false;

				}

			}


		});

	} else {

		GCO.contourLines.children.forEach(contour => contour.children.forEach( line => line.visible = true ) );

	}

}


GCO.toggleClockwise = function () {

	if ( GCOchkClockwise.checked ) {

		GCO.contourLines.children.forEach(contours => {


			for ( let contour of contours.children ) {

				//console.log( 'cc', contour );
				const vertices = contour.geometry.vertices;

				//console.log( '', vertices );
				const vertexStart = vertices[0];
				const vertexSecond = vertices[1];
				const vertexEnd = vertices[vertices.length - 2];

				const plane = GCO.getPlane(vertices)

				if (plane) {

					normal = plane.normal

					console.log('normal', normal, vertices.length );

					if (normal.z < 0) {

						console.log('11', vertices[ 1 ]);
						vertices.reverse();
						console.log('22', vertices[ 1 ]);
						contour.geometry.verticesNeedUpdate = true;

						plane2 = GCO.getPlane( vertices)

						contours.remove(contour);

						const geometry = new THREE.Geometry();
						geometry.vertices = vertices;

						const material = new THREE.LineBasicMaterial({ color: "magenta" });
						const line = new THREE.Line(geometry, material);

						contours.add( line )

					}

				} else {

					console.log('contour', contour);
				}


				// if (vertexStart.equals(vertexEnd, GCO.tolerance ) ) {

				// 	contour.visible = true;

				// } else {

				// 	contour.visible = false;

				// }

			}


		});

	} else {

		GCO.contourLines.children.forEach(contour => contour.children.forEach( line => line.visible = true ) );

	}

};


GCO.getPlane = function( points, start = 0 ) {
	//console.log( 'points', points, start );

	if ( points.length - start - 2 <= 0 ) { return }

	const triangle = new THREE.Triangle();

	triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );

	if ( triangle.getArea() === 0 && ( ++start < points.length - 2 ) ) { // looks like points are colinear and do not form a plane therefore try next set of points

		GCO.getPlane( points, start );

	}

	return triangle.getPlane( new THREE.Plane() );

};

GCO.toggleLabels = function () {


	if (GCO.labels.children.length === 0) {

		GCO.contourLines.children.forEach((contour, index) => {

			let elevation = index * GCO.delta + GCO.box3.max.z;
			const label = drawPlacard(index + ". " + elevation.toFixed(1), 0.02, 120, GCO.box3.min.x - 5, 0, elevation);
			GCO.labels.add(label);

		});

		GCO.labels.visible = false;

	}

	GCO.labels.visible = !GCO.labels.visible;

};




////////// Edit model


GCO.removeShortSegments = function () {

	//const vertexArrays = GCO.contourLines.children[0].children.map(line => line.geometry.vertices);
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

	GCOdivStatsNew.innerHTML = `<p>segments removed: ${segmentsStart - segmentsEnd}<br>segments now: ${segmentsEnd}</p>`;

};



GCO.getLength = function (line) {

	line.computeLineDistances();

	const length = line.geometry.lineDistances.reduce((acc, distance) => acc += distance, 0);

	return length;


};



GCO.joinAdjacentSegments = function () {

	scene.remove(GCO.telltales);

	GCO.telltales = new THREE.Group();

	const segmentsStart = GCO.contourLines.children.reduce((acc, child) => acc += child.children.length, 0);

	let count = 0;

	for (let i = 0; i < GCO.contourLines.children.length; i++) {

		lines = GCO.contourLines.children[i];

		console.log("\n\nindex", i);
		console.log('extra lines length', lines.children.length);

		if (lines.children.length === 1) { continue; }

		for (let j = 0; j < lines.children.length; j++) {

			let line = lines.children[j];


			console.log('extra line vertices ', line.geometry.vertices.length);

			if (line.geometry.vertices.length < 4) {

				length = GCO.getLength(line);

				console.log('j', j, 'length', length);

			} else if (j < lines.children.length - 1) {

				point = line.geometry.vertices[line.geometry.vertices.length - 1]

				points = lines.children[j + 1].geometry.vertices

				//pt = GCO.getNearestPointIndex(point, points)

				let index = 999;

				for (let i = 0; i < points.length; i++) {

					const p = points[i];
					if (p.equals(point, 0.01)) {

						index = i;
						break;
					}
				}

				if (index !== 999) {

					console.log('index nearest', index, point, points[index]);

					console.log('v1', line.geometry.vertices, points);

					lines.remove(lines.children[j]);

					geometry = line.geometry;
					geometry.vertices.push(...points);

					material = new THREE.LineBasicMaterial({ color: "magenta" });
					lineNew = new THREE.Line(geometry, material);

					lines.add(lineNew);

					console.log('v2', line.geometry.vertices, points);

					//lines.children.splice(j + 1, 1)

					lines.remove(lines.children[j + 1])

					const pointFirst = line.geometry.vertices[0];
					//console.log('test pointFirst', pointFirst);

					let geometryTT = new THREE.BoxGeometry(0.3, 0.3, 2);
					let materialTT = new THREE.MeshBasicMaterial({ color: "red" });
					const telltale = new THREE.Mesh(geometryTT, materialTT);
					telltale.position.copy(pointFirst);
					GCO.telltales.add(telltale);


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

	GCOdivJoinSegments.innerHTML = `<p>segments removed: ${segmentsStart - segmentsEnd}<br>segments now: ${segmentsEnd}</p>`;

};
