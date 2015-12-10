var mouseOverContainer = false;

var targetRotationX = 0;
var targetRotationOnMouseDownX = 0;

var targetRotationY = 0;
var targetRotationOnMouseDownY = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var mouseY = 0;
var mouseYOnMouseDown = 0;


//check if mouse is over container
container.onmouseover = function () {
    mouseOverContainer = true;
}

container.onmouseout = function () {
    mouseOverContainer = false;
}

function initMouse() {
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
}

function onDocumentMouseDown( event ) {

    event.preventDefault();
        
    if (mouseOverContainer === true) {
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        document.addEventListener('mouseout', onDocumentMouseOut, false);

        mouseXOnMouseDown = event.clientX - windowHalfX;
        targetRotationOnMouseDownX = targetRotationX;

        mouseYOnMouseDown = event.clientY - windowHalfY;
        targetRotationOnMouseDownY = targetRotationY;
    }

}

function onDocumentMouseMove(event) {
    if (mouseOverContainer === true) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;

        targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.02;
        targetRotationX = targetRotationOnMouseDownX + (mouseX - mouseXOnMouseDown) * 0.02;
    }
}

function onDocumentMouseUp( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
        document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
        document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentTouchStart( event ) {

        if ( event.touches.length == 1 ) {

                event.preventDefault();

                mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
                targetRotationOnMouseDownX = targetRotationX;
                
                mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
                targetRotationOnMouseDownY = targetRotationY;
                
                

        }

}

function onDocumentTouchMove( event ) {

        if ( event.touches.length == 1 ) {

                event.preventDefault();

                mouseX = event.touches[ 0 ].pageX - windowHalfX;
                targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.05;
                
                mouseY = event.touches[ 0 ].pageY - windowHalfY;
                targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.05;

        }

}

function updateMouse() {
    
     //horizontal rotation (the * 0.1 adds a falloff slowdown effect)
     group.rotation.y += ( targetRotationX - group.rotation.y ) * 0.1;
            
    if ((targetRotationY <= 1 && targetRotationY >= -0.3)) {

        addedRotationY = (targetRotationY - group.rotation.x);
        group.rotation.x += addedRotationY;
    }
    if (targetRotationY > 1) {

        targetRotationY = 1;
        addedRotationY = (targetRotationY - group.rotation.x);
        group.rotation.x += addedRotationY;
    }
    else if (targetRotationY < -0.3) {

        targetRotationY = -0.3;
        addedRotationY = (targetRotationY - group.rotation.x);
        group.rotation.x += addedRotationY;
    }

}


