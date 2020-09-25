let group, axesHelper, lightDirectional, cameraHelper;
let renderer, camera, controls, scene;

const THR = {
	group,
	axesHelper,
	lightDirectional,
	cameraHelper,
	renderer,
	camera,
	controls,
	scene,
};

THR.center = new THREE.Vector3( 0, 0, 0 );
THR.radius = 50;

THR.init = function () {
	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( -100, -100, 100 );
	camera.up.set( 0, 0, 1 );

	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcce0ff );
	scene.fog = new THREE.Fog( 0xcce0ff, 550, 800 );
	scene.add( camera );

	renderer = new THREE.WebGLRenderer( { alpha: true, antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	document.body.appendChild( renderer.domElement );

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.minDistance = 1;
	controls.maxDistance = 500;
	controls.autoRotate = true;
	controls.enableDamping = true;
	controls.dampingFactor = 0.08;
	controls.enablePan = true;
	controls.autoRotateSpeed = 5;

	axesHelper = new THREE.AxesHelper( 100 );
	axesHelper.name = "axesHelper";
	scene.add( axesHelper );

	window.addEventListener( "resize", THR.onWindowResize, false );
	window.addEventListener( "orientationchange", THR.onWindowResize, false );

	window.addEventListener( "keydown", THR.onStart );
	renderer.domElement.addEventListener( "click", THR.onStart );
	renderer.domElement.addEventListener( "touchstart", THR.onStart );
	renderer.domElement.addEventListener( "touchmove", THR.onStart );
	renderer.domElement.addEventListener( "touchend", THR.onStart );
	renderer.domElement.addEventListener( "wheel", THR.onStart );

	THR.camera = camera;
	THR.controls = controls;
	THR.renderer = renderer;
	THR.scene = scene;

	THR.axesHelper = axesHelper;

	let event = new Event( "onloadthree", { bubbles: true, cancelable: false, detail: true } );

	window.addEventListener( "onloadthree", THR.onLoad, false );

	window.dispatchEvent( event );
};

THR.onStart = function () {
	controls.autoRotate = false;

	window.removeEventListener( "keydown", THR.onStart );
	renderer.domElement.removeEventListener( "click", THR.onStart );
	renderer.domElement.removeEventListener( "touchstart", THR.onStart );
	renderer.domElement.removeEventListener( "touchmove", THR.onStart );
	renderer.domElement.removeEventListener( "touchend", THR.onStart );
	renderer.domElement.removeEventListener( "wheel", THR.onStart );
};


THR.setSceneNew = function ( group ) {

	THR.scene.remove( group );

	group = new THREE.Group();

	THR.scene.add( group );

	return group;

};

THR.updateScene = function ( group = THR.group ) {
	//console.log( "group", THR.group  );

	if ( !THR.group.children.length ) {
		return;
	}

	THR.zoomObjectBoundingSphere( group );

};

//////////

THR.zoomObjectBoundingSphere = function ( obj = THR.group ) {
	//console.log( "obj", obj );

	THR.center = new THREE.Vector3( 0, 0, 0 );
	THR.radius = 50;
	THR.bottom = 0;

	const bbox = new THREE.Box3().setFromObject( obj );
	//console.log( 'bbox', bbox );

	if ( bbox.max.x !== Infinity ) {
		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );

		THR.center = sphere.center;
		THR.radius = sphere.radius;
		THR.bottom = bbox.min.z;
	}

	THR.controls.target.copy( THR.center ); // needed because model may be far from origin
	THR.controls.maxDistance = 50 * THR.radius;
	THR.controls.update();

	THR.camera.position.copy(
		THR.center.clone().add( new THREE.Vector3( -1.5 * THR.radius, -1 * THR.radius, 1.5 * THR.radius ) )
	);
	THR.camera.near = 0.001 * THR.radius; //2 * camera.position.length();
	THR.camera.far = 50 * THR.radius; //2 * camera.position.length();
	THR.camera.updateProjectionMatrix();

	THR.scene.fog.near = THR.radius * 7;
	THR.scene.fog.far = THR.radius * 8;

	THR.axesHelper.position.copy( THR.center );

	if ( THR.ground ) {

		THR.ground.position.set( THR.center.x, THR.center.y, THR.bottom - 0.5 );

	}

	// if (window.HRT) {
	// 	HRT.heart.position.set(THR.center.x, THR.center.y, THR.bottom - 1 * THR.radius);
	// }

	if ( THR.lightDirectional ) {
		THR.lightDirectional.position.copy(
			THR.center.clone().add( new THREE.Vector3( -1.5 * THR.radius, -1.5 * THR.radius, 1.5 * THR.radius ) )
		);

		THR.lightDirectional.shadow.camera.scale.set( 0.01 * THR.radius, 0.01 * THR.radius, 0.01 * THR.radius );

		THR.lightDirectional.target = THR.axesHelper;

		THR.scene.remove( THR.cameraHelper );
		THR.cameraHelper = new THREE.CameraHelper( THR.lightDirectional.shadow.camera );
		THR.scene.add( THR.cameraHelper );
		THR.cameraHelper.visible = false;
	}

	//let event = new Event("onresetthree", { bubbles: true, cancelable: false, detail: true });
	//window.addEventListener( "onrresetthree", doThings, false );
	//window.dispatchEvent(event);
};

