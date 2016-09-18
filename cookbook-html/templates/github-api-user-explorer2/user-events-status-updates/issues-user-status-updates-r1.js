// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/
// https://developer.github.com/v3/issues/

	var EUSU = EUSU || {};

	EUSU.getMenuDetailsUserEvents = function() {

		EUSU.target = updates;

		var menuDetailsUserEvents =

			'<details id=EUSUdetailsRepositoryEvents >' +

				'<summary id=EUSUsummaryRepositoryEvents ><h3>repository events</h3></summary>' +

				'<div id=EUSUrepositoryEvents ></div>' +

			'</details>' + b +

		'';

		return menuDetailsUserEvents;

	}


	EUSU.getGitHubAPEUSUerIssues = function( user ) {

		var updates, update, txt;
		var converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });

		EUSU.urlIssues = 'https://api.github.com/search/issues?q=user:' +  EUSU.user;

		COR.requestFile( EUSU.urlIssues, callback );

		function callback( xhr ) {

			updates = JSON.parse( xhr.target.responseText );

			txt = '<h1>' + EUSU.user + ' Issues </h1>';

			for ( var i = 0; i < updates.items.length; i++ ) {

				update = updates.items[ i ];

				txt += '<h2><a href=' + update.html_url + ' >' + update.title + '</a></h2>' +
					'<div class=update >' + converter.makeHtml( update.body ) + '</div>';

			}

			EUSU.target.innerHTML = txt;

		}

	}

