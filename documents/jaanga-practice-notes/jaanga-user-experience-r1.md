## User Experience Overview

_This first draft is in response to a message from Abe. It was a message to me, but I am using it a spur for thought as to what we should be asking of students._


### Generally

* Display enables pan, rotate and zoom with pointing device
* Full-screen display with translucent menu
* Menus are iconizable and drag-able
* Menus have accordion feature
* Set background to random gradient or random color or selected color
* Permalinks for everything


### Colors, Textures and Shading

> Abe: >> I don't know if it's possible to get RGB or albedo maps for the surface but if not, it would seem more natural to represent the surface as a flat grey than to display the height map as the color.   For computer graphics people who are used to looking at height maps, it's not so weird but for the average person, I think the coloring might be a bit strange.  If you go with a grey surface coloring, then the background should probably be either a neutral gradient or be something spacey like a star field. 

* You have an array of tools including
	* Lambert and Phong materials
	* Textures
	* lights, shade and shadows 
	* Bump maps and shaders
* You have a bunch of needs
	* 'Realistic' or green cheese
	* Gravity, magnetism and other fields
	* Geology, current and historical
	* Human activities. current and historical

You want many simple cookbook examples that demonstrate the use and effectives of all of the above.

### Gamification / Exaggeration

> Abe: >> It would be nice to know what the height exaggeration factor is and perhaps control it to yield a more realistic representation.

* Height indicator / control
	* Every script that exaggerates height should have a slider bar or similar mechanism that enables you to play with and control the exaggeration.
	* It is important to remember that when viewing the Moon as a whole object - an object with a radius of 1728 km and 'bumps' of two or three km at most - that the exaggeration scale should be set to zero to be 'real'
		* Repeat: the most realistic representation of height when looking at representation of the Earth or moon that is a few centimeters across is zero.
		* Any differences are less than 0.01 mm.


### Camera Motion

> Abe: >> Is it possible to have the roving motion smoothly animate rather than jumping discretely?  The jumps are a little bit jarring and sometimes a bit hard to follow.

A recent release of the JavaScript library we use for 3D - Three.js - very much improved the number of vertices that can be manipulated on screen in real-time.
R71 could comfortably handle a mesh with 65,536 vertices - or a dimension of 256 x 256.
R72 pushed the number to over a million or 1024 x 1024 that render at 60 fps or close to that (depends very much on how good a GPU your computer has).
This good number of vertices makes for some very satisfying renderings that zoom pan and rotate quite delightfully.

There are are still issues. It would be nice to have many millions of pixels, and in a few years we will likely have this. 
But first we have to deal with what we have at hand. And an important consideration becomes the way we come the camera over the terrain.

As of this writing the NASA data is gathered from image files with 256 x 256 pixels. 
Every time the camera moves to a new location, Moon Rover loads a 4 x 4 grid or 16 images.
Any time the camera target moves outside that current grid a fresh row or column of 1 x 4 images has to be loaded and one of the existing columns for rows has to be discarded.
This load, in essence, dictates that the camera moves in 256 pixels jumps or one quarter of the mesh area 
The issue is that this is too is a jump for the eyes. The eye cannot track the movement of a particular crater or rill when the displacement is that great.

Forthcoming revisions will load a 4 x 5 grid of images and crop down to 4 x 4. in this way, the camera can even move a row or column of a single pixels per iteration.
The interesting thing then is that the movement ends up being so precise that is takes forever and a day to traverse a large swath of the Moon.

The ideal would that if you are going click, click, click that the movements would be quite small perhaps 4 to 8 pixels at time.
But if you are holding down the the movement might bump up to 32 or 64 pixels per iteration.

Good camera movement takes good coding, tools that have excellent user experience and excellent camera peeps. Let's make this happen!

<center title="dingbat" >
# ❦
</center>