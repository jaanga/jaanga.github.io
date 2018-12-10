# Technology


### Markdown

[Markdown]( https://en.wikipedia.org/wiki/Markdown ) is used extensively with the [Showdown converter]( https://github.com/showdownjs/showdown ).

See [Markdown Basics]( https://help.github.com/articles/markdown-basics/ )


### Fonts

The font used here is the the default 'monospace' font as determined by your browser. This is because it is the most common font used to write scripts.


### Browser Support

Many of the scripts in Jaanga are built using the Three.js library which in turn is based on WebGL.

WebGL runs only on relatively recent computers and browsers

See: <http://caniuse.com/#feat=webgl> for current browser support.

Given the dependence on WebGL, it makes little sense for Jaanga to support browsers that are not WebGL-enabled.

Furthermore, the intent of Jaanga is to entice youngsters and oldsters into the joys of programming.

Writing scripts that contain work-arounds to support old browsers is one of the anti-joys of programming.

Thus, we will write scripts for devices and OSs and browsers that support WebGL.

We will leave out the cruft required by old browsers. We will code in a style that is as fresh and as modern as possible.


### Content Delivery Networks (CDN)

In order to prevent scripts breaking due to changes in new revsions, Exploratorion links libraries that are used to CDN

CDNs used:

* [CDNJS]( https://cdnjs.com/ )
	* <https://cdnjs.com/libraries/three.js>
* [RawGit]( https://rawgit.com/ )
	* Example: <https://cdn.jsdelivr.net/gh/mrdoob/three.js@r70/examples/js/controls/OrbitControls.js>

As in:

```
<script src=https://cdn.jsdelivr.net/gh/mrdoob/three.js@r71/build/three.min.js ></script>  
<script src=https://cdn.jsdelivr.net/gh/mrdoob/three.js@r71/examples/js/controls/OrbitControls.js ></script>
<script src=https://cdn.jsdelivr.net/gh/mrdoob/three.js@r71/examples/js/libs/stats.min.js ></script>  
```

### PNG files are used to store the data

We tried using ASCII JSON text files to store elevation data. There were many issues.
The file sizes soon become huge and transmission speed suffer. 
If all the data did not come in, the app is hosed.
There are too many numbers to be able to 'see' things.

We looked into using binary files, but these seem to require a whole lot of expertise and effert. 
The use of binary files did not seem to make hiles smaller or transmit faster.

The use of PNG files as heightmaps solves many problems and provides many benefits/

* Data is highly compressed without loss
* Files are transmitted and cached speedily and effortlessly
* Creating mash-ups with data from multiple servers is easy and permissible
* You can actually look at the file and see something
* The scope and range of tools to process PNG files is huge


<center title="dingbat" >
# ❦
</center>
