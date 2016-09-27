

	var GAG = GAG || {};

	GAG.width = 512
	GAG.height = 384;
	GAG.delay = 8;

	var icw;

	var generating = false;

	var time = 0;


	GAG.getMenuDetailsGenerateAnimatedGIF = function() {

		var menuDetailsGenerateAnimatedGIF =

			'<details id=GAGdetailsGenerateAnimatedGIF open >' +

				'<summary id=GAGmenuSummaryGenerateAnimatedGIF ><h3>Generate Animated GIF</h3></summary>' +

				'<div id=GAGdivGenerateAnimatedGIF >' +

					'<button onClick=GAG.generateGIF(); >Generate Animated GIF</button> ' +
					'by <a href="https://github.com/deanm/omggif">omggif</a>' + b +
					'<progress id="progress" value="0" max="1"></progress>' + b + b +

					'<input type=checkbox id=GAGchkGrayShades checked >Gray shades' + b +
	//				'<div id=info ></div>' + b +

			'</div>' + b +

			'</details>' +

		'';

		return menuDetailsGenerateAnimatedGIF;

	};


	GAG.animate = function() {

		if ( icw.generating === false ) {

			requestAnimationFrame( icw.animate );

		}

		icw.time = ( icw.time + 0.0005 ) % 1;

		icw.render( icw.time );

	};


	GAG.render = function( float ) {

		var pi2 = Math.PI * 2;

		icw.camera.position.x = icw.radius * Math.cos( float * pi2 );
		icw.camera.position.z = icw.radius * Math.sin( float * pi2 );
		icw.camera.lookAt( icw.controls.target );
		icw.renderer.setClearColor( 0x000000 );

		icw.renderer.render( icw.scene, icw.camera );

	};



	GAG.generateGIF = function() {

		var canvas, context;
		var palette, r, g, b;

		icw.generating = true;

		var current = 0;
		var total = 80;

		canvas = document.createElement( 'canvas' );
		canvas.width = GAG.width;
		canvas.height = GAG.height;

		context = canvas.getContext( '2d' );

		var buffer = new Uint8Array( GAG.width * GAG.height * total * 5 );
		var gif = new GifWriter( buffer, GAG.width, GAG.height, { loop: 0 } );

		pixels = new Uint8Array( GAG.width * GAG.height );

		var addFrame = function () {

			icw.render( current / total );

			context.drawImage( icw.renderer.domElement, 0, 0 );

			data = context.getImageData( 0, 0, GAG.width, GAG.height ).data;

			palette = [];

			for ( var j = 0, k = 0; j < data.length; j += 4, k ++ ) {

				if ( GAGchkGrayShades.checked ) {

					avg = ( data[ j ] + data[ j + 1 ] + data[ j + 2 ]) / 3;

					r = Math.floor( avg * 0.1 ) * 10;
					g = Math.floor( avg * 0.1 ) * 10;
					b = Math.floor( avg * 0.1 ) * 10;

				} else {

					r = Math.floor( data[ j + 0 ] * 0.1 ) * 10;
					g = Math.floor( data[ j + 1 ] * 0.1 ) * 10;
					b = Math.floor( data[ j + 2 ] * 0.1 ) * 10;

				}

				color = r << 16 | g << 8 | b << 0;

				index = palette.indexOf( color );

				if ( index === -1 ) {

					pixels[ k ] = palette.length;
					palette.push( color );

				} else {

					pixels[ k ] = index;

				}

			}

// force palette to be power of 2

			var powof2 = 1;

			while ( powof2 < palette.length ) powof2 <<= 1;

			palette.length = powof2 <= 256 ? powof2 : 256;

			gif.addFrame( 0, 0, GAG.width, GAG.height, pixels, { palette: new Uint32Array( palette ), delay: GAG.delay } );

			current ++;

			if ( current < total ) {

				setTimeout( addFrame, 0 );

			} else {

				setTimeout( finish, 0 );

			}

			progress.value = current / total;

		}

		var finish = function () {

			var string = '';

			for ( var i = 0; i < gif.end(); i++ ) {

				string += String.fromCharCode( buffer[ i ] )

			}

			var image = document.createElement( 'img' );
			image.src = 'data:image/gif;base64,' + btoa( string );
			COR.contents.appendChild( image );

			icw.generating = false;

			icw.animate();

		}

		addFrame();

	}
