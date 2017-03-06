
	var edges;
	var helpers;

	var screws = [];
	var pegs = [];
	var placards = [];

	var holes;
	var hardware;

	var thickness = 1;

	var pi = Math.PI;
	var pi05 = 0.5 * pi;
	var pi_05 = -0.5 * pi;
	var pi2 = 2 * pi;

	var cos = function( a ){ return Math.cos( a ); };
	var sin = function( a ){ return Math.sin( a ); };

	var ran = function( n ) { return n * Math.random(); };
	var sign = function( n ) { return Math.sign( n ); };

	var v2 = function( x, y ){ return new THREE.Vector2( x, y ); };
	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	var textureCase;

	var materialCase = new THREE.MeshNormalMaterial();
	materialCase.name = 'materialCase';

	var materialCaseColor = 0xf8f8f8;

	var geometryHole = new THREE.CircleBufferGeometry( 1, 12 );
	var materialHole = new THREE.MeshBasicMaterial( { color: 0x000000, side: 2 } );

	var geometryScrew = new THREE.CylinderGeometry( 1, 0.3, 10 );
	var materialScrew = new THREE.MeshNormalMaterial();

	var geometryPeg = new THREE.CylinderGeometry( 0.8, 0.8, 5 );
	var materialPeg = new THREE.MeshBasicMaterial( { color: 0x0aa8888 } );


	function draw_helpers( length ) {

		helpers = new THREE.Object3D();

		var gridHelper = new THREE.GridHelper( length, 10 );
		gridHelper.position.set( 0, 0, 0 );
		helpers.add( gridHelper );

		var axisHelper = new THREE.AxisHelper( length );
		helpers.add( axisHelper );

		scene.add( helpers );

	}

	function build_hole( obj, x, y, z, aX, aY, aZ, type ) {

		var mesh = new THREE.Mesh( geometryHole, materialHole );
		mesh.name = 'hole';
		mesh.position.set( x + sign( x ) * 0.1 , y + sign( y ) * 0.1, z  + sign( z ) * 0.1); // to stop shimmering
		mesh.rotation.set( aX, aY, aZ );

		holes.push( mesh );

		if ( type === 'pegHole' ) {

			draw_peg_101339( mesh );

		} else if ( type === 'screwHole' ) {

			draw_screw_1004321_104322( mesh );

		}

		obj.add( mesh );

	}

	function build_hole2( obj, x, y, z, aX, aY, aZ, drawType ) {

		var mesh = new THREE.Mesh( geometryHole, materialHole );
		mesh.name = 'hole';
		mesh.position.set( x + sign( x ) * 0.1 , y + sign( y ) * 0.1, z  + sign( z ) * 0.1); // to stop shimmering
		mesh.rotation.set( aX, aY, aZ );

		holes.push( mesh );
/*
		if ( type === 'pegHole' ) {

			draw_peg_101339( mesh );

		} else if ( type === 'screwHole' ) {

			draw_screw_1004321_104322( mesh );

		}
*/

		if ( drawType ) { drawType( mesh ); }

		obj.add( mesh );

	}

	function draw_peg_101339 ( hole ) {

		var mesh = new THREE.Mesh( geometryPeg, materialPeg );
		var offsetX = height05Case + 20;
		var offsetZ =  - width05Case - 20;
		var a = ran( pi2 );
		var r = ran( 25 );

		mesh.userData.places = [];
		mesh.userData.places.push( { parent: hardware, scale: 1, pX: offsetX + r * cos( a ), pY: ran( 5 ), pZ: offsetZ + r * sin ( a ), rX: 0, rY: ran( 3 ), rZ: -pi05  } );
		mesh.userData.places.push( { parent: hole, scale: 1, pX: 0, pY: 0, pZ: 0, rX: pi05, rY: 0, rZ: 0 } ); // assembled

		mesh.userData.places.push( { parent: hole, scale: 3, pX: 0, pY: 0, pZ: 20, rX: pi05, rY: 0, rZ: 0 } );

		mesh.name = 'peg ' + pegs.length;
		mesh.userData.holeParent = hole;

		hole.name = 'peg location ' + pegs.length;
		hole.userData.peg = mesh;

		var placard = build_placard( '101339', 0.05, 120, 0, 20, 0 );
		placards.push( placard );
		mesh.add( placard );

		pegs.push( mesh );

		edge = new THREE.EdgesHelper( mesh, edgesColor );
		edges.add( edge );

		return mesh;

	}

	function draw_bracket115753() {

		var widthLeaf1 = 18;
		var widthLeaf2 = 12;
		var widthCorner = 4;

		var radiusLeaf1 = 4;
		var segments = 6;

		var geometry = buildKallaxWallBracketSide1();
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( - widthCorner - 0.5 * widthLeaf1, 0, -0.5 * widthLeaf2 - widthCorner ) );

		geo2 = buildKallaxWallBracketSide2();
		geo2.applyMatrix( new THREE.Matrix4().makeTranslation( 0,0, -thickness ) );
		geo2.applyMatrix( new THREE.Matrix4().makeRotationY( pi05 ) );
		geometry.merge( geo2 );

		geo2 = buildKallaxWallBracketCorner( 4 );
		geo2.applyMatrix( new THREE.Matrix4().makeRotationX( -pi05 ) );
		geo2.applyMatrix( new THREE.Matrix4().makeRotationZ( pi ) );
		geo2.applyMatrix( new THREE.Matrix4().makeTranslation( - 0.5 * widthCorner, 0.5 * heightBracket, - 0.5 * widthLeaf2  - 0 * widthCorner  ) );
		geometry.merge( geo2 );

		geo2 = buildKallaxWallBracketCorner( 4 );
		geo2.applyMatrix( new THREE.Matrix4().makeRotationX( -pi05 ) );
		geo2.applyMatrix( new THREE.Matrix4().makeRotationZ( pi ) );
		geo2.applyMatrix( new THREE.Matrix4().makeTranslation( - 0.5 * widthCorner, - 0.5 * heightBracket + 4, - 0.5 * widthLeaf2  - 0 * widthCorner  ) );
		geometry.merge( geo2 );

		geo2 = buildKallaxWallBracketCorner( heightBracket - 12 );
		geo2.applyMatrix( new THREE.Matrix4().makeRotationX( pi05 ) );
		geo2.applyMatrix( new THREE.Matrix4().makeTranslation( - 0.5 * widthCorner, 0.25 * heightBracket + 1.5 , - 0.5 * widthLeaf2 - widthCorner  ) );

		geometry.merge( geo2 );

		geometry.mergeVertices ();

		var material = new THREE.MeshNormalMaterial();

		var mesh = new THREE.Mesh( geometry, material );
		mesh.castShadow = mesh.receiveShadow = true;

		mesh.userData.places = [];
		mesh.name = 'bracket115753';

		var line = buildKallaxWallBracketSide1Lines();
		line.position.set( - widthCorner - 0.5 * widthLeaf1, -0.5 * heightBracket, - 0.5 * widthLeaf2 - widthCorner + thickness + 0.01 );
		mesh.add( line );

		return mesh;

		function buildKallaxWallBracketSide1() {

			var width = widthLeaf1;
			var width05 = 0.5 * width;
			var height05 = 0.5 * heightBracket;

			pts = [

				v2( width05, height05 ),
				v2( width05, -height05 ),
				v2( -width05, -height05 ),
				v2( -width05, height05 )

			];

			var holePath = new THREE.Path();
			holePath.absarc( 0, 0, radiusLeaf1, 0, Math.PI * 2, true );

			var shape = new THREE.Shape();
			shape.fromPoints( pts );
			shape.holes.push( holePath );

			var geometry = shape.extrude( { amount: thickness, bevelEnabled: false} );

			return geometry;

		}

		function buildKallaxWallBracketCorner( amount) {

			var width = widthCorner;
			var width05 = 0.5 * width;

			var pts = [ v2( -width05, 0 ) ];

			for ( var i = 0; i < segments + 1; i++ ) {

				angle = -pi05 + i * pi05 / segments;
				pts.push( v2( width05 - thickness + thickness * cos( angle), thickness + thickness * sin( angle ) ) );

			}

			pts = pts.concat( [
				v2( width05, width),
				v2( width05 - thickness, width ),
				v2( width05 - thickness, thickness + thickness / segments),
				v2( width05 - thickness - thickness / segments, thickness),
				v2( -width05, thickness)
			] );

			var shape = new THREE.Shape();
			shape.fromPoints( pts );

			var geometry = shape.extrude( { amount: amount, bevelEnabled: false} );

			return geometry;

		}

		function buildKallaxWallBracketSide2() {

			var width = widthLeaf2;
			var width05 = 0.5 * width;

			var height05 = 0.5 * heightBracket;

			var pts = [

				v2( width05, height05 ),
				v2( width05, -height05 ),
				v2( -width05, -height05 ),
				v2( -width05, height05 )

			];

			var shape = new THREE.Shape();
			shape.fromPoints( pts );
			var geometry = new THREE.Geometry();
			var geo2;

			for ( var i = 0; i < 2; i++ ) {

				var x = i === 0 ? width05 - 2.2 * radiusScrew : -width05 + 2.2 * radiusScrew;

				for ( var j = 0; j < 2; j++ ) {

					y = j === 0 ? height05 - 3 * radiusScrew : -height05 + 3 * radiusScrew;

					var holePath = new THREE.Path();
					holePath.absarc( x, y, radiusScrew + thickness, 0, Math.PI * 2, true );
					shape.holes.push( holePath );

					pts = [ v2( radiusScrew + thickness, thickness ) , v2( radiusScrew, thickness ), v2( radiusScrew + thickness, 0 ) ];

					geo2 = new THREE.LatheGeometry( pts, 4 * segments );
					geo2.applyMatrix( new THREE.Matrix4().makeRotationX( pi05 ) );

					geo2.applyMatrix( new THREE.Matrix4().makeTranslation( x, y, 0  ) );

					geometry.merge( geo2 );

				}

			}

			geo2 = shape.extrude( { amount: thickness, bevelEnabled: false} );
			geometry.merge( geo2 );

			return geometry;

		}

		function buildKallaxWallBracketSide1Lines() {

			var number = 9;
			var diff = 1;

			var width = widthLeaf1;
			var width05 = 0.5 * width;

			var height05 = 0.5 * heightBracket;

			var geometry = new THREE.Geometry();

			for ( var i = 0; i < number ; i++ ) {

				geometry.vertices.push( v( -width05 + diff, heightBracket - diff - i * diff, 0 ) );
				geometry.vertices.push( v( width05 - diff, heightBracket - diff - i * diff, 0 ) );

				geometry.vertices.push( v( -width05 + diff, diff + i * diff, 0 ) );
				geometry.vertices.push( v( width05 - diff, diff + i * diff, 0 ) );

			}

			var material = new THREE.LineBasicMaterial( { color: 0x000000 } );
			var lines = new THREE.LineSegments( geometry, material  );

			return lines;

		}

	}

	function draw_part103693() {

		var startX;
		var startY;
		var rectWidth;
		var rectWidth05;
		var rectHeight;
		var radius1;
		var radius2;

		material = new THREE.MeshNormalMaterial();

		startX = 0;
		startY = 0;
		rectWidth = 15;
		rectWidth05 = 0.5 * rectWidth;
		rectHeight = 20;
		radius1 = 2.25;
		radius2 = 3.5;
		radius3 = 1;

		var pts = [
			v2( startX, startY ),
			v2( startX + rectWidth, startY ),
			v2( startX + rectWidth, startY + rectHeight ),
			v2( startX, startY + rectHeight ),
		];

// main section with keyhole
		var shape = new THREE.Shape();
		shape.fromPoints( pts );

		var holePath = new THREE.Path();

		holePath.absarc( startX + rectWidth05, startY + 5 * radius1, radius1,  0, pi );
		holePath.moveTo( startX + rectWidth05 + radius1, startY + 8.25 );
		holePath.absarc( startX + rectWidth05, startY + radius1 + radius2, radius2, pi - 0.8, pi2 + 0.8 );

		shape.holes.push( holePath );

		var geometry = shape.extrude( { amount: thickness, bevelEnabled: false } );

// bumps
		shape = new THREE.Shape();

		shape.absarc( startX + radius1, startY + rectHeight - 1 * radius1, radius3, 0, pi );
		shape.absarc( startX + radius1, startY + 1 * radius1, radius3, pi, pi2 );

		var geo2 = shape.extrude( { amount: thickness, bevelEnabled: false } );
		geo2.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, thickness ) );
		geometry.merge( geo2 );

		var geo3 = shape.extrude( { amount: thickness, bevelEnabled: false } );
		geo3.applyMatrix( new THREE.Matrix4().makeTranslation( rectWidth - 2 * radius1, 0, thickness ) );
		geometry.merge( geo3 );

