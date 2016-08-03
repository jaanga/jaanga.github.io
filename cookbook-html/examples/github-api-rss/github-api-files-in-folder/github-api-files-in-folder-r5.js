
/*
	var user = 'jaanga';
	var repo = 'jaanga.github.io';
	var branch = 'master';
	var folder = 'cookbook-threejs\/examples\/';

	var tree = 'https://api.github.com/repos/' + user + '/' + repo + '/git/trees/' + branch + '?recursive=1';

	var urlBase = 'http://' + user + '.github.io/';
*/

	var user = 'jaanga';
	var tagLine ='your 3D happy place';
	var logo = '&#x2766';


	var repo = 'terrain3';
	var branch = 'gh-pages';
	var folder = '';

	var tree = 'https://api.github.com/repos/' + user + '/' + repo + '/git/trees/' + branch + '?recursive=1';

	var urlBase = 'https://' + user + '.github.io/' + repo + '/' + folder;

	var homeSource = 'https://github.com/jaanga/terrain3/tree/gh-pages/';

	var response;
	var filesAll, filesSelected;

/*
	init2();

	function init2() {

		var css, contents;
		var css = document.body.appendChild( document.createElement( 'style' ) );
		css.innerHTML =

			'body { font: 12pt monospace; margin: 0 auto; max-width: 800px; }' +
			'a { color: crimson; text-decoration: none; }' +
			'select { width: 300px; }' +

		'';

		contents = document.body.appendChild( document.createElement( 'div' ) );
		contents.id = 'contents';
		contents.innerHTML =

			'<h2>' +
				'<a href="" >' + document.title + '</a>' +
				'<a href=http://jaanga.github.io/cookbook-html/examples/#readme.md > &#x24D8; </a>' +
			'</h2>' +


			'<p>' +
				'<button onclick=getFilesFromFolder("") >terrains</button> ' +
				'<button onclick=getFilesFromFolder("elevations/"); >elevations</button> ' +
				'<button onclick=getFilesFromFolder("globes/"); >globes</button> ' +
				'<button onclick=getFilesFromFolder("google-api/"); >google-api</button> ' +
				'<button onclick=getFilesFromFolder("google-api/path-viewers/"); >google-api/path-viewers</button> ' +
			'</p>' +

			'<div id=menuBreadCrumbs ></div>' +

			'<p>' +
//				'<select id=selFiles size=25 ></select>' +
			'</p>' +

			'<p id=message ></p>' +

			'<div id=menuFolderIndices ></div>' +

			'<hr>' +

			'<div id=items ></div>' +

			'<center title="dingbat" >' +
			'<h1><a href=javascript:menu.scrollTop=0; > ❦ </h1>' +
			'</center>' +
		'';

		getGitHubAPITreeContents( folder )

	}

*/

	var converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });

	init();

	function init() {

		var css, menu;

		css = document.body.appendChild( document.createElement( 'style' ) );
		css.innerHTML =

			'html, body { font: 12pt monospace; height: 100%; margin: 0; }' +

			'a { text-decoration: none; }' +

			'button, input[type=button] { background-color: #eee; border: 2px #eee solid; color: #888; }' +

			'h2 a { color: crimson; }' +
			'iframe { border: 1px solid red; height: 100%; overflow: hidden; width: 100%; }' +

			'summary h2, summary h3 { display: inline; }' +
			'summary { outline: none; }' +

			'#menu { box-sizing: border-box; background-color: #ccc; height: 100%; padding: 0 0 0 10px; overflow: auto; position: fixed; width: 300px; }' +
			'#contents { border: 0px red solid; height: 100%; left: 350px; overflow: hidden; position: absolute; top: 0; width: ' + ( window.innerWidth - 370 ) + 'px; }' +

		'';

		menu = document.body.appendChild( document.createElement( 'div' ) );
		menu.id = 'menu';
		menu.innerHTML =

			'<div id=menuBreadCrumbs ></div>' +

			'<hr>' +

			'<div id=menuFolderIndices ></div>' +

			'<div id=menuContents ></div>' +

			'<hr>' +

			'<div id=menuDetailsPageActions ></div>' +

			'<div id=menuDetailsAbout ></div>' +

			'<hr>' +

			'<center><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; title="' + user + ' - ' + tagLine + '" >' +
				'<h1>' + logo + '<h1></a></center>' +

		'';

		setMenuDetailsPageActions();

		setDetailsAbout();

		contents = document.body.appendChild( document.createElement( 'div' ) );
		contents.id = 'contents';

		window.addEventListener ( 'hashchange', hashChange, false );

		getGitHubAPITreeContents( folder );

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

				'<p id=menuMessages ></p>' +

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
				'<p>Copyright &copy; 2016 ' + user + ' authors. <a href=https://' + user + '.github.io/license.md >MIT license</a>.</p>' +
//				'<p>Click the \'i in a circle\' icon for more <a href=index.html#readme.md title="Click here for help and information" >help</a>.</p>' +
				'<p></p>' +

			'</details>' +

		'';

	}

	function getGitHubAPITreeContents( folder ) {

		var xhr;
		var response;

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous'; 
		xhr.open( 'GET', tree, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			response = JSON.parse( xhr.response );
			filesAll = [];

			for ( var i = 0; i < response.tree.length; i++ ) {

				filesAll.push( response.tree[ i ].path )

			}

			getFilesFromFolder ( folder );

		}

	}


	function getFilesFromFolder( folder ) {

		filesSelected = [];

//console.log( 'gfff', folder );

		if ( folder === '' ) {

			for ( var i = 0; i < filesAll.length; i++ ) {

				path = filesAll[ i ];

				pathArray = path.split( '/' );

				if ( path.match( 'archive' ) ) { continue; }

				if ( pathArray.length > 2 || path.match( '.git' ) ) { continue; }

				fileName = pathArray.pop();

				if ( fileName !== 'readme.md' ) { continue; }

console.log( ' folder = "" ', path );

				filesSelected.push( path ); 

			}

		} else {

			for ( var i = 0; i < filesAll.length; i++ ) {

				file = filesAll[ i ];

				if ( !file.startsWith( folder ) ) { continue; }
				if ( file.match( 'archive' ) ) { continue; }

				pathArray = file.split( '/' );
				fileName = pathArray.pop();

				if ( fileName !== 'readme.md' ) { continue; }

				filesSelected.push( file ); 

			}

		}

		menuMessages.innerHTML = 'Files in repo: ' + filesAll.length;

		createFolderNameTableOfContents( folder );

	}


	function createFolderNameTableOfContents( folder ) {

		var txt, file,

		txt = '<p>files:</p>';

		for ( var i = 0; i < filesSelected.length; i++ ) {

			file = filesSelected[ i ];

console.log( 'cFNToC', file, '\n' + folder + 'readme.md' );

			if ( folder && folder.slice( -1 ) !== '/' ) { folder += '/'; }

			if ( file === folder + 'readme.md' ) {  

				getMarkdown( urlBase + file, contents );

			} else {

				ffolder = file.split( '/' );
				ffolder.pop();

				fName = file.replace( folder, '' ).replace( 'readme.md', '').replace( /\//g, '' )
				txt += '<h3><a href=JavaScript:getFilesFromFolder("' + ffolder + '"); > ' + fName + '</a></h3>';

			}

		}

		menuFolderIndices.innerHTML = txt + '';

		setBreadCrumbs( folder );

	}


	function setBreadCrumbs( folder ) {

		foldersArray = folder.split( '/' );

		txt = 

		'<h2>' +

			'<a href=http://' + user + '.github.io title="' + user + ' - ' + tagLine + '" >' + logo + ' ' + user + '</a> &raquo; ' +

			'<a href=JavaScript:getFilesFromFolder(""); >' + repo + ' </a> &raquo; ' +

		'';

		for ( var i = 0; i < foldersArray.length - 1; i++ ) {

			txt += '<a href=JavaScript:getFilesFromFolder("' + foldersArray[ i ] + '"); >' + foldersArray[ i ].replace( /-/g, ' ' ) + '</a> &raquo ';

		}

		txt += '</h2> <h3><a href=# >' + foldersArray[ i ].replace( /-/g, ' ' ) + '</a></h3>';

		menuBreadCrumbs.innerHTML = txt;

	}


	function hashChange() {

		var fileName;

		fileName = location.hash ? location.hash.slice( 1 ) : searchForFile;

		getMarkdown( fileName, contents );

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