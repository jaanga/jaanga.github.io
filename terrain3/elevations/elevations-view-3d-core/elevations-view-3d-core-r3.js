// 2016-07-24 ~ 16: 49


//	var defaultFile = '../elevations-data-02/elevations_Tenzing-Hillary Airport, Lukla, Eastern Region, Nepal_12_3033_1718_3_4_150_200_.txt';
	var defaultFile = '../elevations-data-02/elevations_Igualada_12_2066_1525_3_3_300_300_.txt';

//	var defaultFile = 'http://fgx.github.io/sandbox/flightpaths/vnlk/elevations_Tenzing-Hillary Airport, Lukla, Eastern Region, Nepal_12_3033_1718_3_4_150_200_.txt';
//	var defaultFile = 'http://fgx.github.io/sandbox/flightpaths/kgcn/elevations_Tusayan_12_770_1605_4_5_120_150_.txt';
//	var defaultFile = 'http://fgx.github.io/sandbox/flightpaths/leig/elevations_Igualada_12_2065_1525_3_3_60_60_.txt';
//	var defaultFile = 'http://fgx.github.io/sandbox/flightpaths/vhsk/elevations_Hong%20Kong_14_13381_7141_5_4_150_120_.txt';
//	var defaultFile = 'http://fgx.github.io/sandbox/flightpaths/ygil/elevations_Gilgandra_12_3738_2427_3_3_150_150_.txt'; // why need to zoom out to see?

	var cameraPosition = 0.3; // need position that adjust by algorithm - allowing for zoom level etc

	var scaleFactor = 0.1;

	var parameters;
	var elevations;
	var min, max; // keep in ground object?

	var ground, groundGeometry, groundMaterial, groundBoxHelper;

	var mapTypes = [

		['Google Maps','https://mt1.google.com/vt/x='],
		['Google Maps Terrain','https://mt1.google.com/vt/lyrs=t&x='],
		['Google Maps Satellite','https://mt1.google.com/vt/lyrs=s&x='],
		['Google Maps Hybrid','https://mt1.google.com/vt/lyrs=y&x='],
		['Open Street Map','http://tile.openstreetmap.org/'],
		['Open Cycle Map', 'http://tile.opencyclemap.org/cycle/'],
		['MapQuest OSM', 'http://otile3.mqcdn.com/tiles/1.0.0/osm/'],
		['MapQuest Satellite', 'http://otile3.mqcdn.com/tiles/1.0.0/sat/'],
		['Stamen terrain background','http://tile.stamen.com/terrain-background/'],
		['Mesh Normal Material', '']

	];

	var placeMapCanvas, placeMapContext;

	var pixelsPerTile = 256;
	var tilesTotal;
	var updateCamera = true;

	var b = '<br>';
	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

// gather the data

	function openFile( files ) {

		var reader, data, fileName;

		setMenuDetailsSettings();

		reader = new FileReader();
		reader.onloadend = function( event ) {

			data = reader.result;

			elevations = data.split( ',' ).map( parseFloat );

			fileName = files.files[ 0 ].name;

			getParametersFileName( fileName );

		}

		reader.readAsText( files.files[ 0 ] );

	}

	function getFileElevations( fileName ) {

		var xhr, response;

		fileName = fileName || defaultFile;

		setMenuDetailsSettings();

		xhr = new XMLHttpRequest();
		xhr.open( 'GET', fileName, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			response = xhr.responseText;
			elevations = response.split( ',' ).map( function( item ) { return parseFloat( item ); } );

			getParametersFileName( fileName );

		}

	}

// When in iframe and called by parent
	function processElevations( elevs, params ) {

			elevations = elevs;
			parameters = params;
console.log( 'parameters', parameters );
			setMenuDetailsFileName();

			getParametersOverlay();

			initElevations();

	}


	function processElevationsFileNames( elevs, fName ) {

			elevations = elevs;
			parameters = getParametersFileName( fName );

console.log( 'parameters', parameters );

			setMenuDetailsFileName();

			getParametersOverlay();

			initElevations();

	}

