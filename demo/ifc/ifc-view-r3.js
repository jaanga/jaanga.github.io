
    var ifc = {};
    ifc.hashes = {};
    ifc.classes = {};

    ifc.classes.IFCSLAB = function( index ) {

        var line = ifc.lines[ index ];

        term = line.slice( line.indexOf( '= IFC') + 2, line.indexOf( '(' ) );

        values = line.slice( line.indexOf( '(' ) + 1, line.lastIndexOf( ')' ) - 1 );

        values = values.split( ',' );

        placementHash = values[ 5 ];
        placementLine = ifc.lines[ ifc.hashes[ placementHash ].line ];
        placementValues = placementLine.slice( placementLine.indexOf( '(' ) + 1, placementLine.lastIndexOf( ')' ) );
        placementValues = placementValues.split( ',' );

        definitionHash = values[ 6 ];
        definitionLine = ifc.lines[ ifc.hashes[ definitionHash ].line ];
        definitionTerm = definitionLine.slice( definitionLine.indexOf( '= IFC') + 2, definitionLine.indexOf( '(' ) );


        ifc.classes[ definitionTerm ]( ifc.hashes[ definitionHash ].line );

//console.log( 'ifc.lines', ifc.hashes[ definitionHash ].line + 1 );

    }

    ifc.classes.IFCPRODUCTDEFINITIONSHAPE = function( index ) {



        var line = ifc.lines[ index ];
        values = line.slice( line.indexOf( '(' ) + 1, line.lastIndexOf( ')' ) );
        values = values.split( ',' );

        shapePresentationHash = values[ 2 ].slice( 1, -1 );
        shapePresentationLine = ifc.lines[ ifc.hashes[ shapePresentationHash ].line ];

        shapePresentationValues = shapePresentationLine.slice( shapePresentationLine.indexOf( '(' ) + 1, shapePresentationLine.lastIndexOf( ')' ) );
        shapePresentationValues = shapePresentationValues.split( ',' );

        extrudeSolidHash = shapePresentationValues[ 3 ].slice( 1, -1 );
        extrudeSolidLine = ifc.lines[ ifc.hashes[ extrudeSolidHash ].line ];
        extrudeSolidTerm = extrudeSolidLine.slice( extrudeSolidLine.indexOf( '= IFC') + 2, extrudeSolidLine.indexOf( '(' ) );

console.log( 'extrudeSolidTerm', extrudeSolidTerm );
console.log( 'ifc.hashes[ extrudeSolidHash ]', ifc.hashes[ extrudeSolidHash ] );

        ifc.classes[ extrudeSolidTerm ]( ifc.hashes[ extrudeSolidHash ].line );

    }

    ifc.classes.IFCEXTRUDEDAREASOLID = function( index ) {

console.log( 'index', index );

        extrudeSolidLine = ifc.lines[ index ];

        extrudeSolidValues = extrudeSolidLine.slice( extrudeSolidLine.indexOf( '(' ) + 1, extrudeSolidLine.lastIndexOf( ')' ) );
        extrudeSolidValues = extrudeSolidValues.split( ',' );

console.log( 'extrudeSolidValues', extrudeSolidValues );

    }


    ifc.classes.IFCWALLTYPE = function( index ) {

        getWallTypeData( index );

        function getWallTypeData( i ) {

            line = ifc.lines[ i ];

            term = line.slice( line.indexOf( '= IFC') + 2, line.indexOf( '(' ) );

            values = line.slice( line.indexOf( '(' ) + 1, line.lastIndexOf( ')' ) - 1 );

            switch( term ) {

    			case 'IFCEXTRUDEDAREASOLID':

                    values = values.split( ',' );

                    height = parseFloat( values[ 3 ] );

                    areaHash = values[ 0 ];
                    areaLine = ifc.lines[ ifc.hashes[ areaHash ].line ];
                    areaValues = areaLine.slice( areaLine.indexOf( '(' ) + 1, areaLine.lastIndexOf( ')' ) );
                    areaValues = areaValues.split( ',' );
                    thickness = parseFloat( areaValues[ 4 ] );
                    length = parseFloat( areaValues[ 3 ] );

                    offsetPlacementHash = values[ 1 ];
                    offsetPlacementLine = ifc.lines[ ifc.hashes[ offsetPlacementHash ].line ];
                    offsetPlacementValues = offsetPlacementLine.slice( offsetPlacementLine.indexOf( '(' ) + 1, offsetPlacementLine.lastIndexOf( ')' ) );
                    offsetPlacementValues = offsetPlacementValues.split( ',' );
                    offsetHash = offsetPlacementValues[ 0 ];

                    offsetLine = ifc.lines[ ifc.hashes[ offsetHash ].line ];
                    offsetValues = offsetLine.slice( offsetLine.indexOf( '(' ) + 2, offsetLine.lastIndexOf( ')' ) - 1 );
console.log( 'offsetValues', offsetValues );
                    offsetValues = offsetValues.split( ',' );

                    offsetX = parseFloat( offsetValues[ 0 ] );
                    offsetY = parseFloat( offsetValues[ 1 ] );

    				break;

    			case 'IFCRELDECLARES':

    				return;

    			default:

    		}

console.log( 'line: ', line);

            i++;
            if ( i < ifc.lines.length ) { getWallTypeData( i ); }

        }

console.log( 'length', length );
console.log( 'thickness', thickness );
console.log( 'offsetX', offsetX );
console.log( 'offsetY', offsetY );
console.log( 'height', height );

        var shape;
        var geometry, material, mesh;
        var v2 = function( x, y ){ return new THREE.Vector2( x, y ); };

        points = [
            v2( -offsetX, - offsetY ),
            v2( length - offsetX, - offsetY ),
            v2( length - offsetX, thickness - offsetY ),
            v2( -offsetX, thickness - offsetY )
        ];

		shape = new THREE.Shape( points );
        geometry = new THREE.ExtrudeGeometry( shape, { amount: height, bevelEnabled: false, curveSegments: 8, steps: 3 }  );
		geometry.applyMatrix( new THREE.Matrix4().makeRotationX( -0.5 * Math.PI ) );

		material = new THREE.MeshNormalMaterial( { opacity: 0.8, transparent: true });
		mesh = new THREE.Mesh( geometry, material );
        mesh.scale.set( 0.01, 0.01, 0.01 );
		ifc.project.add( mesh );

    };
