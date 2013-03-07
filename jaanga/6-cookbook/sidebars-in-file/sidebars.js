
	var sidebarLeft;
	var statusBar;
	var sidebarRight;

	var sbr = function(){
		var css = document.createElement('style');
		css.innerHTML += 'h1 { margin: 0; min-width: 200px; }' +

			'#sbl {background-color: #eee; border: 1px solid; left: 50px; margin: 10px; opacity: 0.8; padding: 10px; position: absolute; ' +
				'text-align: left; top: 50px; max-width: 350px;}' +

			'#stbHeader {background-color: #eee; border: 1px solid; margin: 10px auto; opacity: 0.8; padding: 10px; ' +
				'text-align: left; top: 20px; width: 500px;}' +

			'#sbr {background-color: #eee; border: 1px solid; margin: 10px; opacity: 0.8; padding: 10px; position: absolute; ' +
				'right: 20px; text-align: left; top: 20px; max-width: 350px;}' +

			'#sbr-body {  height: 95%; overflow-y: scroll; }' +
			'div.control { color: #aaa; cursor: hand; cursor: pointer; float: right; }' ;
		document.body.appendChild( css );

		sidebarLeft = document.createElement( 'div' );
		sidebarLeft.id = 'sbl';
		document.body.appendChild( sidebarLeft );
		sidebarLeft.innerHTML = '<div class="control" onclick="toggleBar( sidebarLeft )">[X]</div>' +
			'<h1>App Title</h1 "h1">' +
			'<p><i>Sub text goes here...</i></p>'+
			'<p>This box is where you might tell people about the app.</p>' +
			'<p>It\'s also where the copyright and license information appear.</p>' +
			'<p>This is also where you might help the user understand what the app does and how to get started using the app.</p>' +
			'<p>Another use might be to give credit or thanks.</p>' +
			'<p>A useful link ot two might be nice to include as well: <a href="http://example.com" target="_blank">example.com</a></p>';

		statusBarHeader = document.createElement( 'div' );
		statusBarHeader.id = 'stbHeader';
		document.body.appendChild( statusBarHeader );
		statusBarHeader.innerHTML = '<div id="toggle" class="control" onclick="toggleStatusBar()">[-]</div>' +
			'<div class="control" onclick="toggleBar( sidebarLeft ); toggleBar( sidebarRight );">[<span style="font-size: small; vertical-align: text-top; ">[]</span>] &nbsp;</div>' +
			'<h1>App Status</h1 "h1">';

		statusBarBody = document.createElement( 'div' );
		statusBarBody.id = 'stbBody';
		statusBarHeader.appendChild( statusBarBody );
		statusBarBody.innerHTML =
			'<p>Numeric and other data that is updating in real-time goes here...</p>' +
			'<script> alert("howdy"); </script>';

		sidebarRight = document.createElement( 'div' );
		sidebarRight.id = 'sbr';
		document.body.appendChild( sidebarRight );
		sidebarRight.innerHTML = '<div  class="control" onclick="toggleBar( sidebarRight )">[X]</div>' +
			'<h1>Control Panel</h1>';

		var sidebarRightBody = document.createElement( 'div' );
		sidebarRightBody.style.height = (window.innerHeight - 100) + 'px';
		sidebarRightBody.id = 'sbr-body'
		sidebarRight.appendChild( sidebarRightBody );
		sidebarRightBody.innerHTML =
			'<p>Conceptualizing random endpoints in a access matrix provides reach extensions enterprise wide. ' +
			'Respective divisions historically insignificant, upscale trend lines in a management inventory analysis survivability format. </p>' +
			'<p>Document-centric projections unfetter traditional auditing practices rivaling central process management. ' +
			'Advanced functionality, easy administration, proclaim the hallmarks of unprecedented opportunity.</p>' +
			'<p>Iteration system wide engenders economies of scale, cross-media technology, presentation action items and life cycle replication.</p>' +
			'<p>Enterprise engenderment accelerates initiative platforms, reducing staffing components, integration of technical accessibility, resulting in bottom line pluralisms, benefit-wise. ' +
			'Incidental re-sizing staff requirements through attrition can be accelerated by paradigm shifts and focusing on core suitability and cross-training.</p>' +
		'' ;
	}();

	function toggleBar( sidebar ) {
		if ( sidebar.style.display == 'none' ) {
			sidebar.style.display = 'block';
		} else {
			sidebar.style.display = 'none';
		}
	}

	function toggleStatusBar() {
		var tg = document.getElementById("toggle");
		if ( statusBarBody.style.display == 'none' ) {
			statusBarBody.style.display = 'block';
			tg.innerText = '[-]';
		} else {
			statusBarBody.style.display = 'none';
			tg.innerText = '[+]';
		}
	}