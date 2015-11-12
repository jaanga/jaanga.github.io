

	var posts = [];
	var converter = new showdown.Converter();

	function requestPostTitles( tags ) {

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( 'GET', apiUrl, true );

		xmlHttp.onreadystatechange = function() {

			if ( xmlHttp.readyState !== 4 ) { return; }

			var response =  xmlHttp.responseText;
			var lines = response.split(/\r\n|\n/);
			var txt = '';

			for ( var i = 0; i < lines.length; i++ ) {

//				if ( lines[ i ].indexOf( '"name"' ) > -1 && lines[ i ].substr( 13, 3 ) === '201' ) {
				if ( lines[ i ].indexOf( '"name": "201' ) > -1 ) {

					line = lines[ i ];
					items = line.substr( 13 ).split( '_' );
					fname = line.substr( 13 ).replace( '",', '' );

					if ( tags !== undefined ) {

						itemTag = items[2].substr( 0, items[ 2 ].length - 5 );
console.log( itemTag );
						if ( typeof tags === 'string' ) { tags = [ tags ]; }

						for ( var j = 0; j < tags.length; j++ ) {

							if ( itemTag === tags[ j ] ) {

								posts.push( { date: fname.substr( 0, 10 ).replace( /-/g, '' ), name: fname } );
								txt += fname + '<br>';

							}

						}

					} else {

						posts.push( { date: fname.substr( 0, 10 ).replace( /-/g, '' ), name: fname } );
						txt += fname + '<br>';


					}




				}

			}

			posts.sort( function( a, b ){return b.date - a.date } );

			for ( var i = 0; i < posts.length; i++ ) {

				requestPost ( postsFolder, posts[ i ].name );

			}

		}

		xmlHttp.send( null );

	}

	function requestPost ( path, fileName ) {

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( 'GET', path + fileName, true );
		xmlHttp.onreadystatechange = function() {

			if ( xmlHttp.readyState !== 4 ) { return; }

			items = fileName.split( '_' );

			txt = items.length > 1 ? '<div><i>' + items[ 0 ] + ' - tags: ' + items[ 2 ].replace( '.md', '' ) + '</i></div>' : ''; 

			titleLength = xmlHttp.responseText.indexOf( '===' );

			title = '[' + xmlHttp.responseText.substr( 0, titleLength - 1 ) + ']( #' + fileName + ' )';

//console.log( title  + xmlHttp.responseText.substr( titleLength - 1 ) );

			txt += converter.makeHtml( title + xmlHttp.responseText.substr( titleLength - 1 )  ) + '<hr>';

			postsText.innerHTML += txt;

		};

		xmlHttp.send( null );

	}
