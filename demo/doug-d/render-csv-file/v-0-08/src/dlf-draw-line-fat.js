// copyright 2019 Theo Armour. MIT license.
// 2019-11-27 v0.00.00


const DLF = {};


DLF.scripts = [

	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/lines/LineSegmentsGeometry.js",
	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/lines/LineGeometry.js",
	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/lines/LineMaterial.js",
	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/lines/LineSegments2.js",
	"https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/lines/Line2.js"

];

DLF.scriptsLoaded = false;

DLF.getMenu = function () {

	const htm =
		`
<details ontoggle=DLF.getScripts(); >

	<summary class="sumMenuTitle" >Draw fat lines</summary>

	<p>Draw the data with lines that have a width and color. Reset view and other features no yet working here.</p>

	<p>
		<button onclick=DLF.renderLinesFat(CFR.contours) >render Fat lines</button>
	</p>
	<p>
		Select your color: <input type="color" value="#ff00ff" id="DLFinpColor" oninput=DLF.renderLinesFat(CFR.contours); >
	</p>

	<p>


	<p title="line width: 1 to 20" >
		line width <output id=DLFoutLineWidth class=floatRight >10</output><br>
		<input type="range" id="DLFrngLineWidth" min=1 max=20 step=1 value=10 oninput=DLF.renderLinesFat(CFR.contours); >
	</p>

	<p>
		<button onclick=DLF.applyMaterialRandom() title="could be a gradient of colors" >apply material random</button>
	</p>

	<p>
		<input type=checkbox id=DLFchkWireframe onchange=DLF.toggleWireframe(); > wireframe
	</p>

</details>

	`;

	return htm;

};



DLF.getScripts = function () {

	if ( !DLF.scriptsLoaded ) {

		DLF.scripts.forEach( script => {

			const scr = document.body.appendChild( document.createElement( 'script' ) );
			//editor.onload = setEditContents;
			scr.src = script;

		});

		DLF.scriptsLoaded = true;

	}

};


DLF.renderLinesFat = function (contours) {

	if ( !contours ) { alert( "First please load a file")}

	scene.remove(group);

	group = new THREE.Group();

	for (let contour of contours) {

		points = contour.flatMap(item => item.slice(0, 3));

		//console.log('points', points);

		if ( points.length > 1) {

			lineWidth = DLFrngLineWidth.value;

			color = DLFinpColor.value;

			line = DLF.drawFatLines(points, color, lineWidth )

			group.add(line);

			DLFoutLineWidth.value = lineWidth;

		} else {

			//console.log('contour', contour);

		}

	}

	scene.add(group);

	//zoomObjectBoundingSphere();

}




DLF.drawFatLines = function( pts, col = 0xff0000, lineWidth = 10 ) {

	points = pts || [1, 1, 1, 1, 10, 10, 10, 10, 10, 10, 1, 10];


	const geometry = new THREE.LineGeometry();
	geometry.setPositions( points );
	//geometry.setColors( colors );

	const lineMaterial = new THREE.LineMaterial( {

		color: color,
		linewidth: lineWidth, // in pixels
		resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)

	} );

	const line = new THREE.Line2( geometry, lineMaterial );
	//line.computeLineDistances();
	//line.scale.set( 1, 1, 1 );
	return line

}



DLF.applyMaterialRandom = function () {

	group.traverse(child => {

		if (child.type === "Line2") {


			child.material = new THREE.LineMaterial({

				color: 0xffffff * Math.random(),
				linewidth: DLFrngLineWidth.value, // in pixels
				resolution: new THREE.Vector2(window.innerWidth, window.innerHeight)

			})
		}
	} )

}



DLF.toggleWireframe = function () {

	if (!DLF.wireframe) {

		DLF.wireframe = false;

	}

	DLF.wireframe = !DLF.wireframe;

	const groups = group.geometry ? [group] : group.children;

	for (let group of groups) {

		group.material.wireframe = DLF.wireframe

	}

};



DLF.reset = function () {

	scene.remove(edges, boxHelper);

	axesHelper.visible = true;

	DLFchkWireframe.checked = false;
	edges = null;
	boxHelper = null;

};
