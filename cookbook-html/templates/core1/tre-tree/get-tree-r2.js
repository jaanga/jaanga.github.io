// 

	var TRE = TRE || {};

	TRE.extension = '.html';


// MENUS Full version


	TRE.getMenuDetailsTableOfContents = function() {

		var menuDetailsTableOfContents =

			'<details id=detailsTableOfContents open >' +

				'<summary><h3>Table of Contents</h3></summary>' +

				'<div id=TREtoc ></div>' + b +

			'</details>' +

		'';

		return menuDetailsTableOfContents;

	};


	TRE.getMenuDetailsPageActions = function() {

		var menuDetailsPageActions =

			'<details id=detailsPageActions open>' +

				'<summary><h3>Page Actions</h3></summary>' +

				'<div>' +
				'<a href=JavaScript:location.href=DEF.urlSource+location.hash.slice(1); >View source on GitHub</a>' + b +
				'<a href=JavaScript:window.open(DEF.urlGHPages+location.hash.slice(1),"_blank"); >Open page in new tab</a>' +
				'</div>' + b +

			'</details>' +

		'';

		return menuDetailsPageActions;

	};


	TRE.getMenuRepositoryEvents = function() {

		var menuDetailsRepositoryEvents =

			'<details id=detailsRepositoryEvents >' +

				'<summary><h3>Repository Events</h3></summary>' +

				'<div id=repositoryEvents ></div>' + b +

			'</details>' +

		'';

		TRE.requestGitHubAPIEvents();

		return menuDetailsRepositoryEvents;

	}



	TRE.getMenuDetailsRepositoryStatistics = function() {

		var menuDetailsRepositoryStatistics =

			'<details id=detailsRepositoryStatistics >' +

				'<summary><h3>Repository Statistics</h3></summary>' +

				'<div id=TRErepoStats ></div>' + b +

			'</details>' +

		'';

		return menuDetailsRepositoryStatistics;

	};


	TRE.getMenuDetailsFolderStatistics = function() {

		var menuDetailsFolderStatistics =

			'<details id=detailsFolderStatistics >' +

				'<summary><h3>Folder Statistics</h3></summary>' +

				'<div id=TREfolderStats ></div>' + b +

			'</details>' +

		'';

		return menuDetailsFolderStatistics;

	};


// called by init


	TRE.getGitHubRepoTreeContents = function() {

		COR.requestFile( DEF.urlGITHubAPITreeContents, function callbackGH( xhr ) {

			var response, tree;

			response = JSON.parse( xhr.target.response );

			TRE.tree = response.tree;

			TRE.itemsAll = TRE.tree.map( function( item ) { return item.path; } );

			onHashChange();

//			TRE.getFilesFromFolder( '' );

		} );

	}


// called by onHashChange

	TRE.getFilesFromFolder = function( dir ) {

		var dirArray, dirLen, item, itemArray;

		TRE.dirsSelected = [];
		TRE.filesSelected = [];

		dirArray = dir === '/' ? [] : dir.split( '/' );

		dirLen = dirArray.length + 2;

		for ( var i = 0; i < TRE.itemsAll.length; i++ ) {

			item = TRE.itemsAll[ i ];

			if ( !item.includes( dir ) ) { continue; }

			if ( !item.includes( 'readme.md' ) ) { continue; }

			itemArray = item.split( '/' );

			if ( itemArray.length !== dirLen ) { continue; }

			TRE.dirsSelected.push( item.replace( '/readme.md', '' ) );

		}

		for ( var i = 0; i < TRE.itemsAll.length; i++ ) {

			item = TRE.itemsAll[ i ];

			if ( !item.includes( dir ) ) { continue; }

			if ( !item.includes( TRE.extension ) ) { continue; }

			if ( item.includes( 'archive' ) ) { continue; }

			if ( item.includes( 'index.html' ) ) { continue; }

			itemArray = item.split( '/' );

			if ( itemArray.length !== dirLen - 1 ) { continue; }

			TRE.filesSelected.push( item );

		}

		TRE.createFolderNameTableOfContents();

	};


	TRE.createFolderNameTableOfContents = function() {

//		var toc, folderName, folder;

		toc = '';

		for ( var i = 0; i < TRE.dirsSelected.length; i++ ) {

			TRE.folder = TRE.dirsSelected[ i ];

			TRE.folderName = TRE.folder.split( '/' ).pop();
			TRE.folderName = TRE.folderName.replace( /-/g, ' ' );

			toc += '<h3>&#x1f4c1; <a href=#' + TRE.folder + ' > ' + TRE.folderName + '</a></h3>';

		}


		for ( var i = 0; i < TRE.filesSelected.length; i++ ) {

			TRE.file = TRE.filesSelected[ i ];
			item = TRE.file.split( '/' )

			TRE.fileName = item.pop();
			TRE.fileName = TRE.fileName.replace( /-/g, ' ' );

			toc += '<h3><a href=#' + TRE.file + ' > ' + TRE.fileName + '</a></h3>';

		}

		TREtoc.innerHTML = toc;

		if( TRE.filesSelected.length === 1 ) {


		}

	}



