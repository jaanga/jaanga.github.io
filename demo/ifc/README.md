<span style=display:none; >[You are now in GitHub source code view. Click here to view README file in GitHub Pages view]
( https://jaanga.github.io/demo/ifc/#README.md "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/demo/ifc/';
value='You are now in a GitHub Pages view. Click here to view README file in GitHub source code view.' >

[Jaanga]( https://jaanga.github.io ) &raquo; [Demo]( https://jaanga.github.io/demo ) &raquo;

[IFC View Read Me]( index.html#README.md )
================================================================================

_<small>
View [industry foundation classes]( https://en.wikipedia.org/wiki/Industry_Foundation_Classes ) (IFC) files
</small>_

## Full Screen: [IFC View R1]( https://jaanga.github.io/demo/ifc/ifc-view-r1.html )


<img src="https://cloud.githubusercontent.com/assets/547626/20081479/c0a2ef34-a504-11e6-93d8-e58b4e0d61ed.png" style=display:none; width=800 >


<iframe src=https://jaanga.github.io/demo/ifc/ifc-view-r1.html width=100% height=500px ></iframe>

_IFC View R1_

***


## Concept

* IFC is an emerging AEC standard
* [industry foundation classes]( https://en.wikipedia.org/wiki/Industry_Foundation_Classes ) ((IFC) is an open and neutral data format for [building information modeling]( https://en.wikipedia.org/wiki/Building_information_modeling ) (BIM).
* There is an existing mix of proprietary, closed source apps and open source apps, but most require a download and install
* The choice of FOSS web-based apps is very limited
* Mobile 3D viewing apps for IFC seem almost non-existent

_all of the above needs confirming_

### Mission

* Build lightweight IFC apps that work in your browser
* Provide interactive 3D views
* Entry level code accessible/hackable by engineers and architects
    * Build custom apps for day-to-day needs quickly and easily
* Read IFC data and directly generate 3D - no translations or intermediate formats


### Vision

* Basic IFC property editing capability
* Just-in-time viewing based on streaming or gradual loading of different layers - instead of loading everything at once.
* Ability to Redline IFC models
* 3D project management

## Features

* Choose from three examples
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
	http://jaanga.github.io/demo/ifc/index.html' width=100% height=600 ></iframe>

<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/demo/index.html';
value='Source code listing' >


* Open this file: https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-html/demo/ifc/index.html
* Click the 'Raw' icon and save the raw file to your computer
* Once you've downloaded the file, you can click it to run it.
* Open the file with a text editor
-->

## Issues

* 2016-11-07 ~ Need help in finding a glossary of IFC terms for dummies that loads reasonably quickly


## To Do / Wish List / Goals

* 2016-11-07 ~ Read rile from your hard disk
* 2016-11-07 ~ Read file from URL



## Links of Interest

* https://en.wikipedia.org/wiki/Industry_Foundation_Classes
* http://buildingsmart.org/

### Examples
* http://www.buildingsmart-tech.org/implementation/ifc4-implementation/helpful-examples
* http://web.stanford.edu/group/narratives/classes/08-09/CEE215/ReferenceLibrary/Industry%20Foundation%20Classes%20(IFC)/Sample%20IFC%20Files/
* https://github.com/BuildingSMART/IfcScript/tree/master/Examples
* https://github.com/opensourceBIM/IFC-files
* https://github.com/BuildingSMART/IfcScript/tree/master/Examples
* https://github.com/mvaerle/python-ifc/tree/master/testdata

## Change Log

2016-11-09 ~ R2

The files from https://github.com/opensourceBIM/IFC-files look like they will be a very handy resources.



* Add opensourceBIM/IFC-files example: Wall.ifc
    * Display wall as a 3D mesh
* Add Stanford.edu example: BIMhouse_ARK_info4
    * Some of the geometry displays

### 2016-11-07 ~ R1

* Opens, reads, parses and displays IFC files
* Three examples
    * Hello Wall
        * [Building Smart - Examples]( http://www.buildingsmart-tech.org/implementation/ifc4-implementation/helpful-examples )
    * Hello House
        * Still at very early stage of interpretation - date held in library blocks needs extrusion, position and rotation
        * [Building Smart - Examples]( http://www.buildingsmart-tech.org/implementation/ifc4-implementation/helpful-examples )
    * rst_advanced_sample_project.ifc
        * 15K entities - takes a while to load
* Reads and displays in 3D polylines, polyloops and coordinates
* Reads and displays on menu some unformatted project meta-data
* First commit
* Add Read Me


***

<center title='Jaanga ~ your 3D happy place' >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a>
</center>
