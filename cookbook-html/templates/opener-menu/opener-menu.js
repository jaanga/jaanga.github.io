// r1 2016-05-31

	var defaultHash =  'readme.md';
	var readerSource = 'https://cdnjs.cloudflare.com/ajax/libs/showdown/1.3.0/showdown.min.js';
	var reader, converter;
	var contents; // must be global

//	init();

	function init() {

		var css, menu;

		css = document.body.appendChild( document.createElement( 'style' ) );
		css.innerHTML =

			'body { font: 12pt monospace; margin: 0; }' +
			'a { color: crimson; text-decoration: none; }' +
			'button, input[type=button] { background-color: #eee; border: 2px #eee solid; color: #666; }' +

			'#bars { color: crimson; cursor: pointer; font-size: 24pt; text-decoration: none; }' +
			'#contents { border: 0px #ccc solid; left: 0; margin: 0 auto; position: absolute; right: 0; max-width: 800px; }' +
			'#hamburger { left: 325px; position: absolute; top: 20px; transition: left 1s; }' +
			'#menu { background-color: #eee; border: 1px #ccc solid; left: -325px; max-height: ' + ( window.innerHeight - 10 ) + 'px; ' +
				'opacity: 0.85; overflow: auto; padding: 0 10px; position: absolute; top: -20px; transition: left 1s; width: 300px; }' +

		'';

		contents = document.body.appendChild( document.createElement( 'div' ) );
		contents.id = 'contents';

		hamburger = document.body.appendChild( document.createElement( 'div' ) );
		hamburger.id = 'hamburger';
		hamburger.innerHTML = '<div id=bars > &#9776 </div>';
		bars.onclick = function() { hamburger.style.left = hamburger.style.left === "0px" ? "325px" : 0; };

		menu = hamburger.appendChild( document.createElement( 'div' ) );
		menu.id = 'menu';	

		window.addEventListener ( 'hashchange', onHashChange, false );

		if ( !reader ) {

			reader = document.body.appendChild( document.createElement( 'script' ) );
			reader.onload = function() { 

				converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });

				getMarkdown( 'menu.md', menu );
				onHashChange(); 

			};
			reader.src = readerSource;

		} else {

			onHashChange();

		}

	}

	function onHashChange() {

		url = location.hash ? location.hash.slice( 1 ) : defaultHash;

		document.title = url.split( '/' ).pop() + ' ~ ' + document.title;

		getMarkdown( url, contents )

	}

	function getMarkdown( url, target ) {


		var xhr = new XMLHttpRequest();
		xhr.open( 'GET', url, true );
		xhr.onload = function() { target.innerHTML = converter.makeHtml( xhr.responseText ); };
		xhr.send( null );

	}
