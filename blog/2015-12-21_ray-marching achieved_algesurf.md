Ray Marching Achieved
===

Displaying math equations in 3D is a great way to make math more accessible to more people, 
but rendering equations with speed, precision and beauty is difficult.

[Ray Marching]( https://en.wikipedia.org/wiki/Volume_ray_casting ) is fast, easy and cool. As 
[Íñgo Quílez said]( http://www.iquilezles.org/www/articles/terrainmarching/terrainmarching.htm ): "So I chose to do a "raymarcher" to create some pictures cause it's a really simple technique...
That's in fact the beauty of the technique - an increibly simple code that produces interesting images. It's perfect for small size demos..."

We are highly indebted to:

* Aaron Montag
	* https://www-m10.ma.tum.de/bin/view/Lehrstuhl/AaronMontag
	* http://home.in.tum.de/~montaga/fract/inversion2.html
* Mr.doob
	* http://threejs.org
* Íñgo Quílez and many more
	* http://www.iquilezles.org/

This work is still very preliminary, but will definitely become part of the algeSurf toolkit.
All the various ways of rendering equations can use ray marching - and other types of shaders - to make things faster and better.

On the other hand ray marching and shaders in general add an extra level of complexity to the code.
We can see two types of code being developed in algeSurf:

* Very simple code without shaders - great for the first quick demo
* Code with shaders for the demos that need to [knock your socks off]( http://idioms.thefreedictionary.com/knock+socks+off )

### What The Future Holds

We started bring over equations from the [Marching Cubes]( http://jaanga.github.io/algesurf/marching-cubes/r3.1/algesurf-marching-cubes-gallery-r3.1.html ) exhibition. It's not easy. 
In Marching cubes the equation is static, the motion is simple, single axis rotation and colors stay put.
With the current ray marching algorithm it's all changing all the time.
Often happens is that you see the equation as looks in Marching Cubes, but only for a brief moment.

Two thoughts:

1. It's going to take a good effort to take an equation such as Columpius appear the same in ray marching as it does in marching cubea.
The goal would be for Columpius to start off - when you first load it 
- looking like its old static version then let it go on and do its own new wild thing moves.
2. We have hardly begun to scratch the surface as to the possibilities. In the next few years, math viz is going to be disrupted big time.



 

### Coding Style

There are some interesting coding style issues

We are using the [ECMAScript 6 Template Strings]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/template_strings ).
Template Strings allows you to use the backquote (`) to surround strings in JavaScript. 
This makes creating shader files as JavaScript variables - rather than as separate scripts - much easier. 

The coding style of most shader code is really old school. Here is an example:

	vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / resolution.xy;
	float a = time*40.0;
	float d,e,f,g=1.0/40.0,h,i,r,q;
	e=400.0*(p.x*0.5+0.5);
	f=400.0*(p.y*0.5+0.5);
	i=200.0+sin(e*g+a/150.0)*20.0;
	d=200.0+cos(f*g/2.0)*18.0+cos(e*g)*7.0;
	r=sqrt(pow(abs(i-e),2.0)+pow(abs(d-f),2.0));
	q=f/r;
	e=(r*cos(q))-a/2.0;f=(r*sin(q))-a/2.0;
	d=sin(e*g)*176.0+sin(e*g)*164.0+r;
	h=((f+d)+a/2.0)*g;
	i=cos(h+r*p.x/1.3)*(e+e+a)+cos(q*g*6.0)*(r+h/3.0);
	h=sin(f*g)*144.0-sin(e*g)*212.0*p.x;
	h=(h+(f-e)*q+sin(r-(a+h)/7.0)*10.0+i/4.0)*g;
	i+=cos(h*2.3*sin(a/350.0-q))*184.0*sin(q-(r*4.3+a/12.0)*g)+tan(r*g+h)*184.0*cos(r*g+h);
	i=mod(i/5.6,256.0)/64.0;
	if(i<0.0) i+=4.0;
	if(i>=2.0) i=4.0-i;
	d=r/350.0;
	d+=sin(d*d*8.0)*0.52;
	f=(sin(a*g)+1.0)/2.0;
	gl_FragColor=vec4(vec3(f*i/1.6,i/2.0+d/13.0,i)*d*p.x+vec3(i/1.3+d/8.0,i/2.0+d/18.0,i)*d*(1.0-p.x),1.0);

We are using a much more open and breezy way of writing code. 
We are following the [Mr.doob Coding Style]( https://github.com/mrdoob/three.js/wiki/Mr.doob's-Code-Style%E2%84%A2 ).
Whether a particular style may significantly speed up or slow down shader processing is an open question. 
But the code has a much more human feel and is much easier to read.

The only exception is a bit unusual. With shaders people seem to prefer writing y*y*y instead of pow( y, 3 ). 
Who can blame them? ;-)

In the MDCS, you could write this as y * y * y - which is OK - but no if there's lots of them.

But this looks tedious:

	x * x * x * y * y * y * y * z * z - 5.0 * y * y * y * y

So we are taking the spaces when things are multiplied by themselves, as in

	x*x*x * y*y*y*y * z*z - 5.0 * y*y*y*y

 




### Links

* Demo: http://jaanga.github.io/algesurf/ray-marching/dev/
* Read Me: http://jaanga.github.io/algesurf/ray-marching/