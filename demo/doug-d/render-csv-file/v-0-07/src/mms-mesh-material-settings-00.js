// copyright 2019 Theo Armour. MIT license.
// 2019-11-27 v0.00.00


const MMS = {};


MMS.getMenu = function () {

	const htm =
		`
<details open>

	<summary class="sumMenuTitle" >Mesh material settings</summary>

	<p>Update the appearance of the OBJ model. Has no effect on exported data.</p>

	<p>
		<button onclick=MMS.applyMaterialNormal() >apply material normal</button>
	</p>

	<p>
		<button onclick=MMS.applyMaterialRandom() >apply material random</button>
	</p>

	<p>
		<button onclick=MMS.applyMaterialTexture() >apply material texture</button>
	</p>

	<div>
		<input type=checkbox id=MMSchkWireframe onchange=MMS.toggleWireframe(); > wireframe
	</div>

	<p title="opacity: 0 to 100%" >
		opacity <output id=outOpacity class=floatRight >85%</output><br>
		<input type="range" id="rngOpacity" min=0 max=100 step=1 value=85 oninput="mesh.material.opacity= 0.01 * this.value";" >
	</p>


</details>

	`;

	return htm;

};



MMS.applyMaterialNormal = function() {


	mesh.traverse(child => {

		child.material = new THREE.MeshNormalMaterial({ opacity: 0.85, side: 2, transparent: true });
		//child.material.needsUpdate = true;

	} )

}


MMS.applyMaterialRandom = function() {

	mesh.traverse( child =>
		child.material = new THREE.MeshBasicMaterial( { color: 0xffffff * Math.random(), opacity: 0.85, side:2, transparent: true  } )
	)

}



MMS.applyMaterialTexture = function () {

	url = "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg";

	texture = new THREE.TextureLoader().load(url);

	mesh.traverse(child =>
		child.material = new THREE.MeshBasicMaterial({ color: 0xdddddd, map: texture, opacity: 0.85, side: 2, transparent: true })
	);

}

MMS.toggleWireframe = function () {

	if (!MMS.wireframe) {

		MMS.wireframe = false;

	}

	MMS.wireframe = !MMS.wireframe;

	const meshes = mesh.geometry ? [mesh] : mesh.children;

	for (let mesh of meshes) {

		mesh.material.wireframe = MMS.wireframe

	}

};



MMS.toggleEdges = function () {

	if (!edges) {

		const meshes = mesh.geometry ? [mesh] : mesh.children;

		edges = true

		for (let mesh of meshes) {

			const edgesGeometry = new THREE.EdgesGeometry(mesh.geometry);
			const edgeLines = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({ color: 0x333333 }));
			edgeLines.userData = "edgeLines"
			mesh.add(edgeLines);

			edgeLines.visible = false;
		}

	}

	mesh.traverse(child => {
		if (child.userData === "edgeLines") {

			child.visible = !child.visible
		}
	} );


};


MMS.toggleBoxHelper = function () {

	if (!boxHelper) {

		boxHelper = new THREE.BoxHelper(mesh, 0xff0000);
		boxHelper.geometry.computeBoundingBox()
		scene.add(boxHelper);

		boxHelper.visible = false;

		console.log('boxHelper', JSON.stringify( boxHelper.geometry.boundingBox ) );

	}

	boxHelper.visible = !boxHelper.visible;

};


MMS.reset = function () {

	scene.remove( edges, boxHelper );

	axesHelper.visible = true;

	MMSchkWireframe.checked = false;
	MMSchkBoxHelper.checked = false;
	MMSchkEdges.checked = false;
	edges = null;
	boxHelper = null;

};
