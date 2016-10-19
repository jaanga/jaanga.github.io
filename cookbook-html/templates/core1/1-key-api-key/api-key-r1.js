
	var KEY = KEY || {};


	KEY.getMenuDetailsAPIKey = function() {

		var menuDetailsAPIKey =

			'<details id=APIapiKey >' +

				'<summary><h3>Set API Key</h3></summary>' +

				'<small>If small request, no need for API key</small>' +

				'<p>api key: <input id=APIinpKey onclick=this.select(); title="Obtain API key" ></p>' +
				'<p><button onclick=KEY.onEventAPIKeyUpdate(); >Set API key</button></p>' +

			'</details>' + 

		'';

		return menuDetailsAPIKey;

	}

	KEY.getMenuDetailsAPIRates = function() {

		var menuDetailsAPIRates =

			'<details id=APIRates >' +

				'<summary><h3>Rate Limits</h3></summary>' +

				'<p id=APIlimits ></p>' +

			'</details>' + 

		'';

		return menuDetailsAPIRates;

	}


// see also C:\Users\Theo\Dropbox\Public\git-repos\jaanga.github.io\terrain3\google-maps-api3\b-clk-click\click-r1.js

	KEY.onEventAPIKeyUpdate = function() {

		if ( location.hash.includes( 'token=') ) {

			APIinpKey.value = location.hash.slice( location.hash.indexOf( 'token=' ) + 6 )

		}

		KEY.token = 'access_token=' + APIinpKey.value;


	};

	KEY.getRateLimits = function() {

		COR.requestFile( 'https://api.github.com/rate_limit', KEY.onRateLimitsCallback );

	};

	KEY.onRateLimitsCallback = function( xhr ) {

//console.log( 'xhr', xhr );

		response = JSON.parse( xhr.target.responseText );

//console.log( 'res', response );

		reset = new Date( response.resources.core.reset ).toLocaleTimeString();
		APIlimits.innerHTML =

			'Limit: ' + response.resources.core.limit + b +
			'Remaining: ' + response.resources.core.remaining + b + 
			'Reset: ' + reset +

		b;

	};

