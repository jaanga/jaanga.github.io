
	init();

	function init() {

//		document.body.style.cssText = ' font: 12pt monospace; left: 0; margin: 0 auto; max-width: 900px; position: absolute; right: 0; ';

		var css = document.body.appendChild( document.createElement('style') );
		css.innerHTML = 'body { font: 12pt monospace; margin: 0; }' +
			'h1 { margin: 30px 20%; }' +
			'h2 { margin: 30px 20% 10px 20%; }' +
			'h3 { margin: 30px 20% 10px 20%; }' +

			'iframe { border: 0px solid; margin: 50px 0 80px 0; width: 100%; }' +

			'p, li { margin: 10px 20%; }' +
			'li li { margin: 10px 2%; }' +
			'p em { font-size: 12pt; }' +

			'table { font-size: 14pt; margin: 10px 20%; }' +

			'#footer { font-size: 10pt; margin: 50px 20%; }' +

		'';

		window.addEventListener( 'hashchange', hashChange, false );

		hashChange();

	}

	function hashChange() {

		var fileName = location.hash ? location.hash.substr( 1 ) : 'readme.md';
		var converter = new showdown.Converter();
		var content = document.body.appendChild( document.createElement( 'div' ) );

		document.title = document.title ? document.title : fileName;

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open( 'get', fileName, true );
		xmlHttp.onreadystatechange = function() {

			content.innerHTML = xmlHttp.readyState === 4 ? converter.makeHtml( xmlHttp.responseText ) : '';

		};

		xmlHttp.send( null );

	}
