// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/
// https://developer.github.com/v3/activity/events/


	var EUS = EUS || {};
	EUS.type = {};


	EUS.getMenuDetailsRepositoryEvents = function() {

		EUS.target = updates;

		var menuDetailsRepositoryEvents =

			'<details id=EUSdetailsRepositoryEvents >' +

				'<summary id=EUSsummaryRepositoryEvents ><h3>repository events</h3></summary>' +

				'<div id=EUSrepositoryEvents ></div>' +

			'</details>' + b +

		'';

		return menuDetailsRepositoryEvents;

	}


	EUS.requestGitHubAPIUserEvents = function() {

		var xhr;
		var events, event, txt, dates, actor, repo, commit;

		var urlEvents = 'https://api.github.com/users/' + EUS.user + '/events?per_page=100' + ( API.token || '' );

		xhr = new XMLHttpRequest();
		xhr.open( 'get', urlEvents, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			events = JSON.parse( xhr.responseText );

console.log( '', events );

			txt = '<h2>' + user + b +'recent events</h2>';

			dates = [];

			for ( var i = 0; i < events.length; i++ ) {

				event = events[ i ];

				if ( dates.indexOf( event.created_at.slice( 0, 10 ) ) === -1 ) {

					dates.push( event.created_at.slice( 0, 10 ) )

					txt += '<h4 style=margin-bottom:0; >' + event.created_at.slice( 0, 10 ) + '</h4>';

				}

				if ( user.toLowerCase() !== event.actor.login  ) {

					actor = ' <a href=' + event.actor.url + ' > ' + event.actor.login + '</a> ';

				} else { 

					actor = '' ;

				}

				repo = ' <a href=' + event.repo.url + ' > ' + event.repo.name.replace ( user, '' ) + '</a> ' + b;

				if ( EUS.type[ 'on' + event.type ] !== undefined ) {

					txt += ( i + 1 ) + ' ' + event.created_at.slice( 11, -4 ) + actor + ' ' + repo + ' ' + 

						'<small>' + EUS.type[ 'on' + event.type ]( event ) + '</small>' + b

//console.log( '', EUS.type[ 'on' + event.type ]( event ) );

				} else {

console.log( 'non-event', event );

				}

			}

			EUS.target.innerHTML = txt;

		}


		EUS.type.onCommitCommentEvent = function( event ) { return 'commit comment <a href=' + event.payload.comment.html_url + ' >' + event.payload.comment.body + '</a>'; }

		EUS.type.onCreateEvent = function( event ) { return 'create ' + event.payload.master_branch; }

		EUS.type.onDeleteEvent = function( event ) { return 'delete ' + event.payload.ref_type; }

		EUS.type.onDeploymentEvent = function( event ) { return 'DeploymentEvent ' + event.payload ; }

		EUS.type.onDeploymentStatusEvent = function( event ) { return 'DeploymentStatusEvent ' + event.payload ; }

		EUS.type.onDownloadEvent = function( event ) { return 'DownloadEvent ' + event.payload ; }

		EUS.type.onFollowEvent = function( event ) { return 'FollowEvent ' + event.payload ; }

		EUS.type.onForkApplyEvent = function( event ) { return 'ForkApplyEvent ' + event.payload ; }

		EUS.type.onForkEvent = function( event ) { return 'fork';}

		EUS.type.onGistEvent = function( event ) { return 'GistEvent ' + event.payload ; }

		EUS.type.onGollumEvent = function( event ) { return 'wiki edited'; }

		EUS.type.onIssuesEvent = function( event ) { return 'issue <a href=' + event.payload.issue.html_url + ' >' + event.payload.issue.title + '</a>'; }

		EUS.type.onIssueCommentEvent = function( event ) { return 'issue comment <a href=' + event.payload.issue.html_url + ' >' + event.payload.issue.title + '</a>'; }

		EUS.type.onMemberEvent = function( event ) { return 'member ' + event.payload.action; }

		EUS.type.onMembershipEvent = function( event ) { return 'MembershipEvent ' + event.payload ; }

		EUS.type.onPageBuildEvent = function( event ) { return 'PageBuildEvent ' + event.payload ; }

		EUS.type.onPublicEvent = function( event ) { return 'PublicEvent ' + event.payload ; }


		EUS.type.onPushEvent = function( event ) {

			commit = event.payload.commits[ 0 ] ;

			if ( commit ) {

				return 'push <a href=https://github.com/' + event.repo.name + '/commit/' + commit.sha + ' >' + commit.message.slice( 0, 100 ) + '...' + '</a>';

			}

		}

		EUS.type.onPullRequestEvent = function( event ) { return 'pull request ' + event.payload.pull_request.body.slice( 0, 100 ) + '...' ; }

		EUS.type.onPullRequestReviewCommentEvent = function( event ) { return 'pull comment ' + event.payload.comment.body.slice( 0, 100 ); }

		EUS.type.onReleaseEvent = function( event ) { return 'release ' + event.payload.release.name ; }

		EUS.type.onRepositoryEvent = function( event ) { return 'RepositoryEvent ' + event.payload ; }

		EUS.type.onStatusEvent = function( event ) {return 'StatusEvent ' + event.payload ; }

		EUS.type.onTeamAddEvent = function( event ) { return 'TeamAddEvent ' + event.payload ; }

		EUS.type.onWatchEvent = function( event ) { return 'watch ' + event.payload.action ; }

	}

