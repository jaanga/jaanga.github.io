dev notes read me
===


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