
const CFR = {};


CFR.getMenu = function () {

	const htm =
		`
<details open >

	<summary>File open CSV file</summary>

	<p>Open a CSV file using the file dialog box</p>

	<p><input type=file id=inpFile onchange=CFR.openFile(this); accept = '.csv' ></p>

	<div id=CFRdivMessage ></div>

</details>
	`;

	return htm;

};



CFR.openFile = function (files) {

	const reader = new FileReader();

	reader.onload = function (event) {

		//txtArea.innerHTML = reader.result;

		window.dispatchEvent(eventResetAll);

		CFRdivMessage.innerHTML =
		`
			<p>
				name: ${ files.files[0].name}<br>
				size: ${ files.files[0].size.toLocaleString() } bytes<br>
				type: ${ files.files[0].type }<br>
				modified: ${ files.files[0].lastModifiedDate.toLocaleDateString() }
			</p>
		`;

		CFR.getLines( reader.result );

	}

	reader.readAsText(files.files[0]);

};





CFR.getLines = function (csv) {

	const lines = csv.split(/\n/g).map(line => line.split(',')).slice(1, -1);
	//console.log('lines', lines);

	let elevationPrevious = lines[0];
	const contours = [];
	let contour = [];

	for (let i = 0; i < lines.length; i++) {

		const line = lines[i];

		const elevation = line[3];

		if (elevation !== elevationPrevious) {

			contours.push(contour);
			elevationPrevious = elevation;
			contour = [];

		}

		contour.push(line);
	}

	CFR.contours = contours;
	DLB.renderLines(contours)

};


CFR.nnnrenderLines = function( contours ) {

	scene.remove(mesh);

	mesh = new THREE.Group();

	for ( let contour of contours ) {

		const geometry = new THREE.Geometry();
		geometry.vertices = contour.map( vertex => new THREE.Vector3().fromArray( vertex.map( coor => parseFloat( coor ) ) ) );

		if (geometry.vertices.length > 1) {

			const material = new THREE.LineBasicMaterial( { color: 0xffffff * Math.random() } );
			const line = new THREE.Line(geometry, material);

			mesh.add( line );

		} else {

			console.log('contour', contour);

		}

	}

	scene.add(mesh);

	zoomObjectBoundingSphere();

}
