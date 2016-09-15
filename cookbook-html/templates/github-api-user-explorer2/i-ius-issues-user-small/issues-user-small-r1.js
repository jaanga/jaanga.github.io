// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/
// https://developer.github.com/v3/issues/

	var IUS = IUS || {};

	IUS.getMenuDetailsRepositoryEvents = function() {

		IUS.target = updates;

		var menuDetailsRepositoryEvents =

			'<details id=IUSdetailsRepositoryEvents >' +

				'<summary id=IUSsummaryRepositoryEvents ><h3>repository events</h3></summary>' +

				'<div id=IUSrepositoryEvents ></div>' +

			'</details>' + b +

		'';

		return menuDetailsRepositoryEvents;

	}


	IUS.getGitHubAPIUserIssues = function() {

		var updates, update, txt;
		var converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });

		IUS.urlIssues = 'https://api.github.com/search/issues?q=user:' +  IUS.user;

		COR.requestFile( IUS.urlIssues, callback );

		function callback( xhr ) {

			updates = JSON.parse( xhr.target.responseText );

			txt = '<h1>' + IUS.user + ' Issues </h1>';

			for ( var i = 0; i < updates.items.length; i++ ) {

				update = updates.items[ i ];

				txt += '<h2><a href=' + update.html_url + ' >' + update.title + '</a></h2>' +
					'<div class=update >' + converter.makeHtml( update.body ) + '</div>';

			}

			IUS.target.innerHTML = txt;

		}

	}

