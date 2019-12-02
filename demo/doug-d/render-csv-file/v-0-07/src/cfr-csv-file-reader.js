
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





CFR.getLines = function( csv ) {

	const lines = csv.split( /\n/g ).map( line => line.split( ',' ) ).slice( 1, -1 );
	//console.log('lines', lines);

	let elevationPrevious = -1;
	const contours = [];
	let contour = [];

	for ( let i = 0; i < lines.length; i++ ) {

		const line = lines[ i ];
		elevation = line[ 3 ];
		contour.push( line );

		if ( elevation !== elevationPrevious ) {

			//contour.push( lineStart );

			contours.push( contour );
			elevationPrevious = elevation;
			contour = [];

		}

	}

	//console.log({ contours });

	CFR.renderLines( contours )
}


CFR.renderLines = function( contours ) {

	scene.remove( mesh );

	CFR.geometry = new THREE.Geometry();
	const geometry = new THREE.Geometry();

	for ( let contour of contours ) {

		geometry.vertices = contour.map( vertex => new THREE.Vector3().fromArray( vertex.map( coor => parseFloat( coor ) ) ) );

		CFR.geometry.merge(geometry);

	}

	const material = new THREE.LineBasicMaterial( { color: 0xffffff * Math.random() } );
	mesh = new THREE.Line( CFR.geometry, material );

	scene.add(mesh);

	zoomObjectBoundingSphere();

}
