// Copyright &copy; 2016 Jaanga authors


	var converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });
	var b = '<br>';
	var txt = '<p>lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</p>';



	function initThreeColumnsCore() {

		var menu;

		getCSSCore();

		menu = document.body.appendChild( document.createElement( 'div' ) );
		menu.id = 'menu';
		menu.innerHTML =

			getMenuDetailsHeaderCore() +

			txt +

//			'<div id=menuFolderNameTableOfContents ></div>' +

//			getMenuDetailsPageActions() +

//			getMenuDetailsRepositoryStatistics() +

//			getMenuRepositoryEvents() +

			getMenuDetailsAboutCore() +

			getMenuFooterCore() +

		b;

		contents = document.body.appendChild( document.createElement( 'div' ) );
		contents.id = 'contents';

contents.innerHTML = '<h1>contents</h1>' + txt;

//		getContents();

		updates = document.body.appendChild( document.createElement( 'div' ) );
		updates.id = 'updates';

updates.innerHTML = '<h1>updates</h1>' + txt;

//		getUpdates();

//		window.addEventListener ( 'hashchange', onHashChange, false );

	}



	function getCSSCore() {

		var css;

		css = document.body.appendChild( document.createElement( 'style' ) );
		css.innerHTML =

			'body { font: 12pt monospace; margin: 0; }' +

			'a { color: crimson; text-decoration: none; }' +

			'button, input[type=button] { background-color: #ccc; border: 2px #fff solid; color: #322; }' +

			'h2, h1 { margin: 0 }' +

			'img { margin: 10px; max-width: 90%; }' +
			'iframe { width: 100%; }' +

			'select { min-width: 200px; }' +
			'summary h2, summary h3 { display: inline; }' +
			'summary { outline: none; }' +

			'.butt2 { width: 108px; }' +
			'.popUp { background-color: white; left: 150px; border: 1px solid red; opacity: 1.0; padding: 5px; position: absolute; width: 120px; z-index: 10; }' +

			'#contents { border: 0px red solid; left: 22%; position: absolute; top: 0; max-width: 55%; }' +

			'#menu { box-sizing: border-box; background-color: #ccc; padding: 0 5px 0 10px; position: absolute; max-width: 20%; }' +
			'#menu { background-color: #eee; height: ' + window.innerHeight + 'px; padding: 0 0 0 10px; overflow-y: auto; position: fixed; width: 300px; }' +

			'#updates { box-sizing: border-box; background-color: #eee; float: right; max-width: 20%; padding: 0 20px; }' +


			'#repositoryEvents h4 { margin: 0; }' +
			'#repositoryEvents { max-height: 200px; overflow-y: scroll; font-size: 9pt; }' +

		b;

	}

	function getMenuDetailsHeaderCore() {

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


	function getMenuDetailsAboutCore() {

		var menuDetailsAbout =

			'<details id=detailsAbout >' +

				'<summary><h3>About</h3></summary>' +

				'<p>' +
					'Copyright &copy; 2016 <a href=https://github.com/orgs/jaanga/people target="_blank">Jaanga authors</a>.' + b +
					'<jaanga.github.io/license.md >MIT license</a>' +
				'</p>' +

				'<p>Thank you <a href=https://developer.github.com/v3/ > GitHub API </a> ' +
//					'<a href=http://threejs.org target="_blank">Mr.doob.</a></p>' +

				'<p>Click the \'i in a circle\' info icon for more <a href=index.html#readme.md >help</a></p>' +

			'</details>' +

		b;

		return menuDetailsAbout;

	}


	function getMenuFooterCore() {

		var footer = 

			'<hr>' +

			'<center>' +
				'<a href=javascript:menu.scrollTop=0; style=text-decoration:none; onmouseover=pop2.style.display=""; onmouseout=pop2.style.display="none"; ><h1> &#x2766 <h1></a>' +
			'</center>' +

			'<div class=popUp id=pop2 style=display:none; >' +
				'Jaanga - your 3D happy place.<br>Click here to return to the top of the page' +
			'</div>' +

		b;

		return footer;

	}



	function onHashChange() {

		hashes = location.hash ? location.hash.split( '#' ) : [ '', selUser.value, 1 ];

		name = hashes[ 1 ];

		page = parseInt( hashes[ 2 ], 10 );

		document.title = name + ' - page ' + page + ' - GitHub API Users Events ';

		for ( var i = 0; i < selUser.options.length; i++ ) {

			if ( selUser.options[ i ].value === name ) { selUser.selectedIndex = i; }

		}

		getAPIUserData( name );

		getEvents( name, page );

	}
