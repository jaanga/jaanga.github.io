<span style=display:none; >
[You are now in a GitHub source code view - click this link to view Read Me file as a web page]
( https://jaanga.github.io/demo/hk/index.html "View file as a web page." ) </span>
<input type=button onclick=window.location.href='https://github.com/jaanga/jaanga.github.io/tree/master/demo/hk/'; 
value='You are now in a GitHub web page view - Click this button to view this read me file as source code' >

[Jaanga]( https://jaanga.github.io ) » [Demo]( https://jaanga.github.io/demo/  ) »

[HK Read Me]( index.html )
===

## 2016-05-25


### [Many Triangles R1]( many-triangles-r1.html )

* First pass at seeing what lots ( 10,000 ) of random faces 'feels' like
* Each face is a separate mesh with vertices randomly placed
* Slow loading
* 10 FPS
* Intersecting faces adds greatly to slowdown


## 2016-05-25

### [Many Triangles R2]( many-triangles-r2.html )

![Many Triangles R2]( many-triangles-r2.jpg =600x500 )

* Slight change makes big difference: geometry.merge( geometry2 );
* All geometry now in a single mesh
* Loads faster as well
* 40 FPS


***

### [HK Table R1]( hk-table-r1.html )

![HK Table R1]( hk-table-r1.jpg =600x600 )

* First pass with HK's data
* Loads data - face-array.js - as JavaScript file
* 60 FPS!

