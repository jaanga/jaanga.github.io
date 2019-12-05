// copyright 2019 Theo Armour. MIT license.
// 2019-11-27 v0.00.00


const DLB = {};


DLB.getMenu = function () {

	const htm =
		`
<details>

	<summary class="sumMenuTitle" >Draw basic lines</summary>

	<p>Draw the data with one-dimension plain lines</p>

	<p><button onclick=DLB.renderLines(CFR.contours) >render lines</button>
	</p>
<!--
	<p>
		<button onclick=DLB.applyMaterialNormal() >apply material normal</button>
	</p>
-->
	<p>
		<button onclick=DLB.applyMaterialRandom() >apply material random</button>
	</p>

	<p>
		<button onclick=DLB.applyMaterialTexture() >apply material texture</button>
	</p>

	<div>
		<input type=checkbox id=DLBchkWireframe onchange=DLB.toggleWireframe(); > wireframe
	</div>

	<!--
	<p title="opacity: 0 to 100%" >
		opacity <output id=outOpacity class=floatRight >85%</output><br>
		<input type="range" id="rngOpacity" min=0 max=100 step=1 value=85 oninput="group.material.opacity= 0.01 * this.value";" >
	</p>

	-->

</details>

	`;

	return htm;

};




DLB.renderLines = function (contours) {

	if ( !contours ) { alert( "First please load a file")}

	scene.remove(group);

	group = new THREE.Group();

	for (let contour of contours) {

		const geometry = new THREE.Geometry();
		geometry.vertices = contour.map(vertex => new THREE.Vector3().fromArray(vertex.map(coor => parseFloat(coor))));

		if (geometry.vertices.length > 1) {

			const material = new THREE.LineBasicMaterial({ color: 0xffffff * Math.random() });
			const line = new THREE.Line(geometry, material);

			group.add(line);

		} else {

			//console.log('contour', contour);

		}

	}

	scene.add(group);

	zoomObjectBoundingSphere();

}


DLB.applyMaterialNormal = function () {


	group.traverse(child => {

		if (child.type === "Line ") {
		child.material = new THREE.MeshNormalMaterial({ opacity: 0.85, side: 2, transparent: true });
		//child.material.needsUpdate = true;

		}


	})

}


DLB.applyMaterialRandom = function () {

	group.traverse(child => {

		if (child.type === "Line") {
			child.material = new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random(), opacity: 0.85, side: 2, transparent: true })

		}

	} )

}



DLB.applyMaterialTexture = function () {

	url = "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg";

	texture = new THREE.TextureLoader().load(url);

	group.traverse(child => {

		if (child.type === "Line") {

			child.material = new THREE.MeshBasicMaterial({ color: 0xdddddd, map: texture, opacity: 0.85, side: 2, transparent: true })

		}

	} )

}


DLB.toggleWireframe = function () {

	if (!DLB.wireframe) {

		DLB.wireframe = false;

	}

	DLB.wireframe = !DLB.wireframe;

	const groups = group.geometry ? [group] : group.children;

	for (let group of groups) {

		group.material.wireframe = DLB.wireframe

	}

};





DLB.reset = function () {

	scene.remove(edges, boxHelper);

	axesHelper.visible = true;

	DLBchkWireframe.checked = false;
	DLBchkBoxHelper.checked = false;
	DLBchkEdges.checked = false;
	edges = null;
	boxHelper = null;

};
