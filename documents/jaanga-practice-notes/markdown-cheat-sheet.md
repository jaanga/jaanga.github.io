<span style=display:none; >
[You are now in GitHub source code view - click this link to view Read Me file as a web page]
( http://jaanga.github.io/documents/jaanga-practice-notes/ "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/documents/jaanga-practice-notes/'; value='You are now in GitHub web page view - Click this button to view Read Me file as source code' />

[Jaanga]( http://jaanga.github.io ) » [Cookbook HTML]( http://jaanga.github.io/documents/  ) » 

[Read Me Cheat Sheet]( ./index.html#readme-cheat-sheet.md )
===

Interesting things you can do with HTML and Markdown - particularly when as part of a GitHub Read Me file.



### Updated 2016-05-31

* http://jaanga.github.io/documents/jaanga-practice-notes/viewer/menu-contents-in-markdown-r1.html#../markdown-cheat-sheet.md
* [local]( ./index.html#markdown-cheat-sheet.md)

### Images

#### External Link icon file

![External Link Icon]( ../files/Icon_External_Link.png =100x100 )  

#### lorempixel - for random images

![ text ]( http://lorempixel.com/800/600 =400x300 )

![ text ]( http://lorempixel.com/800/600 =200x150 )

 
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


### Links of Interest

https://github.com/showdownjs/showdown  
https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet

<!--
http://google.com
-->


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
