// copyright 2019 Theo Armour. MIT license.
// 2019-12-22 v0.00.03
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, meshPlane, controls */
// jshint esversion: 6
// jshint loopfunc: true
// To do: vertex and face normals


const MMS = {};

MMS.materialSide = 2;

MMS.materialOpacity = 0.85;

MMS.getMenu = function () {

	window.addEventListener("onresetall", MMS.reset, false);

	const htm =
`
<details id=detMMS >

	<summary title="source: mms-mesh-material-settings-03.js" >Mesh material settings</summary>

	<p>Update appearance of the model. Settings here have no effect on exported data.</p>

	<p title="adjust opacity of mesh: 0 to 100%" >
		opacity <output id=MMSoutOpacity class=floatRight >85</output>%<br>
		<input type="range" id="MMSrngOpacity" min=0 max=100 step=1 value=85 oninput=MMS.setOpacity(); >
	</p>
	<p>
		render
		<select id=DLMselSides oninput=MMS.materialSide=this.selectedIndex;MMS.applyMaterialNormal(); size=3 style="vertical-align: top;">
			<option >front side</option>
			<option>back side</option>
			<option selected>both sides</option>
		</select>
	</p>
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
		<input type=checkbox id=MMSchkEdges onchange=MMS.toggleEdges(); > edges
	</div>
	<div>
		<input type=checkbox id=MMSchkBoxHelper onchange=MMS.toggleBoxHelper(); > boxHelper
	</div>
	<div>
		<input type=checkbox id=MMSchkWireframe onchange=MMS.toggleWireframe(); > wireframe
	</div>

</details>
`;

	return htm;

};


MMS.setOpacity = function ( opacityPercent = MMSrngOpacity.value ) {

	if ( mesh && mesh.material) {

		mesh.material.opacity = 0.01 * opacityPercent;

	}

	MMSoutOpacity.innerHTML = opacityPercent;
	MMS.materialOpacity = 0.01 * opacityPercent;

};


MMS.applyMaterialNormal = function () {

	mesh.traverse(child => {

		child.material = new THREE.MeshNormalMaterial({ opacity: MMS.materialOpacity, side: MMS.materialSide, transparent: true });
		//child.material.needsUpdate = true;

	})

};


MMS.applyMaterialRandom = function () {

	mesh.traverse(child =>
		child.material = new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random(), opacity: MMS.materialOpacity, side: MMS.materialSide, transparent: true })
	)

};



MMS.applyMaterialTexture = function () {

	url = "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg";

	texture = new THREE.TextureLoader().load(url);

	mesh.traverse(child =>
		child.material = new THREE.MeshBasicMaterial({ color: 0xdddddd, map: texture, opacity: MMS.materialOpacity, side: MMS.materialSide, transparent: true })
	);

};

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

	MMSrngOpacity.value = 85;
	MMS.setOpacity();

	MMSchkEdges.checked = false;
	MMSchkBoxHelper.checked = false;
	MMSchkWireframe.checked = false;
	edges = null;
	boxHelper = null;

};
