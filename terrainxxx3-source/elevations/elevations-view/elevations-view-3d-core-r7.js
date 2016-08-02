// 2016-07-24 ~ 16: 49


//	var defaultFile = '../elevations-data-02/elevations_Tenzing-Hillary Airport, Lukla, Eastern Region, Nepal_12_3033_1718_3_4_150_200_.txt';
	var defaultFile = 'elevations_Tenzing-Hillary Airport, Lukla, Eastern Region, Nepal_12_3033_1718_3_4_510_680_.txt';

	var defaultFiles = [

		'http://fgx.github.io/sandbox/flightpaths/vnlk/elevations_Tenzing-Hillary Airport, Lukla, Eastern Region, Nepal_12_3033_1718_3_4_150_200_.txt',
		'http://fgx.github.io/sandbox/flightpaths/kgcn/elevations_Tusayan_12_770_1605_4_5_120_150_.txt',
		'http://fgx.github.io/sandbox/flightpaths/leig/elevations_Igualada_12_2065_1525_3_3_60_60_.txt',
		'http://fgx.github.io/sandbox/flightpaths/vhsk/elevations_Hong%20Kong_14_13381_7141_5_4_150_120_.txt',
		'http://fgx.github.io/sandbox/flightpaths/ygil/elevations_Gilgandra_12_3738_2427_3_3_150_150_.txt'

	];

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

	var urlAPITreeContents = 'https://api.github.com/repos/jaanga/jaanga.github.io/git/trees/master?recursive=1';

//	var urlBase = 'https://jaanga.github.io/terrain3/google-api/elevations-data-02/';
	var urlBase = '../elevations-data-02/';

	var searchInFolder = 'elevations-data-02/';

	var core = '../elevations-view-3d-core/index.html#';

	var map = {};

	map.updateCamera = true; // is this needed?

	map.pixelsPerTile = 256;

	map.verticalScaleDefault = 0.1;
	map.plainOpacityDefault = 1;

	var b = '<br>';
	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	var backgroundColor = 0x7ec0ee ;


	function initMenu() {

		setMenuDetailsAPIKey();

		setMenuDetailsSelectFile();

		setMenuDetailsOverlay();

		setMenuDetailsTerrain();

// default action here

		getGitHubAPITreeContents( onLoad );

		toggleFog();


		function onLoad() {

			if ( map.elevations === undefined ) {

				file = urlBase + selFiles.value;

				getElevationsFileXHR( file );

			}

		}

	}

