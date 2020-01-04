// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou.github.io/templates-013/threejs-hamburger/
// 2020-01-03
/* global THREE */
// jshint esversion: 6
// jshint loopfunc: true

const CFR = {};



CSV.init = function () {

	divBrowseModels.innerHTML += CFR.getMenu();

};


CFR.getMenu = function () {

	const htm = `
<details open >

	<summary>File open CSV file</summary>

	<p>Open a CSV file using the file dialog box</p>

	<p><input type=file id=inpFile onchange=CFR.openFile(this); accept = '.csv' ></p>

	<div id=CFRdivOnProgress ></div>

	<div id=CFRdivOnLoad ></div>

	<div id=CFRdivStatisticsModel ></div>

</details>
`;

	return htm;

};



CFR.openFile = function ( files ) {

	url = "";
	
	const reader = new FileReader();

	reader.onprogress = ( event ) => {

		CSVdivOnProgress.innerHTML = `<p>loaded: ${ event.loaded.toLocaleString() }</p>`;
		//console.log( 'event', event );

	};

	reader.onload = function ( event ) {

		//txtArea.innerHTML = reader.result;

		//window.dispatchEvent( eventResetAll );

		CSVdivOnLoad.innerHTML = `
<p>
	name: ${ files.files[ 0 ].name }<br>
	size: ${ files.files[ 0 ].size.toLocaleString() } bytes<br>
	type: ${ files.files[ 0 ].type }<br>
	modified: ${ files.files[ 0 ].lastModifiedDate.toLocaleDateString() }
</p>

`;

		CSV.parseCsvText( reader.result );

	};

	reader.readAsText( files.files[ 0 ] );

};



CSV.init();
