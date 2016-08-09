

	var camera, controls, camera1, controls1, camera2, controls2;
	var material;

	var clock = new THREE.Clock();

	function setMenuDetailsControllers() {


		menuDetailsControllers.innerHTML =
			'<p><button onclick=setControlsFirstPerson(); >First Person Controls</button> ' +
				'<button onclick=setControlsOrbit(); >Orbit Controls</button></p>' +
			'<div id=msg ></div>';



	}

    function setupControls() {

		cameraPosition = 0.2 * map.radius;
		camera1 = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.00001, 2000 );
		camera1.position.copy( map.boxHelper.geometry.boundingSphere.center ).add( v( 0, -cameraPosition, 0.5 * cameraPosition ) );
		camera1.up.set( 0, 0, 1 );

		controls1 = new THREE.FirstPersonControls( camera1 );
		controls1.lookSpeed = 0.08;
		controls1.movementSpeed = 0.01;


		cameraPosition = 0.7 * map.radius;
//		camera2 = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

		camera2 = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.00001, 2000 );
		camera2.position.set( 1, 1, 1 );
		camera2.up.set( 0, 0, 1 );
		camera2.position.copy( map.boxHelper.geometry.boundingSphere.center ).add( v( 0, -cameraPosition, cameraPosition ) );

		controls2 = new THREE.OrbitControls( camera2, renderer.domElement );
//		controls2.maxDistance = 800;
//		controls2.autoRotate = true;
		controls2.target.copy( map.boxHelper.geometry.boundingSphere.center );
		controls2.maxDistance = 3 * map.radius;

		camera = camera2;
		controls = controls2;

	}


	function setControlsFirstPerson() {


		controls.autoRotate = false;

		cameraPosition = 0.2 * map.radius;
		camera1 = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.00001, 2000 );
		camera1.position.copy( map.boxHelper.geometry.boundingSphere.center ).add( v( 0, -cameraPosition, 0.5 * cameraPosition ) );
		camera1.up.set( 0, 0, 1 );

		controls1 = new THREE.FirstPersonControls( camera1 );
		controls1.lookSpeed = 0.08;
		controls1.movementSpeed = 0.01;

		camera = camera1;
		controls = controls1;

	}


	function setControlsOrbit() {

		if ( !camera2 ) { 

			setupControls(); 

		}

		camera = camera2;
		controls = controls2;
		controls.autoRotate = false;

	}
