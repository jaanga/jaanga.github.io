

	var GET = GET || {};

	GET.user = 'jaanga';
	GET.repo = 'terrain3';

	GET.urlGITHubAPITreeContents = 'https://api.github.com/repos/' + GET.user + '/' + GET.repo + '/git/trees/gh-pages?recursive=1';

//	GET.defaultFile = '../../elevations/elevations-data-04/san-francisco_10_163_394_3_3_450_450_.json';
	GET.defaultFile; // if no default, select a random file

	GET.searchInFolder = 'elevations-data-04/';
	GET.extension = '.json';

//	GET.urlBase = '../../../../elevations/' + GET.searchInFolder;
	GET.urlBase = 'https://jaanga.github.io/terrain3/elevations/' + GET.searchInFolder;


	GET.getGitHubAPITreeContents = function() {

		var xhr, response, files, file;

		xhr = new XMLHttpRequest();
		xhr.open( 'GET', GET.urlGITHubAPITreeContents, true );
		xhr.onload = GET.onLoadGitHubTreeContents;
		xhr.send( null );

	}


	GET.onLoadGitHubTreeContents = function( xhr ) {

console.log( '', xhr  );

//		var response, files, file;

		response = JSON.parse( xhr.target.response );

		GET.extension = GET.extension || '.json';

		files = [];

		for ( var i = 0; i < response.tree.length; i++ ) {

			file = response.tree[ i ].path;

			if ( !file.includes( GET.searchInFolder ) ) { continue; }
			if ( !file.includes( GET.extension ) ) { continue; }

//			file = file.split( '\/' ).pop();

			files.push( file );

		}

		GET.onLoadTreeContent( files );


	}

	GET.onLoadTreeContent = function( files ) {

		console.log( '', files );

	}



	GET.getHTMLFilesinFolder = function() {

		GET.searchInFolder = 'elevations-core3';
		GET.extension = '.html';
		GET.urlBase = 'https://jaanga.github.io/terrain3/';

			GET.onLoadTreeContent = function( files ) {

				txt = '<h1>' + GET.searchInFolder + '</h1>' +

				'<input type=button onclick=window.location.href="https://github.com/jaanga/terrain3/tree/gh-pages/' + GET.searchInFolder + '/"; value="Got to GitHub" />' + b +
			'';

				for ( var i = 0; i < files.length; i++ ) {

					if ( files[ i ].split( '/' ).length === 2 ) { txt += files[ i ].link( GET.urlBase + files[ i ] )  + b; }

				}

				contents.innerHTML = txt;

			}


		GET.getGitHubAPITreeContents();

	}


