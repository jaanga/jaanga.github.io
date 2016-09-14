// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/

	var SER = SER || {};


// init menus

	SER.getMenuDetailsSelectGroup = function() {

		var menuDetailsSelectGroup =

			'<details id=detailsSelectGroup >' +

				'<summary><h3>Select groups of users</h3></summary>' +

				'<p>' +
					'<select id=selGroup onchange=SER.setUserDetails(this); title="Select the group of users" size=15 >' +

					USR.groupOptions +

					'</select>' +
				'</p>' +

// add input your own query

				'<p><i>Returns first 100 items found. This limit might be removed.</i></p>' +

			'</details>' +

		b;

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

			selUser.selectedIndex = 1;

			SER.getUserDetails( selUser.value );

		} else if ( location.hash.length ) {

			SER.getSearchItems();

			SER.getUserDetails( location.hash.slice( 1 ) );

		} else {

			SER.getSearchItems();

		}



	};



	SER.getSearchItems = function() {

		var url, xhr, response, txt;

		url = 'https://api.github.com/search/repositories?q=' + selGroup.value + '&sort=comments&order=desc&per_page=100&' + ( SER.token || '' );

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

//console.log( 'user', user );

		location.hash = user;

if (window.console) { console.log( 'user', user ); }



/*
		DAT.getUserData( user );

		switch( DAT.currentTopic ) {

			case 'repos':
				DAT.getRepos( user ) 
				break;
			case 'gists':
				DAT.getGists ( user )
				break;
			case 'events':
				DAT.getEvents ( user, 0, contents )
				break;


			default:
				DAT.getRepos( user ) 

		}

//		DAT.getRepos( user );

		EVT.requestUserEvents( user )
*/

	}



