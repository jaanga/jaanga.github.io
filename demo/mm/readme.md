<span style=display:none; >[You are now in a GitHub source code view - click this link to view the home page]( http://jaanga.github.io/demo/mm/index.html "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/demo/mm/'; 
value='You are now in the home page view - Click this button to view the read me file and the source code' >

[Jaanga]( http://jaanga.github.io ) » [Demo]( http://jaanga.github.io/demo/  ) »

[Moving Manuals Read Me]( index.html )
===

_The product assembly manuals of the future - now_

<!--
[Blog]( http://jaanga.github.io/request-jaanga-blog-posts.html )
~ [Documents]( http://jaanga.github.io/documents ) 
~ [Copyright and License]( http://jaanga.github.io/#http://jaanga.github.io/jaanga-copyright-and-mit-license.md ) 
~ [Contacts and Organization]( http://jaanga.github.io/#http://jaanga.github.io/jaanga-contacts-and-organization.md ) 
-->

[Further Considerations]( ./readme-reader.html#further-considerations.md )
~ [Design Notes]( http://jaanga.github.io/demo/mm/readme-reader.html#design-notes.md ) 
~ [Dev Notes]( http://jaanga.github.io/demo/mm/readme-reader.html#dev-notes.md ) 

***


##Overview

### [Moving Manuals home page]( http://jaanga.github.io/demo/mm/index.html )

### [Screw and Round Nut - Demo - Full Screen - Latest ]( http://jaanga.github.io/demo/mm/screw-and-round-nut/index.html )

### [Poang Rocking Chair - Demo - Full Screen - Latest ]( http://jaanga.github.io/demo/mm/poang-rocking/index.html )

### [Kallax Wall Bracket Basic - Demo - Full Screen - Latest]( http://jaanga.github.io/demo/mm/kallax-wall-bracket/index.html )

### [Kallax NxN Basic - Demo - Full Screen - Latest ]( http://jaanga.github.io/demo/mm/kallax-nxn/index.html )

### 
_This is all still a work-in-progress. In particular: sounds and textures need much effort._
_If you would like to see a 'prettified' version in the near future, please let us know._


_2016-02-28_


* All four demos checked, edited and verified to be FF and Edge compatible

[Moving Manuals home page]( http://jaanga.github.io/demo/mm/index.html )

* Initial mock-up



_2016-02-27_

[Screw and Round Nut - Demo - Full Screen - Latest ]( http://jaanga.github.io/demo/mm/screw-and-round-nut/screw-and-round-nut-r2-@.html )

* Assemble detail with cinema

_2016-02-23_

[Poang Rocking Chair - Demo - Full Screen - R4 ]( http://jaanga.github.io/demo/mm/poang-rocking/poang-rocking-r4-@.html )

* Adds object snap capability while editing/creating
	* No more placing hardware by many trial end error attempts
	* Select three points on existing geometry is now sufficient
	* Utility allows points to be highlighted and by a simple clock on the screen
* Add createClip and step-by-step assembly animation
	* First pass
	* Components move to final assembly positions
	* No intermediate positions showing actual assembly process yet
* All significant requirements met
	* Still a number of minor errors
		* Hardware pointing in wrong direction or misplaced
		* Hardware details need finalizing
	* Still number of details to be added
		* Rails tongues and slots
		* Arm and back lap joint 

_2016-02-20_

[Poang Rocking Chair - Demo - Full Screen - R3.4 ]( http://jaanga.github.io/demo/mm/poang-rocking/poang-rocking-r3.html )

* Add toggle hardware scale
* Works on Safari & iOS
* Code clean-up
* Full assembly-disassembly tweening

_2016-02-08_

[Poang Rocking Chair - Demo - Full Screen - R3 ]( http://jaanga.github.io/demo/mm/poang-rocking/poang-rocking-r3-00.html )

* Adds first pass at assembly tweening
* Code clean-up
* Three.js r75 fixes

_2016-02-04_

[Poang Rocking Chair - Demo - Full Screen - R2 ]( http://jaanga.github.io/demo/mm/poang-rocking/poang-rocking-r2.html )

* Basic Geometry is OK
* Needs better colors and textures
* Geometry needs loosening up/randomizing



_2016-01-29_

[Kallax NxN Basic R7 - Demo - Full Screen ]( http://jaanga.github.io/demo/mm/kallax-nxn/kallax-nxn-basic-r7-@.html.html )

Note: touching items to toggle position on a tablet or phone is currently not working the way it should be. 
Clicking with mouse is OK.
Clicking menu items is OK.
Will fix in next release.

* Add shade and shadows
* Add noise texture creation 
* Add renderer modifiers
* Add background and more ground
* Add toggle placard visibility
* Add toggle rotate



_2016-01-23_

NxN

* General clean-up, re-structuring variable names to be easier to read
* Add autoRotate
* Re-structure the per frame data display
* Update camera positions and frame times
* Fix issue with displaying white texture
* Add link to Wall Bracket

Wall Bracket

* Add link to NxN
* Code clean-up
* Re-structure variable names

 
_2016-01-22_

[Kallax NxN Basic R5 - Demo - Full Screen ]( http://jaanga.github.io/demo/mm/kallax-nxn/kallax-nxn-basic-r5.html.html )

* Add hexKey
* Add Screw 1004321 104322
* Add placards to hardware
* Solve some tweening issues

_2016-01-21_

* More updates
* Looking very much like the scripts are technically complete
* The ongoing work will relate more to cinematography, rendering and parts creation

 
_2016-01-19_

[Kallax NxN Basic R4 - Demo - Full Screen ]( http://jaanga.github.io/demo/mm/kallax-nxn/kallax-nxn-basic-r4.html.html )

* Update with all new tweening looking good - just the play by play to finish up
* But an oops on the Wall bracket needs to be fixed


_2016-01-17_

[Kallax Wall Bracket Basic R12]( http://jaanga.github.io/demo/mm/kallax-wall-bracket/kallax-wall-bracket-basic-r12.html )

tweenjs-r1.js


* Now with even better tweening. See:
	* [Tween.js Easings R1]( http://jaanga.github.io/cookbook-threejs/functions/tweening/tweenjs-easings/tweenjs-easings-r1.html )
	* [Tween.js Film Clip R6]( http://jaanga.github.io/cookbook-threejs/functions/tweening/tweenjs-film-clips/tweenjs-film-clips-r6.html )


_2016-01-14_

[Kallax Wall Bracket Basic R11]( http://jaanga.github.io/demo/mm/kallax-wall-bracket/kallax-wall-bracket-basic-r11.html )

mm-tween-r1.js

* Plays clips with tweening

mm-object-r1.js

* Draws various parts and tools


_2016-01-02 & 2016-01-01 & 2015-12-29_

[Kallax Wall Bracket Basic R8]( http://jaanga.github.io/demo/mm/kallax-wall-bracket/kallax-wall-bracket-basic-r8.html )

* Phillips screwdriver tip starting to look OK (big learning curve here)
* Ditto Phillips screw head
* Both screw and screwdriver not finished, not even beginning to be finished
* More objects find their positions by algorithm ( rather than by eye )
* Fewer global variables
* Play step-by-step assembly has more detailed film clip
* Adds ability to draw 'pencil lines' - still at an early stage
* Adds new 'Draw Screw position' checkbox and 'film clip'

Coming soon? 

* Screwdriver and screw rotating into final position
* Rounde-headed screw and flat blade screwdriver 

_2015-12-24_

[Kallax Wall Bracket Basic R7]( http://jaanga.github.io/demo/mm/kallax-wall-bracket/kallax-wall-bracket-basic-r7.html )

* Add placards with part ID numbers
* Add beginning of pencil
* Add beginning of screwdriver

_2015-12-23_

[Kallax Wall Bracket Basic R6]( http://jaanga.github.io/demo/mm/kallax-wall-bracket/kallax-wall-bracket-basic-r6.html )

* Re-engineered. Components now follow same principles as components in Kallax NxN. Should make life easier

[Design Notes]( http://jaanga.github.io/demo/mm/index.html#design-notes.md )

* A start at identifying all the criteria that need satisfying in building an online assembly manual.

_2015-12-18_

[Kallax Wall Bracket Basic R5]( http://jaanga.github.io/demo/mm/kallax-wall-bracket/kallax-wall-bracket-basic-r5.html )

* Beginning to add animation/tweening

_2015-12-12_

[Kallax NxN Basic R2 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/kallax-nxn/kallax-nxn-basic-r2.html )

* Fixed non-appearance of holes issues
* Updated positions of pegs
* Code clean-up
* Improved scaling of textures
* Worked on sounds
* Coming soon: improved animation sequencing?


* [Kallax Wall Bracket Basic R4]( http://jaanga.github.io/demo/mm/kallax-wall-bracket/kallax-wall-bracket-basic-r4.html )

* Adds wood screws
	* Includes shiny new draw helix routine
* Coming soon: animation


_2015-12-12_

[Kallax Wall Bracket Basic R2]( http://jaanga.github.io/demo/mm/kallax-wall-bracket/kallax-wall-bracket-basic-r2.html )

* Adds screw mask part


_2015-12-10_

[Kallax NxN Basic R1 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/kallax-nxn/kallax-nxn-basic-r1.html )

* Creates any Kallax with from 1 to 6 rows and and 1 to 7 columns
* Creates the fixing holes be code
* Creates the screw and peg locations by code
* Creates the assembly positions and sequences by code
* Creates the camera movements by code
* Note: many small bugs remain to be fixed
 
_2015-12-09_

[Kallax 5x5 Basic R1 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/kallax-nxn/kallax-5x5-basic-r1.html )

* Most code in standalone JavaScript file that may be used with all Kallax models
	* Should soon be able to make any Kallax with 1 to n vertical and horizontal divisions 
* Basic notion of selecting color and texture added - still very primitive
* Basic notion of click sound added
	* Uses Web Audio


_2015-12-08_

[Kallax 4x1 Basic R1 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/kallax-4x1/kallax-4x1-basic-r1.html )

[Kallax 4x4 Basic R4 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/kallax-4x4/kallax-4x4-basic-r4.html )

_2015-12-06_

[Kallax 4x4 Basic R3 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/kallax-4x4/r3/kallax-4x4-basic-r3.html )

_2015-12-02_

[Kallax 4x4 Basic R2 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/kallax-4x4/kallax-4x4-basic-r2.html )

_2015-12-02_

[Kallax 4x4 Basic R1 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/kallax-4x4/kallax-4x4-basic-r1.html )


_2015-12-01_

[Kallax Wall Bracket Render R1]( http://jaanga.github.io/demo/mm/kallax-wall-bracket/kallax-wall-bracket-render-r1.html )

* Has reflections of the Swedish royal castle
* Slider bar to control the height

[Kallax Wall Bracket Basic R1]( http://jaanga.github.io/demo/mm/kallax-wall-bracket/kallax-wall-bracket-basic-r1.html )

* Small metal piece for fixing Kallax to wall

_2015-11-29_

### [Moving Materials Logo Play R1 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/mm-logo/mm-logo-play-r1.html )

* Play a step-by-step construction animation

### [Kallax 2x2 Play R1 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/kallax-2x2/kallax-2x2-play-r1.html )

* Play a step-by-step construction animation
* The order of the steps does not yet follow the Ikea assembly manner order

_There is a fun bug right now: Click play and rotate - then click on some of the parts. Lots of action starts to happen!_


_2015-11-28_

### [Kallax 2x2 Basic R1 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/kallax-2x2/kallax-2x2-basic-r1.html )

### [Kallax 2x2 Opacity R1 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/kallax-2x2/kallax-2x2-opacity-r1.html )

* Gain X-ray vision

### [Kallax 2x2 Text to Voice R1 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/kallax-2x2/kallax-2x2-text-to-voice-r1.html )

* Let me tell you a story

_2015-11-27_

### [Moving Materials Logo Basic R1 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/mm-logo/mm-logo-basic-r1.html )

### [Moving Materials Logo Render R1 - Demo - Full Screen]( http://jaanga.github.io/demo/mm/mm-logo/mm-logo-render-r1.html )

### Sample Web Page / Source Code

<iframe class=ifr src=http://jaanga.github.io/cookbook-html/templates/code-edit-view/code-edit-view-r2.html#http://jaanga.github.io/demo/mm/mm-logo/mm-logo-basic-r1.html width=100% height=600px ></iframe>  
###### _Moving Manuals Basic - Revision 1 - Code Edit View_ /  [Edit full screen]( http://jaanga.github.io/cookbook-html/templates/code-edit-view/code-edit-view-r2.html#http://jaanga.github.io/demo/mm/mm-logo/mm-logo-basic-r1.html )


## Concept

### Issues / Problems

<!--

The general format is an adaptation of the ideas developed in Alexander's _et al_ [A Pattern Language]( https://books.google.com/books?id=hwAHmktpk5IC&pg=PR10#v=onepage&q&f=false ) - as sammarized on page 10.

Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice.

patterns are descriptions of common problems and proposal for the solutions that can be used repeatedly every time the problem is encountered and producing an different outcome.

-->

* Assembly manuals are frequently PDF files with twenty pages or more. Do we really have to download and print them out?
* Assembly manuals need to display text in many languages.
* Assembly manuals must be accessible to people who have difficulty reading text.
* Even with all the drawings there are frequently still places you can't see
* The furniture is 3D but the manuals are only 2D


### Mission
<!-- a statement of a rationale, applicable now as well as in the future -->

* Build many very small scripts - each with different features
* Eventually decide which features to keep and which to discard
* Much easier than trying to build one big app all at once


### Vision
<!--  a descriptive picture of a desired future state -->

* To create manuals that are fun


## Things to Do / Road Map

### Coming up next

* Front page with text warnings and advice in images
* The screw driver
* The animated assembly sequence for a large object
	* Can you see everything even on a phone screen?

### Animation series

* Issue: Reset counter to start with each new replay
* Issue: prevent multiple replays from going on at the same time
* Make time between animation frames adjustable
* Animate multiple pegs/screws moving at once
 

### Kallax

* Send link to customer upon purchase
* Show items in the positions as they are in the box
* Set up so works on phone very nicely
* CCreate multiple rendering scenarios
	* Add real colors
	* Add toon shading
* Add accessories, coordinated products and links to buy
* Add typical things that go on bookcases
* Add room and people and zombies
* Add more realistic screws and pegs
* Show demo functioning in an iframe
* Add animation where components fly in one by one in order 
* Add color coding - next item to be installed is highlighted red
* Export as STL file for use in CAD program
* Add exploded view
* Add more fun and lively things 

## Features

* Zoom, pan and rotate
	* 1 finger / left button =  rotate
	* 2 finger / wheel = zoom in and out
	* 3 finger / right button = pan

## Issues

### Kallax

* Shown in upright position, but should in on ground while being built position
* Shown with screws on top, but they should be on side
* Show with screws partially screwed in. Need better ways of showing final position
* Still missing a number of screw holes
* Still missing wall brackets


## Sources

[Ikea Kallax 2x2 ]( http://www.ikea.com/us/en/catalog/products/60275812/ )

[Ikea Kallax 2x2 Assembly Manual]( http://www.ikea.com/us/en/assembly_instructions/kallax-shelving-unit__AA-1009450-6_pub.pdf )

<br>

## Notes
Trademarks property of their respective owners. 

Apart from sharing a deep delight with putting things together, Jaanga is not in anyway associated with any specific furniture vendor.


***

<center title="dingbat" >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a>
</center>
