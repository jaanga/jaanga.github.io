<span style=display:none; >[You are now in a GitHub source code view - click this link to view Read Me file as a web page]
( https://jaanga.github.io/cookbook-html/templates/github-api-user-explorer2/#readme.md "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-html/templates/github-api-user-explorer2/'; 
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' >

[Jaanga]( https://jaanga.github.io ) &raquo; [Cookbook HTML]( https://jaanga.github.io/cookbook-html/  ) &raquo;
[Templates]( https://jaanga.github.io/cookbook-html/templates/ ) &raquo;


[GitHub API User Explorer Read Me]( https://jaanga.github.io/cookbook-html/templates/github-api-user-explorer2/index.html#readme.md )
===

_Explore various types of GitHub users. Preview what GitHub users create. Monitor their activity._


## full screen [GitHub API User Explorer2]( https://jaanga.github.io/cookbook-html/templates/github-api-user-explorer2/ )


<img src="" style=display:none; width=800 >

<iframe src=https://jaanga.github.io/cookbook-html/templates/github-api-user-explorer2/index.html width=100% height=600px ></iframe>

_GitHub API User Explorer2_

***

[Usage](#Usage)


## Concept

GitHub has [millions of project]( https://github.com/about ). With so many projects, finding projects that interest you is not easy. 

Finding projects with code you can use is also not easy.

And then, when you are notified about a GitHub user of interest, it's not that easy to explore the users's work.

There may be many repositories. There may be a lot of material that looks interesting but has not been updated in years.

Then there is the other side of the coin:

How can you make your own work more visible to the world?

How can visitors to your GitHb projects become informed in a speedy, fun manner about all the things you are doing.

Certainly the [Explore GitHub]( https://github.com/explore ) page is a good place to start. 

And there are a number of really interesting curation efforts.

And none of that stops you or us from investigating even more ways of exploring GitHub.

And, of course, GitHuB supplies a quite amazing tool for finding stuff on GitHub.

The [GitHub Developer API]( https://developer.github.com/ ) provides fast, free and easy access to millions of GitHub projects.

So, if you are looking to build tools to help you snoop around GitHub and finds the things that are of particular interest to you,
 then you are a a good place...
   



### Mission

* Help you build tools that make the GitHub web pages and the data come to you
	* Reduce that endless go there and come back, go there and come back repeated endlessly
* Provide you with as many ways of getting statistics as possible - really quickly and easily readable
* Display ways of getting to content such as the read me files and gists wherever possible
	* Show what is being created


### Vision

* Help you discover new algorithms and new concepts
* Link associated projects that you had no idea they were associated
* Make all of this your own


## <a href=#Usage >Usage</a>

The script creates and updates three columns

### Left Column / Menu / buttons and links

* Click every button

* Menus use the HTML 5 `<details>` tag
* Each menu header has its own script and its own namesoave
* Example: the Select menu has `SEL` as a namespace and `sel-select-r1.js` as a file 



_The following describes the usage of each menu headind._

#### [COR]( https://github.com/jaanga/jaanga.github.io/blob/master/cookbook-html/templates/github-api-user-explorer2/0-cor-core/core-r1.js )

* Set up the menu
	* Builds header and footer
* Include utilities used by the other scripts


#### API

* Enable you to enter your GitHub Developer API access token



### SEL


### Select Type of GitHub User
* Select a pre-written search query
* Edit or enter your own query

Most of your interaction will occur here

### Select GitHub user and repo

* Select a user from the list of results
* Enter a user name of your choice


### DAT

* Click every button and every link and see what happens
* Display the data for every item ib the search results
	* Left column of buttons: display raw data
	* Displays prettified data
	* Links to appropriate GitHub page for the data 




### Center Column / Contents / Tabular Data / Reports

* Displays scrolling list of search results
* Adds iframe view of README files for repositories


### Right Column / Updates / Activity

* Loads and display users 100 most recent events
* Most aspects of each event are links to most appropriate GitHub page




## Features

* No servers needed. All action generated client-side
* Entry-level, pure JavaScript. 
	* Single dependency on the ShowDown Markdown interpreter
* Click three bars( 'hamburger' ) icon to slide menu in or out
* Direct link to this read me file
* Click on title to reload 

## Coding style

We live in a world where the full-stack developer reigns supreme
We champion DevOps as if good DevOps is the primary goal

But

What if you are an entry-level coder?
What if you are interested in STEM topics than Devops?

Then you have come to the right place.


### Written for GitHub users and coders

You are here to explore code

* Font is default monotype font - fixed character spacing
* UI is minimal
	* Offers many - too many? - options
* Uses most up-to-date JavaScript features
* Display the identical data using varying methods


But some idiosyncrasies

* Follows Mr.doob coding style
	* Open airy, almost a poetic style of displaying code
* Does not follow normal split up of HTML, CSS and JavaScript
	* Content, appearance and behavior
* Does follow the idea that its all mutable stuff in th DOM
	* Even content
	* It all starts as alphanumeric characters and ends up as pixels
	* Remix, re-appropriate, re-hash as needed
	* Uses JavaScript to do this mash-up


### Entry Level Code

* Code is almost all entry level JavaScript
* Download and run
* JavaScript is used for everything including
	* Adding HTML
	* Applying CSS
* The dependencies are
	* ShowDown Markdown interpreter
	* GitHub API

### Compatibility

* Anticipated user: somebody who writes code
	* Sitting in front of a modern computer with recent multi-core CPU and Intel HD4000 GPU
	* Display 1600 x 900 pixels or better
* Every effort made to use latest most simple methods
* Tested on latest Chrome, FireFox, Edge and Safari
* Tested on Windows and MacOS
* Operation on Android and iOS is a bonus not a requirement
* Backwards compatibility eschewed
	* Adds complexties to scripts
	* Strikes fear in the hearts of new users
	* Looks to the future not the past
	* Simple features in the pipeline are built on the lessons learned from the complextiies of the past  

### No server Needed

* 100% client side
* Loads scripts from GitHub pages or localhost 
* Uses Rawgit as a content delivery network (CDN)
* Accesses GitHub Developer API via RESTfull URL calls
	* No terminal window/curl needed


### Scripts

* The app is built using a number of script files
* Each item on the menu has its own script file 
* Each script file has its own folder
* Each script file has its owm HTML file to help with testing and developing the script
* Each script file has its own three letter namespace object
	See [JavaScript Object Management]( https://developer.mozilla.org/en-US/Add-ons/Overlay_Extensions/XUL_School/JavaScript_Object_Management )
* The namespace title relates to the title of the menu
* The three letter namespace is part of the script folder and file title





## Things you can do by editing the code

<iframe src='https://jaanga.github.io/cookbook-html/examples/libraries/ace-editor/ace-view-r1.html#
	https://jaanga.github.io/cookbook-html/templates/github-api-user-explorer2/github-api-user-explorer2-r1.html' width=100% height=600 ></iframe>

<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/blob/master/cookbook-html/templates/github-api-user-explorer2/github-api-user-explorer2-r1.html';
value='Source code listing' >


* Open this file: https://github.com/jaanga/jaanga.github.io/blob/master/cookbook-html/templates/github-api-user-explorer2/github-api-user-explorer2-r1.html
* Click the 'Raw' icon and save the raw file to your computer
* Once you've downloaded the file, you can click it to run it.
* Open the file with a text editor

## Naming

New name: GHubGHub

The code or original name for this script was 'GitHub API User Explorer'. 
This title describes fairly clearly what the script's intention but does not comply with the [GitHub Logos and Usage]( https://github.com/logos ) guideline.
Examples of app names that the GitHub organization accept are listed on the GitHub [Integrations[( https://github.com/integrations ) oage.
The only of integrations with the word 'github' in the title are apps produced and distributed by GitHub themselves.

So we needed a more acceptable name.

* The tit;e should relate to the intent
* The intent is to help people peruse GitHub
* The title should not infringe GitHub Trademarks
* Should be short and catchy
* Little relation to git more relationship with 'hub'

The current solution is 'gubgub' or 'ghubghub'.


The fun thing is that Gub-Gub is the talking pig in the Dr Dolittle series of books written by Hugh Lofting in the early 1900s 

See 

* https://en.wikipedia.org/wiki/Doctor_Dolittle 
* https://en.wikipedia.org/wiki/Gub_Gub%27s_Book



## Issues

* 2016-10-21 ~ API ~ reset time not uodating
* 2016-10-20 ~ Contents readme iframes not working on MS Edged browser


##  To Do List / Goals

* 2016-10-20 ~ Add ability to display readme files in full
* Leaving and coming back returns to same user / better location.hash management
* Add GitHub no connection note
* Add API key entry
* Add number of stars to each repo < would add to rate limit
* Add iframes to orgs
* Add iframes to gists


## Links of Interest / Background Context

Web sites that help you explore GitHub

* https://resume.github.io/ ~ added 2016-10-19
* https://github.com/trending
* https://github.com/trending/javascript
* https://www.reddit.com/r/github/
* https://www.reddit.com/r/coolgithubprojects
* https://github.com/leereilly/games
* http://www.gitlogs.com/
* http://ghv.artzub.com/
* http://github-awards.com/
* https://github-ranking.com/
* https://gist.github.com/paulmillr/2657075/
* http://githut.info/



## Credits

* GitHub Developer API
* Showdown

### README Considerations

* http://tom.preston-werner.com/2010/08/23/readme-driven-development.html
* https://github.com/noffle/art-of-readme

### Coding

* [Mozilla Developer Network (MDN) JavaScript]( https://developer.mozilla.org/en-US/docs/Web/JavaScript
* [W3schools.com]( http://www.w3schools.com/js/ )
	* Much maligned by full-stack developers, 
	* but it the first thing that show up on Google

### Coding Style

* Mr.doob coding style

### Users

* [theo-armour.github.io](  https://theo-armour.github.io )


## Copyright and License




## Change Log

### 2016-10-23

* Much cleaning up all over the place

### 2016-10-20

* Major update to this README
	* Switch from read me to README ;-(
	* README is the standard


### 2016-10-19

* All buttons have working actions
* Buttons show hand icon on mouse over
* 2016-10-18 ~ Read all cases of readme.MD < mostly fulfilled


### 2016-09-20

* 2016-09-17 ~ return to top of page when new user is loaded < 2016-09-20 fixed
* Enter search query
* View rate limits
	* Add number of hits remaining before you go over usage limits
* Repo read me in monospace font
	* Add GitHub-like CSS < partial fix
* Right menu scrolls independently

### 2016-09-17 ~ Explorer2 R1

* Major update


### 

* First commit
* Add Read Me


***

<center title='Jaanga ~ your 3D happy place' >
# <a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > ❦ </a>
</center>
