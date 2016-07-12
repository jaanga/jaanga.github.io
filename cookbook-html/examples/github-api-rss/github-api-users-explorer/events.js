

	eventSet = {};

	function getEvents( user, page, target ) {


console.log( 'user', user );
// https://developer.github.com/v3/activity/events/

		var fileName, xhr, events, event, eventHeading, dates, txt;

		fileName = 'https://api.github.com/users/' + user + '/events?page=' + page;

		pageHeader =
		'<h1>' +
			'Org: <a href=https://github.com/' + user + '>' + user + '</a> ' +
			'page <button onclick=proceed(-1); >prev</button> <a href=' + fileName + ' > ' + page + '</a> <button onclick=proceed(1); >next</a></button> ' +
//			'<button onclick=window.scrollTo(0,0); >top</button>' +
		'</h1>';

		pageFooter =
		'<h1>' +
			'page <button onclick=proceed(-1); >prev</button> ' + page + ' <button onclick=proceed(1); >next</a></button> ' +
			'<button onclick=window.scrollTo(0,0); >top</button>' +
		'</h1>';

		xhr = new XMLHttpRequest();
		xhr.open( 'get', fileName, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			dates = [];
			events = JSON.parse( xhr.responseText );

console.log( 'events', events );

			pageContent = '';

			for ( var i = 0; i < events.length; i++ ) {

				event = events[ i ];

				if ( dates.indexOf( event.created_at.slice( 0, 10 ) ) === -1 ) { // first time we have seen this day

					dates.push( event.created_at.slice( 0, 10 ) )

					pageContent +=
						'<hr style=margin-top:70px; >' +
						'<h2>' + event.created_at.slice( 0, 10 ) + '</h2>' +
					'';

					eventHeading = '';

				}

				if ( event.type !== eventHeading ) { // first time we have seen this type of event on this day

					eventHeading = event.type

					pageContent += '<h3 style=margin:0; >' + event.type + '</h3>';

				}

				pageContent +=
					'<div>#' + ( i + 1 ) + ' ' + event.created_at.slice( 11, -1 ) + '</div>' +
					'<div>Repository: <a href=http://github.com/' + event.repo.name + ' > ' + event.repo.name + '</a></div>' +
				'';

				if ( eventSet[ 'on' + event.type ] !== undefined ) {

					pageContent += eventSet[ 'on' + event.type ]( event );

				} else {

console.log( 'non-event', event );

					pageContent += '<div>Parsing this type of event is still not complete...</div>';

				}

			}

/*			if ( chkLoadAll.checked && count < 10 ) {

				target.innerHTML += pageHeader + pageContent + pageFooter;
				count++;
				proceed( 1 );

			} else {
*/
				target.innerHTML = pageHeader + pageContent + pageFooter;
				window.scrollTo( 0, 0 );

//			}

		}

	}

