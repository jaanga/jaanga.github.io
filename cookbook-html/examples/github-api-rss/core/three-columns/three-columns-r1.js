
	var b = '<br>';
	var converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });


	function init() {

		var menu;

		getCSS();

		menu = document.body.appendChild( document.createElement( 'div' ) );
		menu.id = 'menu';
		menu.innerHTML =

			getMenuDetailsHeader() +

			'<div id=menuFolderNameTableOfContents ></div>' +

//			getMenuDetailsPageActions() +

//			getMenuDetailsRepositoryStatistics() +

//			getMenuRepositoryEvents() +

			getMenuDetailsAbout() +

			getMenuFooter() +

		b;

		contents = document.body.appendChild( document.createElement( 'div' ) );
		contents.id = 'contents';

contents.innerHTML = 'lllllll';

//		getContents();

		divUpdates = document.body.appendChild( document.createElement( 'div' ) );
		divUpdates.id = 'divUpdates';

divUpdates.innerHTML = 'lllllll';

//		getUpdates();

//		window.addEventListener ( 'hashchange', onHashChange, false );

	}



	function getCSS() {

		var css;

		css = document.body.appendChild( document.createElement( 'style' ) );
		css.innerHTML =

			'body { font: 12pt monospace; margin: 0; }' +
			'a { text-decoration: none; }' +
			'button, input[type=button] { background-color: #eee; border: 2px #eee solid; color: #888; }' +

			'h2 a { color: crimson; }' +
			'img { max-width: 100%; }' +
			'iframe { width: 100%; }' +
			'summary h2, summary h3 { display: inline; }' +
			'summary { outline: none; }' +

			'#menu { box-sizing: border-box; background-color: #ccc; padding: 0 0 0 10px; position: absolute; max-width: 20%; }' +

			'#contents { border: 0px red solid; left: 22%; position: absolute; top: 0; max-width: 55%; }' +
			'#repositoryEvents h4 { margin: 0; }' +
			'#repositoryEvents { max-height: 200px; overflow-y: scroll; font-size: 9pt; }' +
			'#divUpdates { box-sizing: border-box; background-color: #eee; float: right; max-width: 20%; padding: 0 20px; }' +

		b;

	}

	function getMenuDetailsHeader() {

		var menuDetailsHeader = 

			'<h2>' +

				'<a href=https://jaanga.github.io/ title="Jaanga - your 3D happy place" > &#x2766 </a>' + b +
				'<a href="" title="Click here to refresh this page" >' + document.title + '</a> ~ ' +
//				'<a href=index.html#readme.md title="Click here for help and information" > &#x24D8; </a>' +
				'<a href=index.html#readme.md onmouseover=popHelp.style.display=""; onmouseout=popHelp.style.display="none"; > &#x24D8; </a>' +

			'</h2>' +

			'<div class=popUp id=popHelp style=display:none; ><p>Hi there!</p>Click the i-in-circle, info icon for latest updates.</div>' +

		b;

		return menuDetailsHeader;

	}


	function getMenuDetailsAbout() {

		var menuDetailsAbout =

			'<details>' +

				'<summary><h3>About</h3></summary>' +

				'<p>' +
					'Copyright &copy; 2016 <a href=https://github.com/orgs/jaanga/people target="_blank">Jaanga authors</a>.' + b +
					'<jaanga.github.io/license.md >MIT license</a>' +
				'</p>' +

				'<p>Thank you <a href=https://developers.google.com/maps/documentation/javascript/elevation > Google Maps </a> and ' +
					'<a href=http://threejs.org target="_blank">Mr.doob.</a></p>' +

				'<p>Click the \'i in a circle\' info icon for more <a href=index.html#readme.md >help</a></p>' +

			'</details>' +

		b;

		return menuDetailsAbout;

	}


	function getMenuFooter() {

		var footer = 

			'<hr>' +

			'<center>' +
				'<a href=javascript:menu.scrollTop=0; style=text-decoration:none; onmouseover=pop2.style.display=""; onmouseout=pop2.style.display="none"; ><h1> &#x2766 <h1></a>' +
			'</center>' +

			'<div class=popUp id=pop2 style=display:none;bottom:10px; >' +
				'Jaanga - your 3D happy place.<br>Click here to return to the top of the page' +
			'</div>' +

		b;

		return footer;

	}
