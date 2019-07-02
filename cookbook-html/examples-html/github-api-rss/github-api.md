---
layout: post
title: GitHub API Cheat Sheet
---

yaml tables. must be first thing in the gist

GitHub API
===

Here: http://jaanga.github.io/cookbook-html/examples/github-api-rss/github-api-users-explorer/


## Documentation: https://developer.github.com/v3/

### Bookmarks

5 entertaining things you can find with the GitHub Search API
* https://gist.github.com/jasonrudolph/6065289

fun look at issues
* https://github.com/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+


### GitHub Help


* https://help.github.com/categories/search/
* https://help.github.com/articles/searching-repositories/
* https://help.github.com/articles/searching-code/ << Only files under 384k are searched


* http://stackoverflow.com/questions/12882049/list-all-java-repositories-on-github-using-api?rq=1
* https://github.com/search?q=3D+extension:stl&type=Code&s=indexed

* https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc
* https://api.github.com/search/repositories?q=language:Java&sort=stars&order=desc


* http://stackoverflow.com/questions/14731459/github-api-fetch-all-folders-and-files-in-single-get-request







## Activity

* https://developer.github.com/v3/activity/events/
* https://api.github.com/events
* https://api.github.com/feeds

* https://github.com/timeline
* https://github.com/jaanga/timeline



## Commits

* https://api.github.com/repos/jaanga/jaanga.github.io/commits
* https://api.github.com/repos/jaanga/terrain3/commits
* https://api.github.com/repos/jaanga/jaanga.github.io/commits?path=readme.md


***

## Events

* https://api.github.com/repos/jaanga/jaanga.github.io/events
* https://api.github.com/repos/jaanga/terrain3/events

not
* https://api.github.com/repos/jaanga/jaanga.github.io/events?path=cookbook-html/examples << not
* https://api.github.com/repos/jaanga/jaanga.github.io/events?type=PushEvent << not



***

## Gists

* https://developer.github.com/v3/gists/
* https://gist.githubusercontent.com/theo-armour/bb9527c8cff89a417b09eaeb6c8ae330


### Links of Interest

* https://gist.github.com/
* https://gist.github.com/theo-armour/bb9527c8cff89a417b09eaeb6c8ae330#file-gist-tips-and-bookmarks-md

### Typical

* https://gist.github.com/search?q=user:theo-armour
* https://api.github.com/users/theo-armour/gists
* https://api.github.com/gists/bb9527c8cff89a417b09eaeb6c8ae330


### Raw


* https://developer.github.com/changes/2014-02-21-gist-raw-file-url-change/
* https://gist.githubusercontent.com/VonC/9184693/raw/testNewGist



## Issues


* https://developer.github.com/v3/issues/

***


* https://api.github.com/repos/jaanga/jaanga.github.io/issues
* https://api.github.com/repos/jaanga/terrain3/issues
* https://api.github.com/repos/jaanga/terrain3/issues?labels=Status%20Update
* https://api.github.com/repos/fgx/fgx.github.io/issues?labels=Status%20Update
* https://api.github.com/repos/jaanga/jaanga.github.io/issues?state=closed

not
* https://api.github.com/repos/jaanga/jaanga.github.io/trees << none
* https://api.github.com/repos/jaanga/jaanga.github.io/branches
* https://api.github.com/repos/jaanga/jaanga.github.io/tags << not
* https://api.github.com/repos/jaanga/jaanga.github.io/references << not
* https://api.github.com/repos/jaanga/jaanga.github.io/events?state=open


* https://api.github.com/repos/jaanga/jaanga.github.io/followers << not
* https://api.github.com/repos/jaanga/jaanga.github.io/labels
* https://api.github.com/repos/jaanga/jaanga.github.io/comments

* https://api.github.com/repos/jaanga/jaanga.github.io/commit_activity



* https://api.github.com/repos/jquery/jquery/contributors?anon=true
* https://api.github.com/repos/jquery/jquery/contributors?login=jeresig << nope


* https://api.github.com/repos/jquery/jquery/issues?state=open&labels=bug
* https://api.github.com/repos/jquery/jquery/issues?state=closed << works
* https://api.github.com/repos/jquery/jquery/issues?locked=true << not work




***

## Miscellaneous

* https://developer.github.com/v3/misc/
* https://api.github.com/emojis
* http://www.webpagefx.com/tools/emoji-cheat-sheet/
* https://api.github.com/gitignore/templates
* https://api.github.com/licenses
* https://api.github.com/meta


### Rate Limits

* https://api.github.com/rate_limit



***

## Orgs


* https://api.github.com/orgs/

* https://api.github.com/orgs/ladybug-tools <<
* https://api.github.com/orgs/ladybug-tools/repos
* https://api.github.com/orgs/ladybug-tools/events <<

