
const GLF = {};

GLF.url = "https://api.github.com/repos/mrdoob/three.js/git/trees/master?recursive=1";
GLF.prefix = "https://rawcdn.githack.com/mrdoob/three.js/r112/";


GLF.init = function() {

	divGetFiles.innerHTML = GLF.getMenu();

};


GLF.urls = [

	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/carbon/Carbon.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/carbon/Carbon_Normal.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/cm_gray.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/colors.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/envmap.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/equirectangular.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/flakes.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/lava/cloud.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/lensflare/hexangle.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/lensflare/lensflare0.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/lensflare/lensflare0_alpha.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/lensflare/lensflare1.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/lensflare/lensflare2.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/lensflare/lensflare3.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/lightShaft.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/memorial.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/patterns/bright_squares256.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/pbr/Scratched_gold/Scratched_gold_01_1K_AO.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/pbr/Scratched_gold/Scratched_gold_01_1K_Base_Color.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/pbr/Scratched_gold/Scratched_gold_01_1K_Height.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/pbr/Scratched_gold/Scratched_gold_01_1K_Normal.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/pbr/Scratched_gold/Scratched_gold_01_1K_Roughness.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/planets/earth_clouds_1024.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/planets/earth_clouds_2048.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/planets/earth_lights_2048.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/transition/transition1.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/transition/transition2.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/transition/transition3.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/transition/transition4.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/transition/transition5.png",
	"https://rawcdn.githack.com/mrdoob/three.js/r112/examples/textures/transition/transition6.png"

];

GLF.getMenu = function() {

	const htm = `
<details ontoggle=GLF.getFileNames(); open>

	<summary>Three.js png files</summary>

	<p>A list of files from <a href="https://github.com/" target="_blank">Three.js </a> on GitHub.</p>

	<select id=GLFselFiles onchange=GLF.setImage(this.value) size=8 ></select>

	<p>
	<button id=but onclickGLF.setImage(); >set image</button>
	<button onclick=GLF.listImages() >list images</button>
</p>


	<div id=GLFdivOnLoad ></div>

	<div id=GLFdivImages ></div>



</details>
`;

	return htm;

};


GLF.getFileNames = function () {

	fetch( GLF.url )
		.then( response => response.json() )
		.then( json => {

			//GLF.filesData = json.tree.filter( item => item.path.includes( "textures" ) ).filter( item => item.path.endsWith( ".png" ) ).map( item => item.path );
			GLF.filesData = json.tree.filter( item => item.path.includes( "textures" ) ).filter( item => item.path.endsWith( ".jpg" ) ).map( item => item.path );

			GLFselFiles.innerHTML = GLF.getOptions();

		} );

};



GLF.getOptions = function () {

	const options = GLF.filesData.map( ( item, index ) => `<option value=${ index }>${ item.split( "/" ).pop() }</option>` );
	//const options = GLF.urls.map( ( item, index ) => `<option value=${ index }>${ item.split( "/" ).pop() }</option>` );

	GLFdivOnLoad.innerHTML = `<p>files found: ${ options.length }</p>`;

	return options;

};

GLF.setImage = function ( index ) {

	const url = GLF.prefix + GLF.filesData[ index ];
	//const url = GLF.urls[ index ];
	console.log( '', url );

	GLFdivImages.innerHTML =
		`
<p>
	<image src=${ url } >
</p>
`;

}

GLF.listImages = function ( index ) {

	const url = GLF.prefix + GLF.filesData[ index ];
	console.log( '', url );

	files = GLF.filesData.map( url => `"${GLF.prefix }${ url }"`).join( ",<br>");
	GLFdivImages.innerHTML = files;
		`

`;

}

GLF.init();