
	var RED = RED || {};

	RED.getHeader = function() {

		return '<span style=display:none; >[You are now in GitHub source code view - click this link to view Read Me file as a web page]' +
			'( ' + DEF.baseURL + DEF.repo + '/' + DEF.folder + '/index.html "View file as a web page." ) </span>' +
			'<input type=button onclick=window.location.href="' + DEF.baseURL + DEF.repo + '/tree/' + DEF.branch + '/' +
				DEF.folder + '"; value="You are now in GitHub web page view - Click this button to view Read Me file as source code" >' + n + n +

			'[' + DEF.user + ']( ' + DEF.baseURL + ' ) &raquo; [' + DEF.repo + ']( ' + + DEF.baseURL + '/' + DEF.repo + ' )' + n + n +

			'[ '+ DEF.title + ' Read Me]( ' + DEF.baseURL + DEF.repo + '/' + DEF.folder + '/#readme.md )' + n +
			'===' + n +
			n +

			'<img src="" style=display:none; width=100% >' + n +
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

// console.log( '', xhr );

		RED.readMeBody = xhr.target.responseText;

		var txt =

			RED.getHeader() +

			RED.fullScreenChoices( true ) +

			RED.readMeBody +

			RED.getFooter() +

		'';

		COR.contents.innerHTML = COR.converter.makeHtml( txt );

	};
