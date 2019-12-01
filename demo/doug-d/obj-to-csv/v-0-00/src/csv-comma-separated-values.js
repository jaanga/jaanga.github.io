
const CSV = {};


CSV.getMenu = function () {

	const htm =
		`
		<details open>

			<summary>Export contour data</summary>

			<p>
				<button onclick=CSV.getCsv(); >getCsv</button>

				<button onclick=CSV.saveFile(); >Save File</button>
			</p>

			<div id=divCsv style=max-height:50ch;overflow:auto; ></div>

		</details>
		`

	return htm;
}



CSV.getCsv = function () {

	txt = ""

	for (let i = 0; i < GCO.contourLines.children.length; i++) {

		contour = GCO.contourLines.children[i];

		console.log('cc', contour);

		for (let j = 0; j < contour.geometry.vertices.length; j++) {

			txt +=
`${ contour.geometry.vertices[j].toArray()},${i}\n`;

		}
	}

	divCsv.innerText = txt;

};


 CSV.saveFile = function() {

	let blob = new Blob( [ divCsv.innerText ] );
	let a = document.body.appendChild( document.createElement( 'a' ) );
	a.href = window.URL.createObjectURL( blob );
	a.download = 'test.csv';
	a.click();
	//		delete a;
	a = null;

}

CSV.xxxgetCsv= function() {

	pointFirst = pointsOfIntersection.vertices[ 0 ].toArray().join();
	console.log( 'pf', pointFirst );

	index = 0;
	txt = contours.children.map( contour => {

		const lines = contour.children;
		//console.log( 'lines', index, lines );

		vertices = lines.map( line => {

			txt = line.geometry.vertices.filter( vertex => vertex.toArray().join() !== pointFirst ).map( vertex =>
				`${ vertex.toArray() },${index}`

			).join( "\n" );

			index++;
			return txt;

		} ).join( "\n");


		//console.log( 'vertices\n', vertices );

		return vertices;

	}).join( "\n" );

	divCsv.innerText = txt;

}