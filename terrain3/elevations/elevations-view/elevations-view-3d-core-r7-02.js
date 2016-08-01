<!doctype html>
<html lang=en >
<head>
<meta charset=utf-8 >
<title>Elevations View 3D Core R7.1</title>
<meta name=viewport content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' >
<meta name=description content='Read a file of elevations. Create a Three.js 3D Mesh.
Display in 3D. Add TMS overlay;
' >
<meta name=keywords content='WebGL,Three.js,JavaScript,GitHub,FOSS,3D,STEM' >
<meta name=date content='2016-07-31' >
</head>
<body>
<!--
<script src=https://mrdoob.github.io/three.js/build/three.min.js ></script>
<script src=https://mrdoob.github.io/three.js/examples/js/controls/OrbitControls.js ></script>
<script src=https://mrdoob.github.io/three.js/examples/js/libs/stats.min.js ></script>
-->
<script src=https://rawgit.com/mrdoob/three.js/dev/build/three.min.js ></script>
<script src=https://rawgit.com/mrdoob/three.js/dev/examples/js/controls/OrbitControls.js ></script>
<script src=https://rawgit.com/mrdoob/three.js/dev/examples/js/libs/stats.min.js ></script>
<script src=elevations-view-3d-core-r7.js ></script>
<script>

console.time( 'timer0' );

	var stats, renderer, scene, camera, controls;

	init();
	animate();

	function init() {

		var css, hamburger, bars, menu;
		var geometry, material, mesh;
		var axisHelper;

		css = document.head.appendChild( document.createElement( 'style' ) );
		css.innerHTML =

			'body { font: 12pt monospace; margin: 0; overflow: hidden; }' +
			'a { color: crimson; text-decoration: none; }' +

			'button, input[type=button] { background-color: #ccc; border: 2px #fff solid; color: #322; }' +

			'input[type=range] { -webkit-appearance: none; -moz-appearance: none; background-color: #ddd; width: 160px; }' +
			'input[type=range]::-moz-range-thumb { background-color: #888; border-radius: 0; width: 10px; }' +
			'input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; background-color: #888; height: 20px; width: 10px; }' +

			'summary { outline: none; }' +
			'summary h3, summary h4 { display:inline; }' +

			'.popUp { background-color: white; left: 150px; border: 1px solid red; opacity: 1.0; padding: 5px; position: absolute; width: 120px; z-index: 10; }' +

			'#bars { color: crimson; cursor: pointer; font-size: 24pt; text-decoration: none; }' +

			'#container { left: 0; position: absolute; transition: left 1s; }' +

			'#hamburger { background-color: #eee; left: 325px; position: absolute; top: 20px; }' +

			'#menu { background-color: #eee; border: 1px #ccc solid; max-height: ' + window.innerHeight + 'px; overflow: auto; padding: 0 10px; position: absolute; width: 300px; }' +
			'#menu h2 { margin: 0; }' +

		'';

		container = document.body.appendChild( document.createElement( 'div' ) );
		container.id = 'container';
		container.innerHTML =

			'<div id=menu >' +

				'<h2>' +
					'<a href=http://jaanga.github.io title="Jaanga - your 3D happy place" > &#x2766 </a><br>' +
					'<a href="" title="Click here to refresh this page" >' + document.title + '</a>' +
					' ~ <a href=index.html#readme.md onmouseover=popHelp.style.display=""; onmouseout=popHelp.style.display="none"; > &#x24D8; </a>' +
				'</h2>' +

				'<div class=popUp id=popHelp style=display:none; ><p>Hi there!</p>Click the i-in-circle, info icon for latest updates.</div>' +

				'<p><a href="../elevations-get/index.html" >Elevations Get</a></p>' +

				'<div id=menuDetailsAPIKey ></div>' +

				'<div id=menuDetailsSelectFile ></div>' +

//				'<div id=menuDetailsSettings ></div>' +

				'<div id=menuDetailsOverlay ></div>' +

				'<div id=menuDetailsTerrain ></div>' +

				'<div id=menuDetailsElevations ></div>' +

				'<div id=menuBackgroundSettings ></div>' +

				'<div id=menuDetailsOverlay2 ></div>' +


				'<details >' +
					'<summary><h3>about</h3></summary>' +
					'<p>Copyright &copy; 2016 Jaanga authors. <a href=http://jaanga.github.io/home/r4/index.html#http://jaanga.github.io/jaanga-copyright-and-mit-license.md >MIT license</a>.</p>' +
					'<p>Click the \'i in a circle\' icon for more <a href=index.html#readme.md title="Click here for help and information" >help</a>.</p>' +
					'<p>\'We stand on the shoulders of giants.\' In this case the giant is ' +
						'<a href="https://developers.google.com/maps/documentation/javascript/" target="_blank">Google Maps JavaScript API</a></p>' +
				'</details>' +

				'<hr>' +

				'<center><a href=javascript:menu.scrollTop=0; style=text-decoration:none; onmouseover=pop2.style.display=""; onmouseout=pop2.style.display="none"; ><h1> &#x2766 <h1></a></center>' +
				'<div class=popUp id=pop2 style=display:none;bottom:10px; >Jaanga - your 3D happy place.<br>Click here to return to the top of the page</div>' +

			'</div>' +

			'<div id=hamburger onclick=container.style.left=container.style.left===""?"-325px":""; >' +
				'<div id=bars title="Click this hamburger to slide the menu" > &#9776 </div>' +
			'</div>' +

		'';

// three.js

		stats = new Stats();
		stats.domElement.style.cssText = 'position: absolute; right: 0; top: 0;' ;
		document.body.appendChild( stats.domElement );
		stats.domElement.style.display = window.innerWidth < 500 ? 'none' : '';


		renderer = new THREE.WebGLRenderer( {  alpha: 1, antialias: true }  );
		renderer.setClearColor( backgroundColor );
//		renderer.setClearColor( 0xf0f0f0 );
//		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( renderer.domElement );

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.00001, 2000 );
		camera.position.set( 1, 1, 1 );
		camera.up.set( 0, 0, 1 );

		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.maxDistance = 1;

		controls.autoRotate = true;

		scene = new THREE.Scene();

		window.addEventListener( 'resize', onWindowResize, false );
		window.addEventListener( 'click', function() { controls.autoRotate = false; }, false );


// helpers

		var axisHelper = new THREE.AxisHelper( 180 );
		scene.add( axisHelper );

// assets

//		location.hash = defaultFile;

		initUI();

		if ( window.self !== window.top ) { container.style.left = '-325px'; }

	}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

		stats.domElement.style.display = window.innerWidth < 500 ? 'none' : '';

	}

	function animate() {

		requestAnimationFrame( animate );
		controls.update();
		stats.update();
		renderer.render( scene, camera );

	}

</script>
</body>
</html>
