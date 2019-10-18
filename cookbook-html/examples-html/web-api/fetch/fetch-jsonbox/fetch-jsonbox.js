// copyright pushMe-pullYou authors. MIT license.


let FFP = {};


FFP.getMenu = function () {

	FFP.personalAccessToken = localStorage.getItem( "FFPpersonalAccessToken" );

	FFP.url = localStorage.getItem( "FFPurl" );

	const htm =
	`
		<details open>

			<summary>File save parameters</summary>

			<p>Save file to GitHub</p>

			<p>Personal access token: <br> <input id=FFPinpPAT class=FFPinput
				onchange=FFP.setLocalStorage(this,"FFPpersonalAccessToken"); value=${ FFP.personalAccessToken}></p>

			<p>URL: <br> <input id=FFPinpUrl class=FFPinput onchange=FFP.setLocalStorage(this,"FFPurl");
				value=${ FFP.url} ></p>

			<p>
				<button id=but onclick=FFP.fetchJsonLines(); >FFP.fetchJsonLines</button>

				<button id=but onclick=FFP.putJsonLines(FFP.fileContent,FFP.fileSha); >FFP.putJsonLines</button>
			</p>

		</details>
	`;

	return htm;

};


FFP.setLocalStorage = function( input, string ) {

	const item = input.value;
	localStorage.setItem( `${ string }`, item );

};


FFP.fetchJsonLines = function() {

	const request = new Request( FFP.url );

	FFP.fileName = FFP.url.split( "/" ).pop();

	fetch( request ).then( response => response.json() )
	.then( ( data ) => {

		console.log( "data", data );
		//divContents.innerText += ( JSON.stringify( data ) );
		//console.log( 'dc', data.content );

		decodedData = window.atob( data.content ).toString( "UTF8" );

		FFP.jsonLines = decodedData.split( "\n" )
		.filter( line => line => JSON.parse( line ) )
		.map( line => JSON.parse( line ) );

		//textArea.value = FFP.jsonLines.map( line => JSON.stringify( line ) ).join( "\n" );

		FFP.fileContent = decodedData;
		FFP.fileSha = data.sha;

		const eventFFPJsonParse = new Event( 'FFPonJsonParse' );

		// document.body.addEventListener( 'FFPonJsonParse', () => {
		//	console.log( 'FFP.jsonLines loaded', FFP.fileName )
		//	ZZZ.onLoadParse( FFP.jsonLines )
		// }, false );

		document.body.dispatchEvent( eventFFPJsonParse );

	} );

};


FFP.putJsonLines = function () {

	const string = '{"name": "Jon Snow", "age": 25}';

	const request = new Request( FFP.url + FFP.personalAccessToken );
	fetch( request, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify( string )

	} )
	.then( response => response.json() )
	.then( data => {

		divContents.innerText += ( JSON.stringify( data ) );
		console.log( "", data );

	} )
	.catch(  err => console.warn( 'Something went wrong.', err ) );

};
