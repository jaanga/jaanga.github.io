<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]
( https://jaanga.github.io/cookbook-html/examples/github-api-rss/github-api-files-in-folder/#readme.md "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-html/examples/github-api-rss/github-api-files-in-folder/'; 
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' >


github-api-files-in-folder read me
===

## [github-api-files-in-folder]( http://jaanga.github.io/cookbook-html/examples/github-api-rss/github-api-files-in-folder/ )


## Concept

GitHub repositories may contain hundreds of script files and spporting pages of content

GitHub enables inspection and hosting via its GitHub pages feature

Making this work available as web pages takes time and effort away from programming and documenting.

The GitHub tools for setting up a content management system (CMS) are require the use and knowledge of Ruby

Setting up a remote server to set up a content management system for GitHub files takes time, effort and money 

A possible alternative is to have a client-side JavaScript app to act as a CMS


### Mission

Provide a simple client-side content management system for files in a gh-pages branch of a GitHub repository

### Vision 

* TBD


## Features


* Request details of all files in a gh-pages branch of a GitHub repository.
* Create a file explorer with menu. 
* Enable browsing and viewing of selected files.
* Menu has breadcrumbs and other usefulul links. 
* Lists tagged issues in rght side menu
* Short, easy code
	* About 300 lines of mostly air
* Single dependemcy on ShowDown - a MarkDown interpreter



## To Do

* 2016-08-13 ~ recent events in left column
* 2016-08-13 ~ right menu issue title as link to ussue
* 2016-08-13 ~ stas as separate - reusable  - details
* Recognizes file names in location.hash
* Add pop-ups?
* Add view all files
* View file details from SHA
* Open page in new tab does what it says
* Build files object
	* Tracks files sizes
	* Tracks SHA
	* Tracks is a dir - so can display http://www.fileformat.info/info/unicode/char/1f4c1/browsertest.htm - 📁


## Issues

* 2016-08-04 ~ Add better menu display handling if nu subfolders 
* 2016-08-04 ~ Breadcrumbs and files menu display/style still not totallyy clear
* 2016-08-03 ~ Errors reporting when certain scripts in readme iframes

## Change log

### 2016-08-12 R8

* Add right side menu
* Creates table of contents with the links you actually want
* Code cleanup


### 2016-08-04 R6

* Add limited ability to display file with name supplied by location.hash
* Add link to here in sbout menu
* Change style of contents div
* Tweak breadcrumbs
* Add folder icon
* Add to these notes
* Update base HTML file metadata
* Many changes

### 2016-07-28 R1...

So much fun!

Just create and the menuing system and read me files take care of themselves.
Well, that's the goal anyway


* Follows on from several days of playing with different formats and naming styles

