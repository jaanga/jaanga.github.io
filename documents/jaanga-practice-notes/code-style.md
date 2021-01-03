<span style=display:none; >[You are now in a GitHub source code view - click this link to view this read me file as a web page]
( http://jaanga.github.io/documents/jaanga-practice-notes/ "View file as a web page." ) </span>
<input onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/documents/jaanga-practice-notes/'; type=button  value='You are now in a GitHub web page view - Click this button to view this read me file as source code' />


# Code Style


## Standing on shoulders of giants

The coding style of a script should follow the style of the most-used library of the script.
* The style of an app built with jQuery should follow the style of, say, the [jQuery API Documentation]( http://api.jquery.com/ ) .
* The style of an app built using Three.js should follow the style of, say, the [Three.js Examples]( http://mrdoob.github.io/three.js/examples/ ).
* The styles in both the above examples do tend to be fairly simple coding styles - which is great for our kinds of uses.
* On occasion a greater degree of complexity is required In that case then the source code of each library should be used as it respective style to follow.

To be added

* Prettifier


## JavaScript

_What the following needs, more than anything, is links to sources that justify the following statement._

This documents should not be the ideas popping out of an individuals head, but the result of a number of long term investigations.
In other words, this document is not anecdotal but based on clinical studies.
The following should a demonstration based on the [scientific method]( https://en.wikipedia.org/wiki/Scientific_method ).

* Code generally follows the [Three.js examples]( http://mrdoob.github.io/three.js/examples/ ) coding style
	* In the instance of a [Three.js]( http://threejs.org ) script, the style generally follows [Mr.doob Coding Style]( https://github.com/mrdoob/three.js/wiki/Mr.doob%27s-Code-Style%E2%84%A2 ).
	* Three.js source code style is used as a secondary reference
	* Descriptive, informative variable names
	* Functions are functions not variables
	* Uses init() and animate() functions
	* Loads libraries from GitHub via a CDN
	* No external js or css files other then standard Three.js files
	* You should be able to move from reading Mr.doob's examples to reading our examples with little or no hesitation
	* In other words, code for youngsters/oldsters/beginners
* Lots of white space
	* Good: x = 23 * y + 54 * z
	* Not so good: x=23*y+54*z
	* Remember: JavaScript is compiled on the fly: no longer need to worry about whitespace slowing things down
* Minimum notation or use of symbols
	* Good: y = Math.floor( x );
	* Not so good: y = ~~x;
	* We do use semi-colons at the end of statements. The semicolon feels like the period at the end of a sentence. It allows you take take a breath before continuing
		* But otherwise minimize the use of punctuation because punctuation tends to slow down the reading speed
* All lower case
	* Even !DOCTYPE
* Everything in one file
	* No need to have multiple files open
	* No need to keep looking all over the place
* Emphasis on the use of one tool: JavaScript
	* The Document Object Model(DOM) is your friend
	* Use the DOM to add HTML and CSS to the document on the fly
* Very limited usage of libraries
	* No need to know Three.js and jQuery and whatever before you begin
	* Knowing some JavaScript and something about a single library should be good enough in most instances
* Take as much advantage as possible of the HTML 5 [Document Object Model (DOM)]( http://en.wikipedia.org/wiki/Document_Object_Model ) as possible
	* Example: `<tag id=thing >stuff</tag>`
		* 'thing' is taken as a global variable directly and immediately
		* `document.getElemenById is never invoked
	* Implies no support for elderly browsers
		* OK since WebGL cannot run in elderly browsers
		* Follows the Mr.doob ethos of no nostalgia, remain calm and progress into the future ASAP
* More
	* GitHub is the platform
	* Absolute URLs are recommended for items that would otherwise have issues with loading into Code-Edit-View.
	* Everything here is written in client-side JavaScript.


.js files is not what we do. We do cookbook code. Everything in the one script.
No black boxes. Nothing hidden away in remote places.

### HTML

* HTML is created as and when needed
	* Example

		contents = document.body.appendChild( document.createElement( 'div' ) );
		contents.id = 'contents';
		contents.innerHTML =

			'<h2>' +
				'<a href="" >' + document.title + '</a>' +
				'<a href=http://jaanga.github.io/ > &#x24D8; </a>' +
			'</h2>' +
		'';


### CSS

* CSS are split into three sections
	* Tags
	* Classes
	* IDs
* Within each of these sections the CSS items are listed in alphabetical order
* CSS parameters are listed in alphabetical order
	* Example: #bars { color: crimson; cursor: pointer; font-size: 24pt; text-decoration: none; }

### Various Other Coding Quirks

* Separation of 3D in-world code and 2D user interface code
	* All interaction with the Three.js code for 3D interaction is via embedded iframes
	* Allows parent window to use any of the many popular JavaScript libraries
	* Makes no attempt to turn Three.js code into, say, jQuery and ditto _vice versa_
* Code here is highly-risk taking
	* Example: Double quotes only used when absolutely necessary
		* The world: <html lang="en">
		* Us: <html lang=en >
	* Example: plays happily, willfully with untyped variables
	* Example: see above / no support for elderly browsers
* Code is designed to load or render on demand
	* In other words to load and display something ASAP
	* 'Just-in-time' library and data loading
* Code is designed to be seriously easy
	* Encourages engineers, architects and designers and non-professional programmers to add features
	* No need to know jQuery, Backbone, Angular. Get going if you only know a tiny bit of JavaScript
	* And do feel free to build a jQuery version...
* Content, appearance and behavior that are related are kept together
	* Every HTML file contains all its associated CSS, HTML data - as well as the JavaScript
		* The use of external JavaScript files other than major libraries such as Three.js or Showdown is kept to a minimum
	* No need to keep three files open. It's all in one file just in front of you
	* This is part of techniques that help you become more accustomed to the DOM
	* You should be able to download the single file and it runs
		* Links to essential libraries are absolute URLs
* Functions are still declared in old school manner
	* We use: function name(){}
	* We use rarely: var name = function(){}
	* This is because most people still seem to be learning JavaScript this way
	* When we find a good reason to switch, then we will switch
	* Example: if the Three.js examples switch over, then we switch over
* Functions contain most everything they need to run
	* You should be able to copy a function to another script and it should work
	* All little things such as var pi = Math.PI can be at the top of the function
	* We like: var thing; thing = []; because this allows the var statement to be commented out so it becomes a global and easier to debug
	* We like: var v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };
		* Yes, this is an instance of a function being declared as a variable
		* As a variable declaration it can be placed at the top of a function add thus advertises its usage later on
			* It's like the [gun on the mantle piece in a play]( https://en.wikipedia.org/wiki/Chekhov%27s_gun )
		* This makes sense for one-liners only
* Latitude and longitude are always specified in this order
	* lat = 2 * x
	* lon = 3 * y
* X and y are always specified in this order
	* x = lon - 10;
	* y = lat + 5;
* Width and height are always specified in this order
	* width = lon / 2
	* height = lat / 3

## Variable Names


* Use the same variable names and style that the documentation of your language uses
* Use the same variable names and style that your library uses

* [A Guide to Naming Variables]( https://a-nickels-worth.blogspot.com/2016/04/a-guide-to-naming-variables.html ) !!!
* [Good Variable Names]( http://c2.com/cgi/wiki?GoodVariableNames )
* [7+1 tips for naming variables]( http://www.makinggoodsoftware.com/2009/05/04/71-tips-for-naming-variables/ )
* [Is there an excuse for short variable names?]( http://programmers.stackexchange.com/questions/176582/is-there-an-excuse-for-short-variable-names )
* [15 Ways to Write Self-documenting JavaScript]( https://www.sitepoint.com/self-documenting-javascript/ ) !!!

## Naming things

* https://en.wikipedia.org/wiki/Naming_convention_(programming)
* https://www.crockford.com/code.html
* https://medium.com/better-programming/a-useful-framework-for-naming-your-classes-functions-and-variables-e7d186e3189f
* https://github.com/kettanaito/naming-cheatsheet

***

<center title="dingbat" >
# <a href=javascript:contents.scrollTop=0; style=text-decoration:none; >❦</a>
</center>