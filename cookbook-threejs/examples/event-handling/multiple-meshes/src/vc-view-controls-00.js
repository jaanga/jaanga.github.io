
const VC = {};


VC.init = function () {


	const htm =
		`

		<button onclick=controls.reset(); title="Return to default view">reset view</button>

		<button onclick=VC.zoomObjectBoundingSphere(); title="zoom without shifting camera angle" >zoom all</button>

		<p id=divContents ><select id=selSceneChildren ></select></p>
	`;

	COR.divViewControls.innerHTML += htm;


};


VC.reset = function () {
	console.log( '', 23 );

	selSceneChildren.innerHTML = scene.children.map( child => `<option>${ child.name || child.id }</option>` );

}



VC.zoomObjectBoundingSphere = function( obj = mesh ) {
	//console.log( "obj", obj );

	const bbox = new THREE.Box3().setFromObject( obj );
	//console.log( "bbox", bbox )

	if ( bbox.isEmpty() === true ) { return; }

	const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
	center = sphere.center;
	radius = sphere.radius;

	controls.target.copy( center ); // needed because model may be far from origin
	controls.maxDistance = 5 * radius;

	camera.position.copy( center.clone().add( new THREE.Vector3( - 1.5 * radius, - 1.5 * radius, 1.5 * radius ) ) );
	camera.near = 0.001 * radius; //2 * camera.position.length();
	camera.far = 10 * radius; //2 * camera.position.length();
	camera.updateProjectionMatrix();

	// if ( lightDirectional ) {

	// 	lightDirectional.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
	// 	lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );

	// 	targetObject.position.copy( center );

	// 	//scene.remove( cameraHelper );
	// 	//cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
	// 	//scene.add( cameraHelper );

	// }

};


VC.init();

window.addEventListener("onresetall", VC.reset );