* https://api.github.com/orgs/jaanga
* lists number of repos


### Issues

* https://api.github.com/orgs/ladybug-tools/issues



## Organizations

* https://api.github.com/organizations?since=20000000
* https://api.github.com/organizations?q=followers:%3E20



***

## Repos


* https://developer.github.com/v3/repos/contents/
* http://stackoverflow.com/questions/15831313/is-it-possible-to-get-commits-history-for-one-file-in-github-api
* http://api.github.com/repos/:owner/:repo/commits?path=PATH_TO_FILE

e.g.

https://api.github.com/repos/izuzak/pmrpc/commits?path=README.markdown


### start here

* https://api.github.com/repositories?since=364
* http://api.github.com/repos/ < nothing

* https://api.github.com/repos/jaanga/jaanga.github.io << lists all calls
* https://api.github.com/repos/jaanga/terrain3
* https://api.github.com/repos/mrdoob/three.js

* https://github.com/mrdoob?tab=repositories





### Commits

* https://api.github.com/repos/jaanga/jaanga.github.io/commits

* https://api.github.com/repos/izuzak/pmrpc/commits?path=examples
* https://api.github.com/repos/jaanga/jaanga.github.io/commits?path=cookbook-html/examples



### Contents

Docs
* https://developer.github.com/v3/repos/contents/#get-contents

examples
* https://api.github.com/repos/mrdoob/three.js/contents/examples
* https://api.github.com/repos/jaanga/terrain3/contents/elevations-core3
* https://api.github.com/repos/jaanga/sp500/contents/trades
* https://api.github.com/repos/google/tracing-framework/contents/index.html?ref=gh-pages



Get the README << finds any readme!!

* https://api.github.com/repos/jaanga/jaanga.github.io/readme

or
* https://api.github.com/repos/jaanga/jaanga.github.io/contents/readme.md

### License

* https://api.github.com/repos/benbalter/gman/license
* https://api.github.com/repos/jaanga/jaanga.github.io/license


### Issues

* https://api.github.com/repos/jquery/jquery/issues?state=open&labels=bug


### Pages

* https://api.github.com/repos/jaanga/jaanga.github.io


### Archive


* https://api.github.com/repos/jaanga/jaanga.github.io/zipball/master


### Statistics

* https://api.github.com/repos/jaanga/jaanga.github.io/stats/contributors

* https://api.github.com/repos/jaanga/stats < not

* https://api.github.com/repos/jaanga/jaanga.github.io/stats/commit_activity

* https://api.github.com/repos/jaanga/jaanga.github.io/stats/code_frequency

* https://api.github.com/repos/jaanga/jaanga.github.io/stats/participation

* https://api.github.com/repos/jaanga/jaanga.github.io/stats/punch_card

* https://api.github.com/repos/theo-armour/theo-armour.github.io/stats/code_frequency


### Tree

* * https://developer.github.com/v3/git/trees/

* https://api.github.com/repos/jaanga/jaanga.github.io/git/trees/master?recursive=1
* https://api.github.com/repos/jaanga/terrain3/git/trees/gh-pages?recursive=1
* https://api.github.com/repos/jaanga/terrain3/git/trees/gh-pages?recursive=1



### Webhooks

* https://api.github.com/repos/jaanga/jaanga.github.io/hooks


***

## Users

* https://developer.github.com/v3/users/


* https://api.github.com/users
* all users starting with id: 1

* https://api.github.com/users?since=20000000


* https://api.github.com/users/theo-armour
* lists repo count. gists, etc

### Events

http://stackoverflow.com/questions/18733424/how-can-i-get-a-list-of-all-github-pushevents-for-a-user
* No way to filter

* https://api.github.com/users/theo-armour/events?per_page=100

* pre-sorted by date and time. Most recent first

* https://api.github.com/users/theo-armour/events?type="WatchEvent"

* https://api.github.com/users/jaanga/events?path=cookbook-html/examples < not

* https://api.github.com/users/jaanga/events?login=redheli < not



## Search ~ API

* https://developer.github.com/v3/search/
* http://stackoverflow.com/questions/24132790/how-to-search-for-code-in-github-with-github-api
* https://www.quora.com/How-many-users-does-GitHub-have



### Code

* https://api.github.com/search/code
* https://api.github.com/search/code?q=repo

Examples
* https://api.github.com/search/code?q=MIT%32License%32path:project.clj
* https://api.github.com/search/code?q=addClass+repo:jquery/jquery+filename:classes.js
* https://api.github.com/search/code?q=repo:mrdoob/three.js+filename:CameraHelper.js
* https://api.github.com/search/code?q=repo:jaanga/sp500/trades

