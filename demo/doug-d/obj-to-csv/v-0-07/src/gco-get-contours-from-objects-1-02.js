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

GCO.setContourPosition = function () {

	mesh.geometry.computeBoundingBox();

	const size = mesh.geometry.boundingBox.getSize(new THREE.Vector3());

	meshPlane.position.z = (size.z * GCOrngContourPosition.value) / 100 - 0.5 * size.z;

	GCOoutContourPosition.innerHTML = (100 * GCOrngContourPosition.value) / 100;

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



GCO.drawContour = function () {

	if (GCO.index < GCO.contoursLength) {

		let elevation = GCO.index * GCO.delta + GCO.box3.max.z;

		elevation = GCO.count === 1 ? meshPlane.position.z : elevation;

		GCO.setContourPlaneElevation(elevation);

		//console.log(GCO.index, 'meshPlane.position.z', meshPlane.position.z);

		GCO.index++;

		GCOdivMessage.innerHTML = `<p>index ${GCO.index}</p>`;

		console.log( "index", GCO.index, "elevation", elevation);

		GCO.contours = GCP.getIntersectionPoints();

		console.log('GCO.contours', GCO.contours);


		GCO.drawLines( GCO.contours );

		requestAnimationFrame( GCO.drawContour );



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
		lines.add ( line );

	}
	GCO.contourLines.add ( lines );


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




function getStats() {

	const vertices = contours.reduce((acc, contour) => acc += contour.length, 0)

	const htm =
		`
	<p>contours: ${ contours.length}</p>
	<p>vertices: ${ vertices}</p>
	`;

	divStats.innerHTML = htm;

}



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
