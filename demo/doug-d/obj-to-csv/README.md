<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://jaanga.github.io/demo/doug-d/obj-to-csv/readme.html "View file as a web page." ) </span>


<div><input type=button onclick="window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/demo/doug-d/obj-to-csv/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>


# [OBJ to CSV Read Me]( #demo/doug-d/obj-to-csv/README.md )

<!--
<iframe src=https://jaanga.github.io/demo/doug-d/obj-to-csv/ width=100% height=500px >Iframes are not viewable in GitHub source code view</iframe>
_basic-html.html_
-->

### Full Screen demo and best link: [OBJ to CSV]( https://jaanga.github.io/demo/doug-d/obj-to-csv/ )


<details open >
<summary>Concept</summary>

### Features

- Load and view OBJ files in 3D
	- Scale and center geometry
	- Combine multiple geometries into one
- Update mesh
	- Rotate around XYZ
	- Select material
	- Update opacity
	- Toggle edges, box helper and wireframe
- Generate contour lines
	- Choose one to many
	- Select elevation of a single contor line
	- Menu displays a number of stats
	- Toggle view of objecy, contours and points
- Export vertices to CSV files
	- Export as strings of vertices
	- XYZ coordinates plus a line index
- Display settings
	- Update a variety of scene display settings

### Credits

* https://github.com/dashdotdotdashdotdot/Lines

### Mission

- To be able to create contours for any OBJ file
- To be able to generate contours for any 3D file (STL etc ) or parametric

### Vision

- Augment 3D so as to supply it with even greater dimensionality

### Versions


[OBJ to CSV 0.06.01 ]( v-0-06/obj-to-csv.html )

2019-12-11

- Looking OK
- Too many new things to list

[OBJ to CSV 0.05.00 ]( v-0-05/obj-to-csv.html )

* Mostly broken
* Gets Uncaught RangeError: Maximum call stack size exceeded



[OBJ to CSV 0.04.02 ]( v-0-04/obj-to-csv.html )

2019-12-07

* Add link to Render CSV file
* When ask for 72 contour levels you now get 72 contour levels (but each contour may have multiple lines)
* Export CSV segments dropped


[OBJ to CSV 0.04.00 ]( v-0-04/obj-to-csv.html )

2019-12-06

* Exported contours beginning to look good


[OBJ to CSV 0.03 ]( v-0-03/obj-to-csv-01.html )

* Keep hacking at better contours

[OBJ to CSV 0.02 ]( v-0-02/get-contours-from-objects.html )

* Keep hacking at better contours

[OBJ to CSV 0.01 ]( v-0-01/get-contours-from-objects.html )

* Adds export to segments
* Mesh material settings
* Add contour points toggles


[OBJ to CSV 0.00 ]( v-0-00/get-contours-from-objects.html )

* Complete remake of group-points-of-intersection
* Code split up into modules



#### [group-points-of-intersection read me]( https://jaanga.github.io/demo/doug-d/obj-to-csv/group-points-of-intersection/readme.html )

* Covers the details and links to five earlier releases
* Includes the file from Paul West that that inspired


</details>

<details open >
<summary>Issues </summary>

- 2019-12-11 ~ Theo ~ Some extra lines are drawn
- 2019-12-11 ~ Theo ~ Some gaps appear in contours
- 2019-12-11 ~ Theo ~ Some contour lines are drawn as multiple line segments instead of one

</details>

<details open >
<summary>To do and wish list </summary>

* 2019-12-11 ~ Theo ~ Add some memoization to main contour generating routine
* 2019-12-03 ~ Theo ~ Add [decimate function]( https://threejs.org/examples/webgl_modifier_simplifier.html ) to reduce number of faces to inspected
* 2019-12-01 ~ Theo ~ Scale along three axis not just Z
* 2019-12-01 ~ Theo ~ Animate the generation of points to do away with long pauses
* 2019-12-01 ~ Theo ~ Better use of original materials in OBJ file


</details>

<details open >
<summary> Things you can do using this script</summary>

* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Click the GitHub Octocat icon to view or edit the source code on GitHub
* Click on title to reload te page
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors

</details>

<details open >
<summary>Links of interest</summary>


### Contours and isolines
* https://en.wikipedia.org/wiki/Polygonal_chain

* https://en.wikipedia.org/wiki/Contour_line

### Algorithms

These are the links that got me started

* https://stackoverflow.com/questions/42348495/three-js-find-all-points-where-a-mesh-intersects-a-plane/42353447#42353447
* https://stackoverflow.com/questions/46661787/grouping-points-after-cut-plane-three-js/46811485#46811485
* https://discourse.threejs.org/t/extract-vertices-in-edge-connection-order-from-buffergeometry-for-is-inside-polygon-check/5088/2
* https://jsfiddle.net/prisoner849/uqm6bk1k/

### Software to develop characters

* https://www.mixamo.com/
	* Animate 3D characters for games, film, and more.
* https://www.zygote.com/
	* Creators of the world's leading 3D human anatomy models for use in medical illustration, animation, engineering, simulation, and anatomy software products.
* http://www.makehumancommunity.org/
	* MakeHuman is an open source (AGPL3) tool designed to simplify the creation of virtual humans using a Graphical User Interface


</details>

<details open >
<summary>Change log </summary>

### 2019-12-02 ~ Theo

_Deprecated. See version history above_

OBJ to CSV 0.03.01.1

* F: Add link to files from &mdash;.. &mdash;..
* R: Lowers initial cutting plane elevation to -50


### 2019-12-02 ~ Theo

OBJ to CSV 0.03.01.01

* B: Fix link to read me

### 2019-12-01

OBJ to CSV 0.03.01

* C: Add text to modules
* C: Rename to 'obj-to-csv'
* C: First commit read me

</details>

***

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>
