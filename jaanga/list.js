var list = {
// avoid using -,/_
// use same capitalization

	'1 Home': {
		'Overview': [
			[ 'Home Page', '1-Home/Overview/Home Page'],
			[ 'Read Me', '1-Home/Overview/Read Me'],
			[ 'Credits', '1-Home/Overview/Credits'],
			[ 'License', '1-Home/Overview/License']
		]
	},
	
	'2 Algesurf': {
		'API Overview': [
			[ 'Read Me', '2-Algesurf/1-Overview/Read Me'],
			[ 'Credits', '2-Algesurf/1-Overview/Credits'],
			[ 'Builder', '2-Algesurf/1-Overview/Builder'],
			[ 'Player - sequence', '2-Algesurf/1-Overview/Player'],
			[ 'Player - single', '2-Algesurf/1-Overview/Player','?title=stemkoski&play=10&spin=0'],
			[ 'Multiple Viewport Demo', '2-Algesurf/1-Overview/Multiple Viewport Demo']
		],
		'Hauser Gallery': [
			[ 'Read Me', '2-Algesurf/2-Hauser/Read Me'],
			[ 'Hauser 1', '2-Algesurf/2-Hauser/1hauser'],
			[ 'Hauser 2', '2-Algesurf/3-Hauser/2hauser'],
			// [ '', '2-Algesurf/Hauser 1/'],
		],		

		'Jalape Gallery': [
			[ 'Read Me', '2-Algesurf/4-Jalape/read-me-jalape'],
			[ 'Jalape', '2-Algesurf/4-Jalape/1jalape']
		],
		'XY Surface': [
			[ 'Read Me', '2-Algesurf/5-XY-Surface/read-me-xy-surface'],
			[ 'XY Surface', '2-Algesurf/5-XY-Surface/xy-surface']
		],
	},
	
	'3 Brain of Richard': {
		'Overview': [
			[ 'Read Me', '3-Brain-of-Richard/overview/readme'],
			[ 'The App', '3-Brain-of-Richard/overview/theapp']
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