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

	<p>Connect the contour points in a correct sequence of points. Not Easy.</p>

	<p>
		<button onclick=GCL.getContourLines(); >get contour lines </button>
	</p>

	<div id=GCLdivMessage >Statistics will appear here"</div>

	<hr>

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

	GCLdivMessage.innerHTML = "Statistics will appear here"

};




GCL.getMessage = function () {

	mesh.material.opacity = 0.2;
	meshPlane.material.opacity = 0.2;

	const ccpolylines = GCL.contourLines.children.reduce((acc, child) => {

		acc += child.children.length;

		return acc;

	}, 0);

	const polylines = GCL.contourLines.children.length;

	GCO.timeTaken = 23; // performance.now() - GCO.timeStart;

	const htm =
		`

Contours<br>
Polylines: ${ polylines.toLocaleString()}</br>
<p>
Time: ${ GCO.timeTaken.toLocaleString()} milliseconds
</p>
`;

	return htm;

};


GCL.getContourLines = function () {

	if (GCP.isolines.length === 0) { alert("Please first 'get contour points' "); return }

	GCP.isolines.forEach((isoline, index) => {

		GCL.pointsRemaining = isoline.length;

		console.log('index', index);

		GCL.isoline = isoline;

		GCL.points = isoline.map(line => line.intersection);

		GCL.contours = GCL.getContours( GCL.points, [], true);

		//console.log('con', contours);

		//requestAnimationFrame( GCL.addContours )

		GCL.contours.forEach(contour => GCL.addLine(contour ));

	});

	GCLdivMessage.innerHTML = GCL.getMessage();


};

GCL.addContours = function () {

	GCL.contours.forEach(contour => GCL.addLine(contour ));

}


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

	//if (!p1) { console.log('gc', p1, p1Index, currentPoint, points, contour); }
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




////////// Edit model


GCL.removeShortSegments = function () {

	const vertexArrays = GCL.contourLines.children.map(line => line.geometry.vertices);
	console.log('test vertexArrays', vertexArrays );

	const segmentsStart = GCL.contourLines.children.reduce((acc, child) => acc += child.geometry.vertices.length, 0);

	let count = 0;

	for (let i = 0; i < GCL.contourLines.children.length; i++) {

		const lines = GCL.contourLines.children[i];

		console.log('short lines', lines.children.length);

		for (let j = 0; j < lines.children.length; j++) {

			const line = lines.children[j];

			const length = GCL.getLength(line);

			if (length < 0.09) {

				console.log('j', j, 'length', length, "line", line);

				GCL.contourLines.children[i].children.splice(j, 1);

				count++;

			}
		}

	}

	console.log('short line count', count);

	const segmentsEnd = GCL.contourLines.children.reduce((acc, child) => acc += child.children.length, 0);

	GCLdivStatsNew.innerHTML = `<p>segments removed: ${segmentsStart - segmentsEnd}<br>segments now: ${segmentsEnd}</p>`;

};



GCL.getLength = function (line) {

	line.computeLineDistances();

	const length = line.geometry.lineDistances.reduce((acc, distance) => acc += distance, 0);

	return length;


};



GCL.joinAdjacentSegments = function () {

	scene.remove(GCL.telltales);

	GCL.telltales = new THREE.Group();

	const segmentsStart = GCL.contourLines.children.reduce((acc, child) => acc += child.children.length, 0);

	let count = 0;

	for (let i = 0; i < GCL.contourLines.children.length; i++) {

		lines = GCL.contourLines.children[i];

		console.log("\n\nindex", i);
		console.log('extra lines length', lines.children.length);

		if (lines.children.length === 1) { continue; }

		for (let j = 0; j < lines.children.length; j++) {

			let line = lines.children[j];


			console.log('extra line vertices ', line.geometry.vertices.length);

			if (line.geometry.vertices.length < 4) {

				length = GCL.getLength(line);

				console.log('j', j, 'length', length);

			} else if (j < lines.children.length - 1) {

				point = line.geometry.vertices[line.geometry.vertices.length - 1]

				points = lines.children[j + 1].geometry.vertices

				//pt = GCL.getNearestPointIndex(point, points)

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
					GCL.telltales.add(telltale);


				}

			}

			count++;

		}

		count = count - 1;

		scene.add(GCL.telltales);
		//count += lines.children.length - 1;

	}

	console.log('extra line total count', count);

	const segmentsEnd = GCL.contourLines.children.reduce((acc, child) => acc += child.children.length, 0);

	GCLdivJoinSegments.innerHTML = `<p>segments removed: ${segmentsStart - segmentsEnd}<br>segments now: ${segmentsEnd}</p>`;

};
