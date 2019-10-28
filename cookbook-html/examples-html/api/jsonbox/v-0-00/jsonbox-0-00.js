"use strict"

const JB = {}

JB.url = "https://jsonbox.io/box_34acd03fcbcfd2fa1051"


window.addEventListener( 'focus', () => JB.getJson() );


JB.getJson = function () {

	if ( !JB.interval ) { JB.interval = setInterval( JB.putJson, 2000 ); }

	window.onunload = JB.putJson( "" );

	const request = new Request( JB.url + "/5db548fe8d6b3900173a5721" )
	fetch( request )
	.then( response => response.json() )
	.then( data => {
		JB.json = data;
		JB.contentPrevious = divJsonBox.innerHTML = JB.json.content;
		console.log( 'JB.json', JB.json);

	} );

};


JB.putJson = function( previous = JB.contentPrevious ) {

	const content = divJsonBox.innerHTML;

	if ( content === previous ) { return; }

	JB.contentPrevious = content;

	fetch( JB.url + "/5db548fe8d6b3900173a5721", {
		method: "PUT",
		headers: { "content-type": "application/json" },
		body: JSON.stringify( { "content": content, } ),

	} )
	.then( response => response.json() )
	.then( data => {

		divJsonBoxResponse.innerHTML = `<p>${ new Date().toLocaleTimeString() }</p>${ content }`;

	} )

}




JB.getJsonAll = function () {

	const request = new Request( JB.url )
	fetch( request )
		.then( response => response.json() )
		.then( data => {
			JB.json = data;
			console.log( 'JB.json', JB.json );
			//divJsonBoxContent.innerHTML = JB.json;
		} );

};


JB.deleteJson = function ( index = 1 ) {

	id = JB.json[ index ]._id;

	fetch( JB.url + "/" + id, {
		method: "DELETE",
		headers: { "content-type": "application/json" }

	} )
		.then( response => response.json() )
		.then( data => {

			divJsonBoxResponse.innerText += `${ JSON.stringify( data ) }\n\n`;

		} )

};