// utilities to help while gathering data

	function setMenuDetailsSettings() {

		menuDetailsSettings.innerHTML =

			'<details open >' +

				'<summary><h3>display settings</h3></summary>' +

				'<p><a href="../elevations-get/index.html" >Elevations Get</a></p>' +

				'<p><input type=file id=inpFile onchange=openFile(this); /></p>' +

				'<p>Map overlay<br><select id=selMap onchange=drawMapOverlay(); size=5 /></select></p>' +

				'<p>Map zoom level<br><select id=selMapZoom onchange=drawMapOverlay(); size=1 /></select></p>' +

				'<p>Vertical scale: <output id=outVertical >value</output>' +
					'<input type=range id=inpVertical max=0.01 min=0.000001 step=0.000001 value=0.015 oninput=setGroundGeometry();drawMapOverlay(); title="" style=width:100%; >' +
				'</p>' +

				'<p><input type=checkbox onchange=ground.material.wireframe=!ground.material.wireframe; > Wireframe</p>' +

			'</details>' +

		'';

		for ( var i = 0; i < mapTypes.length; i++ ) {

			selMap.appendChild( document.createElement( 'option' ) );
			selMap.children[ i ].text = mapTypes[ i ][ 0 ];

		}

		selMap.selectedIndex = 2;

		for ( var i = 12; i < 16; i++ ) {

			selMapZoom.appendChild( document.createElement( 'option' ) );
			selMapZoom.children[ i - 12 ].text = i;

		}

		selMapZoom.selectedIndex = 1;

	}


	function getParametersFileName( fileName ) {

		var parametersArray, delta;

		parametersArray = fileName.split( '_' );

		parameters = {

			location: parametersArray[ 1 ],
			zoom: parseInt( parametersArray[ 2 ], 10 ),
			ULtileX: parseInt( parametersArray[ 3 ], 10 ),
			ULtileY: parseInt( parametersArray[ 4 ], 10 ),
			tilesX: parseInt( parametersArray[ 5 ], 10 ),
			tilesY: parseInt( parametersArray[ 6 ], 10 ),
			segmentsX: parseInt( parametersArray[ 7 ], 10 ),
			segmentsY: parseInt( parametersArray[ 8 ], 10 ),
			fileName: fileName

		};

//		} else {

//			parameters = undefined;

//		}

		getParametersOverlay();

		setMenuDetailsFileName();

		initElevations();

	}

	function setMenuDetailsFileName() {

		menuDetailsFileName.innerHTML =

			'<details open>' +

				'<summary><h3>file name parameters</h3></summary>' +

				'Location:<br>' + parameters.location + b + b +

				'Zoom level: ' + parameters.zoom + b + b +

				'Samples X: ' + parameters.segmentsX + b +
				'Samples Y: ' + parameters.segmentsY + b + b +

				'UL tile X: ' + parameters.ULtileX + b +
				'UL tile Y: ' + parameters.ULtileY + b + b +

				'Tiles X: ' + parameters.tilesX + b +
				'Tiles Y: ' + parameters.tilesY + b + b +

			'</details>' +
		b;

	}


