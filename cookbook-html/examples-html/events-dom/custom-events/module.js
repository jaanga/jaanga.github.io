
const MOD = {}

MOD.setEventToFire = function() {

	// , {"bubbles": true, "cancelable": false, detail: true }

	MOD.eventToFire = new Event( "bingo" );

	window.addEventListener( "bingo", MOD.onEventFired1 ); // important no: "()"
	window.addEventListener("bingo", e => MOD.onEventFired2(e));

	console.log('MOD.eventToFire', MOD.eventToFire);

}


MOD.fireAnEvent = function() {

	window.dispatchEvent( MOD.eventToFire );

}

MOD.onEventFired1 = function() {

	divContents.innerHTML += `<p>event 1 ${new Date() }</p>`;

}


MOD.onEventFired2 = function(e) {

	divContents.innerHTML += `<p>event 2 type: ${ e.type } time: ${ e.timeStamp }</p>`;
	console.log( 'e', e );

}

