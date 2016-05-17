// r1 2016-05-17

	var defaultHash =  'readme.md';
	var defaultFile = 'index.html';
	var readerSource = 'https://cdnjs.cloudflare.com/ajax/libs/showdown/1.3.0/showdown.min.js';
	var contents; // must be global

//	init();

	function init() {

		var reader;

		if ( location.hash && location.hash.indexOf( '.md' ) > -1 ) {

			reader = document.body.appendChild( document.createElement( 'script' ) );
			reader.onload = function() { onHashChange(); };
			reader.src = readerSource;

		} else {

			window.location.href = defaultFile + location.hash;

		}

	}

	function onHashChange() {

		var css, converter, url, xhr;

		css = document.head.appendChild( document.createElement( 'style' ) );
		css.innerHTML = ' \
			body { font: 12pt monospace; left: 0; margin: 0 auto; max-width: 800px; right: 0;  }  \
			button, input[type=button] { background-color: #eee; border: 2px #eee solid; color: #888; }  \
			a { color: crimson; text-decoration: none; }  \
		';

		contents = !contents ? document.body.appendChild( document.createElement( 'div' ) )  : contents;
		contents.id = 'contents';

		converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });

		url = location.hash.slice( 1 );
		document.title = url.split( '/' ).pop() + ' ~ ' + document.title;

		xhr = new XMLHttpRequest();
		xhr.open( 'get', url, true );
		xhr.onload = function() { contents.innerHTML = converter.makeHtml( xhr.responseText ); };
		xhr.send( null );

		window.addEventListener( 'hashchange', onHashChange, false );

	}
