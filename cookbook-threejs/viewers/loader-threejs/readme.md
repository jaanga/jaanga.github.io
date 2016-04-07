Loader Three.JS Read Me
===

## Full screen: [Loader Three.JS ]( http://jaanga.github.io/cookbook-threejs/viewers/loader-threejs/ )

_A 3D Model file viewer_

***
## Mission

* To help the code in Loader.js from the Three.js Editor be available for a broad range of uses while remaining at a beginner level of coding complexity
  
## Features

* Loads 3D models and displays them in your browser
* Load files by drag and drop or by file open dialog box
* Scale, rotate and position each model
* Currently all models have their material changed to gray << fixed in R2
* Support all the file formats supported by the [Three.js Editor]( http://threejs.org/editor/ )
* Supported file formats include the following:
	* amf
	* awd
	* babylon
	* babylonmeshdata
	* ctm
	* dae
	* fbx
	* js
	* json
	* 3geo
	* 3mat
	* 3obj
	* 3scn
	* kmz
	* md2
	* obj
	* playcanvas
	* ply
	* stl
	* vtk
	* wrl

## Issues

* Not all formats have 100% success. Hello .dae and .kmz files, we are looking at you
* Current release attempts to rescale objects in a 'zoom-all' fashion - has many issues

2016-04-06 ~
It currently looks like - because of cross-origin security issues - that there is no way of loading bitmaps as textures and mapping these to materials.
Then there is the issues of loading a file with a particular set of parameters for model scale, camera position and so on.
The use of location.hash does not work here because files are being loaded by drag-and-drop or by the file dialog box.
It seems that the only reasonable method is to save a fresh copy of the file with the adjusted parameters.
But that means creating a scene with cameras and lights.

We have added a save button to enable this process - and we have carried out a successful save of a mode and its parameters.

On the whole it appears that the whole file open dialog and drag and drop a file does not add a lot of value.

Separately we have also worked on and built scripts the Three.js Object Loader and JSON Loader.
These efforts corroborate the effort here. Namely that cross origin issues prevent Three.js from loading bitmap textures locally.

On the other side of the coin, what works just fine is hosting files in the cloud. Files and textures load without issue.
Loading files via location hash is easy and the location,hash may also contain any number of parameters.

The issue here is that it may take much effort to ask ask users to host files on Dropbox and GitHub or places where the files can have a URL 

What we need before too long is users. Once people are using these scripts we can begin to get a grasp on the typical workflow and program for its success.
 


## Road Map

* Add materials
* Add changing colors
* Add location.hash support
* Improve auto object scaling feature
* Save data to new JSON file.
* Add gltf file format
 
## Credits and Background

Loader Three.js is based on the Loader.js file from the [Three.js Editor]( http://threejs.org/editor/ ).
The challenge is to make as few edits as possible - so that any improvements to Loader.js may be quickly and easily adapted to this effort.


## Change Log

### 2016-04-06

* R2
* A major upgrade or a major shift in strategy. 
	* R1 was built by forking and hacking Loader.js for the Three.js Editor 
	* R2 fetches the original Loader.js from the Editor at run time and uses that
		* Why stand on the shoulders of giants when you can use shoulders of giants?
* Added save file capability
* Added Zoom All - experimental
* Added toggle wireframe
* Added reset material to Phong

### 2016-04-05

* R1

