

	var globe = {};

	globe.sourceHeight = '../../bitmaps/bathymetry_bw_composite_2k.png';
	globe.sourceTexture = '../../bitmaps/2_no_clouds_4k.jpg';
	globe.width = 2048;
	globe.height = 1024;
	globe.meshEarth = new THREE.Object3D();
	globe.meshSeaLevel = new THREE.Object3D();

	globe.sourceFolder = '../../bitmaps/';
	globe.overlays = [

		[ 'bathymetry_bw_composite_2k.png', 'height map' ],
		[ 'Elevation.jpg', 'Elevation' ],
		[ 'GLOBALeb3colshade.jpg', 'Global eb3 color shade' ],
		[ 'world.topo.bathy.200408.3x5400x2700.jpg', 'World Topo Bathy' ],
		[ '2_no_clouds_4k.jpg','no clouds'],
		[ 'world-map.jpg','world-map']

	];

	function drawGlobe() {

		if ( !menuContents.innerHTML ) { setGlobeMenu(); }
		outScale.value = inpScale.value;

		scene.remove( globe.meshEarth, globe.meshSeaLevel );

		globe.verticesY = 256 * Math.pow( 2, selVertices.selectedIndex );
		globe.verticesX = 2 * globe.verticesY;

		globe.loader = new THREE.TextureLoader();
		globe.loader.crossOrigin = '';
		heightmap = globe.loader.load( globe.sourceHeight );
		texture = globe.loader.load( globe.sourceFolder + globe.overlays[ selOverlay.selectedIndex ][0] )

		geometry = new THREE.SphereBufferGeometry( 6371, globe.verticesX - 1, globe.verticesY - 1 );

		material = new THREE.MeshPhongMaterial( {

			color: 0xccccff,
			map: texture,
			displacementMap: heightmap,
			displacementScale: 120 * inpScale.valueAsNumber

		} );

		globe.meshEarth = new THREE.Mesh( geometry, material );

		geometry = new THREE.SphereBufferGeometry( 6371 + 60 * inpScale.valueAsNumber, 50, 25 );
		material = new THREE.MeshNormalMaterial( { opacity: 0.5, transparent: true } );
		globe.meshSeaLevel = new THREE.Mesh( geometry, material );

		scene.add( globe.meshEarth, globe.meshSeaLevel );

console.timeEnd( 'timer 0' );

	}

	function setOverlay() {

		texture = globe.loader.load( globe.sourceFolder + globe.overlays[ selOverlay.selectedIndex ][0] );

		globe.meshEarth.material.map = texture;

	}

	function setGlobeMenu( target ) {

		target = target || menuContents;

		target.innerHTML =

			'<details open>' +

				'<summary><h3>globe details</h3></summary>' +

				'<p>Number of vertices<br>' +

					'<select id=selVertices onchange=globe.data="";drawGlobe(); size=3 > ' +
						'<option>512 x 256 </option>' +
						'<option selected >1024 x 512 </option>' +
						'<option>2048 x 1024 </option>' +
					'</select>' +

				'</p>' +

				'<p>Overlay<br><select id=selOverlay onchange=setOverlay(); ></select>' +


				'<p>' +
					'Vertical Scale: <output id=outScale >10</output>x<br>' +
					'<input type=range id=inpScale min=-20 max=30 step=1 value=15 onchange=drawGlobe(); />' +
				'</p>' +

				'<p>' +
					'Sea level opacity: <output id=outOpacity >50</output>%<br>' +
					'<input type=range id=inpOpacity min=0 max=100 step=1 value=50 />' +
				'</p>' +

//				'<p><input type=checkbox id=chkNormalsLand onchange=drawGlobe(); > Reverse normals: land mass</p>' +
//				'<p><input type=checkbox id=chkNormalsSea onchange=drawGlobe(); > Reverse normals: sea level</p>' +


			'</details>' +
		'';

		for ( var i = 0; i < globe.overlays.length; i++) {

				selOverlay.appendChild( document.createElement( 'option' ) );
				selOverlay.children[ i ].text = globe.overlays[i][1];

		}

		selOverlay.selectedIndex = 1;

		inpOpacity.onchange = function() {

			globe.meshSeaLevel.material.opacity = 0.01 * this.value;
			outOpacity.value = this.value;

		};




		if ( window.innerWidth < 800 ) { selVertices.selectedIndex = 0; }


	}