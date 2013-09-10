var list = {
// avoid using -,/_
// use same capitalization

	'0 Sketchbook': {
		'': [
			[ 'Current sketch', '0-Sketchbook/sketchbook'],
			[ 'Previous Home Page', '1-Home/Overview/Home Page']
		],	
		'Events': [	
			[ 'WebGl MeetUp 2013-08-22', '0-Sketchbook/webgl-2013-08-22'],
			[ 'WebGl MeetUp 2013-06-26', '0-Sketchbook/webgl-2013-06-26'],
			[ 'WebGl MeetUp @ GDC', '1-Home/Overview/WebGL MeetUp']
		]
	},

	'1 Home': {
		'Overview': [
			
			[ 'Read Me', '1-Home/Overview/ReadMe'],
			[ 'Credits', '1-Home/Overview/Credits'],
			[ 'Copyright & License', '1-Home/Overview/License'],
			[ 'Web Site', '1-Home/Overview/website']
			
		]
	},

	'2 Algesurf': {
		'Overview': [
			[ 'Case Study: Math', '2-Algesurf/1-Overview/Case Study Math'],
			[ 'Features & Futures', '2-Algesurf/1-Overview/Features'],
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

	'3 Urdacha': {
		'Overview': [
			[ 'Read Me', '3-Urdacha/overview/readme'],
			[ 'Urdacha Site', '3-Urdacha/overview/urdacha'],
			[ 'hAxis r4', '3-Urdacha/overview/haxis-r4'],
			[ 'flatland r2', '3-Urdacha/overview/flatland-r2']
		]
	},

	'4 Brain of Richard': {
		'Overview': [
			[ 'Case Sudy: MRI Scans', '4-Brain-of-Richard/overview/case study mri'],
			[ 'TheApp', '4-Brain-of-Richard/overview/theapp']
		]
	},

	'5 Blode': {
		'Overview': [
			[ 'Read Me', '5-Blode/overview/readme'],
			[ 'DAT GUI User Controls', '5-Blode/overview/datgui-user-controls'],
			[ 'WebGL on Chromebook', '5-Blode/overview/webgl-on-chromebook'],
			[ 'Brain of Richard App', '5-Blode/overview/brain-of-richard-app'],
			[ 'We Have Callbacks', '5-Blode/overview/we-have-callbacks'],
			[ 'Up and Running', '5-Blode/overview/up-and-running'],
			[ 'Now with Animation', '5-Blode/overview/now-with-animation'],

		]
	},

	'6 FGx': {
		'Overview': [
			[ 'Case Study: FGx', '6-FGx/overview/Case-Study-FGx'],
			[ 'FGx r2', '6-FGx/overview/FGx-r2'],
			[ 'airports runways navaids', '6-FGx/overview/airports-runways-navaids'],
			[ 'FGx Globe - Home', '6-FGx/overview/FGx-home']
		]
	},

	'7 cookbook': {
		'unFlatLand': [
			[ 'unFlatLand r1', '7-cookbook/unflatland/index'],
			[ 'unFlatLand r2', '7-cookbook/unflatland/unflatland-r2'],
		],
		'oSome Globe': [
			[ 'oSomeGlobe r1', '7-cookbook/osome-globe/r1/index'],
			[ 'oSomeGlobe r2', '7-cookbook/osome-globe/osome-globe-r2'],
			[ 'oSomeGlobe r4', '7-cookbook/osome-globe/index'],
		],
		'j3qUE': [
			[ 'j3qUE Read Me', '7-cookbook/j3qUE/readme'],
			[ 'j3qUE minimum', '7-cookbook/j3qUE/minimum/index'],
			[ 'j3qUE interactive', '7-cookbook/j3qUE/interactive/index']
		],
		'Samples': [
			[ 'Sidebars in File', '7-cookbook/sidebars-in-file/home-page'],
		]
	},
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