// https://developer.github.com/v3/activity/events/types/

	eventSet.onCommitCommentEvent = function( event ) {

		txt =
			'<div>Actor: <a href=http://github.com/' + event.actor.login + ' >' + event.actor.login + '</a></div>' +
			'<div>Body: <a href=' + event.payload.comment.html_url + ' >' + event.payload.comment.body + '</div>' +
		'<br>';

		return txt;

	}

	eventSet.onCreateEvent = function( event ) {

		txt =
			'<div>Description: ' + event.payload.description + '</div>' +
			'<div>Actor: <a href=http://github.com/' + event.actor.login + ' >' + event.actor.login + '</a></div>' +
			'<div>Branch: ' + event.payload.master_branch + '</div>' +
		'<br>';

		return txt;

	}

	eventSet.onDeleteEvent = function( event ) {

		txt =
			'<div>Pusher: ' + event.payload.pusher_type + '<div>' +
			'<div>Ref: ' + event.payload.ref + '<div>' +
			'<div>Ref Type: ' + event.payload.ref_type + '<div>' +
		'<br>';

		return txt;

	}

	eventSet.onForkEvent = function( event ) {

		txt =
			'<div>Actor: <a href=http://github.com/' + event.actor.login + ' >' + event.actor.login + '</a></div>' +
//			'<div>Body: <a href=' + event.payload.comment.html_url + ' >' + event.payload.comment.body + '</div>' +
		'<br>';

		return txt;

	}

	eventSet.onGollumEvent = function( event ) {
//console.log( 'onEvent', event  );
		txt =
			'<div>Actor: <a href=http://github.com/' + event.actor.login + ' >' + event.actor.login + '</a></div>' +
				( event.payload.action === 'created' ?
					'<div>Action: wiki created</div>'
					:
					'<div>Action: wiki edited</div>'
				) +
		'<br>';

		return txt;

	}

	eventSet.onIssuesEvent = function( event ) {
//console.log( 'onEvent', event  );
		txt =
			'<div>Title: <a href=' + event.payload.issue.html_url + ' >' + event.payload.issue.title + '</a></div>' +
			'<div>Actor: <a href=http://github.com/' + event.actor.login + ' >' + event.actor.login + '</a></div>' +
			'<div>Labels: ' + ( event.payload.issue.labels.length ? event.payload.issue.labels[ 0 ].name  : '' ) + '</div>' +
				( event.payload.action === 'opened' ?
					'<div>Action: opened</div><div class=issue >' + converter.makeHtml( event.payload.issue.body ) + '</div>'
					:
					'<div>Action: closed</div>'
				) +
		'<br>';

		return txt;

	}


	eventSet.onIssueCommentEvent = function( event ) {

		txt =
			'<div>Title: <a href=' + event.payload.issue.html_url + ' >' + event.payload.issue.title + '</a></div>' +
			'<div>Actor: <a href=http://github.com/' + event.actor.login + ' >' + event.actor.login + '</a></div>' +
				( event.payload.issue.labels.length ? '<div>Labels: ' + event.payload.issue.labels[ 0 ].name  + '</div>' : '' ) +
			'<div class=issue >' + converter.makeHtml( event.payload.comment.body ) + '</div>' ;
		'<br>';

		return txt;

	}

	eventSet.onMemberEvent = function( event ) {

		txt =
			'<div>Member: ' + '<a href=' + event.payload.member.html_url + ' > ' + event.payload.member.html_url + '</a></div>' +
			'<div>Action: ' + event.payload.action + '</div>' +
		'<br>';

		return txt;

	}

	eventSet.onPushEvent = function( event ) {

//console.log( 'push event', event );

		txt = '';
		b = '<br>';
		actor = event.actor.login;
		for ( var i = 0; i < event.payload.commits.length; i++ ) {

			commit = event.payload.commits[ i ];
			txt += '<div><a href=https://github.com/' + event.repo.name + '/commit/' + commit.sha + ' >' + commit.message + '</a></div>';

		}

		txt =
			'<div>Actor: <a href=http://github.com/' + actor + ' >' + actor + '</a></div>' +
			'<div>Message(s):</div>' + 
//				( event.payload.commits.length ? event.payload.commits[ 0 ].message + '</a>' : '' ) + '</div>' +
				txt +
			'<div>Size: ' + event.payload.size + ' - Length: ' + event.payload.commits.length + '</div>' +
		'<br>';

		return txt;

	}

	eventSet.onPullRequestEvent = function( event ) {

		txt =
			'<div>Title: <a href=' + event.payload.pull_request.html_url + ' >' + event.payload.pull_request.title + '</a></div>' +
			'<div>Actor: <a href=http://github.com/' + event.actor.login + ' >' + event.actor.login + '</a></div>' +
			'<div>Action: ' + event.payload.action + '</div>' +
			'<div>Body: ' + event.payload.pull_request.body + '</div>' +
		'<br>';

		return txt;

	}

	eventSet.onPullRequestReviewCommentEvent = function( event ) {

//console.log( 'onEvent', event  );

		txt =
			'<div>Path: <a href=' + event.payload.pull_request.html_url + ' >' + event.payload.comment.path + '</div>' +
			'<div>Actor: <a href=http://github.com/' + event.actor.login + ' >' + event.actor.login + '</a></div>' +
			'<div>Action: ' + event.payload.action + '</div>' +
			'<div class=issue >Comment: ' + event.payload.comment.body + '</div>' +
		'<br>';

		return txt;

	}

	eventSet.onReleaseEvent = function( event ) {

		txt =
			'<div>Name: ' + event.payload.release.name + '<div>' +
			'<h3 style=color:magenta; >Action: ' + event.payload.action + '</h3>' +
			'<div>Prerelease: ' + event.payload.release.prerelease + '<div>' +
		'<br>';

		return txt;

	}

	eventSet.onWatchEvent = function( event ) {

		txt =
			'<div>Actor: <a href=http://github.com/' + event.actor.login + ' >' + event.actor.display_login + '</a></div>' +
			'<div>Action: ' + event.payload.action + '</div>' +
		'<br>';

		return txt;

	}


	function proceed( delta ) {

		page += delta;
		page = page < 1 ? 10 : page;
		page = page > 10 ? 1 : page;
		location.hash = '#' + name + '#' + page;

	}