// curved ends
		shape = new THREE.Shape();
		shape.absarc( startX + 2 * thickness, 0, thickness + 2, pi, 1.25 * pi );
		shape.moveTo( startX, 0 );
		shape.absarc( startX + 2 * thickness, 0, 2, 1.25 * pi, pi );

		var geo4 = shape.extrude( { amount: rectWidth, bevelEnabled: false } );
		geo4.applyMatrix( new THREE.Matrix4().makeRotationY( pi05) );
		geometry.merge( geo4 );

		var geo5 = shape.extrude( { amount: rectWidth, bevelEnabled: false } );
		geo5.applyMatrix( new THREE.Matrix4().makeRotationZ( pi) );
		geo5.applyMatrix( new THREE.Matrix4().makeRotationY( -pi05 ) );
		geo5.applyMatrix( new THREE.Matrix4().makeTranslation( rectWidth, rectHeight, 0 ) );

		geometry.merge( geo5 );
		geometry.mergeVertices ();


		var mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'part103693';
		mesh.userData.places = [];

//		objects.push( mesh );

		return mesh;

	}

	function draw_screw_1004321_104322( hole ) {

		var material = new THREE.MeshNormalMaterial( { side: 2 } );

		var radiusScrew = 0.5
		var radiusScrew05 = 0.5 * radiusScrew;
		var radiusScrew025 = 0.25 * radiusScrew;

		var delta = radiusScrew;
		var length = 10;
		var length05 = 0.5 * length;
		var lengthShaft = 0.3 * length;

		var pitch = radiusScrew;
		var segments = 12;


		var points = [

// needs hex head + work on spiral

// head

			v2( radiusScrew, length05 ),
			v2( radiusScrew + delta, length05 ),
			v2( radiusScrew, length05 - delta ),

// body and tip
			v2( radiusScrew, lengthShaft ),
			v2( radiusScrew05, lengthShaft ),

			v2( radiusScrew05, -lengthShaft ),
			v2( 0, -lengthShaft - delta )

		];

		var geometry = new THREE.LatheGeometry( points, segments );

// drawSpiralAlongZ( rIn, rOut, seg, tur, pit ) {

		var geo2 = build_spiralAlongZ( radiusScrew05, radiusScrew, segments, length05 / pitch, pitch );
		geo2.applyMatrix( new THREE.Matrix4().makeRotationX( pi05 ) );
		geo2.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 2.5, 0 ) );

		geometry.merge( geo2 );

		var mesh = new THREE.Mesh( geometry, material );

		var offsetX = - width05Case - 10;
		var offsetZ =  height05Case + 10;

		mesh.userData.places = [];
		mesh.userData.places.push( { parent: hardware, scale: 1, pX: offsetX + ran( 10 ), pY: ran( 5 ), pZ: offsetZ + ran( 10 ), rX: 0, rY: ran( 3 ), rZ: -pi05 } );
		mesh.userData.places.push( { parent: hole, scale: 1, pX: 0, pY: 0, pZ: 1.5 - thicknessCase, rX: pi05, rY: -16 * pi, rZ: 0 } ); // assembled
		mesh.userData.places.push( { parent: hole, scale: 3, pX: 0, pY: 0, pZ: 20, rX: pi05, rY: 0, rZ: 0 } );

		mesh.name = 'screw ' + screws.length;
		mesh.userData.holeParent = hole;

		var placard = build_placard( [ '1004321', '104322' ], 0.05, 120, 0, 20, 0 );
		placards.push( placard );
		mesh.add( placard );

		hole.name = 'screw location ' + screws.length;
		hole.userData.screw = mesh;

		screws.push( mesh );

		return mesh;

	}

	function draw_screw100372() {

		var radiusScrew05 = 0.5 * radiusScrew;
		var delta = 2;
		var height = 20;
		var height05 = 0.5 * height;
		var pitch = 2;
		var segments = 12;

		var material = new THREE.MeshNormalMaterial( { side: 2 } );
		var points = [

// head
			v2( radiusScrew05 + delta, height05 + delta ),
			v2( radiusScrew05, height05 ),

// body and tip
			v2( radiusScrew05, -height05 ),
			v2( 0, -height05 - delta )

		];

		var geometry = new THREE.LatheGeometry( points, segments );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( pi05 ) );

		var geo2 = build_phillipsHead( radiusScrew + 1.25, radiusScrew + 1.25 ); // createPhillipsHead( radius, height, rows );
		geo2.applyMatrix( new THREE.Matrix4().makeRotationX( pi_05 ) );
		geo2.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, height05 + delta ) );

		geometry.merge( geo2 );

		geo2 = build_spiralAlongZ( radiusScrew05, radiusScrew05 + 1, segments, height / pitch, pitch );
		geo2.center();
		geometry.merge( geo2 );

		var mesh = new THREE.Mesh( geometry, material );

		mesh.name = 'screw100372';
		mesh.userData.places = [];
		mesh.userData.radiusScrew = radiusScrew;

		return mesh;

		function build_phillipsHead( radius, height, rows ) {

			radius = radius ? radius : 20;
			height = height ? height : -20;
			var columns = 12;
			rows = rows ? rows : 2;

			var geometry = new THREE.PlaneGeometry(  1, 1, columns, rows );
			var vertices = geometry.vertices;
			var count = 0;
			var raddii = [ 1, 0.75, 0.25 ];
			var r, offset;

			for ( var i = 0; i <= rows; i++ ) {

				var theta = pi2 / columns;

				for ( var j = 0; j <= columns; j++ ) {

					if ( i === 0 ) {

						r = radius * raddii[ i ];
						offset = 0;

					} else {

						r = j % 3 === 0 ? 0.5 * raddii[ i ] * radius : raddii[ i ] * radius;
						offset = - height / rows;

					}

					vt = vertices[ count++ ];
					vt.x = r * cos( theta * j );
					vt.y = i * height / rows + offset;
					vt.z = r * sin( theta * j );

				}

			}

			geometry.computeFaceNormals();
			geometry.computeVertexNormals();

			return geometry;

		}

	}

	function build_spiralAlongZ( rIn, rOut, seg, tur, pit ) {

// 2016-02-28

		var radiusInside = rIn ? rIn : 10;
		var radiusOutside = rOut ? rOut : 15;

		var segments = seg ? seg : 36;
		var turns = tur ? tur : 7;
		var segementsTotal = turns * segments;

		var pitch = pit ? pit : 15;
		var pitchDelta = 0.5 * pitch / segments;

		var angleDelta = Math.PI / segments;

		var geometry = new THREE.PlaneGeometry( 1, 1, 1, segementsTotal );
		var vertices = geometry.vertices;

		for ( var i = 0; i < vertices.length; i++ ) {

			var v = vertices[ i ];

			if ( v.x < 0 ) {

				v.x = radiusInside * Math.cos( angleDelta * i );
				v.y = radiusInside * Math.sin( angleDelta * i );
				v.z = pitchDelta * i;

			} else {

				v.x = radiusOutside * Math.cos( angleDelta * i );
				v.y = radiusOutside * Math.sin( angleDelta * i );
				v.z = pitchDelta * i;

			}

		}

//		geometry.center();

		return geometry;

	}

	function draw_fixture() {

		var width = 100;
		var height = 300;
		var thickness = 10;

		var pts = [

			v2( width, height ),
			v2( width, -height ),
			v2( -width, -height ),
			v2( -width, height )

		];

		var shape = new THREE.Shape();
		shape.fromPoints( pts );

		var holeTop = v( + width - 5 * radiusScrew, 0, 0 );

		var holePath = new THREE.Path();
		holePath.absarc( holeTop.x, holeTop.y + 0.5 * heightBracket - 3 * radiusScrew, radiusScrew, 0, Math.PI * 2, true );
		shape.holes.push( holePath );

		holePath = new THREE.Path();
		holePath.absarc( holeTop.x, holeTop.y - 0.5 * heightBracket + 3 * radiusScrew, radiusScrew, 0, Math.PI * 2, true );
		shape.holes.push( holePath );

		geometry = shape.extrude( { amount: thickness, bevelEnabled: false} );

		material = new THREE.MeshNormalMaterial( { side: 2 });

		var mesh = new THREE.Mesh( geometry, material );

		mesh.name = 'fixture';
		mesh.userData.places = [];

		return mesh;

	}

