// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/

	var SER = SER || {};


// init menus

	SER.getMenuDetailsSelectGroup = function() {

		var menuDetailsSelectGroup =

			'<details id=detailsSelectGroup open >' +

				'<summary><h3>Search groups of users</h3></summary>' +

				'<p>' +
					'<select id=selGroup onchange=SER.setUserDetails(this); title="Select the group of users" size=15 >' +

					USR.groupOptions +

					'</select>' +
				'</p>' +

// add input your own query

				'<p>Query: <input id=SERinpQuery placeholder="Enter a search query" onchange=SER.getSearchItems(this.value); style=width:100%; ></p>' +

				'<p><i>Returns first 100 items found. This limit might be removed.</i></p>' +

			'</details>' +

		'';

		return menuDetailsSelectGroup;

	};



	SER.getMenuDetailsSelectUser = function() {

		menuDetailsSelectUser =

			'<details id=detailsSelectPopular open >' +

				'<summary><h3>Select a GitHub user</h3></summary>' +

				'<p>' +
					'<select id=selUser onchange=SER.getUserDetails(this.value); title="Select the user" size=15 >' +
					'</select>' +
				'</p>' +

				'<p><input placeholder="Enter a user name" onchange=SER.getUserDetails(this.value); ></p>' +

				'<p id=stats ></p>' +

			'</details>' +

//		'<div id=menuFolderNameTableOfContents ></div>' +

		'<div id=menuUserInfo ></div>' +

		b;

		return menuDetailsSelectUser;

	};


// command from HTML file


	SER.setUserDetails = function() {

		if ( selGroup.value === 'listTheo' ) {

			selUser.innerHTML = USR.peepsTheo;

			SER.getUserDetails( selUser.value );

		} else if ( location.hash.length ) {

			SER.getSearchItems( selGroup.value );

			SER.getUserDetails( location.hash.slice( 1 ) );

		} else {

			SER.getSearchItems( selGroup.value );

		}

		SERinpQuery.value = selGroup.value;

	};



	SER.getSearchItems = function( query ) {

		var url, xhr, response, txt;

		url = 'https://api.github.com/search/repositories?q=' + query + '&sort=comments&order=desc&per_page=100&' + ( SER.token || '' );

		xhr = new XMLHttpRequest();
		xhr.open( 'get', url, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			response = JSON.parse( xhr.responseText );

			stats.innerHTML = 'total count: ' + response.total_count.toLocaleString();

			selUser.innerHTML = txt = '';

			for ( var i = 0; i < response.items.length; i++ ) {

				rep = response.items[ i ];

				selUser[ selUser.length ] = new Option( ( i + 1 ) + ' ' + rep.full_name, rep.owner.login );

			}

			if ( !location.hash ) {

				selUser.selectedIndex = Math.floor( selUser.length * Math.random() );

				SER.getUserDetails( selUser.value );

			}

		}

	};



	SER.getUserDetails = function( user ) {

		location.hash = user;

		if ( DAT.getUserData ) {

			DAT.getUserData( user );

			switch( DAT.currentTopic ) {

				case 'events':
					DAT.getEvents ( user, 0, contents )
					break;
				case 'gists':
					DAT.getGists ( user )
					break;
				case 'orgs':
					DAT.getOrgs( user ) 
					break;
				case 'repos':
					DAT.getRepos( user ) 
					break;
				case 'stats':
//					EUS.buildStatsReport( user )
					break;
				default:
					DAT.getRepos( user ) 

			}

//		DAT.getRepos( user );

		}

// updates contents and right side
 
		if ( EUS.requestGitHubAPIUserEvents ) {

			EUS.target = updates;
			EUS.requestGitHubAPIUserEvents( user);

		}

	}

