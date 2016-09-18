// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/
// https://developer.github.com/v3/activity/events/


	var EUS = EUS || {};
	EUS.type = {};


	EUS.getMenuDetailsUserEvents = function() {

		EUS.target = updates;

		var menuDetailsUserEvents =

			'<details id=EUSdetailsUserEvents >' +

				'<summary id=EUSsummaryUserEvents ><h3>recent events</h3></summary>' +

				'<div id=EUSUserEvents ></div>' +

			'</details>' + b +

		'';

		return menuDetailsUserEvents;

	}



	EUS.requestGitHubAPIUserEvents = function( user ) {

		var xhr;
		var events, event, txt, dates, actor, repo, commit;

		var urlEvents = 'https://api.github.com/users/' + user + '/events?per_page=100' + ( API.token || '' );

		xhr = new XMLHttpRequest();
		xhr.open( 'get', urlEvents, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			events = JSON.parse( xhr.responseText );

			txt = '<h2>' + user + b +'recent events</h2>';

			dates = [];
			repos = [];

			for ( var i = 0; i < events.length; i++ ) {

				event = events[ i ];
if( i === 0 ) console.log( '', event );


				if ( dates.indexOf( event.created_at.slice( 0, 10 ) ) === -1 ) {

					dates.push( event.created_at.slice( 0, 10 ) )

					txt += '<h4 style=margin-bottom:0; >' + event.created_at.slice( 0, 10 ) + '</h4>';

				}

				if ( user.toLowerCase() !== event.actor.login  ) {

					actor = event.actor.login.link( event.actor.url );

				} else { 

					actor = 'repo: ' ;

				}

				repo = event.repo.name.replace ( user + '/', '' ).link( 'https://github.com/' + event.repo.name );

				if ( EUS.type[ 'on' + event.type ] !== undefined ) {

				txt += ( i + 1 ) + ' ' + event.created_at.slice( 11, -4 ) + ' ' + actor + ' ' + repo + b +

//				txt += ( i + 1 ) + ' ' + event.created_at.slice( 11, -4 ) + ' ' + event.repo.name.link( 'https://github.com/' + event.repo.name ) + b + 

						'<small>' + EUS.type[ 'on' + event.type ]( event ) + '</small>' + b;

//console.log( '', EUS.type[ 'on' + event.type ]( event ) );

				} else {

console.log( 'non-event', event );

				}

			}

			EUS.target.innerHTML = txt;

		}

	}



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

		body =  event.payload.issue.body;

		if ( body.length > 500 ) { 

			body = body.slice( 0, 500 ) + '</div>more...';

		}

		return '<small>issue ' + event.payload.issue.title.link( event.payload.issue.html_url ) + '</small>' + b +

					'<div class=issue style="border: 1px solid;" >' + COR.converter.makeHtml( body ) + '</div>' +

				'';
//		return 'issue ' + event.payload.issue.title.link( event.payload.issue.html_url ); 

	}

	EUS.type.onIssueCommentEvent = function( event ) { return 'issue comment ' + event.payload.issue.title.link( event.payload.issue.html_url ); }

	EUS.type.onMemberEvent = function( event ) { return 'member ' + event.payload.action; }

	EUS.type.onMembershipEvent = function( event ) { return 'MembershipEvent ' + event.payload ; }

	EUS.type.onPageBuildEvent = function( event ) { return 'PageBuildEvent ' + event.payload ; }

	EUS.type.onPublicEvent = function( event ) { return 'PublicEvent ' + event.payload ; }


	EUS.type.onPushEvent = function( event ) {

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



//

	EUS.requestGitHubAPIUserEventsStatusUpdate = function( user ) {

		var xhr;
		var events, event, txt, dates, body;

		var urlEvents = 'https://api.github.com/users/' + user + '/events?per_page=100' + ( API.token || '' );

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

					'<div class=issue >' + COR.converter.makeHtml( body ) + '</div>' +

				'';

//console.log( 'event', event );

			}

			EUS.target.innerHTML = txt;

		}

	}