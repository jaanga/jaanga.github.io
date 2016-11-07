// Copyright &copy; 2016 Jaanga authors. MIT License


// also in DEF

	var COR = COR || {};
	var DEF = DEF || {};
	var API = API || {};

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
//		'<a href=http://threejs.org target="_blank">Mr.doob.</a></p>' +


//	COR.txt = '<p>lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</p>';
	COR.txt = '<p>GitHub API responses will appear here.</p>';

	COR.converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });

// and also in DEF


	COR.getMenuBreadCrumbs = function() {

		return '<div id=CORdivBreadCrumbs ></div>';

	}



	COR.setMenuBreadCrumbs = function( dir ) {

//console.log( 'dir', dir );

		var CORbreadCrumbs, dirArray, dirString;

		dirArray = dir === '/' ? [] : dir.split( '/' );

		if ( dirArray.length > 0 ) {

			CORbreadCrumbs =

			'<h3 class=>' +
				'<a href=http://' + DEF.user + '.github.io title="' + DEF.user + ' - ' + DEF.titleTagline + '" >' + DEF.logo + ' ' + DEF.user + '</a> &raquo; ' +
//				'<div id=CORmenuRepo ><a href="" >' + DEF.repo + '</a> &raquo; </div>' +
			'</h3>';

		} else {

			CORbreadCrumbs =

			'<h3>' +
				'<a href=http://' + DEF.user + '.github.io title="' + DEF.user + ' - ' + DEF.titleTagline + '" >' + DEF.logo + ' ' + DEF.user + '</a> &raquo; ' +
			'</h3>' +
			'<h2><a href="" >' + DEF.repo + '</a> &raquo; </h2>';

		}

		for ( var i = 0; i < dirArray.length; i++ ) {

			dirString = dirArray.slice( 0, i + 1 ).join( '/' );

			if ( dirString.endsWith( '.md' ) || dirString.endsWith( '.html' ) ) { continue; }

			CORbreadCrumbs += '<h2 class=CORmenuBreadCrumbs ><a href=#' + dirString + ' >' + dirArray[ i ].replace( /-/g, ' ' ) + '</a> &raquo </h2>';

		}

		COR.title = dirArray.length ? dirArray.pop().replace( /-/g, ' ' ) : DEF.repo;

		CORdivBreadCrumbs.innerHTML = CORbreadCrumbs;

	};



	COR.setMenuBreadCrumbsFolder = function( dir ) {

//console.log( 'dir', dir );

		var CORbreadCrumbs, dirArray, dirString;

		dirArray = dir === '/' ? [] : dir.split( '/' );

		if ( dirArray.length > 0 ) {

			CORbreadCrumbs =

			'<h3 class=>' +
				'<a href=http://' + DEF.user + '.github.io title="' + DEF.user + ' - ' + DEF.titleTagline + '" >' + DEF.logo + ' jaanga </a> &raquo; ' +
//				'<a href=https:// >' + DEF.repo + '</a> &raquo; ' +
			'</h3>';

		} else {

			CORbreadCrumbs =

			'<h3>' +
				'<a href=http://' + DEF.user + '.github.io title="' + DEF.user + ' - ' + DEF.titleTagline + '" >' + DEF.logo + ' ' + DEF.user + '</a> &raquo; ' +
			'</h3>' +
			'<h2 ><a href="" >' + DEF.repo + '</a> &raquo; </h2>';

		}

		for ( var i = 0; i < dirArray.length; i++ ) {

			dirString = dirArray.slice( 0, i + 1 ).join( '/' );

			if ( dirString.endsWith( '.md' ) || dirString.endsWith( '.html' ) ) { continue; }

			CORbreadCrumbs += '<h2><a href=#' + dirString + ' >' + dirArray[ i ].replace( /-/g, ' ' ) + '</a> &raquo </h2>';

		}

		COR.title = dirArray.length ? dirArray.pop().replace( /-/g, ' ' ) : DEF.repo;

		CORdivBreadCrumbs.innerHTML = CORbreadCrumbs;

	};


	COR.getMenuDetailsHeader = function() {

		var menuDetailsHeader =

			'<h3>' +
				'<a href=http://' + DEF.user + '/github.io/ title="' + DEF.user + ' - ' + DEF.titleTagline + '" >' + DEF.logo + '</a> &raquo; ' +
				'<a href=http://' + DEF.user + '.github.io/templates/ title="your happy templates place" > Templates </a> &raquo; ' +
			'</h3>' +
			'<h2>' +
				'<a href="" title="Click here to refresh this page" >' + document.title + '</a> ~ ' +
//				'<a href=' + DEF.urlReadMeFile + ' title="Click here for help and information" > &#x24D8; </a>' +
//				'<a href=' + DEF.urlReadMeFile + ' onmouseover=popHelp.style.display=""; onmouseout=popHelp.style.display="none"; > ' + DEF.logoInfoIcon + ' </a>' +
				'<a href=#README.md onmouseover=popHelp.style.display=""; onmouseout=popHelp.style.display="none"; > ' + DEF.logoInfoIcon + ' </a>' +


			'</h2>' +

			DEF.menuHeaderTagline +

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
					'<a href=jaanga.github.io/license.md >MIT license</a>' +
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
