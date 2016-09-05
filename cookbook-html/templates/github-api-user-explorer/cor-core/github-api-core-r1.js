// copyright &copy 2016 jaanga authors 


	defaults = {}; // in alphabetical order


// shortcuts

	var pi = Math.PI, pi05 = pi * 0.5, pi2 = pi + pi;
	var d2r = pi / 180, r2d = 180 / pi;
	var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };
	var b = '<br>';

	function setCSS() {

		var css;

		css = document.body.appendChild( document.createElement('style') );
		css.innerHTML =  // in alphabetical order

			'html { height: 100%; }' +
			'body { font: 12pt monospace; height: 100%; margin: 0; padding: 0; }' +
			'h2, h3 { margin: 0; }' +
			'a { color: crimson; text-decoration: none; }' +
			'button, input[type=button] { background-color: #ccc; border: 2px #fff solid; color: #322; }' +

			'iframe { background-color: white; border: 0px; height: 100%; margin-top: 0px; width: 100%; }' +
			'input[type=range] { -webkit-appearance: none; -moz-appearance: none; background-color: #ddd; width: 160px; }' +
			'input[type=range]::-moz-range-thumb { background-color: #888; border-radius: 0; width: 10px; }' +
			'input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; background-color: #888; height: 20px; width: 10px; }' +

			'p { margin: 0 0 5px 0; }' +
			'summary h3, summary h4 { display:inline; }' +
			'summary { outline: none; }' +

			'.popUp { background-color: white; left: 150px; border: 1px solid red; opacity: 1.0; padding: 5px; position: absolute; width: 120px; z-index: 10; }' +

			'#bars { background-color: #eee; color: crimson; cursor: pointer; font-size: 24pt; text-decoration: none; }' +
			'#hamburger { left: 325px; position: absolute; top: 20px; transition: left 1s; }' +
			'#mapDiv { height: 100%; text-align: center; }' +
			'#menu { background-color: #eee; border: 1px #ccc solid; left: -325px; max-height: ' + ( window.innerHeight - 10 ) + 'px; ' +
				'opacity: 0.85; overflow: auto; padding: 0 10px; position: absolute; top: -20px; transition: left 1s; width: 300px; }' +

		'';

	}

	function setCSSView() {

		var cssView;

		cssView = document.body.appendChild( document.createElement('style') );
		cssView.innerHTML =

			'body { font: 12pt monospace; margin: 0; overflow: hidden; padding: 0; }' +
			'a { color: crimson; text-decoration: none; }' +

			'button, input[type=button] { background-color: #ccc; border: 2px #fff solid; color: #322; }' +

			'input[type=range] { -webkit-appearance: none; -moz-appearance: none; background-color: #ddd; width: 160px; }' +
			'input[type=range]::-moz-range-thumb { background-color: #888; border-radius: 0; width: 10px; }' +
			'input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; background-color: #888; height: 20px; width: 10px; }' +

			'summary { outline: none; }' +
			'summary h3, summary h4 { display:inline; }' +

			'.popUp { background-color: white; left: 150px; border: 1px solid red; opacity: 1.0; padding: 5px; position: absolute; width: 120px; z-index: 10; }' +

			'#bars { color: crimson; cursor: pointer; font-size: 24pt; text-decoration: none; }' +

			'#container { left: 0; position: absolute; transition: left 1s; }' +

			'#hamburger { background-color: #eee; left: 325px; position: absolute; top: 20px; }' +

			'#menu { background-color: #eee; border: 1px #ccc solid; max-height: ' + window.innerHeight + 'px; overflow: auto; padding: 0 10px; position: absolute; width: 300px; }' +
			'#menu h2 { margin: 0; }' +

		'';

	}

	function getPlaceDefaults() {


	}


// menus

	function getMenuDetailsHeader() {

		var menuDetailsHeader = 

			'<h2>' +

				'<a href=https://jaanga.github.io/ title="Jaanga - your 3D happy place" > &#x2766 </a>' + b +
				'<a href="" title="Click here to refresh this page" >' + document.title + '</a> ~ ' +
//				'<a href=index.html#readme.md title="Click here for help and information" > &#x24D8; </a>' +
				'<a href=index.html#readme.md onmouseover=popHelp.style.display=""; onmouseout=popHelp.style.display="none"; > &#x24D8; </a>' +

			'</h2>' +

			'<div class=popUp id=popHelp style=display:none; ><p>Hi there!</p>Click the i-in-circle, info icon for latest updates.</div>' +

		b;

		return menuDetailsHeader;

	}


	function getMenuDetailsAbout() {

		var menuDetailsAbout =

			'<details>' +

				'<summary><h3>About</h3></summary>' +

				'<p>' +
					'Copyright &copy; 2016 <a href=https://github.com/orgs/jaanga/people target="_blank">Jaanga authors</a>.' + b +
					'<jaanga.github.io/license.md >MIT license</a>' +
				'</p>' +

				'<p>Thank you <a href=https://developers.google.com/maps/documentation/javascript/elevation > Google Maps </a> and ' +
					'<a href=http://threejs.org target="_blank">Mr.doob.</a></p>' +

				'<p>Click the \'i in a circle\' info icon for more <a href=index.html#readme.md >help</a></p>' +

			'</details>' +

		b;

		return menuDetailsAbout;

	}


	function getMenuFooter() {

		var footer = 

			'<hr>' +

			'<center>' +
				'<a href=javascript:menu.scrollTop=0; style=text-decoration:none; onmouseover=pop2.style.display=""; onmouseout=pop2.style.display="none"; ><h1> &#x2766 <h1></a>' +
			'</center>' +

			'<div class=popUp id=pop2 style=display:none;bottom:10px; >' +
				'Jaanga - your 3D happy place.<br>Click here to return to the top of the page' +
			'</div>' +

		b;

		return footer;

	}
