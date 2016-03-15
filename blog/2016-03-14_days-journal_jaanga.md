2016-03-14 ~ Update
===


## [Analemma 2D]( http://ladybug-analysis-tools.github.io/ladybug-web/analemma-2d/ )

### Features

* 2D plot of Sun azimuth and altitude once an hour at the 21st of each month. 
* Default is lat/lon of San Francisco
* Latitude and longitude sliders - with real-time updates
* Buttons to display data for New York, Isfahan, San Francisco and Sydney
* Midnight highlighted in red. Noon highlighted in green
* Hourly data output in degrees
* Permalink support
* Slide-out menu support - helps with use on tablets

### Latest update: 2016-03-14 /R3

* Rename from 'Analemma Sandbox' to 'Analemma 2D'
* Adds slide-out 'hamburger' menu
* Code clean-up
* Adds latitude and longitude sliders - real-time updates
* Display and text readout calculated in degrees ( was radians ) 
* Permalink support

### Issues

* Funky stuff happens when using latitude slider
	* Is this our error or a SunCalc.js error?


## [Analemma 3D]( http://ladybug-analysis-tools.github.io/ladybug-web/analemma-3d/ )


### Features

* 3D plot of analemmas of Sun azimuth and altitude once an hour for days 1 through 28 of each month. 
* Default latitude and longitude is San Francisco
* Sliders update latitude and longitude of analemma in real-time
* Displays map of location
	* Nine maps styles to choose from
* Buttons available for selected cities
* Midnight highlighted is red. Noon highlighted in green
* Placards indicate the hour of each analemma
* Permalink support
* Slide-out menu support

### Latest update: 2016-03-14 / R3

* Code clean-up

### Issues

* Has math error: noon and midnight analemmas are not opposite each other. 
	* Observe this error when viewing latitudes near Equator
* Map not positioning correctly


## [Time Remote Given Lat Lon UTC]( http://jaanga.github.io/cookbook-html/snippets/time-zone/time-remote-given-lat-lon-utc/ )

### Features
 
* Uses [Google Maps Time Zone API]( https://developers.google.com/maps/documentation/timezone/intro ) to determine time zone
	* Handles day light saving time and local time zone anomalies
	* Ocean locations are timeless
* Default latitude and longitude is San Francisco
* Sliders update latitude and longitude and recalculates time in real-time
* Sliders update UTC time
* Buttons add selected cities
* Permalinks support accepts latitude, longitude and UTC time input
* Calculates and displays remote day and time - given UTC hours ans minutes
	* Displays universal time
	* Displays time zone and time zone ID

### Latest update: 2016-03-14 / R3

* Rename from 'Time Now Given Lat Lon]' to 'Time Remote Given Lat Lon UTC'
* Add UTC hour and minute sliders
* Add buttons
* Requests Google Date only as needed and not always
* Adds UTC date and time to permalinks
* Improve display mechanism
* Add remote universal time display 


## [SunCalc Sandbox]( http://ladybug-analysis-tools.github.io/ladybug-web/suncalc-sandbox/ )

### Features

* Built on [SunCalc.js]( https://github.com/mourner/suncalc )
* Calculates and reports Sun times and position in radians and degrees
* Calculates and reports Moon illumination, times and positions in radians and degrees
* API that creates, updates and accepts permalinks
	* Accept date, time, latitude and longitude
* Buttons provide data for selected cities


### Latest update: 2016-03-14 / R7

* Code clean-up
* Display data in UTC plus in the time zone of the remote location
* Redesign permalinks
* Add buttons