// start second stage of processing

	function getParametersOverlay() {

		var delta;

		delta = selMapZoom.selectedIndex;

		parameters.zoomOverlay = delta + parameters.zoom;
		parameters.ULtileXOverlay = Math.pow( 2, delta ) * parameters.ULtileX;
		parameters.ULtileYOverlay = Math.pow( 2, delta ) * parameters.ULtileY;
		parameters.tilesXOverlay = Math.pow( 2, delta ) * parameters.tilesX;
		parameters.tilesYOverlay = Math.pow( 2, delta ) * parameters.tilesY;

		placeMapCanvas = document.createElement( 'canvas' );
		placeMapContext = placeMapCanvas.getContext( '2d' );

		placeMapCanvas.width = pixelsPerTile * parameters.tilesXOverlay;
		placeMapCanvas.height = pixelsPerTile * parameters.tilesYOverlay;
		tilesTotal = parameters.tilesXOverlay * parameters.tilesYOverlay;

		menuDetailsOverlay.innerHTML =

			'<details open>' +

				'<summary><h3>overlay details</h3></summary>' +

				'Zoom level: ' + parameters.zoomOverlay + b + b +

				'UL tile X: ' + parameters.ULtileXOverlay + b +
				'UL tile Y: ' + parameters.ULtileYOverlay + b + b +

				'Tiles X: ' + parameters.tilesXOverlay + b +
				'Tiles Y: ' + parameters.tilesYOverlay + b + b +

			'</details>' +

		b;

	}

	function initElevations() {

// http://stackoverflow.com/questions/1669190/javascript-min-max-array-values

		min = arrayMin( elevations );
		max = arrayMax( elevations );

		scale = scaleFactor / ( max - min );

		inpVertical.value = scale;
		inpVertical.max = 3 * scale;

		ULlat = tile2lat( parameters.ULtileY, parameters.zoom );
		ULlon = tile2lon( parameters.ULtileX, parameters.zoom );

		LRlat = tile2lat( parameters.ULtileY + parameters.tilesY, parameters.zoom );
		LRlon = tile2lon( parameters.ULtileX + parameters.tilesX, parameters.zoom );

		deltaLat = ULlat - LRlat;
		deltaLon = LRlon - ULlon;

		deltaLatTile = deltaLat / parameters.tilesY;

		cenLat = LRlat + 0.5 * ( ULlat - LRlat );
		cenLon = ULlon + 0.5 * ( LRlon - ULlon );

		setGroundGeometry();
		drawMapOverlay( true );

		menuDetailsElevations.innerHTML =

			'<details open>' +

				'<summary><h3>elevations file details</h3></summary>' +

				'Number of data points: ' + elevations.length.toLocaleString() + b + b +

				'Elevation maximum: ' + Math.round( max ).toLocaleString() + 'm' + b +
				'Elevation minimum: ' + Math.round( min ).toLocaleString() + 'm' +b + b +

				'Scale: ' + scale.toFixed( 6 ) + b + b +

				'Delta latitude : ' + deltaLat.toFixed( 4 ) + '&deg;' + b +
				'Delta latitude/tile : ' + deltaLatTile.toFixed( 4 ) + '&deg;' + b +
				'Delta longitude: ' + deltaLon.toFixed( 4 ) + '&deg;' + b + b +

				'Center latitude : ' + cenLat.toFixed( 4 ) + '&deg;' + b +
				'Center longitude: ' + cenLon.toFixed( 4 ) + '&deg;' + b +

			'</details>' +

		b;

	}

	function setGroundGeometry() {

		var vertices;

		groundGeometry = new THREE.PlaneBufferGeometry( deltaLatTile * parameters.tilesX, deltaLatTile * parameters.tilesY, parameters.segmentsX - 1, parameters.segmentsY - 1 );

		vertices = groundGeometry.attributes.position.array;

		for ( var i = 2, j = 0; i < vertices.length; i += 3, j++ ) {

			vertices[ i ] = elevations[ j ];

		}

		groundGeometry.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, inpVertical.valueAsNumber ) );

		groundGeometry.computeFaceNormals();
		groundGeometry.computeVertexNormals();
//		groundGeometry.computeBoundingBox();
//		groundGeometry.computeBoundingSphere();
//		groundGeometry.center();

		outVertical.value = inpVertical.valueAsNumber.toFixed( 6 );

	}


