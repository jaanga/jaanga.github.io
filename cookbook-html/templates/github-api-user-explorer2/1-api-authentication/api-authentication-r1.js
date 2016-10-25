// Copyright &copy; 2016 Jaanga authors. MIT License

	var API = API || {};


// https://developer.github.com/v3/#authentication


//			API.getMenuDetailsAPIAccessToken() +

//		APIapiAcessToken.setAttribute( 'open', 'open' );

//		APIapiRates.setAttribute( 'open', 'open' );

	API.getMenuDetailsAPIAccessToken = function() {

		var menuDetailsAPIAccessToken =

			'<details id=APIapiAcessToken >' +

				'<summary><h3>Set API Access Token</h3></summary>' +

				'<small>If small request, no need for API key</small>' +

				'<p>api key: <input id=APIinpAccessToken onclick=this.select(); title="Obtain API Access Token" ></p>' +
				'<p><button onclick=API.onEventAPIKeyUpdate(); >Set API Access Token</button></p>' +

				'<details id=APIapiRates open >' +

					'<summary><h4>Rate Limits</h4></summary>' +

					'<div id=APIlimits ></div>' + b +

				'</details>' + 

			'</details>' + 

		'';

		return menuDetailsAPIAccessToken;

	}


http://www.businessinsider.com/amazon-unusual-process-to-decide-on-new-products-2016-9

// Use this menu if you want to see rate limits only

	API.getMenuDetailsAPIRates = function() {

		var menuDetailsAPIRates =

			'<details id=APIRates >' +

				'<summary><h3>Rate Limits</h3></summary>' +

				'<p id=APIlimits ></p>' +

			'</details>' + 

		'';

		return menuDetailsAPIRates;

	}


// see also C:\Users\Theo\Dropbox\Public\git-repos\jaanga.github.io\terrain3\google-maps-api3\b-clk-click\click-r1.js

	API.onEventAPIKeyUpdate = function() {

		if ( location.hash.includes( 'token=' ) ) {

			APIinpAccessToken.value = location.hash.slice( location.hash.indexOf( 'token=' ) + 6 )

		}

		API.token = 'access_token=' + APIinpAccessToken.value;


	};


	API.getRateLimits = function() {

		COR.requestFile( 'https://api.github.com/rate_limit', API.onRateLimitsCallback );

	};


	API.onRateLimitsCallback = function( xhr ) {

		response = JSON.parse( xhr.target.responseText );

		reset = new Date( response.resources.core.reset * 1000 ).toLocaleTimeString();

		APIlimits.innerHTML =

			'Limit: ' + response.resources.core.limit + b +
			'Remaining: ' + response.resources.core.remaining + b + 
			'Reset: ' + reset +

		b;

	};

