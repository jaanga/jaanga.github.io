
// axes
		scene.add( new THREE.AxisHelper( 50 ) );

// ground box
		geometry = new THREE.BoxGeometry( 100, 2, 100 );
		material = new THREE.MeshNormalMaterial();
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0, -10, 0 );
		scene.add( mesh );

		mesh = new THREE.GridHelper( 50, 10 );
		mesh.position.set( 0, -9, 0 );
		scene.add( mesh );


// box Normal transparent edges
		geometry = new THREE.BoxGeometry( 20, 20, 20 );
		material = new THREE.MeshNormalMaterial( { opacity: 0.7, side: THREE.DoubleSide, transparent: true });
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 50, 10, 0 );
		scene.add( mesh );
		scene.add( new THREE.BoxHelper( mesh ) );


// 50 boxes
	function addBoxesNoLights() {

		geometry = new THREE.BoxGeometry( 10, 10, 10 );
		material = new THREE.MeshNormalMaterial( { opacity: 0.7, side: THREE.DoubleSide, transparent: true });
		for (var i = 0; i < 50; i++) {

			mesh = new THREE.Mesh( geometry, material );
			mesh.position.set( 100 * Math.random() - 50, 100 * Math.random(), 100 * Math.random() - 50 );
			mesh.rotation.set( 6.3 * Math.random(), 1.57 * Math.random(), 3.14 * Math.random() );

			scene.add( mesh );

			helper = new THREE.BoxHelper( mesh );
			helper.material.color.setRGB( 1, 0, 0 );
			scene.add( helper );

		}

// Square lines
		function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }

		var geometry = new THREE.Geometry();
		geometry.vertices = [ v( 20, 20, 20 ), v( -20, 20, 20 ), v( -20, 20, -20 ), v( 20, 20, -20 ), v( 20, 20, 20 ) ];

		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial({ color: 0x0000ff }));
		scene.add(line);


	function drawTrylonPerisphere() {

// Perisphere
		geometry = new THREE.SphereGeometry( 25, 50, 50 );
		material = new THREE.MeshPhongMaterial( {
			color: 0xffffff * Math.random(), 
			ambient: 0xffffff * Math.random(),
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
			ambient: 0xffffff * Math.random(),
			specular: 0xffffff * Math.random(),
			shininess: 1
		} );
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( -120, 50, -30 );
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		scene.add( mesh );

	}


// add remove existing
// see algesurf pe r4


	function addLights() {

		renderer.shadowMapEnabled = true;

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
		lightDirectional.shadowCameraVisible = true;
		scene.add( lightDirectional );

		lightPoint = new THREE.PointLight( 0xffffff, 0.5 );
		camera.add( lightPoint );
		lightPoint.position = new THREE.Vector3( 0, 0, 1 );
		scene.add( camera );

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.castShadow = child.receiveShadow = true;
				child.material = material;

			}

		} );

	}



	function toggleAxis( length ) {

		var length = length ? length : 50;

		chkAxis = document.getElementById( 'chkAxis' );

		if ( chkAxis.checked ) {

			axisHelper = new THREE.AxisHelper( length );
			scene.add( axisHelper );

		} else {

			scene.remove( axisHelper );

		}

	}


			'<p><input type=checkbox id=chkGradient onchange=toggleGradient(); /> Background </p>' +

		chkGradient.checked = true;
		toggleGradient();

	function toggleGradient () {

		if ( chkGradient.checked ) {

				var col1 = Math.random().toString(16).slice(2, 8);
				var col2 = Math.random().toString(16).slice(2, 8);
				var col3 = Math.random().toString(16).slice(2, 8);
				var x = ( Math.random() * window.innerWidth ).toFixed(0);
				var y = ( Math.random() * window.innerHeight ).toFixed(0);

				document.body.style.backgroundImage = 'radial-gradient( circle farthest-corner at ' + x + 'px ' + y + 'px, #' + col1 + ' 0%, #' + col2 + ' 50%, #' + col3 + ' 100%)';

		} else {

			document.body.style.backgroundImage = '';

		}

	}

	function toggleGrid() {

		chkGrid = document.getElementById( 'chkGrid' );

		if ( chkGrid.checked ) { 

			gridHelper = new THREE.GridHelper( 50, 10 );
			scene.add( gridHelper );

		} else {

			scene.remove( gridHelper );

		}

	}

	function toggleGround() {

		chkGround = document.getElementById( 'chkGround' );

		if ( chkGround.checked ) { 

			var geometry = new THREE.BoxGeometry( 300, 2, 300 );
			var material = new THREE.MeshPhongMaterial( {
				color: 0xffffff * Math.random(),
				ambient: 0xffffff * Math.random(),
				specular: 0xffffff * Math.random(),
				shininess: 5
			} );

			ground = new THREE.Mesh( geometry, material );
			ground.position.set( 0, -50, 0 );
			ground.castShadow = true;
			ground.receiveShadow = true;
			scene.add( ground );

			helper = new THREE.BoxHelper( ground );
			helper.material.color.setRGB( 1, 0, 1 );
			scene.add( helper );

		} else {

			scene.remove( ground );
			scene.remove( helper );

		}

	}

// @@@@@@@@@@@@@@@@@@@


			'<p><input type=checkbox id=chkRotate onchange=controls.autoRotate=controls.autoRotate===true?false:true; /> Enable auto-rotation</p>' +

		chkRotate.checked = controls.autoRotate = true;


	var startTime = performance.now();
	var delayTime = 2000;

	function toggleRotate() {

		rotate = document.getElementById( 'chkRotate' );

		renderer.domElement.addEventListener( 'mousemove', onMouseMove, false ); // or mousedown?

		app.animate = animate;

	}

	function onMouseMove() {

		startTime = rotate.checked ? performance.now() : 1000000 ;

	}

	function animate( timestamp ) {

		if ( timestamp - startTime > delayTime ) {

			mesh.rotation.y +=0.001;

		}

		renderer.render( scene, camera );
		controls.update();
		requestAnimationFrame( animate);

	}


