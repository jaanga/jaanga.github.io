/*
 * @author mrdoob / http://mrdoob.com
 */

THREE.InteractiveScene = function () {

	THREE.Scene.call( this );

	var raycaster = new THREE.Raycaster();

	// Camera

	var camera = null;

	this.setCamera = function ( value ) {

		camera = value;

	};

	// Pointer Events

	var element = null;
	var pointer = new THREE.Vector2();

	function transformPointer( event ) {

		var rect = element.getBoundingClientRect();

		pointer.x = ( ( event.clientX - rect.left ) / rect.width ) * 2 - 1;
		pointer.y = - ( ( event.clientY - rect.top ) / rect.height ) * 2 + 1;

		raycaster.setFromCamera( pointer, camera );

	}

	function onPointerMove( event ) {

		event.preventDefault();
		transformPointer( event );

	}

	function onPointerDown( event ) {

		transformPointer( event );

	}

	function onPointerUp( event ) {

		transformPointer( event );

	}

	this.listenPointerEvents = function ( dom ) {

		element = dom;

		element.addEventListener( 'pointermove', onPointerMove, false );
		element.addEventListener( 'pointerdown', onPointerDown, false );
		element.addEventListener( 'pointerup', onPointerUp, false );
		// element.addEventListener( 'pointercancel', onPointerUp, false );
		// element.addEventListener( 'pointerout', onPointerUp, false );

	};

	/*
	this.select = function ( mouse ) {

	};

	this.selectstart = function ( mouse ) {

	};

	this.selectend = function ( mouse ) {

	};
	*/

};

THREE.InteractiveScene.prototype = Object.create( THREE.Scene.prototype );
THREE.InteractiveScene.prototype.constructor = THREE.InteractiveScene;
THREE.InteractiveScene.prototype.isInteractiveScene = true;
