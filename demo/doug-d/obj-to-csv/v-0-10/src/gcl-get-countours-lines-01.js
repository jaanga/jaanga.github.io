

const GCL = {};

GCL.tolerance = 0.001;
GCL.contourLines = undefined;

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

GCL.reset = function() {

	scene.remove(GCL.contourLines)

	GCL.contourLines = new THREE.Group();

	scene.add(GCL.contourLines);

}

GCL.getContourLines = function () {

	//console.log('', GCP.facesIsolines);

	index = 0;

	for (isoline of GCP.isolines) {

		console.log('index', ++ index );
		GCL.isoline = isoline;
		GCL.getIsoline( isoline);

	}

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

	//console.log( 'GCL.faces', GCL.faces );

	//obj = { face: face1, vertexNext: face1.intersections[1] }

	i = 0;

	GCL.getNextObj( line1 );

};



GCL.getNextObj = function ( line ) {
	//console.log("vertex", vertex);

	let lineNext = GCL.getLineNext( line);
	//console.log('lineNext', lineNext);

	if ( lineNext && lineNext.intersection ) {

		GCL.vertices.push( lineNext.intersection);
		GCL.index.push( lineNext.index);

		GCL.getNextObj( lineNext);


	} else {

		GCL.addLine(GCL.vertices);

	}

};

GCL.getLineNext = function ( lineCurrent ) {

	//console.log('\nlineCurrent', lineCurrent );

	let vertexNext;
	let index;
	let line;


	i++;

	if (i > GCL.isoline.length ) return;

	const linePair = GCL.isoline.filter( line => line.intersection.equals(lineCurrent.intersection, GCL.tolerance));
	//console.log( 'linePair', linePair);

	//faceCurrent = GCL.faces.find(face => face.indexFace === lineCurrent.indexFace)
	//console.log('faceCurrent', faceCurrent, faceCurrent.indexFace);

	const lineOther = linePair.find(line => line.indexFace !== lineCurrent.indexFace);

	if (!lineOther) { return }

	//console.log( 'lineOther', lineOther, lineOther.indexFace );

	indexFacesOther = GCL.faces.filter(face => face.indexFace === lineOther.indexFace).map(face => face.index )
	//console.log('indexFacesOther', indexFacesOther );

	indexFaceOther = indexFacesOther.find( index => index !== lineOther.index);
	//console.log('indexFaceOther', indexFaceOther );

	faceOther = GCL.faces.find( face => face.index === indexFaceOther )
	//console.log('faceOther', faceOther);

	const lineNext = GCL.isoline.find( line => line.index === faceOther.index && line.indexFace === faceOther.indexFace )

	return lineNext;

};



GCL.addLine = function (vertices) {

	//console.log('vertices.length', vertices.length);
	//console.log('vertices', vertices);

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;

	const material = new THREE.LineBasicMaterial({ color: "red" });
	const line = new THREE.Line(geometry, material);

	GCL.contourLines.add(line);

};
