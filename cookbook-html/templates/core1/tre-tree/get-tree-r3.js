//

	var TRE = TRE || {};

	TRE.extension = '.html';


// MENUS Full version


	TRE.getMenuDetailsTableOfContents = function() {

		var menuDetailsTableOfContents =

			'<details id=detailsTableOfContents open >' +

				'<summary><h3>Table of Contents</h3></summary>' +

				'<div id=TREtoc ></div>' + b +

			'</details>' +

		'';

		return menuDetailsTableOfContents;

	};

// called by init


	TRE.getGitHubRepoTreeContents = function() {

		COR.requestFile( DEF.urlGITHubAPITreeContents, function callbackGH( xhr ) {

			var response, tree;

			response = JSON.parse( xhr.target.response );

			TRE.tree = response.tree;

			TRE.itemsAll = TRE.tree.map( function( item ) { return item.path; } );

			onHashChange();

//			TRE.getFilesFromFolder( '' );

		} );

	}


// called by onHashChange

	TRE.getFilesFromFolder = function( dir ) {

		var dirArray, dirLen, item, itemArray;

		TRE.dirsSelected = [];
		TRE.filesSelected = [];

		dirArray = dir === '/' ? [] : dir.split( '/' );

		dirLen = dirArray.length + 2;

		for ( var i = 0; i < TRE.itemsAll.length; i++ ) {

			item = TRE.itemsAll[ i ];

			if ( !item.includes( dir ) ) { continue; }

			if ( !item.includes( 'readme.md' ) ) { continue; }

			itemArray = item.split( '/' );

			if ( itemArray.length !== dirLen ) { continue; }

			TRE.dirsSelected.push( item.replace( '/readme.md', '' ) );

		}

		for ( var i = 0; i < TRE.itemsAll.length; i++ ) {

			item = TRE.itemsAll[ i ];

			if ( !item.includes( dir ) ) { continue; }

			if ( !item.includes( TRE.extension ) ) { continue; }

			if ( item.includes( 'archive' ) ) { continue; }

			if ( item.includes( 'index.html' ) ) { continue; }

			itemArray = item.split( '/' );

			if ( itemArray.length !== dirLen - 1 ) { continue; }

			TRE.filesSelected.push( item );

		}

		TRE.createFolderNameTableOfContents();

	};


	TRE.createFolderNameTableOfContents = function() {

//		var toc, folderName, folder;

		toc = '';

		for ( var i = 0; i < TRE.dirsSelected.length; i++ ) {

			TRE.folder = TRE.dirsSelected[ i ];

			TRE.folderName = TRE.folder.split( '/' ).pop();
			TRE.folderName = TRE.folderName.replace( /-/g, ' ' );

			toc += '<h3>&#x1f4c1; <a href=#' + TRE.folder + ' > ' + TRE.folderName + '</a></h3>';

		}


		for ( var i = 0; i < TRE.filesSelected.length; i++ ) {

			TRE.file = TRE.filesSelected[ i ];
			item = TRE.file.split( '/' )

			TRE.fileName = item.pop();
			TRE.fileName = TRE.fileName.replace( /-/g, ' ' );

			toc += '<h3><a href=#' + TRE.file + ' > ' + TRE.fileName + '</a></h3>';

		}

		TREtoc.innerHTML = toc;

		if( TRE.filesSelected.length === 1 ) {


		}

	}
