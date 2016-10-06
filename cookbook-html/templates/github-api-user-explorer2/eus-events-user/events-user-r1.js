// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/
// https://developer.github.com/v3/activity/events/

// https://rawgit.com/mrdoob/three.js/
// https://jaanga.github.io/terrain3/elevations-core3/elevations-view-r6.html 

	var EUS = EUS || {};

	EUS.eventTypes = [ "CommitCommentEvent","CreateEvent","DeleteEvent","DeploymentEvent","DeploymentStatusEvent","DownloadEvent","FollowEvent","ForkEvent","ForkApplyEvent","GistEvent","GollumEvent","IssueCommentEvent","IssuesEvent","MemberEvent","MembershipEvent","PageBuildEvent","PublicEvent","PullRequestEvent","PullRequestReviewCommentEvent","PushEvent","ReleaseEvent","RepositoryEvent","StatusEvent","TeamAddEvent","WatchEvent" ];

	EUS.type = {};
	EUS.dates = [];
	EUS.repos = [];


// may not be in use
	EUS.getMenuDetailsUserEvents = function() {

		EUS.target = updates;

		var menuDetailsUserEvents =

			'<details id=EUSdetailsUserEvents >' +

				'<summary id=EUSsummaryUserEvents ><h3>recent events</h3></summary>' +

				'<div id=EUSUserEvents ></div>' + b +

			'</details>' +

		'';

		return menuDetailsUserEvents;

	}


// Used by right menu
// events-user-r1.html
// github-api-user-explorer2-r1.html

	EUS.requestGitHubAPIUserEvents = function( user ) {

		var xhr;
		var events, event, txt, dates, actor, repo, link, index;

		var urlEvents = 'https://api.github.com/users/' + user + '/events?per_page=100' + ( API.token || '' );

		xhr = new XMLHttpRequest();
		xhr.open( 'get', urlEvents, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			EUS.events = JSON.parse( xhr.responseText );
			EUS.dates = [];
			EUS.repos = [];
			EUS.user = user;

			txt = '<h2>' + user + ' recent events</h2>' +
				'<button onclick=DAT.currentTopic="stats";window.location.reload() >show activity statistics</button>' + b;

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

				repo = event.repo.name

				link = repo.replace ( user + '/', '' ).link( 'https://github.com/' + repo );

				txt += 

					( i + 1 ) + ' ' + event.created_at.slice( 11, -4 ) + ' ' + actor + ' ' + link + b +
					'<small>' + EUS.type[ 'on' + event.type ]( event ) + '</small>' + 

				b;

				index = EUS.eventTypes.indexOf( event.type );

				EUS.repos[ repo ].stats[ index ]++;

			}

			EUS.target.innerHTML = txt;

			if ( DAT.currentTopic === 'stats' ) {

				EUS.buildStatsReport( user );

			}

//console.log( 'repos', EUS.repos );

		}

	}


// Used by center contents
// events-user-r1.html
// github-api-user-explorer2-r1.html

	EUS.buildStatsReport = function( user ) {

		var txt, keys, repo;

		txt = 

			'<h1>' + user + '</h1>' +
				'<h2>Statistics of ' + EUS.events.length + ' most recent events' +
			'</h2>' +
			'Time period covers ' + EUS.dates.slice( -1 )  + ' to ' + EUS.dates[ 0 ] + ' with ' + EUS.dates.length + ' day(s) of activity' + b + 

		b;

		repoKeys = Object.keys( EUS.repos ); 

		for ( var i = 0; i < repoKeys.length; i++ ) {

			repoName = EUS.repos[ repoKeys[ i ] ].name;

			txt += '<h2 style=margin-bottom:0; >User/repo: ' + repoName.link( 'https://github.com/' + repoName ) + '</h2>';

			repo = EUS.repos[ repoKeys[ i ] ];

			txt += '<iframe id=' + repoName + ' height=300 width=100% ></iframe>';

//			EUS.getIframeContents( repoName );

			for ( var j = 0; j < EUS.eventTypes.length; j++ ) {

				if ( repo.stats[ j ] > 0 ) {

					txt += EUS.eventTypes[ j ] + ': ' + repo.stats[ j ] + b;

				}

			}

		}


		for ( var i = 0; i < repoKeys.length; i++ ) {

			repoName = EUS.repos[ repoKeys[ i ] ].name;

			EUS.getIframeContents( repoName );

		}

		contents.innerHTML = txt;

	}



	EUS.getIframeContents= function( repo ) {

		var xhr, user, style;

		user = repo.split( '/' ).shift();

		switch( user ) {

			case 'theo-armour':
			case 'jaanga':
			case 'cynthiaarmour':
//			case 'Abantech':
			case 'fgx':
				branch = repo.includes( '.github.io' ) ? '/master/' : '/gh-pages/';
				fileName = '';
				break;

			default:

				branch = '/master/'
				fileName = 'README.md';
				break;

		}


		EUS.getReadMe( repo, branch, fileName );

	}



	EUS.getReadMe = function( repo, branch, fileName) {

		var urlReadMe, xhr;

		urlReadMe = 'https://rawgit.com/' + repo + branch + fileName;

		xhr = new XMLHttpRequest();
		xhr.repo = repo;
		xhr.open( 'get', urlReadMe, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			var text, css, item;

			css = '<style>body { font: 10pt monospace; }</style>\n';

			if ( xhr.status != 404 ) {

				text = COR.converter.makeHtml( xhr.responseText );

			} else {

				text = 'File not found: ' + xhr.repo + branch + fileName;

			}

			item = document.getElementById( xhr.repo );


			user = xhr.repo.split( '/' ).shift();

			if ( fileName === '' ) {

				EUS.getIndexHTML( xhr.repo );

			} else {

				item.srcdoc = css + COR.converter.makeHtml( text );

			}

		}

	}



	EUS.getIndexHTML = function( repo ) {

		user = repo.split( '/' ).shift();

		folder = repo.split( '/' ).pop()

		folder = repo.includes( '.github.io' ) ? folder : user + '.github.io/' + folder;

		item = document.getElementById( repo );

// console.log( 'repo', folder );

		item.src = '//' + folder;

	}