// tools


	function draw_hexKey_100092() {

		var radius = 0.5;
		var bend = 2;
		var length = 10;
		var width = 3;
		var shaft = 2;
		var segments = 12;

// TorusGeometry( radius, tube, radialSegments, tubularSegments, arc )
		geometry = new THREE.TorusGeometry( 2, radius, segments, 5, pi05 );

// CylinderGeometry( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded )
		var geo2 = new THREE.CylinderGeometry( radius, radius, length  );
		geo2.applyMatrix( new THREE.Matrix4().makeTranslation( bend, -0.5 * length, 0 ) );
		geometry.merge( geo2 );

		geo2 = new THREE.CylinderGeometry( radius, radius, shaft  );
		geo2.applyMatrix( new THREE.Matrix4().makeTranslation( bend, - length - 0.5 * shaft, 0 ) );
		geometry.merge( geo2 );

		geo2 = new THREE.CylinderGeometry( radius, radius, width  );
		geo2.applyMatrix( new THREE.Matrix4().makeRotationZ( -pi05 ) );
		geo2.applyMatrix( new THREE.Matrix4().makeTranslation( -0.5 * width, bend, 0 ) );
		geometry.merge( geo2 );

		geo2 = new THREE.CylinderGeometry( radius, radius, shaft, 6 );
		geo2.applyMatrix( new THREE.Matrix4().makeRotationZ( -pi05 ) );
		geo2.applyMatrix( new THREE.Matrix4().makeTranslation( -width - 0.5 * shaft, bend, 0 ) );
		geometry.merge( geo2 );

//		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -pi05 ) );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -bend, length + shaft, 0 ) );

		material = new THREE.MeshPhongMaterial( { color: 0xffffff } );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'hexKey_100092';
		mesh.userData.places = [];

		var placard = build_placard( '100092', 0.05, 120, 0, 20, 0 );
		placards.push( placard );
		mesh.add( placard );

		mesh.userData.radius = radius;

		return mesh;


	}


	function draw_hexKey_100001() {

		var section = QL.sectionCircle( 2 );

		var radiusSection = 2;
		var radiusPath = 5;
		var lengthHex = 6;
		var lengthShort = 15;
		var lengthLong = 60;
		var segments = 6;

		var points = [ v( 0, 0, 10 ) ];

		var angle = pi05 / segments;

		for ( var i = 0; i <= 6; i++ ) {

			points.push( v( -radiusPath * Math.cos( i * angle ) + radiusPath, 0, lengthHex + lengthShort + radiusPath * Math.sin( i * angle ) ) );

		}

		for ( var i = 0; i <= 6; i++ ) {

			points.push( v( radiusPath * Math.cos( i * angle - 1.57 ) + lengthLong + radiusPath, 0, lengthHex + lengthShort + 2 * radiusPath + radiusPath * Math.sin( i * angle - 1.57 ) ) );

		}

		points.push( v( lengthLong + 2 * radiusPath, 0, lengthHex + 2 * lengthShort + 2 * radiusPath ) );


		material = new THREE.MeshStandardMaterial( { color: 0xaaaaaa, emissive: 0x000000, side: 2, wireframe: false } );

		qmesh = QL.drawQlineFromPoints( section, points );
		qmesh.material = material;


		geometry = new THREE.CylinderGeometry( radiusSection, radiusSection, 10, 6, 1 );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );

		material = material.clone();
		material.shading = 1

		mesh = new THREE.Mesh( geometry, material );
		mesh.position.z = 5;
		qmesh.add( mesh );

		geometry = new THREE.CylinderGeometry( radiusSection, radiusSection, lengthHex, 6, 1 );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );

		mesh = new THREE.Mesh( geometry, material );
		mesh.position.set( lengthLong + 2 * radiusPath, 0, 1.5 * lengthHex + 2 * lengthShort + 2 * radiusPath );
		qmesh.add( mesh );

		qmesh.name = 'hexKey100001';
		qmesh.userData.places = [];


		return qmesh;

	}

	function draw_screwdriver() {

		var radiusHandle = 5;
		var radiusShaft = 1;
		var tipLength = 8;
		var points = [ v2( 1, 0 ), v2( 1, 50 ), v2( radiusHandle, 50 ), v2( radiusHandle, 52), v2( 4, 52), v2( 4, 55 ), v2( radiusHandle, 55), 
			v2( radiusHandle, 80 ), v2( 0, 81 ) ];
		var geometry = new THREE.LatheGeometry( points, 8 );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( pi05 ) );
		geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0, tipLength ) );

		var geo2 = drawPhillipsTip( radiusShaft, tipLength );
		geo2.applyMatrix( new THREE.Matrix4().makeRotationX( pi05 ) );
		geometry.merge( geo2 );

		var material = new THREE.MeshNormalMaterial( { side: 2, wireframe: false });
		var mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'screwdriver';
		mesh.userData.places = [];
		mesh.userData.radiusHandle = radiusHandle;

		return mesh;

		function drawPhillipsTip( radiusShaft, tipLength, rows ) {

			radiusShaft = radiusShaft ? radiusShaft : 1;
			tipLength = tipLength ? tipLength : 5;
			var columns = 12;
			rows = rows ? rows : 3;

			var geometry = new THREE.PlaneGeometry(  1, 1, columns, rows );
			var vertices = geometry.vertices;
			var count = 0;
			var raddii = [ 0.2, 0.5, 1 ];
			var lengths = [ 0, 0, 0.5, 1 ];
			for ( var i = 0; i <= rows; i++ ) {

				var theta = pi2 / columns;

				for ( var j = 0; j <= columns; j++ ) {

					if ( i < raddii.length ) {

						r = j % 3 === 0 ? 0.5 * raddii[ i ] * radiusShaft : raddii[ i ] * radiusShaft;

					} else {

						r = radiusShaft;

					}

					var vt = vertices[ count++ ];
					vt.x = r * cos( theta * j );
					vt.y = lengths[ i ] * tipLength;
					vt.z = r * sin( theta * j );

				}

			}

			geometry.computeFaceNormals();
			geometry.computeVertexNormals();

			return geometry;

		}

	}

	function draw_pencil() {

		var radius = 2;
		var points = [ v2( 0, 0 ) , v2( radius, 10 ), v2( radius, 70 ), v2( 0, 70 ) ];
		var geometry = new THREE.LatheGeometry( points, 8 );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( pi05 ) );

		var mesh = new THREE.Mesh( geometry, material );
		mesh.name = 'pencil';
		mesh.userData.places = [];
		mesh.userData.radius = radius;

		return mesh;

	}

