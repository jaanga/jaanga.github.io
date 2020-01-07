
//let urlDefault = "https://raw.githack.com/dashdotdotdashdotdot/Lines/master/venus.csv";
let urlDefault = "https://rawcdn.githack.com/jaanga/jaanga.github.io/master/demo/doug-d/csv-file-samples/venus-lines-128.csv";
let urlPrevious = "";

const urlSourceCode = `https://github.com/jaanga/jaanga.github.io/tree/master/demo/doug-d/render-csv-file`;
const urlSourceCodeIcon = "assets/github-mark-32.png";

let group, material, geometry, edges, boxHelper;
let axesHelper;
let renderer, camera, controls, scene;
let sceneRotation = 1;
let eventResetAll;

init();
animate();

function init () {

	//hdrTitle.innerHTML = getTitle();

	//CVDdivCsvViewerDashDotDot.innerHTML = CVD.getMenu();

	//CVJdivCsvViewerJaanga.innerHTML = CVJ.getMenu();

	ORdivObjectRotation.innerHTML = OR.getMenu();

	DLBdivMenuDrawLineBasic.innerHTML = DLB.getMenu();

	DLFdivMenuDrawLineFat.innerHTML = DLF.getMenu();

	DLMdivMenuDrawLineMesh.innerHTML = DLM.getMenu();

	DSSdivMenuDisplaySceneSettings.innerHTML = DSS.getMenu();



	camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( - 100, - 100, 100 );
	camera.up.set( 0, 0, 1 );


	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcce0ff );
	scene.fog = new THREE.Fog( 0xcce0ff, 50, 500 );
	scene.add( camera )


	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.maxDistance = 500;
	controls.autoRotate = true;
	controls.rotateSpeed = 0.1;
	//controls.maxPolarAngle = Math.PI * 0.5;

	axesHelper = new THREE.AxesHelper( 100 );
	scene.add( axesHelper );
	axesHelper.visible = false;

	addLights();

	addGround();

	window.addEventListener( "resize", onWindowResize, false );
	window.addEventListener( "orientationchange", onWindowResize, false );
	window.addEventListener( "keyup", () => ChkRotate.checked=controls.autoRotate=false, false );
	renderer.domElement.addEventListener( "click", () => ChkRotate.checked=controls.autoRotate=false, false );

	// geometry = new THREE.BoxGeometry( 50, 50, 50 );
	// material = new THREE.MeshNormalMaterial( { opacity: 0.85, side:2, transparent: true });
	// group = new THREE.Mesh( geometry, material );
	// scene.add( group );

	//  {"bubbles": true, "cancelable": false, detail: true }

	eventResetAll = new Event( "onresetall" );

	window.addEventListener( "onresetall", DSS.reset, false );

	window.addEventListener( "onloadfile", DLB.renderLines, false );


	window.addEventListener( 'hashchange', onHashChange, false );

	onHashChange();


	if ( window.innerWidth < 640 || window.innerHeight < 640 ) {
		toggleNavMenu();
	}

}


function addGround() {

	const geometry = new THREE.PlaneBufferGeometry( 2000, 2000 );
	const material = new THREE.MeshPhongMaterial( { color: 0xaaaaaa, depthWrite: false, side: 2 } );
	ground = new THREE.Mesh( geometry, material );
	ground.position.z = -50;
	ground.receiveShadow = true;
	scene.add( ground );

}

function onHashChange() {

	lh = location.hash || "";

	let camx = lh.match( /camx=(.*?)&/i );
	camx = camx ? camx[ 1 ] : -100;
	//inpCamx.value = camx;

	let camy = lh.match( /camy=(.*?)&/i )
	camy = camy ? camy[ 1 ] : 100;
	//inpCamy.value = camy;

	let camz= lh.match( /camz=(.*?)&/i )
	camz = camz ? camz[ 1 ] : 100;
	//inpCamz.value = camz;

	//console.log( '', camx, camy, camz );

	camera.position.set( camx, camy, camz );

	let tarx = lh.match( /tarx=(.*?)&/i )
	tarx = tarx ? tarx[ 1 ] : 0;
	//inpTarx.value = tarx;

	let tary = lh.match( /tary=(.*?)&/i )
	tary = tary ? tary[ 1 ] : 0;
	//inpTary.value = tary;

	let tarz= lh.match( /tarz=(.*?)&/i )
	tarz = tarz ? tarz[ 1 ] : 0;
	//inpTarz.value = tarz;

	//console.log( '', tarx, tary, tarz );

	fetchCsv();

	controls.target.set( Number( tarx ), Number( tary ), Number( tarz ) );

}



