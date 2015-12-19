
// https://github.com/tweenjs/tween.js/
// https://github.com/tweenjs/tween.js/blob/master/docs/user_guide.md

	var rows, columns;

	var playList;
	var count = 0;
	var itemCount = 0;
	var duration = 500;

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

	var context = new AudioContext();


	function drawHelpers() {

		w = height > width ? height05 : width05;

		var axisHelper = new THREE.AxisHelper( w + 50 );
		helpers.add( axisHelper );

		geometry = new THREE.BoxGeometry( height + 100, 2, width + 100 );
		material = new THREE.MeshNormalMaterial();
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0, -2, 0 );
		helpers.add( mesh );

		scene.add( helpers );

	}

	function drawHelpers2( length ) {

		helpers = new THREE.Object3D();

		var axisHelper = new THREE.AxisHelper( length );
		helpers.add( axisHelper );

		var gridHelper = new THREE.GridHelper( length, 10 );
		gridHelper.position.set( 0, 0, 0 );
		helpers.add( gridHelper );

		scene.add( helpers );

	}



	function drawHole( obj, x, y, z, aX, aY, aZ, type ) {

		var mesh = new THREE.Mesh( geometryHole, materialHole );
		mesh.name = 'hole';
		mesh.position.set( x + sign( x ) * 0.1 , y + sign( y ) * 0.1, z  + sign( z ) * 0.1); // to stop shimmering
		mesh.rotation.set( aX, aY, aZ );

		holes.push( mesh );

		if ( type === 'pegHole' ) {

			buildPeg( mesh );

		} else if ( type === 'screwHole' ) {

			buildScrew( mesh );
		}

		obj.add( mesh );

	}

	function buildScrew( hole ) {

		var mesh = new THREE.Mesh( geometryScrew, materialScrew );
		var offsetX = - height05 - 10;
		var offsetZ =  width05 + 10;
		var a = ran( pi2 ); 
		var r = ran( 10 );
		var mud = mesh.userData;

		mud.places = [];
		mud.places.push( [ v( offsetX + r * cos( a ), ran( 5 ), offsetZ + r * sin ( a ) ), v( 0, ran( 3 ), -pi05 ) ] );
		mud.places.push( [ v( 0, 0, 0 ), v( 0, 0, 0 ) ] );

		mesh.name = 'screw';
		mud.holeParent = hole;
		hole.name = 'screw location' + screws.length;
		hole.userData.screw = mesh;

		screws.push( mesh );
		kallax.add( mesh );

		return mesh;

	}

	function buildPeg( hole ) {

		var mesh = new THREE.Mesh( geometryPeg, materialPeg );
		var offsetX = height05 + 20;
		var offsetZ =  - width05 - 20;
		var a = ran( pi2 ); 
		var r = ran( 25 );
		var mud = mesh.userData;

		mud.places = [];
		mud.places.push( [ v( offsetX + r * cos( a ), ran( 5 ), offsetZ + r * sin ( a ) ), v( 0, ran( 3 ), -pi05 ) ] );
		mud.places.push( [ v( 0, 0, 0 ), v( 0, 0, 0 ) ] );

		mesh.name = 'peg';
		mud.holeParent = hole;
		hole.name = 'peg location' + pegs.length;
		hole.userData.peg = mesh;

		pegs.push( mesh );
		kallax.add( mesh );

		edge = new THREE.EdgesHelper( mesh, 0xff0000 );
		edges.add( edge );

	}

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
			playNote( 350 + 350 * Math.random(), context.currentTime, 0.1 );

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
//			itemCount = 0;

			movRotTweenIndex( playList[ count ] );
			count = 1;

		} else if ( count >= playList.length ) {

			chkPlay.checked = false;
			count = 0;
//			itemCount = 0;

// Play a 'B' now
			playNote(493.883, context.currentTime, 0.232 );

// Play an 'E' just as the previous note finishes
			playNote(659.255, context.currentTime + 0.232, 0.464);

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

			if ( obj.name !== 'camera' ) {

				send2location( obj, oud[ index ][ 0 ], oud[ index ][ 1 ], ms, frameDispath );

				dispatchScrewsPegs( obj );

			} else {

				cameraTween( camera.userData.places[ index ][ 0 ], camera.userData.places[ index ][ 1 ], 1000, frameDispath );

			}

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

		cameraTween( camera.userData.places[ 1 ][ 0 ], camera.userData.places[ 1 ][ 1 ], 1500 );

//		playNote( 350 + 350 * Math.random(), context.currentTime, 0.1 );

	}

	function assembleQuicklyTween() {

		var obj, ohp, oud;

//		cameraTween( camera.userData.places[ 2 ][ 0 ], camera.userData.places[ 2 ][ 1 ], 1500 );

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

//		playNote( 350 + 350 * Math.random(), context.currentTime, 0.1 );

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

		playNote( 350 + 350 * Math.random(), context.currentTime, 0.1 );
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

	function dispatchScrewsPegs2Kallax() {

		if ( screws.length > 0 ) {

			for ( var i = 0; i < screws.length; i++ ) {

				kallax.add( screws[ i ] );

			}

		}

		if ( pegs.length > 0 ) {

			for ( var i = 0; i < pegs.length; i++ ) {

				kallax.add( pegs[ i ] );

			}

		}


	}

	function cameraTween( position, target, milleseconds, func ) {

		var ms = milleseconds ? milleseconds : 1000;
		onComplete = func ? func : function() {} ;

		new TWEEN.Tween( camera.position )
		.to( {
			x: position.x,
			y: position.y,
			z: position.z}, ms )
		.easing( TWEEN.Easing.Sinusoidal.InOut )
		.start();

		new TWEEN.Tween( controls.target ).to( {
			x: target.x,
			y: target.y,
			z: target.z}, ms )
		.easing( TWEEN.Easing.Sinusoidal.InOut)
		.onComplete( onComplete )
		.start();

playNote( 350 + 350 * Math.random(), context.currentTime, 0.1 );

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

	var context = new AudioContext();

	function playNote( frequency, startTime, duration) {

		var osc1 = context.createOscillator();
		var volume = context.createGain();

		osc1.connect( volume );
		osc1.type = 'triangle';
		osc1.frequency.value = frequency + 1;

		volume.connect( context.destination );
		volume.gain.linearRampToValueAtTime( 0, startTime + duration );
		volume.gain.value = 0.01;

		osc1.start( startTime );
		osc1.stop( startTime + duration );

	};

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