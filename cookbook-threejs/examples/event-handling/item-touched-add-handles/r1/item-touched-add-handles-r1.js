// 2014-12-29 ~ vA3C Authors ~ MIT License
// Sources:
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_draggablecubes.html
// https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_cubes.html

	var VH = VH || {};

	VH.DragObjects = function( objects ) {

		me = this;

		var mouse = new THREE.Vector2();
		var offset = new THREE.Vector3();
		var intersected;

		var handle, sprites;

		var map = THREE.ImageUtils.loadTexture( "ball.png" );
		var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );
		handle = new THREE.Sprite( material );

		var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
		material = new THREE.MeshBasicMaterial( );
		var plane = new THREE.Mesh( geometry, material );
		plane.visible = false;
		scene.add( plane );

		renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );

		function onDocumentMouseMove( event ) {

			event.preventDefault();

			var intersects;

			mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
			mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

			var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( camera );

			var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

			if ( VH.selected ) {

				intersects = raycaster.intersectObject( plane );

				VH.selected.position.copy( intersects[ 0 ].point.sub( offset ) );

				updateHandles();

				return;

			}

			intersects = raycaster.intersectObjects( objects );

			if ( intersects.length > 0 ) {

				if ( intersected != intersects[ 0 ].object ) {

					if ( intersected && intersected.material.emissive ) {

						intersected.material.emissive.setHex( intersected.currentHex );

				removeHandles();

					}

					intersected = intersects[ 0 ].object;

					if ( intersected.material.emissive ) {

						intersected.currentHex = intersected.material.emissive.getHex();
						intersected.material.emissive.setHex( 0xff0000 );

						addHandles();

					}

					plane.position.copy( intersected.position );

					plane.lookAt( camera.position );

				}

				document.body.style.cursor = 'pointer';

			} else {

				if ( intersected && intersected.material.emissive ) intersected.material.emissive.setHex( intersected.currentHex );

				removeHandles();

				intersected = null;

				document.body.style.cursor = 'auto';

			}

		}


		function addHandles() {

			intersected.updateMatrixWorld();

			verts = intersected.geometry.vertices;

			sprites = new THREE.Object3D();

			scene.add( sprites );

			updateHandles();

		}

		function updateHandles() {

			for ( var i = 0, v, sprite; i < verts.length; i++ ) {

				v = verts[i].clone();

				v.applyMatrix4( intersected.matrixWorld );

				sprite = handle.clone();

				sprite.position.set( v.x, v.y, v.z );

				sprites.add( sprite );

			}

		}

		function removeHandles() {

			scene.remove( sprites );

		}

		function onDocumentMouseDown( event ) {

			event.preventDefault();

			removeHandles();

			var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 ).unproject( camera );

			var raycaster = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );

			var intersects = raycaster.intersectObjects( objects );

			if ( intersects.length > 0 ) {

				controls.enabled = false;

				VH.selected = intersects[ 0 ].object;

				intersects = raycaster.intersectObject( plane );

				offset.copy( intersects[ 0 ].point ).sub( plane.position );

				document.body.style.cursor = 'move';

			}

		}

		function onDocumentMouseUp( event ) {

			event.preventDefault();


			controls.enabled = true;

			if ( intersected ) {


			addHandles();

				plane.position.copy( intersected.position );

				if ( me.onDragged ) {

					me.onDragged();

				}

				VH.lastSelected = VH.selected;

				VH.selected = null;

			}

			document.body.style.cursor = 'auto';

		}

	};

// Enable every mesh in a scene to become draggable

	VH.enableDragObjects = function() {

		objectContainer = new THREE.Object3D();

		scene.add( objectContainer );

		var objects = [];

		app.scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

//console.log( 'child', child );

				objects.push( child );

			}

		} );

		for ( obj in objects) {

			objectContainer.add( objects[ obj ] );

		}

		var dragcontrols = new VH.DragObjects( objectContainer.children );

//		dragcontrols.onDragged = callback;

	};

