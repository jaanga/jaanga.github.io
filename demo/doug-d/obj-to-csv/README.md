<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page](https://jaanga.github.io/demo/doug-d/obj-to-csv/readme.html "View file as a web page.") </span>

<div><input type=button onclick="window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/demo/doug-d/obj-to-csv/README.md'";
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' ></div>

# [OBJ to CSV Read Me](#demo/doug-d/obj-to-csv/README.md)

<!--
<iframe src=https://jaanga.github.io/demo/doug-d/obj-to-csv/ width=100% height=500px >Iframes are not viewable in GitHub source code view</iframe>
_basic-html.html_
-->

### Full Screen demo and best link - OBJ to CSV: https://jaanga.github.io/demo/doug-d/obj-to-csv/

<details open >

<summary>Concept</summary>

* List, select, open and view [OBJ files]( https://en.wikipedia.org/wiki/Wavefront_.obj_file ) in 3D
* Generate contour points and lines
* Export contour line vertices to [CSV files]( https://en.wikipedia.org/wiki/Comma-separated_values )

### Features

_In order of appearance on the menu_

- Browse, open and view OBJ files in 3D
	- Open OBJ files using file dialog box
	- Browse libraries of pre-selected OBJ files on the web
	- Geometry is automatically scaled, centered and zoomed
	- Combine multiple geometries into a single Three.js mesh
	- A variety of geometries created by algorithm are available for testing
- Generate contour points
	- Choose one to many
	- Select elevation of a single contour line
- Generate contour lines
	- Menu displays a number of stats
	- Toggle view of mesh, contours and points
- Export vertices to CSV files
	- Export as strings of vertices
	- XYZ coordinates plus a line index
- Settings
	- Update a variety of scene display settings
	- Rotate around XYZ
	- Select material
	- Update opacity
	- Toggle edges, box helper and wireframe

### Credits

- https://github.com/dashdotdotdashdotdot/Lines

### Mission

- To be able to create contours for any OBJ file
- To be able to generate contours for any 3D file (STL etc ) or parametric

### Vision

- Augment 3D so as to supply it with even greater dimensionality

### Versions


[OBJ to CSV v-pw0.01.00 ](v-pw-0-01/obj-to-csv-pw.html)

* Built on Paul West's point to line sequencing algorithm
* Frequently creates lines with only a few vertices

***

Both Paul West's and Theo Armour's algorithms for sequencing point into polylines have issues. We will continue to work on both - in separate forks: v-pw and v-ta

Currently the Paul West algorithm produces the better results and is set as the default version.

***

[OBJ to CSV 0.11.00 ](v-0-11/obj-to-csv.html)

* Built on Paul West's point to line sequencing algorithm

[OBJ to CSV 0.10.00 ](v-0-10/obj-to-csv.html)

* Built on Theo Armour's point to line sequencing algorithm
* Generates on a single polyline per contour level
* Fails to complete if a polyline is not closed

[OBJ to CSV 0.09.00 ](v-0-09/obj-to-csv.html)

2019-12-23

* Adds Geometry simplify
* Files an menu items moved around
* Object rotation and mesh material settings get more features


[OBJ to CSV 0.08.00 ](v-0-08/obj-to-csv.html)

[OBJ to CSV 0.07.00 ](v-0-07/obj-to-csv.html)

2019-12-19

- Getting closer
- Still some very short segments showing up
* Need to work on standardizing all the normals and connecting adjoing segments


[OBJ to CSV 0.06.05 ](v-0-06/obj-to-csv.html)

2019-12-16

- Code cleanup and rejig menu a bit

[OBJ to CSV 0.06.04 ](v-0-06/obj-to-csv.html)

- Start the contouring process from the top - More funner that way
- Add 'join adjacent segments' button - Not fully functioning yet

[OBJ to CSV 0.06.03 ](v-0-06/obj-to-csv.html)

- Add 'Remove short segments' button - Button must be pushed in order to intiate a second pass on the data - Does better job of finding and deleting - Provides report on how many segments deleted
- Add contour line labels checkbox toggle - Will help with identifying and reporting contours with issues
- Add contours are drawn in real-time as they are being calculated - Makes for a more attractive user experience

[OBJ to CSV 0.06.02 ](v-0-06/obj-to-csv.html)

2019-12-12

- Deletes segments of three vertices or less that are all very close together
- Add if last vertex is close to first vertex then close the polygon
- Update the statistics display

[OBJ to CSV 0.06.01 ](v-0-06/obj-to-csv.html)

2019-12-11

- Looking OK
- Too many new things to list

[OBJ to CSV 0.05.00 ](v-0-05/obj-to-csv.html)

- Mostly broken
- Gets Uncaught RangeError: Maximum call stack size exceeded

[OBJ to CSV 0.04.02 ](v-0-04/obj-to-csv.html)

2019-12-07

- Add link to Render CSV file
- When ask for 72 contour levels you now get 72 contour levels (but each contour may have multiple lines)
- Export CSV segments dropped

[OBJ to CSV 0.04.00 ](v-0-04/obj-to-csv.html)

2019-12-06

- Exported contours beginning to look good

[OBJ to CSV 0.03 ](v-0-03/obj-to-csv-01.html)

- Based on Theo Armour's first point to line sequencing algorithm
- Keep hacking at better contours

[OBJ to CSV 0.02 ](v-0-02/get-contours-from-objects.html)

- Keep hacking at better contours

[OBJ to CSV 0.01 ](v-0-01/get-contours-from-objects.html)

- Adds export to segments
- Mesh material settings
- Add contour points toggles

[OBJ to CSV 0.00 ](v-0-00/get-contours-from-objects.html)

- Complete remake of group-points-of-intersection
- Code split up into modules

#### [group-points-of-intersection read me](https://jaanga.github.io/demo/doug-d/obj-to-csv/group-points-of-intersection/readme.html)

- Covers the details and links to five earlier releases
- Includes the file from Paul West that that inspired

</details>

<details open >
<summary>Issues </summary>

- 2019-12-11 ~ Theo ~ Some extra lines are drawn
- 2019-12-11 ~ Theo ~ Some gaps appear in contours
- 2019-12-11 ~ Theo ~ Some contour lines are drawn as multiple line segments instead of one

</details>

<details open >
<summary>To do and wish list </summary>

- 2019-12-16 ~ Theo ~ Add translate contour line data into a continuous spiral data
- 2019-12-16 ~ Theo ~ Add ability to cut sections
- 2019-12-11 ~ Theo ~ Add some memoization to main contour generating routine
- 2019-12-03 ~ Theo ~ Add [decimate function](https://threejs.org/examples/webgl_modifier_simplifier.html) to reduce number of faces to inspected
- 2019-12-01 ~ Theo ~ Scale along three axis not just Z
- 2019-12-01 ~ Theo ~ Animate the generation of points to do away with long pauses
- 2019-12-01 ~ Theo ~ Better use of original materials in OBJ file

</details>

<details open >
<summary> Things you can do using this script</summary>

- Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
- Click the GitHub Octocat icon to view or edit the source code on GitHub
- Click on title to reload te page
- Press Control-U/Command-Option-U to view the source code
- Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors

</details>

<details open >
<summary>Links of interest</summary>

### Contours and isolines

- https://en.wikipedia.org/wiki/Polygonal_chain

- https://en.wikipedia.org/wiki/Contour_line

### Algorithms

These are the links that got me started

- https://stackoverflow.com/questions/42348495/three-js-find-all-points-where-a-mesh-intersects-a-plane/42353447#42353447
- https://stackoverflow.com/questions/46661787/grouping-points-after-cut-plane-three-js/46811485#46811485
- https://discourse.threejs.org/t/extract-vertices-in-edge-connection-order-from-buffergeometry-for-is-inside-polygon-check/5088/2
- https://jsfiddle.net/prisoner849/uqm6bk1k/
* https://jsfiddle.net/prisoner849/8uxw667m/
* https://stackoverflow.com/questions/217578/how-can-i-determine-whether-a-2d-point-is-within-a-polygon/2922778#2922778

Paul West

* https://jsfiddle.net/user/prisoner849/fiddles/
* https://github.com/Prisoner849
* https://discourse.threejs.org/u/prisoner849/summary

### Software to develop characters

- https://www.mixamo.com/
	* Animate 3D characters for games, film, and more.
- https://www.zygote.com/
	* Creators of the world's leading 3D human anatomy models for use in medical illustration, animation, engineering, simulation, and anatomy software products.
- http://www.makehumancommunity.org/
	* MakeHuman is an open source (AGPL3) tool designed to simplify the creation of virtual humans using a Graphical User Interface


### clockwise

* https://stackoverflow.com/questions/1165647/how-to-determine-if-a-list-of-polygon-points-are-in-clockwise-order
* https://stackoverflow.com/questions/14505565/detect-if-a-set-of-points-in-an-array-that-are-the-vertices-of-a-complex-polygon


</details>

<details open >
<summary>Change log </summary>

Change log _Apart from occasional comments: Deprecated. See version history above_

### 2019-12-17


It looks like some of my "improvements"  to the code by Paul West are the cause of the addition of the many small segments. Must rejig my code.

### 2019-12-02 ~ Theo


OBJ to CSV 0.03.01.1

- F: Add link to files from &mdash;.. &mdash;..
- R: Lowers initial cutting plane elevation to -50

### 2019-12-02 ~ Theo

OBJ to CSV 0.03.01.01

- B: Fix link to read me

### 2019-12-01

OBJ to CSV 0.03.01

- C: Add text to modules
- C: Rename to 'obj-to-csv'
- C: First commit read me

</details>

---

# <center title="hello!" ><a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a></center>
