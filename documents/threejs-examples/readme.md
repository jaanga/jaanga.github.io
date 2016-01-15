<span id=topp style=display:none; >[You are now in a GitHub source code view - click this link to view this read me file as a web page]( http://jaanga.github.io/documents/threejs-examples-viewer/ "View file as a web page." ) </span>
<input onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/documents/threejs-examples-viewer/'; type=button value='You are now in a GitHub web page view - Click this button to view this read me file as source code' />


Three.js Examples Read Me
===


_Follow Mr.doob's [Three.js mission]( https://github.com/mrdoob/three.js/blob/master/README.md ): The aim of the project is to create a lightweight 3D library with a very low level of complexity — in other words, for dummies._

<br>
[Blog]( http://jaanga.github.io/request-jaanga-blog-posts.html )
~ [Documents]( http://jaanga.github.io/documents ) 
~ [Copyright and License]( http://jaanga.github.io/#http://jaanga.github.io/jaanga-copyright-and-mit-license.md ) 
~ [Contacts and Organization]( http://jaanga.github.io/#http://jaanga.github.io/jaanga-contacts-and-organization.md ) 
~ [All of It]( http://jaanga.github.io/cookbook-threejs/viewers/viewer-html-jaanga/viewer-html-jaanga-r1.html ) 

***



##Overview

### [Three.js Examples Rover - Full Screen - Dev]( http://jaanga.github.io/documents/threejs-examples/threejs-examples-rover/dev/index.html )

* Tries to break new ground with the user experience of viewing Three.js example files


### [Three.js Examples Viewer - Full Screen - Dev]( http://jaanga.github.io/documents/threejs-examples/threejs-examples-viewer/dev/index.html )

* Tracks closely the features in [Three.js Examples]( http://mrdoob.github.io/three.js/examples/ )
	* But does load a random example on load


### Sample Web Page / Source Code

<iframe class=ifr src=http://jaanga.github.io/cookbook-html/templates/code-edit-view/code-edit-view-r2.html#http://jaanga.github.io/documents/threejs-examples/threejs-examples-viewer/threejs-examples-viewer-r5.html width=100% height=600px ></iframe>  
###### _Three.js Examples Viewer - Dev revision - Code Edit View_ /  [Edit full screen]( http://jaanga.github.io/cookbook-html/templates/code-edit-view/code-edit-view-r2.html#http://jaanga.github.io/documents/threejs-examples/threejs-examples-viewer/threejs-examples-viewer-r5.html )


## Concept

### Issues / Problems
<!--

The general format is an adaptation of the ideas developed in Alexander's _et al_ [A Pattern Language]( https://books.google.com/books?id=hwAHmktpk5IC&pg=PR10#v=onepage&q&f=false ) - as sammarized on page 10.

Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice.

patterns are descriptions of common problems and proposal for the solutions that can be used repeatedly every time the problem is encountered and producing an different outcome.

-->

There are a number of with creating an easy to view catalog of animated 3D web pages.

The usual fashion is to create 2D thumbnails of the 3D pages. Using 2D to represent 3D is an admission of some sort of failure.
Using 2D to represent 3D begs the question: If 3D is so good, why don't you use 3D?




### Mission
<!-- a statement of a rationale, applicable now as well as in the future -->

Displays files from [Three.js Examples]( http://mrdoob.github.io/three.js/examples/ )

This is part of an attempt to build a simpler file viewer.

### Vision
<!--  a descriptive picture of a desired future state -->

* To make the viewing of thousands of 3D things really easy peasy

## Things to Do / Road Map


## Features


### Three.js Examples Rover

* Displays HTML or Markdown files
	* Displays a randomly selected file on load
	* Uses GitHub API to read names of all Three.js Releases
	* Dropdown list provides access to Three.js examples in all releases from R5 to the current 'dev' branch
	* Upon selection of a release, menu reads fresh data from GitHub and displays all example files for that release
* Menu element displays all Three.js example files organized by category
	* Clicking a menu item scrolls into view the selected file in the Contents pane
	* Menu items icons open file in new tab/window
* Content element displays scrolling view of all the example files
	* Bypasses browser limit of maximum sixteen open WebGL views
	* Creates renderers when views are visible
	* Discards renderers when view are not visible
	* View source button displays at top right when HTML file is loaded 
* Menu and contents scroll independently
* Three.js logo adapted from Three.js documentation source code
* Zoom, pan and rotate
	* 1 finger / left button >> rotate
	* 2 finger / wheel >> zoom in and out
	* 3 finger / right button >> pan


## Issues

### Three.js Examples Rover

* The further back you go the more there are issues
* Many of the issues relate to CORS issues and are solvable

 
## Sources


<br>

***

<center title="dingbat" >
# <a href=javascript:topp.scrollIntoView(); style=text-decoration:none; > ❦ </a>
</center>

