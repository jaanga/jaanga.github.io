


	var heightMap = {};
	heightMap.url = '../../bitmaps/bathymetry_bw_composite_2k.png';
	heightMap.width = 2048;
	heightMap.height = 1024;

	var sourceFolder = '../../bitmaps/';

	var earthRadiusEquator = 6371;
	var pi = Math.PI, pi2 = 2 * Math.PI, pi05 = 0.5 * Math.PI, pi_05 = -0.5 * Math.PI;
	var d2r = pi / 180;
	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	overlays = [

		[ 'bathymetry_bw_composite_2k.png', 'height map' ],
		[ 'Elevation.jpg', 'Elevation' ],
		[ 'GLOBALeb3colshade.jpg', 'Global eb3 color shade' ],
		[ 'world.topo.bathy.200408.3x5400x2700.jpg', 'World Topo Bathy' ],
		[ '2_no_clouds_4k.jpg','no clouds'],
		[ 'world-map.jpg','world-map']

	];

	var scale = 2;
	var scaleAdjust = 0.0009;
	var scl = scaleAdjust * scale;

	var delayTime = 2000;
	var autoRotateSpeed = 0.5;
	var materialOverlay;

	var seaLevel;


	function getHeightMap() {

		var h = heightMap;

		h.canvas = document.createElement( 'canvas' );
//		document.body.appendChild( h.canvas );
//		h.canvas.style.cssText = ' left: 0; margin: 20px; position: absolute; top: 0; z-index: 10; ';
		h.canvas.width = h.width;
		h.canvas.height = h.height;
		h.context = h.canvas.getContext( '2d' );

		imageLoader = new THREE.ImageLoader();
		imageLoader.crossOrigin = 'anonymous';
		imageLoader.load( h.url, getHeightMapData );

	}


	function getHeightMapData( map ) {

		var h = heightMap;

		h.context.drawImage( map, 0, 0, h.width, h.height, 0, 0, h.width, h.height );

		h.data = h.context.getImageData( 0, 0, h.width, h.height ).data;

		updateGlobe();

	}

	function drawGlobe() {

		var h = heightMap;

		scene.remove( h.mesh );

		geometry = new THREE.SphereBufferGeometry( earthRadiusEquator, h.width - 1, h.height - 1 );
		material = new THREE.MeshNormalMaterial( { side: 2 } );
		h.mesh = new THREE.Mesh( geometry, material );

		scene.add( h.mesh );

		if ( h.data ) { 

			updateGlobe(); 
			selectOverlay(); 

		}

	}

	function updateGlobe() {

		var h = heightMap;

		scl = 0.0018 * inpScale.valueAsNumber; 
		outScale.value = scl;

		vertices = h.mesh.geometry.attributes.position.array;
 
		for ( var i = 0, j = 0; i < vertices.length; j += 4 ) {

			var s = 1 + scl * h.data[ j ];
			vertices[ i++ ] *= s;
			vertices[ i++ ] *= s;
			vertices[ i++ ] *= s;

		}

		h.mesh.geometry.attributes.position.needsUpdate = true;

		h.mesh.geometry.computeVertexNormals();

console.timeEnd( 'Timer0' );

	}


	function selectOverlay() {

		var loader = new THREE.TextureLoader();
		loader.crossOrigin = 'anonymous';
		loader.load( sourceFolder + overlays[ selOverlay.selectedIndex ][0], updateTexture );

	}

	function updateTexture( texture ) {

		texture.needsUpdate = true;
		materialOverlay = new THREE.MeshPhongMaterial( { color: 0xcccccc, emissive: 0x000000, map: texture, specular: 0x111111 } );

		if ( heightMap.mesh ){ heightMap.mesh.material = materialOverlay; }

	}