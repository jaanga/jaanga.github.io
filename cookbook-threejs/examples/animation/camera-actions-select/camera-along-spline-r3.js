

	var cameraPoints = 2000;
	var zoomScale = 1;

	var actor;
	var curve;
	var target;

	var center;
	var index = 0;
	var motion = true;

	var v = function ( x, y, z ){ return new THREE.Vector3( x, y, z ); };
	var origin = v( 0, 0, 0 );

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

				'<p><button onclick=cameraInside(); >camera inside</button><br>' +
					'Camera fixed inside actor, follows a point just ahead of the actor' +
				'</p>' +

				'<p><button onclick=cameraTrack(); >camera track</button><br>' +
					'Camera fixed at position on ground, follows actor</p>' +

				'<p><button onclick=cameraWorld(); >camera world</button><br>' +
					'Camera fixed at position in the air, follows nothing</p>' +

			'</details>';

		target = origin;

		animatePlus();

	}






	function cameraChase() {

		actor.add( camera );
		camera.position.set( 80 * zoomScale, 80 * zoomScale, 80 * zoomScale );
		target = origin;

	}


	function cameraInside() {

		actor.mesh.add( camera );
		camera.position.set( 50 * zoomScale, 30 * zoomScale, 0 * zoomScale );
		target = origin;

	}


	function cameraTrack() {

		actor.mesh.remove( camera );
		camera.position.copy( center.clone().add( v( -80 * zoomScale, 10 * zoomScale, 80 * zoomScale ) ) );
		target = actor.position;

	}


	function cameraWorld() {

		actor.mesh.remove( camera );
		camera.position.copy( center.clone().add( v( 80 * zoomScale, 80 * zoomScale, 80 * zoomScale ) ) );
		target = center.clone();

	}



	function getNicePath() {

		var scale = 30;
		var segments = 20;
		var vertices, spline;
		var geometry, material, line;

		vertices = [];

		for ( var i = 0; i < 2 * segments * Math.PI; i++ ) {

			vertices.push( v( scale * Math.sin( i * 7 / segments ), scale * Math.cos( i * 3 / segments  ), scale * Math.sin( i * 2 / segments  ) ) );

		}

		spline = new THREE.CatmullRomCurve3( vertices );
		spline.closed = true;

		geometry = new THREE.Geometry();
		geometry.vertices = spline.getPoints( points );

		material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

		line = new THREE.Line( geometry, material );

		return line;

	}


	function animatePlus() {

		var point, pointAhead;

		stats.update();

		controls.update();

		renderer.render( scene, camera );

		requestAnimationFrame( animatePlus );

		if ( !motion ) { return; }

		index += 1 / cameraPoints;

		point = Math.abs( Math.sin( index ) );

		actor.position.copy( curve.getPoint( point ) );
		actor.mesh.rotation.setFromVector3( curve.getTangent( point ) );

		controls.target.copy( target );

	}
