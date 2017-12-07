
	let gridHelper, axisHelper, groundHelper;
console.log( 'hi', 23 );


	const div = document.body.appendChild( document.createElement( 'div' ) );
	div.style.cssText = 'border: 1px solid red; width: 500px; position: fixed; right: 30px; top: 20px; z-index:100000; ';

	div.innerHTML = 
`
23nnnnnnnnnnnnnnnnnnnnnnnnnnnn

		<p><button onclick=addHelpers(); >add helpers</button></p>

`;


controls.autoRotate = true;

	geometry = new THREE.BoxGeometry( 50, 50, 50 );
	material = new THREE.MeshNormalMaterial();
	mesh = new THREE.Mesh( geometry, material );
	mesh.position.set( 80, 80, 50 )
	scene.add( mesh );




	function addHelpers( size = 200 ) {

		scene.remove( gridHelper, axisHelper, groundHelper );

		gridHelper = new THREE.GridHelper( size, 20 );
		gridHelper.rotation.x = 0.5 * Math.PI;

//		axisHelper = new THREE.AxisHelper( size * 0.55 );
		axisHelper = new THREE.AxisHelper( size * 0.05 );
		axisHelper.position.set( -0.5 * size, -0.5 * size, 15 )


		const geometry = new THREE.BoxBufferGeometry( size, size, size  );
		const material = new THREE.MeshNormalMaterial( { opacity: 0.85, transparent: true } );
		groundHelper = new THREE.Mesh( geometry, material );
		groundHelper.name = 'groundHelper';
		groundHelper.position.set( 0, 0, -0.5 * size );
		groundHelper.visible = false;

		scene.add( gridHelper, axisHelper, groundHelper );


	}
