Ladybug GitHub API Explorer
===

There's not much here yet of any good use.
This is just the beginning of an investigation to explore the use of the GitHub API as a source of data for an informative dashboard for a GitHub organization.

The [GitHub API]( https://developer.github.com/v3/ ) appears to be immensely powerful, deep reaching and a huge source of valuable content.
Very often accessing such power requires the knowledge, patience and skills of a 'full-stack developer'.
But, as we are beginning to find out, the GitHub API may actually be fairly easy to access.

So if you are not fully stacked, what to do?

The first thing for you to do is to burn all the documentation. Well, you can't actually do that since of the docs are in the cloud.
But you get the idea.
The docs are written for old-school server side types. The docs want you to use curl (which just celebrated its 18th birthday).
And to be able to compose lines of code of arcane complexity - like this on the very first page of the docs:

> curl -i -u username -d '{"scopes":["public_repo"]}' https://api.github.com/authorizations

It's like incantations written by high priests to be read by even higher priests in some devout fantasy.

But, thankfully, it doesn't have to be just that way. There are some much simpler ways to access the GitHub API. Yay!

For example, click on this link

<https://api.github.com/orgs/ladybug-analysis-tools>

The GitHub server replies with text you - as a regular human being - may decipher fairly easily.
For example, you can read the description of the organization or see when it was last updated.
And with a little bit of JavaScript you can parse and format the text for any purpose.

Using techniques like these, it's not that difficult to snoop around your organization.
Over on the left menu you can see links to GitHub API call that may be of interest.
Mostly they display raw data, but the 'Repos' calls do have a formatted version.
Look for menu items with an asterisk.

The Emojis Gallery page takes a while to load, but it's worth the wait. Who would have thought that GitHub had such Emoji capability?

Here's another cool feature. The GitHub API will convert Markdown text into HTML for you in the blink of an eye.
In fact the text you are currently reading is one such example. Click on the 'Read Me Cheat Sheet' to view another example.

There's a bunch more calls that involve searches and recursion and more. What you see on the left is just a start.
Thee next steps will be to continue the exploration and highlight data of interest.
And then the real task will be to see if we can create an informative, easy to read and self-updating dashboard useful to small open-source organizations.


***


![+1]( https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png?v6 )
