// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/

	var SEL = {};


// init menus

	SEL.getMenuDetailsSelectGroup = function() {

		var menuDetailsSelectGroup =

			'<details id=detailsSelectGroup >' +

				'<summary><h3>Select groups of users</h3></summary>' +

				'<p>' +
					'<select id=selGroup onchange=SEL.setUserDetails(this); title="Select the group of users" size=15 >' +

					USR.groupOptions +

					'</select>' +
				'</p>' +

// add input your own query

				'<p><i>Returns first 100 items found. This limit might be removed.</i></p>' +

				'<details id=apiKey >' +

					'<summary><h4>Set GitHub developers api key</h4></summary>' +

					'<small>If small request, no need for API key</small>' +

					'<p>api key: <input id=inpAPI onclick=this.select(); title="Obtain API key from Google Maps" ></p>' +
					'<p><button onclick=SEL.onEventAPIKeyUpdate(); >Set API key</button></p>' +

				'</details>' +


			'</details>' +

		b;

		return menuDetailsSelectGroup;

	};



	SEL.onEventAPIKeyUpdate = function() {

		SEL.token = 'access_token=' + inpAPI.value;

	};



	SEL.getMenuDetailsSelectUser = function() {

		menuDetailsSelectUser =

			'<details id=detailsSelectPopular open >' +

				'<summary><h3>Select a GitHub user</h3></summary>' +

				'<p>' +
					'<select id=selUser onchange=SEL.getUserDetails(this.value); title="Select the user" size=15 >' +
					'</select>' +
				'</p>' +

				'<p><input placeholder="Enter a user name" onchange=SEL.getUserDetails(this.value); ></p>' +

				'<p id=stats ></p>' +

			'</details>' +

//		'<div id=menuFolderNameTableOfContents ></div>' +

		'<div id=menuUserInfo ></div>' +

		b;

		return menuDetailsSelectUser;

	};


// command from HTML file


	SEL.setUserDetails = function() {



		if ( selGroup.value === 'listTheo' ) {

			selUser.innerHTML = USR.peepsTheo;

			selUser.selectedIndex = 1;

//			SEL.getUserDetails( selUser.value );

		} else if ( location.hash.length ) {

			SEL.getSearchItems();

//			SEL.getUserDetails( location.hash.slice( 1 ) );

		} else {

			SEL.getSearchItems();

		}

	};



	SEL.getSearchItems = function() {

		var url, xhr, response, txt;

		url = 'https://api.github.com/search/repositories?q=' + selGroup.value + '&sort=comments&order=desc&per_page=100&' + ( SEL.token || '' );

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

//				SEL.getUserDetails( selUser.value );

			}

		}

	};


/*
	SEL.getUserDetails = function( user ) {

//console.log( 'user', user );

		location.hash = user;

		DAT.getUserData( user );

		DAT.getRepos( user );

		EVT.requestUserEvents( user )

	}
*/


