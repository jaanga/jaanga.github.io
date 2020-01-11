
const COR = {};

COR.divViewControls = divViewControls;
COR.divBrowseModels = divBrowseModels;



let mesh, meshGroup;

const urlSourceCode = "https://github.com/jaanga/jaanga.github.io/tree/master/xxxxx/";
const urlSourceIcon = "../../github-mark-32.png";

let sceneRotation = 1;
let renderer, camera, controls, scene;

init();
animate();

function init () {

	hdrTitle.innerHTML = getTitle();

	renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( -100, -100, 100 );
	camera.up.set( 0, 0, 1 );

	controls = new THREE.TrackballControls( camera, renderer.domElement );
	controls.rotateSpeed = 4;

	scene = new THREE.Scene();

	const axesHelper = new THREE.AxesHelper( 100 );
	scene.add( axesHelper );

	window.addEventListener( "resize", onWindowResize, false );
	window.addEventListener( "orientationchange", onWindowResize, false );
	window.addEventListener( "keyup", () => ( sceneRotation = 0 ), false );
	renderer.domElement.addEventListener( "click", () => ( sceneRotation = 0 ), false );

	eventResetAll = new Event( "onresetall" );

	window.addEventListener( "onresetall", resetHome );

	window.dispatchEvent( eventResetAll );

	addMesh();

	//addMeshes();
}


function resetHome () {

	console.log( 'reset home' );
	

}


function addMesh ( size = 20 ) {
	// CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded )
	// SphereGeometry( radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength )
	// TorusGeometry( radius, tube, radialSegments, tubularSegments, arc )

	const geometry = new THREE.BoxGeometry( size, size, size );

	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
	geometry.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, 1 ) );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );

	const material = new THREE.MeshNormalMaterial();
	mesh = new THREE.Mesh( geometry, material );
	mesh.name = "mesh1";
	scene.add( mesh );

	return mesh;
}

function addMeshes ( count = 100 ) {

	scene.remove( meshGroup );

	meshGroup = new THREE.Group();

	for ( let i = 0; i < count; i++ ) {
		meshGroup.add( addMesh() );
	}

	meshGroup.children.forEach( ( mesh, index ) => {

		mesh.position.set(
			Math.random() * 100 - 50,
			Math.random() * 100 - 50,
			Math.random() * 100 - 50
		);
		mesh.name = `meshes-${ index + 1 }`;

	} );

	scene.add( meshGroup );

	window.dispatchEvent(eventResetAll);

}



function getTitle () {
	document.title = document.title
		? document.title
		: location.href
			.split( "/" )
			.pop()
			.slice( 0, -5 )
			.replace( /-/g, " " );

	const htm = `
<h2>
<a href=${urlSourceCode } target=_top title="Source code on GitHub" >
<img src=${urlSourceIcon } height=18 >
</a>
<a href="" title="Click to reload this page" >${document.title }</a>
</h2>

<p>
${document.head.querySelector( "[ name=description ]" ).content }
</p>
`;

	return htm;
}

function onWindowResize () {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	controls.handleResize();

	//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );
}

function animate () {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	controls.update();
	scene.rotation.z += sceneRotation / 1000;
}
