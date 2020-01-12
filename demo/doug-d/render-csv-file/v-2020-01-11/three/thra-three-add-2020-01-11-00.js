
const THRA = {};

THRA.init = function () {

	window.addEventListener( "onloadthree", THRA.addThings, false );

};



THRA.addThings = function () {

	//console.log( '', 23 );

	THRA.addLights();

	//THRA.addMeshes();

}


THRA.addLights = function() {

	const scene = THR.scene;
	const camera = THR.camera;


	//scene.add( new THREE.AmbientLight( 0x404040 ) );
	scene.add( new THREE.AmbientLight( 0x666666 ) );

	pointLight = new THREE.PointLight( 0x444444, 0.3 );
	pointLight.position.copy( camera.position );
	camera.add( pointLight );

	directionalLight = new THREE.DirectionalLight( 0xdfebff, 0.5 );
	directionalLight.position.set( -50, 200, 100 );
	directionalLight.castShadow = true;
	directionalLight.shadow.mapSize.width = 1024;
	directionalLight.shadow.mapSize.height = 1024;

	var d = 60;
	directionalLight.shadow.camera.left = - d;
	directionalLight.shadow.camera.right = d;
	directionalLight.shadow.camera.top = d;
	directionalLight.shadow.camera.bottom = - d;
	directionalLight.shadow.camera.far = 10 * d;
	scene.add( directionalLight );

	//scene.add( new THREE.CameraHelper( directionalLight.shadow.camera ) );

}


THRA.addMesh = function( size = 20 ) {

	// CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded )
	// SphereGeometry( radius, segmentsWidth, segmentsHeight, phiStart, phiLength, thetaStart, thetaLength )
	// TorusGeometry( radius, tube, radialSegments, tubularSegments, arc )

	const geometry = new THREE.BoxGeometry( size, size, size );

	geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );
	geometry.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, 1 ) );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, 0 ) );

	//const material = new THREE.MeshNormalMaterial();
	const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), specular: 0xffffff } );
	mesh = new THREE.Mesh( geometry, material );
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	THR.scene.add( mesh );

	return mesh;

}



THRA.addMeshes= function( count = 100 ) {

	THR.scene.remove( meshGroup );

	meshGroup = new THREE.Group();

	for ( let i = 0; i < count; i++ ) { meshGroup.add( THRA.addMesh() ) };

	meshGroup.children.forEach( mesh => {
		mesh.position.set( Math.random() * 100 - 50, Math.random() * 100 - 50, Math.random() * 100 - 50 )
		mesh.rotation.set( 0.2 * Math.random(), 0.2 * Math.random(), 0.2 * Math.random() )
	} );

	THR.scene.add( meshGroup );

}


THRA.init();