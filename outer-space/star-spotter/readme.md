[Jaanga]( http://jaanga.github.io/ ) &raquo; [Outer Space]( http://jaanga.github.io/outer-space ) &raquo; 

Star Spotter
===

<span style=display:none; >[You are now in GitHub source code view - click this link to view Read Me file as a web page]( http://jaanga.github.io/outer-space/star-spotter/ "View file as a web page." ) </span>
<input type=button onclick=window.location.href='http://jaanga.github.io/outer-space/star-spotter; value='You are now in GitHub web page view - Click this button to view Read Me file as source code' >

<iframe src=http://exploratoria.github.io/lib/code-edit-view/code-edit-view.html#http://jaanga.github.io/outer-space/star-spotter/star-spotter-r1.html width=100% height=500px></iframe>

[Star Spotter - Full Screen]( http://jaanga.github.io/outer-space/star-spotter/dev/ )

## Concept

People have been charting heavenly bodies and their attributes since the beginning of humankind. These efforts have been fraught with difficulty, covered small numbers of bodies and require much learning. This exhibit shows that creating a real-time 3D [orrery]( http://en.wikipedia.org/wiki/Orrery ) - using modern technology - is pretty simple with a small amount of easy-to-read code.  

### Mission

To show that creating a real-time 3D [orrery]( http://en.wikipedia.org/wiki/Orrery ) - using modern technology - is easy-peasy.


### Vision

To create interactive views of the universe with a small amount of easy to read code in the hopes that people with real knowledge of astronomy will feel like pitching in.  



## Things to Try

* Click on a star to see all of the data available for it
* Zoom into the center of the visualization to find our sun
* What is the most common type of stars near us?
 
## Road Map

* Link each object to online databases such as: <http://heasarc.gsfc.nasa.gov/W3Browse/star-catalog/sao.html?
* Currently the 'Time travel' slider updates star positions in a mostly arbitrary manner. Future revisions:
	* Tie movements to specific time periods and, for example, display the date of the current positions
	* Also be able to show apparent movement around Sol for any specific date
* Currently, color is tied to an arbitrary element Luminosity. Future revisions:
	* Tie color, size, alpha and other visual attributes to arbitrary star attributes as selected by the user
	* Needs default value if no data for a star or star data is a huge outlier
	* Needs to know the bell curve of typical values
* Permalink capability to provide ability to zoom to any star
	* target and camera x, y, z
	* sprite type
* Link to and from scrollable/searchable ASCII table with the same data items
* Add Level of Detail and logarithmic zooming capabilities
	* Zoom out to many more distant objects
	* Zoom into many more objects within our solar system 
* Add DSO csv file objects
* Add solar system objects

### About the Code

The colors of stars are set according their luminosity because the physical color of a star is determined by its temperature. The values for colors are taken from the <a href='https://en.wikipedia.org/wiki/Stellar_classification#Harvard_spectral_classification'>Harvard spectral classification</a>.


Star data courtesy of:

* <http://www.astronexus.com/hyg>
* <https://github.com/astronexus/HYG-Database>

Thank you David Nash!