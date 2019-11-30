
const OFR = {};

OFR.getMenu = function () {

	const htm =
		`
<details ontoggle=OFR.getScript(); >

	<summary>File open OBJ file</summary>

	<p><input type=file id=inpFile onchange=OFR.openFile(this); accept = '.mtl, .obj' multiple ></p>

	<div id=OFRdivMessage ></div>

</details>
	`;

	return htm;

};



OFR.getScript = function () {

	if (!OFR.objLoader) {

		OFR.objLoader = document.body.appendChild(document.createElement('script'));
		OFR.objLoader.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/loaders/OBJLoader.js";

	}

};


OFR.openFile = function (files) {

	const reader = new FileReader();
	const loader = new THREE.OBJLoader();

	reader.onload = function (event) {

		//txtArea.innerHTML = reader.result;

		OFRdivMessage.innerHTML =
			'<p>name: ' + files.files[0].name + '<br>' +
			'size: ' + files.files[0].size.toLocaleString() + ' bytes<br>' +
			'type: ' + files.files[0].type + '<br>' +
			'modified: ' + files.files[0].lastModifiedDate.toLocaleDateString() +
			'</p>';

		obj = loader.parse(reader.result);

		OFR.drawMesh(obj);

	}

	reader.readAsText(files.files[0]);

};


OFR.drawMesh = function (object) {

	window.dispatchEvent(eventResetAll);

	scene.remove(mesh );

	mesh = new THREE.Group();

	const meshes = object.children.map(obj => getObjMesh(obj))

	mesh.add(...meshes);

	const bBox = new THREE.Box3().setFromObject(mesh);
	const radius = bBox.getBoundingSphere(new THREE.Vector3()).radius;
	const scale = 100 / radius;
	mesh.scale.set(scale, scale, scale);
	mesh.position.y = -50;

	scene.add(mesh);

	controls.reset();

};