// may not be in use

	EUS.requestGitHubAPIUserEventsStatusUpdate = function( user ) {

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

					dates.push( event.created_at.slice( 0, 10 ) )

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

	}



//

	EUS.type.onCommitCommentEvent = function( event ) { return 'commit comment ' + event.payload.comment.body.slice( 0, 100 ).link( event.payload.comment.html_url ) + '...'; }

	EUS.type.onCreateEvent = function( event ) { return 'create ' + event.payload.master_branch; }

	EUS.type.onDeleteEvent = function( event ) { return 'delete ' + event.payload.ref_type; }

	EUS.type.onDeploymentEvent = function( event ) { return 'DeploymentEvent ' + event.payload ; }

	EUS.type.onDeploymentStatusEvent = function( event ) { return 'DeploymentStatusEvent ' + event.payload ; }

	EUS.type.onDownloadEvent = function( event ) { return 'DownloadEvent ' + event.payload ; }

	EUS.type.onFollowEvent = function( event ) { return 'follow ' + event.payload ; }

	EUS.type.onForkApplyEvent = function( event ) { return 'ForkApplyEvent ' + event.payload ; }

	EUS.type.onForkEvent = function( event ) { return 'fork by ' + event.actor.display_login.link( 'https://github.com/' + event.actor.display_login ); }

	EUS.type.onGistEvent = function( event ) { return 'gist ' + event.payload ; }

	EUS.type.onGollumEvent = function( event ) { return 'wiki edited'; }

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

	}

	EUS.type.onIssueCommentEvent = function( event ) { return 'issue comment ' + event.payload.issue.title.link( event.payload.issue.html_url ); }

	EUS.type.onMemberEvent = function( event ) { return 'member ' + event.payload.action; }

	EUS.type.onMembershipEvent = function( event ) { return 'MembershipEvent ' + event.payload ; }

	EUS.type.onPageBuildEvent = function( event ) { return 'PageBuildEvent ' + event.payload ; }

	EUS.type.onPublicEvent = function( event ) { return 'PublicEvent ' + event.payload ; }


	EUS.type.onPushEvent = function( event ) {

		EUS.type.pushEvents = !EUS.type.pushEvents ? 1 : EUS.type.pushEvents + 1;
		commit = event.payload.commits[ 0 ] ;

		if ( commit ) {

//			return 'push <a href=https://github.com/' + event.repo.name + '/commit/' + commit.sha + ' >' + commit.message.slice( 0, 100 ) + '...' + '</a>';
			return 'push ' + commit.message.slice( 0, 100 ).link( 'https://github.com/' + event.repo.name + '/commit/' + commit.sha ) + '...';

		}

	}

	EUS.type.onPullRequestEvent = function( event ) { 

		return 'pull request ' + event.payload.action + ' ' + event.payload.pull_request.title.link( event.payload.pull_request.html_url );

			event.payload.pull_request.body.slice( 0, 100 ) + '<br>more...' ; 

	}

	EUS.type.onPullRequestReviewCommentEvent = function( event ) { 

//		return 'pull comment ' + event.payload.comment.body.slice( 0, 100 ); 

		return 'pull request ' + event.payload.action + ' ' + event.payload.pull_request.title.link( event.payload.pull_request.html_url );

			event.payload.pull_request.body.slice( 0, 100 ) + '<br>more...' ; 

	}

	EUS.type.onReleaseEvent = function( event ) { return 'release ' + event.payload.release.name ; }

	EUS.type.onRepositoryEvent = function( event ) { return 'RepositoryEvent ' + event.payload ; }

	EUS.type.onStatusEvent = function( event ) {return 'StatusEvent ' + event.payload ; }

	EUS.type.onTeamAddEvent = function( event ) { return 'TeamAddEvent ' + event.payload ; }

	EUS.type.onWatchEvent = function( event ) { return 'watch ' + event.payload.action + ' by ' + event.actor.display_login.link( 'https://github.com/' + event.actor.display_login ); }

