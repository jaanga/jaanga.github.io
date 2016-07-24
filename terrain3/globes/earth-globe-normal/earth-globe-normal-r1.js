// 2016-07-22 ~ R1

	var heightMap = {};

	heightMap.source = '../../bitmaps/bathymetry_bw_composite_2k.png';
	heightMap.width = 2048;
	heightMap.height = 1024;

// https://en.wikipedia.org/wiki/Earth_radius#Mean_radius

	var earthRadiusEquator = 6371;

//	marianas depth = 10994
//	everest height = 8848;

	var seaLevelShade = Math.floor( 256 * 10994 / ( 10994 + 8848 ) );


	function drawGlobe() {

		var h = heightMap;

		if ( !h.data ) { getHeightMap(); }

		if ( !menuContents.innerHTML ) { updateMenu(); }

		h.verticesY = 256 * Math.pow( 2, selVertices.selectedIndex );
		h.verticesX = 2 * h.verticesY;

		scene.remove( h.globe,h.seaLevel );

		geometry = new THREE.SphereBufferGeometry( 1, 50, 25 );
		material = new THREE.MeshNormalMaterial( { opacity: 0.01 * inpOpacity.value, side: 2, transparent: true } );
		h.seaLevel = new THREE.Mesh( geometry, material );
		scene.add( h.seaLevel );

		geometry = new THREE.SphereBufferGeometry( 1, h.verticesX - 1, h.verticesY - 1 );
		material = new THREE.MeshNormalMaterial( { side: 2 } );
		h.globe = new THREE.Mesh( geometry, material );

		scene.add( h.globe );

		if ( h.data ) updateGlobe();

	}

	function updateMenu( target ) {

		target = target || menuContents;

		target.innerHTML =

			'<details open>' +

				'<summary><h3>globe details</h3></summary>' +

				'<p>Number of vertices<br>' +

					'<select id=selVertices onchange=heightMap.data="";drawGlobe(); size=3 > ' +
						'<option>512 x 256 </option>' +
						'<option selected >1024 x 512 </option>' +
						'<option>2048 x 1024 </option>' +
					'</select>' +

				'</p>' +

				'<p>' +
					'Vertical Scale: <output id=outScale >10</output>x<br>' +
					'<input type=range id=inpScale min=-20 max=30 step=1 value=15 onchange=drawGlobe(); />' +
				'</p>' +

				'<p>' +
					'Sea level opacity: <output id=outOpacity >50</output>%<br>' +
					'<input type=range id=inpOpacity min=0 max=100 step=1 value=50 />' +
				'</p>' +

				'<p><input type=checkbox id=chkNormalsLand onchange=drawGlobe(); > Reverse normals: land mass</p>' +
				'<p><input type=checkbox id=chkNormalsSea onchange=drawGlobe(); > Reverse normals: sea level</p>' +


			'</details>' +
		'';

		inpOpacity.onchange = function() {

			heightMap.seaLevel.material.opacity = 0.01 * this.value;
			outOpacity.value = this.value;

		};

		if ( window.innerWidth < 800 ) { selVertices.selectedIndex = 0; }


	}

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
		imageLoader.load( h.source, getHeightMapData );

	}

	function getHeightMapData( map ) {

		var h = heightMap;

		h.context.drawImage( map, 0, 0, h.width, h.height, 0, 0, h.verticesX, h.verticesY );
		h.data = h.context.getImageData( 0, 0, h.verticesX, h.verticesY ).data;

		updateGlobe();

	}


	function updateGlobe() {

		var h = heightMap;
		var scale, vertices, s;

		scl = 1 * inpScale.valueAsNumber;
		outScale.value = scl;

		signLand = chkNormalsLand.checked ? -1: 1;
		signSea = chkNormalsSea.checked ? -1: 1;

		vertices = h.globe.geometry.attributes.position.array;

		for ( var i = 0, j = 0; i < vertices.length; j += 4 ) {

			s = signLand * ( 6371 + scl * h.data[ j ] );

			vertices[ i++ ] *= s;
			vertices[ i++ ] *= s;
			vertices[ i++ ] *= s;

		}

		h.globe.geometry.attributes.position.needsUpdate = true;
		h.globe.geometry.computeVertexNormals();

		vertices = h.seaLevel.geometry.attributes.position.array;

		s = signSea * ( 6371 + scl * seaLevelShade );

		for ( i = 0; i < vertices.length; ) {

			vertices[ i++ ] *= s;
			vertices[ i++ ] *= s;
			vertices[ i++ ] *= s;

		}

		h.seaLevel.geometry.attributes.position.needsUpdate = true;
		h.seaLevel.geometry.computeVertexNormals();

console.timeEnd( 'Timer0' );

	}

