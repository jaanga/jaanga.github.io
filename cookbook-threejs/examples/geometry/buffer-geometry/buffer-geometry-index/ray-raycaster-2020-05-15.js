////////// Interacting between DOM and 3D

/* global renderer, RAYdivPopUp */

const RAY = { // three.js mouse interaction with scene

	raycaster: new THREE.Raycaster(),
	mouse: new THREE.Vector2(),
	intersectObjects: []

};


RAY.init = function () {

	RAYdivPopUp = document.body.appendChild( document.createElement( "div" ) )
	RAYdivPopUp.style.cssText =
	"background-color: azure; padding: 0.5rem; border-radius: 0.5rem; position: absolute; leftt: 30px; top: 20px;";

	RAYdivPopUp.innerHTML = 23;

	renderer.domElement.addEventListener( "mousemove", RAY.onMouseMove );
	renderer.domElement.addEventListener( "touchstart", RAY.onMouseMove );
	renderer.domElement.addEventListener( "touchmove", RAY.onMouseMove );

};



RAY.onMouseMove = function ( event ) {

	if ( event.type === "touchmove" || event.type === "touchstart" ) {

		event.clientX = event.touches[ 0 ].clientX;
		event.clientY = event.touches[ 0 ].clientY;

	}

	RAY.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	RAY.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	RAY.raycaster.setFromCamera( RAY.mouse, camera );

	let intersects = RAY.raycaster.intersectObjects( RAY.intersectObjects );

	if ( intersects.length ) {

		let intersected = intersects[ 0 ];

		//console.log( "intersected", intersected );

		RAYdivPopUp.hidden = false;
		RAYdivPopUp.style.left = event.clientX + 25 + "px";
		RAYdivPopUp.style.top = event.clientY + "px";
		RAYdivPopUp.innerHTML = RAY.getHtm( intersected );

		renderer.domElement.addEventListener( "click", RAY.onClick );


	} else {

		if ( [ "touchstart", "touchmove" ].includes( event.type ) ) {

			RAYdivPopUp.hidden = true;

		}

	}

};



RAY.onClick = function () {

	RAYdivPopUp.hidden = true;

	renderer.domElement.removeEventListener( "click", RAY.onClick );

};



RAY.getHtm = function ( intersected ) {

	//const country = intersected.object.userData.data[ intersected.instanceId ];
	//console.log( "country", country );

	const htm = JSON.stringify( intersected.distance, null, "<br>" ); //.slice( 1, - 1 ).replace( /[",]/g, "");

	//const name = country[ 1 ] ? country[ 1 ] : country[ 0 ];

	// htm = `
	// 	<a href="https://en.wikipedia.org/wiki/${ name }" target="_blank">${ name }</a><br>
	// 	${ ( + country[ 6 ] ).toLocaleString() } people
	// 	`;

	return htm;

};