function fetchCsv () {

	url = location.hash.match( /url=(.*?)\.csv/i );
	url = url ? url[ 1 ] + ".csv" : urlDefault;

	CSVdivOnLoad.innerHTML = "";

	if ( url !== urlPrevious ) {

		// fetch( new Request( url ) )
		// 	.then( response => response.text() )
		// 	.then( csv => CSV.parseCsvText( csv ) )
		// 	//.then( () => window.dispatchEvent( eventOnloadFile ) )
		// 	//.then( () => zoomObjectBoundingSphere() );

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		xhr.onprogress = ( xhr ) => {
		CSVdivOnProgress.innerHTML =
			`<p>bytes loaded: ${ xhr.loaded.toLocaleString() }</p>`;
		}; /// or something
		xhr.onload = callback;
		xhr.send( null );

		function callback( xhr ) {

			const response = xhr.target.response;
			//console.log( 'response', response );

			CSV.parseCsvText( response )

		}

		urlPrevious = url;

	}

}



function zoomObjectBoundingSphere ( obj = group ) {
	console.log( "obj", obj );

	const bbox = new THREE.Box3().setFromObject( obj );
	console.log( "bbox", bbox )

	if ( bbox.isEmpty() === true ) { return; }

	if( !isFinite( bbox.min.x ) ) { return }

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


// menus

function toggleNavMenu () {

	expandButton.classList.toggle( "collapsed" );
	navMenu.classList.toggle( "collapsed" );
	main.classList.toggle( "collapsed" );

}


function getTitle () {

	document.title = document.title ? document.title : location.href.split( "/" ).pop().slice( 0, - 5 ).replace( /-/g, " " );
	const version = document.head.querySelector( "[ name=version ]" ).content;
	const description = document.head.querySelector( "[ name=description ]" ).content;

	const htm =
		`
		<h2 style=margin-bottom:0; >
			<a href=${ urlSourceCode } target=_top title="Source code on GitHub" >
				<img src="${ urlSourceCodeIcon }" alt="GitHub logo" height=18 style=opacity:0.5; >
			</a>
			<a href="" title="Click to reload this page" >${ document.title } ${ version }</a>


		</h2>

		<details><summary>?</summary>
			${ document.head.querySelector( "[ name=description ]" ).content }
		</details>
	`;

	return htm;

}


// three.js


function addLights() {

	scene.add( new THREE.AmbientLight( 0x404040 ) );
	//scene.add( new THREE.AmbientLight( 0x666666 ) );

	const pointLight = new THREE.PointLight( 0xffffff, 0.1 );
	pointLight.position.copy( camera.position );
	camera.add( pointLight );

	light = new THREE.DirectionalLight( 0xdfebff, 0.5 );
	light.position.set( -50, -200, 100 );
	light.castShadow = true;
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;

	var d = 100;
	light.shadow.camera.left = - d;
	light.shadow.camera.right = d;
	light.shadow.camera.top = d;
	light.shadow.camera.bottom = - d;
	light.shadow.camera.far = 500;
	scene.add( light );

	//scene.add( new THREE.CameraHelper( light.shadow.camera ) );

}

function onWindowResize () {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

	//controls.handleResize();

	//console.log( "onWindowResize  window.innerWidth", window.innerWidth );

}



function animate () {

	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	controls.update();
	//scene.rotation.z += sceneRotation / 1000;



}



function updateHash () {

	if ( !url ) { alert( "Cannot create the permalink.\nThe model must be available via a UrL" ); return; }

	const camx = `camx=${ camera.position.x }&`;
	const camy = `camy=${ camera.position.y }&`;
	const camz = `camz=${ camera.position.z }&`;

	const tarx = `tarx=${ controls.target.x }&`;
	const tary = `tary=${ controls.target.y }&`;
	const tarz = `tarz=${ controls.target.z }&`;

	location.hash = camx + camy + camz + tarx + tary + tarz + `url=${ encodeURI( url ) }`;

}