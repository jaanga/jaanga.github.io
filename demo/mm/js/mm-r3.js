
//	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	var clip;
	var indexFrame = 0;

	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();

	var easings;
	var duration = 500;

//	function getEasings() {


		easings = Object.keys( TWEEN.Easing );
/*
		for ( var easing in easings ) {

			console.log( easings[ easing ] );

		}

	}
*/

	var audioContext = new AudioContext();

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

		intersects = raycaster.intersectObjects( components );

		if ( intersects.length > 0 ) {

			tween2location( intersects[ 0 ].object, intersects[ 0 ].object.userData.places[ 1 ] );

			playNote( 350 + 350 * Math.random(), audioContext.currentTime, 0.1 );

		}

	}

	function tweenAllToLocation( index ) {

		for ( var i in components ) {

			var obj = components[ i ];
			var oud = obj.userData.places[ index ];

			tween2location( obj, oud );

		}

		tweenCamera( camera, index );

		playNote( 350 + 350 * Math.random(), audioContext.currentTime, 0.1 );

	}

	function togglePositions() {

		for ( var i = 0; i < components.length; i++ ) {

			obj = components[ i ];

			oud = obj.userData.places;

			if ( obj.position.distanceTo( v( oud[ 0 ].x, oud[ 0 ].y, oud[ 0 ].z ) ) < 50 ) {

				tween2location( obj, oud[ 1 ] );

			} else {

				tween2location( obj, oud[ 0 ] );

			}

		}

		playNote( 350 + 350 * Math.random(), audioContext.currentTime, 0.1 );

	}

	function togglePlayClip( theClip, checkbox ) {

		clip = theClip;

		if ( checkbox.checked === false ) { return; }

		if ( indexFrame === 0 ) {

			tweenAllToLocation(0);

			tweenFrame( indexFrame );

		} else if ( indexFrame < clip.length ) {

			tweenFrame( indexFrame );

			playNote( 350 + 350 * Math.random(), audioContext.currentTime, 0.1 );

		} else {

			checkbox.checked = false;
			indexFrame = 0;
//			itemCount = 0;

// Play a 'B' now --- Ta
			playNote(493.883, audioContext.currentTime, 0.232 );

// Play an 'E' just as the previous note finishes -- Da
			playNote(659.255, audioContext.currentTime + 0.232, 0.464);

		}

	}

	function tweenFrame( indexFrame ) {

		frame = clip[ indexFrame ];

console.log( '', frame, indexFrame );

		for ( var i = 0; i < frame.length; i++ ) {

			var item = frame[ i ];

			obj = item[ 0 ];
			var index = item[ 1 ];
			var ms = item[ 2 ] ? item[ 2 ] : duration;


			if ( obj.name === 'camera' ) {

console.log( 'camera', obj );

				tweenCamera( obj, index, tweenFrame, indexFrame );

			} else if ( obj.name === 'pencilLine' ) {

// console.log( 'pencil line', obj );
//				drawPencilLine( oud[ index ][ 0 ], oud[ index + 1 ][ 0 ] );
//				itemCount++;

			} else {

//console.log( '', obj.name );
				oud = obj.userData.places[ index ];
				oud.ms = ms;
				tween2location( obj, oud, tweenFrame, indexFrame );

			}

		}

		
	}



	function tween2location( obj, p, onComplete, index ) {

		p.eP = p.eP ? p.eP : easings[ 1 + Math.floor( Math.random() * ( easings.length - 1 ) ) ];
		p.eR = p.eR ? p.eR : easings[ 1 + Math.floor( Math.random() * ( easings.length - 1 ) ) ];
		p.ms = p.ms ? p.ms : 1000;

		p.pX = p.pX ? p.pX : 0;
		p.pY = p.pY ? p.pY : 0;
		p.pZ = p.pZ ? p.pZ : 0;

		p.rX = p.rX ? p.rX : 0;
		p.rY = p.rY ? p.rY : 0;
		p.rZ = p.rZ ? p.rZ : 0;

		var onComplete = onComplete ? onComplete : function(){};

		new TWEEN.Tween( obj.position )
		.to( {x: p.pX, y: p.pY, z: p.pZ }, p.ms )
		.easing( TWEEN.Easing[ p.eP ].InOut )
		.start();

		new TWEEN.Tween( obj.rotation )
		.to( { x: p.rX, y: p.rY, z: p.rZ }, p.ms )
		.easing( TWEEN.Easing[ p.eR ].InOut )
		.onComplete( function() { onComplete( ++index ); } )
		.start();

	}

	function tweenCamera( camera, indexFrame, onComplete, index ) {

		c = camera.userData.places[ indexFrame ];

		c.eP = c.eP ? c.eP : easings[ 1 + Math.floor( Math.random() * ( easings.length - 1 ) ) ];
		c.eR = c.eR ? c.eR : easings[ 1 + Math.floor( Math.random() * ( easings.length - 1 ) ) ];
		c.tX = c.tX ? c.tX : 0;
		c.tY = c.tY ? c.tY : 0;
		c.tZ = c.tZ ? c.tZ : 0;

		c.ms = c.ms ? c.ms : 1000;
		var onComplete = onComplete ? onComplete : function(){};

		new TWEEN.Tween( camera.position )
		.to( { x: c.cX, y: c.cY, z: c.cZ }, c.ms )
		.easing(  TWEEN.Easing[ c.eP ].InOut )
		.start();

		new TWEEN.Tween( controls.target )
		.to( { x: c.tX, y: c.tY, z: c.tZ }, c.ms )
		.easing( TWEEN.Easing[ c.eR ].InOut )
		.onComplete( function() { onComplete( ++index ); } )
		.start();


	}

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



