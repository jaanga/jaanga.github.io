// Copyright &copy; 2016 Jaanga authors


	function getMenuDetailsSelectGroup() {

		var menuDetailsSelectGroup =

			'<details id=detailsSelectGroup >' +

				'<summary><h3>Select Group</h3></summary>' +

				'<p>' +
					'<select id=selGroup onchange=setGroupDetails(this); title="Select the group of users" size=15 >' +
					groupOptions +
					'</select>' +
				'</p>' +

				'<p><i>Returns only the first 100 items found. This limit will be removed.</i></p>' +


				'<details id=apiKey >' +

					'<summary><h4>Set GitHub developers api key</h4></summary>' +

					'<small>If small request, no need for API key</small>' +

					'<p>api key: <input id=inpAPI onclick=this.select(); title="Obtain API key from Google Maps" ></p>' +
					'<p><button onclick=onEventAPIKeyUpdateInit(); >Set API key</button></p>' +

				'</details>' + 


			'</details>' +

		b;

		return menuDetailsSelectGroup;

	}


	function onEventAPIKeyUpdateInit() {

		token = '?token_access=' + inpAPI.value;

	}


	function getMenuDetailsSelectPopular() {

		menuDetailsSelectPopular =

			'<details id=detailsSelectPopular open >' +

				'<summary><h3>Select a GitHub user</h3></summary>' +

				'<p>' +
					'<select id=selUser onchange=getUserDetails(this); title="Select the user" size=15 >' +
					'</select>' +
				'</p>' +

				'<p><input placeholder="Enter a user name" onchange=getUserDetails(this); ></p>' +

				'<p id=stats ></p>' +

			'</details>' +

		'<div id=menuFolderNameTableOfContents ></div>' +

		'<div id=menuUserInfo ></div>' +

		b;

		return menuDetailsSelectPopular;

	}


	function setGroupDetails() {

		if ( selGroup.value === 'listTheo' ) {

			selUser.innerHTML = peepsTheo;

			selUser.selectedIndex = 1;

			getUserDetails( selUser );

		} else {

			getSearchItems()

		}

	}


	function getSearchItems() {

		var url, xhr, response, txt;

		url = 'https://api.github.com/search/repositories?q=' + selGroup.value + '&sort=comments&order=desc&per_page=100';

		xhr = new XMLHttpRequest();
		xhr.open( 'get', url, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			response = JSON.parse( xhr.responseText );

//console.log( 'response', response.items[ 0 ] );

			stats.innerHTML = 'total count: ' + response.total_count.toLocaleString();

			selUser.innerHTML = txt = '';

			for ( var i = 0; i < response.items.length; i++ ) {

				rep = response.items[ i ];

				selUser[ selUser.length ] = new Option( ( i + 1 ) + ' ' + rep.full_name, rep.owner.login );

			}

			selUser.selectedIndex = Math.floor( selUser.length * Math.random() );

			getUserDetails( selUser );

		}

	}

	function getUserDetails( user ) {

//console.log( 'user', user );

		location.hash = user.value;

		getAPIUserData( user.value );

		getRepos( user.value );

		requestGitHubAPIEvents( user.value )

	}