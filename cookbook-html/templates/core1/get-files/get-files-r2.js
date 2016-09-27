// 

	var GET = GET || {};



// MENUS Full version


	GET.getMenuDetailsTableOfContents = function() {

		var menuDetailsTableOfContents =

			'<details open >' +

				'<summary><h3>Table of Contents</h3></summary>' +

				'<div id=GETtoc ></div>' + b +

			'</details>' +

		'';

		return menuDetailsTableOfContents;

	};


	GET.getMenuDetailsPageActions = function() {

		var menuDetailsPageActions =

			'<details open>' +

				'<summary><h3>Page Actions</h3></summary>' +

				'<div>' +
				'<a href=JavaScript:location.href=GET.urlSource+location.hash.slice(1); >View source on GitHub</a>' + b +
				'<a href=JavaScript:window.open(GET.urlBase+location.hash.slice(1),"_blank"); >Open page in new tab</a>' +
				'</div>' + b +

			'</details>' +

		'';

		return menuDetailsPageActions;

	};


	GET.getMenuRepositoryEvents = function() {

		var menuDetailsRepositoryEvents =

			'<details open>' +

				'<summary><h3>Repository Events</h3></summary>' +

				'<div id=repositoryEvents ></div>' + b +

			'</details>' +

		'';

		GET.requestGitHubAPIEvents();

		return menuDetailsRepositoryEvents;

	}



	GET.getMenuDetailsRepositoryStatistics = function() {

		var menuDetailsRepositoryStatistics =

			'<details open>' +

				'<summary><h3>Repository Statistics</h3></summary>' +

				'<div id=GETrepoStats ></div>' + b +

			'</details>' +

		'';

		return menuDetailsRepositoryStatistics;

	};




// called by init


	GET.getGitHubRepoTreeContents = function() {

		COR.requestFile( DEF.urlGITHubAPITreeContents, function callbackGH( xhr ) {

			var response, tree;

			response = JSON.parse( xhr.target.response );

			GET.tree = response.tree;

			GET.itemsAll = GET.tree.map( function( item ) { return item.path; } );

			onHashChange();

//			GET.getFilesFromFolder( '' );

		} );

	}


// called by onHashChange

	GET.getFilesFromFolder = function( dir ) {

		var dirArray, dirLen, item, itemArray;

		GET.dirsSelected = [];
		GET.filesSelected = [];

		dirArray = dir === '/' ? [] : dir.split( '/' );

		dirLen = dirArray.length + 2;

		for ( var i = 0; i < GET.itemsAll.length; i++ ) {

			item = GET.itemsAll[ i ];

			if ( !item.includes( dir ) ) { continue; }

			if ( !item.includes( 'readme.md' ) ) { continue; }

			itemArray = item.split( '/' );


			if ( itemArray.length !== dirLen ) { continue; }

			GET.dirsSelected.push( item.replace( '/readme.md', '' ) );

		}

		for ( var i = 0; i < GET.itemsAll.length; i++ ) {

			item = GET.itemsAll[ i ];

			if ( !item.includes( dir ) ) { continue; }

			if ( !item.includes( '.html' ) ) { continue; }

			if ( item.includes( 'archive' ) ) { continue; }

			if ( item.includes( 'index.html' ) ) { continue; }

			itemArray = item.split( '/' );

			if ( itemArray.length !== dirLen - 1 ) { continue; }

			GET.filesSelected.push( item );

		}

		GET.createFolderNameTableOfContents();

	};


	GET.createFolderNameTableOfContents = function() {

		var toc, folderName, folder;

		toc = '';

		for ( var i = 0; i < GET.dirsSelected.length; i++ ) {

			folder = GET.dirsSelected[ i ];

			folderName = folder.split( '/' ).pop();
			folderName = folderName.replace( /-/g, ' ' );

			toc += '<h3>&#x1f4c1; <a href=#' + folder + ' > ' + folderName + '</a></h3>';

		}


		for ( var i = 0; i < GET.filesSelected.length; i++ ) {

			item = GET.filesSelected[ i ];
			item2 = item.split( '/' )

			fileName = item2.pop();
			fileName = fileName.replace( /-/g, ' ' );

			toc += '<h3><a href=#' + item + ' > ' + fileName + '</a></h3>';

		}


		GETtoc.innerHTML = toc;

	}



// called by onHashChange

	GET.setMenuDetailsRepositoryStatistics = function() {

		var dirs, files, filesSize, item;

		dirs = 0;
		files = 0;
		filesSize = 0;

		for ( var i = 0; i < GET.tree.length; i++ ) {

			item = GET.tree[ i ];

			if ( item.type === 'blob' ) {

				files++;
				filesSize += item.size;

			} else {

				dirs++;

			}

		}

		GETrepoStats.innerHTML =

			'Items in repo: ' + GET.itemsAll.length.toLocaleString() + b +
			'&bull; Folders &nbsp;  &nbsp: ' + dirs.toLocaleString() + b +
			'&bull; Files &nbsp  &nbsp  &nbsp: ' + files.toLocaleString() + b +
			'Size of files: ' + filesSize.toLocaleString() + ' bytes' +

		'';

	}




