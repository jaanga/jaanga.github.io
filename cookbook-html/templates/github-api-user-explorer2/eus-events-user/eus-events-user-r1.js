// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/
// https://developer.github.com/v3/activity/events/


	var EUS = EUS || {};

// from: https://developer.github.com/v3/activity/events/types/

	EUS.eventTypes = [ "CommitCommentEvent","CreateEvent","DeleteEvent","DeploymentEvent","DeploymentStatusEvent","DownloadEvent","FollowEvent","ForkEvent","ForkApplyEvent","GistEvent","GollumEvent","IssueCommentEvent","IssuesEvent","MemberEvent","MembershipEvent","PageBuildEvent","PublicEvent","PullRequestEvent","PullRequestReviewCommentEvent","PushEvent","ReleaseEvent","RepositoryEvent","StatusEvent","TeamAddEvent","WatchEvent" ];

	EUS.type = {};
	EUS.dates = [];
	EUS.repos = [];

	EUS.readmeTypes = [ 'README.md', 'readme.md', 'README.markdown', 'README.rst', 'README' ];
	EUS.css = '<style>body { font: 10pt monospace; }</style>\n';

// may not be in use

	EUS.xxxgetMenuDetailsUserEvents = function() {

		EUS.target = updates;

		var menuDetailsUserEvents =

			'<details id=EUSdetailsUserEvents >' +

				'<summary id=EUSsummaryUserEvents ><h3>recent events</h3></summary>' +

				'<div id=EUSUserEvents ></div>' + b +

			'</details>' +

		'';

		return menuDetailsUserEvents;

	};


// Called by HTML. fetches data and draws right column menu
// User: events-user-r1.html
// User github-api-user-explorer2-r1.html

	EUS.requestGitHubAPIUserEvents = function( user ) {

		var urlEvents, event, txt, dates, actor, repo, link, index;

		urlEvents = 'https://api.github.com/users/' + user + '/events?per_page=100&' + ( API.token || '' );

		COR.requestFile( urlEvents, callback )

		function callback( xhr ) {

			EUS.events = JSON.parse( xhr.target.responseText );
			EUS.dates = [];
			EUS.repos = [];
			EUS.user = user;

			if ( EUS.events.message ) { // there's been an error...

				COR.contents.innerHTML = 

					'<h1>' + EUS.events.message + '</h1>' +
					'<p>See: </p>' +
					'<p>' + ("https://github.com/settings/tokens").link( "https://github.com/settings/tokens" ) + '</p>' +
					'<p>' + ('https://developer.github.com/v3/auth/#basic-authentication').link( 'https://github.com/settings/tokens' ) + '</p>' +
				'';

				return;

			}

			txt = '<h2 style=margin-botom:0; >' + user + '</h2>' +
				'<h3 style=margin-bottom:0; >' + EUS.events.length + ' recent user events by date</h3>' +

//				'<button onclick=DAT.currentTopic="stats";window.location.reload(); >show activity statistics</button>' + b;
				'<button onclick=DAT.currentTopic="stats";EUS.requestGitHubAPIUserEvents("' + user + '"); >show events by repository and type</button>' + b +
				'<button onclick=DAT.currentTopic="events";DAT.getEvents("' + DAT.userData.login + '",0); >show events in detail</button>' + b;


			for ( var i = 0; i < EUS.events.length; i++ ) {

				event = EUS.events[ i ];

				if ( !EUS.repos[ event.repo.name ] ) {

					EUS.repos[ event.repo.name ] = { "name" : event.repo.name, "stats" : Array(  EUS.eventTypes.length ).fill( 0 ) };

				}

				date = event.created_at.slice( 0, 10 );

				if ( !EUS.dates.includes( date ) ) {

					EUS.dates.push( date );

					txt += '<h4 style=margin-bottom:0; >' + date + '</h4>';

				}

				if ( user.toLowerCase() !== event.actor.login  ) {

					actor = event.actor.login.link( event.actor.url );

				} else {

					actor = 'repo: ' ;

				}

				repo = event.repo.name;

				link = repo.replace ( user + '/', '' ).link( 'https://github.com/' + repo );

				txt +=

					( i + 1 ) + ' ' + event.created_at.slice( 11, -4 ) + ' ' + actor + ' ' + link + b +
					'<small>' + EUS.type[ 'on' + event.type ]( event ) + '</small>' +

				b;

				index = EUS.eventTypes.indexOf( event.type );

				EUS.repos[ repo ].stats[ index ]++;

			}

			COR.updates.innerHTML = txt;

			if ( DAT.currentTopic === 'stats' ) {

				EUS.buildStatsReport( user );

			}

//console.log( 'repos', EUS.repos );

		}

	};



