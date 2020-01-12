// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou.github.io/templates-013/threejs-hamburger/v-0-02/src/
// 2020-01-03
/* global THREE */
// jshint esversion: 6
// jshint loopfunc: true



const CSV = {};



CSV.init = function () {

	CSV.eventOnFileParseCsv = new Event( "onfileparsecsv" );

	// listening dlm-draw-line-mesh-xx.js

	divBrowseModels.innerHTML += CSV.getMenu();

};



CSV.getMenu = function () {

	htm = `
<details id=detCSV open>
	<summary>CSV file statistics</summary>

	<div id=CSVdivFileStatistics ></div>

	<div id=CSVdivOnProgress ></div>

	<div id=CSVdivOnLoad ></div>

</details>
`;

	return htm;

};



CSV.parseCsvText = function ( csvText ) {

	const lines = csvText.split( /\n/g ).map( line => line.split( ',' ) ).slice( 1, -1 );
	//console.log('lines', lines);

	let elevationPrevious = lines[ 0 ];
	const contours = [];
	let contour = [];

	for ( let i = 0; i < lines.length; i++ ) {

		const line = lines[ i ];

		const elevation = line[ 3 ];

		if ( elevation !== elevationPrevious ) {

			contours.push( contour );
			elevationPrevious = elevation;
			contour = [];

		}

		contour.push( line );
	}

	CSV.contours = contours;
	//console.log( 'csv', CSV.contours );

	CSV.getStats();

	window.dispatchEvent( CSV.eventOnFileParseCsv );

};



CSV.getStats = function () {

	// add number of full contour lines

	const vertices = CSV.contours.reduce( ( acc, arr ) => acc += arr.length, 0 );

	const htm = `
<p>
	contour segments: ${ CSV.contours.length.toLocaleString() }<br>
	vertices: ${ vertices.toLocaleString() }
</p>
`;

	CSVdivFileStatistics.innerHTML = htm;

};



CSV.init();