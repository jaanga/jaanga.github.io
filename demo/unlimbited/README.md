<span style=display:none; >[You are now in GitHub source code view. Click here to view README file in GitHub Pages view]
( https://jaanga.github.io/demo/unlimbited/#README.md "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/demo/unlimbited/';
value='You are now in a GitHub Pages view. Click here to view README file in GitHub source code view.' >

[Jaanga]( https://jaanga.github.io ) &raquo; [Demo]( https://jaanga.github.io/demo ) &raquo;

[UnLimbited Read Me]( index.html#README.md )
================================================================================

_<small>
Welcome to your online second hand store. Our handypeeps are here to help you with your un-disarming experience.
</small>_


## Full Screen: [ Unlimbited Forearm R2]( https://jaanga.github.io/demo/unlimbited/unlimbited-forearm-r2.html )

## Full Screen: [ Unlimbited Forearm R1]( https://jaanga.github.io/demo/unlimbited/unlimbited-forearm-r1.html )


<img src="https://cloud.githubusercontent.com/assets/547626/20243288/7f72ac92-a906-11e6-8d35-bc862072c982.png" style=display:none; width=800 >


<iframe src=https://jaanga.github.io/demo/unlimbited/unlimbited-forearm-r2.html width=100% height=500px ></iframe>

_UnLimbited Forearm R1_

***


## Concept

* This work is in response to a request on the Three.js subreddit : https://www.reddit.com/r/threejs/comments/5bs5bt/need_threejs_guru/


### Mission

* Can we help Team UnLimbited to convert an OpenSCAD app into a Three.js app?
* Can we hand over models of 3D prosthetic devices that can be printed and fitted to peeps in need?


### Vision

* TBD

## Features

* TBD
* Click three bars( 'hamburger' ) icon to slide menu in or out
* Direct link to this read me file
* Click on title to reload


## Things you can do using this script

* Click the three bars( 'hamburger menu icon' ) to slide the menu in and out
* Press Control-U/Command-Option-U to view the source code
* Press Control-Shift-J/Command-Option-J to see if the JavaScript console reports any errors


<!--
## Things you can do by editing the code

<iframe src='https://jaanga.github.io/cookbook-html/examples/libraries/ace-editor/ace-view-r1.html#
	http://jaanga.github.io/demo/unlimbited/index.html' width=100% height=600 ></iframe>

<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/demo/index.html';
value='Source code listing' >


* Open this file: https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-html/demo/unlimbited/index.html
* Click the 'Raw' icon and save the raw file to your computer
* Once you've downloaded the file, you can click it to run it.
* Open the file with a text editor
-->

## Issues



## To Do / Wish List / Goals



## Links of Interest

* http://www.teamunlimbited.org/
* https://www.facebook.com/teamunlimbited
* http://www.thingiverse.com/thing:1672381

### Images
* http://thingiverse-production-new.s3.amazonaws.com/renders/9b/ab/f6/cb/a6/b3ce652977a37e82d953b65460e3e9b5_preview_featured.jpeg
* http://thingiverse-production-new.s3.amazonaws.com/renders/e0/d8/7d/84/79/b926afa23d0ac220a7ef81f756a7f641_preview_featured.jpg

## Change Log

### 2016-11-13 ~ R2

The effort progressed nicely, but there's still a lot more to be done.

* Variables names updated to more closely match Team UnLimbited terminology
* Geometry calculations simplified
* Spacers added
* Angled slots run at correct angles
* Inside fillet added
* Tendon path added
* Sliders bars for length and bicep added
* STL export added
* Part renamed from sleeve to forearm

### 2016-11-12 ~ R1

The model we are looking at is printed flat then bend around into shape. This format lends itself to constructive solid geometry (CSG ).

In Three.js there are multiple ways of carrying out CSG.

Today we considered two ways:

* Chandler Prall's ThreeCSG
* zz85/Joshua Koo's shape geometry in Three.js

For the ThreeCSG example we created today see: [csg-basic-r1]( http://jaanga.github.io/cookbook-threejs/examples/geometry/constructive-solid-geometry/csg-basic-r1.html )

The ThreeCSG method follows closely the methods that Team UnLimbited currently use with OpenSCAD. We plan on building some UnLimbited demoes using ThreeCSG

Today, however, we started with the Boolean operations available on the Three.js [shape]( https://threejs.org/docs/#Reference/Extras.Core/Shape ).
 This creates an arbitrary polygon with holes in it. A shape may be extruded into a 3D mesh.

The script created today is very preliminary.

* A first pass at creating the forearm model
* All geometry is parametric but not yet controlled by the UI
* Dimensions are by guesswork
* First commit
* Add Read Me


***

<center title='Jaanga ~ your 3D happy place' >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a>
</center>