/*
// https://github.com/tweenjs/tween.js/
// https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md

	var playList;
	var frameIndex = 0;
	var itemCount = 0;
	var duration = 500;

	// var pi = Math.PI;
	// var pi05 = 0.5 * pi;
	// var pi_05 = -0.5 * pi;
	// var pi2 = 2 * pi;


	function dispatchScrewsPegs( obj ) {

		obj.traverse( function ( child ) {

			if ( child.name.substr( 0, 5 ) === 'screw') {

				switchParent( screws, child.name.substr( 14 ) );

			}

			if ( child.name.substr( 0, 7 ) === 'peg loc') {

				switchParent( pegs, [ child.name.substr( 12 ) ] );

			}

		} );

	}

	function dispatchScrewsPegsHome( obj ) {

		obj.traverse( function ( child ) {

			if ( child.name.substr( 0, 14) === 'screw location') {

				screw = child.userData.screw;

				screw.scale.set( 1, 1, 1 );
				child.remove( screw );
				scene.add( screw );

				send2location( screw, screw.userData.places[ 0 ][ 0 ], screw.userData.places[ 0 ][ 1 ], 2000 );

			}

			if ( child.name.substr( 0, 7 ) === 'peg loc') {


				peg = child.userData.peg;

				peg.scale.set( 1, 1, 1 );
				child.remove( peg );
				scene.add( peg );

				send2location( peg, peg.userData.places[ 0 ][ 0 ], peg.userData.places[ 0 ][ 1 ], 2000 );

			}

		} );

	}

	function togglePlayClip( clip, checkbox ) {

		if ( checkbox.checked === false ) { return; }

		if ( frameIndex === 0 ) {

			returnAllToStartTween();
//			itemCount = 0;

			movRotTweenIndex( clip, checkbox );
			frameIndex++ ;

		} else if ( frameIndex < clip.length ) {

			movRotTweenIndex( clip, checkbox );
			frameIndex++;

			playNote( 350 + 350 * Math.random(), audioContext.currentTime, 0.1 );

		} else {

			checkbox.checked = false;
			frameIndex = 0;
//			itemCount = 0;

// Play a 'B' now --- Ta
			playNote(493.883, audioContext.currentTime, 0.232 );

// Play an 'E' just as the previous note finishes -- Da
			playNote(659.255, audioContext.currentTime + 0.232, 0.464);

		}

	}

	function movRotTweenIndex( clip, checkbox ) {

		var assets = clip[ frameIndex ];

		for ( var i = 0; i < assets.length; i++ ) {

			var item = assets[ i ];
			var obj = item[ 0 ];
			var index = item[ 1 ];
			var ms = item[ 2 ] ? item[ 2 ] : duration;
			var oud = obj.userData.places;

//console.log( '', obj );

			if ( obj.name === 'camera' ) {

// console.log( 'camera', obj );
				cameraTween( oud[ index ][ 0 ], oud[ index ][ 1 ], ms, itemDispatch );

			} else if ( obj.name === 'pencilLine' ) {

// console.log( 'pencil line', obj );

				drawPencilLine( oud[ index ][ 0 ], oud[ index + 1 ][ 0 ] );
				itemCount++;

			} else {

console.log( '', obj.name );

				send2location( obj, oud[ index ][ 0 ], oud[ index ][ 1 ], ms, itemDispatch );

//				dispatchScrewsPegs( obj );

			}

		}



		function itemDispatch() {

			if ( checkbox.checked === true ) {

				if ( frameIndex < clip.length && itemCount < clip[ frameIndex ].length ) {

					itemCount++;

				}

				togglePlayClip( clip, checkbox );

			}

		}

	}

	function switchParent( type, arr ) {

		for ( var i = 0; i < arr.length; i++ ) {

				var obj = type[ arr[ i ] ];
				scene.remove( obj );

				var hole = obj.userData.holeParent;
				hole.add( obj );

				obj.position.set( 0, 0, 0 );
				obj.rotation.set( pi05, 0, 0 );
				obj.scale.set( 3, 3, 3 );

		}

	}

	function dispatchScrewsPegs2Parent( parent ) {

		if ( screws.length > 0 ) {

			for ( var i = 0; i < screws.length; i++ ) {

				parent.add( screws[ i ] );

			}

		}

		if ( pegs.length > 0 ) {

			for ( i = 0; i < pegs.length; i++ ) {

				parent.add( pegs[ i ] );

			}

		}


	}

	function drawPencilLine( startPoint, endPoint, func ) {

		onComplete = func ? func : function() {} ;

		var geometry = new THREE.Geometry();

		geometry.vertices.push( startPoint );
		geometry.vertices.push( endPoint);

		var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
		var line = new THREE.LineSegments( geometry, material  );

		scene.add( line );

		onComplete();

	}

	function loadTexture() {

		loader = new THREE.TextureLoader();
		loader.crossOrigin = 'anonymous';

		loader.load(
//			'http://mrdoob.github.io/three.js/examples/textures/water.jpg',
			'../textures/birch-256x256.png',
			function ( tex ) {

				texture = tex;

				updateMaterial( materialCaseColor );

			}

		);

	}

	function updateMaterial( color ) {

		materialCaseColor = color;

		kallax.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh && child.material.name === 'materialCase' ) {

				t = texture.clone();
				t.wrapS = t.wrapT = THREE.RepeatWrapping;
				t.needsUpdate = true;

				if ( child.name === 'shelf' || child.name === 'caseTop' || child.name === 'caseBottom' ) {

					t.repeat.set( columns, 1 );

				} else if ( child.name === 'caseLeft' || child.name === 'caseRight' ) {

					t.repeat.set( rows, 1 );

				}

				child.material = new THREE.MeshBasicMaterial( { color: materialCaseColor, map: t, name: 'materialCase' } );

			}

		} );

	}




*/
