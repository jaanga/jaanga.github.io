[Jaanga]( http://jaanga.github.io ) &raquo; 

🔭 [Outer Space Read Me]( index.html )
===

<span style=display:none; >[You are now in GitHub source code view - click this link to view Read Me file as a web page]( http://jaanga.github.io/outer-space/ "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/outer-space/'; value='You are now in GitHub web page view - Click this button to view Read Me file as source code'  />

[Outer Space Blog]( ./blog/index.html )

## Concept

### Issues / Problems
<!--

The general format is an adaptation of the ideas developed in Alexander's _et al_ 
[A Patttern Language]( https://books.google.com/books?id=hwAHmktpk5IC&pg=PR10#v=onepage&q&f=false ) - as summarized on page 10.

Each pattern describes a problem which occurs over and over again in our environment, 
and then describes the core of the solution to that problem, 
in such a way that you can use this solution a million times over, without ever doing it the same way twice.

Patterns are descriptions of common problems and proposal for the solutions that 
can be used repeatedly every time the problem is encountered and producing an different outcome.

-->

Access to Science, Technology, Engineering and Math ([STEM]( https://en.wikipedia.org/wiki/Science,_Technology,_Engineering,_and_Mathematics ))

* People do not always find it an easy thing trying to acquire skills in science, technology, engineering and math.

<!-- Theo 2015-10-21 >> I'm looking for links that describe the types of issues that people may have in acquiring STEM skills -->
 
Access to Data

* The tools to explore and discover things were once literally rocket science. Yet we know that the data is accessible and and the development tools easier than ever. 
* Computers and the Internet have allowed scientists to gather, store and share huge amounts of data, 
yet that data is often in huge highly inaccessible files and to examine the data requires complicated tools.  

Access to Tools

* Typical samples of programming code relate to coding skills, while actual STEM applications tend to be huge and complex. 
Beginners have little access to good places to start.

User Experience

* Web sites appear on your computer as if by magic. You have no idea who makes what you see, how it is made or where it comes from. 

### Mission
<!-- a statement of a rationale, applicable now as well as in the future -->


STEM
* To provide software examples that only require a basic knowledge of HTML, CSS and JavaScript in order to get going and 'make it your own'
* To demonstrate that all this is possible in an environment that allows you to fork, embellish, share and publish online that is free and open source


Access to Tools

* To provide real-world STEM tools that useful, informative and simple that you may fork, edit and share
* To supply a range of cookbook code samples only a few hundred lines long that beginners can learn in an afternoon and begin enhancing in a day or two.
* To follow established coding - not quirky - standards so that students coming in get up to speed quickly

_If you can change the orbit of a satellite and monitor the consequences, do you not then 'own' that satellite?
If you 'own' a thing - even if it's only in your imagination - have you not acquired a huge amount of knowledge?_



### Vision
<!--  a descriptive picture of a desired future state -->

* To help you write code that helps you - and others - to discover new things about the the universe you live in
* The next set of goals are a work in progress (WIP)
* Enable and to attract more people into thinking about and acting on STEM issues
	* Works - eventually - on devices normally used by general populations - ie tablets and phones
	* Enables ordinary people not just to view but to interact with 3D models in new ways
	* FOSS benefits
* Help STEM professionals communicate their specialist skills to a broader population 
	* No attempt to compete with the tools professionals use to tackle sophisticated and complex designs
	* Very much attempting to bring engineering and design _savoire faire_ - both high end levels and plain old common sense levels - to a broader swathe of humanity 
* Perhaps a 'turntable' or mixing studio for 3D DJs
* Follow Mr.doobs' manifesto: 'to create a lightweight 3D library with a very low level of complexity — in other words, for dummies'
	* Code is designed to be very fast to read
		* Encourages engineers, scientists and non-professional programmers to add features
		* Allows designers to concentrate on improving the design rather than fixing the code
		* No need to know jQuery, Backbone, Angular. Get going if you only know a tiny bit of JavaScript
		* If you do know jQuery etc: you are welcome! Viewer code can be embedded easily in your apps

The Apps
===

## Moon

* Explore the Moon in 3D

[Moon Read Me - Web Page]( http://jaanga.github.io/moon/ )  
[Moon Read Me - Source Code]( https://github.com/jaanga/moon/ )  


## Mars

* Explore Mars in 3D

[Mars Read Me - Web Page]( http://jaanga.github.io/mars )  
[Mars Spotter Read Me - Source Code]( https://github.com/jaanga/mars/ )  


## Star Spotter

* View undreds of thousands of stellar objects in 3D

[Star Spotter Read Me - Web Page]( http://jaanga.github.io/outer-space/star-spotter )  
[Star Spotter Read Me - Source Code]( https://github.com/jaanga/jaanga.github.io/tree/master/outer-space/star-spotter/ )  


## NASA 3D Objects Viewer

* View NASA 3Dprinter STL files in 3D

[NASA 3D Objects Read Me - Web Page]( http://jaanga.github.io/outer-space/nasa-3d-objects-viewer )  
[NASA 3D Objects Read Me - Source Code]( https://github.com/jaanga/jaanga.github.io/tree/master/outer-space/nasa-3d-objects-viewer )  

<br>
<hr>

## Things to Do

### Current Mission: Outer Space

* Think of ways of hooking up NASA photo locations with 3D
* Add more celestial bodies


### Code

* Develop simple techniques for displaying orbits and trajectories

### User Experience

* Split this page into useful sections
* Research existing astronomy apps for ideas



<br>
<hr>

_The following sections are very much a work in progress. 
Text is in the process of being culled from a variety of sources and needs much editing.
Eventually the following work will be split into several files._
_

## Coding Style Guidelines


The code should be as close as possible to readable English

The coding style of an app should follow the style of the most-used library of the app.

Absolute URLs are recommended for items that would otherwise have issues with loading into Code-Edit-View.

In the instance of a [Three.js]( http://threejs.org ) script, the style generally follows [Mr.doob Coding Style]( https://github.com/mrdoob/three.js/wiki/Mr.doob%27s-Code-Style%E2%84%A2 ).

* Code generally follows the Three.js examples coding style more than the source code style
	* Descriptive, informative variable names
	* Functions are functions not variables
	* Uses init() and animate() functions
	* Loads libraries from GitHub via a CDN
	* No external js or css files other then standard Three.js files
	* You should be able to move from reading Mr'doob's examples to reading Jaanga examples with little or no hesitation
	* In other words, code for youngsters/oldsters/beginners
* Lots of white space
	* Good: x = 23 * y + 54 * z
	* Not so good: x=23*y+54*z
	* Remember: JavaScript is compiled on the fly: no longer need to worry about whitespace slowing things down
* Minimum notation or use of symbols
	* Good: y = Math.floor( x );
	Not so good: y = ~~x;
* Everything in one file
	* No need to have multiple files open 
	* No need to keep looking all over the place 
* Emphasis on the use of one tool: JavaScript
	* The Document Object Model(DOM) is your friend
	* Use the DOM to add HTML and CSS to the document on the fly
* Very limited usage of libraries
	* No need to know Three.js and jQuery and whatever before you begin
	* Knowing some JavaScript and something about a single library should be good enough in most instances
* Lots of small apps
	* Not one big app
* Emphasis on astronomy, physics, math but not coding
	We seek great visualizations not great code
* Sharing is of the essence
	* Fork, improve, share is the mantra
	* GitHub is the platform

### Various Other Coding Quirks

* CSS tags are in alphabetical order
* Latitude and longitude are always specified in this order
	* lat = 2 * x
	* lon = 3 * y
* X and y are always specified in this order
	* x = lon - 10;
	* y = lat + 5;
* Width and height are always specified in this order 
	* width = lon / 2
	* height = lat / 3
* Separation of 3D in-world code and 2D user interface code
	* All interaction with the Three.js code for 3D interaction is via embedded iframes
	* Allows parent window to use any of the many popular JavaScript libraries
	* Makes no attempt to turn Three.js code into, say, jQuery and ditto _vice versa_
* Takes as much advantage of the HTML 5 [Document Object Model (DOM)]( http://en.wikipedia.org/wiki/Document_Object_Model ) as possible
	* Example: `<tag id=thing >stuff</tag>`
		* 'thing' is taken as a global variable directly and immediately
		* `document.getElemenById` is never invoked
	* Implies no support for elderly browsers
		* OK since WebGL cannot run in elderly browsers
		* Follows the Mr.doob ethos of no nostalgia, remain calm and progress into the future ASAP
* Code is highly-risk taking
	* Example: Double quotes only used when absolutely necessary
		* The world: <html lang="en">
		* Us: <html lang=en >
	* Example: plays happily, willfully with untyped variables 
	* Example: see above / no support for elderly browsers
* Code is designed to be load or render on demand
	* In other words to load and display something ASAP
	* 'Just-in-time' library and data loading
* Code style
	* Generally follows ['MDCS']( https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2 ) 
	* As generous horizontally but much more greedy vertically
	* Also passes jsHint
* Code is designed to be seriously easy
	* Encourages engineers, architects and designers and non-professional programmers to add features
	* No need to know jQuery, Backbone, Angular. Get going if you only know a tiny bit of JavaScript
	* And do feel free to build a jQuery version...
* Content, appearance and behavior that are related are kept together
	* Every HTML file contains all its associated CSS, HTML data - as well as the JavaScript
	* No need to keep three files open. It's all in one file just in front of you
	* This is part of techniques that help you become more accustomed to the DOM

### Markdown

[Markdown]( https://en.wikipedia.org/wiki/Markdown ) is used extensively with the [Showdown converter]( https://github.com/showdownjs/showdown ).

See [Markdown Basics]( https://help.github.com/articles/markdown-basics/ )


### Fonts

The font used here is the the default 'monospace' font as determined by your browser. This is because it is the most common font used to write scripts.


### Browser Support

Many of the scripts in Jaanga are built using the Three.js library which in turn is based on WebGL.

WebGL runs only on relatively recent computers and browsers

See: <http://caniuse.com/#feat=webgl> for current browser support.

Given the dependence on WebGL, it makes little sense for Jaanga to support browsers that are not WebGL-enabled.

Furthermore, the intent of Jaanga is to entice youngsters and oldsters into the joys of programming.

Writing scripts that contain work-arounds to support old browsers is one of the anti-joys of programming.

Thus, we will write scripts for devices and OSs and browsers that support WebGL.

We will leave out the cruft required by old browsers. We will code in a style that is as fresh and as modern as possible.


### Content Delivery Networks (CDN)

In order to prevent scripts breaking due to changes in new revsions, Exploratorion links libraries that are used to CDN

CDNs used:

* [CDNJS]( https://cdnjs.com/ )
	* <https://cdnjs.com/libraries/three.js>
* [RawGit]( https://rawgit.com/ )
	* Example: <https://rawgit.com/mrdoob/three.js/r70/examples/js/controls/OrbitControls.js>

As in:

```
<script src=http://rawgit.com/mrdoob/three.js/r71/build/three.min.js ></script>  
<script src=http://rawgit.com/mrdoob/three.js/r71/examples/js/controls/OrbitControls.js ></script>
<script src=http://rawgit.com/mrdoob/three.js/r71/examples/js/libs/stats.min.js ></script>  
```

### PNG files are used to store the data

We tried using ASCII JSON text files to store elevation data. There were many issues.
The file sizes soon becaume huge and transmission speed suffer. 
If all the data did not come in. the app is hosed.
There are too many numbers to be able to 'see' things.

We looked into using binary files, but these seem to require a whole lot of expertise and effert. 
The use of binary files did not seem to make hiles smaller or transmit faster.

The use of PNG files as heightmaps solves many problems and provides many benefits/

* Data is highly compressed without loss
* Files are transmitted and cached speedily and effortlessly
* Creating mash-ups with data from multiple servers is easy and permissible
* You can actually look at the file and see something
* The scope and range of tools to process PNG files is huge


## User Experience Overview

_This first draft is in response to a message from Abe. It was a message to me, but I am using it a spur for thought as to what we should be asking of students._


### Generally

* Display enables pan, rotate and zoom with pointing device
* Full-screen display with translucent menu
* Menus are iconizable and drag-able
* Menus have accordion feature
* Set background to random gradient or random color or selected color
* Permalinks for everything


### Colors, Textures and Shading

> Abe: >> I don't know if it's possible to get RGB or albedo maps for the surface but if not, it would seem more natural to represent the surface as a flat grey than to display the height map as the color.   For computer graphics people who are used to looking at height maps, it's not so weird but for the average person, I think the coloring might be a bit strange.  If you go with a grey surface coloring, then the background should probably be either a neutral gradient or be something spacey like a star field. 

* You have an array of tools including
	* Lambert and Phong materials
	* Textures
	* lights, shade and shadows 
	* Bump maps and shaders
* You have a bunch of needs
	* 'Realistic' or green cheese
	* Gravity, magnetism and other fields
	* Geology, current and historical
	* Human activities. current and historical

You want many simple cookbook examples that demonstrate the use and effectives of all of the above.

### Gamification / Exaggeration

> Abe: >> It would be nice to know what the height exaggeration factor is and perhaps control it to yield a more realistic representation.

* Height indicator / control
	* Every script that exaggerates height should have a slider bar or similar mechanism that enables you to play with and control the exaggeration.
	* It is important to remember that when viewing the Moon as a whole object - an object with a radius of 1728 km and 'bumps' of two or three km at most - that the exaggeration scale should be set to zero to be 'real'
		* Repeat: the most realistic representation of height when looking at representation of the Earth or moon that is a few centimeters across is zero.
		* Any differences are less than 0.01 mm.


### Camera Motion

> Abe: >> Is it possible to have the roving motion smoothly animate rather than jumping discretely?  The jumps are a little bit jarring and sometimes a bit hard to follow.

A recent release of the JavaScript library we use for 3D - Three.js - very much improved the number of vertices that can be manipulated on screen in real-time.
R71 could comfortably handle a mesh with 65,536 vertices - or a dimension of 256 x 256.
R72 pushed the number to over a million or 1024 x 1024 that render at 60 fps or close to that (depends very much on how good a GPU your computer has).
This good number of vertices makes for some very satisfying renderings that zoom pan and rotate quite delightfully.

There are are still issues. It would be nice to have many millions of pixels, and in a few years we will likely have this. 
But first we have to deal with what we have at hand. And an important consideration becomes the way we come the camera over the terrain.

As of this writing the NASA data is gathered from image files with 256 x 256 pixels. 
Every time the camera moves to a new location, Moon Rover loads a 4 x 4 grid or 16 images.
Any time the camera target moves outside that current grid a fresh row or column of 1 x 4 images has to be loaded and one of the existing columns for rows has to be discarded.
This load, in essence, dictates that the camera moves in 256 pixels jumps or one quarter of the mesh area 
The issue is that this is too is a jump for the eyes. The eye cannot track the movement of a particular crater or rill when the displacement is that great.

Forthcoming revisions will load a 4 x 5 grid of images and crop down to 4 x 4. in this way, the camera can even move a row or column of a single pixels per iteration.
The interesting thing then is that the movement ends up being so precise that is takes forever and a day to traverse a large swath of the Moon.

The ideal would that if you are going click, click, click that the movements would be quite small perhaps 4 to 8 pixels at time.
But if you are holding down the the movement might bump up to 32 or 64 pixels per iteration.

Good camera movement takes good coding, tools that have excellent user experience and excellent camera peeps. Let's make this happen!



## Pedagogy

[Pedagogy]( https://en.wikipedia.org/wiki/Pedagogy ) is the method and practice of teaching, especially as an academic subject or theoretical concept.

The intent of this web site is to help you teach yourself topics/concepts in STEM by visualizing and editing 
the data and code that represent an underlying theoretical concept.

By playing and manipulating the concept you become intimate with its nuances.
 
<!-- bring in? Transcendental apperception  / http://plato.stanford.edu/entries/kant-mind/ -->

### Source Code Visible and Editable

Source code is not magic. Source code is something you edit.
Every project should make at least some of its source code visible and editable by the user on the spot.



### Things to Do Sections
Every script should have a 'things to do' sections relating to the issues addressed in the concept/mission/vision statement.

There should be items relating to:

* STEM
* Current mission
* Coding
* User experience

Items in things to do sections may range from simple suggestions as to fun places to tweak the code to far-ranging project road-map considerations.

As much as possible the project itself should make you as 'who, what, when, where and why?'.
The things to do are just replications of the thoughts you are being provoked by the project while you are looking at the project.

Examples:

* Was that crack in the ground made by water? I don't see any water, but that looks like water erosion to me.
* Was that crack in the ground made by an earthquake? It seems to break through hills and valleys.

 
### Fork, Edit and Share

* For - to beg, borrow or steal a concept
* Edit - to make it your own
* Share - to give back to the world 


<https://guides.github.com/activities/forking/>  
<http://scholarslab.org/research-and-development/forking-fetching-pushing-pulling/>

### FOSS

[Free open source software (FOSS)]( https://en.wikipedia.org/wiki/Free_and_open-source_software ) is of the essence in the future of pedagogy.

### Reduction of the Barriers of Notation

Mathematics notation, much like music notation in music, is a barrier that hampers entry by ordinary people into mathematics.

This web site explores ways of seeing concepts in multi-faceted manners. 

You can experience a concept by

* Viewing the math notation
* Seeing a visualization
* Editing the code
* Reading descriptions

  


### GitHub

An example of an excellent pedagogical playground.


<br>
<hr>

## Copyright and License

Copyright © 2015 Jaanga authors

This work is available under two licenses

1: Jaanga software is available under the [MIT License]( http://en.wikipedia.org/wiki/MIT_License) which states:

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'),
to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

The software is provided 'as is', without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement.
In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.


2: Jaanga documentation and data is available under a [Creative Commons]( http://creativecommons.org/ ) CC0 license.

<p xmlns:dct="http://purl.org/dc/terms/" xmlns:vcard="http://www.w3.org/2001/vcard-rdf/3.0#">
<a rel="license" href="http://creativecommons.org/publicdomain/zero/1.0/">
<img src="http://i.creativecommons.org/p/zero/1.0/88x31.png" style="border-style: none;" alt="CC0" />
</a>
<br />
To the extent possible under law, <a rel="dct:publisher" href="http://jaanga.github.io">
<span property="dct:title">Jaanga authors</span></a> have waived all copyright and related or neighboring rights to <span property="dct:title">Jaanga works</span>.
This work is published from: <span property="vcard:Country" datatype="dct:ISO3166" content="US" about="http://jaanga.github.io"> United States</span>.
</p>

<br>
<hr>

<center title="glowing star" >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; >&#127775;</a>
</center>

