

	var urlAPITreeContents = 'https://api.github.com/repos/jaanga/terrain3/git/trees/gh-pages?recursive=1';

// GitHub API

	var TRE = {};

	TRE.getGitHubAPITreeContents = function( callback ) {

//		var xhr, response, file;

		xhr = new XMLHttpRequest();
		xhr.open( 'GET', urlAPITreeContents, true );
		xhr.onload = onLoadGitHubTreeContents;
		xhr.send( null );

		function onLoadGitHubTreeContents() {

			response = JSON.parse( xhr.response );
			files = [];


			for ( var i = 0; i < response.tree.length; i++ ) {

				file = response.tree[ i ].path;

				if ( !file.match( 'readme.md' ) ) { continue; }
//				if ( file.indexOf( searchInFolder ) === -1 || file.slice( -7 ) !== '.sagews' ) { continue; }

				files.push( file );
//				file = file.split( '\/' ).pop();
//				selFiles[ selFiles.length ] = new Option( file, file );

			}

//			selFiles.selectedIndex = Math.floor( Math.random() * selFiles.length );


//			callback();

		}

	}