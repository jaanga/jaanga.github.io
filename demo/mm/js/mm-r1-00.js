
// https://github.com/tweenjs/tween.js/
// https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md

	var pi = Math.PI;
	var pi05 = 0.5 * pi;
	var pi_05 = -0.5 * pi;
	var pi2 = 2 * pi;

	var cos = function( a ){ return Math.cos( a ); };
	var sin = function( a ){ return Math.sin( a ); };

	var ran = function( n ) { return n * Math.random(); };
	var sign = function( n ) { return Math.sign( n ); };

	var v2 = function( x, y ){ return new THREE.Vector2( x, y ); };
	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );

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

			movRotTween( intersects[ 0 ].object );

		}

	}

	function togglePositions() {


		for ( var i = 0; i < components.length; i++ ) {

			movRotTween( components[ i ] );

		}

	}

	function togglePlay() {

		if ( chkPlay.checked === false ) { return; }

		if ( count === 0 ) {

			returnAllToStartTween();
			itemCount = 0;

			movRotTweenIndex( playList[ count ] );
			count = 1;

		} else if ( count >= playList.length ) {

			chkPlay.checked = false;
			count = 0;
			itemCount = 0;

		} else {

			movRotTweenIndex( playList[ count ] );
			count++;

		}

	}

	function movRotTween( obj ) {

		oud = obj.userData.places;

		if ( obj.position.distanceTo( oud[ 0 ][ 0 ] ) === 0 ) {

			send2location( obj, oud[ oud.length - 1 ][ 0 ], oud[ oud.length - 1 ][ 1 ], 2000, dispatchScrewsPegs( obj ) );

		} else {

			send2location( obj, oud[ 0 ][ 0 ], oud[ 0 ][ 1 ], 2000, dispatchScrewsPegsHome( obj )  );

		}

	}

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

	function movRotTweenIndex( list ) {

		itemCount = 0;

		for ( var i = 0; i < list.length; i++ ) {

			item = list[ i ];
			obj = item[ 0 ];
			index = item[ 1 ];
			ms = item[ 2 ] ? item[ 2 ] : duration;
			oud = obj.userData.places;
			send2location( obj, oud[ index ][ 0 ], oud[ index ][ 1 ], ms, frameDispath );

			dispatchScrewsPegs( obj );

		}

	}

	function frameDispath() {

//			if ( chkPlay.checked === false ) { return; }

			itemCount++;

			if ( itemCount >= playList[ count - 1 ].length ) {

				itemCount = 0;
				togglePlay();

			}

	}

	function returnAllToStartTween() {

		var oud = kallax.userData.places;
		var obj, ohp;

		send2location( kallax, oud[ 0 ][ 0 ], oud[ 0 ][ 1 ], 2000 );

		for ( var i = 0; i < components.length; i++ ) {

			obj = components[ i ], oud = obj.userData.places;

			if ( obj.position.distanceTo( oud[ 0 ][ 0 ] ) !== 0 ) {

				send2location( obj, oud[ 0 ][ 0 ], oud[ 0 ][ 1 ], 2000 );

			}

		}

		for ( i = 0; i < screws.length; i++ ) {

			obj = screws[ i ];
			ohp = obj.userData.holeParent;
			oud = obj.userData.places;

			if ( obj.position.distanceTo( ohp.position.clone() ) !== 0 ) {

				obj.scale.set( 1, 1, 1 );
				ohp.remove( obj );
				scene.add( obj );
				send2location( obj, oud[ 0 ][ 0 ], oud[ 0 ][ 1 ], 2000 );

			}

		}

		for ( i = 0; i < pegs.length; i++ ) {

			obj = pegs[ i ];
			ohp = obj.userData.holeParent;
			oud = obj.userData.places;

			if ( obj.position.distanceTo( ohp.position.clone() ) !== 0 ) {

				obj.scale.set( 1, 1, 1 );
				ohp.remove( obj );
				scene.add( obj );
				send2location( obj, oud[ 0 ][ 0 ], oud[ 0 ][ 1 ], 2000 );

			}

		}

	}

	function assembleQuicklyTween() {

		var obj, ohp, oud;
		for ( var i = 0; i < components.length; i++ ) {

			obj = components[ i ];
			oud = obj.userData.places;

			if ( obj.position.distanceTo( oud[ oud.length - 1 ][ 0 ] ) !== 0 ) {

				send2location( obj, oud[ oud.length - 1 ][ 0 ], oud[ oud.length - 1 ][ 1 ], 2000 );

			}

		}

		for ( i = 0; i < screws.length; i++ ) {

			obj = screws[ i ];
			ohp = obj.userData.holeParent;

			if ( obj.position.distanceTo( ohp.position.clone() ) !== 0 ) {

				switchParent( screws, [ i ] );

			}

		}

		for ( i = 0; i < pegs.length; i++ ) {

			obj = pegs[ i ];
			ohp = obj.userData.holeParent;

			if ( obj.position.distanceTo( ohp.position.clone() ) !== 0 ) {

				switchParent( pegs, [ i ] );

			}

		}

	}

	function send2location( obj, pos, rot, ms, func ) {

		onComplete = func ? func : function() {} ;
		new TWEEN.Tween( obj.position )
		.to( {x: pos.x, y: pos.y, z: pos.z }, ms )
		.easing( TWEEN.Easing.Elastic.Out)
		.start();

		new TWEEN.Tween( obj.rotation )
		.to( { x: rot.x, y: rot.y, z: rot.z }, ms )
		.easing( TWEEN.Easing.Elastic.Out)
		.onComplete( onComplete )
		.start();

	}

	function switchParent( type, arr ) {

		for ( var i = 0; i < arr.length; i++ ) {

				obj = type[ arr[ i ] ];
				scene.remove( obj );

				hole = obj.userData.holeParent;
				hole.add( obj );

				obj.position.set( 0, 0, 0 );
				obj.rotation.set( pi05, 0, 0 );
				obj.scale.set( 3, 3, 3 );

		}

	}

	function findStuff() {
// http://stackoverflow.com/questions/21557341/three-js-get-world-rotation-from-matrixworld

		things = [];

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh && child.geometry instanceof THREE.CircleBufferGeometry) {

				things.push( child );

				child.parent.updateMatrixWorld();

				geometry = new THREE.BoxGeometry( 2, 2, 20 );
				mesh = new THREE.Mesh( geometry, material );
				mesh.quaternion.copy( child.getWorldQuaternion() );
				mesh.position.copy( child.getWorldPosition() );
				scene.add( mesh );

			}
		} );

		info.innerHTML = 'things.length ' + things.length;

	}

	function fh( n ) {

		hole = holes[ n ];
		hole.parent.updateMatrixWorld();

		geometry = new THREE.BoxGeometry( 2, 2, 20 );
		mesh = new THREE.Mesh( geometry, material );
		mesh.quaternion.copy( hole.getWorldQuaternion() );
		mesh.position.copy( hole.getWorldPosition() );
		scene.add( mesh );

	}

	function animate() {

		requestAnimationFrame( animate );
		controls.update();
		stats.update();
		TWEEN.update();
		renderer.render( scene, camera );

	}