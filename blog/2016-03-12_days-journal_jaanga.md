2016-03-11 ~ Update
===

## [Analemma 3D]( http://ladybug-analysis-tools.github.io/ladybug-web/analemma-3d/ )

Features

* 3D plot of Sun azimuth and altitude once an hour for days 1 through 28 of each month. 
* Default latitude and longitude is San Francisco
* Sliders update latitude and longitude of analemma in realtime
* Midnight highlighted is red. Noon highlighted in green

Latest update: 2016-03-12 /R1

* Has math error: noon and midnight analemmas are not opposite each other. 
	* Observe this error when viewing latitudes near Equator
* First commit

### [Time Now Give Lat Lon R1]( http://jaanga.github.io/cookbook-html/snippets/time-zone/time-now-given-lat-lon/ )

Latest update: 2016-03-12 / R1
 
* Uses [Google Maps Time Zone API]( https://developers.google.com/maps/documentation/timezone/intro ) to determine time zone
	* Handles day light saving time and local time zone anomalies
	* Ocean locations are timeless
* Default latitude and longitude is San Francisco
* Sliders update latitude and longitude and recalculates time in real-time