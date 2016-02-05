Three.js Examples Viewers: Use 3D To Show 3D Not 2D
===


<div style="height: 750px; transform: scale( 0.90); transform-origin: 0 0;"><iframe src=http://jaanga.github.io/documents/threejs-viewers/threejs-viewer-gallery/ width=900 height=800 style="border: 1px green solid; "" ></iframe></div>
_[Three.js Examples Viewer Gallery R1]( http://jaanga.github.io/documents/threejs-viewers/threejs-viewer-gallery/ )_


Many of of you are working really hard to bring a 3D experience into the web as an everyday happening. 
In doing so you want to create a gallery of 3D sites with links to the full site. 
There are a number of ways creating an easy to view catalog of animated 3D web pages.
The usual fashion is to create static 2D screen capture thumbnail images of the 3D code in operation.

But is using 2D to represent 3D not an admission of some sort of failure?
Doesn't using 2D to represent 3D beg the question: If 3D is so good, why aren't you using 3D?

And yet many of you continue to display 2D thumbnails in your portfolios of your 3D work.
Have you tried or even considered using 3D thumbnails?
The thesis of this post is that in today's world you can use 3D most anywhere you used 2D.

The web page shown at the top of this posts shows it is possible and workable to use 3D to show 3D. 
Embedded in this blog post, you have access to all 270 [Three.js examples]( http://mrdoob.github.io/three.js/examples/ ) files.
Admittedly the performance is barely acceptable. 
On the other hand as 14nm and 10 nm processors become ubiquitous the speed issues for files of this complexity will become trivial.

Scroll down this page to see examples - in iframes - of the practice of hiding 3D by using 2D thumbnails.
You will see examples from the X3D, Babylon.js and Three.js web sites.

You and I know that there are some extraordinary, dynamic, animated, delightful 3D web pages behind many of these 'flatland' images.

But to the average human who looks at these web pages, this power might as well be hidden under a rock.

So the message of this post is: use 3D wherever you can


## Benefits

* You get [WYSIWYG]( https://en.wikipedia.org/wiki/WYSIWYG )
* You don't have to create two things - the file and the icon or thumbnail - just one will do
* Your pages have the excitement of 3D


## Implementation Notes

We are scaling down the size of the web page iframes using the transform property.
The idea comes from: [Simulating Website Thumbnails using Iframes]( https://medium.com/@jamesfuthey/simulating-the-creation-of-website-thumbnail-screenshots-using-iframes-7145269891db )
In his post, James Futhey further adds a container so that the iframe behaves as an IMG file and several other features.

We are not following these additional practices, because they would serve the purpose of turning a 3D experience back into a 2D experience.
They are nonetheless interesting ideas that will be useful in many circumstances.

There is an issue with 3D as we have it that as the cursor lands over an iframe 
and the iframe behavior takes control then this may stop or interrupt the process of scrolling the page


### 3D Sites in 2D Galleries = ;-(

<div style="height: 600px; transform: scale( 0.60); transform-origin: 0 0;"><iframe src=http://www.web3d.org/example/ width=1000 height=1000 ></iframe></div>
_From [X3D]( http://www.web3d.org )_

<div style="height: 600px; transform: scale( 0.60); transform-origin: 0 0;"><iframe src=http://www.babylonjs.com/ width=1100 height=1000 ></iframe></div>
_From [Babylon.js]( http://www.babylonjs.com/ )_

<div style="height: 600px; transform: scale( 0.60); transform-origin: 0 0;"><iframe src=http://threejs.org/ width=1100 height=1000 ></iframe></div>
_From [Three.js]( http://threejs.org/ )_



## Links

[Three.js Viewers]( http://jaanga.github.io/documents/threejs-viewers/index.html )

[Three.js Viewers Featured]( http://jaanga.github.io/documents/threejs-viewers-featured/index.html )

[Three.js Viewers Read Me]( http://jaanga.github.io/documents/threejs-viewer/readme-reader.html )

<br>
<br>



 
