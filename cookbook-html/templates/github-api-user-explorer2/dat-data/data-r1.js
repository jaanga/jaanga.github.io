// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/

	var DAT = {};

	DAT.get = {};
	DAT.currentTopic = 'repos';


	DAT.getMenuDetailsUserData = function() {

		var menuDetailsUserData =

			'<details id=detailsTemplate open >' +

				'<summary><h3>User data</h3></summary>' +

				'<p id=pUserData ></p>' +

				'<div><small>Item order as sent by GitHub. The display of content is a WIP.</small></div>' +

			'</details>' +

		b;

// other units

		DAT.target = contents;

//

		return menuDetailsUserData;

	};



	DAT.getUserData = function( user ) {

		var url, xhr, keys, txt;

		url = 'https://api.github.com/users/' +  user + '?' + ( SEL.token || '' );

		xhr = new XMLHttpRequest();
		xhr.open( 'get', url, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			DAT.userData = JSON.parse( xhr.responseText );

			if ( DAT.userData.message ) {

				menuUserInfo.innerHTML = DAT.userData.message;

				return;

			}

			keys = Object.keys( DAT.userData );
			txt = '';

			for ( var i = 0; i < keys.length; i++ ) {

				txt += '<div>' + ( DAT.get[ keys[ i ] ]( DAT.userData[ keys[ i ] ] ) || '' ) + '</div>';

			}

			pUserData.innerHTML = txt;

		}

	}


