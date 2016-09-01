
	var index = 0;

	var lure;
	var motion = true;

	var target; 
	var cameraInsideToggle = false;


	function setMenuDetailsCameraActions() {

		menuDetailsCameraActions.innerHTML = 

			'<details open>' +

				'<summary><h3>camera actions</h3></summary>' +

				'<p><button onclick=motion=!motion >motion</button></p>' +

				'<p><button onclick=cameraTrack(); >camera track</button><br>' +
					'Camera fixed a distance from lure, follows lure position and rotation</p>' +

				'<p><button onclick=cameraInsideToggle=!cameraInsideToggle; >camera inside</button><br>' +
					'Camera fixed inside lure, follows a point just ahead of the lure</p>' +

				'<p><button onclick=cameraFollow(); >camera follow</button><br>' +
					'Camera fixed at position on ground, follows lure</p>' +

				'<p><button onclick=cameraWorld(); >camera world</button><br>' +
					'Camera fixed at position in the air, follows nothing</p>' +

			'</details>';

		geometry = new THREE.BoxGeometry( 10, 10, 10 );
		material = new THREE.MeshNormalMaterial();
		lure = new THREE.Mesh( geometry, material );
		scene.add( lure );

	}

	function cameraTrack() {

		cameraInsideToggle = false;
		lure.add( camera );
		camera.position.set( 20, 15, -80 );
		target = new THREE.Vector3( 0, 0, 0 );

	}

	function cameraFollow() {

		cameraInsideToggle = false;
		lure.remove( camera );
		camera.position.set( -70, 1, -70 );
		target = lure.position;

	}

	function cameraInside() {

//		lure.remove( camera );
//		camera.position.copy( lure.position );
//		target = new THREE.Vector3( 0, 0, 0 ); 

		if ( cameraInsideToggle ) {

			camera.position.copy( lure.position ).add( v( 0, 0, -5 ) );
			controls.target.copy( curve.getPoint( 0.01 + index / curvePoints ) );

		}

		if ( motion ) {

			index = ++index > curvePoints ? 0 : index;

			lure.rotation.setFromVector3( curve.getTangent( index / curvePoints ) );
			lure.position.copy( curve.getPoint( index / curvePoints ) );

			controls.target.copy( target );

		}
	}

	function cameraWorld() {

		cameraInsideToggle = false;
		lure.remove( camera );
		camera.position.set( 100, 100, 100 );
		target = new THREE.Vector3( 0, 0, 0 ); 

	}

