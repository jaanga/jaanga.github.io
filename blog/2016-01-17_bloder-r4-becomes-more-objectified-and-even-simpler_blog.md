Bloder R4 Becomes More Objectified and Even Simpler Blog
===

<iframe src=http://jaanga.github.io/request-jaanga-blog-posts.html width=800 height=600 ></iframe>
_a Jaanga post inside a Jaanga post_

A fun thing is to come back to some code you wrote a while ago, have a look at it - and see so many ways of making the code better, simpler and faster.
The funny thing is that the last time you looked at the code you thought 'wow, this is nearly perfect.'
Of course the longer you wait, the more you have learned and gained new experience. Therefore you will see even more possibilities.
Wait long enough and you will soon come up with a new solution and you will say to yourself 'wow, this is nearly perfect.'

So we are now at [Bloder R4](https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-html/templates/bloder/) (blog for coder = bloder). 
This releases uses the GitHub API to request the list of posts, as in:

<https://api.github.com/repos/jaanga/jaanga.github.io/contents/blog>

Using the JavaScript JSON.parse(), this text becomes a JavaScript object that's easy to play with. 
We also were able to get the tags link to work and did quite a bit of tidying up of the code.

Unfortunately we ran out of time today, so we have to say to ourself "wow, this is not perfect!"

