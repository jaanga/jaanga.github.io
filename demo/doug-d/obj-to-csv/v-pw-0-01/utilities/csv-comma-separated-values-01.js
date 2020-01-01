
const CSV = {};

CSV.type = "";

CSV.getMenu = function () {

	window.addEventListener("onresetall", CSV.reset, false);

	const htm =
		`
		<details open>

			<summary>Export contour data</summary>

			<p>Export contour data to CSV file as continuous lines.</p>

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


CSV.getCsvLines = function() {


	let index = 0;

	const lines = GCL.contourLines.children.map( contour => {

		vertices = contour.geometry.vertices;

		const txt = vertices.map( vertex => `${ vertex.toArray() },${index}` ).join( "\n" );

			index++;
			return txt;

	}).join("\n");

	CSVdivCsv.innerText = lines;

}


 CSV.saveFile = function() {

	const blob = new Blob([CSVdivCsv.innerText]);
	const name = mesh.name || "test";
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = `${ name }-lines-${ GCO.contoursLength }.csv`;
	a.click();
	//		delete a;
	a = null;

}