// inits

	function setMenuDetailsAPIKey() {

		menuDetailsAPIKey.innerHTML =

			'<details>' +
				'<summary><h3>api key</h3></summary>' +
				'<small>If small request, no need for API key</small>' +
				'<p>api key: <input id=inpAPI onclick=this.select(); title="Obtain API key from Google Maps" ></p>' +
				'<p><button onclick=setAPIkey(); >Set API key</button></p>' +
			'</details>' + b;

	}

	function setMenuDetailsSelectFile() {

		menuDetailsSelectFile.innerHTML = 

		'<details open >' +
			'<summary><h3>Select file to view</h3></summary>' +
			'<small>Select or open a file to view in 3D</small>' +
			'<p>' +
				'<select id=selFiles onchange=file=urlBase+this.value;getElevationsFileXHR(file); size=12 style=width:100%;  ></select>' +
			'</p>' +
			'<p><input type=file id=inpFile onchange=getElevationsFileReader(this); /></p>' +

			'<details>' +

				'<summary><h4>file name parameters</h4></summary>' +

				'<div id=menuDetailsFileNameParameters >cccc</div>' +

			'</details>' + b +

		'</details>' + b;

	}

	function setMenuDetailsOverlay() {

		menuDetailsOverlay.innerHTML =

			'<details open >' +
				'<summary><h3>Overlay settings</h3></summary>' +
				'<small>Adjust 2D bitmaps</small>' +

				'<p>Map overlay<br><select id=selMap onchange=drawMapOverlay(); size=5 /></select></p>' +

				'<p>Map overlay zoom level<br><select id=selMapZoom onchange=drawMapOverlay(); size=1 /></select></p>' +

				'<details>' +

					'<summary><h4>overlay parameters</h4></summary>' +
					'<div id=menuDetailsOverlayParameters ></div>' +

				'</details>' +

			'</details>' + b +

		'';


		for ( i = 0; i < mapTypes.length; i++ ) {

			selMap.appendChild( document.createElement( 'option' ) );
			selMap.children[ i ].text = mapTypes[ i ][ 0 ];

		}

		selMap.selectedIndex = 2;

		for ( var i = 0; i < 4; i++ ) {

			selMapZoom.appendChild( document.createElement( 'option' ) );
			selMapZoom.children[ i ].text = i;

		}

		selMapZoom.selectedIndex = 1;

	}

	function setMenuDetailsTerrain() {

		menuDetailsTerrain.innerHTML = 

			'<details open >' +
				'<summary><h3>Terrain settings</h3></summary>' +
				'<small>Adjust 3D terrain</small>' +

				'<p>Vertical scale: <output id=outVertical >value</output>' +
					'<input type=range id=inpVertical max=0.0002 min=0.000001 step=0.000001 value=0.0001 oninput=updateTerrain() title="" style=width:100%; >' +
//					'<input type=range id=inpVertical max=0.0002 min=0.000001 step=0.000001 value=0.0001 oninput=initElevations() title="" style=width:100%; >' +


				'</p>' +

				'<p>' +

					'<input type=checkbox onchange=map.material.wireframe=!map.material.wireframe; > Wireframe' + b +

					'<input type=checkbox onchange=map.plain.visible=!map.plain.visible; checked > Sea level' + b +

					'<input type=checkbox onchange=map.boxHelper.visible=!map.boxHelper.visible; checked > Box helper' + b +

					'<input type=checkbox id=chkFog onchange=toggleFog(); checked > Fog' +

				'</p>' +

				'<details>' +

					'<summary><h4>terrain parameters</h4></summary>' +
					'<div id=menuDetailsTerrainParameters ></div>' +

				'</details>' + b +

			'</details>' +

		'';

	}



// Gather data when using the default

	function getElevationsFileXHR( fName ) {

		var xhr, response;

		map.verticalScale = map.verticalScaleDefault;
		map.plainOpacity = map.plainOpacityDefault;

		xhr = new XMLHttpRequest();
		xhr.open( 'GET', fName, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			scene = new THREE.Scene();

			toggleFog();

			response = xhr.responseText;

// process extra data

			if ( response.match( '{' ) ) {

				values = window;

				itemsString = response.slice( 0, response.indexOf( '}' ) + 1 );

				map.items = JSON.parse( itemsString );

				updateSettings();

				response = response.replace( itemsString, '' );

				elevations = response.split( ',' ).slice( 1 );

			} else {

				map.items = '';

				elevations = response.split( ',' );

			}

			map.elevations = elevations.map( function( item ) { return parseFloat( item ); } );

			getFileNameParameters( fName );

			initElevations();

		}

	}

// gather the data using file open dialog

	function getElevationsFileReader( files ) { 

		var reader, data, fileName;

		map.verticalScale = map.verticalScaleDefault;
		map.plainOpacity = map.plainOpacityDefault;

		reader = new FileReader();
		reader.onloadend = function( event ) {

			data = reader.result;

			map.elevations = data.split( ',' ).map( parseFloat );

			fileName = files.files[ 0 ].name;

			getFileNameParameters( fileName );

			initElevations();

		};

		reader.readAsText( files.files[ 0 ] );

	}

// Gather data when in iframe and called by parent

	function processElevations( elevs, params ) {

			map.elevations = elevs;
			map.parameters = params;

			initElevations();

	}

