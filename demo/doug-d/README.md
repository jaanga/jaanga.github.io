<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]( https://jaanga.github.io/demo/doug-d/ "View file as a web page." ) </span>


# Doug D || -..-.. Read Me


## Cylinder to figure with map

### The request

Doug wrote

> ... the challenge that i am working is to be able to map a cylinder to a figure in a smooth way so that i can draw lots of designs on the figure.  it would be easier if the figure were simple.  The arms and what not are challenges.

> I have experimented with a few approaches.  The most promising seems to be to map the xyz to cylinderical polar coordinates and then regress the radius onto the angle and the height using what’s called local regression.  the other approach is to solve for all the triangles that intersect the ray in question, but I have not gotten too far on that one.

> would like some help and ideas.


### The approach

Theo says: "I'm with Sol."

* https://en.wikipedia.org/wiki/Sol_LeWitt
	* https://en.wikipedia.org/wiki/Sol_LeWitt#Wall_drawings
	> According to the principle of his work, LeWitt's wall drawings are usually executed by people other than the artist himself. Even after his death, people are still making these drawings. He would therefore eventually use teams of assistants to create such works. Writing about making wall drawings, LeWitt himself observed in 1971 that "each person draws a line differently and each person understands words differently". Between 1968 and his death in 2007, LeWitt created more than 1,270 wall drawings. The wall drawings, executed on-site, generally exist for the duration of an exhibition; they are then destroyed, giving the work in its physical form an ephemeral quality. They can be installed, removed, and then reinstalled in another location, as many times as required for exhibition purposes. When transferred to another location, the number of walls can change only by ensuring that the proportions of the original diagram are retained.

My goal

* Interpret the instructions word for word to the best of my ability
* Execute the instructions in the order they are given
* Display every step of the instructions
* Ask for no further details



### The response

### [cylinder-to-figure-with-map-0-02.html]( https://jaanga.github.io/demo/doug-d/cylinder-to-figure-with-map-0-02.html )

* Feature: Add 'load venus'
* Refactor: LoadWalt to loadFigure
	* Deletes any existing figure or cylinder
	* Loads OBJ from any URL
* Big fix: Centers the geometry and scales the figure to fit in cylinder more accurately


### [cylinder-to-figure-with-map-0-01.html]( https://jaanga.github.io/demo/doug-d/cylinder-to-figure-with-map-0-01.html )

* Click the buttons in the numbered order
* Click title in menu in order to reload
* Best to reload after calling for a random texture

This first hack is a bare-bones response. I had not played with this type of vertex manipulation for a while. I thought the exercise would take three hours but it took me five.

Further iterations

* Could very much speed up the process
	* Perhaps allowing for real time updates controlled by a slider bar
* Allow for any bitmap to be loaded as the texture
* Allow for user controlled numbers of segments
* Close any holes
* Add shade and shadow
* And much more

There is an interesting bug. The rotation of the screen is for some reason affecting the update of the cylinder causing the new figure to be at a different rotation angle than the original figure.

#### Chang log

* Cleanup
* Unneeded code delected

### [cylinder-to-figure-with-map-0-00.html]( https://jaanga.github.io/demo/doug-d/cylinder-to-figure-with-map-0-00.html )

* First working version
* Has 'draw rays' function - dropped in later versions