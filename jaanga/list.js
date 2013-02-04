var list = {
// avoid using -,/_
// use same capitalization

	'1 Overview': {
		'Category': [
			[ 'Home Page', '1-Overview/Category/Home Page'],
			[ 'Read Me', '1-Overview/Category/Read Me'],
			[ 'Credits', '1-Overview/Category/Credits'],
			[ 'License', '1-Overview/Category/License']
		]
	},
	
	'2 AlgeSurf': {
		'API Overview': [
			[ 'Read Me', '2-Algesurf/1-Overview/Read Me'],
			[ 'Builder', '2-Algesurf/1-Overview/Builder'],
			[ 'Player', '2-Algesurf/1-Overview/Player'],
			[ 'Credits', '2-Algesurf/1-Overview/Credits'],
			[ 'Multiple Viewport Demo', '2-Algesurf/1-Overview/Multiple Viewport Demo']
		],
		'Hauser 1': [
			[ 'Read Me', '2-Algesurf/2-Hauser/Read Me'],
			[ 'Hauser 1', '2-Algesurf/2-Hauser/1hauser'],
			[ 'Hauser 2', '2-Algesurf/3-Hauser/2hauser'],
			// [ '', '2-Algesurf/Hauser 1/'],
		],		

		'Jalape': [
			[ 'Jalape', '2-Algesurf/4-Jalape/1jalape']
		]		
	},
	
	'3 Brain': {
		'Category 3 1': [
			[ 'File 3 1 1', '3-Brain/Category-3-1/File-3-1-1','image']
		]		
	}
};	


var pages = {};

for ( var section in list ) {
	pages[ section ] = {};
	for ( var category in list[ section ] ) {
		pages[ section ][ category ] = {};
		for ( var i = 0; i < list[ section ][ category ].length; i ++ ) {
			var page = list[ section ][ category ][ i ];
			pages[ section ][ category ][ page[ 0 ] ] = page[ 1 ];
		}
	}
}
// console.log('list: ', list, pages );