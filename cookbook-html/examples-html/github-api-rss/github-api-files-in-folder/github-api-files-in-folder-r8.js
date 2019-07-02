// copyright &copy 2016 Jaanga authors. MIT license.

	var user = 'jaanga';
	var tagLine ='your 3D happy place';
	var logo = '&#x2766';

/*
	var repo = 'jaanga.github.io';
	var branch = 'master';
//	var folder = 'cookbook-threejs/examples/';
	var folder = 'cookbook-html/examples/github-api-rss/';
*/

	var org = 'jaanga';
	var repo = 'terrain3';
	var branch = 'gh-pages';
	var folder = '';

	var urlGitHubTree = 'https://api.github.com/repos/' + user + '/' + repo + '/git/trees/' + branch + '?recursive=1';
	var urlGHPages = 'https://' + user + '.github.io/' + repo + '/';
	var urlSource = 'https://github.com/' + user + '/' + repo + '/tree/' + branch + '/';
	var urlIssues = 'https://api.github.com/repos/' + org + '/' + repo + '/issues?labels=Status%20Update';

	var filesAll, filesSelected;

	var b = '<br>';
	var converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });

	init();

	function init() {

		var css, menu;

		css = document.body.appendChild( document.createElement( 'style' ) );
		css.innerHTML =

			'body { font: 12pt monospace; margin: 0; }' +
			'a { text-decoration: none; }' +
			'button, input[type=button] { background-color: #eee; border: 2px #eee solid; color: #888; }' +

			'h2 a { color: crimson; }' +
			'img { max-width: 100%; }' +
			'iframe { width: 100%; }' +
			'summary h2, summary h3, #menuBreadCrumbs h3 { display: inline; }' +
			'summary { outline: none; }' +

			'#menu { box-sizing: border-box; background-color: #ccc; padding: 0 0 0 10px; position: absolute; max-width: 20%; }' +
			'#contents { border: 0px red solid; left: 22%; position: absolute; top: 0; max-width: 55%; }' +
			'#updates { box-sizing: border-box; background-color: #eee; float: right; max-width: 20%; padding: 0 20px; }' +

		'';

		menu = document.body.appendChild( document.createElement( 'div' ) );
		menu.id = 'menu';
		menu.innerHTML =

			'<div id=menuBreadCrumbs ></div>' +

			'<div id=menuFolderIndices ></div>' +

			'<div id=menuTestHash ></div>' +

			'<div id=menuDetailsPageActions ></div>' +

			'<div id=menuDetailsAbout ></div>' +

			'<hr>' +

			'<center>' +
				'<a href=javascript:window.scrollTo(0,0); style=text-decoration:none; title="' + user + ' - ' + tagLine + '" >' +
				'<h1>' + logo + '<h1>' +
			'</a></center>' +

		'';

		contents = document.body.appendChild( document.createElement( 'div' ) );
		contents.id = 'contents';


		updates = document.body.appendChild( document.createElement( 'div' ) );
		updates.id = 'updates';

		window.addEventListener ( 'hashchange', onHashChange, false );

		setMenuDetailsPageActions();

		setMenuDetailsAbout();

		requestFile( urlGitHubTree, function callbackGH( xhr ) {

			var tree;

			response = JSON.parse( xhr.target.response );

			tree = response.tree;

			itemsAll = tree.map( function( item ) { return item.path; } );

			onHashChange();

			setMenuMessageTreeStats( tree );

		} );

	}


// menu items

	function setMenuDetailsPageActions() {

		menuDetailsPageActions.innerHTML =

			'<hr>' +

			'<details open>' +

				'<summary><h3>page actions</h3></summary>' +

				'<p><a href=JavaScript:location.href=urlSource+location.hash.slice(1); >View source on GitHub</a></p>' +
				'<p><a href=JavaScript:window.open(urlGHPages+location.hash.slice(1),"_blank"); >Open page in new tab</a></p>' +

				'<p id=menuActionMessages ></p>' +

			'</details>' +

		'';

	}

	function setMenuDetailsAbout() {

		menuDetailsAbout.innerHTML =

			'<details>' +

				'<summary><h3>about</h3></summary>' +

				'<p>This menu/<a href=https://en.wikipedia.org/wiki/Content_management_system >cms</a> is created on-the-fly by:' + b + b +
					'<a href=http://jaanga.github.io/cookbook-html/examples/github-api-rss/github-api-files-in-folder/#readme.md >' + document.title + '</a></p>' +
				'<p>Copyright &copy; 2016 ' + user + ' authors. <a href=https://' + user + '.github.io/license.md >MIT license</a>.</p>' +

			'</details>' +

		'';

	}

	function setMenuMessageTreeStats( tree ) {

		var dirs, files, filesSize, item;

		dirs = 0;
		files = 0;
		filesSize = 0;

		for ( var i = 0; i < tree.length; i++ ) {

			item = tree[ i ];

			if ( item.type === 'blob' ) {

				files++;
				filesSize += item.size;

			} else {

				dirs++;

			}

		}

		menuActionMessages.innerHTML =

			'<h3>repository statistics</h3>' +
			'Items in repo: ' + itemsAll.length.toLocaleString() + b +
			'&bull; Folders &nbsp;  &nbsp: ' + dirs.toLocaleString() + b +
			'&bull; Files  &nbsp  &nbsp  &nbsp: ' + files.toLocaleString() + b + b +

			'Size of files: ' + filesSize.toLocaleString() + ' bytes' +

		b;

	}