// Gather data when in iframe and called by viewer or app without access to data

	function processElevationsFileName( elevs, fName ) {

			map.elevations = elevs;

			getFileNameParameters( fName );

			initElevations();

	}



// utilities to help while gathering data

	function getFileNameParameters( fName ) {

		var parametersArray;

		parametersArray = fName.split( '_' );

		map.parameters = {

			origin: parametersArray[ 1 ],
			zoom: parseInt( parametersArray[ 2 ], 10 ),
			ULtileX: parseInt( parametersArray[ 3 ], 10 ),
			ULtileY: parseInt( parametersArray[ 4 ], 10 ),
			tilesX: parseInt( parametersArray[ 5 ], 10 ),
			tilesY: parseInt( parametersArray[ 6 ], 10 ),
			segmentsX: parseInt( parametersArray[ 7 ], 10 ),
			segmentsY: parseInt( parametersArray[ 8 ], 10 ),
			fileName: fName

		};

		setMenuDetailsFileNameParameters();

	}

	function setMenuDetailsFileNameParameters() {

		menuDetailsFileNameParameters.innerHTML =

			'Location:<br>' + map.parameters.origin + b + b +

			'Zoom level: ' + map.parameters.zoom + b + b +

			'Samples X: ' + map.parameters.segmentsX + b +
			'Samples Y: ' + map.parameters.segmentsY + b + b +

			'UL tile X: ' + map.parameters.ULtileX + b +
			'UL tile Y: ' + map.parameters.ULtileY + b + b +

			'Tiles X: ' + map.parameters.tilesX + b +
			'Tiles Y: ' + map.parameters.tilesY + b +

		b;


	}



// start second stage of processing

	function initElevations() {

// http://stackoverflow.com/questions/1669190/javascript-min-max-array-values

		map.mesh = new THREE.Object3D();
		map.min = arrayMin( map.elevations );
		map.max = arrayMax( map.elevations );

		scale = map.verticalScale / ( map.max - map.min );

		inpVertical.value = scale;
		inpVertical.max = 3 * scale;

		ULlat = tile2lat( map.parameters.ULtileY, map.parameters.zoom );
		ULlon = tile2lon( map.parameters.ULtileX, map.parameters.zoom );

		LRlat = tile2lat( map.parameters.ULtileY + map.parameters.tilesY, map.parameters.zoom );
		LRlon = tile2lon( map.parameters.ULtileX + map.parameters.tilesX, map.parameters.zoom );

		deltaLat = ULlat - LRlat;
		deltaLon = LRlon - ULlon;

		deltaLatTile = deltaLat / map.parameters.tilesY;

		cenLat = LRlat + 0.5 * ( ULlat - LRlat );
		cenLon = ULlon + 0.5 * ( LRlon - ULlon );

		initMapGeometry();
		drawMapOverlay( true );

		menuDetailsTerrainParameters.innerHTML =

			'Number of data points: ' + map.elevations.length.toLocaleString() + b + b +

			'Elevation maximum: ' + Math.round( map.max ).toLocaleString() + 'm' + b +
			'Elevation minimum: ' + Math.round( map.min ).toLocaleString() + 'm' +b + b +

			'Scale: ' + scale.toFixed( 6 ) + b + b +

			'Delta latitude : ' + deltaLat.toFixed( 4 ) + '&deg;' + b +
			'Delta latitude/tile : ' + deltaLatTile.toFixed( 4 ) + '&deg;' + b +
			'Delta longitude: ' + deltaLon.toFixed( 4 ) + '&deg;' + b + b +

			'Center latitude : ' + cenLat.toFixed( 4 ) + '&deg;' + b +
			'Center longitude: ' + cenLon.toFixed( 4 ) + '&deg;' + b +

		b;

	}

	function initMapGeometry() {

		var vertices;

		map.geometry = new THREE.PlaneBufferGeometry( deltaLatTile * map.parameters.tilesX, deltaLatTile * map.parameters.tilesY, map.parameters.segmentsX - 1, map.parameters.segmentsY - 1 );

		vertices = map.geometry.attributes.position.array;

		for ( var i = 2, j = 0; j < map.elevations.length; i += 3, j++ ) {

			vertices[ i ] = map.elevations[ j ];

		}

		map.geometry.applyMatrix( new THREE.Matrix4().makeScale( 1, 1, inpVertical.valueAsNumber ) );

		map.geometry.computeFaceNormals();
		map.geometry.computeVertexNormals();

//		map.geometry.computeBoundingBox();
//		map.geometry.computeBoundingSphere();
//		map.geometry.center();

		outVertical.value = inpVertical.valueAsNumber.toFixed( 6 );

		if ( window.self !== window.top && parent.frame ) { 

			parent.ifr = parent.frame.contentWindow; 
			parent.outVertical.value = parent.inpVertical.value = inpVertical.value;
			parent.inpVertical.max = inpVertical.max;

		}

	}


