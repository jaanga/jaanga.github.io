// <script src=http://jaanga.github.io/cookbook-threejs/templates/jaanga-assets-for-threejs/jaanga-assets-for-threejs.js ></script>


	var axisHelper;
	var groundBoxLights;
	var trylonPerisphere;
	var backgroundGradient;

	function toggleAxis( length ) {

		if ( axisHelper === undefined ) {

			length = length ? length : 50;

			axisHelper = new THREE.AxisHelper( length );
			scene.add( axisHelper );

		} else {

			scene.remove( axisHelper );

		}

	}

	function toggleGroundBoxLights( size ) {

		if ( groundBoxLights === undefined ) {

			size = size ? size : 100;

			groundBoxLights = new THREE.Object3D();

			var geometry = new THREE.BoxGeometry( size, size, size );

			var material = new THREE.MeshPhongMaterial( {
				color: 0xffffff * Math.random(),
				specular: 0xffffff * Math.random(),
				shininess: 5
			} );

//			var material = new THREE.MeshNormalMaterial();

			groundBox = new THREE.Mesh( geometry, material );
			groundBox.position.set( 0, -0.5 * size, 0 );
			groundBox.castShadow = true;
			groundBox.receiveShadow = true;
			groundBoxLights.add( groundBox );

			groundBoxHelper = new THREE.BoxHelper( groundBox );
			groundBoxHelper.material.color.setRGB( 1, 0, 1 );
			groundBoxLights.add( groundBoxHelper );

			gridHelper = new THREE.GridHelper( 0.5 * size, 10 );
			groundBoxLights.add( gridHelper );

			scene.add( groundBoxLights );

			return groundBoxLights;

		} else {

			scene.remove( groundBoxLights );

		}

	}


	function toggleTrylonPerisphere() {

		if ( trylonPerisphere === undefined ) {

			trylonPerisphere = new THREE.Object3D();

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
			trylonPerisphere.add( mesh );

// Trylon
			geometry = new THREE.CylinderGeometry( 0, 8, 100, 3 );
			material = new THREE.MeshPhongMaterial( {
				color: 0xffffff * Math.random(),
				specular: 0xffffff * Math.random(),
				shininess: 1
			} );
			mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( -115, 50, -30 );
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			trylonPerisphere.add( mesh );

			scene.add( trylonPerisphere );

			return trylonPerisphere;

		} else {

			scene.remove( trylonPerisphere );

		}

	}

	function addLights( size ) {

		var size = size ? size : 100;
		renderer.shadowMap.enabled = true;

		var lightAmbient, lightDirectional, lightPoint;

		lightAmbient = new THREE.AmbientLight( 0x444444 );
		scene.add( lightAmbient );

		lightDirectional = new THREE.DirectionalLight( 0xffffff, 0.5 );
		lightDirectional.position.set( -200, 200, 200 );

		var d = size;
		lightDirectional.shadowCameraLeft = -d;
		lightDirectional.shadowCameraRight = d;
		lightDirectional.shadowCameraTop = d;
		lightDirectional.shadowCameraBottom = -d;

		lightDirectional.shadowCameraNear = 20;
		lightDirectional.shadowCameraFar = 2 * size;

// can help stop appearance of gridlines in objects with opacity < 1
		lightDirectional.shadowBias = -0.001; // default 0 ~ distance from corners?
		lightDirectional.shadowDarkness = 0.3; // default 0.5
		lightDirectional.shadowMapWidth = 2048;  // default 512
		lightDirectional.shadowMapHeight = 2048;

		lightDirectional.castShadow = true;
		scene.add( lightDirectional );

//		lightHelper = new THREE.DirectionalLightHelper( lightDirectional, size )
//		scene.add( lightHelper )

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
