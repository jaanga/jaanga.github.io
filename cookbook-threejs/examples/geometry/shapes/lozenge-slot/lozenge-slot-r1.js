
var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;

function cos( a ){ return Math.cos( a ); }
function sin( a ){ return Math.sin( a ); }
//	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }
function v2( x, y ){ return new THREE.Vector2( x, y ); }
var v = function ( x, y ){ return new THREE.Vector2( x, y ); }


function  createPointsGeometryLozenge() {

    var startX = startX || 10;
    var startY = startY || 10;

    var rectWidth = rectWidth || 10;
    var rectHeight = rectHeight || 20;

    var rectHeight05 = 0.5 * rectHeight;

    var shape = new THREE.Shape();

    shape.absarc( startX + rectWidth, startY, rectHeight05, -pi05 , pi05 );
    shape.absarc( startX, startY, rectHeight05, pi05, 3 * pi05 );
    shape.autoClose = true;

    var points = shape.createPointsGeometry();
    var line = new THREE.Line( points, new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 3 } ) );

    return line;

}

function  makeGeometryLozenge() {

    var startX = startX || 10;
    var startY = startY || 10;

    var rectWidth = rectWidth || 10;
    var rectHeight = rectHeight || 20;

    var rectHeight05 = 0.5 * rectHeight;
    var shape = new THREE.Shape();

    shape.absarc( startX + rectWidth, startY, rectHeight05, -pi05 , pi05 );
    shape.absarc( startX, startY, rectHeight05, pi05, 3 * pi05 );

    var geometry = new THREE.ShapeGeometry( shape );
    material = new THREE.MeshNormalMaterial( { side: 2 } );
    mesh = new THREE.Mesh( geometry, material );

    return mesh;

}

function extrudeGeometryLozenge() {

    var startX = startX || 10;
    var startY = startY || 10;

    var rectWidth = rectWidth || 10;
    var rectHeight = rectHeight || 20;

    var thickness = thickness || 5;

    var rectHeight05 = 0.5 * rectHeight;

    var shape = new THREE.Shape();

    shape.absarc( startX + rectWidth, startY, rectHeight05, -pi05 , pi05 );
    shape.absarc( startX, startY, rectHeight05, pi05, 3 * pi05 );

    var extrudeSettings = {

        steps: 2,
        amount: 16,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1

    };

    var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
    material = new THREE.MeshNormalMaterial();
    mesh = new THREE.Mesh( geometry, material );

    return mesh;

}
