
const OVN = {};

OVN.url = "https://api.github.com/repos/nasa/NASA-3D-Resources/git/trees/master?recursive=1";
OVN.prefix = "https://rawcdn.githack.com/nasa/NASA-3D-Resources/master/";



OVN.getMenu = function () {

	//const options =

	const htm =
	`
<details ontoggle=OVN.getFilesObjNasa();OVN.getScript();>

	<summary>OBJ viewer NASA files</summary>

	<div id=OVNdivMessage >A list of OBJ files from NASA on GitHub. Some files are very large and take a long time to load. You may meed to zoom way in or way out to see the model.</div>

	<select id=OVNselObj onchange=OVN.loadObj(this.value) size=20 ></select>

	<p>
		<button onclick=getFilesObj(); >get files obj</button>
	</p>

	<p>
		Help for adding new files. See source code.
	</p>

	<div id=divFilesObj ></div>

</details>
	`;

	return htm;

}




OVN.getFilesObjNasa = function() {

	fetch( OVN.url)
	.then( response => response.json() )
	.then( json => {

		OVN.objData = json.tree.filter( item => item.path.endsWith( ".obj" ) ).map( item => item.path )

		OVNselObj.innerHTML = OVN.getOptions();


	} );

}


OVN.getOptions = function () {

	const options = OVN.objData.map( ( item, index ) => {

		//if ( item.startsWith( "http" ) ) {

			return `<option value=${ index }>${ item.split("/").pop() }</option>`;

		//} else {

		//	return `<optgroup label="${ item }" ></optgroup>`;

		//}

	} )

	//console.log('', options );
	return options;

}



OVN.getScript = function () {

	if ( !OVN.objLoader) {

		OVN.objLoader = document.body.appendChild( document.createElement( 'script' ) );
		OVN.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/loaders/OBJLoader.js";

	}
}



OVN.loadObj = function ( index ) {

	const url = OVN.prefix + OVN.objData[ index ];
	const loader = new THREE.OBJLoader();

	loader.load (

		url,

		function ( object ) {

			scene.remove( mesh, edges, boundingBox );

			mesh = new THREE.Group();

			const meshes = object.children.map( obj => OVN.getObjMesh( obj ) );

			//console.log('meshes', meshes);

			if (meshes.length === 1) {


				var geometry = meshes[0].geometry;

				geometry.center();
				geometry.verticesNeedUpdate = true;
				geometry.elementsNeedUpdate = true;
				geometry.morphTargetsNeedUpdate = true;
				geometry.uvsNeedUpdate = true;
				geometry.normalsNeedUpdate = true;
				geometry.colorsNeedUpdate = true;
				geometry.tangentsNeedUpdate = true;

			}
			mesh.add( ...meshes );

			const bBox = new THREE.Box3().setFromObject( mesh );
			const radius = bBox.getBoundingSphere( new THREE.Vector3() ).radius;
			const scale = 100 / radius;
			mesh.scale.set( scale, scale, scale );
			//mesh.position.y = -50;

			scene.add(mesh);

			controls.reset();

		},


		function ( xhr ) {

			OVNdivMessage.innerHTML = `<p>${ xhr.loaded.toLocaleString() } loaded</p>`;
			//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},

		function ( error ) {

			divMessage.innerHTML = `<p>An error happened: ${ error }</p>`;

		}
	);

}


OVN.getObjMesh = function( mesh ) {

	mesh.material = new THREE.MeshNormalMaterial( { side: THREE.DoubleSide, transparent: true } );

	return mesh;

}