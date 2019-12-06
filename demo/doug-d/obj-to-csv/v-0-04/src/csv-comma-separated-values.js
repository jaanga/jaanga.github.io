
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

				<button onclick=CSV.getCsvSegments(); >get CSV segments</button>
			</p>

			<p>
				<button onclick=CSV.saveFile(); >Save File</button>
			</p>

			<div id=CSVdivCsv style=max-height:50ch;overflow:auto; ></div>

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

	for (let i = 0; i < GCO.contourLines.children.length; i++) {

		contour = GCO.contourLines.children[i];

		console.log('cc', contour);

		for (let j = 0; j < contour.geometry.vertices.length; j++) {

			txt += `${ contour.geometry.vertices[j].toArray()},${i}\n`;

		}
	}

	CSVdivCsv.innerText = txt;

};


CSV.getCsvSegments = function () {

	if (!GCO.contourSegments.children.length ) {
		alert("first click 'get points'") }

	CSV.type = "segments";

	let txt = "";
	CSVdivCsv.innerText = "output will appear here";
	for (let i = 0; i < GCO.contourSegments.children.length; i++) {

		contour = GCO.contourSegments.children[i];

		console.log('cc', contour);

		for (let j = 0; j < contour.children.length; j++) {

			line = contour.children[j];

			console.log('', line);
			txt +=
`${ line.geometry.vertices[0].toArray()},${i}
${ line.geometry.vertices[1].toArray()},${i}\n`;

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
