
    MNU = {};

	MNU.initLeftMenu = function() {

		var hamburger, menu, contents;

		MNU.getCSSLeft();

		hamburger = document.body.appendChild( document.createElement( 'div' ) );
		hamburger.id = 'hamburger';
		hamburger.innerHTML = '<div id=bars title="Click this hamburger to slide the menu" > &#9776 </div>';

		bars.id = 'bars';
		bars.onclick = function() { hamburger.style.left = hamburger.style.left === "0px" ? "325px" : 0; };

		MNU.menu = hamburger.appendChild( document.createElement( 'div' ) );
		MNU.menu.id = 'menu';
		MNU.menu.innerHTML =

			COR.getMenuDetailsHeader() +

			COR.getMenuDetailsAbout() +

			COR.getMenuFooter() +

		b;

		MNU.contents = document.body.appendChild( document.createElement( 'div' ) );
		MNU.contents.id = 'contents';
		MNU.contents.innerHTML =
			'<div >' +
				'<h1>Albums</h1>' +
                '<p>2016-10-31 ~ Still pre-release / very alpha stage</p>' +
                '<p>Album folders have been flattened. No folders inside folders. This will be fixed.</p>' +
                '<p>So some albums appear to be empty</p>' +
			'</div>' +



		MNU.onLeftMenuLoaded();

	}

	MNU.onLeftMenuLoaded = function (){};



	MNU.getCSSLeft = function() {

		MNU.css = document.body.appendChild( document.createElement('style') );
		MNU.css.innerHTML =

			'html { height: 100%; margin: 0; }' +
			'body { font: 12pt monospace; height: 100%; margin: 0; padding: 0; }' +
			'h2, h3 { margin: 0; }' +
			'a { color: crimson; text-decoration: none; }' +
			'button, input[type=button] { background-color: #ccc; border: 2px #fff solid; color: #322; }' +

			'iframe { background-color: white; border: 0px; height: 100%; margin-top: 0px; width: 100%; }' +
			'input[type=range] { -webkit-appearance: none; -moz-appearance: none; background-color: #ddd; width: 160px; }' +
			'input[type=range]::-moz-range-thumb { background-color: #888; border-radius: 0; width: 10px; }' +
			'input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; background-color: #888; height: 20px; width: 10px; }' +

			'p { margin: 0 0 5px 0; }' +
//			'select { width: 100%; }' +
			'summary h3, summary h4 { display:inline; }' +
			'summary { outline: none; }' +

			'.popUp { background-color: white; left: 150px; border: 1px solid red; opacity: 1.0; padding: 5px; position: absolute; width: 120px; z-index: 10; }' +

			'#bars { background-color: #eee; color: crimson; cursor: pointer; font-size: 24pt; text-decoration: none; }' +

			'#contents { border: 0px red solid; margin-left: 400px; min-height: 500px; min-width: 800px; position: absolute; top: 0; }' +
			'#contents p { margin: 0 0 12px 0 }' +


			'#hamburger { left: 325px; position: absolute; top: 20px; transition: left 1s;  z-index: 1;}' +
			'#mapDiv { height: 100%; text-align: center; }' +

			'#menu { background-color: #eee; border: 1px #ccc solid; left: -325px; max-height: ' + ( window.innerHeight - 10 ) + 'px; ' +
				'opacity: 0.85; overflow: auto; padding: 0 10px; position: absolute; top: -20px; transition: left 1s; width: 300px; z-index: 1;}' +

			'#repositoryEvents h4 { margin: 0; }' +
			'#repositoryEvents { max-height: 200px; overflow-y: scroll; font-size: 9pt; }' +

			'#divThreejs { background-color: #ccc; border: 2px solid #888; height: 80%; min-width: 70%;' +
				'overflow: hidden; left: 350px; position: absolute; resize: none; top: 100px; }' +
			'#threejsHeader { text-align: right; }' +

			'#txtElevations { min-height: 50px; width: 100%; }' +
			'#txtPath { min-height: 60px; width: 100%; }' +

		'';

	}
