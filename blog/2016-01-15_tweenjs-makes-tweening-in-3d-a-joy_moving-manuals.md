Tween.js Turns Tweening and Animating in 3D into a Joy
===

<iframe src=http://jaanga.github.io/cookbook-threejs/functions/tweening/tweenjs-easings/tweenjs-easings-r1.html height=600 width=800 ></iframe>
_view the various Tween.js easings in 3D_

In our [OpenDesk]( http://opendesk.github.io/design-playground/ ), [WikiHouse]( http://wikihouse.github.io/viewer-experiments/ ) and new [Moving Manuals]( http://jaanga.github.io/demo/mm/ ) projects, 
we are very concerned about showing you how to assemble a group of components into a finished product.
The idea is to show the components as they are cut out of a sheet or taken out of the box and watch them move into their final position.
The typical graphics library enables you to move and rotate objects in real-time from one location to another.
But in creating as assembly animation, we want to slow the process down. 
We want to see the components flow gently from the floor to assembly one by one.

This is called '[tweening\( https://en.wikipedia.org/wiki/Inbetweening)'.
The script we are using for tweening is [Tween.js]( https://github.com/tweenjs/tween.js ). 
Three.js examples that use Tween.js have been part of Three.js for several years.
Tween.js has too many features to describe here. But one of great concern is which 'easing' to use and when.
An easing is the varius changes in velocity as and when an objects starts and finishes its movwnt

This graph shows the easings in 2D but our experience the feeling is quite different in 3D.

<iframe src=http://tweenjs.github.io/tween.js/examples/03_graphs.html height=600 width=800 ></iframe>
_graph of the various Tween.js easings_


This morning we started to build a tweening 'gymneasium' to help compare and contrast the various easings.
It's very R1 - because there are so many easy Tween.js options but it's a start and there will be more releases with more features.

Update - 2016-01-16: R1.1 is up and adds: 

* camera tweening
* placards to identify which easing a box is using
* a general code cleanup.

### Links

[Tween Easings R1]( http://jaanga.github.io/cookbook-threejs/functions/tweening/tweenjs-easings/tweenjs-easings-r1.html )

[Tween.js]( https://github.com/tweenjs/tween.js )



