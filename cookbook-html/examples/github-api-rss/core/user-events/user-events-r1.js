

	var user = 'jaanga';
	var user = 'sagemath';
	var user = 'ladybug-analysis-tools';


	function requestGitHubAPIEvents( user) {

		var xhr;
//		var events, event, txt, dates;
		var eventSet = {};
		var target = updates;

		var urlEvents = 'https://api.github.com/users/' + user + '/events';

		xhr = new XMLHttpRequest();
		xhr.open( 'get', urlEvents, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			events = JSON.parse( xhr.responseText );

			txt = '<h1><a href="">' + user + ' Recent Events</a> <a href=index.html#readme.md> &#x24D8; </a></h1>';

			dates = [];

			for ( var i = 0; i < events.length; i++ ) {

				event = events[ i ];

				if ( dates.indexOf( event.created_at.slice( 0, 10 ) ) === -1 ) {

					dates.push( event.created_at.slice( 0, 10 ) )

					txt += '<h4>' + event.created_at.slice( 0, 10 ) + '</h4>';

				}

				actor = ' <a href=' + event.actor.url + ' > ' + event.actor.login + '</a> ';

				repo = ' <a href=' + event.repo.url + ' > ' + event.repo.name.replace ( user, '' ) + '</a> ';

				if ( eventSet[ 'on' + event.type ] !== undefined ) {

					txt += ( i + 1 ) + ' ' + event.created_at.slice( 11, -4 ) + actor + ' ' + repo + ' ' + eventSet[ 'on' + event.type ]( event ) + b

//console.log( '', eventSet[ 'on' + event.type ]( event ) );

				} else {

console.log( 'non-event', event );

				}

			}

			target.innerHTML = txt;

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

			commit = event.payload.commits[ 0 ];
			return 'push <a href=https://github.com/' + event.repo.name + '/commit/' + commit.sha + ' >' + commit.message.slice( 0, 100 ) + '...' + '</a>';

		}

		eventSet.onPullRequestEvent = function( event ) { return 'pull request ' + event.payload.pull_request.body.slice( 0, 100 ) + '...' ; }

		eventSet.onPullRequestReviewCommentEvent = function( event ) { return 'pull comment ' + event.payload.comment.body; }

		eventSet.onReleaseEvent = function( event ) { return 'release ' + event.payload.release.name ; }

		eventSet.onWatchEvent = function( event ) {	return 'watch ' + event.payload.action ; }

	}
