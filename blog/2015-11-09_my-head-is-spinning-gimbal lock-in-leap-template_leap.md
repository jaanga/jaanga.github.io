My Head Is Spinning: Gimbal Lock in Leap Templates
===

We've been working hard on improving, simplifying and speeding up the template or boilerplate demos that we build for the Leap Motion device.

An earlier version of the template is available here and described here.

There are currently three version of the template.

* Original
* Fingers
* Pointables

The latter two are new. The Leap JavaScript library offers several methods for accessing Leap Data.
The fingers template uses Fingers and the pointables template uses Leap Pointables. 
A template using Leap Bones has not yet been built.

The two new scripts also use a different Three.js technique to display the data.
In the old script, 3D objects are created once and then moved, scaled and rotated each frame.
In the new scripts, fresh geometry is created each frame.
Neither technique is better than the other. Both are useful depending on your needs.

The interesting thing is that the original script with the static objects and the fingers script both display the same errant, undesired behavior.
As you point your figures to the ground, the boxes start spinning wildly.
This is a known phenomena called '[gimbal lock]( https://en.wikipedia.org/wiki/Gimbal_lock )'.

Even more interesting is that the Pointables template does not display the unwanted behavior.

What does this all mean?

Well it proves that we are still very much lacking in linear algebra skills. 
In other words our brains are still novices when it comes to vectors and matrices and the such.

The good new is that the Three.js library has the tools that will allow us to overcome the issue. 
It's only a matter of time before our heads stops spinning and we find a solution.



 


