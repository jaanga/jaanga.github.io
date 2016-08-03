
/*
	var user = 'jaanga';
	var repo = 'jaanga.github.io';
	var branch = 'master';
	var folder = 'cookbook-threejs\/examples\/';

	var tree = 'https://api.github.com/repos/' + user + '/' + repo + '/git/trees/' + branch + '?recursive=1';

	var urlBase = 'http://' + user + '.github.io/';
*/

	var user = 'jaanga';
	var repo = 'terrain3';
	var branch = 'gh-pages';
	var folder = '';

	var tree = 'https://api.github.com/repos/' + user + '/' + repo + '/git/trees/' + branch + '?recursive=1';

	var urlBase = 'http://' + user + '.github.io/' + repo + '/' + folder;

	var filesAll, filesSelected;

	function getGitHubAPITreeContents( folder ) {

		var xhr;
		var response;

		xhr = new XMLHttpRequest();
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

		if ( folder === '' ) {

			for ( var i = 0; i < filesAll.length; i++ ) {

				path = filesAll[ i ];

				pathArray = path.split( '/' );

				if ( path.match( 'archive' ) ) { continue; }

				if ( pathArray.length > 2 || path.match( '.git' ) ) { continue; }

				fileName = pathArray.pop();

				if ( fileName !== 'readme.md' ) { continue; }

//console.log( '', path );

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

		message.innerHTML = 'Files all count: ' + filesAll.length;

		createFolderNameTableOfContents( folder );

	}


	function createFolderNameTableOfContents( folder ) {

		var txt, file,

		txt =  'files:';

		for ( var i = 0; i < filesSelected.length; i++ ) {

			file = filesSelected[ i ];

			txt += '<p><a href=JavaScript:getFilesFromFolder("' + file + '"); > ' + file.replace( folder, '' ).replace( '/readme.md', '') + '</a></p>';

		}

		menuFolderIndices.innerHTML = txt + '';

		setBreadCrumbs( folder );

	}


	function setBreadCrumbs( folder ) {

		txt = '<h2><a href=' + urlBase + ' >' + user + '</a> &raquo; <a href=JavaScript:getFilesFromFolder(""); >' + repo + '</a> &raquo; ';

		foldersArray = folder.split( '/' );

		for ( var i = 0; i < foldersArray.length - 1; i++ ) {

			txt += '<a href=JavaScript:getFilesFromFolder("' + foldersArray[ i ] + '"); >' + foldersArray[ i ].replace( /-/g, ' ' ) + '</a> &raquo ';

		}

		txt += '</h2><h3><a href=# >' + foldersArray[ i ].replace( /-/g, ' ' ) + '</a></h3>';

		menuBreadCrumbs.innerHTML = txt;

	}
