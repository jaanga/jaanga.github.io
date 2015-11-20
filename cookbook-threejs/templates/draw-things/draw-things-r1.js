// 2015-11-03

	function drawThings() {

		material = material === undefined ? new THREE.MeshNormalMaterial( { opacity: 0.7, side: 2, transparent: true } ) : material;

		var ground, helper, axis, cylinder, cube, sphere, torus, wave, loader, stl, female, suzanne, tree;
 
// back row
		geometry = new THREE.BoxGeometry( 150, 5, 150 );
		ground = new THREE.Mesh( geometry, material );
		ground.position.set( 0, -2.5, 0 );
		ground.castShadow = ground.receiveShadow = true;
		scene.add( ground );

		helper = new THREE.BoxHelper( mesh );
		helper.material.color.setRGB( 1, 0, 1 );
		scene.add( helper );

		grid = new THREE.GridHelper( 75, 10 );
		scene.add( grid );

		axis = new THREE.AxisHelper( 100 );
		scene.add( axis );

		cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 20, 30, 40, 50 ), material );
		cylinder.position.set( -30, 30, -80 );
		cylinder.castShadow = cylinder.receiveShadow = true;
		scene.add( cylinder );

		sphere = new THREE.Mesh( new THREE.SphereGeometry( 25, 30, 15 ), material );
		sphere.position.set( -30, 30, -30 );
		sphere.castShadow = sphere.receiveShadow = true;
		scene.add( sphere );

		cube = new THREE.Mesh( new THREE.BoxGeometry( 30, 30, 30 ), material );
		cube.position.set( -50, 30, -30 );
		cube.castShadow = cube.receiveShadow = true;
		scene.add( cube );

		torus = new THREE.Mesh( new THREE.TorusKnotGeometry( 15, 8, 100, 25 ), material );
		torus.position.set( -30, 30, 20 );
		torus.castShadow = torus.receiveShadow = true;
		scene.add( torus );

		geometry = new THREE.PlaneBufferGeometry( 1, 1, 99, 99 );
		vertices = geometry.attributes.position.array;

		for ( var x = 0, i = 2; x < 100; x++ ) {
			for ( var y = 0; y < 100; y++ ) {

				vertices[ i ] = Math.sin( x * 0.08 ) * Math.sin( y * 0.08 )
				i += 3;

			}
		}

		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		geometry.verticesNeedUpdate = true;  
		geometry.normalsNeedUpdate = true;

		wave = new THREE.Mesh( geometry, material );
		wave.position.set( -30, 35, 60 );
		wave.scale.set( 45, 15, 45 );
		wave.castShadow = wave.receiveShadow = true;
		scene.add( wave );


// front row
		script = document.head.appendChild( document.createElement('script') );
		script.onload = function() {

// or &lt;script src='http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js'  >&lt;/script>

			loader = new THREE.STLLoader();
			loader.load( 'http://rawgit.com/nasa/NASA-3D-Resources/master/3D%20Printing/NPP/NPP_16.stl', function ( geometry ) {

				geometry.applyMatrix( new THREE.Matrix4().makeRotationX( 0.5 * Math.PI ) );
				geometry.computeFaceNormals();
				geometry.computeVertexNormals();
				stl = new THREE.Mesh( geometry, material );
				stl.position.set( 30, 35, -50 );
				stl.castShadow = stl.receiveShadow = true;
				scene.add( stl );

			} );

		};
		script.src='http://mrdoob.github.io/three.js/examples/js/loaders/STLLoader.js';

		loader = new THREE.JSONLoader();
		loader.load( 'http://mrdoob.github.io/three.js/examples/obj/female02/Female02_slim.js', function ( geometry ) { // scale 0.5 y 5

			female = new THREE.Mesh( geometry, material );
			female.position.set( 30, 10, -20 );
			female.scale.multiplyScalar( 0.4 );
			female.castShadow = female.receiveShadow = true;
			scene.add( female );

		} );

		loader = new THREE.JSONLoader();
		loader.load( 'http://mrdoob.github.io/three.js/examples/obj/Suzanne.js', function ( geometry ) { // scale 20 y 35

			geometry.applyMatrix( new THREE.Matrix4().makeRotationX( 0.5 * Math.PI ) );
			geometry.computeFaceNormals();
			geometry.computeVertexNormals();
			geometry.verticesNeedUpdate = true;  
			geometry.normalsNeedUpdate = true;

			suzannne = new THREE.Mesh( geometry, material );
			suzannne.position.set( 30, 30, 15 );
			suzannne.scale.multiplyScalar( 20 );
			suzannne.castShadow = suzannne.receiveShadow = true;
			scene.add( suzannne );

		} );


		loader = new THREE.JSONLoader();
		loader.load( 'http://mrdoob.github.io/three.js/examples/obj/WaltHeadLo.js', function ( geometry ) { //  scale 0.6 y 35
//		loader.load( 'http://mrdoob.github.io/three.js/examples/obj/tree/tree.js', function ( geometry ) { // scale 5 y 10

			geometry.computeFaceNormals();
			geometry.computeVertexNormals();

			tree = new THREE.Mesh( geometry, material );
			tree.position.set( 30, 35, 60 );
			tree.scale.multiplyScalar( 0.5 );
			tree.castShadow = tree.receiveShadow = true;
			scene.add( tree );

		} );

	}
