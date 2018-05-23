
var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;

function cos( a ){ return Math.cos( a ); }
function sin( a ){ return Math.sin( a ); }
//	function v( x, y, z ){ return new THREE.Vector3( x, y, z ); }
function v2( x, y ){ return new THREE.Vector2( x, y ); }
var v = function ( x, y ){ return new THREE.Vector2( x, y ); }


function  createPolycurve() {

    var shape = new THREE.Shape();

    shape.moveTo( 10, 0 );

   shape.lineTo( 10, 20 );
//    shape.lineTo( 12.93, 27.07 );

    shape.arc( 10, 0, 10, pi, pi05, true );
    shape.lineTo( 30, 30 );
//    shape.lineTo( 37.07, 32.93 );
    shape.arc( 0, 10, 10, -pi05, 0 );
    shape.lineTo( 40, 40 );
    shape.lineTo( 40, 0 );

    shape.autoClose = true;

    var points = shape.createPointsGeometry();
    var line = new THREE.Line( points, new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 3 } ) );

    return line;

}


function  createPolycurveSpline() {

    var shape = new THREE.Shape();

    shape.moveTo( 10, 0 );

   shape.lineTo( 10, 20 );
   shape.splineThru( [ v( 12.93, 27.07 ), v( 20, 30 ) ] );
//    shape.splineThru( 20, 30 );

//    shape.arc( 10, 0, 10, pi, pi05, true );
    shape.lineTo( 30, 30 );
//    shape.lineTo( 37.07, 32.93 );
    shape.arc( 0, 10, 10, -pi05, 0 );
    shape.lineTo( 40, 40 );
    shape.lineTo( 40, 0 );

    shape.autoClose = true;

    var points = shape.createPointsGeometry();
    var line = new THREE.Line( points, new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 3 } ) );

    return line;

}
