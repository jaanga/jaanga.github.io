
// DEF.urlGHPages = './terrain3/';

	var RED = RED || {};

	RED.getHeader = function() {

//		return '<span style=display:none; >[You are now in GitHub source code view - click this link to view Read Me file as a web page]' +
//			'( ' + DEF.baseURL + DEF.repo + '/' + DEF.folder + '/index.html "View file as a web page." ) </span>' +
//			'<input type=button onclick=window.location.href="https://github.com/' + DEF.user + '/' + DEF.repo + '/tree/' + DEF.branch + '/' +
//				DEF.folder + '"; value="You are now in GitHub web page view - Click this button to view Read Me file as source code" >' + n + n +

//			'[' + DEF.user + ']( ' + DEF.baseURL + ' ) &raquo; [' + DEF.repo + ']( ' + + DEF.baseURL + '/' + DEF.repo + ' )' + n + n +

//			'[ '+ DEF.searchInFolder.replace( /[-\/]/g, ' ' ) + ' Read Me]( ' + DEF.baseURL + DEF.repo + '/' + DEF.folder + '/#readme.md )' + n +

			return '[ '+ COR.title + ' Read Me]( ' + DEF.urlBase + '#readme.md )' + n +

			'===' + n +
			n +

		'';

	}

	RED.getIframe = function() {

		return '<img src="" style=display:none; width=100% >' + n +
			'<iframe id=ifr srcdoc="<div id=divIfr ></div>"; onload=parent.IFR.onLoad(); width=100% height=560px frameBorder=0 ></iframe>' +
			'<div id=ifrTitle ></div>' + n +
			'***' + n +

		n;

	};


	RED.getFooter = function() {

		return '***' + n +
			n +
			'<center title="' + DEF.user + ' ~ ' + 	DEF.titleTagline + '" >' + n +
			'# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a>' +
			'</center>' + n +
		n;

	};

	RED.getLastModified = function( url ) {
// https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest

		var oReq = new XMLHttpRequest();
		oReq.open("HEAD" /* use HEAD if you only need the headers! */, url);
		oReq.onload = getHeaderTime;
		oReq.send();

		function getHeaderTime () {

//			ifrHeaders.innerHTML = this.getResponseHeader( 'Last-Modified' ) );  // A valid GMTString date or null
			ifrHeaders.innerText = this.getAllResponseHeaders();


		}

	}

	RED.fullScreenChoices = function() {

		if ( DEF.includeFullScreenChoices === false ) { return ''; }

		txt = n + '_Scripts in this group include the following:_' + n;

		for ( var i = 0; i < IFR.sites.length; i++ ) {

			item = IFR.sites[ i ];
			txt += '## Full Screen: [' + item.title + ']( ' + item.fileName + ' )' + n +
				item.txt + n +
			'';
		}

		return txt + '***' + n;

	};


	RED.callback = function( xhr ) {

		RED.readMeBody = xhr.target.responseText;

		var txt =

			RED.getHeader() +

			RED.getIframe() +

			RED.fullScreenChoices( true ) +

			RED.readMeBody +

			RED.getFooter() +

		'';

		COR.contents.innerHTML = COR.converter.makeHtml( txt );

	};


	RED.setReadMe = function ( item ) {

		var txt =

			RED.getHeader() +

			'<iframe id=REDifr src="' + DEF.urlGHPages + item + '"; width=100% height=500px frameBorder=0 onload=onLoadIframe() ></iframe>' +


			n +

				'## full screen: [' + item + ']( ' + DEF.urlGHPages + item + ' )' + n +

				'<div id=ifrTitle ></div>' +
				'<h2 style=margin-bottom:0; >File Headers</h2>' + 
				'<div id=ifrHeaders ></div>' +

			n +


//			RED.fullScreenChoices( true ) +

//			RED.readMeBody +

			RED.getFooter() +

		'';


		onLoadIframe = function() {

			var metas;

			var icw;

			icw = REDifr.contentWindow;

			if ( location.protocol.slice( 0, 4 ) === REDifr.src.slice( 0, 4 )  ) {

				ifrTitle.innerHTML = '<h2 style=margin:0; >' + REDifr.contentDocument.title + '</i></h2>';

				metas = REDifr.contentDocument.getElementsByTagName( 'meta' );

				for ( var i = 0, m; i < metas.length; i++ ) {

					m = metas[ i ];

					switch( m.name ) {

						case 'description':
							ifrTitle.innerHTML += '<h3 style=margin:0; >Description</h3>' + m.content + b; break;

						case 'keywords':
							ifrTitle.innerHTML += '<h3 style=margin:0; >Keywords</h3>' + m.content + b; break;

						case 'date':
//							ifrTitle.innerHTML += '<h3 style=margin:0; >Update</h3>' + m.content + b;
							break;

						default:
							break;

					}

				}

				if( icw.THR ) {

					icw.THR.controls.enableZoom = false;

				}

			} else {

//				ifrTitle.innerHTML = REDifr.src;

			}

			IFR.index ++;

		};

		return COR.converter.makeHtml( txt );

	}