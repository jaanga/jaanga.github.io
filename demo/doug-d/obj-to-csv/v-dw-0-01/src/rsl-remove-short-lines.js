// copyright Theo Armour. MIT license.
/* global THREE, scene, GCP */
// jshint esversion: 6
// jshint loopfunc: true


const RSL = {};


RSL.getMenu = function () {

	const htm =

		`
<details id=detRSL open>

	<summary>Edit contour lines</summary>

	<p></p>

	<div id=RSLdivMessage></div>

	<p>
		<button onclick=RSL.removeShortSegments(); >remove very short polylines</button><br>
	</p>

	<div id=RSLdivStatsNew ></div>

	<p>
		<button onclick=RSL.joinAdjacentSegments(); >join adjacent polylines</button>
	</p>

	<div id=RSLdivJoinSegments > </div>

	<hr>

</details>

`;

	return htm;

};


RSL.reset = function () {

	const vertexArrays = GCL.contourLines.children.map(line => line.geometry.vertices);
	//console.log('test vertexArrays', vertexArrays);

	const lineArrays = GCL.contourLines.children;

	let verticesLow = 0;
	let lengthSmall = 0;

	for (let i = 0; i < lineArrays.length; i++) {

		const line = lineArrays[i];

		const length = RSL.getLength(line);

		verticesCount = line.geometry.vertices.length;

		if (length < 4) {

			verticesLow++
			// console.log('i', i, 'length', length, "line", line);

		}


		if (length < 0.09) {

			lengthSmall++

			// console.log('i', i, 'length', length, "line", line);

			//GCL.contourLines.children[i].children.splice(j, 1);

		}

	}

	htm =

		`
<p>
vertices low: ${ verticesLow }<br>
length small: ${ lengthSmall }<br>
</p>
`;

	RSLdivMessage.innerHTML = htm;

};




RSL.getMessage = function () {

	const vertexArrays = GCL.contourLines.children.map(line => line.geometry.vertices);
	console.log('test vertexArrays', vertexArrays );



	const htm =
		`

Contours<br>

</p>
`;

	return htm;

};




RSL.removeShortSegments = function () {

	const vertexArrays = GCL.contourLines.children.map(line => line.geometry.vertices);
	//console.log('test vertexArrays', vertexArrays );

	const segmentsStart = vertexArrays.length;

	let count = 0;

	const lineArrays = GCL.contourLines.children;

	for (let i = 0; i < lineArrays.length; i++) {

		const line = lineArrays[i];

		const length = RSL.getLength(line);

		if (length < 0.09) {

			console.log( i, 'length', length, "line", line);

			lineArrays.splice(i, 1);

			count++;

		}


	}

	console.log('short line count', count);

	const segmentsEnd = GCL.contourLines.children.length;

	RSLdivStatsNew.innerHTML = `<p>segments removed: ${segmentsStart - segmentsEnd}<br>segments now: ${segmentsEnd}</p>`;

};



RSL.getLength = function (line) {

	line.computeLineDistances();

	const length = line.geometry.lineDistances.reduce((acc, distance) => acc += distance, 0);

	return length;

};



RSL.joinAdjacentSegments = function () {

	alert( "not yet re-implemented " )

	return;

	scene.remove(RSL.telltales);

	RSL.telltales = new THREE.Group();

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

				length = RSL.getLength(line);

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
					RSL.telltales.add(telltale);


				}

			}

			count++;

		}

		count = count - 1;

		scene.add(RSL.telltales);
		//count += lines.children.length - 1;

	}

	console.log('extra line total count', count);

	const segmentsEnd = GCL.contourLines.children.length

	RSLdivJoinSegments.innerHTML = `<p>segments removed: ${segmentsStart - segmentsEnd}<br>segments now: ${segmentsEnd}</p>`;

};
