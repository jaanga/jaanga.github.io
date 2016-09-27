

	var IFR = IFR || {};

	IFR.sites = [

		{ fileName: 'http://wikihouse.github.io/viewer-experiments/display-wikihouse-stepup1/display-wikihouse-stepup1-r2.html',
			title: 'wikihouse' },
		{ fileName: 'http://opendesk.github.io/design-playground/opendesk-half-sheet-table/opendesk-half-sheet-table-app-r3.html',
			title: 'opendesk' },
		{ fileName: 'http://jaanga.github.io/cookbook/rubiks-cube/rubiks-cube-r2-theo.html', title: 'rubiks' },
		{ fileName: 'http://fgx.github.io/fgx-aircraft-overview/latest/', title: 'fgx' },
		{ fileName: 'http://theo-armour.github.io/ucsf/', title: 'ucsf' }

	];

	IFR.onLoad = function() {

		var icw;

		icw = ifr.contentWindow;

		icw.divIfr.innerHTML =
			'<iframe id=IFRifr width=100% height=500px ></iframe>' +
			'<center><div id=buttons ></div></center>' +
		'';

		IFR.index = Math.floor( Math.random() * IFR.sites.length );

		for ( var i = 0; i < IFR.sites.length; i++ ) {

			button = icw.buttons.appendChild( document.createElement( 'button' ) );
			button.innerText = IFR.sites[ i ].title;
			button.id = i;
			button.style.cssText = ' background-color: white; border-width: 1px; margin-right: 5px; ';
			button.onclick = function(){

// move out of loop

				icw.IFRifr.src = IFR.sites[ this.id ].fileName;
				clearInterval( IFR.timer );

			};

		}

		clearInterval( IFR.timer );

		displayNext();

		IFR.timer = setInterval( displayNext, 8000 );

			function displayNext() {

				IFR.index = IFR.index >= IFR.sites.length ? 0 : IFR.index;

				if (! IFR.sites[ IFR.index ].fileName ) { return; }

				icw.IFRifr.src = IFR.sites[ IFR.index ].fileName;

				icw.IFRifr.onload = function() {

					var metas;

					title = IFR.sites[ IFR.index ] ? IFR.sites[ IFR.index ].title : '';

					ifrTitle.innerHTML = '<i>' + title + '</i>' + b;

					if ( location.protocol.slice( 0, 4 ) === ifr.contentWindow.IFRifr.src.slice( 0, 4 )  ) {

						metas = icw.IFRifr.contentDocument.getElementsByTagName('meta');

						for ( var i = 0, m; i < metas.length; i++ ) {

							m = metas[ i ];

							switch( m.name ) {

								case 'description':
									ifrTitle.innerHTML += 'Description: ' + m.content + b; break;
								case 'keywords':
									ifrTitle.innerHTML += 'Keywords: ' + m.content + b; break;
								case 'date':
									ifrTitle.innerHTML += 'Update: ' + m.content + b; break;
								default:
									break;

							}

						}

						if( icw.IFRifr.contentWindow.THR ) {

							icw.IFRifr.contentWindow.THR.controls.enableZoom=false;

						}

					} else {


					}

				};

				console.clear();

				IFR.index ++;

			}

	};

