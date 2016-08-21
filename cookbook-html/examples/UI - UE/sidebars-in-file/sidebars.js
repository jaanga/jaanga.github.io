	var sidebarLeft;
	var statusBar;
	var sidebarRight;
	var headsUp;
	
	var sbr = function(){
		var css = document.body.appendChild( document.createElement('style') );
		css.innerHTML =
			'body {background-color: transparent; font: normal 12pt monospace; margin: 0; overflow: hidden; text-align: center;}' +
			
			'a { color: #44e;}  ' +
			
			'button, input[type=range] { -webkit-appearance: none; background-color: silver; height: 20px; opacity: 0.5; width: 80px;}' +
			
			'h1 { margin: 0; min-width: 200px; }' +
			
			'input[type="range"]::-webkit-slider-thumb {-webkit-appearance: none; background-color: #666; opacity: 0.5; width: 10px; height: 26px; }' +

			'#sbl { background-color: #eee; left: 30px; margin: 0; opacity: 0.8; outline: 1px solid; padding: 10px; ' +
				'position: absolute; text-align: left; top: 30px; max-width: 350px;}' +

			'#stb { background-color: #eee; margin: 30px auto; opacity: 0.8; outline: 1px solid; padding: 10px; ' +
				'text-align: left; width: 500px;}' +

			'#sbr { background-color: #eee; height: 90%; margin: 0; opacity: 0.8; outline: 1px solid; padding: 10px; ' +
				'position: absolute; right: 20px; text-align: left; top: 30px; max-width: 350px; word-wrap:break-word; }' +

			'#sbr-body { height: 95%; overflow-y: scroll; }' +

			'div.control { color: #aaa; cursor: hand; cursor: pointer; float: right; }' ;
	}();

	
	var bars = function() {
		sidebarLeft = document.body.appendChild( document.createElement( 'div' ) );
		sidebarLeft.id = 'sbl';

		statusBar = document.body.appendChild( document.createElement( 'div' ) );
		statusBar.id = 'stb';

		sidebarRight = document.body.appendChild( document.createElement( 'div' ) );
		sidebarRight.id = 'sbr';

		headsUp = document.body.appendChild( document.createElement( 'div' ) );
		headsUp.style.cssText = 'background-color: #ddd; border-radius: 8px; display: none; left: 50px; opacity: 0.85; padding: 5px 5px 10px 5px; ' +
			'position: absolute; text-align: left; width: 350px; word-wrap:break-word;';
		headsUp.innerHTML = '<h1>heads-up</h1>';
	}();
	
	// var statusBarBody = document.getElementById('toggled');
	// var sidebarRightBody = document.getElementById('sbr-body');	

	function toggleBar( sidebar ) {
		if ( sidebar.style.display === '' ) {
			sidebar.style.display = 'none';
		} else {
			sidebar.style.display = '';
		}
	}

	function toggleStatusBar() {
		if ( toggled.style.display === '' ) {
			toggle.innerText = '[+]';
			toggled.style.display = 'none';
		} else {
			toggle.innerText = '[-]';
			toggled.style.display = '';
		}
	}
	
	function p( str, obj ) { var p = obj.appendChild( document.createElement( 'p' ) );
		p.innerHTML = str;
	};	