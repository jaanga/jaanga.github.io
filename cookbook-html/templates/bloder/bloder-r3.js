
	var posts = [];
	var postsStart = 0;
	var postsNumberToDisplay = 2;
	var contents = [];

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

				if ( lines[ i ].indexOf( '"name": "201' ) > -1 ) {

					line = lines[ i ];
					items = line.substr( 13 ).split( '_' );
					fname = line.substr( 13 ).replace( '",', '' );

					if ( tags !== undefined ) {

						itemTag = items[2].substr( 0, items[ 2 ].length - 5 );

//console.log( itemTag );

						if ( typeof tags === 'string' ) { tags = [ tags ]; }

						for ( var j = 0; j < tags.length; j++ ) {

							if ( itemTag === tags[ j ] ) {

								posts.push( { date: fname.substr( 0, 10 ).replace( /-/g, '' ), name: fname } );
								txt += fname + '<br>';

							}

						}

						postsNumberToDisplay = posts.length;

					} else {

						posts.push( { date: fname.substr( 0, 10 ).replace( /-/g, '' ), name: fname } );
						txt += fname + '<br>';


					}

				}

			}

			posts.sort( function( a, b ){return b.date - a.date } );

			postsStart = postsStart < posts.length ? postsStart : 0;

			postsStart = postsStart >= 0 ? postsStart : posts.length - postsNumberToDisplay;

			postFinish =  postsStart + postsNumberToDisplay;

			postFinish = postFinish < posts.length ? postFinish : posts.length;

			for ( var i = postsStart; i < postFinish; i++ ) {

//console.log( posts[ i ].name, i, postsNumberToDisplay  );

				requestPost ( posts[ i ].name, i, postFinish );

			}

		}

		xmlHttp.send( null );

	}

	function requestPost ( fileName, index, number ) {

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( 'GET', postsFolder + fileName, true );
		xmlHttp.onreadystatechange = function() {

			if ( xmlHttp.readyState !== 4 ) { return; }

			items = fileName.split( '_' );



			if ( items.length > 1 ) {

//				txt = `<div><i>${ items[ 0 ] } - tags: ${ items[ 2 ].replace( '.md', '' ) } </i></div>`;
				txt = `_${ items[ 0 ] } - tags: [${ items[ 2 ].replace( '.md', '' ) }]( # "not working yet" )_\n`;

			} else {

				txt = `<div><i>${ items[ 0 ] } </i></div>`;

			}

			titleLength = xmlHttp.responseText.indexOf( '===' );

			title = '[' + xmlHttp.responseText.substr( 0, titleLength - 1 ) + ']( #' + fileName + ' )';

			txt = converter.makeHtml( txt + title + xmlHttp.responseText.substr( titleLength - 1 )  ) + '<hr>';

			contents[ index ] = txt;

			if ( contents.length >= number ) {

				postsText.innerHTML = '';

				for ( var i = 0 ; i < number; i++ ) {

					postsText.innerHTML += contents[ i ];

				}

				postsText.innerHTML += footer


			}

		};

		xmlHttp.send( null );

	}
