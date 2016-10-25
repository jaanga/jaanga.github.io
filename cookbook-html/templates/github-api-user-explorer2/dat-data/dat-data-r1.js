// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/

	var DAT = {};

	DAT.get = {};

	DAT.userData = undefined; //will hold all the data for current user 

	DAT.currentTopic = 'repos';


	DAT.getMenuDetailsUserData = function() {

		var menuDetailsUserData =

			'<details id=DATdetailsTemplate open >' +

				'<summary><h3>GitHub User Data</h3></summary>' +

				'<div id=DATdivUserData ></div>' + b +

				'<small>' +
					'Item order as sent by GitHub.' + b + 
					'Display of content is a WIP.' + b +
				'</small>' + b +

			'</details>' +

		'';

		return menuDetailsUserData;

	};



// Called from the HTML file 

	DAT.getUserData = function( user ) {

		var url, xhr, keys, txt;

		url = 'https://api.github.com/users/' +  user + '?' + ( API.token || '' );

		COR.requestFile( url, callbackUserData );

		function callbackUserData( xhr ) {

			DAT.userData = JSON.parse( xhr.target.responseText );

			if ( DAT.userData.message ) { // error - probably over rate limit

				DATdivUserData.innerHTML = DAT.userData.message;

				return;

			}

			DAT.keys = Object.keys( DAT.userData );
			txt =  '';

			for ( var i = 0; i < DAT.keys.length; i++ ) {

				txt += '<div>' + ( DAT.get[ DAT.keys[ i ] ]( DAT.userData[ DAT.keys[ i ] ], i ) || '' ) + '</div>';

			}

			DATdivUserData.innerHTML = txt;

		}

	}



