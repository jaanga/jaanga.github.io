Welcome to the Jaanga Terrain4 BETA
====

<iframe src=terrain-tiles-structures-r2.html width=600 height=500 ></iframe>
_Downtown San Francisco / Hyatt Embarcadero at center_

This is a work in progress at an early stage.

Click 'Downtown San Francisco / Hyatt Embarcadero' for a quick demo of what this app does.

Click the title in the menu to return to this home page / read me file.


The app has two menus:

The **'Select'** menu takes you to pre-selected areas. The tooltips for each item show you the number of structures to be loaded. The greater the number of structures, the longer it takes to load.

The **'Locate;** menu allows to to enter an address or location anywhere in the world. You can use the on=screen cursor keys to go to the next tiles.

## Concept

There are numerous outstanding mapping applications available these days. Many have sophisticated APIs. 
The range of features is phenomenal. The level of the quality and complexity of the code is extremely high 

One result of all this success is that entry level barriers are quite high. You have to accept what is available with the API or set of a sophisticated development environment in order to customize a complex system.

But what happens if you just want to tinker around. What if you wanted to display molecules in virtual reality? What happens if you want to put monsters on your maps and blow up buildings?

What happens if you you need a mapping tool for some kind of scientific research and that code is the important part and the mapping code should be real simple and keep out of the way.

Well, then, you have arrived at a good location.

We are here to provide you with mapping code you can tinker with and learn to hack in a day or so.


### Mission

* 3D terrain, 2D raster maps and 3D structures all visible and manipulable in one app
* Easy peasy, free open source entry level code
* Simple dependencies
	* Three.js for 3D
	* ShowDown for Markdown Conversion
	* Mapbox for the data tiles
* Basic code is 700 lines / 17KB


### Vision

* Taking maps to new places

## Issues

* 2017-07-24 ~ heights of buildings are frequently incorrectly calculated
* 2017-07-24 ~ Most [geoJson features]( https://en.wikipedia.org/wiki/GeoJSON ) are not yet implemented

Not all tiles have 3D building data


## To-Do

* 2017-07-25 ~ Sunlight by date, time and location
* 2017-07-25 ~ Sun ranges
* 2017-07-25 ~ Solar access
* 2017-07-25 ~ Select source of raster tiles
* 2017-07-25 ~ Select quality of raster tile display
* 2017-07-25 ~ Support all zoom levels
* 2017-07-25 ~ Use request animation frame to control the intersection gathering to stop the app from not responding


### Source code

* <https://glitch.com/edit/#!/jaanga-terrain4>