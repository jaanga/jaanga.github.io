
const CSV = {};

CSV.type = "";

CSV.getMenu = function () {

	window.addEventListener("onresetall", CSV.reset, false);

	const htm =
		`
		<details open>

			<summary>Export contour data</summary>

			<p>Export contour data to CSV file as continuous lines or as individual two vertex segments.</p>

			<p>
				<button onclick=CSV.getCsvLines(); >get CSV lines</button>
			</p>

			<p>
				<button onclick=CSV.saveFile(); >Save to file</button>
			</p>

			<div id=CSVdivCsv style=font-size:1ch;max-height:50ch;overflow:auto; ></div>

		</details>
		`

	return htm;
}


CSV.reset = function () {

	CSVdivCsv.innerText = "output will appear here";

};


CSV.getCsvLines = function () {

	if (!GCO.contourLines.children.length ) {
		alert("first click 'get points'") }

	CSV.type = "lines";

	let txt = "";

	CSVdivCsv.innerText = "output will appear here";

	index = 1;

	for (let i = 0; i < GCO.contourLines.children.length; i++) {

		contour = GCO.contourLines.children[i];

		console.log('contour', contour);

		for ( let j = 0; j < contour.children.length; j++ ) {

			for (let k = 0; k < contour.children[ j ].geometry.vertices.length; k++) {

				txt += `${ contour.children[ j ].geometry.vertices[ k ].toArray()},${ index }\n`;

			}

			index++;
		}
	}

	CSVdivCsv.innerText = txt;

};




 CSV.saveFile = function() {

	const blob = new Blob([CSVdivCsv.innerText]);
	const name = mesh.name || "test";
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = `${ name }-${ CSV.type }-${ GCO.contoursLength }.csv`;
	a.click();
	//		delete a;
	a = null;

}