not
* https://api.github.com/search/code?q=3D+extension:stl << not



### Issues

* https://api.github.com/search/issues?q=windows+label:bug+language:python+state:open&sort=created&order=asc
* https://api.github.com/search/issues?q=user:jaanga+repo:jaanga.github.io+state:open&sort=created&order=asc << ignores the repo
* https://api.github.com/search/issues?q=repo:jaanga/jaanga.github.io
* https://api.github.com/search/issues?q=@paulmasson+repo:jaanga/jaanga.github.io+state:open&sort=created&order=asc
* https://api.github.com/search/issues?q=language:js+created:2016-06-25
* https://api.github.com/search/issues?q=user:theo-armour

js or JavaScript: both OK
* https://api.github.com/search/issues?q=created:2016-06-25&sort=comments&order=desc




### Repos

sort stars, forks update

* https://api.github.com/search/repositories?q=stars:%3E20000
	* Access to the most popular repos on GitGub


* https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc

* https://api.github.com/search/repositories?q=webgl&sort=stars&order=desc <<

* https://api.github.com/search/repositories?q=forks:%3E9000&sort=forks&order=asc < OK
* https://api.github.com/search/repositories?q=commits:%3E1000 < bogus



* https://api.github.com/search/repositories?q=forks:%3E2000+type:org&sort=forks&order=desc < not
* https://api.github.com/search/repositories?q=type:org&sort=forks&order=asc < not good
* https://api.github.com/search/repositories?q=collaborators:%3E20&sort=stars&order=asc < not good


From https://gist.github.com/jasonrudolph/6065289
* https://api.github.com/search/repositories?q=created:%3E2016-06-20&sort=stars&order=desc


* https://api.github.com/search/repositories?q=type:org
* https://api.github.com/search/repositories?q=followers:%3E1000


* https://api.github.com/search/repositories?q=jaanga
* https://api.github.com/search/repositories?q=user:jaanga


* https://api.github.com/search/repositories?q=@jeresig-language:javascript << not

* https://api.github.com/search/repositories?q=repo:jaanga/jaanga.github.io&sort=created&order=asc



### Users
* https://www.quora.com/How-many-users-does-GitHub-have

From https://gist.github.com/jasonrudolph/6065289


#### basic
* https://api.github.com/search/users?q=

type
* https://api.github.com/search/users?q=type:org
* https://api.github.com/search/users?q=type:org&order=asc  < not
* https://api.github.com/search/users?q=type:org&sort=created&order=desc < no sorting
* https://api.github.com/search/users?q=type:org+created:%3E2016-08-28&sort=stars&order=asc
not
* https://api.github.com/search/users?q=stars:%3E20+type:org < not



followers
* https://api.github.com/search/users?q=followers:%3E1000
* https://api.github.com/search/users?q=followers:0
* https://api.github.com/search/users?q=followers:>20
* https://api.github.com/search/users?q=followers:%3E2000&sort=created&order=desc





### Regular GitHub Search

* https://github.com/search?q=NASA-3D&extension:stl&type=Code&s=indexed
* https://github.com/search?q=3D+Printing+extension:stl&type=Code&s=indexed


## RSS

* Format : https://github.com/whatever/commits/master.atom
* https://github.com/cloudera/flume/events/master.atom

* https://github.com/cloudera.atom
* https://github.com/theo-armour.atom
* https://github.com/ladybug-tools.atom

* https://github.com/ladybug-tools/honeybee/commits.atom


https://api.github.com/feeds

## Ladybug Web

* https://api.github.com/repos/ladybug-tools/ladybug-web << main one

* https://api.github.com/repos/ladybug-tools/ladybug-web/collaborators/theo-armour << needs authentication

* https://api.github.com/repos/ladybug-tools/ladybug-web/commits <<

* https://api.github.com/repos/ladybug-tools/ladybug-web/events

* https://api.github.com/repos/ladybug-tools/ladybug-web/readme << per file?

* https://api.github.com/repos/ladybug-tools/ladybug-web/pages/builds

* https://api.github.com/repos/ladybug-tools/ladybug-web/stats/contributors
* https://api.github.com/repos/ladybug-tools/ladybug-web/stats/commit_activity
* https://api.github.com/repos/ladybug-tools/ladybug-web/stats/code_frequency
* https://api.github.com/repos/ladybug-tools/ladybug-web/stats/participation
* https://api.github.com/repos/ladybug-tools/ladybug-web/stats/punch_card

* https://api.github.com/repos/ladybug-tools/ladybug-web/stats

* https://api.github.com/repos/ladybug-tools/stats

* https://api.github.com/users/ladybug-tools/received_events
* https://api.github.com/users/ladybug-tools/repos

