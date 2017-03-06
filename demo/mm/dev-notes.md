[Jaanga]( http://jaanga.github.io ) » [Demo]( http://jaanga.github.io/demo/  ) »  [MM]( http://jaanga.github.io/demo/mm/readme-reader.html  ) »

dev notes
===


## 2016-02-27 ~ 



## 2016-02-22

* Add build_hole3. working a treat. very fast and easy to places. code very simple too. Object snap in JavaScript. Yay
* Add slow assembly. working a treat. movies by algorithm. lots of potential here


## 2016-02-20 ~ 

Terminology

buildXXX = create geometry

drawXXX = create mesh and add to scene

Name space

OB-objects-r1.js
UT-utilities-r1.js
TW-tween-r1.js
TO-tools-r1.js
HW-hardware-r1.js

2016-01-30

* Add all the colors
* Hammer
* Tidy Kallax NxN geometry
* Control tweening so objects do not pass through others
* Put objects in shelves at end of film clips
* Add moving point lights at end of clips
* Add architectural elements

2016-01-23

Ground plane should become shelf that moves with fixture - along with parts not being used

Renaming with underscores - so part numbers become more visible

part number - with case is embedded in function name.

draw_ = part
build_ = component of a part


Need to work on 

* placard width and placement and when to show
* mobilization
* step-by step for under 2x2
* dividers stack improperly
* hexKey twirls too much
* Add plastic cover to wall bracket
* Round headed wall screw
* flat head screw driver
* handle for hex key



2016-01-21

Most technical aspects seem to be undercontrol

The creation of objects, their various locations, and their frame by frame tweening 

Still need to add setting particular easings per frame

Showing hammering may be fun.

Also still unanswered: how to tween more than one set of children objects (pegs & screws ) that belong to a single parent


2016-01-20 

Movement is slow but sure. The code is getting, simple, shorter and more powerful - ie a delight

And still more shortening and objectification on the way




2016-01-04


Need to simplify the frame advancing technique in clips

currently checks the whole clip each item of each frame


should be more like

frame by frame, process all items, then go to next frame