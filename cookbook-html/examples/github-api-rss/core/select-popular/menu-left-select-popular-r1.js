

	function getMenuDetailsPopularOptions() {

		menuDetailsPopularOptions =

			'<details open >' +

				'<summary><h3>select option</h3></summary>' +

				'<p>' +
					'Select an option:<br>' +
					'<select id=selUser onchange=location.hash=this.value;console.log(this); title="Select the option" size=15 style=width:100%; >' +
				'	</select>' +
				'</p>' +

				'<p id=stats ></p>' +

				'<p id=stuff ></p>' +

			'</details>' +

		b;

		return menuDetailsPopularOptions;

	}


	function getPopularItems() {

		var fileName, xhr, repos, txt;

//		url = 'https://api.github.com/search/' + type + '?' + queries[ selQuery.selectedIndex ];

		url = 'https://api.github.com/search/repositories?q=stars:%3E35000';
		url = 'https://api.github.com/search/repositories?q=math+stars:%3E100';
		url = 'https://api.github.com/search/repositories?q=3d+stars:%3E100';
		xhr = new XMLHttpRequest();
		xhr.open( 'get', url, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			response = JSON.parse( xhr.responseText );

console.log( 'response', response.items[ 0 ] );

			stats.innerHTML = 'total count: ' + response.total_count.toLocaleString() + b;

			txt = ''

			for ( var i = 0; i < response.items.length; i++ ) {

				rep = response.items[ i ];

				selUser[ selUser.length ] = new Option( rep.full_name, rep.login );

//				txt += ( i + 1 ) + ' ' +

//					rep.full_name + // ': ' + rep.description + b + b;

//				b;

			}

			stuff.innerHTML = txt;

		}

	}