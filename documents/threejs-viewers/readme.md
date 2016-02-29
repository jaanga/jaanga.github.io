<span id=topp style=display:none; >[You are now in a GitHub source code view - click this link to view this read me file as a web page]( http://jaanga.github.io/documents/threejs-viewers/ "View file as a web page." ) </span>
<input onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/documents/threejs-viewers/'; type=button value='You are now in a GitHub web page view - Click this button to view this read me file as source code' />


Three.js Examples Read Me
===


_Follow Mr.doob's [Three.js mission]( https://github.com/mrdoob/three.js/blob/master/README.md ): "The aim of the project is to create a lightweight 3D library with a very low level of complexity — in other words, for dummies."_

<br>
[Blog]( http://jaanga.github.io/request-jaanga-blog-posts.html )
~ [Documents]( http://jaanga.github.io/documents ) 
~ [Copyright and License]( http://jaanga.github.io/#http://jaanga.github.io/jaanga-copyright-and-mit-license.md ) 
~ [Contacts and Organization]( http://jaanga.github.io/#http://jaanga.github.io/jaanga-contacts-and-organization.md ) 
~ [All of It]( http://jaanga.github.io/cookbook-threejs/viewers/viewer-html-jaanga/viewer-html-jaanga-r1.html ) 

***



##Overview

There are currently six variations of new types of viewers of the [Three.js Examples]( http://mrdoob.github.io/three.js/examples/ ) in this folder. See the [home page]( http://jaanga.github.io/documents/threejs-examples/ ) 
for details and links to each.

<!--
### [Three.js Examples Rover - Full Screen - Dev]( http://jaanga.github.io/documents/threejs-examples/threejs-examples-rover/dev/index.html )

* Tries to break new ground with the user experience of viewing Three.js example files


### [Three.js Examples Viewer - Full Screen - Dev]( http://jaanga.github.io/documents/threejs-examples/threejs-examples-viewer/dev/index.html )

* Tracks closely the features in [Three.js Examples]( http://mrdoob.github.io/three.js/examples/ )
	* But does load a random example on load
-->


### Sample Web Page / Source Code

<iframe class=ifr src=http://jaanga.github.io/cookbook-html/templates/code-edit-view/code-edit-view-r2.html#http://jaanga.github.io/documents/threejs-viewers/threejs-viewer-basic/threejs-viewer-basic-r1-@.html width=90% height=600px ></iframe>  
###### _Three.js Examples Viewer - Dev revision - Code Edit View_ /  [Edit full screen]( http://jaanga.github.io/cookbook-html/templates/code-edit-view/code-edit-view-r2.html#http://jaanga.github.io/documents/threejs-viewers/threejs-viewer-basic/threejs-viewer-basic-r1-@.html )


## Concept

### Issues / Problems
<!--

The general format is an adaptation of the ideas developed in Alexander's _et al_ [A Pattern Language]( https://books.google.com/books?id=hwAHmktpk5IC&pg=PR10#v=onepage&q&f=false ) - as sammarized on page 10.

Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice.

patterns are descriptions of common problems and proposal for the solutions that can be used repeatedly every time the problem is encountered and producing an different outcome.

-->

There are a good number of proprietary and complex 3D files viewers, including

* Aurodesk A360
* Clara.io
* GitHub STL viewer
* 3D Warehouse
* Verold
* http://www.viewstl.com/

There are not many example of simple open source file viewers


There are a number of ways of creating an easy-to-view catalog of animated 3D web pages.

The usual manner is to create 2D thumbnail images of the 3D pages. 
But using 2D to represent 3D is an admission of some sort of failure.
Using 2D to represent 3D begs the question: If 3D is so good, why don't you use 3D?

Generally:
* Using a 2D thumbnail in a gallery to link to a 3D web page is old school
* Using stills to show something that moves is not the way to go. Stills won't get you anywhere. Stills are the way to stop.
* Using things that don't interact to represent things that do interact is a bad act
* Why make two things - the file and the icon or representation - when one should do?

### Mission
<!-- a statement of a rationale, applicable now as well as in the future -->

Using the files from [Three.js Examples]( http://mrdoob.github.io/three.js/examples/ ) we want to do the following:

* Show that you can display animated real-time 3D in animated real-time 3D
* Build demos with very simple JavaScript
* Menu element displays all Three.js example files organized by category
	* Clicking a menu item scrolls into view the selected file in the Contents pane
	* Menu items icons open file in new tab/window
	* Highlight currently selected file
* Content element displays scrolling view of all the example files
	* Bypasses browser limit of maximum sixteen open WebGL views
	* Creates renderers when views are visible
	* Discards renderers when view are not visible
	* View hundreds of files in a singe page
	* Recycle iframes as needed
* Provide link to view source code
* Open selected files in new tab
* Display a randomly selected file on load
* Support permalinks
* Categorize and prettify file names
	* Display categories with header tags
* Loads fast
	* Or displays stuff soon
	* Adds more detail as time goes on
* Passes through all the individual interaction of each 3D file
* Separates code and content
* Menu and contents scroll independently
* Designed to be view in multiple sizes
	* Works on mobile
	* Works projected on the wall
* You don't go to it. It comes to you.

### GitHub API

* Use GutHUB API to
	* Obtain the latest, most up to date list of files at run-time
	* Read names of files in folders, recursively in required
	* Use GitHub API tags to source revisions tags and their contents


### Use of Iframe

* Use iframe srcdoc feature to display files where data has been mangled
* Report data such as number of files found

### User Interface

* Scroll menu and contents separately if needed
* Always show something
	* Open with a randomly selected file

This is part of an attempt to build a simpler file viewer.


<!--
The second message is a bit more complicated. 

Don't go there and come back, go there and come back. Make the 'there' come to you.

The first statement refers to a list of hyperlinks whee in order to see of the referenced pages you must click the link. go to that page, 
then click on the return button, do back to the original page and then click on the next hyperlink
-->

### Vision
<!--  a descriptive picture of a desired future state -->

* To make the viewing of thousands of 3D things really easy peasy

## Things to Do / Road Map


## Features

* Zoom, pan and rotate
	* 1 finger / left button >> rotate
	* 2 finger / wheel >> zoom in and out
	* 3 finger / right button >> pan


## Issues

### Three.js Examples Timeline

* The further back you go the more there are issues
	* Many of the issues relate to CORS issues and are solvable
	* Early example files were in separate folders

## Sources

* Three.js logo adapted from Three.js documentation source code

<br>

***

<center title="dingbat" >
# <a href=javascript:topp.scrollIntoView(); style=text-decoration:none; > ❦ </a>
</center>

