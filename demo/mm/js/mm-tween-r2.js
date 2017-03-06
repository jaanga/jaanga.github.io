
	var easings;
	var duration = 500;

	var indexFrame;
	var indexObject;

	var clip
	var check;

	var objectsCount = 8;
	var framesDefault = 5;
	var frames = framesDefault;

	var objects = [];

	var pi = Math.PI;
	var pi05 = 0.5 * pi;
	var pi_05 = -0.5 * pi;
	var pi2 = 2 * pi;

	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	var easings = Object.keys( TWEEN.Easing );

	var startTime = Date.now();

	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();

	var audioContext = new AudioContext();

	var outFrame;


// set up demos/tests

	function setPlacesRandom() {

		frames = framesDefault;

		for ( var i = 0; i < objects.length; i++ ) {

			object = objects[ i ];
			object.userData.places = [];
			object.userData.tween = tween2location;

			for ( var j = 0; j < frames; j++ ) {

				var index = Math.floor( Math.random() * ( easings.length - 1 ) ) 
				var io = index === 0 ? 'None' : 'InOut'; 

				var p = {

					pX: Math.random() * 100 - 50,
					pY: Math.random() * 100 - 50,
					pZ: Math.random() * 100 - 50,
					rX: Math.random() * pi,
					rY: Math.random() * pi,
					rZ: Math.random() * pi,
					ms: Math.random() * 3000,
					eP: TWEEN.Easing[ easings[ index ] ][ io ],
					eR: TWEEN.Easing[ easings[ index ] ][ io ]
				};

				object.userData.places.push( p );

			}

		}

		camera.userData.places = [];
		camera.userData.tween = tweenCamera

		var p = camera.position.clone(); 
		var t = controls.target.clone();
		camera.userData.places.push( { pX: p.x, pY: p.y, pZ: p.z, tX: t.x, tY: t.y, tZ: t.z } );

		for ( var i = 0; i < frames; i++ ) {

			var index = Math.floor( Math.random() * ( easings.length - 1 ) ) 
			var io = index === 0 ? 'None' : 'InOut'; 

			p = {

				pX: Math.random() * 100 + 50,
				pY: Math.random() * 100 + 50,
				pZ: Math.random() * 100 + 50,
				tX: Math.random() * 50,
				tY: Math.random() * 50,
				tZ: Math.random() * 50,
				ms: Math.random() * 3000,
				eP: TWEEN.Easing[ easings[ index ] ][ io ],
				eR: TWEEN.Easing[ easings[ index ] ][ io ]

			}

			camera.userData.places.push( p );

		}

	}

	function setClipsDefined() {

		playClip1 = [

			[ [ objects[ 0 ], 1 ], [ camera, 0 ] ],
			[ [ objects[ 0 ], 1 ], [ objects[ 3 ], 0 ], [ camera, 2 ] ],
			[ [ objects[ 0 ], 2 ], [ camera, 3 ]  ],
			[ [ objects[ 0 ], 3 ] ],
			[ [ objects[ 0 ], 4 ], [ objects[ 2 ], 0 ] ]

		];

		playClip2 = [

			[ [ objects[ 2 ], 0 ], [ camera, 1 ]  ],
			[ [ objects[ 2 ], 1 ], [ objects[ 3 ], 0 ], [ camera, 2 ] ],
			[ [ objects[ 2 ], 2 ], [ camera, 3 ]  ],
			[ [ objects[ 2 ], 3 ] ]

		];

		playClip3 = [

			[ [ objects[ 1 ], 0 ], [ camera, 1 ]  ],
			[ [ objects[ 1 ], 1 ], [ objects[ 3 ], 0 ], [ camera, 2 ] ],
			[ [ objects[ 1 ], 2 ], [ camera, 3 ]  ],
			[ [ objects[ 1 ], 3 ] ]

		];

	}

	function setClipsRandom() {

		playClipRandom = [];

		for ( var i = 0; i < frames; i++ ) {

			frame = [];

			for ( var j = 0; j < objects.length; j++ ) {

				frame.push( [ objects[ j ], i ] );

			}

			frame.push( [ camera, i ] );

			playClipRandom.push( frame )

		}

	}

// audio

	function playNote( frequency, startTime, duration) {

		var osc1 = audioContext.createOscillator();
		var volume = audioContext.createGain();

		osc1.connect( volume );
		osc1.type = 'triangle';
		osc1.frequency.value = frequency + 1;

		volume.connect( audioContext.destination );
		volume.gain.linearRampToValueAtTime( 0, startTime + duration );
		volume.gain.value = 0.01;

		osc1.start( startTime );
		osc1.stop( startTime + duration );

	}


// events

	function onDocumentTouchStart( event ) {

		event.preventDefault();

		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;
		onDocumentMouseDown( event );

	}

	function onDocumentMouseDown( event ) {

		event.preventDefault();

		mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
		mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

		raycaster.setFromCamera( mouse, camera );

		intersects = raycaster.intersectObjects( objects );

		if ( intersects.length > 0 ) {

			togglePlace( intersects[ 0 ].object );

			playNote( 350 + 350 * Math.random(), audioContext.currentTime, 0.1 );

		}

	}


