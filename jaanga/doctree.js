	
	var DELIMITER = '/';
	var nameCategoryMap = {};
	
	for ( var section in list ) {
		// var id = section.toString().substr(0,1);
	
		var id = section.replace( /\ /g, '-' );
// console.log(id, section);			
		html += '<h1 id="h' + id + '" onclick="toggleSection(\'' + id + '\')" >' + section + '<br>' ;
		html += '<img  style="padding: 10px 0 0 30px;" src="' + subDir + id + '/' + id + '.png" \/></h1>';
		html += '<ul id="c' + id + '">';
		for ( var category in list[ section ] ) {
			html += '<h3>' + category + '</h3>';
			html += '<ul  id="u' + id + '" >';
			for ( var i = 0; i < list[ section ][ category ].length; i ++ ) {
				var page = list[ section ][ category ][ i ];
				// html += '<li><a href="javascript:goTo(\'' + section + '\', \'' + category + '\', \'' + page[ 0 ] + '\')">' + page[ 0 ];
				if (page[2] == 'image') {
					//html += '<li><a href="javascript:goTo(\'' + '\', \'' + category + '\', \'' + page[ 0 ] + '\')">' + page[ 0 ];
					
					html += '<li><a href="javascript:goTo(\'' + section + '\', \'' + category + '\', \'' + page[ 0 ] + '\')">' + page[ 0 ];
					html += '<br><img alt="' + page[2] + '" title="' + page[2] + '" src="' + subDir + page[1] + '.png"></a></li>';
				} else if (page[2] !== undefined ) {
// console.log(page[2]);		
					html += '<li><a href="javascript:goTo(\'' + section + '\', \'' + category + '\', \'' + page[ 0 ]+ '\', \'' + page[2] + '\')">' + page[ 0 ];
					html += '</a></li>';
				} else {
					html += '<li><a href="javascript:goTo(\'' + section + '\', \'' + category + '\', \'' + page[ 0 ] + '\')">' + page[ 0 ];
					html += '</a></li>';
				}
				nameCategoryMap[page[0]] = {
					section: section,
					category: category,
					name: page[0]
				};
			}
			html += '</ul>';
		}
		html += '</ul>';	
	}
	panel.innerHTML += html;
	
	var hdr = document.getElementById('h' + '1-Home');
	hdr.innerHTML = '- ' + hdr.innerHTML.substr(2);
	// toggleSection( 1 );
	toggleSection( '0-Sketchbook' );
	toggleSection( '2-Algesurf' );
	toggleSection( '3-Urdacha' );
	toggleSection( '4-Brain-of-Richard' );	
	toggleSection( '5-Blode' );
	toggleSection( '6-FGx' );
	toggleSection( '7-cookbook' );
	
	function encodeUrl( path ) {
		return path.replace(/\ \/\ /g, '.').replace(/\ /g, '_');
	}

	function decodeUrl( path ) {
		return path.replace(/_/g, ' ').replace(/\./g, ' / ');
	}

	// Page loading
	function goTo( section, category, name, query ) {
		// Fully resolve links that only provide a name
		if(arguments.length == 1) {
			var location = nameCategoryMap[section];
			section = location.section;
			category = location.category;
			name = location.name;
		}
		var title = name + '-' + category + '-' + section + '-' + appName;
		var url = encodeUrl(section) + DELIMITER + encodeUrl( category ) + DELIMITER + encodeUrl(name);
		if (query == undefined) {query = '';}
		window.location.hash = url;
console.log('url: ', url);		
		window.document.title = title;

		viewer.src = subDir + pages[ section ][ category ][ name ] + '.html' + query;
	}

	function goToHash() {
		var hash = window.location.hash.substring( 1 ).split(DELIMITER);
		goTo( decodeUrl(hash[0]), decodeUrl(hash[1]), decodeUrl(hash[2]) );
	}

	window.addEventListener( 'hashchange', goToHash, false );

	if ( window.location.hash.length > 0 ) goToHash();

	function toggleSection(id ) {
		var cat = document.getElementById('c' + id);
// console.log(id, cat, hdr);
		var hdr = document.getElementById('h' + id);	
		if ( cat.style.display == '' || cat.style.display == 'block' ) {
			cat.style.display = 'none';	
			hdr.innerHTML = '+ ' + hdr.innerHTML.substr(2);
		} else {
			cat.style.display = 'block';
			hdr.innerHTML = '- ' + hdr.innerHTML.substr(2);
		}	
	}