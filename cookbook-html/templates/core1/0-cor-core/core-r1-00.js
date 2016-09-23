// Copyright &copy; 2016 Jaanga authors. MIT License

	var b = '<br>';

	var API = API || {};
	var COR = {};
	var SER = SER || {};
	var DAT = DAT || {};
	var EUS = EUS || {};
	var GET = GET || {};

	API.token = '';

	var tagLine ='your 3D happy place';
	var logo = '&#x2766';

	COR.taglineHeader = 

		'<div><small>' +
			'Tools to market your apps' + b +
			'Apps that market your tools' + b +
		'</small></div>';


	COR.aboutCredits = '<p>Thank you <a href=https://developer.github.com/v3/ > GitHub API </a> ';
//					'<a href=http://threejs.org target="_blank">Mr.doob.</a></p>' +


//	COR.txt = '<p>lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</p>';
	COR.txt = '<p>GitHub API responses will appear here.</p>';

	COR.converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });


	COR.initThreeColumns = function() {

		COR.getCSSThreeColumns();

		COR.menu = document.body.appendChild( document.createElement( 'div' ) );
		COR.menu.id = 'menu';

// use this in your HTML file

		COR.menu.innerHTML =

			COR.getMenuDetailsHeader() +

			COR.getMenuDetailsTemplate() +

			COR.getMenuDetailsAbout() +

			COR.getMenuFooter() +

		b;


		COR.contents = document.body.appendChild( document.createElement( 'div' ) );
		COR.contents.id = 'contents';
		COR.contents.innerHTML = '<h1>contents</h1><div id=CORdivContents >' + COR.txt + '</div>';


		COR.updates = document.body.appendChild( document.createElement( 'div' ) );
		COR.updates.id = 'updates';
		COR.updates.innerHTML = '<h1>updates</h1><div id=CORdivUpdates >' + COR.txt + '</div>';

//		detailsTemplate.setAttribute('open', 'open');

	};



	COR.getCSSThreeColumns = function() {

		var css;

		css = document.body.appendChild( document.createElement( 'style' ) );
		css.innerHTML =

			'body { font: 12pt monospace; margin: 0; }' +

			'a { color: crimson; text-decoration: none; }' +

			'button, input[type=button] { background-color: #ccc; border: 2px #fff solid; color: #322; }' +

			'#menu h1, #menu h2, #menu h3 { margin: 0; }' +

			'img { max-width: 100%; }' +
			'iframe { width: 100%; }' +

			'select { width: 100%; }' +
			'summary h2, summary h3, summary h4 { display: inline; }' +
			'summary { outline: none; }' +


			'.butt2 { width: 108px; }' +
			'.popUp { background-color: white; left: 150px; border: 1px solid red; opacity: 1.0; padding: 5px; position: absolute; width: 120px; z-index: 10; }' +
			'.GETupdate { border: 1px solid #aaa; height: 300px; overflow: auto }' +

			'#contents { border: 0px red solid; left: 25%; position: absolute; top: 0; max-width: 50%; }' +

//			'#menu { box-sizing: border-box; background-color: #ccc; padding: 0 10px 0 10px; position: absolute; max-width: 20%; }' +
			'#menu { background-color: #eee; height: ' + window.innerHeight + 'px; padding: 0 5px 0 10px; overflow-x: hidden; overflow-y: auto; position: fixed; width: 20%; }' +
			'#menu img { max-width: 200px; }' +

//			'#updates { box-sizing: border-box; background-color: #eee; float: right; max-width: 25%; padding: 0 20px; }' +
			'#updates { background-color: #eee;  height: ' + window.innerHeight + 'px; right: 0; max-width: 25%; overflow-x: hidden; overflow-y: auto; padding: 0 20px; position: fixed; }' +

			'#repositoryEvents h4 { margin: 0; }' +
			'#repositoryEvents { max-height: 200px; overflow-y: scroll; font-size: 9pt; }' +

			'#divSplash { background-color: #ccc; border: 2px solid #888; height: 80%; width: 500px;' +
				'overflow: hidden; left: 350px; position: absolute; resize: none; top: 100px; }' +
			'#splashHeader { text-align: right; }' +

		b;

	};



	COR.getMenuBreadCrumbs = function() {

		return '<div id=CORdivBreadCrumbs >bc</div>';

	}



	COR.setMenuBreadCrumbs = function( dir ) {

console.log( 'dir', dir );

		var CORbreadCrumbs, dirArray;

		dirArray = dir.split( '/' );

		CORbreadCrumbs =

		'<h3>' +

			'<a href=http://' + DEF.user + '.github.io title="' + DEF.user + ' - ' + tagLine + '" >' + logo + ' ' + DEF.user + '</a> &raquo; ' +
			'<a href=# >' + GET.repo + '</a> &raquo; ' +

		'</h3>';

		for ( var i = 0; i < dirArray.length - 1; i++ ) {

			dirString = dirArray.slice( 0, i + 1 ).join( '/' );

			CORbreadCrumbs += '<h2><a href=#' + dirString + ' >' + dirArray[ i ].replace( /-/g, ' ' ) + '</a> &raquo </h2>';

		}

		CORbreadCrumbs += '<h2><a href=#' + dir + ' >' + dirArray[ i ].replace( /-/g, ' ' ) + '</a></h2>';

		CORdivBreadCrumbs.innerHTML = CORbreadCrumbs;

	};




	COR.getMenuDetailsHeader = function() {

		var menuDetailsHeader =

			'<h3>' +
				'<a href=http://jaanga.github.io/ title="Jaanga - your 3D happy place" > &#x2766 </a> &raquo; ' +
				'<a href=http://jaanga.github.io/templates/ title="your happy mappy place" > Templates </a> &raquo; ' + 
			'</h3>' +
			'<h2>' +
				'<a href="" title="Click here to refresh this page" >' + document.title + '</a> ~ ' +
//				'<a href=index.html#readme.md title="Click here for help and information" > &#x24D8; </a>' +
				'<a href=index.html#readme.md onmouseover=popHelp.style.display=""; onmouseout=popHelp.style.display="none"; > &#x24D8; </a>' +

			'</h2>' +

			COR.taglineHeader +

			'<div class=popUp id=popHelp style=display:none; ><p>Hi there!</p>Click the i-in-circle, info icon for latest updates.</div>' +

		b;

		return menuDetailsHeader;

	};


	COR.getMenuDetailsAbout = function() {

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

	};



	COR.getMenuFooter = function() {

		var footer =

			'<hr>' +

			'<center>' +
				'<a href=javascript:menu.scrollTop=0; style=text-decoration:none; onmouseover=pop2.style.display=""; onmouseout=pop2.style.display="none"; ><h1> &#x2766 <h1></a>' +
			'</center>' +

			'<div class=popUp id=pop2 style=display:none;bottom:100px; >' +
				'Jaanga - your 3D happy place.<br>Click here to return to the top of the page' +
			'</div>' +

		b;

		return footer;

	};


	COR.getMenuDetailsTemplate = function() {

		var menuDetailsTemplate =

			'<details id=detailsTemplate >' +

				'<summary><h3>Template</h3></summary>' +

				'<p id=pTemplate >' +

					'<button > button </button>' + b +

					COR.txt +

			'</p>' +

			'</details>' +

		b;

		return menuDetailsTemplate;

	};




	COR.getMenuDetailsObjectProperties = function( obj ) {

		obj = obj || COR.defaults;

		var menuDetailsObjectProperties =

			'<details> ' +

				'<summary id=MenuSummaryObjectProperties ><h3>Object Properties: ' + ( obj.objectName || '' ) + ' </h3></summary>' +

				'<p>' +
					'<button onclick=properties.innerHTML=COR.getObjectProperties(COR.place); >Get place properties</button> ' +
					'<button onclick=properties.innerHTML=COR.getObjectProperties(); >Get defaults</button> ' +
				'</p>' +

				'<p id=properties ></p>' + b +

			'</details>' +

		'';

		return menuDetailsObjectProperties;

	};




// utils

	COR.getObjectProperties = function( obj ) {

		var keys, txt;
		obj = obj || COR.defaults;

		keys = Object.keys( obj );

		txt = '';

		for ( var i = 0; i < keys.length; i++ ) {

			txt += '<tr><td>' + keys[ i ] + ': </td><td> ' + obj[ keys[ i ] ] + '</td></tr>';

		}

		MenuSummaryObjectProperties.innerHTML = '<h3>Object Properties: ' + ( obj.objectName || '' ) + '</h3>';

		return '<table>' + txt + '</table>';

	}


	COR.requestFile = function( url, callback ) {

		var xhr;

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onload = callback;
		xhr.send( null );

	}
