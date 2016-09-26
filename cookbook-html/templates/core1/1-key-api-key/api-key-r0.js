
	var API = API || {};


	API.getMenuDetailsAPIKey = function() {

		var menuDetailsAPIKey =

			'<details id=CLKapiKey >' +

				'<summary><h3>Set api key</h3></summary>' +

				'<small>If small request, no need for API key</small>' +

				'<p>api key: <input id=APIinpKey onclick=this.select(); title="Obtain API key" ></p>' +
				'<p><button onclick=API.onEventAPIKeyUpdate(); >Set API key</button></p>' +

			'</details>' + 

		'';

		return menuDetailsAPIKey;

	}

// see also C:\Users\Theo\Dropbox\Public\git-repos\jaanga.github.io\terrain3\google-maps-api3\b-clk-click\click-r1.js

	API.onEventAPIKeyUpdate = function() {

		API.token = 'access_token=' + APIinpKey.value;

	};
