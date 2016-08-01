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
	map.verticalscale = 0.1;

	var b = '<br>';
	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	var backgroundColor = 0x7ec0ee ;


	function initUI() {

		setMenuDetailsAPIKey();

		setMenuDetailsSelectFile();

		setMenuDetailsOverlay();

		setMenuDetailsTerrain();

		getGitHubAPITreeContents( getFileElevations );

		toggleFog();

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
			'<p>' + //Elevations:<br>' +
				'<select id=selFiles onchange=getFileElevations(this.value); size=12 style=width:100%;  ></select>' +
			'</p>' +
			'<p><input type=file id=inpFile onchange=openFileReader(this); /></p>' +

			'<details>' +

				'<summary><h4>file name parameters</h4></summary>' +

				'<div id=menuDetailsFileNameParameters >cccc</div>' +

			'</details>' + b;

		'</details>' + b;

	}

	function setMenuDetailsOverlay() {

		menuDetailsOverlay.innerHTML =

			'<details open >' +
				'<summary><h3>Overlay settings</h3></summary>' +
				'<small>Adjust 2D bitmaps</small>' +

				'<p>Map overlay<br><select id=selMap onchange=drawMapOverlay(); size=5 /></select></p>' +

				'<p>Map zoom level<br><select id=selMapZoom onchange=drawMapOverlay(); size=1 /></select></p>' +

				'<details>' +

					'<summary><h4>overlay parameters</h4></summary>' +
					'<div id=menuDetailsOverlayParameters ></div>' +

				'</details>' +

			'</details>' + b

		'';


		for ( i = 0; i < mapTypes.length; i++ ) {

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

	function setMenuDetailsTerrain() {

		menuDetailsTerrain.innerHTML = 

			'<details open >' +
				'<summary><h3>Terrain settings</h3></summary>' +
				'<small>Adjust 3D terrain</small>' +

				'<p>Vertical scale: <output id=outVertical >value</output>' +
					'<input type=range id=inpVertical max=0.0002 min=0.000001 step=0.000001 value=0.0001 oninput=updateTerrain() title="" style=width:100%; >' +
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


// gather the data file open dialog

	function openFileReader( files ) { 

		var reader, data, fileName;

//		setMenuDetailsSettings();

		reader = new FileReader();
		reader.onloadend = function( event ) {

			data = reader.result;

			map.elevations = data.split( ',' ).map( parseFloat );

			fileName = files.files[ 0 ].name;

			getParametersFileName( fileName );

			initElevations();

		};

		reader.readAsText( files.files[ 0 ] );

	}

// 
	function getFileElevations( fName ) {

		var xhr, response;


		fileName = fName || defaultFile; // ( urlBase + selFiles.value );


//debugger;
		xhr = new XMLHttpRequest();
		xhr.open( 'GET', fileName, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			response = xhr.responseText;
			elevations = response.split( ',' )
			item = elevations.shift();
			map.elevationsFileParameters = JSON.parse( item );
			map.elevations = elevations.map( function( item ) { return parseFloat( item ); } );

console.log( 'params', map.elevationsFileParameters, fileName );

			getParametersFileName( fileName );

			initElevations();

		}

	}

// When in iframe and called by parent

	function processElevations( elevs, params ) {

			map.elevations = elevs;
			map.parameters = params;

//console.log( 'map.parameters', map.parameters );

			setMenuDetailsFileName();

			setMenuDetailsSettings();

			getParametersOverlay();

			initElevations();

//			setBackground();

	}

// when in iframe and called by viewer or app without access to data

	function processElevationsFileName( elevs, fName ) {

			map.elevations = elevs;

			getParametersFileName( fName );

			setMenuDetailsFileName();

			getParametersOverlay();

			initElevations();

	}



// utilities to help while gathering data

	function getParametersFileName( fName ) {

		var parametersArray, delta;

		parametersArray = fName.split( '_' );

		map.parameters = {

			location: parametersArray[ 1 ],
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

			'Location:<br>' + map.parameters.location + b + b +

			'Zoom level: ' + map.parameters.zoom + b + b +

			'Samples X: ' + map.parameters.segmentsX + b +
			'Samples Y: ' + map.parameters.segmentsY + b + b +

			'UL tile X: ' + map.parameters.ULtileX + b +
			'UL tile Y: ' + map.parameters.ULtileY + b + b +

			'Tiles X: ' + map.parameters.tilesX + b +
			'Tiles Y: ' + map.parameters.tilesY + b +

		'';

	}



// start second stage of processing

	function initElevations() {

// http://stackoverflow.com/questions/1669190/javascript-min-max-array-values

		map.mesh = new THREE.Object3D();
		map.min = arrayMin( map.elevations );
		map.max = arrayMax( map.elevations );

		scale = map.verticalscale / ( map.max - map.min );

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

		setMapGeometry();
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

	function setMapGeometry() {

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
		var texture;

		if ( selMap.selectedIndex > 8 ) {

			map.material = new THREE.MeshNormalMaterial( { side: 2 } );

			drawMap( updateCamera );

			return;

		}

		getParametersOverlay();

		baseURL = mapTypes[ selMap.selectedIndex ][ 1 ];
		count = 0;

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

		var tilesTotal = map.parameters.tilesXOverlay * map.parameters.tilesYOverlay;


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

						drawMap( map.updateCamera );

					}

				};

			}

	}

	function getParametersOverlay() {

		var delta;

		delta = selMapZoom ? selMapZoom.selectedIndex : 1;

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


// GitHub API

	function getGitHubAPITreeContents( callback2 ) {

		var xhr, response, files, file, element;

		xhr = new XMLHttpRequest();
		xhr.open( 'GET', urlAPITreeContents, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			response = JSON.parse( xhr.response );
			files = [];

			for ( var i = 0; i < response.tree.length; i++ ) {

				file = response.tree[ i ].path;

				if ( file.indexOf( searchInFolder ) === -1 || file.slice( -4 ) !== '.txt' ) { continue; }

				file = file.slice( file.lastIndexOf( '\/' ) + 1 );
				files.push( file );

				selFiles[ selFiles.length ] = new Option( file, file );

			}

			selFiles.selectedIndex = Math.floor( Math.random() * selFiles.length );

			callback2();

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

// Three.js


	function updateTerrain() {


		setMapGeometry();
		drawMapOverlay();

	}

	function drawMap( updateCamera ) {

		scene.remove( map.mesh );
		map.mesh = new THREE.Mesh( map.geometry, map.material );
		map.mesh.position.set( cenLon, cenLat, 0 );
		scene.add( map.mesh );

		scene.remove( map.boxHelper );
		map.boxHelper = new THREE.BoxHelper( map.mesh, 0xff0000 );
		scene.add( map.boxHelper );

		geometry = new THREE.PlaneBufferGeometry( 1, 1 );
//		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -1.5707 ) );
//		material = new THREE.MeshBasicMaterial( { color: 0x223322, specular: 0x222222, shininess: 0.5, side: 2 } );
		material = new THREE.MeshBasicMaterial( { color: 0x223322, side: 2 } );

		scene.remove( map.plain );
		map.plain = new THREE.Mesh( geometry, material );
		map.plain.position.set( cenLon, cenLat, 0 ); // sea level
		scene.add( map.plain );

//		if ( updateCamera === true ) 

		setCamera();

console.timeEnd( 'timer0' );

	}



	function setCamera() {

		map.radius = map.boxHelper.geometry.boundingSphere.radius;

		var cameraPosition = 1.2 * map.radius;

		controls.target.copy( map.boxHelper.geometry.boundingSphere.center );
		controls.maxDistance = 3 * map.radius;

		camera.position.copy( map.boxHelper.geometry.boundingSphere.center ).add( v( 0, -cameraPosition, cameraPosition ) );

/*
		for ( thing in map.elevationsFileParameters ) {

console.log( 'thing', thing );
tt = thing;

			this[ thing ] =  map.elevationsFileParameters[ thing ];



		}
*/

tt = "scene.fog.far";

var values = window;
var name = tt.valueOf().split('.');

for ( var i=0; i < name.length; i++) { values = values[ name[ i ] ] };


console.log( 'values ', values );

	}

	function toggleFog() {

		if ( chkFog.checked === true ) {

			scene.fog = new THREE.Fog( 0x7ec0ee, 0.05, 1 );

		} else {

			scene.fog.far = 0 ;

		}

	}