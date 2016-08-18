
	var segments = 20;
	var points = 200;
	var cameraPoints = 2000;
	var zoomScale = 1;

	var actor;
	var curve;

	var target; 

	var center;
	var index = 0;
	var motion = true;
	var cameraInside = false;

	var v = function ( x, y, z ){ return new THREE.Vector3( x, y, z ); };


// prevent default animate
	function animate() {}


	function setMenuDetailsCameraActions() {

		menuDetailsCameraActions.innerHTML = 

			'<details open>' +

				'<summary><h3>camera actions</h3></summary>' +

				'<p><input type=checkbox onclick=motion=!motion checked > motion</p>' +

				'<p>' +
					'Camera positions: <output id=outSpeed >' + cameraPoints + '</output><br>' +
					'<input type=range id=inpSpeed min=200 max=5000 step=100 value=' + cameraPoints + ' oninput=outSpeed.value=cameraPoints=this.valueAsNumber title="0 to 10: OK" >' +
				'</p>' +


				'<p><button onclick=cameraChase(); >camera chase</button><br>' +
					'Camera fixed a distance from actor, follows actor position and rotation' +
				'</p>' +

				'<p><button onclick=cameraInside=!cameraInside; >camera inside</button><br>' +
					'Camera fixed inside actor, follows a point just ahead of the actor' +
				'</p>' +

				'<p><button onclick=cameraTrack(); >camera track</button><br>' +
					'Camera fixed at position on ground, follows actor</p>' +

				'<p><button onclick=cameraWorld(); >camera world</button><br>' +
					'Camera fixed at position in the air, follows nothing</p>' +

			'</details>';

		target = new THREE.Vector3( 0, 0, 0 ); 

		animatePlus();

	}

	function getActor() {

		geometry = new THREE.BoxGeometry( 10 * zoomScale, 10 * zoomScale, 10 * zoomScale );
		material = new THREE.MeshNormalMaterial();
		actor = new THREE.Mesh( geometry, material );
		return actor;

	}

	function getNicePath() {

		var vertices, spline;
		var geometry, material, line;

		vertices = [];

		for ( var i = 0; i < 2 * segments * Math.PI; i++ ) {

			vertices.push( v( Math.sin( i * 7 / segments ) * 30, Math.cos( i * 3 / segments  ) * 30, Math.sin( i * 2 / segments  ) * 30 ) );

		}

		spline = new THREE.CatmullRomCurve3( vertices );
		spline.closed = true

		geometry = new THREE.Geometry();
		geometry.vertices = spline.getPoints( points );

		material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

		line = new THREE.Line( geometry, material );

		return line;

	}


	function cameraChase() {

		cameraInside = false;
		camera.position.set( 0.1 * zoomScale, 0.1 * zoomScale, -50 * zoomScale );
		actor.add( camera );
		target = actor.position;

	}



	function cameraChaseZZZ() {

		camera.position.set( -80 * zoomScale, 0 * zoomScale, -80 * zoomScale );
//		camera.up.set( 0, 1, 0 );
		actor.add( camera );
//		target = actor.position;

//		cameraInside = false;
//		actor.add( camera );
//		target = actor.position;
//		camera.position.set( 0 * zoomScale, 10 * zoomScale, 80 * zoomScale );


//		camera.position.copy( center.clone().add( v( 2 * zoomScale, 2 * zoomScale, 2 * zoomScale ) ) );

	}


	function cameraInside() {

		cameraInside = true;
		actor.add( camera );
		target = actor.position;
		camera.position.set( 0.1 * zoomScale, 0.1 * zoomScale, 0.1 * zoomScale );

//			camera.position.copy( actor.position.clone().add( v( 80 * zoomScale, 80 * zoomScale, 80 * zoomScale ) ) );

	}


	function cameraTrack() {

		cameraInside = false;
		actor.remove( camera );
		target = actor.position;
//		camera.position.copy( center.clone().add( v( 2 * zoomScale, 2 * zoomScale, 2 * zoomScale ) ) );

		camera.position.copy( target.clone().add( v( -80 * zoomScale, 10 * zoomScale, 80 * zoomScale ) ) );
	}


	function cameraWorld() {

		cameraInside = false;
		actor.remove( camera );
		target = center; 
		camera.position.copy( target.clone().add( v( 80 * zoomScale, 80 * zoomScale, 80 * zoomScale ) ) );

	}


	function animatePlus() {

		var point, pointAhead;

		stats.update();

		controls.update();

		renderer.render( scene, camera );

		requestAnimationFrame( animatePlus );

		if ( !motion ) { return; }

//		index = ++index > cameraPoints ? 0 : index;
		index += 1 / cameraPoints;

		point = Math.abs( Math.sin( index ) );

		if ( cameraInside ) {

			actor.rotation.setFromVector3( curve.getTangent( point ) );
			actor.position.copy( curve.getPoint( point ) );

			camera.position.copy( actor.position.clone().add( v( 80 * zoomScale, 80 * zoomScale, 80 * zoomScale ) ) );

//			pointAhead = Math.abs( Math.sin( index + 0.01 ) );
//			controls.target.copy( curve.getPoint( pointAhead ) );

			target = curve.getPoint( Math.abs( Math.sin( index + 0.01 ) ) );
			controls.target.copy( target );

		} else {

//			actor.rotation.setFromVector3( curve.getTangent( index / cameraPoints ) );
//			actor.position.copy( curve.getPoint( index / cameraPoints ) );

			actor.rotation.setFromVector3( curve.getTangent( point ) );
			actor.position.copy( curve.getPoint( point ) );

			controls.target.copy( target );

		}


	}
