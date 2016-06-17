


<span style=display:none; >
[You are now in GitHub source code view - click this link to view Read Me file as a web page]
( http://jaanga.github.io/documents/jaanga-practice-notes/ "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/documents/jaanga-practice-notes/'; value='You are now in GitHub web page view - Click this button to view Read Me file as source code' />

[Jaanga]( http://jaanga.github.io ) » [Cookbook HTML]( http://jaanga.github.io/documents/  ) » 

[Read Me Cheat Sheet]( ./index.html#readme-cheat-sheet.md )
===

Interesting things you can do with HTML and Markdown - particularly when as part of a GitHub Read Me file.


<script src="https://gist.github.com/theo-armour/8512f48f176082bb56e525462c4c67a6.js"></script>

### Updated 2016-06-02

* http://jaanga.github.io/documents/jaanga-practice-notes/#markdown-cheat-sheet.md
* [local]( ./index.html#markdown-cheat-sheet.md )


## Comments


	<!-- html comments -->


## Iframes

Display an `<iframe>` when viewed using GitHub pages and as an `<img>` when viewed using GitHub Source

<iframe class=ifr src=http://example.com/ width=100% height=600px ></iframe>

<img src="../files/img_the_scream.jpg" style=display:none; width=800 >

* source for src needs quotes

You should see 'The Scream' when viewing via GitHub Source.

You should see 'Example.com' when viewing via GitHub Pages.



## Code  or File Viewer / Ace Editor

<iframe class=ifr src=http://jaanga.github.io/cookbook-html/examples/libraries/ace-editor/ace-view-r1.html#http://jaanga.github.io/cookbook-html/examples/libraries/ace-editor/ace-view-r1.html width=100% height=600 ></iframe>

<input type=button onclick=window.location.href='https://github.com/ladybug-analysis-tools/ladybug-web/blob/gh-pages/analemma-3d/analemma-3d-r14.html';
value='Ladybug Web Analemma 3D: the entire source code listing' >



<iframe class=ifr src=../files/ace-view-r1.html#../../index.html width=100% height=600px ></iframe>


<!--
<iframe class=ifr src=../ace-view-r1.html#https://ladybug-analysis-tools.github.io/ladybug-web/analemma-3d/analemma-3d-r14.html width=100% height=600px ></iframe>
-->

jaanga.github.io/cookbook-html/snippets/libraries/ace-editor/ace-view-r1.html



## Table of Contents
  * [Chapter 1](#chapter-1)
  * [Chapter 2](#chapter-2)
  * [Chapter 3](#chapter-3)

### Chapter 1 <a id="chapter-1"></a>
Content for chapter one.

### Chapter 2 <a id="chapter-2"></a>
Content for chapter one.

### Chapter 3 <a id="chapter-3"></a>
Content for chapter one.



## Details & Summary

<details>
<summary><h2 style=display:inline-block;margin:0;padding:0; >Summary</h2></summary>
Thing Details Details Details Details Details
</details>

<details>
<summary>Summary</summary>
Thing Details Details Details Details Details
</details>


## Emoji

* http://www.emoji-cheat-sheet.com/


### Images

#### External Link icon file

![External Link Icon]( ../files/Icon_External_Link.png )  

<img src=../files/Icon_External_Link.png width="50" height="50" >

## Video


Just replace the YOUTUBE_VIDEO_ID_HERE for the id of your video. An image will appear and will redirect automatically to the video in youtube.
<a href="http://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID_HERE" target="_blank">
 <img src="http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg" alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" />
</a>
Or use pure markdown (without dimensions):
[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/YOUTUBE_VIDEO_ID_HERE/0.jpg)](http://www.youtube.com/watch?v=YOUTUBE_VIDEO_ID_HERE)
Do you have another tip that could be useful and we don't have in this collection ? Please share it with us in the comment box.
githubmarkdownreadmerepositorycenter



#### lorempixel - for random images

![ text ]( http://lorempixel.com/800/300 )


2016-06-02 - no longer working

	<img src=http://lorempixel.com/800/300 width=250 height=200>

	![ text ]( http://lorempixel.com/800/300 =250x250 )

	![ text ]( http://lorempixel.com/800/300 | width=100 )

 
### Horizontal rules

#### What you type
```
	***
	---
	___
```

### What you see

***

---

___



### Strike through

```
~~Strike through~~
```
~~Strike through~~



### Tables

#### What you type



```
| h1    |    h2   |      h3 |
|:------|:-------:|--------:|
| 100   | [a][1]  | ![b][2] |
| *foo* | **bar** | ~~baz~~ |
```

#### What you see

| h1    |    h2   |      h3 |
|:------|:-------:|--------:|
| 100   | [a][1]  | ![b][2] |
| *foo* | **bar** | ~~baz~~ |






### Lists

#### What you type
```

* item
* item
* item
	* item
	* item
		* item
* item

```
* item
* item
* item
	* item
	* item
		* item
* item


### Text

#### What you type
	_italics_

_italics_

#### What you type

	**Bold**

**Bold**


### Code

#### What you type

```
	line of code with 3 backquote characters
	line of code 
	line of code
```

	line of code
	line of code 
	line of code

text with `back quote` characters

text text text


### Quotes

#### What you type

```
> quote
> quote
> quote
```

> quote
> quote
> quote


## Links of Interest

* https://help.github.com/articles/basic-writing-and-formatting-syntax/
* https://guides.github.com/features/mastering-markdown/
* https://github.com/showdownjs/showdown  
* https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
* https://help.github.com/articles/github-flavored-markdown  
* http://daringfireball.net/projects/markdown/syntax
* https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet
* http://www.reddit.com/wiki/commenting

* https://stackedit.io/

## Alternatives

<https://github.com/evilstreak/markdown-js>  
<https://github.com/chjj/marked>

* require node

<http://strapdownjs.com/>

* cannot interpret readme.md
* embedded usage only
* requires node

<http://epiceditor.com/>

* a live editor...

<!--
http://google.com
-->

## Things working not so well


#### Figures

Figures seem to be one per line. So they are not really useful for making galleries. ;-(

<figure>
<a href=http://google.com >
<img src="http://lorempixel.com/200/200/" >
<figcaption>Fig1. - A view of image 1</figcaption>
<a>
</figure>

<figure >
<a href=http://google.com ><img src="http://lorempixel.com/200/200/" >
<figcaption>Fig2. - A view of the caption</figcaption>
</a>
</figure>



### Footers

<br>

***


<center title="dingbat" >
# <span onclick=window.scrollTo(0,0); style=cursor:pointer; >❦</span>
</center>

<center title="dingbat" >
## <a href=javascript:contents.scrollTop=0; >❦</a>
</center>

<center title="dingbat" >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; >❦</a>
</center>

<style>summary { color: red; }</style>