// in alphabetical order


	DAT.get.avatar_url = function( item ) {

		return '<img src=' + item + ' width=280; >';

	};

	DAT.get.bio = function( item ) {

		if ( item ) { return 'Bio: ' + item; }

	};


	DAT.get.blog = function( item ) {

		if ( item ) {

			if ( item.includes( 'http' ) || item.includes( '.com' )  ) {

				return 'Blog: <a href=' + item + ' > ' + item + ' </a>';

			} else {

				return 'Blog: ' + item;

			}

		}

	};


	DAT.get.collaborators = function( item ) {

//		return 'collaborators: <a href=' + DAT.userData.collaborators + ' >' + item + '</a>';

	};


	DAT.get.company = function( item ) {

		if ( item ) {

			if ( item.includes( 'http' ) || item.includes( '.com' )  ) {

				return 'Company: <a href=' + item + ' > ' + item + ' </a>';

			} else {

				return 'Company: <a href=https://www.google.com/#q=' + item.replace( / /g, '+' ) + ' > ' + item + ' </a>';

			}

		}

	};


	DAT.get.created_at = function( item ) {

		return 'Joined: ' + ( new Date( item ) ).toLocaleDateString();

	};


	DAT.get.disk_usage = function( item ) {

//		return 'disk_usage: <a href=' + DAT.userData.disk_usage + ' >' + item + '</a>';

	};


	DAT.get.email = function( item ) {

		if ( item ) { return 'Email: <a href=mailto:' + item + ' > ' + item + ' </a>'; }

	};


	DAT.get.events_url = function( item ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/events"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.getEvents("' + DAT.userData.login + '",page,contents); > events </button> ' +
			'<a href=https://github.com/' + DAT.userData.login + '?tab=activity >activity</a>';

	};


	DAT.get.followers = function( item ) {

		return '<button onclick=DAT.getRawData("' + DAT.userData.followers_url + '"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.sendMessage("Followers"); > followers </button> ' +
			'<a href=https://github.com/' + DAT.userData.login + '/followers >' + item + ' followers </a>';

	};

	DAT.get.followers_url = function( item ) {

//		return 'Followers: ' + item;

	};


	DAT.get.following = function( item ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/following"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.sendMessage("Following"); > following </button> ' +
			'<a href=https://github.com/' + DAT.userData.login + '/following >' + item + ' following</a>';

	};


	DAT.get.following_url = function( item ) {

//		return 'Following: ' + item;

	};


	DAT.get.gists_url = function( item ) {

//		return 'Gists: ' + item;

	};


	DAT.get.gravatar_id = function( item ) {

		if ( item ) { return 'Gravater ID: ' + item; }

	};


	DAT.get.html_url = function( item ) {

//		return 'html url: ' + item;

	};


	DAT.get.hireable = function( item ) {

		if ( item ) { return 'Hireable: ' + item; }

	};


	DAT.get.id = function( item ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/user/' + item + '"); > raw </button> ' +
			'<button class=butt2 onclick=DAT.getObjectProperties("https://api.github.com/user/' + item + '"); > id </button> ' +
			item.toLocaleString();

	};


	DAT.get.location = function( item ) {

		if ( item ) {

			return 'Location: <a href=https://www.google.com/#q=' + item.replace( / /g, '+' ) + '+' + DAT.userData.login + '&nfpr=1 > ' + item + ' </a>';

		}

	};


	DAT.get.login = function( item ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + item + '"); > raw </button> ' +
			'<button class=butt2 onclick=DAT.getObjectProperties("https://api.github.com/users/' + item + '"); > login </button> ' +
			'<a href=' + DAT.userData.html_url + ' >' + item + '</a>';

	};


	DAT.get.name = function( item ) {

		if ( item ) { return 'Name: <a href=https://www.google.com/#q=' + item.replace( / /g, '+' ) + '+github > ' + item + ' </a>'; }

	};


	DAT.get.organizations_url = function( item ) {

		if ( DAT.userData.type === "Organization" ) { return; }

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/orgs"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.getOrgs("' + DAT.userData.login + '"); > organizations </button> ' +
			'<a href=https://github.com/' + DAT.userData.login + '?tab=organizations > orgs </a>';
//		return 'Orgs: <a href=https://api.github.com/users/' + DAT.userData.login + '/orgs >orgs</a>';

	};


	DAT.get.owned_private_repos = function( item ) {

//		return 'Owned_private_repos: <a href=' + DAT.userData.owned_private_repos + ' >' + item + '</a>';

	};


	DAT.get.plan = function( item ) {

//		return 'plan: <a href=' + DAT.userData.plan + ' >' + item + '</a>';

	};


	DAT.get.private_gists = function( item ) {

//		return 'Private_gists: <a href=' + DAT.userData.private_gists + ' >' + item + '</a>';

	};


	DAT.get.public_repos = function( item ) {

//		return 'Public repos: <a href=' + DAT.userData.repos_url + ' >' + item + '</a>';

	};


	DAT.get.public_gists = function( item ) {

		return  '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/gists"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.getGists("' + DAT.userData.login + '"); > gists </button> ' +
			'<a href=https://gist.github.com/' + DAT.userData.login + ' >' + item + ' gists </a>';

	};


	DAT.get.repos_url = function( item ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/repos"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.getRepos("' + DAT.userData.login + '"); > repos </button> ' +
			'<a href=https://github.com/' + DAT.userData.login + '?tab=repositories >' + DAT.userData.public_repos + ' repos</a>';

	};


	DAT.get.received_events_url = function( item ) {

		return '<button onclick=DAT.getRawData("' + DAT.userData.received_events_url + '"); > raw </button> ' +
//			'<button  class=butt2 onclick=DAT.sendMessage("Receivedevents"); > received events </button> ';
			'<button onclick=DAT.getObjectProperties("' + DAT.userData.received_events_url + '"); > received events </button> ';
//		return 'Received Events: <a href=' + DAT.userData.received_events_url + ' >received events</a>';

	};


	DAT.get.starred_url = function( item ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/starred"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.getObjectProperties("https://api.github.com/users/' + DAT.userData.login + '/starred"); > starred </button> ' +
			'<a href=https://github.com/stars/' + DAT.userData.login + ' >stars</a>';

	};


	DAT.get.subscriptions_url = function( item ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/subscriptions"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.getObjectProperties("https://api.github.com/users/' + DAT.userData.login + '/subscriptions"); > subscriptions </button> ';

	};


	DAT.get.site_admin = function( item ) {

		if ( item ) { return 'Site admin: ' + item; }

	};


	DAT.get.total_private_repos = function( item ) {

//		return 'total_private_repos: <a href=' + DAT.userData.total_private_repos + ' >' + item + '</a>';

	};


	DAT.get.type = function( item ) {

		return 'Type: ' + item;

	};


	DAT.get.updated_at = function( item ) {

		var date = new Date( item );

		return 'Updated: <a href=https://github.com/' + DAT.userData.login + '?tab=overview&from=' +
			item.slice( 0, 10 ) + ' > ' + date.toLocaleDateString() + ' </a>';

	};


	DAT.get.url = function( item ) {

//		return 'url: ' + item;

	};




	DAT.getRawData = function( url ) {

		var xhr;

		urlToken = url + '?' + ( SEL.token || '' );

		xhr = new XMLHttpRequest();
		xhr.open( 'get', urlToken, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			window.scrollTo( 0, 0 );

			DAT.target.innerText = '\nURL sent: ' + url + '\n\nGitHub API Response:\n\n' + xhr.response;

		}

	}


	DAT.getObjectProperties = function( url ) {

		var xhr, obj, keys, txt;

		urlToken = url + '?' + ( SEL.token || '' );

		xhr = new XMLHttpRequest();
		xhr.open( 'get', urlToken, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			window.scrollTo( 0, 0 );

			obj = JSON.parse( xhr.responseText );

			keys = Object.keys( obj );
			txt = '<h1>url: ' + url + '</h1>' + b + b;

			for ( var i = 0; i < keys.length; i++ ) {

				txt += '<tr><td>' + keys[ i ] + ': </td><td> ' + obj[ keys[ i ] ] + '</td></tr>';

			}

			DAT.target.innerHTML = '<table>' + txt + '</table>';

		}

	};


	DAT.sendMessage = function( message ) {

		var txt;

		txt = message || '';

		DAT.target.innerHTML = '<h2>' + txt + ' feature not yet implemented</h2>' ;

		window.scrollTo( 0, 0 );

	};




	DAT.getOrgs = function( user ) {

		var fileName, xhr, response, orgs, txt;

		fileName = 'https://api.github.com/users/' + user + '/orgs?' + ( SEL.token || '' );

		DAT.currentTopic = 'orgs';

		xhr = new XMLHttpRequest();
		xhr.open( 'get', fileName, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			orgs = JSON.parse( xhr.responseText );

//console.log( 'orgs', orgs );

			txt = '<h2>' + DAT.userData.login + ' Organizations</h2>';

			for ( var i = 0; i < orgs.length; i++ ) {

				org = orgs[ i ];

				txt += '<h3><a href=https://github.com/' + org.login + ' >' + org.login + '</a></h3>' +

					'<p>' + org.description + '</p>';

			}

			contents.innerHTML = txt;

		}

	}

	DAT.getGists = function( user ) {

		var fileName, xhr, gists, txt;

		fileName = 'https://api.github.com/users/' + user + '/gists' + '?sort=updated&order=desc&per_page=100&' + ( SEL.token || '' );

		DAT.currentTopic = 'gists';

		xhr = new XMLHttpRequest();
		xhr.open( 'get', fileName, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			gists = JSON.parse( xhr.responseText );

			txt = '<h2>' + DAT.userData.login + ' Gists</h2>';

			for ( var i = 0; i < gists.length; i++ ) {

				gist = gists[ i ];
				txt += '<h3><a href=' + gist.html_url + ' >' + gist.description + '</a></h3>' +
					'<p>' + gist.updated_at.slice( 0, 10 ) + '</p>';

			}

			contents.innerHTML = txt;

		}

	}

	DAT.getRepos = function( user ) {

		var fileName, xhr, repos, txt;

		fileName = 'https://api.github.com/users/' + user + '/repos' + '?sort=updated&order=desc&per_page=100&' + ( SEL.token || '' );

		SEL
		xhr = new XMLHttpRequest();
		xhr.open( 'get', fileName, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			repos = JSON.parse( xhr.responseText );

//console.log( 'repos', repos );

			if ( repos.message ) {

				contents.innerHTML = repos.message;

				return;

			}

			txt = '<h1>' + user + ' Repositories</h1>';

			for ( var i = 0; i < repos.length; i++ ) {

				repo = repos[ i ];

				txt += 

					'<h3>' +

						( i + 1 ) + ' <a href=' + repo.html_url + ' >' + repo.name + '</a>' +
						( repo.fork === true ? ' ~ fork ~ ' : ' ~ ' ) +
						'forks: ' + repo.forks.toLocaleString() + ' ~ ' +
						'stars: ' + repo.watchers.toLocaleString() + ' ~ ' +
						'issues: ' + repo.open_issues.toLocaleString() +

					'</h3>' +

					'<p>' + repo.updated_at.slice( 0, 10 ) + ' ~ ' + repo.description + '</p>';

			}

			contents.innerHTML = txt;

		}

	}
