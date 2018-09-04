
let sceneRotation = 1;

let renderer, scene, camera, controls;

function InitThreejs() {


	renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( - 100, - 100, 100 );
	camera.up.set( 0, 0, 1 );

	controls = new THREE.TrackballControls( camera, renderer.domElement );

	scene = new THREE.Scene();

	window.addEventListener( 'resize', onWindowResize, false );
	window.addEventListener( 'orientationchange', onWindowResize, false );
	window.addEventListener( 'keyup', () => sceneRotation = 0, false );
	renderer.domElement.addEventListener( 'click', () => sceneRotation = 0, false );

	const axesHelper = new THREE.AxesHelper( 100 );
	scene.add( axesHelper );

	const geometry = new THREE.BoxGeometry( 50, 50, 50 );
	const material = new THREE.MeshNormalMaterial();
	const mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	animate();
}


function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

}



function animate() {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	controls.update();
	scene.rotation.z += sceneRotation / 1000;

}


export { InitThreejs };

