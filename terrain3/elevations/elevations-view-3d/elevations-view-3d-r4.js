
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

	var searchInFolder = 'elevations-data-02/';

	var core = '../elevations-view-3d-core/elevations-view-3d-core-r7.html#';
//	var core = '../elevations-view-3d-core/index.html#';


	var urlAPITreeContents = 'https://api.github.com/repos/jaanga/jaanga.github.io/git/trees/master?recursive=1';

//	var urlBase = 'https://jaanga.github.io/terrain3/google-api/elevations-data-02/';
	var urlBase = '../elevations-data-02/';

	var fileName;
	var defaultFileIndex = 1;

	var ifr;

	function getAPITreeContents() {

		var xhr, response, files, file, element;

		setMenuDetailsOpenFile();

		setMenuDetailsOverlay();

		setMenuDetailsTerrain();

		setMenuDetailsBackground();

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

			getElevationsFile();

		}

	}



	function openFile( files ) {

		var reader, data, elevations, fileName;

		reader = new FileReader();
		reader.onloadend = function( event ) {

			data = reader.result;

			elevations = data.split( ',' );

			fileName = files.files[0].name;
 
			frame.contentWindow.processElevationsFileName( elevations, fileName );

			ifr = frame.contentWindow;

		}

		reader.readAsText( files.files[ 0 ] );

	}


	function getElevationsFile () {

			fileName = location.hash ? location.hash.slice( 1 ) : selFiles.value;

			frame.src = core + urlBase + fileName;

	}

	function setMenuDetailsOpenFile() {

		menuDetailsFileOpen.innerHTML = 

			'<details open >' +
				'<summary><h3>elevations files</h3></summary>' +
				'<small>Select or open a file to view in 3D</small>' +
				'<p>Elevations:<br>' +
					'<select id=selFiles onchange=getElevationsFile(this.value); size=12 style=width:100%;  ></select>' +
				'</p>' +
			'<p><input type=file id=inpFile onchange=openFile(this); /></p>' +

			'</details>' +

		'';

	}

	function setMenuDetailsOverlay() {

		menuDetailsOverlay.innerHTML =

			'<details open >' +
				'<summary><h3>overlay details</h3></summary>' +
				'<small>Adjust 2D bitmaps</small>' +

				'<p>Map overlay<br><select id=selMap onchange=drawMapOverlay(); size=5 /></select></p>' +

				'<p>Map zoom level<br><select id=selMapZoom onchange=drawMapOverlay(); size=1 /></select></p>' +

			'</details>' +

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
				'<summary><h3>terrain details</h3></summary>' +
				'<small>Adjust 3D terrain</small>' +

			'<p>Vertical scale: <output id=outVertical >value</output>' +
				'<input type=range id=inpVertical max=0.02 min=0.000001 step=0.000001 value=0.015 oninput=updateTerrain() title="" style=width:100%; >' +
			'</p>' +

			'<p><input type=checkbox onchange=ifr.map.material.wireframe=!ifr.map.material.wireframe; > Wireframe</p>' +

			'<p><input type=checkbox onchange=ifr.map.plain.visible=!ifr.map.plain.visible; > Sea level</p>' +

			'</details>' +

		'';

	}

	function updateTerrain() {

		ifr.inpVertical.value = inpVertical.value;

		ifr.setMapGeometry();
		ifr.drawMapOverlay();

	}

	function setMenuDetailsBackground() {

		menuDetailsBackground.innerHTML =

			'<details open >' +

				'<summary><h3>background settings</h3></summary>' +

				'<p>Fog scale: <output id=outFog >value</output>' +
					'<input type=range id=inpFog max=0.01 min=0.000001 step=0.000001 value=0.015 oninput=setMapGeometry();drawMapOverlay(); title="" style=width:100%; >' +
				'</p>' +


			'</details>' +

		'';

	}