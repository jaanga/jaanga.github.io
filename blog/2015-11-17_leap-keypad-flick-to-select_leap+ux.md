Leap Keypad: Flick to Select
===

In another forum @zachinster and I have been having an interesting Leap discussion.
We have been talking about building Leap apps that resemble playing the guitar.

This discussion arose because of Zach's excellent [3D Jam]( https://developer.leapmotion.com/3djam) submission titled [VR Guitar]( http://itch.io/jam/leapmotion3djam/rate/39736 ).
See also: https://twitter.com/zachkinstner

One part of the discussion has focused on selecting and playing chords on a guitar.
Though I am not a guitar player, the topic is interesting.

Below is a typical chord diagram. It shows which of your five fingers - in columns - show cover which of the six strings. 
The 'o' indicates that you should cover a second string with the one finger.

Db
```
e -x-|---|---|---|---|
B ---|-x-|---|---|---|
G -x-|---|---|---|---|
D ---|---|-x-|---|---|
A ---|---|---|-x-|---|
E ---|---|---|-o-|---|
```

So there are thirty 'things' to touch with your fingers.
The question is: how do you do the same thing with a Leap device?

Other ways of posing the question:

Given five columns of radio buttons with six buttons in each column, can you use the Leap device to press the correct buttons in all five columns all at once.

Given thirty keys to push, can you press them in the correct pattern in a Leap simulation.

I have started investigating this idea - using the Three.js JavaScript library. Here is a screen capture of what I have so far:

![flick to select 3]( http://jaanga.github.io/gestification-r2/flick-to-select-leap-threejs/images/flick-to-select-03.jpg )

One item of interest in the demo is it goes against the typical way in Three.js - and many other apps - 
use to interact with objects  which is with a ray caster. 
This works well, but it often means that you have to get the angle of the ray just right.
My guess is that guitar players form innumerable angles when they compose their fingers into a chord. 
Arriving a a typical solution is doable, but will eventually involve gathering huge amounts of statistics in order to discern what the typical patterns mean.
This will follow the ways Google have created to translate languages - by keeping stats on two and three word combinations of a huge body of data. 

Using ray casters is not wrong, I just think it might be interesting to explore other means. 
One method is to see if one object is inside another object. 
In a previous release I tried the Three.js isInterestionBox feature, but this was a fail when the button faces are non-orthogonal with the world coordinate system 
In the latest release, the buttons are spheres and sphere.intersects( sphere ) appears to be working fairly well.

If you play with the demo, you should be able tp make the buttons light up like a Christmas tree.

As you move your hand up and down the keyboard gets further and closer to your hand.
Nonetheless it is still virtually impossible to hit all thirty keys.
So there's a a ton more things to be done.

But the eventual goal is this: 

* You should be able to keep your elbow on the table or resting against your body and still be able to touch all the keys.
In other words, using this script will not tire your arms in a few minutes.
* You can do much playing without looking at the screen. Just knowing where to play your fingers in relation to each other is good enough.
* Your skills playing cords on a guitar are transferable to the Leap and vice versa. The user experience looks and feels the same.

Having said that, there's nothing stopping this effort - as Zach is already doing - at creating new and interesting multiple button pushing experiences.
For example, playing chords on a guitar is - in essence - based on a 2D X and Y selection system.
This begs the questions: What does a 3D guitar look like?

Demo: [Flick to Select Leap Three.js R5 - Demo - Full Screen]( http://jaanga.github.io/gestification-r2/flick-to-select-leap-threejs/r5-spheres/flick-to-select-leap-threejs-r5.html)

Source cose: [ Flick to Select Read Me]( http://jaanga.github.io/gestification-r2/flick-to-select-leap-threejs/ )






  
