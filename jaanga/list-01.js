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
			[ 'Hauser1', '2-Algesurf/2-Hauser/1hauser'],
			/*
			// [ 'Stemkoski', '2-Algesurf/2-Hauser/stemkoski','image'],
			[ 'Calyx', '2-Algesurf/2-Hauser/Calyx','image'],
			[ 'Calypso', '2-Algesurf/2-Hauser/Calypso','image'],
			[ 'Columpius', '2-Algesurf/2-Hauser/Columpius','image'],
			[ 'Cube', '2-Algesurf/2-Hauser/cube','image'],
			[ 'Dattel', '2-Algesurf/2-Hauser/dattel','image'],
			[ 'Daisy', '2-Algesurf/2-Hauser/daisy','image'],
			[ 'DingDong', '2-Algesurf/2-Hauser/dingDong','image'],
			[ 'Distel', '2-Algesurf/2-Hauser/distel','image'],
			[ 'Durchblick', '2-Algesurf/2-Hauser/durchblick'],
			[ 'Eistüte', '2-Algesurf/2-Hauser/eistüte','image'],
			[ 'Eve', '2-Algesurf/2-Hauser/eve','image'],
			[ 'Flirt', '2-Algesurf/2-Hauser/flirt','image'],
			[ 'Geisha', '2-Algesurf/2-Hauser/geisha','image'],
			[ 'Harlekin', '2-Algesurf/2-Hauser/harlekin','image'],
			[ 'Helix', '2-Algesurf/2-Hauser/helix','image'],
			[ 'Herz', '2-Algesurf/2-Hauser/herz','image'],
			[ 'Himmel und Hölle', '2-Algesurf/2-Hauser/himmel und Hölle','image'],
			[ 'Kolobri', '2-Algesurf/2-Hauser/kolobri','image'],
			[ 'Leopold', '2-Algesurf/2-Hauser/leopold','image'],
			[ 'octdong', '2-Algesurf/2-Hauser/octdong','image'],
			[ 'plop', '2-Algesurf/2-Hauser/plop','image'],
			[ 'Seepferdchen', '2-Algesurf/2-Hauser/Seepferdchen','image'],
			[ 'Sofa', '2-Algesurf/2-Hauser/Sofa','image'],
			[ 'Solitude', '2-Algesurf/2-Hauser/Solitude','image'],
			[ 'Süss', '2-Algesurf/2-Hauser/Süss','image'],
			[ 'Tanz', '2-Algesurf/2-Hauser/Tanz','image'],
			[ 'Taube', '2-Algesurf/2-Hauser/Taube','image'],
			// [ 'Quaste - broken', '2-Algesurf/2-Hauser/Quaste'],
			[ 'Spitz', '2-Algesurf/2-Hauser/Spitz','image'],
			[ 'Tobel', '2-Algesurf/2-Hauser/Tobel','image'],
			[ 'Vis a vis', '2-Algesurf/2-Hauser/Vis a vis','image'],
			[ 'Wedeln', '2-Algesurf/2-Hauser/Wedeln','image'],
			[ 'Windkanal', '2-Algesurf/2-Hauser/Windkanal','image'],
			[ 'Xano', '2-Algesurf/2-Hauser/Xano','image'],
			[ 'Zitrus', '2-Algesurf/2-Hauser/Zitrus','image'],
*/

			// [ '', '2-Algesurf/Hauser 1/'],
		],		
// ["croissant", "dromedar", "Zeppelin", "Zweiloch", "Michaelangelo", "Stern", "Möbius", "Sphäre", "Limao", "Torus", "Whitney", "Buggle", "Zylinder", "diabolo", "dullo", "Miau", "Trichter", "Nepali", "Pilzchen", "Subway", "Polsterzipf", "crixxi", "Berg", "Gupf", "Kegel", "Wigwam", "Tuelle", "Pipe", "Fanfare", "Kreuz", "Spindel", "Twilight", "Ufo", "Wendel", "Zeck", "Sattel", "Schneeflocke", "cylinder", "cylinder 1", "cylinder 3", "Bifolia", "Boy Surface (broken)", "cassini", "chair", "cayley Cubic", "clebsh diagonal cubic", "crossed trough", "cubic saddle", "cushion"]		
		'Hauser 2': [
			[ 'File 1 3 1', '2-Algesurf/3-Hauser/File-1-3-1']
		],
		'Jalape': [
			[ 'File 1 3 1', '2-Algesurf/4-Jalape/File-1-3-1']
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