// Good to go. Send to the screen

	function drawMapOverlay( updateCamera ) {

		var baseURL, count;
		var texture, tilesTotal;

		if ( selMap.selectedIndex > 8 ) {

			map.material = new THREE.MeshNormalMaterial( { side: 2 } );

			drawMap( updateCamera );

			return;

		}

		getMapOverlayParameters();

		baseURL = mapTypes[ selMap.selectedIndex ][ 1 ];

		for ( var x = map.parameters.ULtileXOverlay; x < map.parameters.ULtileXOverlay + map.parameters.tilesXOverlay; x++ ) {

			for ( var y = map.parameters.ULtileYOverlay; y < map.parameters.ULtileYOverlay + map.parameters.tilesYOverlay; y++ ) {

				if ( selMap.selectedIndex < 4 ) {

					loadImage( x + '&y=' + y + '&z=' + map.parameters.zoomOverlay, x - map.parameters.ULtileXOverlay, y - map.parameters.ULtileYOverlay );

				} else {

					loadImage( map.parameters.zoom + '/' + x + '/' + y + '.png', x - map.parameters.ULtileXOverlay , y - map.parameters.ULtileYOverlay );

				}

			}

		}

		texture = new THREE.Texture( map.canvas );
		texture.minFilter = texture.magFilter = THREE.NearestFilter;
		texture.needsUpdate = true;

		tilesTotal = map.parameters.tilesXOverlay * map.parameters.tilesYOverlay;
		count = 0;


			function loadImage( fName, x, y ) {

				var img;

				img = document.createElement( 'img' );
				img.crossOrigin = 'anonymous';
				img.src = baseURL + fName;

				img.onload = function(){

					map.context.drawImage( img, 0, 0, 256, 256, x * map.pixelsPerTile, y * map.pixelsPerTile, map.pixelsPerTile, map.pixelsPerTile );

					count++;

					if ( count === tilesTotal ) {

						map.material = new THREE.MeshBasicMaterial( { color: 0xffffff, map: texture, side: 2 } );

						drawMap( updateCamera );

					}

				};

			}

	}

	function getMapOverlayParameters() {

		var delta;

//		selMapZoom.selectedIndex = map.parameters.zoom ;

		delta = selMapZoom ? selMapZoom.selectedIndex: 1;
console.log( 'delta', delta );
		map.parameters.zoomOverlay = delta + map.parameters.zoom;
		map.parameters.ULtileXOverlay = Math.pow( 2, delta ) * map.parameters.ULtileX;
		map.parameters.ULtileYOverlay = Math.pow( 2, delta ) * map.parameters.ULtileY;
		map.parameters.tilesXOverlay = Math.pow( 2, delta ) * map.parameters.tilesX;
		map.parameters.tilesYOverlay = Math.pow( 2, delta ) * map.parameters.tilesY;

		map.canvas = document.createElement( 'canvas' );
		map.context = map.canvas.getContext( '2d' );

		map.canvas.width = map.pixelsPerTile * map.parameters.tilesXOverlay;
		map.canvas.height = map.pixelsPerTile * map.parameters.tilesYOverlay;

		menuDetailsOverlayParameters.innerHTML =

			'Zoom level: ' + map.parameters.zoomOverlay + b + b +

			'UL tile X: ' + map.parameters.ULtileXOverlay + b +
			'UL tile Y: ' + map.parameters.ULtileYOverlay + b + b +

			'Tiles X: ' + map.parameters.tilesXOverlay + b +
			'Tiles Y: ' + map.parameters.tilesYOverlay + b + b +

		b;

	}