// utilities

	function build_placard( text, scale, color, x, y, z ) {

		var placard = new THREE.Object3D();

		var texture = canvasMultilineText( text, { backgroundColor: color }  );
		var spriteMaterial = new THREE.SpriteMaterial( { map: texture, opacity: 0.9, transparent: true } );
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.position.set( x, y, z ) ;
		sprite.scale.set( scale * texture.image.width, scale * texture.image.height );
		placard.add( sprite );

		var geometry = new THREE.Geometry();
		geometry.vertices = [ v( x, 0, z ),  v( x, y, z ) ];
		var material = new THREE.LineBasicMaterial( { color: 0xaaaaaa } );
		var line = new THREE.Line( geometry, material );
		placard.add( line );

		return placard;

	}

	function build_placard2( text, scale, color, x, y, z ) {

		var placard = new THREE.Object3D();

		var texture = canvasMultilineText( text, { backgroundColor: color }  );
		var spriteMaterial = new THREE.SpriteMaterial( { map: texture, opacity: 0.9, transparent: true } );
		var sprite = new THREE.Sprite( spriteMaterial );
		sprite.position.set( x, y, z ) ;
		sprite.scale.set( scale * texture.image.width, scale * texture.image.height );
		placard.add( sprite );

		var geometry = new THREE.Geometry();
		geometry.vertices = [ v( 0, 0, 0 ),  v( x, y, z ) ];
		var material = new THREE.LineBasicMaterial( { color: 0xaaaaaa } );
		var line = new THREE.Line( geometry, material );
		placard.add( line );

		return placard;

	}

	function togglePlacardVisible() {

		for ( var i = 0; i < placards.length; i++ ) {

			placards[ i ].visible = !placards[ i ].visible;

		}

	}

	function canvasMultilineText( textArray, parameters ) {

		parameters = parameters || {} ;
		var width = 0;
		var canvas = document.createElement( 'canvas' );
		var context = canvas.getContext( '2d' );

		if ( typeof textArray === 'string' ) textArray = [ textArray ];

		context.font = parameters.font ? parameters.font : '48px sans-serif';

		for ( var i = 0; i < textArray.length; i++) {

			width = context.measureText( textArray[i] ).width > width ? context.measureText( textArray[i] ).width : width;

		}

		canvas.width = 256; // width
		canvas.height = textArray.length * 64;

		col = parameters.backgroundColor ? parameters.backgroundColor : 120 ;

		context.fillStyle = 'hsl( ' + col + ', 80%, 50% )' ;
		context.fillRect( 0, 0, canvas.width, canvas.height);

		context.lineWidth = 1 ;
		context.strokeStyle = '#000';
		context.strokeRect( 0, 0, canvas.width, canvas.height);

		context.fillStyle = '#000' ;
		context.font = parameters.font ? parameters.font : '48px sans-serif';

		for ( i = 0; i < textArray.length; i++) {

			context.fillText( textArray[i], 10, 48  + i * 60 );

		}

		var texture = new THREE.Texture( canvas );
		texture.minFilter = texture.magFilter = THREE.NearestFilter;
		texture.needsUpdate = true;

		return texture;

	}


	function loadTexture( file ) {

		loader = new THREE.TextureLoader();
		loader.crossOrigin = 'anonymous';

		loader.load(

//			'http://mrdoob.github.io/three.js/examples/textures/water.jpg',

			file,

			function ( tex ) {

				textureCase = tex;

				updateMaterial( materialCaseColor );

			}

		);

	}


	function loadTexture2( file ) {

		THREE.TextureLoader.crossOrigin = 'anonymous';

		loader = new THREE.TextureLoader();

		loader.load(

			file,

			function ( tex ) {

				textureCase = tex;
				textureCase.wrapS = textureCase.wrapT = THREE.RepeatWrapping;
				textureCase.needsUpdate = true;

				updateMaterial();

			}

		);

	}

	function buildTextureNoise() {

		var noiseSize = 256;
		var size = noiseSize * noiseSize;
		var data = new Uint8Array( 4 * size );

		for ( var i = 0; i < size * 4; ) {

			n = 200 + Math.random() * 10 | 0;
			data[ i ++ ] = n;
			data[ i ++ ] = n;
			data[ i ++ ] = n;
			data[ i ++ ] = 255;
		}

		var dt = new THREE.DataTexture( data, noiseSize, noiseSize, THREE.RGBAFormat );
		dt.anisotropy = 4;
//		dt.repeat.set( 16, 16 );
		dt.wrapS = THREE.RepeatWrapping;
		dt.wrapT = THREE.RepeatWrapping;
		dt.needsUpdate = true;

		return dt;

	}

	function updateMaterial( color ) {

		materialCaseColor = color ? color : 0xfdccaa;

		kallax.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh && child.material.name === 'materialCase' ) {

				if ( child.name === 'shelf' || child.name === 'caseTop' || child.name === 'caseBottom' ) {

					textureCase.repeat.set( columns, 1 );

				} else if ( child.name === 'caseLeft' || child.name === 'caseRight' ) {

					textureCase.repeat.set( rows, 1 );

				}

				if ( materialCaseColor === 0xf8f8f8 ) {

					var t = buildTextureNoise();

				} else {

					t = textureCase;

				}

				child.material = new THREE.MeshPhongMaterial( {
					color: materialCaseColor,
					bumpMap: t,
					bumpScale:1,
					name: 'materialCase'
				} );

				child.material.needsUpdate = true;

			}

		} );

	}