// Used by center contents
// events-user-r1.html
// github-api-user-explorer2-r1.html

	EUS.buildStatsReport = function( user ) {

		var txt, repoKeys, repo;

console.clear();

		txt =

			'<h1>' + DAT.userData.type + ': ' +
				user.link( DAT.userData.html_url ) +
			'</h1>' +
			'<h2>' + 
				EUS.events.length + ' recent ' + DAT.userData.type + ' events by repository and type' +
			'</h2>' +
			'<div>'+
				'Time period covers ' + EUS.dates.slice( -1 )  + ' to ' + EUS.dates[ 0 ] + ' with ' + EUS.dates.length + ' day(s) of activity' + 
			'</div>' +

		b;

		repoKeys = Object.keys( EUS.repos );

		for ( var i = 0; i < repoKeys.length; i++ ) {

			repoName = EUS.repos[ repoKeys[ i ] ].name;

// can we add type of user here?

			txt += '<h2 style=margin-bottom:0; >User/repo: ' + repoName.link( 'https://github.com/' + repoName ) + '</h2>';

			repo = EUS.repos[ repoKeys[ i ] ];

			txt += '<iframe id=' + repoName + ' height=300 width=100% ></iframe>';

			for ( var j = 0; j < EUS.eventTypes.length; j++ ) {

				if ( repo.stats[ j ] > 0 ) {

					txt += EUS.eventTypes[ j ] + ': ' + repo.stats[ j ] + b;

				}

			}

		}

		for ( i = 0; i < repoKeys.length; i++ ) {

			repoName = EUS.repos[ repoKeys[ i ] ].name;

			EUS.getIframeContents( repoName );

		}

		COR.contents.innerHTML = txt + COR.getPageFooter();

	};



	EUS.getIframeContents= function( repo ) {

		var xhr, user, style;

		user = repo.split( '/' ).shift();

		switch( user ) {

			case 'theo-armour':
			case 'jaanga':
			case 'cynthiaarmour':
//			case 'Abantech':
			case 'fgx':
			case 'jeremytammik':
			case 'webmath':
			case 'lo-th':

				branch = repo.includes( '.github.io' ) ? '/master/' : '/gh-pages/';
				fileName = 'readme.md';
				break;

			default:

				branch = '/master/';
				fileName = 'README.md';
				break;

		}

		EUS.getReadMe( repo, branch, 0 );

	};


	EUS.getReadMe = function( repo, branch, count ) {

		var urlReadMe, xhr, text, item;

		urlReadMe = 'https://rawgit.com/' + repo + branch + EUS.readmeTypes[ count ];

//console.log( '', repo, branch, EUS.readmeTypes[ count ] );

		xhr = new XMLHttpRequest();
		xhr.repo = repo;
		xhr.branch = branch;
		xhr.count = count;
		xhr.open( 'get', urlReadMe, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			if ( xhr.status !== 404 ) {

				text = COR.converter.makeHtml( xhr.responseText );

			} else if ( ++xhr.count < EUS.readmeTypes.length ) {

				EUS.getReadMe( xhr.repo, xhr.branch, xhr.count );

			} else {

				text = 'File not found: ' + xhr.repo + branch + fileName + b +

				branch + ' may not be the correct branch to use here';

			}

			item = document.getElementById( xhr.repo );

			item.srcdoc = EUS.css + COR.converter.makeHtml( text );

		}

	};





	EUS.ccccgetIndexHTML = function( repo ) {

		user = repo.split( '/' ).shift();

		folder = repo.split( '/' ).pop();

		folder = repo.includes( '.github.io' ) ? folder : user + '.github.io/' + folder;

		item = document.getElementById( repo );

// console.log( 'index mmmmmmmmmmmm repo', folder );

		item.src = '//' + folder;

	};




// may not be in use

	EUS.xxxrequestGitHubAPIUserEventsStatusUpdate = function( user ) {

		var xhr;
		var events, event, txt, dates, body;

		var urlEvents = 'https://api.github.com/users/' + user + '/events?per_page=100' + ( API.token || '' );

console.log( 'requestGitHubAPIUserEventsStatusUpdate', user );

		xhr = new XMLHttpRequest();
		xhr.open( 'get', urlEvents, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			events = JSON.parse( xhr.responseText );

			txt = '<h2>' + user + b +'status updates</h2>';

			dates = [];

			for ( var i = 0; i < events.length; i++ ) {

				event = events[ i ];

				if ( event.type !== 'IssuesEvent' ) { continue; }

				if ( dates.indexOf( event.created_at.slice( 0, 10 ) ) === -1 ) {

					dates.push( event.created_at.slice( 0, 10 ) );

					txt += '<h4 style=margin-bottom:0; >' + event.created_at.slice( 0, 10 ) + '</h4>';

				}

				body =  event.payload.issue.body;

				if ( body.length > 800 ) {

					body = body.slice( 0, 800 ) + '</div>more...';

				}

				txt += ( i + 1 ) + ' ' + event.created_at.slice( 11, -4 ) + ' ' + event.repo.name.link( 'https://github.com/' + event.repo.name ) + b +

					'<small>' + event.payload.issue.title.link( event.payload.issue.html_url ) + '</small>' + b +

					'<div class=issue  s>' + COR.converter.makeHtml( body ) + '</div>' +

				'';

			}

			EUS.target.innerHTML = txt;

		}

	};



