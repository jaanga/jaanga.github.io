// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou.github.io/templates-013/threejs-hamburger/v-0-02/src/
// 2020-01-03
/* global THREE */
// jshint esversion: 6
// jshint loopfunc: true


const CVJ = {};



CVJ.url = "https://api.github.com/repos/jaanga/jaanga.github.io/git/trees/master?recursive=1";
CVJ.prefix = "https://rawcdn.githack.com/jaanga/jaanga.github.io/master/";


CVJ.init = function () {

	divBrowseModels.innerHTML += CVJ.getMenu();

};



CVJ.getMenu = function () {

	//const options =

	const htm =
		`
<details ontoggle=CVJ.getFileNames(); >

	<summary>CSV Jaanga files</summary>

	<p>A list of CSV files from <a href="https://github.com/jaanga/jaanga.github.io/tree/master/demo/doug-d/csv-file-samples" target="_blank">jaanga</a> on GitHub.</p>

	<select id=CVJselCsv onchange=CVJ.setLocationHash(this.value) size=8 ></select>


<!--
	<p>
		<button onclick=getFilesObj(); >get files obj</button>
	</p>

	<p>
		Help for adding new files. See source code.
	</p>
-->

	<div id=CVJdivOnLoad ></div>

</details>
	`;

	return htm;

};


CVJ.getFileNames = function () {

	fetch( CVJ.url )
		.then( response => response.json() )
		.then( json => {

			CVJ.csvData = json.tree.filter( item => item.path.includes( "csv-file-samples" ) ).filter( item => item.path.endsWith( ".csv" ) ).map( item => item.path );

			CVJselCsv.innerHTML = CVJ.getOptions();

		} );

};



CVJ.getOptions = function () {

	const options = CVJ.csvData.map( ( item, index ) => `<option value=${ index }>${ item.split( "/" ).pop() }</option>` );

	CVJdivOnLoad.innerHTML = `<p>files found: ${ options.length }</p>`;

	return options;

};



CVJ.setLocationHash = function ( index ) {

	location.hash = "url=" + CVJ.prefix + CVJ.csvData[ index ];

};


CVJ.init();
