
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

	var easings = Object.keys( TWEEN.Easing );

	var startTime = Date.now();

//	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();

	var audioContext = new AudioContext();


	function setPlacesRandom() {

		frames = framesDefault;

		for ( var i = 0; i < objectsCount; i++ ) {

			object = objects[ i ];
			object.userData.places = [];

			for ( var j = 0; j < frames; j++ ) {

				ePosType = easings[ 1 + Math.floor( Math.random() * ( easings.length - 1 ) ) ];
				eRotType = easings[ 1 + Math.floor( Math.random() * ( easings.length - 1 ) ) ];

				var p = {
					fr: j,
					pX: Math.random() * 100 - 50,
					pY: Math.random() * 100 - 50,
					pZ: Math.random() * 100 - 50,
					rX: Math.random() * pi,
					rY: Math.random() * pi,
					rZ: Math.random() * pi,
					ms: Math.random() * 3000,
					eP: ePosType, 
					eR: eRotType 
				};

				object.userData.places.push( p );

			}

		}

		camera.userData.places = [];

		for ( var i = 0; i < frames; i++ ) {

			p = {
				cX: Math.random() * 100 + 50,
				cY: Math.random() * 100 + 50,
				cZ: Math.random() * 100 + 50,
				tX: Math.random() * 50,
				tY: Math.random() * 50,
				tZ: Math.random() * 50,
				ms: Math.random() * 3000,
				eP: easings[ 1 ],
				eR: easings[ 1 ]

			}

			camera.userData.places.push( p );

		}

	}

	function setClipsDefined() {

		playClip1 = [

			[ [ objects[ 0 ], 0 ], [ pencil, 0 ], [ camera, 1 ]  ],
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

		playClip4 = [];

		for ( var i = 0; i < frames; i++ ) {

			frame = [];

			for ( var j = 0; j < objects.length; j++ ) {

				frame.push( [ objects[ j ], i ] );

			}

			frame.push( [ camera, i ] );

			playClip4.push( frame )

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

			togglePlace( intersects[ 0 ].object )



		}

	}


// tweens

	function togglePlace( obj ) {

		oud = obj.userData.places;

		if ( obj.position.distanceTo( v( oud[ 0 ].pX, oud[ 0 ].pY, oud[ 0 ].pZ ) ) === 0 ) {

			tween2location( obj, oud[ 1 ] );

		} else {

			tween2location( obj, oud[ 0 ]  );

		}

		playNote( 350 + 350 * Math.random(), audioContext.currentTime, 0.1 );

	}

	function initTweenClipAllPlaces( indexFrame ) {

		if ( indexFrame < frames && indexObjects === 0 ) {

			tweenSelect( indexObjects, tweenClipRandom );

		}

	}

	function tweenAllToLocation( index ) {

		var index = index ? index : 0;

		info.innerHTML = 'debug info<br>frame:' + index + '<br>';

		for ( var i in objects ) {

			var obj = objects[ i ];
			var oud = obj.userData.places[ index ];

			tween2location( obj, oud );

			info.innerHTML += obj.name + ' time:' + oud.ms + '<br>';

		}

//console.log( 'tweenAllToLocation', index, camera.userData.places[ index ] );

		tweenCamera( camera, camera.userData.places[ index ] );

//		outFrame.value = index; // part of slider

	}


	function togglePlayClip( theClip, checkbox ) {

		startTime = Date.now();

		clip = theClip;
		check = checkbox;

		playClip();

	}

	function playClip() {

		if ( check.checked === true ) {

			indexFrame = indexFrame ? indexFrame : 0;
			indexObject = indexObject ? indexObject : 0;

			if ( indexFrame === 0 ) {

				tweenAllToLocation(0);

				tweenFrame();

				info.innerHTML = 'title: ' + check.title + '<br>';

			} else if ( indexFrame < clip.length ) {

				tweenFrame();

			} else {

				info.innerHTML += 'the end - time:' + ( Date.now() - startTime );
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

			if ( obj.name === 'camera' ) {

//console.log( 'camera' );

				tweenCamera( obj, oud, itemDispatch );

			} else if ( obj.name === 'pencilLine' ) {

//console.log( 'pencil line');

				drawPencilLine( oud, obj.userData.places[ indexLocation + 1 ], itemDispatch );

			} else {

//console.log( 'else doit', obj );

				tween2location( obj, oud, itemDispatch );

			}

		}

	}

	function itemDispatch() {

		info.innerHTML += 'frame: ' + indexFrame + ' objects: ' + indexObject + ' time: ' + ( Date.now() - startTime ) + '<br>';

		if ( indexObject < clip[ indexFrame ].length - 1 ) {

//console.log( 'iD go', indexObject );

			indexObject++;

		} else {

//console.log( 'iD else ', indexObject, ( Date.now() - startTime ) );

			indexObject = 0;
			indexFrame++;

			playClip(); 
			playNote( 350 + 350 * Math.random(), audioContext.currentTime, 0.1 );
		}

	}

	function tween2location( obj, p, onComplete ) {

// console.log( 'ms', p.ms );
		p.eP = p.eP ? p.eP : easings[ 1 + Math.floor( Math.random() * ( easings.length - 1 ) ) ];
		p.eR = p.eR ? p.eR : easings[ 1 + Math.floor( Math.random() * ( easings.length - 1 ) ) ];
		p.ms = p.ms ? p.ms : duration;

		p.pX = p.pX ? p.pX : 0;
		p.pY = p.pY ? p.pY : 0;
		p.pZ = p.pZ ? p.pZ : 0;

		p.rX = p.rX ? p.rX : 0;
		p.rY = p.rY ? p.rY : 0;
		p.rZ = p.rZ ? p.rZ : 0;

		var onComplete = onComplete ? onComplete : function(){};

		new TWEEN.Tween( obj.position )
		.to( { x: p.pX, y: p.pY, z: p.pZ }, p.ms )
		.easing( TWEEN.Easing[ p.eP ].InOut )
		.onComplete( function() { 

// console.log( 'tween2location', p.ms, ( Date.now() - startTime ) );

			onComplete();

		} )
		.start();

		new TWEEN.Tween( obj.rotation )
		.to( { x: p.rX, y: p.rY, z: p.rZ }, p.ms )
		.easing( TWEEN.Easing[ p.eR ].InOut )
		.start();

	}

	function tweenCamera( camera, c, onComplete ) {

		c.eP = c.eP ? c.eP : easings[ 1 + Math.floor( Math.random() * ( easings.length - 1 ) ) ];
		c.eR = c.eR ? c.eR : easings[ 1 + Math.floor( Math.random() * ( easings.length - 1 ) ) ];
		c.ms = c.ms ? c.ms : duration;

		c.cX = c.cX ? c.cX : 0;
		c.cY = c.cY ? c.cY : 0;
		c.cZ = c.cZ ? c.cZ : 0;

		c.tX = c.tX ? c.tX : 0;
		c.tY = c.tY ? c.tY : 0;
		c.tZ = c.tZ ? c.tZ : 0;

		var onComplete = onComplete ? onComplete : function(){};

		new TWEEN.Tween( camera.position )
		.to( {
			x: c.cX,
			y: c.cY,
			z: c.cZ}, c.ms )
		.easing( TWEEN.Easing[ c.eP ].InOut )
		.start();

		new TWEEN.Tween( controls.target ).to( {
			x: c.tX,
			y: c.tY,
			z: c.tZ}, c.ms )
		.easing( TWEEN.Easing[ c.eR ].InOut )
		.onComplete( function() { onComplete(); } )
		.start();

	}

	function drawPencilLine( startPoint, endPoint, func ) {

		onComplete = func ? func : function() {} ;

		var geometry = new THREE.Geometry();

		geometry.vertices.push( startPoint );
		geometry.vertices.push( endPoint);

		geometry.vertices.push( v( startPoint.pX, startPoint.pY, startPoint.pZ ) );
		geometry.vertices.push( v( endPoint.pX, endPoint.pY, endPoint.pZ ) );

		var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
		var line = new THREE.LineSegments( geometry, material  );

		scene.add( line );

		onComplete();

	}
