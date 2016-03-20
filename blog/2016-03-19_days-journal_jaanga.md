2016-03-19 ~ Update
===

![image](https://cloud.githubusercontent.com/assets/547626/13901345/e591233a-eddd-11e5-99bb-685719c62298.png)

Hi Team Ladybug

We have sunshine! And shade and shadows. All move in analemmic patterns when you use the time sliders.

There are, however, still a number of errors in logic. And, even though there was a big code cleanup and updating of variable names today, the new additions brought in their own bugaboos. With a bit of luck some of these will be cleaned up in the revision in the next day or so. Otherwise I might ask for some help. Revision details are provided below

Theo

## [Analemma 3D]( http://ladybug-analysis-tools.github.io/ladybug-web/analemma-3d/ )

### Mission

* To display one analemma for every hour of the day in 3D at any location on Earth
* To display the position of the Sun - using azimuth and altitude - at any date and time at any location on Earth


### Features

* 3D plot of analemmas of Sun azimuth and altitude once an hour for days 1 through 28 of each month. 
	* Midnight highlighted is red. Noon highlighted in green
	* Placards indicate the hour of each analemma
	* Displays current position of sun
	* Displays shadow and shade
	* Reference object to indicate shade and shadow coverage
* Select location
	* By latitude and longitude sliders
	* Select city from a gazetteer of over 2,000 places names
	* Default latitude and longitude is selected randomly from the gazetteer
	* Sliders update latitude and longitude of analemma in real-time
* Select date and time
	* Sliders for month, date, hour and minutes
	* Update Sun position and shadows in real-time
* Displays map of location
	* Check boxes to toggle map display - also grid and axis
	* Nine maps styles to choose from
	* Sliders for map zoom factor and opacity 
* Information panel
	* Displays a variety of information including
	* Latitude and longitude
	* Local and UTC time
	* Time zone name, id and offset in hours
* Full menu system
	* Accordion menus use HTML5 details and summary element
	* Works on all recent browsers - though still in beta on FF
	* Slide-out 'hamburger' menu support



### Latest update: 2016-03-19 / R7

* Code clean-up and updates to many variable names
	* Making variable names more meaningful and consistent
* Add Sun mesh and direction light
	* Positions update with each slider movement
* Add shadows and shade
* Add trylon and and perisphere reference/demo objects
* Add more time-updating capabilities
* Random location at load time

### Things To Do / Road Map

* Text input for lat and lon
* Replace/Upgrade SunCalc.js with NOAA/Bostock JavaScript
* Translucent ring to indicate full Sun path
* Animations
* Add solar times readout - with buttons to display sun position for location, date and time 
* Add access to geolocation - as in [ Google Developers Geolocation API]( https://developers.google.com/maps/documentation/javascript/examples/map-geolocation )
* Add access to places autocomplete = as in [Google Maps JavaScript API Place Autocomplete]( https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete )
* Open Street gazetteer

### Goals

* Do everything the following do
	* Animations from [Sun Position Calculator]( http://www.pveducation.org/pvcdrom/properties-of-sunlight/sun-position-calculator )
	* Data from [SunCalc.org]( http://www.suncalc.org/ )
	* UI aspects from [Sun Path 3]( http://andrewmarsh.com/apps/releases/sunpath3d.html )


### Issues

* Errors in logic
	* Sun high at poles, low at equator
	* Times reversed below equator
	* Analemmas upside down
* Updates time zone data always - even if no lat/lon change
* Not all sliders working properly
* Maps not updating properly when using sliders
* Permalink support (currently broken )

***

Gestification r3 is now in its own repository at https://github.com/jaanga/gestification3/

Many links inside files have not yet been updated and still point to the old folders. These issues will be fixed in due course.

Announcements such as status updates will now be written as GitHub Issues. The benefits include: 
* Messages may be written in Markdown format
* Adding images is very easy.
* Housekeeping of old updates is easy
* Long term preservation is taken care of
* And much more
 
***
![image](https://cloud.githubusercontent.com/assets/547626/13903017/aaa27a5c-ee24-11e5-9527-1a7138dafa6d.png)

[Single Position Select Mesh R1]( http://jaanga.github.io/gestification3/single-position-select-mesh/ )

* Three.js template for Leap Motion devices.
* A single pointing mesh - attached to the first index finger that appears.
* Use buttons to select box, cylinder, prolate spheroid or arrow pointer.
* All meshes created on-the-fly using simple Three.js geometry.

***

![image](https://cloud.githubusercontent.com/assets/547626/13903026/27779ca6-ee25-11e5-8365-e78bfa36c6a9.png)

[Single Position Load JSON R1]( http://jaanga.github.io/gestification3/single-position-load-json/ )

* Three.js template for Leap Motion devices.
* A single pointing mesh - attached to the first index finger that appears.
* Use buttons to select and load a variety of 3D models as left-handed pointers.