//

	function onHashChange() {

		var item;

		item = location.hash ? location.hash.slice( 1 ) : folder;

		if ( item.endsWith( '.md' ) === true ) {

			setBreadCrumbs( folder );

			requestFile( urlGHPages + item, function callbackMD( xhr ) {

				contents.innerHTML = converter.makeHtml( xhr.target.responseText );
				contents.style.overflow = 'auto';

			} );

		} else {

			setBreadCrumbs( item );

			getFilesFromFolder( item );

			requestFile( urlGHPages + item + '/readme.md', function callbackMD( xhr ) {

				contents.innerHTML = converter.makeHtml( xhr.target.responseText );
				contents.style.overflow = 'auto';

			} );

		}


		if ( folder === '' ) {

			requestFile( urlIssues, function ( xhr ) {

				issues = JSON.parse( xhr.target.responseText );

				txt = '<h1><a href="" >' + repo + ' status updates</a> <a href=index.html#readme.md > &#x24D8; </a></h1>';

				for ( var i = 0; i < issues.length; i++ ) {

					issue = issues[ i ];

					txt += '<h2>' + issue.title + '</h2>' +
						'<div class=issue >' + converter.makeHtml( issue.body ) + '</div>';

				}

				updates.innerHTML = txt;

			} );


		}

	}


	function setBreadCrumbs( dir ) {

		var breadCrumbs, dirArray;

		dirArray = dir.split( '/' );

		breadCrumbs =

		'<h2>' +

			'<a href=http://' + user + '.github.io title="' + user + ' - ' + tagLine + '" >' + logo + ' ' + user + '</a>&raquo; ' +
			'<a href=# >' + repo + '</a>&raquo; ' +

		'</h2>';

		for ( var i = 0; i < dirArray.length - 1; i++ ) {

			dirString = dirArray.slice( 0, i + 1 ).join( '/' );

			breadCrumbs += '<h3><a href=#' + dirString + ' >' + dirArray[ i ].replace( /-/g, ' ' ) + '</a>&raquo </h3>';

		}

		breadCrumbs += '<h4><a href=#' + dir + ' >' + dirArray[ i ].replace( /-/g, ' ' ) + '</a></h4>';

		menuBreadCrumbs.innerHTML = breadCrumbs;

	}


	function getFilesFromFolder( dir ) {

		var file, fileArray;

		dirsSelected = [];

		dirArray = dir.split( '/' );

		dirLen = dir === '' ? 0 : dirArray.length;

		for ( var i = 0; i < itemsAll.length; i++ ) {

			item = itemsAll[ i ];

			if ( !item.match( 'readme.md' ) ) { continue; }

			if ( !item.startsWith( dir ) ) { continue; }

			if ( item.match( 'archive' ) ) { continue; }

			itemArray = item.split( '/' );

			if ( itemArray.length - dirLen !== 2 ) { continue; }

			dirsSelected.push( item.replace( '/readme.md', '' ) );

		}

		createFolderNameTableOfContents( dir );

	}


	function createFolderNameTableOfContents( dir ) {

		var toc, fName, folder;

		toc = '';

		for ( var i = 0; i < dirsSelected.length; i++ ) {

			folder = dirsSelected[ i ];

			fName = folder.split( '/' ).pop();
			fName = fName.replace( /-/g, ' ' );

			toc += '<h3>&#x1f4c1; <a href=#' + folder + ' > ' + fName + '</a></h3>';

		}

		menuFolderIndices.innerHTML = toc;

	}


	function requestFile( fName, callback ) {

		var xhr;

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', fName, true );
		xhr.onload = callback;
		xhr.send( null );

	}