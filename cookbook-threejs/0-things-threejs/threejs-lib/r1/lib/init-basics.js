
function getBasics() {

	const geometry = new THREE.BoxGeometry( 100, 100, 2 );
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, -1 ) );
	const material = new THREE.MeshNormalMaterial();
	const mesh = new THREE.Mesh( geometry, material );
	mesh.position.set( 0, 0, -1 );

	gridHelper = new THREE.GridHelper( 100, 10 );
	gridHelper.rotation.x = 0.5 * Math.PI;
	mesh.add( gridHelper );

	mesh.add( new THREE.AxesHelper( 50 ) );

	return mesh

}



function getBoxes( count = 50 ) {

	const geometry = new THREE.BoxBufferGeometry( 10, 10, 10 );
	const material = new THREE.MeshNormalMaterial( { opacity: 0.7, side: THREE.DoubleSide, transparent: true });
	const boxes = new THREE.Group();

	for ( var i = 0; i < count; i++ ) {

		const mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( 100 * Math.random() - 50, 100 * Math.random() - 50, 50 * Math.random() );
		mesh.rotation.set( 6.3 * Math.random(), 1.57 * Math.random(), 3.14 * Math.random() );

		const edges = new THREE.EdgesGeometry( geometry );
		const lines = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0xffffff } ) );
		mesh.add( lines );

		boxes.add( mesh );

	}

	return boxes;

}