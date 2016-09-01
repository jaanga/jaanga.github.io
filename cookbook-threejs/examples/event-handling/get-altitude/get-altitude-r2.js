



	var raycaster;
	var mouse;
	var particle;

	function getMenuDetailsAltitude() {

		var particleMaterial;

		menuDetailsAltitude =

				'<details id=altitudeDetails >' +

					'<summary><h3>Position and Altitude</h3></summary>' +
					'<p id=altitudeData >When you click on the map, position and altitude details appear here.</p>' +
				'</details>' + 

		b;

		return menuDetailsAltitude;

	}


	function initGetAltitude() {

		particleMaterial = new THREE.SpriteMaterial( { color: 0xff0000 } );
		particle = new THREE.Sprite( particleMaterial );
		particle.scale.x = particle.scale.y = 1;
		scene.add( particle );

		raycaster = new THREE.Raycaster();
		mouse = new THREE.Vector2();

		renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
		renderer.domElement.addEventListener( 'touchstart', onDocumentTouchStart, false ); // for mobile

	}


	function onDocumentTouchStart( event ) {

		event.preventDefault();

		event.clientX = event.touches[0].clientX;
		event.clientY = event.touches[0].clientY;

		onDocumentMouseDown( event );

	}

	function onDocumentMouseDown( event ) {

		var intersects, intersect, face, intersected;

		event.preventDefault();

		mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
		mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

		raycaster.setFromCamera( mouse, camera );

		intersects = raycaster.intersectObject( mesh );

		if ( intersects.length > 0 ) {

			intersect = intersects[ 0 ];
			face = intersect.face;
			intersected = intersect.object;

console.log( 'interescts[0]', intersect );

			particle.position.copy( intersect.point );

			altitudeDetails.setAttribute('open', 'open');

			altitudeData.innerHTML =

				'Latitude: ' + intersect.point.y.toFixed() + b +
				'Longitude: ' + intersect.point.x.toFixed() + b +
				'Altitude: ' + intersect.point.z.toFixed() + b +

			b;


		} else {

			intersected = null;

			document.body.style.cursor = 'auto';

		}

	}
