
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

	//const pointFirst = GCO.pointsOfIntersection.vertices[ 0 ].toArray().join();
	//console.log( 'pf', pointFirst );

	let index = 0;
	const txt = GCO.contourLines.children.map( contour => {

		const lines = contour.children;
		console.log( 'lines', index, lines );

		vertices = lines.map( line => {

			const txt = line.geometry.vertices//.filter( vertex => vertex.toArray().join() !== pointFirst )
			.map( vertex => `${ vertex.toArray() },${index}` ).join( "\n" );

			index++;
			return txt;

		} ).join( "\n");

		//console.log( 'vertices\n', vertices );

		return vertices;

	}).join( "\n" );

	CSVdivCsv.innerText = txt;

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
