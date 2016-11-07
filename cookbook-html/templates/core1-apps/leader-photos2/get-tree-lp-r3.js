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



// called by init / get list of all files in GitHub repo

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

//		var dirArray, dirLen, item, itemArray;

		TRE.dirsSelected = [];
		TRE.filesSelected = [];

		dirArray = dir === '/' ? [] : dir.split( '/' );

		dirLen = dirArray.length + 2;

		for ( var i = 0; i < TRE.itemsAll.length; i++ ) {

			item = TRE.itemsAll[ i ];

			if ( !item.includes( dir ) ) { continue; }

			if ( !item.includes( 'photos.dat.lock' ) ) { continue; }

			itemArray = item.split( '/' );

			if ( itemArray.length !== dirLen ) { continue; }

			TRE.dirsSelected.push( item.replace( '/photos.dat.lock', '' ) );

		}


//console.log( 'dirLen', dirLen );
//console.log( 'TRE.dirsSelected', TRE.dirsSelected );

		for ( var i = 0; i < TRE.itemsAll.length; i++ ) {

			item = TRE.itemsAll[ i ];

			if ( !item.includes( dir ) ) { continue; }

			if ( !item.includes( 'jpg' ) ) { continue; }

//			if ( item.includes( 'archive' ) ) { continue; }

			if ( item.includes( '.thumb.' ) || item.includes( '.highlight.' ) ) { continue; }

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

/*
		for ( var i = 0; i < TRE.filesSelected.length; i++ ) {

			TRE.file = TRE.filesSelected[ i ];
			item = TRE.file.split( '/' )

			TRE.fileName = item.pop();
			TRE.fileName = TRE.fileName.replace( /-/g, ' ' );

			toc += '<h3><a href=#' + TRE.file + ' > ' + TRE.fileName + '</a></h3>';

		}
*/
		TREtoc.innerHTML = toc;



		if ( TRE.dirsSelected.length === 0 ) { TRE.createPageOfImages(); }


	}


	TRE.createPageOfImages = function() {

		var page, folderName, folder;

		page = '';

		for ( var i = 0; i < TRE.filesSelected.length; i++ ) {

			item = TRE.filesSelected[ i ];
			item2 = item.split( '/' )

			fileName = item2.pop();
			fileName = fileName.replace( /-/g, ' ' );

			page += '<div style=display:inline-block;margin:10px; ><img src=' + DEF.urlGHPages + item + ' height=200; title=' + fileName.slice( 0, -4 ) + '></div>';

		}

		MNU.contents.innerHTML = page;

	}
