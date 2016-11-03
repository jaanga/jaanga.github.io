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

	function addLights( size ) {

// 2016-02-21 ~ template-threejs-lights-r2.html

		var size = size ? size : 100;
		var lightAmbient, lightDirectional, lightPoint;


		lightAmbient = new THREE.AmbientLight( 0x444444 );
		scene.add( lightAmbient );


		lightDirectional = new THREE.DirectionalLight( 0xffffff, 0.5 );
		lightDirectional.position.set( -size, size, size );

		var d = size;
		lightDirectional.shadow.camera.left = -d;
		lightDirectional.shadow.camera.right = d;
		lightDirectional.shadow.camera.top = d;
		lightDirectional.shadow.camera.bottom = -d;

		lightDirectional.shadow.camera.near = 0;
		lightDirectional.shadow.camera.far = 3 * size;

// helps stop appearance of grid lines in objects
		lightDirectional.shadow.bias = -0.001; // default 0 ~ distance from corners?

		lightDirectional.shadow.mapSize.width = 2048;  // default 512
		lightDirectional.shadow.mapSize.height = 2048;

		lightDirectional.castShadow = true;
		scene.add( lightDirectional );

		scene.add( new THREE.CameraHelper( lightDirectional.shadow.camera ) );

		lightPoint = new THREE.PointLight( 0xffffff, 0.5 );
		camera.add( lightPoint );
		lightPoint.position = new THREE.Vector3( 0, 0, 1 );
		scene.add( camera );

	}

	function addShadows() {

// 2016-02-21 ~ add-lights/template-threejs-lights-r2.html

		renderer.shadowMap.enabled = true;
//		renderer.shadowMap.cullFace = THREE.CullFaceBack;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.castShadow = true
				child.receiveShadow = true;
//				child.material.needsUpdate = true;

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


	function toggleAxis( length ) {

		if ( axisHelper === undefined ) {

			length = length ? length : 50;

			axisHelper = new THREE.AxisHelper( length );

		}

		if ( scene.getObjectById( axisHelper.id )  ) {

			scene.remove( axisHelper );

		} else {

			scene.add( axisHelper );

		}

	}

	function toggleAutoRotate() {

		controls.autoRotate = controls.autoRotate === true ? false : true ;

	}

	function toggleBackgroundGradient() {

		var col = function() { return ( 0.5 + 0.5 * Math.random() ).toString( 16 ).slice( 2, 8 ); };
		var pt = function() { return ( Math.random() * window.innerWidth ).toFixed( 0 ); }
		var backgroundGradient = document.body.style.backgroundImage;

console.log( '',backgroundGradient);
		if ( backgroundGradient === '' ) {

			backgroundGradient = document.body.style.backgroundImage = 'radial-gradient( circle farthest-corner at ' + pt() + 'px ' + pt() + 'px, #' + col() + ' 0%, #' + col() + ' 50%, #' + col() + ' 100%)';

		} else {

			document.body.style.backgroundImage = '';

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
		var stonehengeHelpers = scene.getObjectByName( 'stonehengeHelpers' );

		if ( stonehenge === undefined ) {

			stonehenge = new THREE.Object3D();
			stonehengeHelpers = new THREE.Object3D();

			stonehenge.name = 'stonehenge';
			stonehengeHelpers.name = 'stonehengeHelpers';

			number = 20;
			angle = 6.283 / number;
			radius = 200;
			for ( var i = 0; i < number; i++ ) {
					var geometry = new THREE.BoxGeometry( 15, 100, 30 );
					var color = 0xffffff * Math.random();
					var material = new THREE.MeshPhongMaterial( { color: color, side: 2 });
					var mesh = new THREE.Mesh( geometry, material );
					mesh.castShadow = true;
					mesh.receiveShadow = true;
					mesh.rotation.y = - angle * i;
					mesh.position.set( radius * Math.cos( angle * i ) , 50, radius * Math.sin( angle * i )  );

					stonehenge.add( mesh );

					helper = new THREE.EdgesHelper( mesh );
					stonehengeHelpers.add( helper );

			}

			number = 9;
			angle = 6.283 / number;
			radius = 200;

			for ( var i = 0; i < number; i++ ) {
				var geometry = new THREE.BoxGeometry( 15, 20, 100 );
				var color = 0xffffff * Math.random();
				var material = new THREE.MeshPhongMaterial( { color: color, side: 2 });
				var mesh = new THREE.Mesh( geometry, material );
				mesh.castShadow = true;
				mesh.receiveShadow = true;

				mesh.rotation.y = -angle * i;
				delta = 0.01 *  Math.random();
				mesh.position.set( radius * Math.cos( ( delta + angle ) * i ) , 110, radius * Math.sin( ( delta + angle ) * i )  );

				stonehenge.add( mesh );

				helper = new THREE.EdgesHelper( mesh );
				stonehengeHelpers.add( helper );

			}

			stonehenge.scale.set( 0.2, 0.2, 0.2 );
			scene.add( stonehenge, stonehengeHelpers );

		} else {

			scene.remove( stonehenge, stonehengeHelpers );

		}

	}

	function toggleRandomGeometry( objectsCount ) {

		objectsCount = objectsCount ? objectsCount : 10;

		var randomGeometry = scene.getObjectByName( 'randomGeometry' );
		var randomGeometryHelpers = scene.getObjectByName( 'randomGeometryHelpers' );

		if ( randomGeometry === undefined ) {

			randomGeometry = new THREE.Object3D();
			randomGeometryHelpers = new THREE.Object3D();

			randomGeometry.name = 'randomGeometry';
			randomGeometryHelpers.name = 'randomGeometryHelpers';

			var geometries = [

				new THREE.BoxGeometry( 10, 10, 10 ),
				new THREE.CylinderGeometry( 5, 5, 1, 12 ),
				new THREE.DodecahedronGeometry( 05 ),
				new THREE.SphereGeometry( 5, 12, 8 ),
				new THREE.TorusGeometry( 10, 5 ),

			];

			var material = new THREE.MeshNormalMaterial();
			var radius = 50, angle = 2 * Math.PI / objectsCount;

			for ( var i = 0; i < objectsCount; i++ ) {

				var geometry = geometries[ Math.floor( Math.random() * geometries.length ) ];
				var mesh = new THREE.Mesh( geometry, material );
				mesh.scale.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
				mesh.position.set( radius * Math.cos( angle * i ) , 30, radius * Math.sin( angle * i )  );
				mesh.name = 'obj ' + i;

				randomGeometry.add( mesh );

				helper = new THREE.EdgesHelper( mesh );
				randomGeometryHelpers.add( helper );

			}

			scene.add( randomGeometry, randomGeometryHelpers );

		} else {

			scene.remove( randomGeometry, randomGeometryHelpers );

		}

	}
