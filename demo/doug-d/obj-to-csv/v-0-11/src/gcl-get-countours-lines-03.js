

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
</details>

`;

	return htm;

};

GCL.reset = function () {

	scene.remove(GCL.contourLines)

	GCL.contourLines = new THREE.Group();

	scene.add(GCL.contourLines);

};

GCL.getContourLines = function () {

	GCP.isolines.forEach((isoline, index) => {

		GCL.pointsRemaining = isoline.length;

		console.log('index', index);
		GCL.isoline = isoline;
		GCL.getIsoline(isoline);

	});

};


GCL.getIsoline = function (isoline) {

	const line0 = isoline[0];
	const line1 = isoline[1];

	GCL.vertices = [ line0.intersection ];
	GCL.index = [line0.index ];

	GCL.faces = isoline.map(line => {

		const indexFace = line.indexFace;
		const index = line.index;
		const intersection = line.intersection;
		return { indexFace, index, intersection };

	});

	GCL.count = 0;

	GCL.getNextObj( line1 );

};



GCL.getIsolineNext = function (line0, line1 ) {

	//const line0 = isoline[0];
	//const line1 = isoline[1];

	GCL.pointsRemaining = GCL.isoline.length - GCL.vertices.length;

	GCL.linePrevious = line0;
	GCL.vertices = [ line0.intersection ];
	GCL.index = [line0.index ];

	// GCL.faces = isoline.map(line => {

	// 	const indexFace = line.indexFace;
	// 	const index = line.index;
	// 	const intersection = line.intersection;
	// 	return { indexFace, index, intersection };

	// });

	GCL.count = 0;

	GCL.getNextObj( line1 );

};


GCL.getNextObj = function ( line ) {
	//console.log("line", line);

	let line1, line2;
	let lineNext = GCL.getLineNext( line);
	//console.log('lineNext', lineNext);

	if ( lineNext && lineNext.intersection ) {

		GCL.vertices.push( lineNext.intersection);
		//GCL.index.push( lineNext.index);

		GCL.getNextObj( lineNext);

	} else {

		//console.log('GCL.vertices.len', GCL.vertices.length);

		const cw = THREE.ShapeUtils.isClockWise(GCL.vertices);
		//console.log('cw', cw);

		if ( cw === true ) { GCL.vertices.reverse() }

		const cw2 = THREE.ShapeUtils.isClockWise(GCL.vertices);
		console.log('cw', cw, cw2 );


		//if (GCL.contourLines.children.length < 1) {
			GCL.addLine(GCL.vertices);
		//}

		if (GCL.vertices.length < GCL.isoline.length) {

			console.log('lengths', GCL.vertices.length, GCL.isoline.length);

			for (let line of GCL.isoline) {

				for (let vertex of GCL.vertices) {

					if (line.intersection.equals(vertex, GCL.tolerance) === false) {

						line0 = line;

						faces = GCL.isoline.filter(face => face.indexFace === line0.indexFace);
						//console.log('faces', faces);

						line1 = faces.find(face => face.index !== line0.index)

						mm = line1.intersection.equals(line0.intersection, GCL.tolerance)
						console.log('mm', mm);

						break;
					}
				}

				if (line1) {

					break;

				}

			}


			console.log('line0', line0);
			console.log('line1', line1);

			GCL.addLine([line0.intersection, line1.intersection], "green");
			//GCL.getIsolineNext(line0, line1);

			// GCL.vertices = [line1.intersection];
			// GCL.index = [line1.index];
			// GCL.count = 0;

			if (line1.index  && line1 !== GCL.linePrevious ) {
				console.log('line1', GCL.vertices.length, line1);

				GCL.linePrevious = line1;

				GCL.getNextObj(line1);
			}

		} else {

		}

		//console.log('lengths', GCL.vertices.length, GCL.isoline.length);

	}

};


GCL.getLineNext = function (lineCurrent) {
	//console.log('\nlineCurrent', lineCurrent );

	GCL.count++;

	if (GCL.count >= GCL.pointsRemaining ) return;

	const linePair = GCL.isoline.filter(line => line.intersection.equals(lineCurrent.intersection, GCL.tolerance));
	//console.log( 'linePair', linePair);

	const lineOther = linePair.find(line => line.indexFace !== lineCurrent.indexFace);

	if (lineOther) {
		//console.log( 'lineOther', lineOther, lineOther.indexFace );

		indexFacesOther = GCL.faces.filter(face => face.indexFace === lineOther.indexFace).map(face => face.index)
		//console.log('indexFacesOther', indexFacesOther );

		indexFaceOther = indexFacesOther.find(index => index !== lineOther.index);
		//console.log('indexFaceOther', indexFaceOther );

		faceOther = GCL.faces.find(face => face.index === indexFaceOther)
		//console.log('faceOther', faceOther);

		const lineNext = GCL.isoline.find(line => line.index === faceOther.index && line.indexFace === faceOther.indexFace)

		return lineNext;

	} else {

		return;
	}

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
