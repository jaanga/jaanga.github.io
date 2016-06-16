<span style=display:none; >[You are now in GitHub source code view - click this link to view Read Me file as a web page]
( https://jaanga.github.io/cookbook-threejs/examples/editing/fillet-line-array/index.html#readme.md "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/editing/fillet-line-array/'; value='You are now in GitHub web page view - Click this button to view Read Me file as source code' >

[Jaanga]( https://jaanga.github.io ) &raquo; [Cookbook Three.js]( https://jaanga.github.io/cookbook-threejs/  ) &raquo;
[Examples]( https://jaanga.github.io/cookbook-threejs/examples/ ) &raquo;


[Fillet Line Array Read Me]( index.html#readme.md )
===

_2016-06-16: it's working!_
_Draws a fresh polygon each time you click 'Example Random'_
_Builds upon [Fillet Two Lines R6]( https://jaanga.github.io/cookbook-threejs/examples/editing/fillet-two-lines/fillet-two-lines-r6.html )_

## Full Screen: [Fillet Line Array]( https://jaanga.github.io/cookbook-threejs/examples/editing/fillet-line-array/index.html )


<img src="https://cloud.githubusercontent.com/assets/547626/15840421/b5e9c7f4-2bfe-11e6-9c84-86e99d1be608.png" style=display:none; width=800 >

<iframe class=ifr src=https://jaanga.github.io/cookbook-threejs/examples/editing/fillet-line-array/index.html width=100% height=600px ></iframe>


_Fillet Line Array_

## Concept
The mission is to help the peeps at [OpenDesk]( https://www.opendesk.cc/ ) transfer data from their SketchUp files over to Three,js.

Currently they are creating humongous Three.js JSON files using Python.

The concept here is:

Given a .CSV file or Google Spreadsheet or parametric data in some format that contains points that form a polygon and fillet radii for each point, 
create Three.js path that can extrude to a 3D shape.

Allow for both convex and concave curves / inside and outside fillets.


## Features

* Display multiple examples by clicking buttons
* Displays angle calculations
* The 3D views below enable you to rotate and pan using one, two or three fingers or left button, scroll wheel and right buttons on your pointing device. 
* Click three bars( 'hamburger' ) icon to slide menu in or out
* Display mesh as solid or wireframe
* Direct link to this read me file
* Click on title to reload 


## Things you can do using this script

* Use one/two/three fingers to rotate/zoom/pan the display in 3D
	* Or left/scroll/right with your pointing device 
* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors


## Things you can do by editing the code

<iframe src='https://jaanga.github.io/cookbook-html/examples/libraries/ace-editor/ace-view-r1.html#' +
	'https://jaanga.github.io/cookbook-threejs/examples/editing/fillet-line-array/fillet-line-array-r5.html' width=100% height=600 ></iframe>

<input type=button onclick=window.location.href='https://jaanga.github.io/cookbook-threejs/examples/editing/fillet-line-array/fillet-line-array-r5.html';
value='Source code listing' >


* Open the latest file here: https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/editing/fillet-line-array/
* Click the 'Raw' icon and save the raw file to your computer
* Once you've downloaded the file, you can click it to run it.
* Open the file with a text editor

## Wish list

* Handle variable fillet radii
* Centers and radii from a GitHub Gist
* Use shape.fromPoints( obj.path ) to reduce number of faces

## Issues

* Handles the angles incorrectly when adjacent fillets are of different radii. 



## Users

Intended for OpenDesk/WikiHouse...

## Links of Interest

### Polyline

* http://www.webopedia.com/TERM/P/polyline.html
* https://en.wikipedia.org/wiki/Polygonal_chain
* http://help.eclipse.org/mars/index.jsp?topic=%2Forg.eclipse.graphiti.doc%2Fresources%2Fdocu%2Fgfw%2Fpolygon-and-polyline.htm
* https://msdn.microsoft.com/en-us/library/cc294631.aspx



## Change Log


### 2016-06-16 ~ R7

* It's working
* Needs a big code clean-up

### 2016-06-15 ~ R6

* Draws shapes with correct center point but incorrect start and end angles
* Deletes all existing geometry before creating new geometry
* Finds all intersection points for a closed polygon



### 2016-06-14 ~ R5

* Beginning to handle concavity and convexity
* Displays offset lines
* Displays markers at intersections of offset lines

### 2016-06-06 ~ R3

* Add readme
* Concavity / convexity === wip
* Has three examples
* Code cleanup


### 2016-06-04 ~ R2 

<img src="https://cloud.githubusercontent.com/assets/547626/15840421/b5e9c7f4-2bfe-11e6-9c84-86e99d1be608.png" width=800 >


***


<center title="Jaanga ~ your 3D happy place" >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a>
</center>