// in alphabetical order
// IIRC, there appears to be no published list of the following user fields.
// And thus the following have been gathered by observation


	DAT.get.avatar_url = function( item, index ) {

		return '<a href=https://avatars.githubusercontent.com/u/' + DAT.userData.id + ' target=_blank ><img src=' + item + ' width=280; ><a>';

	};


	DAT.get.bio = function( item, index ) {

		if ( item ) { return 'Bio: ' + item; }

	};


	DAT.get.blog = function( item, index ) {

		if ( item ) {

			if ( item.includes( 'http' ) || item.includes( '.com' )  ) {

				return 'Blog: '+ item.link( item );

			} else {

				return 'Blog: ' + item;

			}

		}

	};


	DAT.get.collaborators = function( item, index ) {

		if ( item ) { return 'collaborators: ' + item( DAT.userData.collaborators ); }

	};


	DAT.get.company = function( item, index ) {

		if ( item ) {

			if ( item.includes( 'http' ) || item.includes( '.com' )  ) {

				return 'Company: ' + item.link( item );

			} else {

				return 'Company: <a href=https://www.google.com/#q=' + item.replace( / /g, '+' ) + ' target=_blank > ' + item + ' </a>';

			}

		}

	};


	DAT.get.created_at = function( item, index ) {

		return 'Joined: ' + ( new Date( item ) ).toLocaleDateString();

	};


	DAT.get.disk_usage = function( item, index ) {

		if ( item ) { return 'disk_usage: ' + item( DAT.userData.disk_usage ); }

	};


	DAT.get.email = function( item, index ) {

		if ( item ) { return 'Email: <a href=mailto:' + item + ' > ' + item + ' </a>'; }

	};


	DAT.get.events_url = function( item, index ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/events"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.getEvents("' + DAT.userData.login + '",0); > events </button> ' +
			'<a href=https://github.com/' + DAT.userData.login + '?tab=activity target=_blank >activity</a>';

	};


	DAT.get.followers = function( item, index ) {

		return '<button onclick=DAT.getRawData("' + DAT.userData.followers_url + '"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.getFollowers("' + DAT.userData.login + '",' + index + '); > followers </button> ' +
			'<a href=https://github.com/' + DAT.userData.login + '/followers target=_blank >' + item + ' followers </a>';

	};

	DAT.get.followers_url = function( item, index ) {

// see DAT.get.followers

//		return 'Followers: ' + item;

	};


	DAT.get.following = function( item ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/following"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.getFollowing("' + DAT.userData.login + '"); > following </button> ' +
			'<a href=https://github.com/' + DAT.userData.login + '/following target=_blank >' + item + ' following</a>';

	};


	DAT.get.following_url = function( item, index ) {

// see DAT.get.following

//		return 'Following: ' + item;

	};


	DAT.get.gists_url = function( item, index ) {

// see DAT.get.public_gists

//		return 'Gists: ' + item;

	};


	DAT.get.gravatar_id = function( item, index ) {

		if ( item ) { return 'Gravater ID: ' + item; }

	};



	DAT.get.hireable = function( item, index ) {

		if ( item ) { return 'Hireable: ' + item; }

	};



	DAT.get.html_url = function( item, index ) {

//		return 'html url: ' + item;

	};



	DAT.get.id = function( item, index ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/user/' + item + '");  title="unformatted API data results straight from GitHub" > raw </button> ' +
			'<button class=butt2 onclick=DAT.fetchEventsDrawTable("https://api.github.com/user/' + item + '",' + index + '); title="GitHub API data prettified" > id </button> ' +
			'<a href=https://api.github.com/user/' + item + ' target=_blank >' + item.toLocaleString() + '</a>' +

		'';

	};


	DAT.get.location = function( item, index ) {

		if ( item ) {

			return 'Location: <a href=https://www.google.com/#q=' + item.replace( / /g, '+' ) + '+' + DAT.userData.login + '&nfpr=1 target=_blank > ' + item + ' </a>';

		}

	};


	DAT.get.login = function( item, index ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + item + '"); title="unformatted API data results straight from GitHub" > raw </button> ' +
			'<button class=butt2 onclick=DAT.fetchEventsDrawTable("https://api.github.com/users/' + item + '",' + index + '); title="GitHub API data prettified" > login </button> ' +
			'<a href=' + DAT.userData.html_url + ' title="Link to the data as rendered by GitHub" target=_blank >' + item + '</a>';

	};


	DAT.get.name = function( item, index ) {

//		if ( item ) { return 'Name: ' + item.link( 'https://www.google.com/#q=' + item.replace( / /g, '+' ) + '+github' ); }

		if ( item ) {

			return 'name: <a href=https://www.google.com/#q=' + item.replace( / /g, '+' ) + '+github target=_blank > ' + item + ' </a>';

		}

	};


	DAT.get.organizations_url = function( item, index ) {

		if ( DAT.userData.type === "Organization" ) { return; }

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/orgs"); > raw </button> ' +

			'<button  class=butt2 onclick=DAT.getOrgs("' + DAT.userData.login + '"); > organizations </button> ' +

			'<a href=https://github.com/' + DAT.userData.login + '?tab=organizations target=_blank> orgs </a>';


//		return 'Orgs: <a href=https://api.github.com/users/' + DAT.userData.login + '/orgs >orgs</a>';

	};


	DAT.get.owned_private_repos = function( item, index ) {

//		return 'Owned_private_repos: <a href=' + DAT.userData.owned_private_repos + ' >' + item + '</a>';

	};


	DAT.get.plan = function( item, index ) {

//		return 'plan: <a href=' + DAT.userData.plan + ' >' + item + '</a>';

	};


	DAT.get.private_gists = function( item, index ) {

//		return 'Private_gists: <a href=' + DAT.userData.private_gists + ' >' + item + '</a>';

	};


	DAT.get.public_repos = function( item, index ) {

//		return 'Public repos: <a href=' + DAT.userData.repos_url + ' >' + item + '</a>';

	};


	DAT.get.public_gists = function( item, index ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/gists"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.getGists("' + DAT.userData.login + '"); > gists </button> ' +
			'<a href=https://gist.github.com/' + DAT.userData.login + ' target=_blank >' + item + ' gists </a>';

	};


	DAT.get.repos_url = function( item, index ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/repos"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.getRepos("' + DAT.userData.login + '"); > repos </button> ' +
			'<a href=https://github.com/' + DAT.userData.login + '?tab=repositories target=_blank >' + DAT.userData.public_repos + ' repos</a>';

	};


	DAT.get.received_events_url = function( item, index ) {

		return '<button onclick=DAT.getRawData("' + DAT.userData.received_events_url + '"); > raw </button> ' +
			'<button  class=butt2 onclick=DAT.getReceivedEvents("' + DAT.userData.login + '"); > received events </button> ';
//			'<button onclick=DAT.fetchEventsDrawTable("' + DAT.userData.received_events_url + '"); target=_blank > received events </button> ';
//		return 'Received Events: <a href=' + DAT.userData.received_events_url + ' >received events</a>';

	};


	DAT.get.starred_url = function( item, index ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/starred"); > raw </button> ' +
//			'<button  class=butt2 onclick=DAT.fetchEventsDrawTable("https://api.github.com/users/' + DAT.userData.login + '/starred"); > starred </button> ' +
			'<button  class=butt2 onclick=DAT.getStarred("' + DAT.userData.login + '",' + index + '); > starred </button> ' +

			'<a href=https://github.com/stars/' + DAT.userData.login + ' target=_blank >stars</a>';

	};


	DAT.get.subscriptions_url= function( item, index ) {

		return '<button onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/subscriptions"); > raw </button> ' +
//			'<button  class=butt2 onclick=DAT.fetchEventsDrawTable("https://api.github.com/users/' + DAT.userData.login + '/starred"); > subscriptions </button> ' +
			'<button  class=butt2 onclick=DAT.getSubscriptions("' + DAT.userData.login + '"); target=_blank > subscriptions </button> ' +

//			'<a href=https://github.com/stars/' + DAT.userData.login + ' >stars</a>';
			'';
	};


	DAT.get.site_admin = function( item, index ) {

		if ( item ) { return 'Site admin: ' + item; }

	};


	DAT.get.total_private_repos = function( item, index ) {

//		return 'total_private_repos: <a href=' + DAT.userData.total_private_repos + ' >' + item + '</a>';

	};


	DAT.get.type = function( item, index ) {

		return 'Type: ' + item;

	};


	DAT.get.updated_at = function( item, index ) {

		var date = new Date( item );

		return 'Updated: <a href=https://github.com/' + DAT.userData.login + '?tab=overview&from=' +
			item.slice( 0, 10 ) + ' target=_blank > ' + date.toLocaleDateString() + ' </a>';

	};


	DAT.get.url = function( item, index ) {

//		return 'url: ' + item;

	};


	DAT.get.watchers = function( item, index ) {

//		return 'url: ' + item;

	};



