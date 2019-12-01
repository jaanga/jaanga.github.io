/* global THREE, zoomObjectBoundingSphere, OVNselObj, OVNdivMessage, eventResetAll, scene, mesh, controls*/
// jshint esversion: 6
// jshint loopfunc: true
const OVN = {};

OVN.url = "https://api.github.com/repos/nasa/NASA-3D-Resources/git/trees/master?recursive=1";
OVN.prefix = "https://rawcdn.githack.com/nasa/NASA-3D-Resources/master/";



OVN.getMenu = function () {


	const htm =
		`
<details ontoggle=OVN.getFilesObjNasa();OVN.getScript();>

	<summary>OBJ viewer NASA files</summary>

	<div id=OVNdivMessage >Select an OBJ file to open from an automatically generated list of OBJ files from NASA on GitHub. Some files are very large and take a long time to load. You may meed to zoom way in or way out to see the model.</div>

	<select id=OVNselObj onchange=OVN.loadObj(this.value) size=20 ></select>

	<p>
		<button onclick=getFilesObj(); >get files obj</button>
	</p>

	<p>
		Help for adding new files. See source code.
	</p>

</details>
	`;

	return htm;

};



OVN.getFilesObjNasa = function () {

	fetch(OVN.url)
		.then(response => response.json())
		.then(json => {

			OVN.objData = json.tree.filter(item => item.path.endsWith(".obj")).map(item => item.path);

			OVNselObj.innerHTML = OVN.getOptions();

		});

};


OVN.getOptions = function () {

	const options = OVN.objData.map((item, index) => {

		return `<option value=${index}>${item.split("/").pop()}</option>`;

	});

	return options;

};



OVN.getScript = function () {

	if (!OVN.objLoader) {

		OVN.objLoader = document.body.appendChild(document.createElement('script'));
		OVN.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/loaders/OBJLoader.js";

	}
};



OVN.loadObj = function (index) {

	const url = OVN.prefix + OVN.objData[index];
	const loader = new THREE.OBJLoader();
	const name = url.split("/").pop().replace(/.obj/i, "").replace( /_/g, "-" ).toLowerCase();

	loader.load(

		url,

		function (object) {

			window.dispatchEvent(eventResetAll);

			scene.remove(mesh);

			const geometryMerged = OVN.getMeshesMergeGeometry(object);

			const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, transparent: true });

			mesh = new THREE.Mesh(geometryMerged, material);

			mesh.name = name;

			scene.add(mesh);

			controls.reset();

			zoomObjectBoundingSphere();

		},


		function (xhr) {

			OVNdivMessage.innerHTML = `<p>${xhr.loaded.toLocaleString()} loaded</p>`;
			//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},

		function (error) {

			divMessage.innerHTML = `<p>An error happened: ${error}</p>`;

		}
	);

};


OVN.getMeshesMergeGeometry = function (object) {

	const geometry = new THREE.Geometry();

	object.children.forEach(child => {

		child.geometry = child.geometry.type === "BufferGeometry" ?
			new THREE.Geometry().fromBufferGeometry(child.geometry) : child.geometry;

		if (!child.geometry) { console.log('child', child); }

		const p = child.position.clone();

		const clone = child.geometry.clone();
		clone.applyMatrix(new THREE.Matrix4().makeTranslation(-p.x, -p.y, -p.z));
		clone.applyMatrix(new THREE.Matrix4().makeRotationX(0.5 * Math.PI));

		geometry.merge(clone);

	});

	geometry.center();

	geometry.computeBoundingBox();

	const size = geometry.boundingBox.getSize( new THREE.Vector3() );

	const scale = 100 / size.z;

	geometry.applyMatrix( new THREE.Matrix4().makeScale(scale, scale, scale ) );

	return geometry;

};