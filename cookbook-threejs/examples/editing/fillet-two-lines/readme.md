<span style=display:none; >[You are now in GitHub source code view - click this link to view Read Me file as a web page]
( https://jaanga.github.io/cookbook-threejs/examples/editing/fillet-two-lines/index.html#readme.md "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/editing/fillet-two-lines/'; value='You are now in GitHub web page view - Click this button to view Read Me file as source code' >

[Jaanga]( https://jaanga.github.io ) &raquo; [Cookbook Three.js]( https://jaanga.github.io/cookbook-threejs/  ) &raquo;
[Examples]( https://jaanga.github.io/cookbook-threejs/examples/ ) &raquo;

[Fillet Two Lines Read Me]( index.html#readme.md )
===

## Full Screen: [ Fillet Two Lines ]( https://jaanga.github.io/cookbook-threejs/examples/editing/fillet-two-lines/index.html )


<img src="https://cloud.githubusercontent.com/assets/547626/15915086/2e073288-2d9b-11e6-97d8-cb53ab297f1b.png" style=display:none; width=800 >

<iframe src=https://jaanga.github.io/cookbook-threejs/examples/editing/fillet-two-lines/index.html width=100% height=600px ></iframe>

_Fillet Two Lines_

***

## Concept


A precursor to [Fillet Line Array]( http://jaanga.github.io/cookbook-threejs/examples/editing/fillet-line-array/ ) 

### Mission

* Draw a 3D shape indicating the [fillet]( https://en.wikipedia.org/wiki/Fillet_(mechanics) ) of specified radius between two co-planar lines
* Find intersections and tangents quickly and easily 
* Update 3D geometry - angles and radius - in real-time

### Vision

* Make it easy to add curved corners to lots of things 
* To be a good demo of updating geometry in real time as a useful visualization tool 

## Features

* Draws lines, segment and shape
* Sliders allow you to adjust the angles and fillet radius and see results in real-time
* Determines if the angle between two lines is convex, concave or straight
* Readout identifies if the angle is convex or concave
* Finds and displays maker at center of fillet and edge tangent points
* Displays fillet as 3D shape
* The 3D views below enable you to rotate and pan using one, two or three fingers or left button, scroll wheel and right buttons on your pointing device. 
* Click three bars( 'hamburger' ) icon to slide menu in or out
* Display mesh as solid or wireframe
* Direct link to this read me file
* Click on title to reload 



## Things you can do using this script

* Drag the sliders to update the angles and fillet radius
* Use one/two/three fingers to rotate/zoom/pan the display in 3D
	* Or left/scroll/right with your pointing device 
* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Display fillet shape as solid or wireframe
* Direct link to this read me file
* Click on title to reload 
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors



## Things you can do by editing the code

<iframe src='https://jaanga.github.io/cookbook-html/examples/libraries/ace-editor/ace-view-r1.html#' +
	'https://jaanga.github.io/cookbook-threejs/examples/editing/fillet-two-lines/index.html' width=100% height=600 ></iframe>

<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/blob/master/cookbook-threejs/examples/editing/fillet-two-lines/fillet-two-lines-r5.html';
value='Source code listing' >


* Open this file: https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/editing/fillet-two-lines/
* Click the 'Raw' icon and save the raw file to your computer
* Once you've downloaded the file, you can click it to run it.
* Open the file with a text editor


## Issues

* Does not handle straight line very well
* using `shape.fromPoints( path.getPoints() );` would simplify matters


## Users

Intended for OpenDesk/WikiHouse/AEC projects


## Credits

* [StackOverflow: find convex an concave corners in a polygon]( http://stackoverflow.com/questions/13426362/find-convex-an-concave-corners-in-a-polygon )
	* See response by http://stackoverflow.com/users/4004357/w-f


## Change Log

### 2016-06-12

* Handles convex / concave angle transition
* Stacking of visualization elements adjusted to help you see more clearly what is gong on
* Fillet is now a JavaScript object
	* Perhaps a bit smarter than it was before
* Code cleanup

### 2016-06-10 R4

* Fillet starting to be drawn properly
* Add fillet radius slider
* Number of circle segments depends on size os angle

### 2016-06-09 R3

* Update read me
* Add and display offset lines at fillet radius distance
* Add and display marker at intersection point of the two offsets
* Add and display markers at fillet and line intersections 
* Code streamlined - a lot

Nice gentle progress. 

Being able to visualize diffs - such as changing the angles of the lines in real-time using things like sliders - really helps with debugging.

### 2016-06-08 R2.1

* Add 3D geometry
* update readme



### 2016-06-06

* Add Read Me

***

<center title="Jaanga ~ your 3D happy place" >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a>
</center>