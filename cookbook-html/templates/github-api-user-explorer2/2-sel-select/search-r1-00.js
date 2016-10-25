// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/

	var SER = SER || {};


// init menus

	SER.getMenuDetailsSelectGroup = function() {

		var menuDetailsSelectGroup =

			'<details id=SELdetailsSelectGroup open title="code here: sel-select.js" >' +

				'<summary><h3>Select types of GitHub users</h3></summary>' +

					'<select id=selGroup onchange=SER.setUserDetails(this); title="Select the group of users" size=15 >' +

						USR.groupOptions +

					'</select>' +

				'<small>Enter your query and press enter: </small>' + b +

				'<input id=SERinpQuery placeholder="Enter a search query" onchange=SER.getSearchItems(this.value); style=width:100%; >' + b +

				b +

//				'<p><i>Returns first 100 items found. This limit might be removed.</i></p>' +

			'</details>' +

		'';

		return menuDetailsSelectGroup;

	};



	SER.getMenuDetailsSelectUser = function() {

		menuDetailsSelectUser =

			'<details id=SELdetailsSelectPopular open >' +

				'<summary><h3>Select GitHub user and repo</h3></summary>' +

				'<select id=selUser onchange=SER.getUserDetails(this.value); title="Select the user" size=15 ></select>' + b +

				b +

				'<input placeholder="Enter a GitHub user name" onchange=SER.getUserDetails(this.value); size=35>' + b +

				b +

				'<div id=SELstats ></div>' + b +

			'</details>' +

//		'<div id=menuFolderNameTableOfContents ></div>' +

		'<div id=menuUserInfo ></div>' +

		'';

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

//		xhr = new XMLHttpRequest();
//		xhr.open( 'get', url, true );
//		xhr.onload = callback;
//		xhr.send( null );

		COR.requestFile( url, callbackSearch );


		function callbackSearch( xhr ) {

			response = JSON.parse( xhr.target.responseText );

			SELstats.innerHTML = 'Github users found with ' + SERinpQuery.value + ' : ' + response.total_count.toLocaleString();

			selUser.innerHTML = txt = '';

			for ( var i = 0; i < response.items.length; i++ ) {

				rep = response.items[ i ];

				selUser[ selUser.length ] = new Option( ( i + 1 ) + ' ' + rep.full_name, rep.owner.login );

			}

			if ( !location.hash ) {

				selUser.selectedIndex = Math.floor( selUser.length * Math.random() );

				SER.getUserDetails( selUser.value );

			} else {

				selGroup.selectedIndex = -1;

				selUser.selectedIndex = -1;

				SER.getUserDetails( location.hash.slice( 1 ) );

			}

		}

	};

	SER.getUserDetails = function() {};


/* see HTML

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

*/
