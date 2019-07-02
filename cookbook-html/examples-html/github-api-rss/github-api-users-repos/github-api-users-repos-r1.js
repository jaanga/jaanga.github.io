
	var DAT = {};


	DAT.getRepos = function( user ) {

//		var fileName, xhr, repos, txt;
//		var urls;

		urls = [];

		fileName = 'http://api.github.com/users/' + user + '/repos' + '?sort=updated&order=desc&per_page=100'; // &' + ( SEL.token || '' );

		xhr = new XMLHttpRequest();
		xhr.open( 'get', fileName, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			repos = JSON.parse( xhr.responseText );

//console.log( 'repos', repos );

			if ( repos.message ) {

				contents.innerHTML = repos.message;

				return;

			}

			txt = '<h1>' + user + ' Repositories</h1>';

			for ( var i = 0; i < repos.length; i++ ) {

				repo = repos[ i ];

				if ( repo.name === 'jaanga.github.io' ) { continue; }

				urls.push( repo.name );

				txt += 

					'<h3>' +

						( i + 1 ) + ' <a href=' + repo.html_url + ' >' + repo.name + '</a>' +
						( repo.fork === true ? ' ~ fork ~ ' : ' ~ ' ) +
						'forks: ' + repo.forks.toLocaleString() + ' ~ ' +
						'stars: ' + repo.watchers.toLocaleString() + ' ~ ' +
						'issues: ' + repo.open_issues.toLocaleString() +

					'</h3>' +

					'<p>' + repo.updated_at.slice( 0, 10 ) + ' ~ ' + repo.description + '</p>' +

					'<iframe src="http://rawgit.com/' + user + '/' + repo.name + '/gh-pages/index.html" ></iframe>' +

					'';

			}

			contents.innerHTML = txt;

/*
console.log( 'urls', urls );

			var fileName;

			for ( var i = 0; i < repos.length; i++ ) {

//				requestFile( 'https://rawgit.com/' + user + '/' + repos[ i ].name + '/gh-pages/readme.md' );

			}
*/

		}

	}


	function requestFile( fileName ) {

		var xhr, fileName, text, lines;

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous'; 
		xhr.open( 'GET', fileName, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			text = xhr.responseText;
			lines = text.split(/\r\n|\n/);
//			lines = text.split( '\n' ).map( function( line ) { return line.split( ',' ); } );

			console.log( lines[ 0 ] );
			console.log( lines.length );

		}

	}