// called by onHashChange

	TRE.setMenuDetailsRepositoryStatistics = function() {

		var dirs, files, filesSize, item;

		dirs = 0;
		files = 0;
		filesSize = 0;

		for ( var i = 0; i < TRE.tree.length; i++ ) {

			item = TRE.tree[ i ];

			if ( item.type === 'blob' ) {

				files++;
				filesSize += item.size;

			} else {

				dirs++;

			}

		}

		TRErepoStats.innerHTML =

			'Items in repo: ' + TRE.itemsAll.length.toLocaleString() + b +
			'&bull; Folders &nbsp;  &nbsp: ' + dirs.toLocaleString() + b +
			'&bull; Files &nbsp  &nbsp  &nbsp: ' + files.toLocaleString() + b +
			'Size of files: ' + filesSize.toLocaleString() + ' bytes' +

		'';

	}


	TRE.setMenuDetailsFolderStatistics = function() {

		var dirs, files, filesSize, item;

		dirs = 0;
		files = 0;
		filesSize = 0;

		for ( var i = 0; i < TRE.tree.length; i++ ) {

			item = TRE.tree[ i ];

			if ( !item.path.match( DEF.searchInFolder ) ) { continue; }

			if ( item.type === 'blob' ) {

				files++;
				filesSize += item.size;

			} else {

				dirs++;

			}

		}

		TREfolderStats.innerHTML =

//			'Items in repo: ' + TRE.itemsAll.length.toLocaleString() + b +
			'&bull; Folders &nbsp;  &nbsp: ' + dirs.toLocaleString() + b +
			'&bull; Files &nbsp  &nbsp  &nbsp: ' + files.toLocaleString() + b +
			'Size of files: ' + filesSize.toLocaleString() + ' bytes' +

		'';

	}



// called by onHashChange

	TRE.requestGitHubAPIEvents = function() {

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

				repo = ' <a href=' + event.repo.url + ' > ' + event.repo.name.replace ( TRE.user, '' ) + '</a> ';

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


// right side menu called by onHashChange

	TRE.getUpdates = function() {

		var updates, update, txt;

		COR.requestFile( DEF.urlIssues, callback );

		function callback( xhr ) {

			updates = JSON.parse( xhr.target.responseText );

			txt = '<h2>' + DEF.repo + ' Status Updates</h2>';

			for ( var i = 0; i < updates.length; i++ ) {

				update = updates[ i ];

/*
				txt += '<h2><a href=' + update.html_url + ' >' + update.title + '</a></h2>' +
					'<div class=TREupdate >' + COR.converter.makeHtml( update.body ) + '</div>' +
				'';
*/

				body =  update.body;

//				if ( body.length > 500 ) { 

					body = '<div>' +  COR.converter.makeHtml( body.slice( 0, 500 ) ) + '</div>more...';

//				}

//				txt += '<small>issue ' + event.payload.issue.title.link( event.payload.issue.html_url ) + '</small>' + b +

				txt += '<hr><h2>' + update.title.link( update.html_url ) + '</h2>' +

					'<div class=issue ><small>' +  body + '</small></div>' +

				'';

			}

			COR.updates.innerHTML = txt + 

				'' +

				'<center>' +
					'<a href=javascript:COR.updates.scrollTop=0; style=text-decoration:none; onmouseover=pop3.style.display=""; onmouseout=pop3.style.display="none"; ><h1> &#x2766 <h1></a>' +
				'</center>' +

				'<div class=popUp id=pop3 style=display:none;bottom:100px; >' +
					'Jaanga - your 3D happy place.<br>Click here to return to the top of the page' +
				'</div>' +

			b;

		}

	};

