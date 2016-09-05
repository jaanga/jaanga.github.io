// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/


	var EVT = {};

	EVT.requestUserEvents = function( user ) {

		var xhr;
		var events, event, txt, dates, actor, repo, commit;
		var eventSet = {};

		EVT.target = updates;

		var urlEvents = 'https://api.github.com/users/' + user + '/events?' + ( SEL.token || '' );

		xhr = new XMLHttpRequest();
		xhr.open( 'get', urlEvents, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			events = JSON.parse( xhr.responseText );

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

				if ( eventSet[ 'on' + event.type ] !== undefined ) {

					txt += ( i + 1 ) + ' ' + event.created_at.slice( 11, -4 ) + actor + ' ' + repo + ' ' + 

						'<small>' + eventSet[ 'on' + event.type ]( event ) + '</small>' + b

//console.log( '', eventSet[ 'on' + event.type ]( event ) );

				} else {

console.log( 'non-event', event );

				}

			}

			EVT.target.innerHTML = txt;

		}


		eventSet.onCommitCommentEvent = function( event ) { return 'commit comment <a href=' + event.payload.comment.html_url + ' >' + event.payload.comment.body + '</a>'; }

		eventSet.onCreateEvent = function( event ) { return 'create ' + event.payload.master_branch; }

		eventSet.onDeleteEvent = function( event ) { return 'delete ' + event.payload.ref_type; }

		eventSet.onForkEvent = function( event ) { return 'fork';}

		eventSet.onGollumEvent = function( event ) { return 'wiki edited'; }

		eventSet.onIssuesEvent = function( event ) { return 'issue <a href=' + event.payload.issue.html_url + ' >' + event.payload.issue.title + '</a>'; }

		eventSet.onIssueCommentEvent = function( event ) { return 'issue comment <a href=' + event.payload.issue.html_url + ' >' + event.payload.issue.title + '</a>'; }

		eventSet.onMemberEvent = function( event ) { return 'member ' + event.payload.action; }

		eventSet.onPushEvent = function( event ) {

			commit = event.payload.commits[ 0 ] ;

			if ( commit ) {

				return 'push <a href=https://github.com/' + event.repo.name + '/commit/' + commit.sha + ' >' + commit.message.slice( 0, 100 ) + '...' + '</a>';

			}

		}

		eventSet.onPullRequestEvent = function( event ) { return 'pull request ' + event.payload.pull_request.body.slice( 0, 100 ) + '...' ; }

		eventSet.onPullRequestReviewCommentEvent = function( event ) { return 'pull comment ' + event.payload.comment.body.slice( 0, 100 ); }

		eventSet.onReleaseEvent = function( event ) { return 'release ' + event.payload.release.name ; }

		eventSet.onWatchEvent = function( event ) {	return 'watch ' + event.payload.action ; }

	}
