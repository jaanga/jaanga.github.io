	var QL = QL || {};

	var width = 5;
	var height = 5;

	var v2 = function( x, y ){ return new THREE.Vector2( x, y ); };
	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	var pi = Math.PI;
	var pi05 = 0.5 * pi;
	var pi_05 = -0.5 * pi;
	var pi2 = 2 * pi;

	QL.sections = [

		[ v2( width, height ), v2( width, -height ), v2( -width, -height ), v2( -width, height ), v2( width, height ) ]

	];

	QL.section = QL.sections[ 0 ];

	QL.sectionStar = function() {

		var pts = [], numPts = 8;

		for ( var i = 0; i < numPts * 2 + 1; i ++ ) {

			var l = i % 2 == 1 ? 10 : 20;

			var a = i / numPts * Math.PI;

			pts.push( new THREE.Vector2 ( Math.cos( a ) * l, Math.sin( a ) * l ) );

		}

		QL.sections.push( pts );

		return pts;

	}

	QL.sectionCircle = function( radius, numberSegments ) {

		radius = radius ? radius : 5;
		numberSegments = numberSegments ? numberSegments : 12;
		var vertices = [];

		for ( var i = 0; i <= numberSegments; i ++ ) {

			var a = i / numberSegments * 2 * Math.PI;

			vertices.push( new THREE.Vector2 ( radius * Math.cos( a ), radius * Math.sin( a ) ) );

		}

		QL.sections.push( vertices );

		return vertices;

	}


	QL.drawQlineFromPoints = function ( section, path ) {

// 2016-02-10

		var vertices, geometry, material, mesh;

		vertices = [];
		geometry = new THREE.PlaneGeometry( 10, 10, section.length - 1, path.length - 1 );

		for ( var i = 0; i < section.length; i++ ) {

			vertices.push( QL.offset ( mesh, path, section[ i ].x, section[ i ].y ) );

		};

		for ( var i = 0, j = 0; i < path.length; i++ ) {

			for ( var k = 0; k < section.length; k++ ) {

				geometry.vertices[ j++ ] = vertices[ k ][ i ];

			}

		}

		geometry.mergeVertices();
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

//		material = new THREE.MeshNormalMaterial( { side: 2, wireframe: false } );
		material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), side: 2, wireframe: false } );
		mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'qmesh';

		return mesh;

	}

	QL.drawQlineFromPointsGeo = function ( section, path ) {

// 2016-02-24

		var vertices, geometry, material, mesh;

		vertices = [];
		geometry = new THREE.PlaneGeometry( 10, 10, section.length - 1, path.length - 1 );

		for ( var i = 0; i < section.length; i++ ) {

			vertices.push( QL.offset ( mesh, path, section[ i ].x, section[ i ].y ) );

		};

		for ( var i = 0, j = 0; i < path.length; i++ ) {

			for ( var k = 0; k < section.length; k++ ) {

				geometry.vertices[ j++ ] = vertices[ k ][ i ];

			}

		}

		geometry.mergeVertices();
		geometry.computeFaceNormals();
		geometry.computeVertexNormals();

		return geometry;

	}

	QL.offset = function( obj, points, offsetX, offsetY ) {

// 2016-02-10

		var offsetY = offsetY ? offsetY : 0;
		var pt1, pt2, offsetPt1, offsetPt2, vector, angle;
		var line, lines, vertices;

		var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };
		var pi05 = 0.5 * Math.PI;

		lines = [];

		for ( var i = 0; i < points.length - 1; i++ ) {

			pt1 = points[ i ];
			pt2 = points[ i + 1 ];

			vector = pt2.clone().sub( pt1 );
			angle = Math.atan2( vector.z, vector.x );

			offsetPt1 = v( pt1.x + offsetX * Math.cos( angle - pi05 ), 0, pt1.z - offsetX * Math.sin( angle + pi05 ) );
			offsetPt2 = v( pt2.x + offsetX * Math.cos( angle - pi05 ), 0, pt2.z - offsetX * Math.sin( angle + pi05 ) );

			line = new THREE.Line3( offsetPt1, offsetPt2 );
			lines.push( line );

/* debug
			var geometry, material;
			geometry = new THREE.Geometry();
			geometry.vertices = [ offsetPt1, offsetPt2 ];
			material = new THREE.LineBasicMaterial( { color: 'magenta' } );
			line = new THREE.Line( geometry, material );
			line.position.y = -5;
			obj.add( line );
*/

		}

		if ( points[ 0 ].distanceTo( points[ points.length - 1 ] ) < 0.01 ) {

			pt1 = intersectionTwoLines2( lines[ 0 ], lines [ lines.length - 1 ] );
			pt2 = pt1;

		} else {

			pt1 = lines[ 0 ].start;
			pt2 = lines[ lines.length - 1 ].end;

		}

		vertices = [ v( pt1.x, offsetY, pt1.z ) ];

		for ( var i = 0; i < lines.length; i++ ) {

			if ( i < lines.length - 1 ) {

				var pt = QL.intersectionTwoLines2( lines[ i ], lines [ i + 1 ] );

			} else {

				pt = pt2;

			}

			vertices.push( v( pt.x, offsetY, pt.z ) );

		}

/* debug
		geometry = new THREE.Geometry();
		geometry.vertices = vertices;
		material = new THREE.LineBasicMaterial( { color: 'yellow' } );
		line = new THREE.Line( geometry, material );
		obj.add( line );
*/

		return vertices;

	}

	QL.intersectionTwoLines2 = function( line1, line2 ) {

// 2016-02-10
// Thanks to http://jsfiddle.net/justin_c_rounds/Gd2S2/ && http://jsfiddle.net/user/justin_c_rounds/fiddles/

		var ptA = line1.start;
		var ptB = line1.end;
		var ptC = line2.start;
		var ptD = line2.end;
		var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

		var denominator = ( ptD.z - ptC.z ) * ( ptB.x - ptA.x ) - ( ptD.x - ptC.x ) * ( ptB.z - ptA.z );

		if ( denominator == 0 ) { return; }

		var a = ( ( ptD.x - ptC.x ) * ( ptA.z - ptC.z ) - ( ptD.z - ptC.z ) * ( ptA.x - ptC.x ) ) / denominator;
		var x = ptA.x + ( a * ( ptB.x - ptA.x ) );
		var z = ptA.z + ( a * ( ptB.z - ptA.z ) );

		return v( x, 0, z );

	}
