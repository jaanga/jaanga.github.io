
	var segments = 20;
	var points = 200;
	var cameraPoints = 4000;
	var zoomScale = 50;

	var v = function ( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	var index = 0;

	var actor;
	var curve;
	var motion = true;

	var target; 
	var center;
	var cameraInside = false;

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


				'<p><button onclick=cameraTrack(); >camera track</button><br>' +
					'Camera fixed a distance from actor, follows actor position and rotation' +
				'</p>' +

				'<p><button onclick=cameraInside=!cameraInside; >camera inside</button><br>' +
					'Camera fixed inside actor, follows a point just ahead of the actor' +
				'</p>' +

				'<p><button onclick=cameraFollow(); >camera follow</button><br>' +
					'Camera fixed at position on ground, follows actor</p>' +

				'<p><button onclick=cameraWorld(); >camera world</button><br>' +
					'Camera fixed at position in the air, follows nothing</p>' +

			'</details>';

		target = new THREE.Vector3( 0, 0, 0 ); 

		animatePlus();

	}

	function getActor() {

		geometry = new THREE.BoxGeometry( 10, 10, 10 );
		material = new THREE.MeshNormalMaterial();
		actor = new THREE.Mesh( geometry, material );
		return actor;

	}

	function getNicePath() {

		var vertices, curve;
		var geometry, material, line;

		vertices = [];

		for ( var i = 0; i < 2 * segments * Math.PI; i++ ) {

			vertices.push( v( Math.sin( i * 7 / segments ) * 30, Math.cos( i * 3 / segments  ) * 30, Math.sin( i * 2 / segments  ) * 30 ) );

		}

		geometry = new THREE.Geometry();

		curve = new THREE.CatmullRomCurve3( vertices );
		curve.closed = true

		geometry.vertices = curve.getPoints( 100 );

		material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

		line = new THREE.Line( geometry, material );

		return line;

	}

	function cameraInside() {

		cameraInside = true;
		actor.add( camera );
		target = actor.position;
		camera.position.set( 0.1, 0.1, 0.1 );

	}

	function cameraTrack() {

		cameraInside = false;
		actor.add( camera );
		target = actor.position;
		camera.position.set( 0.2, 0.2, 0.2 );

	}


	function cameraFollow() {

		cameraInside = false;
		actor.remove( camera );
		target = actor.position;
		camera.position.copy( center.clone().add( v( -2 * zoomScale, -0.5 * zoomScale, 2 * zoomScale ) ) );

	}


	function cameraWorld() {

		cameraInside = false;
		actor.remove( camera );
		target = center; 
		camera.position.copy( target.clone().add( v( zoomScale, zoomScale, zoomScale ) ) );

	}


	function animatePlus() {

		stats.update();

		controls.update();

		renderer.render( scene, camera );

		requestAnimationFrame( animatePlus );

		if ( !motion ) { return; }

//		index = ++index > cameraPoints ? 0 : index;
		index += 0.0001;

		if ( cameraInside ) {

			point = Math.abs( Math.sin( index ) )
			actor.rotation.setFromVector3( curve.getTangent( point ) );
			actor.position.copy( curve.getPoint( point ) );
			controls.target.copy( curve.getPoint( 0.01 + index / cameraPoints ) );

		} else {

//			actor.rotation.setFromVector3( curve.getTangent( index / cameraPoints ) );
//			actor.position.copy( curve.getPoint( index / cameraPoints ) );

			point = Math.abs( Math.sin( index ) )
			actor.rotation.setFromVector3( curve.getTangent( point ) );
			actor.position.copy( curve.getPoint( point ) );

			controls.target.copy( target );

		}


	}