//

	EUS.type.onCommitCommentEvent = function( event ) { return 'commit comment ' + event.payload.comment.body.slice( 0, 100 ).link( event.payload.comment.html_url ) + '...'; };

	EUS.type.onCreateEvent = function( event ) { return 'create ' + event.payload.master_branch; };

	EUS.type.onDeleteEvent = function( event ) { return 'delete ' + event.payload.ref_type; };

	EUS.type.onDeploymentEvent = function( event ) { return 'DeploymentEvent ' + event.payload ; };

	EUS.type.onDeploymentStatusEvent = function( event ) { return 'DeploymentStatusEvent ' + event.payload ; };

	EUS.type.onDownloadEvent = function( event ) { return 'DownloadEvent ' + event.payload ; };

	EUS.type.onFollowEvent = function( event ) { return 'follow ' + event.payload ; };

	EUS.type.onForkApplyEvent = function( event ) { return 'ForkApplyEvent ' + event.payload ; };

	EUS.type.onForkEvent = function( event ) { return 'fork by ' + event.actor.display_login.link( 'https://github.com/' + event.actor.display_login ); };

	EUS.type.onGistEvent = function( event ) { return 'gist ' + event.payload ; };

	EUS.type.onGollumEvent = function( event ) { return 'wiki edited'; };

	EUS.type.onIssuesEvent = function( event ) {

		EUS.type.issuesEvents = !EUS.type.issuesEvents ? 1 : EUS.type.issuesEvents + 1;
		body =  event.payload.issue.body;

		if ( body.length > 500 ) {

			body = body.slice( 0, 500 ) + '</div>more...';

		}

		return '<small>issue ' + event.payload.issue.title.link( event.payload.issue.html_url ) + '</small>' + b +

					'<div class=issue >' + COR.converter.makeHtml( body ) + '</div>' +

		'';

//		return 'issue ' + event.payload.issue.title.link( event.payload.issue.html_url );

	};

	EUS.type.onIssueCommentEvent = function( event ) { return 'issue comment ' + event.payload.issue.title.link( event.payload.issue.html_url ); };

	EUS.type.onMemberEvent = function( event ) { return 'member ' + event.payload.action; };

	EUS.type.onMembershipEvent = function( event ) { return 'MembershipEvent ' + event.payload ; };

	EUS.type.onPageBuildEvent = function( event ) { return 'PageBuildEvent ' + event.payload ; };

	EUS.type.onPublicEvent = function( event ) { return 'PublicEvent ' + event.payload ; };


	EUS.type.onPushEvent = function( event ) {

		EUS.type.pushEvents = !EUS.type.pushEvents ? 1 : EUS.type.pushEvents + 1;
		commit = event.payload.commits[ 0 ] ;

		if ( commit ) {

//			return 'push <a href=https://github.com/' + event.repo.name + '/commit/' + commit.sha + ' >' + commit.message.slice( 0, 100 ) + '...' + '</a>';
			return 'push ' + commit.message.slice( 0, 100 ).link( 'https://github.com/' + event.repo.name + '/commit/' + commit.sha ) + '...';

		}

	};

	EUS.type.onPullRequestEvent = function( event ) {

		return 'pull request ' + event.payload.action + ' ' + event.payload.pull_request.title.link( event.payload.pull_request.html_url );

//			event.payload.pull_request.body.slice( 0, 100 ) + '<br>more...' ;

	};

	EUS.type.onPullRequestReviewCommentEvent = function( event ) {

//		return 'pull comment ' + event.payload.comment.body.slice( 0, 100 );

		return 'pull request ' + event.payload.action + ' ' + event.payload.pull_request.title.link( event.payload.pull_request.html_url );

//			event.payload.pull_request.body.slice( 0, 100 ) + '<br>more...' ;

	};

	EUS.type.onReleaseEvent = function( event ) { return 'release ' + event.payload.release.name ; };

	EUS.type.onRepositoryEvent = function( event ) { return 'RepositoryEvent ' + event.payload ; };

	EUS.type.onStatusEvent = function( event ) {return 'StatusEvent ' + event.payload ; };

	EUS.type.onTeamAddEvent = function( event ) { return 'TeamAddEvent ' + event.payload ; };

	EUS.type.onWatchEvent = function( event ) { return 'watch ' + event.payload.action + ' by ' + event.actor.display_login.link( 'https://github.com/' + event.actor.display_login ); };