// Three.js

	function drawMap( updateCamera ) {

		map.mesh = new THREE.Mesh( map.geometry, map.material );
		map.mesh.name = map.parameters.origin;
		map.mesh.position.set( cenLon, cenLat, 0 );
		scene.add( map.mesh );

		map.boxHelper = new THREE.BoxHelper( map.mesh, 0xff0000 );
		map.boxHelper.name = 'boxHelper';
		scene.add( map.boxHelper );
//		map.boxHelper.visible = false;

		geometry = new THREE.PlaneBufferGeometry( 1, 1 );
//		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -1.5707 ) );
//		material = new THREE.MeshBasicMaterial( { color: 0x223322, specular: 0x222222, shininess: 0.5, side: 2 } );
		material = new THREE.MeshBasicMaterial( { color: 0x223322, opacity: map.plainOpacity, side: 2, transparent: true } );

		map.plain = new THREE.Mesh( geometry, material );
		map.plain.name = 'plain';
		map.plain.position.set( cenLon, cenLat, 0 ); // sea level
		scene.add( map.plain );

		if ( updateCamera === true ) { setCamera(); }

console.timeEnd( 'timer0' );

	}


	function updateSettings() {

		if ( !map.items ) { return; }

		keys = Object.keys( map.items ); 

		for ( var i = 0; i < keys.length; i++ ) {

			items = keys[ i ].split( '.' );

			values = window;

			for ( j = 0; j < items.length - 1; j++ ) {

				values = values[ items[ j ] ];

			}

//console.log( 'params ', j, values[ items[ j ] ], keys[ i ] );

			values[ items[ j ] ] = map.items[ keys[ i ] ];

		}


	}

	function updateTerrain() {

		scene = new THREE.Scene();

		toggleFog();

		updateSettings();

		initMapGeometry();

		drawMapOverlay();

	}

	function setCamera() {

		var cameraPosition;

		map.radius = map.boxHelper.geometry.boundingSphere.radius;

		cameraPosition = 0.7 * map.radius;

		controls.target.copy( map.boxHelper.geometry.boundingSphere.center );
		controls.maxDistance = 3 * map.radius;

		camera.position.copy( map.boxHelper.geometry.boundingSphere.center ).add( v( 0, -cameraPosition, cameraPosition ) );

	}

	function toggleFog() {

		if ( chkFog.checked === true ) {

			scene.fog = new THREE.Fog( 0x7ec0ee, 0.05, 1 );

		} else {

			scene.fog.far = 0 ;

		}

	}


// GitHub API

	function getGitHubAPITreeContents( callback ) {

		var xhr, response, files, file;

		xhr = new XMLHttpRequest();
		xhr.open( 'GET', urlAPITreeContents, true );
		xhr.onload = onLoadGitHubTreeContents;
		xhr.send( null );

		function onLoadGitHubTreeContents() {

			response = JSON.parse( xhr.response );
			files = [];

			for ( var i = 0; i < response.tree.length; i++ ) {

				file = response.tree[ i ].path;

				if ( file.indexOf( searchInFolder ) === -1 || file.slice( -4 ) !== '.txt' ) { continue; }

				file = file.split( '\/' ).pop();

				files.push( file );

				selFiles[ selFiles.length ] = new Option( file, file );

			}

			selFiles.selectedIndex = Math.floor( Math.random() * selFiles.length );

			callback();

		}

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

