Jaanga Coding Style
===

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
The file sizes soon become huge and transmission speed suffer. 
If all the data did not come in, the app is hosed.
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

 

### Reduction of the Barriers of Notation

Mathematics notation, much like music notation in music, is a barrier that hampers entry by ordinary people into mathematics.

This web site explores ways of seeing concepts in multi-faceted manners. 

You can experience a concept by

* Viewing the math notation
* Seeing a visualization
* Editing the code
* Reading descriptions


### A map is not the territory

Much of what we do here is about data visualization - looking at numbers and trying to find meaning from them. 
The use of the numbers to recreate a photographic representation of an object is but one use for that data.
Often it is not an important use...

<https://en.wikipedia.org/wiki/Map%E2%80%93territory_relation>  
<http://www.nobeliefs.com/MapandTerritory.htm>


### Fork, Edit and Share

* For - to beg, borrow or steal a concept
* Edit - to make it your own
* Share - to give back to the world 


<https://guides.github.com/activities/forking/>  
<http://scholarslab.org/research-and-development/forking-fetching-pushing-pulling/>



### FOSS

[Free open source software (FOSS)]( https://en.wikipedia.org/wiki/Free_and_open-source_software ) is of the essence in the future of pedagogy.


### GitHub

An example of an excellent pedagogical playground.
