Mars Updates
===

![mars-heightmap-2d-1440x720.jpg]( http://jaanga.github.io/mars/images/mars-heightmap-2d-512x512.jpg =640x640 )  
_Mars Heightmap Detail_

[Mars Voyager Gamer]( http://jaanga.github.io/mars/voyager/gamer/dev/ ) made a lot of progress today.
The code is becoming fairly clean and effective. Placards line up with their relevant geography.
Clicking on the dropdown list takes you to the designated location. 
If the location is too small - smaller than 50 kn radius - to have a default placard then a placard is created on the fly,
The nice thing is that the translation from 'big endian' binary data to PNG files and then back to integers has been really cleaned up ans streamlined.
All of this will help the data to load faster.

The [utilities]( https://github.com/jaanga/mars/tree/gh-pages/utilities ) used tp build the moon have been brought over and adapted to Mars.
These utilities will be highlighted in a future post.

'Mars Rover' also made a lot of progress today. 128 pixels per degree data is being produced nicely and should start getting up on GitHub in the next day or so.
The app is working really well. It too is taking advantage of the more straightforward translation from IMG files to PNG to data.
There are issues with placing the placards and with the moves across the landscape jumping too much of a distance.

Nonetheless, the Mars landscape is appearing well and it is very different to the Moon landscape.





