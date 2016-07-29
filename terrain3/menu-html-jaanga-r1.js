
	var org = 'jaanga';
	var tagLine ='your 3D happy place';
	var logo = '&#x2766';
	var response;

	var home = org + '.github.io';

	var homePages = 'https://' + home + '/';

	var homeSource = 'https://github.com/jaanga/jaanga.github.io/tree/master/';

	var urlAPIContents = 'https://api.github.com/repos/' + org + '/' + org + '.github.io/git/trees/master?recursive=1';
	var item;

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
			'h2, h3 { display: inline; }' +
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

				'<a href=http://' + org + '.github.io title="' + org + ' - ' + tagLine + '" >' + logo + ' ' + org + '</a> &raquo; ' +

//				'<a href=index.html#readme.md title="Click here for help and information" > &#x24D8; </a>' +

			'</h2>' +

			'<span id=menuBreadCrumbs ></span>' +

			'<span id=menuContents ></span>' +

			'<div id=menuDetailsPageActions ></div>' +

			'<div id=menuDetailsAbout ></div>' +

			'<hr>' +

			'<center><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; title="' + org + ' - ' + tagLine + '" >' +
				'<h1>' + logo + '<h1></a></center>' +

		'';

		setMenuDetailsPageActions();

		setDetailsAbout();

		contents = document.body.appendChild( document.createElement( 'div' ) );
		contents.id = 'contents';

		window.addEventListener ( 'hashchange', hashChange, false );

		requestAPIContents();

	}

	function setMenuDetailsPageActions() {

		menuDetailsPageActions.innerHTML =

			'<details open>' +
				'<summary><h3>page actions</h3></summary>' +
				'<p><a href=JavaScript:window.location.href=homeSource+item; >Open page in GitHub</a></p>' +
//				'<p>Edit page in GitHub</p>' +
//				'<p>Search page in GitHub</p>' +
				'<p><a href=JavaScript:window.location.href=homePages+item; target="_blank" >Open page in new tab</a></p>' +
				'<p><s><input type=checkbox > View all files</s></p>' +
			'</details>' +

		'';

	}

	function sendToGH() {

		window.location.href = homeSource + item; 

	}

	function setDetailsAbout() {

		menuDetailsAbout.innerHTML =

			'<details >' +
				'<summary><h3>about</h3></summary>' +
				'<p>Copyright &copy; 2016 ' + org + ' authors. <a href=https://' + org + '.github.io/license.md >MIT license</a>.</p>' +
//				'<p>Click the \'i in a circle\' icon for more <a href=index.html#readme.md title="Click here for help and information" >help</a>.</p>' +
				'<p></p>' +
			'</details>' +

		'';

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

			file = files[ i ].split( '/' ).pop() ;

// console.log( 'file', file, string );

			if ( file.endsWith( '.md' ) ) {  

				getMarkdown( './' + foldersArray.slice( 1 ).join( '/' ) + '/' + file  , contents );

				item = files[ i ];

			} else {

				txt += '<p><a href=JavaScript:getItem(' + i + '); > ' + file + '</a></p>';

			}

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