THR.zoomToFitObject = function ( object = THR.group, fitOffset = 1 ) {

	const box = new THREE.Box3().setFromObject( object );
	const size = box.getSize( new THREE.Vector3() );
	const center = box.getCenter( new THREE.Vector3() );

	const maxSize = Math.max( size.x, size.y, size.z );
	const fitHeightDistance = maxSize / ( 2 * Math.atan( ( Math.PI * THR.camera.fov ) / 360 ) );
	const fitWidthDistance = fitHeightDistance / THR.camera.aspect;
	const distance = fitOffset * Math.max( fitHeightDistance, fitWidthDistance );

	const direction = THR.controls.target.clone().sub( THR.camera.position ).normalize().multiplyScalar( distance );

	THR.controls.maxDistance = distance * 10;
	THR.controls.target.copy( center );

	THR.camera.near = distance / 100;
	THR.camera.far = distance * 100;
	THR.camera.updateProjectionMatrix();

	THR.scene.fog.near = distance * 2;
	THR.scene.fog.far = distance * 2.5;

	THR.distance = distance;

	THR.camera.position.copy( THR.controls.target ).sub( direction );

	THR.controls.update();

	//let event = new Event("onresetthree", { bubbles: true, cancelable: false, detail: true });
	//window.addEventListener( "onrresetthree", doThings, false );
	//window.dispatchEvent(event);
};



THR.setAllVisible = function () {

	//THRU.tellTaleReset();

	THR.group.children.forEach( mesh => ( mesh.visible = true ) );
};

//////////

THR.addLights = function () {
	//scene.add( new THREE.AmbientLight( 0x404040 ) );
	scene.add( new THREE.AmbientLight( 0xaaaaaa ) );

	const pointLight = new THREE.PointLight( 0xffffff, 1 );
	pointLight.position.copy( camera.position );
	camera.add( pointLight );

	// lightDirectional = new THREE.DirectionalLight( 0xdffffff, 0 );
	// lightDirectional.position.set( -50, -200, 100 );
	// scene.add( lightDirectional );
};

THR.addLights = function () {
	//scene.add( new THREE.AmbientLight( 0x404040 ) );
	THR.scene.add( new THREE.AmbientLight( 0x888888 ) );

	const pointLight = new THREE.PointLight( 0xffffff, 0.2 );
	pointLight.position.copy( camera.position );
	pointLight.shadow.radius = 2;
	//pointLight.castShadow = true;
	THR.camera.add( pointLight );

	lightDirectional = new THREE.DirectionalLight( 0xdffffff, 0.5 );
	lightDirectional.position.set( -0, -200, 100 );
	lightDirectional.castShadow = true;
	// lightDirectional.shadow.mapSize.width = 1024;
	// lightDirectional.shadow.mapSize.height = 1024;

	let d = 100;
	lightDirectional.shadow.camera.left = -d;
	lightDirectional.shadow.camera.right = d;
	lightDirectional.shadow.camera.top = d;
	lightDirectional.shadow.camera.bottom = -d;
	lightDirectional.shadow.camera.far = 500;
	THR.scene.add( lightDirectional );

	THR.lightDirectional = lightDirectional;
};

THR.addGround = function ( position = new THREE.Vector3( 0, 0, 0 ) ) {
	const geometry = new THREE.PlaneBufferGeometry( 5000, 5000 );
	geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( position.x, position.y, position.z ) );
	const material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, side: 0 } );
	THR.ground = new THREE.Mesh( geometry, material );
	//THR.ground.position.copy(position);
	THR.ground.receiveShadow = true;

	THR.scene.add( THR.ground );

	// const geo = new THREE.PlaneGeometry(50, 20);
	// const mat = new THREE.MeshPhongMaterial({
	// 	color: "pink",
	// 	polygonOffset: true,
	// 	polygonOffsetFactor: -0.2,
	// 	side: 2,
	// });
	// THR.ground.add(new THREE.Mesh(geo, mat));
};

THR.setStats = function () {
	const script = document.head.appendChild( document.createElement( "script" ) );
	script.onload = () => {
		const stats = new Stats();
		const statsDom = document.body.appendChild( stats.dom );
		statsDom.style.left = "";
		statsDom.style.right = "0px";
		requestAnimationFrame( function loop () {
			stats.update();
			requestAnimationFrame( loop );
		} );
	};

	script.src = "https://mrdoob.github.io/stats.js/build/stats.min.js";

	const render = renderer.info.render;

	detFile.open = true;
	if ( !window.divLog ) {
		divLog = detFile.body.appendChild( document.createElement( "div" ) );
	}
	divLog.innerHTML = `
<p>
Three.js renderer statistics<br>
Draw calls: ${render.calls }<br>
Triangles: ${render.triangles.toLocaleString() }<br>
</p>`;
};

THR.onWindowResize = function () {
	THR.camera.aspect = window.innerWidth / window.innerHeight;
	THR.camera.updateProjectionMatrix();

	//THR.controls.reset();
	THR.renderer.setSize( window.innerWidth, window.innerHeight );
	//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

	//THR.zoomObjectBoundingSphere();

};

THR.animate = function () {
	requestAnimationFrame( THR.animate );
	renderer.render( THR.scene, THR.camera );
	THR.controls.update();
};