// for all the 'raw' buttons in the left column

	DAT.getRawData = function( url ) {

		var xhr, urlToken;

		urlToken = url + '?' + ( API.token || '' );

		COR.requestFile( urlToken, callback );

		function callback( xhr ) {

			COR.contents.innerText = '\nURL sent: ' + url + '\n\nGitHub API Response:\n\n' + xhr.target.response;

			window.scrollTo( 0, 0 );

		}

	}


// 

	DAT.fetchEventsDrawTable = function( url, index ) {

		var xhr, obj, keys, txt;

		urlToken = url + '?' + ( API.token || '' );

		COR.requestFile( urlToken, callback );

		function callback( xhr ) {

			obj = JSON.parse( xhr.target.responseText );

			keys = Object.keys( obj );

			txt = 

				'<h1>' + 
					DAT.userData.type + ': ' + DAT.userData.login.link( DAT.userData.html_url ) + ' ' + ( DAT.keys[ index ] || '' ) + 
				'</h1>' +

				'raw url: <a href=' + url + ' target="_blank" >' + url + '</a>' + b +

			b;

			for ( var i = 0; i < keys.length; i++ ) {

				txt += '<tr><td>' + keys[ i ] + ': </td><td> ' + obj[ keys[ i ] ] + '</td></tr>';

			}

			COR.contents.innerHTML = '<table>' + txt + '</table>' + COR.getMenuFooter();

			window.scrollTo( 0, 0 );

		}

	};


	DAT.xxxsendMessage = function( message ) {

		var txt;

		txt = message || '';

		COR.contents.innerHTML = '<h2>' + txt + ' feature not yet implemented</h2>' ;

		window.scrollTo( 0, 0 );

	};


	DAT.getFollowers = function( user, index ) {

		var url, urlToken, xhr, response, followers , txt;

		url = 'https://api.github.com/users/' + user + '/followers';

		urlToken = url + '?' + ( API.token || '' );

//		DAT.currentTopic = 'followers ';

		COR.requestFile( url, callback );

		function callback( xhr ) {

			followers  = JSON.parse( xhr.target.responseText );

//console.log( 'followers ', followers  );

			if ( followers.message ) { // there's been an error...

				COR.contents.innerHTML = followers.message;

				return;

			}

			txt = '<h1>' + DAT.userData.type + ': ' + user.link( DAT.userData.html_url ) + ' followers</h1>' +
				'raw url:  ' + ( url ).link( url  );

			for ( var i = 0; i < followers.length; i++ ) {

				follower = followers[ i ];

//console.log( 'follower', follower );

				txt += 

					'<h3>' +

						( i + 1 ) + ' ' + follower.login.link( 'https://github.com/' + follower.login ) + b +

						'<img src=' + follower.avatar_url + ' width=180 >' +

					'</h3>' +

					'<div>' + 
						'following'.link( follower.html_url + '?tab=following' ) + 
						' followers'.link( follower.html_url + '?tab=followers' ) + 
					'</div>';

			}

			if ( DAT.userData.type === "Organization" ) {

				var url1 = 'https://github.com/orgs/' + DAT.userData.login + '/people';
				var url2 = 'https://api.github.com/orgs/' + DAT.userData.login + '/public_members';

				txt += '<p>Organizations usually have no followers unless they were converted over from a user repository.</p>' + 

					'<p>See people: ' + url1.link( url1 ) + '</p>' +
					'<p>See API public_members: ' + url2.link( url2 ) + '</p>' +

				'';

			}

			COR.contents.innerHTML = txt + COR.getPageFooter();

			window.scrollTo( 0, 0 );

		}

	}


	DAT.getFollowing = function( user ) {

		var url, urlToken, xhr, response, followings, following, txt;

		url = 'https://api.github.com/users/' + user + '/following';

		urlToken = url + '?' + ( API.token || '' );

//		DAT.currentTopic = 'followings ';

		COR.requestFile( url, callback );

		function callback( xhr ) {

			followings = JSON.parse( xhr.target.responseText );

//console.log( 'followings ', followings  );

			if ( followings.message ) { // there's been an error...

				COR.contents.innerHTML = followings.message;

				return;

			}

			txt = '<h1>' + DAT.userData.type + ': ' + user.link( DAT.userData.html_url )  + ' following</h1>' +
				'raw url:  ' + ( url ).link( url );


			for ( var i = 0; i < followings.length; i++ ) {

				following = followings[ i ];

//console.log( 'following', following );

				txt += 

					'<h3>' +

						( i + 1 ) + ' ' + following.login.link( 'https://github.com/' + following.login ) + b +

						'<img src=' + following.avatar_url + ' width=180 >' +

					'</h3>' +

					'<div>' + 
						'following'.link( following.html_url + '?tab=following' ) + 
						' followings'.link( following.html_url + '?tab=following' ) + 
					'</div>';

			}

			if ( DAT.userData.type === "Organization" ) {

//				url1 = 'https://github.com/orgs/' + DAT.userData.login + '/people';
//				url2 = 'https://api.github.com/orgs/' + DAT.userData.login + '/public_members';

				txt += '<p>Organizations usually do not follow others unless they were converted over from a user repository.</p>' + 

//					'<p>See people: ' + url1.link( url1 ) + '</p>' +
//					'<p>See API public_members: ' + url2.link( url2 ) + '</p>' +

				'';

			}

			COR.contents.innerHTML = txt + COR.getPageFooter();

			window.scrollTo( 0, 0 );

		}

	}


	DAT.getGists = function( user ) {

		var url, urlToken, gists, gist, txt;

		url = 'https://api.github.com/users/' + user.link( DAT.userData.html_url ) + '/gists' + '?sort=updated&order=desc&per_page=100';

		urlToken = url + '&' + ( API.token || '' );

		DAT.currentTopic = 'gists';

		COR.requestFile( urlToken, callback );

		function callback( xhr ) {

			gists = JSON.parse( xhr.target.responseText );

//console.log( 'gists', gists );


			txt = '<h1>' + DAT.userData.type + ': ' + user + ' gists</h1>' +
				'raw url:  ' + ( url ).link( url );


			for ( var i = 0; i < gists.length; i++ ) {

				gist = gists[ i ];
				txt += '<h3>' + 
							( gist.updated_at.slice( 0, 10 ) + ' ~ ' + gist.description ).link( gist.html_url ) + 
				'</h3>' +

				'<div id=gist' + i + ' style=max-height:300px;overflow:auto; >' + 
				'</div>';

				DAT.getGist( gist.id, i )

			}

			if ( DAT.userData.type === "Organization" ) {

				txt += '<p>Organizations usually do not have gists unless they were converted to an organization after having been a user repository.</p>';

			}

			COR.contents.innerHTML = txt + COR.getPageFooter();

			window.scrollTo( 0, 0 );

		}

	}



	DAT.getGist = function( id, index ) {

		var fileName, xhr, gist;

		url = 'https://gist.githubusercontent.com/' + DAT.userData.login + '/' + id + '/raw';

		COR.requestFile( url, callback );

		function callback( xhr ) {

			gist = xhr.target.responseText;

			element = document.getElementById( 'gist' + index );
			element.innerText = gist;

		}

	}


	DAT.getOrgs = function( user ) {

		var url, xhr, response, orgs, txt;

		url = 'https://api.github.com/users/' + user + '/orgs?' + ( API.token || '' );

		DAT.currentTopic = 'orgs';

		COR.requestFile( url, callback );

		function callback( xhr ) {

			orgs = JSON.parse( xhr.target.responseText );

//console.log( 'orgs', orgs );

			if ( orgs.message ) { // there's been an error...

				COR.contents.innerHTML = orgs.message;

				return;

			}

			txt = '<h1>user: ' + user.link( DAT.userData.html_url ) + ' organizations</h1>' +
				'raw url: ' + url.link( url );

			for ( var i = 0; i < orgs.length; i++ ) {

				org = orgs[ i ];

//console.log( 'org', org );

				txt += 

					'<h3>' +

						( i + 1 ) + ' ' + ( org.login + b + '<img src=' + org.avatar_url + ' width=180 >' ).link( 'https://github.com/' + org.login ) + 

						b +

					'</h3>' +

					'<div>description: ' + org.description + '</div>';

			}

			COR.contents.innerHTML = txt + COR.getPageFooter();

			window.scrollTo( 0, 0 );

		}

	}


	DAT.getReceivedEvents = function( user ) {

		var url, xhr, response, receivedEvents, txt;

		url = 'https://api.github.com/users/' + user + '/received_events?sort=updated&order=desc&per_page=100';

		urlToken = url + '&' + ( API.token || '' );

		DAT.currentTopic = 'receivedEvents';

		COR.requestFile( urlToken, callback );

		function callback( xhr ) {

			receivedEvents = JSON.parse( xhr.target.responseText );

//console.log( 'receivedEvents', receivedEvents );

			if ( receivedEvents.message ) { // there's been an error...

				COR.contents.innerHTML = receivedEvents.message;

				return;

			}

			txt = '<h1>' + user.link( DAT.userData.html_url ) + ' received events</h1>' +
				'raw url: ' + url.link( url );

			for ( var i = 0; i < receivedEvents.length; i++ ) {

				receivedEvent = receivedEvents[ i ];

//console.log( 'receivedEvent', receivedEvent );

				txt += 

					'<h3>' +

						( i + 1 ) + ' ' + receivedEvent.created_at.slice( 0, 10 ) + ' ' +

						receivedEvent.type + ' ' + receivedEvent.actor.login.link( 'https://github.com/' + receivedEvent.actor.url ) + b +

						'<img src=' + receivedEvent.actor.avatar_url + ' width=180 >' +

					'</h3>' +

					'<div>' + receivedEvent.repo.name.link( 'https://github.com/' + receivedEvent.repo.name ) + '</div>';

			}

			COR.contents.innerHTML = txt + COR.getPageFooter();

			window.scrollTo( 0, 0 );

		}

	}



	DAT.getRepos = function( user ) {

		var urlToken, xhr, repos, txt;

		url = 'https://api.github.com/users/' + user + '/repos' + '?sort=updated&order=desc&per_page=100';

		urlToken = url + '&' + ( API.token || '' );

		DAT.currentTopic = 'repos';

		COR.requestFile( urlToken, callback );

		function callback( xhr ) {

			repos = JSON.parse( xhr.target.responseText );

//console.log( 'repos', repos );

			if ( repos.message ) {

				COR.contents.innerHTML = repos.message;

				return;

			}

			txt = '<h1>' + DAT.userData.type + ': ' + user.link( DAT.userData.html_url ) + ' repositories </h1>' +
				'raw url: ' + url.link( url );

			for ( var i = 0; i < repos.length; i++ ) {

				repo = repos[ i ];

/*
				txt += 

					'<h3>' +

						( i + 1 ) + ' <a href=' + repo.html_url + ' >' + repo.name + '</a>' +
						( repo.fork === true ? ' ~ fork ~ ' : ' ~ ' ) +
						'forks: ' + repo.forks.toLocaleString() + ' ~ ' +
						'stars: ' + repo.watchers.toLocaleString() + ' ~ ' +
						'issues: ' + repo.open_issues.toLocaleString() +

					'</h3>' +

					'<p>' + repo.updated_at.slice( 0, 10 ) + ' ~ ' + repo.description + '</p>';
*/
			txt += DAT.getRepoInfo( repo, i );

			}

			COR.contents.innerHTML = txt + COR.getPageFooter();

			window.scrollTo( 0, 0 );

		}

	}


	DAT.getStarred = function( user ) {

		var urlToken, starred, keys, txt;

		url = 'https://api.github.com/users/' + user + '/starred?sort=updated&order=desc&per_page=100';

		urlToken = url + '?' + ( API.token || '' );

		COR.requestFile( urlToken, callback );

		function callback( xhr ) {

			window.scrollTo( 0, 0 );

			starred = JSON.parse( xhr.target.responseText );

//console.log( 'starred', starred );

			txt = '<h1>' + DAT.userData.type + ': '+ user.link( DAT.userData.html_url ) + ' starred</h1>' +
				'raw url: ' + url.link( url );

			for ( var i = 0; i < starred.length; i++ ) {

				star = starred[ i ];

/*
				txt +=

					'<h3>' +

						( i + 1 ) + ' ' + star.name.link( star.html_url ) + 
						' stars ' + star.watchers.toLocaleString().link( star.html_url + '/stargazers' ) +
						' forks ' + star.forks.toLocaleString().link( star.html_url + '/network/members' ) +
						' update ' + star.updated_at.slice( 0, 10 ).link( star.html_url + '/pulse' ) +

					'</h3>' +

					'<div>language ' + star.language + ' - open issues ' + star.open_issues + '</div>' +
					'<div>' + star.description + '</div>';
*/

				txt += DAT.getRepoInfo( star, i );

			}

			if ( DAT.userData.type === "Organization" ) {

				txt += '<p>Organizations usually do not have stars unless they were converted to an organization after having been a user repository.</p>';

			}

			COR.contents.innerHTML = '<table>' + txt + '</table>' + COR.getPageFooter();

			window.scrollTo( 0, 0 );

		}

	};


	DAT.getSubscriptions = function( user ) {

		var url, urlToken, subscriptions, keys, txt;

		url = 'https://api.github.com/users/' + user + '/subscriptions?sort=updated&order=desc&per_page=100'
		urlToken = url + '?' + ( API.token || '' );

		COR.requestFile( urlToken, callback );

		function callback( xhr ) {

			subscriptions = JSON.parse( xhr.target.responseText );

//console.log( 'subscriptions', subscriptions );

			txt = '<h1>' + DAT.userData.type + ': ' + user.link( DAT.userData.html_url ) + ' subscriptions</h1>' +
				'raw-url: ' + url.link( url );

			for ( var i = 0; i < subscriptions.length; i++ ) {

				subscription = subscriptions[ i ];

				txt += DAT.getRepoInfo( subscription, i );

			}

			if ( DAT.userData.type === "Organization" ) {

				txt += '<p>Organizations usually do not have subscriptions unless they were converted to an organization after having been a user repository.</p>';

			}

			COR.contents.innerHTML = '<table>' + txt + '</table>' + COR.getPageFooter();

			window.scrollTo( 0, 0 );

		}

	};


	DAT.getRepoInfo = function( repo, index ) {

		return '<h3 style=margin-bottom:0; >' +

			( index + 1 ) + ' ' + repo.name.link( repo.html_url ) + 
			' stars ' + repo.watchers.toLocaleString().link( repo.html_url + '/stargazers' ) +
			' forks ' + repo.forks.toLocaleString().link( repo.html_url + '/network/members' ) +
			' update ' + repo.updated_at.slice( 0, 10 ).link( repo.html_url + '/pulse' ) +

		'</h3>' +

		'<div>language ' + repo.language + ' - open issues ' + repo.open_issues + '</div>' +
		'<div>description: ' + repo.description + '</div>'

		'';

	}
