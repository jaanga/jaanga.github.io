Three.js Object to Object Raycasting Read Me
===

### The Issue

Given an asymmetrical 3D asset, randomly embedded within a group of objects, 
is it possible to determine if two test objects are both simultaneously in close proximity 
such that a ray drawn between the geometric centers of the two objects would lay entirely inside the selected asset.
The directional rays of the two test object should be pointing toward each other.
   
## Notes

In any demo/test case like this, there should be a good level of abstraction between what is being tested and the actual device you may have at hand.
We have no way of knowing whether you are using your fingers, using voice recognition or even blinking your eyes to control our app.

Further releases of this study may well be Leap-enabled, 
but the over-arching guideline is to be able to recognize and display pinching and grasping 'in-world' and not merely replicate your current desktop.



## Demos

[Object to Object Raycasting R6]( http://abantech.github.io/interaction-studies/threejs-object-to-object-raycasting/r6/threejs-object-to-object-raycasting.html )

* Adds Leap-enabled
	* Which causes issues with the sliders
	* A work-in-progress
	* An experiment

[Object to Object Raycasting R5]( http://abantech.github.io/interaction-studies/threejs-object-to-object-raycasting/r5/threejs-object-to-object-raycasting.html )

* Adds (imperfect) highlighting of intersected objects
* Adds text output of selected intersection parameters


[Object to Object Raycasting R4]( http://abantech.github.io/interaction-studies/threejs-object-to-object-raycasting/r2/threejs-object-to-object-raycasting.html )

* Adds multiple objects
* The two test objects may be independently moved in X, Y and Z directions



[Object to Object Raycasting R3]( http://abantech.github.io/interaction-studies/threejs-object-to-object-raycasting/r2/threejs-object-to-object-raycasting.html )

* 2015-03-19 ~ A work in progress
* The asymmetrical 3D asset is now created using the convex geometry script
	* When random object slider id dragged, object wiggles and rotates 
* The two test objects are now rotatable
* As the test objects are rotated a line is drawn and updated between the test objects

Note: This release has not updated the ray caster routine in any way. Thus no 'touches' are currently being identified. The next release will have an update on ray casting.

[Object to Object Raycasting R2]( http://abantech.github.io/interaction-studies/threejs-object-to-object-raycasting/r2/threejs-object-to-object-raycasting.html )

* Bi-directional

Notes

* Make certain the directional vector is pointing the correct way. Set the directional vector start point is the object being pointed at ( the remote object) and then subtract the position of the object doing the pointing.
* There's usually no need to set near and far unless there is a very large number of objects.

[Object to Object Raycasting R1]( http://abantech.github.io/interaction-studies/threejs-object-to-object-raycasting/r1/threejs-object-to-object-raycasting.html )

* Single direction