// called by onHashChange

	GET.requestGitHubAPIEvents = function() {

		var xhr;
		var events, event, txt, dates, actor, repo;
		var eventSet = {};

		xhr = new XMLHttpRequest();
		xhr.open( 'get', DEF.urlEvents, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			events = JSON.parse( xhr.responseText );

			txt = '';

			dates = [];

			for ( var i = 0; i < events.length; i++ ) {

				event = events[ i ];

				if ( dates.indexOf( event.created_at.slice( 0, 10 ) ) === -1 ) {

					dates.push( event.created_at.slice( 0, 10 ) );

					txt += '<h4>' + event.created_at.slice( 0, 10 ) + '</h4>';

				}

				actor = ' <a href=' + event.actor.url + ' > ' + event.actor.login + '</a> ';

				repo = ' <a href=' + event.repo.url + ' > ' + event.repo.name.replace ( GET.user, '' ) + '</a> ';

				if ( eventSet[ 'on' + event.type ] !== undefined ) {

					txt += ( i + 1 ) + ' ' + event.created_at.slice( 11, -4 ) + actor + ' ' + repo + b +
						eventSet[ 'on' + event.type ]( event ) + b;

				} else {

console.log( 'non-event', event );

				}

			}

			repositoryEvents.innerHTML = txt;

		}

		eventSet.onCommitCommentEvent = function( event ) { return 'commit comment <a href=' + event.payload.comment.html_url + ' >' + event.payload.comment.body + '</a>'; };

		eventSet.onCreateEvent = function( event ) { return 'create ' + event.payload.master_branch; };

		eventSet.onDeleteEvent = function( event ) { return 'delete ' + event.payload.ref_type; };

		eventSet.onForkEvent = function( event ) { return 'fork'; };

		eventSet.onGollumEvent = function( event ) { return 'wiki edited'; };

		eventSet.onIssuesEvent = function( event ) { return 'issue <a href=' + event.payload.issue.html_url + ' >' + event.payload.issue.title + '</a>'; };

		eventSet.onIssueCommentEvent = function( event ) { return 'issue comment <a href=' + event.payload.issue.html_url + ' >' + event.payload.issue.title + '<a>'; };

		eventSet.onMemberEvent = function( event ) { return 'member ' + event.payload.action; };

		eventSet.onPushEvent = function( event ) {

			commit = event.payload.commits[ 0 ];
			return 'push <a href=https://github.com/' + event.repo.name + '/commit/' + commit.sha + ' >' + commit.message + '</a>';

		};

		eventSet.onPullRequestEvent = function( event ) { return 'pull request ' + event.payload.pull_request.body; };

		eventSet.onPullRequestReviewCommentEvent = function( event ) { return 'pull comment ' + event.payload.comment.body; };

		eventSet.onReleaseEvent = function( event ) { return 'release ' + event.payload.release.name; };

		eventSet.onWatchEvent = function( event ) {	return 'watch ' + event.payload.action; };

	}


// called by onHashChange

	GET.getUpdates = function() {

		var updates, update, txt;

		COR.requestFile( DEF.urlIssues, callback );

		function callback( xhr ) {

			updates = JSON.parse( xhr.target.responseText );

			txt = '<h2>' + DEF.repo + ' status updates</h2>';

			for ( var i = 0; i < updates.length; i++ ) {

				update = updates[ i ];

				txt += '<h2><a href=' + update.html_url + ' >' + update.title + '</a></h2>' +
					'<div class=GETupdate >' + COR.converter.makeHtml( update.body ) + '</div>';

			}

			COR.updates.innerHTML = txt + 

				'<hr>' +

				'<center>' +
					'<a href=javascript:COR.updates.scrollTop=0; style=text-decoration:none; onmouseover=pop3.style.display=""; onmouseout=pop3.style.display="none"; ><h1> &#x2766 <h1></a>' +
				'</center>' +

				'<div class=popUp id=pop3 style=display:none;bottom:100px; >' +
					'Jaanga - your 3D happy place.<br>Click here to return to the top of the page' +
				'</div>' +

			b;

		}

	};





// simple version



	GET.onLoadGitHubTreeContents = function( xhr ) {

//console.log( 'xhr', xhr  );

		var response, files, file;

		response = JSON.parse( xhr.target.response );

		GET.extension = GET.extension || '.json';

		files = [];

		for ( var i = 0; i < response.tree.length; i++ ) {

			file = response.tree[ i ].path;

			if ( !file.includes( GET.searchInFolder ) ) { continue; }
			if ( file.includes( 'archive' ) ) { continue; }
			if ( !file.includes( GET.extension ) ) { continue; }

//			file = file.split( '\/' ).pop();

			files.push( file );

		}

		GET.onLoadTreeContent( files );


	}



	GET.onLoadTreeContent = function( files ) {

		console.log( '', files );

	}


	GET.getHTMLFilesInFolder = function() {

		GET.searchInFolder = 'elevations-core3';
		GET.extension = '.html';
		GET.urlBase = 'https://jaanga.github.io/terrain3/';

			GET.onLoadTreeContent = function( files ) {

				txt = 

				'<h1>' + GET.searchInFolder + '</h1>' +

				'<input type=button onclick=window.location.href="https://github.com/jaanga/terrain3/tree/gh-pages/' + GET.searchInFolder + '/"; value="Got to GitHub" />' + b +

			'';

				for ( var i = 0; i < files.length; i++ ) {

					if ( files[ i ].split( '/' ).length === 2 ) { txt += files[ i ].link( GET.urlBase + files[ i ] )  + b; }

				}

				contents.innerHTML = txt;

			}


		GET.getGitHubAPITreeContents();

	}


