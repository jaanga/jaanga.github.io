// <script src=http://jaanga.github.io/cookbook-threejs/templates/jaanga-assets-for-threejs/jaanga-assets-for-threejs.js ></script>


	var axisHelper;
	var backgroundGradient;
	var groundBoxLights;
	var trylonPerisphere;


	function addWindowResize() {

		window.addEventListener( 'resize', onWindowResize, false );

	}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

	}




	function addLights( siz ) {

		var size = siz ? siz : 100;
//		renderer.shadowMap.enabled = true;

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

/*
		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.castShadow = child.receiveShadow = true;
//				child.material = material;

			}

		} );
*/

	}

	function addShadows() {

		renderer.shadowMap.enabled = true;

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.castShadow = child.receiveShadow = true;
//				child.material = material;

			}

		} );

	}


	function addMaterialTextureSkybox() {

		THREE.ImageUtils.crossOrigin = 'anonymous';
		material = new THREE.MeshBasicMaterial();
		var r = 'http://mrdoob.github.io/three.js/examples/textures/cube/skybox/';
		var urls = [ r + 'px.jpg', r + 'nx.jpg', r + 'py.jpg', r + 'ny.jpg', r + 'pz.jpg', r + 'nz.jpg' ];

		textureCube = THREE.ImageUtils.loadTextureCube( urls );
		material.envMap = textureCube;
		material.reflectivity = 0.85;

		return material;

	}


	function addMaterialTextureSwedishRoyalCastle() {

		THREE.ImageUtils.crossOrigin = 'anonymous';
		material = new THREE.MeshBasicMaterial();
		var r = 'http://mrdoob.github.io/three.js/examples/textures/cube/SwedishRoyalCastle/';
		var urls = [ r + 'px.jpg', r + 'nx.jpg', r + 'py.jpg', r + 'ny.jpg', r + 'pz.jpg', r + 'nz.jpg' ];

		textureCube = THREE.ImageUtils.loadTextureCube( urls );
		material.envMap = textureCube;
		material.reflectivity = 0.85;

		return material;

	}


	function toggleAutoRotate() {

		controls.autoRotate = controls.autoRotate === true ? false : true ;

	}


	function drawAxis( length ) {

			length = length ? length : 50;

			

	}

	function toggleBackgroundGradient () {

			function col() { return ( 0.5 + 0.5 * Math.random() ).toString( 16 ).slice( 2, 8 ); }
			function pt() { return ( Math.random() * window.innerWidth ).toFixed( 0 ); }

		if ( backgroundGradient === undefined ) {



			backgroundGradient = document.body.style.backgroundImage = 'radial-gradient( circle farthest-corner at ' + pt() + 'px ' + pt() + 'px, #' + col() + ' 0%, #' + col() + ' 50%, #' + col() + ' 100%)';

		} else {

			backgroundGradient = document.body.style.backgroundImage = '';

		}

	}

	toggleGradient = toggleBackgroundGradient;

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

		} else {

			scene.remove( groundBoxLights );

		}

		return groundBoxLights;

	}


	function toggleTrylonPerisphere() {

// https://en.wikipedia.org/wiki/Trylon_and_Perisphere

		var trylonPerisphere = scene.getObjectByName( 'trylonPerisphere' );

		if ( trylonPerisphere === undefined ) {

			trylonPerisphere = new THREE.Object3D();

			trylonPerisphere.name = 'trylonPerisphere';

// Perisphere
			var geometry = new THREE.SphereGeometry( 25, 50, 50 );
			var material = new THREE.MeshPhongMaterial( {
				color: 0xffffff * Math.random(),
				specular: 0xffffff * Math.random(),
				shininess: 10
			} );
			var mesh = new THREE.Mesh( geometry, material );
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

			trylonPerisphere.scale.set( 0.4, 0.4, 0.4 );

			scene.add( trylonPerisphere );

		} else {

			scene.remove( trylonPerisphere );

		}

	}

	function toggleStonehenge() {


		var stonehenge = scene.getObjectByName( 'stonehenge' );

		if ( stonehenge === undefined ) {

			stonehenge = new THREE.Object3D();

			stonehenge.name = 'stonehenge';

			number = 20;
			angle = 6.283 / number;
			radius = 200;
			for ( var i = 0; i < number; i++ ) {
					var geometry = new THREE.BoxGeometry( 15, 100, 30 );
	//				geometry.applyMatrix( new THREE.Matrix4().makeRotationX( 0.3 * Math.random() - 0.15 ) );
	//				geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( 0.2 * Math.random() - 0.1 ) );
					var color = 0xffffff * Math.random();
					var material = new THREE.MeshPhongMaterial( { color: color, side: 2 });
					var mesh = new THREE.Mesh( geometry, material );
					mesh.castShadow = true;
					mesh.receiveShadow = true;
					mesh.rotation.y = - angle * i;
					mesh.position.set( radius * Math.cos( angle * i ) , 50, radius * Math.sin( angle * i )  );

					stonehenge.add( mesh );

					helper = new THREE.EdgesHelper( mesh );
					scene.add( helper );

			}

			number = 9;
			angle = 6.283 / number;
			radius = 200;

			for ( var i = 0; i < number; i++ ) {
					var geometry = new THREE.BoxGeometry( 15, 20, 100 );
	//				geometry.applyMatrix( new THREE.Matrix4().makeRotationX( 0.3 * Math.random() - 0.15 ) );
	//				geometry.applyMatrix( new THREE.Matrix4().makeRotationZ( 0.2 * Math.random() - 0.1 ) );
					var color = 0xffffff * Math.random();
					var material = new THREE.MeshPhongMaterial( { color: color, side: 2 });
					var mesh = new THREE.Mesh( geometry, material );
					mesh.castShadow = true;
					mesh.receiveShadow = true;
					mesh.rotation.y = - angle * i;
					mesh.position.set( radius * Math.cos( angle * i ) , 110, radius * Math.sin( angle * i )  );

					stonehenge.add( mesh );

					helper = new THREE.EdgesHelper( mesh );
					scene.add( helper );

			}

			stonehenge.scale.set( 0.2, 0.2, 0.2 );

			scene.add( stonehenge );

		} else {

			scene.remove( stonehenge );

		}


	}
