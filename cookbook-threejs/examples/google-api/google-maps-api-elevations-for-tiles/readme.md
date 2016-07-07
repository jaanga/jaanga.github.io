<span style=display:none; >[You are now in GitHub source code view - click this link to view Read Me file as a web page]
( https://jaanga.github.io/cookbook-threejs/examples/google-api/google-maps-api-elevations-for-tiles/index.html#readme.md "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/google-api/google-maps-api-elevations-for-tiles/'; value='You are now in GitHub web page view - Click this button to view Read Me file as source code' >

[Jaanga]( http://jaanga.github.io ) &raquo; [Cookbook Three.js]( http://jaanga.github.io/cookbook-threejs/  ) &raquo;
[Examples]( https://jaanga.github.io/cookbook-threejs/examples/ ) &raquo; [Google API]( https://jaanga.github.io/cookbook-threejs/examples/google-api/ ) &raquo;

[Google Maps API Elevations for Tiles Read Me]( https://jaanga.github.io/cookbook-threejs/examples/google-api/google-maps-api-elevations-for-tiles/index.html#readme.md )
===

## Full Screen: [ Google Maps API Elevations for Tiles ]( https://jaanga.github.io/cookbook-threejs/examples/google-api/google-maps-api-elevations-for-tiles/index.html )


<img src="https://cloud.githubusercontent.com/assets/547626/16543909/d572ff4a-40a4-11e6-81b8-e321f751e2a4.png" style=display:none; width=800 >

<iframe src=https://jaanga.github.io/cookbook-threejs/examples/google-api/google-maps-api-elevations-for-tiles/index.html width=100% height=600px ></iframe>

_Google Maps API Elevations for Tiles_

***

## Concept

### Mission

* TBD

### Vision

* TBD


## Features

* Obtain latitude and longitude for any location using Google Maps Geocoding
* Given latitude, longitude, zoom level, number of tiles per side, number of samples per side
	* App obtains - using Google Maps API - elevations for every sample
* Choose the quality of the data - can be sub-meter accurate where such data is available
* Respects Google's usage limits
* Tested to 
	* 250,000 elevations gathered in just over an hour.
	* 900 elevations in a few seconds
* Displays elevations in 3D in window
* Save data to a local file
* Reports on many aspects of the of the data 


## Things you can do using this script

* Use one/two/three fingers to rotate/zoom/pan the display in 3D
	* Or left/scroll/right with your pointing device 
* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the check box to display mesh as solid or wireframe
* Click the 'I' in the circle to go to the read me file
* Click on the title to reload the script
* Click the [Stats]( https://github.com/mrdoob/stats.js/ ) box in the top corner to toggle FPS / MS / MB views
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors



## Things you can do by editing the code

<iframe src='https://jaanga.github.io/cookbook-html/examples/libraries/ace-editor/ace-view-r1.html#
	https://jaanga.github.io/cookbook-threejs/examples/google-api/google-maps-api-elevations-for-tiles/google-maps-api-elevations-for-tiles-r1.html' width=100% height=600 ></iframe>

<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/google-api/google-maps-api-elevations-for-tiles/google-maps-api-elevations-for-tiles-r1.html';
value='Source code listing' >


* Open this file: https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/google-api/google-maps-api-elevations-for-tiles/google-maps-api-elevations-for-tiles-r1.html
* Click the 'Raw' icon and save the raw file to your computer
* Once you've downloaded the file, you can click it to run it.
* Open the file with a text editor


## To Do

* Try ignoring over_query_limit. Add delay to console output
* Update 3D Display while drawing 
* Able to do 1000x1000 maps reliably and quickly
* Add ability to send directly to View Elevations 3D Display script
* Save partial file and restart - much faster


## Issues

* Not able to close tab or Google Chrome  - for a very, very long time - after saving

### Rate limits
The Google Maps API has strict rate limits for downloading elevations.
Figuring out how stay stay under the rate limits and yet be as fast as possible is an amusing challenge.
There seem to be a variety of speed bumps

* No more than 512 elevations in a single ask
* No more than 1000 elevations in under a second
* No more than ?? elevations in under a minute?
* No more than ?? elevations in under x minutes>
 
### File Names

Using file names to convey essential meta data. Is this a good thing?

Example
elevations_-31.7300_148.6392_z12_t4_500x500_.txt

This gives: latitude, longitude, zoom, tiles and samples.
Tile numbers could be given instead. This would save some calculating and might avoid an error or two.
But nobody knows tile number and lat/lon is familiar to all


## Users

Intended for xxx


## Goals


## Links of Interest

* https://developers.google.com/maps/documentation/elevation/start
* https://developers.google.com/maps/documentation/geocoding/start


## Change Log

### 2016-07-06 ~ R7

* Drop internal 3D display
* Switch to 3D display using iframe
	* Link to 'View Elevation 3D'


### 2016-07-04 ~ R6

* Add 3D display
* Add 3D Display menu items
	* Visible checkbox
	* Wireframe checkbox
	* Auto-rotate checkbox
	* Vertical scale
* Tiles and Samples both dropdown lists


### 2016-07-04 ~ R5

* Update meta data
* Add new Jaanga titling
* Add Google Maps Geocoding to get lan & lon of any location
* Move messages into textarea

### 2016-07-03 ~ R4

* Add about box
* Add messages div, re-jig elevations messages
* Add tiles input
* Adjust menu spacing
* Add selective delay
* Add multi-tile capability
* UI to set samples and tiles
* Display borders of individual tiles
* Fix a variety of variable-related errors


### 2016-07-02 ~ R3

* Menu uses details/summary
* Many updates to the data display
* Add zoom and samples input
* Add latitude/longitude input
* Add link to OSM source of algorithms for lat/lon to tile numbers and vice versa


### 2016-07-01 ~ R2

* Update read me / add index

### 2016-06-30 ~ R1

* First commit
* Add Read Me


***

<center title='Jaanga ~ your 3D happy place' >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a>
</center>
