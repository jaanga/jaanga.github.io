<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( http://jaanga.github.io/demo/pm/index.html "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/demo/pm/'; 
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' >

[Jaanga]( http://jaanga.github.io ) » [Demo]( http://jaanga.github.io/demo/pm/  ) »

[PM Read Me]( ./index.html )
===

## _2016-02-03_

[Sage Docs Browser R1]( http://jaanga.github.io/demo/pm/sage-docs-browser/sage-docs-browser-r1.html )


## _2016-01-12_

[Sage Snooper R1]( http://jaanga.github.io/demo/pm/get-sage-names/sage-snooper-r1.html )

* Uses GitHub API to read names of all files in https://github.com/sagemath/sage/tree/master/src/sage and recursively through the sub-folders
* Displays the list of all folder and file names found in left menu column
* Opens. reads and display the contents of currently selected file
	* Reads fies from both master and develop branch
* Displays files using textarea
	* Preserves new line and spacing
	* But not a terribly good solution. Should invoke Ace editor or equivalent
	* Would benefit from simultaneous scroll


## _2016-01-11_

[Get Sage Names R1]( http://jaanga.github.io/demo/pm/get-sage-names/get-sage-names-r1.html )

* Uses GitHub API to read names of all files in https://github.com/sagemath/sage/tree/master/src/sage and recursively through the sub-folders
* Displays the list of all folder and file names found in left menu column
* Opens and reads the contents of every file
* Carries out a simple line-by line search on the contents
* Records and lists the search results in the right-side contents pane
	* The name of each file is listed 
	* The name is also a link to the original file
	* Search results are listed under

### Issues
	* Takes over five minutes to complete
	* Needs save output to file button
	* Tries to read folders, opens empty files, etc, etc

## _2016-01-10_

[Get Sage Function Names R2]( http://jaanga.github.io/demo/pm/get-sage-function-names/get-sage-function-names-r2.html )

* Reads both 'master' and 'develop' branches and displays results from both side-by-side
* links to both source files in there respective branches
* Adds output with the size in bytes of each file
* Adds listing of all the def's in a file except for 'def __init__(self)'
* Code clean-up
	* Uses JSON.parse instead of eval
	* Display format improvements 
	* Could be used to compare files from any two branches

## _2016-01-09_

[Get Sage Function Names R1]( http://jaanga.github.io/demo/pm/get-sage-function-names/get-sage-function-names-r1.html )

* See <https://github.com/sagemath/sage/tree/master/src/sage/functions>
* Displays results with link to source file
* Gets data from master branch, but could get from develop branch


## _2015-12-30_

[Multiple Views R1]( http://jaanga.github.io/demo/pm/multiple-views/multiple-views-r1.html )

## _2015-12-13_

[Vista Lights URL Hash Reader R2]( http://jaanga.github.io/demo/pm/url-hash-reader-r2.html )

[Vista Lights Random Image Resize R2]( http://jaanga.github.io/demo/pm/vista-lights-random-image-resize-r2.html )

## _2015-12-12_

[Vista Lights Receiver R1]( http://jaanga.github.io/demo/pm/vista-lights-receiver-r1.html )

[Vista Lights Image Resize R1]( http://jaanga.github.io/demo/pm/vista-lights-image-resize-r1.html )

[PM Lights R1]( http://jaanga.github.io/demo/pm/pm-lights-r1.html )