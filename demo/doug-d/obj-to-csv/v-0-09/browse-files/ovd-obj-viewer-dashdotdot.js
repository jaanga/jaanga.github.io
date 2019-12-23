/* global THREE, zoomObjectBoundingSphere, OVDselObj, OVDdivMessage, eventResetAll, scene, mesh, controls*/
// jshint esversion: 6
// jshint loopfunc: true


const OVD = {};

OVD.url = "https://api.github.com/repos/dashdotdotdashdotdot/Lines/git/trees/master?recursive=1";
OVD.prefix = "https://rawcdn.githack.com/dashdotdotdashdotdot/Lines/master/";



OVD.getMenu = function () {


	const htm =
		`
<details ontoggle=OVD.getFilesObj();OVD.getScript();>

	<summary>OBJ viewer &mdash;.. &mdash;.. files</summary>

	<div id=OVDdivMessage >Select an OBJ file to open from an automatically generated list of OBJ files from
	<a href="https://github.com/dashdotdotdashdotdot/Lines" target="_blank">&mdash;.. &mdash;..</a>  on GitHub.</div>

	<select id=OVDselObj onchange=OVD.loadObj(this.value) size=12 ></select>

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



OVD.getFilesObj = function () {

	fetch(OVD.url)
		.then(response => response.json())
		.then(json => {

			OVD.objData = json.tree.filter(item => item.path.endsWith(".obj")).map(item => item.path);

			OVDselObj.innerHTML = OVD.getOptions();

		});

};


OVD.getOptions = function () {

	const options = OVD.objData.map((item, index) => {

		return `<option value=${index}>${item.split("/").pop()}</option>`;

	});

	return options;

};



OVD.getScript = function () {

	if (!OVD.objLoader) {

		OVD.objLoader = document.body.appendChild(document.createElement('script'));
		OVD.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/loaders/OBJLoader.js";

	}
};



OVD.loadObj = function (index) {

	const url = OVD.prefix + OVD.objData[index];
	const loader = new THREE.OBJLoader();
	const name = url.split("/").pop().replace(/.obj/i, "").replace( /_/g, "-" ).toLowerCase();

	loader.load(

		url,

		function (object) {

			window.dispatchEvent(eventResetAll);

			scene.remove(mesh);

			const geometryMerged = OVD.getMeshesMergeGeometry(object);

			const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide, transparent: true });

			mesh = new THREE.Mesh(geometryMerged, material);

			mesh.name = name;

			scene.add(mesh);

			controls.reset();

			zoomObjectBoundingSphere();

		},


		function (xhr) {

			OVDdivMessage.innerHTML = `<p>${xhr.loaded.toLocaleString()} loaded</p>`;
			//console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

		},

		function (error) {

			divMessage.innerHTML = `<p>An error happened: ${error}</p>`;

		}
	);

};


OVD.getMeshesMergeGeometry = function (object) {

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