
	var posts = [];
	var postsStart = 0;
	var postsNumberToDisplay = 8;
	var contents = [];

	var converter = new showdown.Converter();

	function requestPostTitles( tags ) {

		var xhr = new XMLHttpRequest();
		xhr.open( 'GET', apiUrl, true );

		xhr.onreadystatechange = function() {

			if ( xhr.readyState !== 4 ) { return; }

			var response =  xhr.responseText;

// xhrposts = JSON.parse( xhr.response );

//console.log( 'xhrposts', xhrposts );

			lines = response.split(/\r\n|\n/);
			var txt = '';

			for ( var i = 0; i < lines.length; i++ ) {

				if ( lines[ i ].indexOf( '"name": "201' ) > -1 ) {

					line = lines[ i ];
					items = line.substr( 13 ).split( '_' );
					fname = line.substr( 13 ).replace( '",', '' );

					if ( tags !== undefined ) {

						tag = items[ 2 ];

						if ( tag ) {

							itemTag = items[2].substr( 0, items[ 2 ].length - 5 );

						} else {

console.log( 'oops here:', items );

						}


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

		xhr.send( null );

	}

	function requestPost ( fileName, index, number ) {

		var xhr = new XMLHttpRequest();
		xhr.open( 'GET', postsFolder + fileName, true );
		xhr.onreadystatechange = function() {

			if ( xhr.readyState !== 4 ) { return; }

			items = fileName.split( '_' );

			if ( items.length > 1 ) {

				txt = `_${ items[ 0 ] } - tags: [${ items[ 2 ].replace( '.md', '' ) }]( #tags#${ items[ 2 ].replace( '.md', '' ) } )_ \n\n`;


			} else {

				txt = `<div><i>${ items[ 0 ] } </i></div>`;

			}

			titleLength = xhr.responseText.indexOf( '===' );

			title = '#[' + xhr.responseText.substr( 0, titleLength - 1 ) + ']( #' + fileName + ' )\n';
			tt = txt + title + xhr.responseText.substr( titleLength + 3 );
console.log( 'tt', tt );
			txt = converter.makeHtml( tt ) + '<hr>';

			contents[ index ] = txt;

			if ( contents.length >= number ) {

				postsText.innerHTML = '';

				for ( var i = 0 ; i < number; i++ ) {

					postsText.innerHTML += contents[ i ];

				}

				postsText.innerHTML += footer

			}

		};

		xhr.send( null );

	}
