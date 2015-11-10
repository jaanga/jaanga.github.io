<span style=display:none; >[You are now in a GitHub source code view - click this link to view this read me file as a web page]( http://jaanga.github.io/gestification-r2/flick-to-select-leap-threejs/ "View file as a web page." ) </span>
<input onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/gestification-r2/flick-to-select-leap-threejs/'; type=button  value='You are now in a GitHub web page view - Click this button to view this read me file as source code' />

[Jaanga]( http://jaanga.github.io ) » [Gestification R2]( http://jaanga.github.io/gestification-r2/  ) »

[Flick to Select Leap Three.js Read Me]( index.html )
===

[Flick to Select Leap Three.js - Demo - Dev Revision - Full Screen]( http://jaanga.github.io/gestification-r2/flick-to-select-leap-threejs/dev/ )

## Web Page / Source Code

<iframe class=ifr src=http://jaanga.github.io/cookbook-html/templates/code-edit-view/code-edit-view-r2.html#http://jaanga.github.io/gestification-r2/flick-to-select-leap-threejs/r1/flick-to-select-leap-threejs-r1.html width=100% height=600px ></iframe>  
###### _Flick to Select Leap Three.js - Dev revision - Code Edit View_ / [Edit full screen]( http://jaanga.github.io/cookbook-html/templates/code-edit-view/code-edit-view-r2.html#http://jaanga.github.io/gestification-r2/flick-to-select-leap-threejs/r1/flick-to-select-leap-threejs-r1.html   )


## Concept

### Issues / Problems
<!--

The general format is an adaptation of the ideas developed in Alexander's _et al_ [A Patttern Language]( https://books.google.com/books?id=hwAHmktpk5IC&pg=PR10#v=onepage&q&f=false ) - as sammarized on page 10.

Each pattern describes a problem which occurs over and over again in our environment, and then describes the core of the solution to that problem, in such a way that you can use this solution a million times over, without ever doing it the same way twice.

patterns are descriptions of common problems and proposal for the solutions that can be used repeatedly every time the problem is encountered and producing an different outcome.

-->

When virtual hands, you may want to change or selections options fairly continuously without constantly having to look at where your hand is


### Mission
<!-- a statement of a rationale, applicable now as well as in the future -->

* Instead of having to move the hand to particular locations, you bring the selection objects to wherever the hand is
* The action of selecting an object relies on your brain's excellent positional memory capabilities and not making the correct gesture or pose


### Vision
<!--  a descriptive picture of a desired future state -->

* Facilitate the fingers/old brain communication capabilities
* Enable your fingers to talk

## Things to Do / Road Map

* Capture the notion of two or more fingers selecting colors at the same time
* Capture the notion of the hand moving forward and backward and thus exposing different choices
* Adds sounds when an option is changed
* Prevent background colors from being too dark 

## The Scripts

[Flick to Select Leap Three.js R3 - Demo - Full Screen]( http://jaanga.github.io/gestification-r2/flick-to-select-leap-threejs/r2/flick-to-select-leap-threejs-r3.html )

* Move non-essential assets to assets.js
* Long strings to ES 6 style
* Code clean-up

[Flick to Select Leap Three.js R2 - Demo - Full Screen]( http://jaanga.github.io/gestification-r2/flick-to-select-leap-threejs/r2/flick-to-select-leap-threejs-r2.html )

* Options move as one entity
* Slider to adjust distance between options and palm
* Improved finger tacking
   
[Flick to Select Leap Three.js R1 - Demo - Full Screen]( http://jaanga.github.io/gestification-r2/flick-to-select-leap-threejs/r1/flick-to-select-leap-threejs-r1.html )

* First commit

## Features

* Selection options are close to the fingers regardless of the position of the hand
* Each finger has only a single option thus mistakes not made easily
* Slider to adjust distance between options and palm
* Colors update with each reload
* Position data displayed in real-time
 

## Issues

* Hand must be held relatively flat to work well
	* Tilting hand causes options to be selected by accident
	* Much better if color boxes rotated as one and not individually << fixed in R2
* Needs algorithmic ways of positioning selection options based on actual length of your fingers 
* Finger tips have gimbal lock issues

## Sources
This effort arrises from questions on a Leap forum

* [3D Jam: Virtual Guitar]( https://community.leapmotion.com/t/3d-jam-virtual-guitar/3193 )

* [VR Guitar]( http://zachkinstner.itch.io/vr-guitar )


## Contact

* jaanga@googlegroups.com

## Copyright and License

* [Copyright and License]( http://jaanga.github.io/#http://jaanga.github.io/jaanga-copyright-and-mit-license.md ) 

***

<center title="dingbat" >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; >❦</a>
</center>

