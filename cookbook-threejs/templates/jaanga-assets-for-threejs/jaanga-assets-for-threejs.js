
	var axisHelper;
	var groundBox;
	var backgroundGradient;

	function toggleAxis( length ) {

		if ( axisHelper === undefined ) {

			axisHelper = new THREE.AxisHelper( length );
			scene.add( axisHelper );

		} else {

			scene.remove( axisHelper );

		}

	}

	function toggleGroundBox( size ) {

		if ( groundBox === undefined) { 

			var geometry = new THREE.BoxGeometry( size, 2, size );

			var material = new THREE.MeshPhongMaterial( {
				color: 0xffffff * Math.random(),
				specular: 0xffffff * Math.random(),
				shininess: 5
			} );

			var material = new THREE.MeshNormalMaterial();

			groundBox = new THREE.Mesh( geometry, material );
			groundBox.position.set( 0, -50, 0 );
			groundBox.castShadow = true;
			groundBox.receiveShadow = true;
			scene.add( groundBox );

			groundBoxHelper = new THREE.BoxHelper( groundBox );
			groundBoxHelper.material.color.setRGB( 1, 0, 1 );
			scene.add( groundBoxHelper );

			gridHelper = new THREE.GridHelper( 0.5 * size, 10 );
			gridHelper.position.set( 0, -49, 0 );
			scene.add( gridHelper );

		} else {

			scene.remove( groundBox );
			scene.remove( groundBoxHelper );
			scene.remove( gridHelper );

		}

	}


	function drawTrylonPerisphere() {

// Perisphere
		geometry = new THREE.SphereGeometry( 25, 50, 50 );
		material = new THREE.MeshPhongMaterial( {
			color: 0xffffff * Math.random(), 
			specular: 0xffffff * Math.random(),
			shininess: 10
		} );
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( -100, 20, 0 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		scene.add( mesh );

// Trylon
		geometry = new THREE.CylinderGeometry( 0, 8, 100, 3 );
		material = new THREE.MeshPhongMaterial( {
			color: 0xffffff * Math.random(), 
			specular: 0xffffff * Math.random(),
			shininess: 1
		} );
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( -120, 50, -30 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		scene.add( mesh );

	}

	function addLights() {

		renderer.shadowMap.enabled = true;

		var lightAmbient, lightDirectional, lightPoint;

		lightAmbient = new THREE.AmbientLight( 0x444444 );
		scene.add( lightAmbient );

		lightDirectional = new THREE.DirectionalLight( 0xffffff, 0.5 );
		lightDirectional.position.set( -200, 200, 200 );

		var d = 100;
		lightDirectional.shadowCameraLeft = -d;
		lightDirectional.shadowCameraRight = d;
		lightDirectional.shadowCameraTop = d;
		lightDirectional.shadowCameraBottom = -d;

		lightDirectional.shadowCameraNear = 200;
		lightDirectional.shadowCameraFar = 500;

// can help stop appearance of gridlines in objects with opacity < 1
		lightDirectional.shadowBias = -0.001; // default 0 ~ distance from corners?
		lightDirectional.shadowDarkness = 0.3; // default 0.5
		lightDirectional.shadowMapWidth = 2048;  // default 512
		lightDirectional.shadowMapHeight = 2048;

		lightDirectional.castShadow = true;
//		lightDirectional.shadowCameraVisible = true;
		scene.add( lightDirectional );

		lightPoint = new THREE.PointLight( 0xffffff, 0.5 );
		camera.add( lightPoint );
		lightPoint.position = new THREE.Vector3( 0, 0, 1 );
		scene.add( camera );

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.castShadow = child.receiveShadow = true;
//				child.material = material;

			}

		} );

	}

	function toggleGradient () {

		if ( backgroundGradient === undefined ) {

				var col1 = Math.random().toString(16).slice(2, 8);
				var col2 = Math.random().toString(16).slice(2, 8);
				var col3 = Math.random().toString(16).slice(2, 8);
				var x = ( Math.random() * window.innerWidth ).toFixed(0);
				var y = ( Math.random() * window.innerHeight ).toFixed(0);

				backgroundGradient = document.body.style.backgroundImage = 'radial-gradient( circle farthest-corner at ' + x + 'px ' + y + 'px, #' + col1 + ' 0%, #' + col2 + ' 50%, #' + col3 + ' 100%)';

		} else {

			backgroundGradient = document.body.style.backgroundImage = '';

		}

	}

	function toggleAutoRotate() {

		controls.autoRotate = controls.autoRotate === true ? false : true ;

	}