// Good to go. Send to the screen

	function drawMapOverlay( updateCamera ) {

		var baseURL, count;
		var texture;

		if ( selMap.selectedIndex > 8 ) { 

			groundMaterial = new THREE.MeshNormalMaterial( { side: 2 } );

			drawGround( updateCamera );

			return; 

		}

		getParametersOverlay();

		baseURL = mapTypes[ selMap.selectedIndex ][ 1 ];
		count = 0;

		for ( var x = parameters.ULtileXOverlay; x < parameters.ULtileXOverlay + parameters.tilesXOverlay; x++ ) {

			for ( var y = parameters.ULtileYOverlay; y < parameters.ULtileYOverlay + parameters.tilesYOverlay; y++ ) {

				if ( selMap.selectedIndex < 4 ) {

					loadImage( x + '&y=' + y + '&z=' + parameters.zoomOverlay, x - parameters.ULtileXOverlay, y - parameters.ULtileYOverlay );

				} else {

					loadImage( parameters.zoom + '/' + x + '/' + y + '.png', x - parameters.ULtileXOverlay , y - parameters.ULtileYOverlay );

				}

			}

		}

		texture = new THREE.Texture( placeMapCanvas );
		texture.minFilter = texture.magFilter = THREE.NearestFilter;
		texture.needsUpdate = true;

			function loadImage( fName, x, y ) {

				var img;

				img = document.createElement( 'img' );
				img.crossOrigin = 'anonymous';
				img.src = baseURL + fName;

				img.onload = function(){

					placeMapContext.drawImage( img, 0, 0, 256, 256, x * pixelsPerTile, y * pixelsPerTile, pixelsPerTile, pixelsPerTile );

					count++;

					if ( count === tilesTotal ) {

						groundMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture, side: 2 } );

						drawGround( updateCamera );

					}

				}

			}

	}

	function drawGround( updateCamera ) {

		scene.remove( ground );
		ground = new THREE.Mesh( groundGeometry, groundMaterial );
		ground.position.set( cenLon, cenLat, 0 );
		scene.add( ground );

		scene.remove( groundBoxHelper );
		groundBoxHelper = new THREE.BoxHelper( ground, 0xff0000 );
		scene.add( groundBoxHelper );

		geometry = new THREE.PlaneBufferGeometry( 1, 1 );
//		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -1.5707 ) );
//		material = new THREE.MeshBasicMaterial( { color: 0x223322, specular: 0x222222, shininess: 0.5, side: 2 } );
		material = new THREE.MeshBasicMaterial( { color: 0x223322, side: 2 } );

		plain = new THREE.Mesh( geometry, material );
		plain.position.set( cenLon, cenLat, 0 );
		scene.add( plain );


		if ( updateCamera === true ) setCamera();

console.timeEnd( 'timer0' );

	}


// coding utilities

// http://stackoverflow.com/questions/1669190/javascript-min-max-array-values

	function arrayMin( arr ) {

		var len = arr.length, min = Infinity;

		while ( len-- ) {

			if ( arr[ len ] < min) { min = arr[ len ]; }

		}

		return min;

	}

	function arrayMax( arr ) {

		var len = arr.length, max = -Infinity;

		while ( len-- ) {

			if (arr[len] > max) { max = arr[len]; }

		}

		return max;

	}


// TMS
// Source http://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#ECMAScript_.28JavaScript.2FActionScript.2C_etc..29

	function lon2tile( lon, zoom ) {

		return Math.floor( ( lon + 180 ) / 360 * Math.pow( 2, zoom ) );

	}

	function lat2tile( lat, zoom ) {

		var pi = Math.PI;
		return Math.floor(( 1 - Math.log( Math.tan( lat * pi / 180) + 1 / Math.cos( lat * pi / 180)) / pi )/2 * Math.pow(2, zoom) );

	}

	function tile2lon( x, zoom ) {

		return ( x / Math.pow( 2, zoom ) * 360 - 180 );

	}

	function tile2lat( y, zoom ) {

		var pi = Math.PI;
		var n = pi - 2 * pi * y / Math.pow( 2, zoom );
		return 180 / pi * Math.atan( 0.5 * ( Math.exp( n ) - Math.exp( -n ) ));

	}

// Three.js

	function setCamera() {

		controls.target.copy( ground.position );
		camera.position.copy( ground.position ).add( v( 0, -cameraPosition, cameraPosition ) );

	}