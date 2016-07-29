
	var org = 'jaanga';
	var tagLine ='your 3D happy place';
	var logo = '&#x2766';
	var response;

	var home = org + '.github.io';
	var urlAPIContents = 'https://api.github.com/repos/' + org + '/' + org + '.github.io/git/trees/master?recursive=1';

	var indexHome = location.href.indexOf( '.io/' ) + 4;

	var baseURL = location.href.slice( 0, indexHome);

//console.log( 'baseURL',baseURL );

	var dirs = location.href.slice( indexHome ).split( '/' );

	var fileName = dirs.pop();

//console.log( 'fileName', fileName );

	index = dirs.indexOf( home.toLowerCase() ) + 1;

	var foldersArray = [ dirs[ 0 ] ];

	var folders = dirs[ 0 ];

//console.log( 'folder', folders );

	var searchForFile = baseURL + folders + '/readme.md';
	var searchInFolder = folders;

	var files;

	var converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });

	init();

	function init() {

		var css, menu;

		css = document.body.appendChild( document.createElement( 'style' ) );
		css.innerHTML =

			'html, body { font: 12pt monospace; height: 100%; margin: 0; }' +
			'h2 { display: inline; }' +
			'h2 a { color: crimson; }' +
			'a { text-decoration: none; }' +
			'button, input[type=button] { background-color: #eee; border: 2px #eee solid; color: #888; }' +

			'iframe { border: 1px solid red; height: 100%; overflow: hidden; width: 100%; }' +

			'#menu { box-sizing: border-box; background-color: #ccc; height: 100%; padding: 0 10px; overflow: auto; position: fixed;  width: 300px; }' +
			'#contents { border: 0px red solid; height: 100%; left: 350px; overflow: hidden; position: absolute; top: 0; width: ' + ( window.innerWidth - 370 ) + 'px; }' +

		'';

		menu = document.body.appendChild( document.createElement( 'div' ) );
		menu.id = 'menu';
		menu.innerHTML =

			'<h2>' +

				'<a href=http://' + org + '.github.io title="' + org + ' - ' + tagLine + '" >' + logo + '</a> ' +

//				'<a href=index.html#readme.md title="Click here for help and information" > &#x24D8; </a>' +

			'</h2>' +

			'<span id=menuBreadCrumbs ></span>' +

			'<span id=menuContents ></span>' +

			'<p id=menuFooter ></p>' +

			'<details >' +
				'<summary><h3 style=display:inline; >About</h3></summary>' +
				'<p>Copyright &copy; 2016 ' + org + ' authors. <a href=https://' + org + '.github.io/license.md >MIT license</a>.</p>' +
//				'<p>Click the \'i in a circle\' icon for more <a href=index.html#readme.md title="Click here for help and information" >help</a>.</p>' +
				'<p></p>' +
			'</details>' +

			'<hr><center><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; title="' + org + ' - ' + tagLine + '" ><h1>' + logo + '<h1></a></center>' +

		'';

		contents = document.body.appendChild( document.createElement( 'div' ) );
		contents.id = 'contents';

		window.addEventListener ( 'hashchange', hashChange, false );

		requestAPIContents();

//		setBreadCrumbs();

//		hashChange();

	}


	function setBreadCrumbs() {

		txt = '';

		for ( var i = 0; i < foldersArray.length - 1; i++ ) {

			txt += '<a href=JavaScript:getFiles(' + i + '); >' + foldersArray[ i ].replace( /-/g, ' ' ) + '</a> &raquo ';

		}

		txt += '<h3><a href=# >' + foldersArray[ i ].replace( /-/g, ' ' ) + '</a></h3>';

		menuBreadCrumbs.innerHTML = txt;

	}

	function requestAPIContents() {

		var xhr, file;

		xhr = new XMLHttpRequest();
		xhr.open( 'GET', urlAPIContents, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			response = JSON.parse( xhr.response );

			getFiles( 1 );

		}

	}

	function getFiles( index ) {

		foldersArray = foldersArray.slice( 0, index + 1);

		folder = foldersArray.join( '/' );

// console.log( 'folder:', folder );

		files = [];

		for ( var i = 0; i < response.tree.length; i++ ) {

			file = response.tree[ i ].path;

			if ( !file.match( folder ) || file === folder ) { continue; }

			if ( file.split( '/' ).length > foldersArray.length + 1 ) { continue; }

			if ( file.match( 'archive' ) ) { continue; }

			if ( file.match( 'index.html' ) || file.endsWith( '.htm' )  ) { continue; }

			files.push( file );

//console.log( 'folder:', folder, '\nfile:', file );

		}

//console.log( 'files', files );

		setBreadCrumbs();

		createTableOfContents();

	}

	function createTableOfContents( ) {

		var txt =  '';

		string = foldersArray.join( '/' ) + '/';

		for ( var i = 0; i < files.length; i++ ) {

//			file = files[ i ];
//			txt += '<p><a href=JavaScript:getItem(' + i + '); >' + file.replace( string, '' ) + '</a></p>';

			file = files[ i ].split( '/' ).pop() ;

			txt += '<p><a href=JavaScript:getItem(' + i + '); >' + file + '</a></p>';

// console.log( 'file', file, string );

			if ( file.endsWith( '.md' ) ) {  

console.log( 'fffile',  file );

getMarkdown( './' + foldersArray.slice( 1 ).join( '/' ) + '/' + file  , contents ); }

		}

		menuContents.innerHTML = txt;

	}

	function hashChange() {

		var fileName;

		fileName = location.hash ? location.hash.slice( 1 ) : searchForFile;

		getMarkdown( fileName, contents );

	}

	function getItem( index ) {

		item = files[ index ];

//console.log( 'item', item );

		if ( item.endsWith( '.md' ) ) {

			getMarkdown( baseURL + item, contents );

		} else if ( item.endsWith( '.html' ) || item.endsWith( '.js' ) ) {

			contents.innerHTML = '<iframe src=' + baseURL + item + ' ></iframe>';
//			contents.style.overflow = 'hidden';

		} else {

			foldersArray = item.split( '/' );

			getFiles( foldersArray.length );

		}

	}

	function getMarkdown( fName, target ) {

		var xhr;

		xhr = new XMLHttpRequest();
		xhr.open( 'GET', fName, true );
		xhr.onload = function() {

			target.innerHTML = converter.makeHtml( xhr.responseText );
			target.style.overflow = 'auto';

		};

		xhr.send( null );

	}