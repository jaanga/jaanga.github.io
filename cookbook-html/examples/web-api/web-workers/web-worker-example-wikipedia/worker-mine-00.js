
let n = 1;
const endValue = 10**7;

search: while ( n <= endValue) {

	n++;

	for ( let i = 2; i <= Math.sqrt( n ); i++ ) {

		if ( n % i == 0 )

			continue search;

			// found a prime!
			postMessage( n );



	}

}