// tweens

	function togglePlacesAll() {

		for ( var i = 0; i < objects.length; i++ ) {

			togglePlace( objects[ i ] );

		}

		playNote( 350 + 350 * Math.random(), audioContext.currentTime, 0.1 );

	}



	function togglePlace( obj, start, end ) {

		var start = start ? start : 0;
		var end = end ? end : 1;

		oud = obj.userData.places;
		tween = obj.tween ? obj.tween : tween2location;

		if ( obj.position.distanceTo( v( oud[ start ].pX, oud[ start ].pY, oud[ start ].pZ ) ) < 0.1 ) {

			tween( obj, oud[ end ] );

		} else {

			tween( obj, oud[ start ]  );

		}

	}



	function tweenAllToLocation( index ) {

		var index = index ? index : 0;

		if( info ) { info.innerHTML = 'debug: frame:' + index + '<br>'; }

		for ( var i = 0; i < objects.length; i++ ) {

			var obj = objects[ i ];
			if( !obj.userData.places[ index ] ) { continue; }
			var oud = obj.userData.places[ index ];
			ms = oud.ms ? oud.ms : duration;
			tween = obj.userData.tween ? obj.userData.tween : tween2location;
			tween( obj, oud );

//			info.innerHTML += ( 1 + i ) + ' ' + obj.name + '-' + obj.geometry.type + ' ' + ms.toFixed() + 'ms<br>';

		}

		if ( camera.userData.places.length > 0 ) { tweenCamera( camera, camera.userData.places[ index ] ); }

		if ( outFrame ) { outFrame.value = index; }

		playNote( 350 + 350 * Math.random(), audioContext.currentTime, 0.1 );

	}

	function togglePlayClip( theClip, checkbox ) {

		startTime = Date.now();

		clip = theClip;
		check = checkbox;

		playClip();

	}

	function playClip() {

//console.log( 'playClip', indexFrame );

		if ( check.checked === true ) {

			indexFrame = indexFrame ? indexFrame : 0;
			indexObject = indexObject ? indexObject : 0;

			if ( indexFrame === 0 ) {

				tweenAllToLocation( 0 );

				tweenFrame();

			} else if ( indexFrame < clip.length ) {

				tweenFrame();

				playNote( 350 + 350 * Math.random(), audioContext.currentTime, 0.1 );

			} else {

console.log( 'the end' );

				check.checked = false;
				indexFrame = 0;

// Play a 'B' now --- Ta
				playNote(493.883, audioContext.currentTime, 0.232 );

// Play an 'E' just as the previous note finishes -- Da
				playNote(659.255, audioContext.currentTime + 0.232, 0.464);

			}

		}

	}

	function tweenFrame() {

		frame = clip[ indexFrame ];

		for ( var i = 0; i < frame.length; i++ ) {

			var item = frame[ i ];
			var obj = item[ 0 ];
			var indexLocation = item[ 1 ];
			var oud = obj.userData.places[ indexLocation ];
			oud.ms = item[ 2 ] ? item[ 2 ] : obj.userData.places[ indexLocation ].ms;

			tween = obj.userData.tween ? obj.userData.tween : tween2location;

			tween( obj, oud, itemDispatch );

		}

	}

	function itemDispatch() {

		info.innerHTML += 'frame: ' + indexFrame + ' objects: ' + indexObject + ' ' + ( Date.now() - startTime ) + 'ms<br>';

		if ( indexObject < clip[ indexFrame ].length - 1 ) {

			indexObject++;

		} else {

			indexObject = 0;
			indexFrame++;

			playClip();

		}

	}


	function tween2location( obj, p, onComplete ) {

		eP = p.eP ? p.eP : TWEEN.Easing[ easings[ 1 ] ].InOut;
		eR = p.eR ? p.eR : TWEEN.Easing[ easings[ 1 ] ].InOut;
		ms = p.ms ? p.ms : duration;

		pX = p.pX ? p.pX : 0;
		pY = p.pY ? p.pY : 0;
		pZ = p.pZ ? p.pZ : 0;

		rX = p.rX ? p.rX : 0;
		rY = p.rY ? p.rY : 0;
		rZ = p.rZ ? p.rZ : 0;

		var onComplete = onComplete ? onComplete : function(){};

		new TWEEN.Tween( obj.position )
		.to( { x: pX, y: pY, z: pZ }, ms )
		.easing( eP )
		.start();

		new TWEEN.Tween( obj.rotation )
		.to( { x: rX, y: rY, z: rZ }, ms )
		.easing( eR )
		.onComplete( function() { onComplete(); } )
		.start();

	}

	function tweenCamera( camera, p, onComplete ) {

		eP = p.eP ? p.eP : TWEEN.Easing[ easings[ 0 ] ].None;
		eR = p.eR ? p.eR : TWEEN.Easing[ easings[ 0 ] ].None;
		ms = p.ms ? p.ms : duration;

		pX = p.pX ? p.pX : 0;
		pY = p.pY ? p.pY : 0;
		pZ = p.pZ ? p.pZ : 0;

		tX = p.tX ? p.tX : 0;
		tY = p.tY ? p.tY : 0;
		tZ = p.tZ ? p.tZ : 0;

		var onComplete = onComplete ? onComplete : function(){};

		new TWEEN.Tween( camera.position )
		.to( { x: pX, y: pY, z: pZ}, ms )
		.easing( eP )
		.start();

		new TWEEN.Tween( controls.target ).to( { x: tX, y: tY, z: tZ}, ms )
		.easing( eR )
		.onComplete( function() { onComplete(); } )
		.start();

	}


	function drawPencilLine( obj, p, func ) {

		onComplete = func ? func : function() {} ;

		var geometry = new THREE.Geometry();

		geometry.vertices.push( v( p.pX, p.pY, p.pZ ) );
		geometry.vertices.push( v( p.rX, p.rY, p.rZ ) );

		var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
		var line = new THREE.LineSegments( geometry, material  );

		scene.add( line );

		onComplete();

	}

