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

<img src=../files/img_the_scream.jpg style=display:none; >

You should see 'The Scream' when viewing via GitHub Source.

You should see 'Example.com' when viewing via GitHub Pages.


## File Viewer

<iframe class=ifr src=../files/ace-view-r1.html#../../index.html width=100% height=600px ></iframe>

<iframe class=ifr src=../ace-view-r1.html#https://ladybug-analysis-tools.github.io/ladybug-web/analemma-3d/analemma-3d-r14.html width=100% height=600px ></iframe>

jaanga.github.io/cookbook-html/snippets/libraries/ace-editor/ace-view-r1.html

## Details & Summary

<details>
<summary><h2 style=display:inline-block;margin:0;padding:0; >Summary</h2></summary>
Thing Details Details Details Details Details
</details>

<details>
<summary>Summary</summary>
Thing Details Details Details Details Details
</details>



### Images

#### External Link icon file

![External Link Icon]( ../files/Icon_External_Link.png )  

<img src=../files/Icon_External_Link.png width="50" height="50" >


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
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; >❦</a>
</center>

<center title="dingbat" >
# <span onclick=window.scrollTo(0,0); style=cursor:pointer; >❦</span>
</center>

<center title="dingbat" >
## <a href=javascript:content.scrollTop=0; >❦</a>
</center>

<center title="dingbat" >
# <a href=javascript:window.scrollTop=0; style=text-decoration:none; >❦</a>
</center>

<style>summary { color: red; }</style>
