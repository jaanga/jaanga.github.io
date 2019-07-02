
	var scr = document.body.appendChild( document.createElement( 'script' ) );
	scr.onload = loadScr2;
	scr.src='http://mrdoob.github.io/three.js/build/three.min.js';

	function loadScr2() {
		var scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.onload = loadScr3;
		scr.src='http://mrdoob.github.io/three.js/examples/js/controls/OrbitControls.js';
	}

	function loadScr3() {
		var scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.onload = init;
		scr.src='http://mrdoob.github.io/three.js/examples/js/libs/stats.min.js';
	}

	var info, stats, renderer, scene, camera, controls;
		var geometry, material, mesh;

	function init() {

		document.body.style.cssText = 'font: 600 12pt monospace; margin: 0; overflow: hidden;' ;
//		a.style.textDecoration = 'none';

		var info = document.body.appendChild( document.createElement( 'div' ) );

		info.style.cssText = 'left: 20px; position: absolute; ';
		info.innerHTML = '<a href="" ><h1>' + document.title + '</h1></a>' +
			'<div id=msg ></div>' +
		'';

		stats = new Stats();
		stats.domElement.style.cssText = 'position: absolute; right: 0; top: 0; z-index: 100; ';
		document.body.appendChild( stats.domElement );

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true, clearColor: 0xffffff }  );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.set( 100, 100, 100 );

		controls = new THREE.OrbitControls( camera, renderer.domElement );

		scene = new THREE.Scene();

// axes
		scene.add( new THREE.ArrowHelper( v(1, 0, 0), v(0, 0, 0), 30, 0xcc0000) );
		scene.add( new THREE.ArrowHelper( v(0, 1, 0), v(0, 0, 0), 30, 0x00cc00) );
		scene.add( new THREE.ArrowHelper( v(0, 0, 1), v(0, 0, 0), 30, 0x0000cc) );

// ground box
		geometry = new THREE.BoxGeometry( 100, 2, 100 );
		material = new THREE.MeshNormalMaterial();
		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 0, -1, 0 );
		scene.add( mesh );

		mesh = new THREE.GridHelper( 50, 10 );
		scene.add( mesh );

		animate();
	}

	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }

	function animate() {

		renderer.render( scene, camera );
		controls.update();
		stats.update();
		requestAnimationFrame( animate );

	}

