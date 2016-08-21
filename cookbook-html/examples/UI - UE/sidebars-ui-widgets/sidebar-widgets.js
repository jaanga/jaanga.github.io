	var sidebarLeft, statusBar, sidebarRight;

	function toggleBar( sidebar ) {
		if ( sidebar.style.display == '' ) {
			sidebar.style.display = 'none';
		} else {
			sidebar.style.display = '';
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
	
	var css = function(){
		var css = document.createElement('style');
		css.innerHTML += 'h1 { margin: 0; min-width: 200px; }' +

			'#sbl {background-color: #eee; border: 1px solid; left: 30px; margin: 10px; opacity: 0.8; padding: 10px; position: absolute; ' +
				'text-align: left; top: 50px; max-width: 350px;}' +

			'#stbHeader {background-color: #eee; border: 1px solid; margin: 10px auto; opacity: 0.8; padding: 10px; ' +
				'text-align: left; top: 20px; width: 500px;}' +

			'#sbr {background-color: #eee; border: 1px solid; margin: 10px; opacity: 0.8; padding: 10px; position: absolute; ' +
				'right: 400px; text-align: left; top: 30px; max-width: 350px;}' +

			'#sbr2 {background-color: #eee; border: 1px solid; margin: 10px; opacity: 0.8; padding: 10px; position: absolute; ' +
				'right: 20px; text-align: left; top: 30px; max-width: 350px;}' +
				
			'#sbr-body {  height: 95%; overflow-y: scroll; }' +
			
			'div.control { color: #aaa; cursor: hand; cursor: pointer; float: right; }' +
// for widgets
			'button, input[type=range] { -webkit-appearance: none; background-color: silver; height: 20px; opacity: 0.5; }' +
			'input[type="range"]::-webkit-slider-thumb {-webkit-appearance: none; background-color: #666; opacity: 0.5; width: 10px; height: 26px; }' ;
		document.body.appendChild( css );
	}();
	
	var sbl = function(){
		sidebarLeft = document.createElement( 'div' );
		sidebarLeft.id = 'sbl';
		document.body.appendChild( sidebarLeft );
		sidebarLeft.innerHTML =
			'<div class="control" onclick="toggleBar( sidebarLeft )">[X]</div>' +
			'<h1>Widgets Resources</h1 "h1">' +
			'<p><i>JavaScript objects that you can use...</i></p>' +
			'<p></p>';
	}();
	
	var stb = function(){
			
		statusBarHeader = document.createElement( 'div' );
		statusBarHeader.id = 'stbHeader';
		document.body.appendChild( statusBarHeader );
		statusBarHeader.innerHTML =
			'<div id="toggle" class="control" onclick="toggleStatusBar()">[-]</div>' +
			'<div class="control" onclick="toggleBar( sidebarLeft ); toggleBar( sidebarRight ); toggleBar( sidebarRight2 );">[<span style="font-size: small; vertical-align: text-top; ">[]</span>] &nbsp;</div>' +
			'<h1>Resources Status</h1>';

		statusBarBody = document.createElement( 'div' );
		statusBarBody.id = 'stbBody';
		statusBarHeader.appendChild( statusBarBody );
		statusBarBody.innerHTML =
			'<p>Numeric and other data that is updating in real-time goes here...</p>';
	}();
	
	var sbr = function(){
		sidebarRight = document.createElement( 'div' );
		sidebarRight.id = 'sbr';
		document.body.appendChild( sidebarRight );
		sidebarRight.innerHTML =
			'<div class="control" onclick="toggleBar( sidebarRight )">[X]</div>' +
			'<h1>Control Panel 1</h1>';

		sidebarRightBody = document.createElement( 'div' );
		sidebarRightBody.style.height = (window.innerHeight - 120) + 'px';
		sidebarRightBody.id = 'sbr-body';
		sidebarRight.appendChild( sidebarRightBody );
		sidebarRightBody.innerHTML =
			'<h2>HTML Resources</h2>' +
			
// Widgets start here

// http://www.w3schools.com/jsref/dom_obj_pushbutton.asp
// Difference between this element and buttons created with input element: An HTML button element takes content like text or images.
			'<p><button onclick="" size="400">Toggle Play/Pause</button></p>' +

			'<p>Input - Button: <br>' +
				'<input type="button" id="button" name="button1" value="Display button name" size="400" />' +
			'</p>' +

			'<p>Input - Checkbox: <br>' +
				'<input type="checkbox" id="myCheck" checked>' +  // checked="checked"
			'</p>' +

// http://www.w3schools.com/jsref/dom_obj_fileupload.asp
			'<p>Input - File: <br>' +
				'<input type="file" id="fname" name="fule" value="File" />' +
			'</p>' +

			'<p>Input - Radio Buttons:<br>' +
				'<input type="radio" onchange="selectCity(this.id);" name="city" id="geneva">Geneva<br> ' +
				'<input type="radio" onchange="selectCity(this.id);" name="city" id="san-francisco" checked>San Francisco<br> ' +
				'<input type="radio" onchange="selectCity(this.id);" name="city" id="zurich">Zurich ' +
			'</p>' +

			'<p>Input - Range: <br>' +
				'<input title="Set the " style="width: 200px;" type="range" min="0" max="500" onchange="" step="50" value="300" >' +
			'</p>' +

			'<p>Input - Text: <br>' +
				'<input type="text" id="fname" name="button1" value="Display name" />' +
			'</p>' +

// http://www.w3schools.com/jsref/met_select_add.asp << add by code!
			'<p>' +
			'Select - Dropdown:<br>' +
			'<select onchange="" title="select the filed that the colors indicate" ><br>' +
				'<option>aaa aaa aaa</option>' +
				'<option>bbb bbb</option>' +
				'<option>cc cc cc cc</option>' +
				'<option>ddddddd</option>' +
				'<option>eee eee eee eee</option>' +
			'</select>' +
			'</p>' +

			'<p>Textarea: <br>' +
				'<textarea id="myTextarea" name="txt1" cols="30" rows="5">' +
					'Iteration system wide engenders economies of scale, cross-media technology, presentation action items and life cycle replication.' +
				'</textarea>' +
			'</p>' +
		'' ;
	}();
	
	var sbr2 = function() {
		sidebarRight2 = document.createElement( 'div' );
		sidebarRight2.id = 'sbr2';
		document.body.appendChild( sidebarRight2 );
		sidebarRight2.innerHTML =
			'<div class="control" onclick="toggleBar( sidebarRight2 )">[X]</div>' +
			'<h1>Control Panel 2</h1>';	
	
		var sidebarRightBody2 = document.createElement( 'div' );
		sidebarRightBody2.style.height = (window.innerHeight - 120) + 'px';
		sidebarRightBody2.id = 'sbr-body';		
		sidebarRight2.appendChild( sidebarRightBody2 );
		sidebarRightBody2.innerHTML =
			'<h2>Coded Resources</h2>' ;
			
		var p = sidebarRightBody2.appendChild( document.createElement( 'p' ) );

// buttons: two ways
		button1 = document.createElement( 'button' );
		p.appendChild( button1 );	
		button1.innerText = 'button1';

		p = sidebarRightBody2.appendChild( document.createElement( 'p' ) );
		
		button2 = p.appendChild( document.createElement( 'button' ) );	
		button2.innerHTML = '<s>button2</s>';
		
		p = sidebarRightBody2.appendChild( document.createElement( 'p' ) );

// select
		var select = p.appendChild( document.createElement( 'select' ) );
		for (var option, i = 0; i < 10; i++) {
			option = document.createElement( 'option' )
			select.appendChild( option );
			option.innerText = Math.random() * 1000000000;
		}
		
		var types = [ 
			['button','Button value'],['checkbox','Checkbox 1'],['file','File'], ['hidden','Hidden'], ['password','Password'], 
			['radio', 'Radio'], ['text','Tra lala la ']
		];
		
		for (var input, i = 0, len = types.length; i < len; i++) {
			p = sidebarRightBody2.appendChild( document.createElement( 'p' ) );
			p.innerHTML = types[i][1] + ':<br>';
			input = p.appendChild( document.createElement( 'input' ) );
			input.type = types[i][0];
			if ( types[i][0] == 'button' || types[i][0] == 'text') {
				input.value = types[i][1];
			} else if ( types[i][0] == 'checkbox' || types[i][0] == 'radio') {
				p.innerHTML += types[i][1];;
				input.checked = true;
			} 
		}
		
		p = sidebarRightBody2.appendChild( document.createElement( 'p' ) );
		p.innerHTML = 'Textarea:<br>';
		var textarea = p.appendChild( document.createElement( 'textarea' ) );
		textarea.style.cssText = 'height: 80px; width: 250px; ';
		textarea.value = '<s>stuff...</s>';

console.log(button1, button2, select, input, textarea);			
	}();
	
