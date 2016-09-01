
	var usersGet = {};

	function getAPIUserData( user ) {

		var url, xhr, keys;

		url = 'https://api.github.com/users/' +  user;

		menuUserInfo.innerHTML = '';

		xhr = new XMLHttpRequest();
		xhr.open( 'get', url, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			response = JSON.parse( xhr.responseText );
			keys = Object.keys( response );

			for ( var i = 0; i < keys.length; i++ ) {

				menuUserInfo.innerHTML += '<div>' + ( usersGet[ keys[ i ] ]( response[ keys[ i ] ] ) || '' ) + '</div)';

			}

		}

	}

	function getAPIDataToContent( call ) {

		var xhr;

		xhr = new XMLHttpRequest();
		xhr.open( 'get', call, true );
		xhr.onload = callback;
		xhr.send( null );

		contents.innerHTML = '';

		function callback() {

			window.scrollTo( 0, 0 );
			contents.innerText = xhr.response;

		}

	}

	usersGet.login = function( item ) {

		return '<button onclick=getAPIDataToContent("https://api.github.com/users/' + response.login + '"); > raw </button> ' + 
			'<button class=butt2 onclick=sendMesssageToContents("Login"); > login </button> ' + 
			'<a href=' + response.html_url + ' >' + item + '</a>';

	}

	usersGet.id = function( item ) {

		return '<button onclick=getAPIDataToContent("https://api.github.com/user/' + item + '"); > raw </button> ' +
			'<button class=butt2 onclick=sendMesssageToContents("ID"); > id </button> ' + 
			item.toLocaleString();

	}

	usersGet.avatar_url = function( item ) {

		return '<img src=' + item + ' width=280; >';

	}

	usersGet.gravatar_id = function( item ) {

		if ( item ) { return 'Gravater ID: ' + item; }

	}

	usersGet.url = function( item ) {

//		return 'url: ' + item;

	}

	usersGet.html_url = function( item ) {

//		return 'html url: ' + item;

	}

	usersGet.followers_url = function( item ) {

//		return 'Followers: ' + item;

	}

	usersGet.following_url = function( item ) {

//		return 'Following: ' + item;

	}

	usersGet.gists_url = function( item ) {

//		return 'Gists: ' + item;

	}

	usersGet.starred_url = function( item ) {

		return '<button onclick=getAPIDataToContent("https://api.github.com/users/' + response.login + '/starred"); > raw </button> ' + 
			'<button  class=butt2 onclick=sendMesssageToContents("starred"); > starred </button> ' + 
			'<a href=https://github.com/stars/' + response.login + ' >stars</a>';

	}

	usersGet.subscriptions_url = function( item ) {

		return '<button onclick=getAPIDataToContent("https://api.github.com/users/' + response.login + '/subscriptions"); > raw </button> ' +
			'<button  class=butt2 onclick=sendMesssageToContents("Subscriptions"); > subscriptions </button> ';

	}

	usersGet.organizations_url = function( item ) {

		return '<button onclick=getAPIDataToContent("https://api.github.com/users/' + response.login + '/orgs"); > raw </button> ' +
			'<button  class=butt2 onclick=getOrgs("' + response.login + '"); > organizations </button> ';
//		return 'Orgs: <a href=https://api.github.com/users/' + response.login + '/orgs >orgs</a>';

	}

	usersGet.repos_url = function( item ) {

		return '<button onclick=getAPIDataToContent("https://api.github.com/users/' + response.login + '/repos"); > raw </button> ' + 
			'<button  class=butt2 onclick=getRepos("' + response.login + '"); > repos </button> ' +
			'<a href=https://github.com/' + response.login + '?tab=repositories >' + response.public_repos + ' repos</a>';

	}

	usersGet.events_url = function( item ) {

		return '<button onclick=getAPIDataToContent("https://api.github.com/users/' + response.login + '/events"); > raw </button> ' + 
			'<button  class=butt2 onclick=getEvents("' + response.login + '",page,contents); > events </button> ' + 
			'<a href=https://github.com/' + response.login + '?tab=activity >activity</a>';

	}

	usersGet.received_events_url = function( item ) {

		return  '<button onclick=getAPIDataToContent("' + response.received_events_url + '"); > raw </button> ' +
			'<button  class=butt2 onclick=sendMesssageToContents("Receivedevents"); > received events </button> ';
//		return 'Received Events: <a href=' + response.received_events_url + ' >received events</a>';

	}

	usersGet.type = function( item ) {

		return 'Type: ' + item;

	}

	usersGet.site_admin = function( item ) {

		if ( item ) { return 'Site admin: ' + item; }

	}

	usersGet.name = function( item ) {

		if ( item ) { return 'Name: <a href=https://www.google.com/#q=' + item.replace( / /g, '+' ) + '+github > ' + item + ' </a>'; }

	}

	usersGet.company = function( item ) {

		if ( item ) { 

			if ( item.includes( 'http' ) || item.includes( '.com' )  ) {

				return 'Company: <a href=' + item + ' > ' + item + ' </a>';

			} else {

				return 'Company: <a href=https://www.google.com/#q=' + item.replace( / /g, '+' ) + ' > ' + item + ' </a>';

			}

		}

	}

	usersGet.blog = function( item ) {

		if ( item ) { 

			if ( item.includes( 'http' ) || item.includes( '.com' )  ) {

				return 'Blog: <a href=' + item + ' > ' + item + ' </a>';

			} else {

				return 'Blog: ' + item;

			}

		}

	}

	usersGet.location = function( item ) {

		if ( item ) { 

			return 'Location: <a href=https://www.google.com/#q=' + item.replace( / /g, '+' ) + '+' + response.login + '&nfpr=1 > ' + item + ' </a>';

		}

	}

	usersGet.email = function( item ) {

		if ( item ) { return 'Email: <a href=mailto:' + item + ' > ' + item + ' </a>'; }

	}

	usersGet.hireable = function( item ) {

		if ( item ) { return 'Hireable: ' + item; }

	}

	usersGet.bio = function( item ) {

		if ( item ) { return 'Bio: ' + item; }

	}

	usersGet.public_repos = function( item ) {

//		return 'Public repos: <a href=' + response.repos_url + ' >' + item + '</a>';

	}

	usersGet.public_gists = function( item ) {

		return  '<button onclick=getAPIDataToContent("https://api.github.com/users/' + response.login + '/gists"); > raw </button> ' + 
			'<button  class=butt2 onclick=getGists("' + response.login + '"); > gists </button> ';
			'<a href=https://gist.github.com/' + response.login + ' >' + item + ' gists </a>';

	}

	usersGet.followers = function( item ) {

		return '<button onclick=getAPIDataToContent("' + response.followers_url + '"); > raw </button> ' + 
			'<button  class=butt2 onclick=sendMesssageToContents("Followers"); > followers </button> ' +
			'<a href=https://github.com/' + response.login + '/followers >' + item + ' followers </a>';

	}

	usersGet.following = function( item ) {

		return '<button onclick=getAPIDataToContent("https://api.github.com/users/' + response.login + '/following"); > raw </button> ' + 
			'<button  class=butt2 onclick=sendMesssageToContents("Following"); > following </button> ' +
			'<a href=https://github.com/' + response.login + '/following >' + item + ' following</a>';

	}

	usersGet.created_at = function( item ) {

		return 'Joined: ' + ( new Date( item ) ).toLocaleDateString();

	}

	usersGet.updated_at = function( item ) {

		var date = new Date( item );

		return 'Updated: <a href=https://github.com/' + response.login + '?tab=overview&from=' +
			item.slice( 0, 10 ) + ' > ' + date.toLocaleDateString() + ' </a>';

	}


	function onHashChange() {

		hashes = location.hash ? location.hash.split( '#' ) : [ '', selUser.value, 1 ];

		name = hashes[ 1 ];

		page = parseInt( hashes[ 2 ], 10 );

		document.title = name + ' - page ' + page + ' - GitHub API Users Events ';

		for ( var i = 0; i < selUser.options.length; i++ ) {

			if ( selUser.options[ i ].value === name ) { selUser.selectedIndex = i; }

		}

		getAPIUserData( name );

		getEvents( name, page );

	}


	function sendMesssageToContents( message1 ) {

		message = message1 || '';

		contents.innerHTML = '<h2>' + message + ' feature not yet implemented</h2>' ;
 
		window.scrollTo( 0, 0 );

	}


	function getOrgs( user ) {

		var fileName, xhr;

		fileName = 'https://api.github.com/users/' + user + '/orgs';

		xhr = new XMLHttpRequest();
		xhr.open( 'get', fileName, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			orgs = JSON.parse( xhr.responseText );

//console.log( 'orgs', orgs );

			txt = '<h2>' + response.login + ' Organizations</h2>';

			for ( var i = 0; i < orgs.length; i++ ) {

				org = orgs[ i ];

				txt += '<h3><a href=https://github.com/' + org.login + ' >' + org.login + '</a></h3>' + 

					'<p>' + org.description + '</p>';

			}

			contents.innerHTML = txt;

		}

	}

	function getGists( user ) {

		var fileName, xhr;

		fileName = 'https://api.github.com/users/' + user + '/gists';

		xhr = new XMLHttpRequest();
		xhr.open( 'get', fileName, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			gists = JSON.parse( xhr.responseText );

			txt = '<h2>' + response.login + ' Gists</h2>';

			for ( var i = 0; i < gists.length; i++ ) {

				gist = gists[ i ];
				txt += '<h3><a href=' + gist.html_url + ' >' + gist.description + '</a></h3>' + 
					'<p>' + gist.updated_at.slice( 0, 10 ) + '</p>';

			}

			contents.innerHTML = txt;

		}

	}

	function getRepos( user) {

		var fileName, xhr, repos, txt;

		fileName = 'https://api.github.com/users/' + user + '/repos';

		xhr = new XMLHttpRequest();
		xhr.open( 'get', fileName, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			repos = JSON.parse( xhr.responseText );

//console.log( 'repos', repos );

			txt = '<h2>' + response.login + ' Repositories</h2>';

			for ( var i = 0; i < repos.length; i++ ) {

				repo = repos[ i ];

				txt += '<h3><a href=' + repo.html_url + ' >' + repo.name + '</a></h3>' + 

					'<p>' + repo.updated_at.slice( 0, 10 ) + ( repo.fork === true ? ' - fork - ' : ' - ' ) + repo.description + '</p>';

			}

			contents.innerHTML = txt;

		}

	}
