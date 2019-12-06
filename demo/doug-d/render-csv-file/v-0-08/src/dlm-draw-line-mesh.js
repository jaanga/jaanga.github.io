// copyright 2019 Theo Armour. MIT license.
// 2019-11-27 v0.00.00


const DLM = {};


DLM.getMenu = function () {

	const htm =
		`
<details>

	<summary class="sumMenuTitle" >Draw mesh lines</summary>

	<p>Draw the data with on lines that have height and other features</p>

	<p>
		<button onclick=DLM.renderLines(CFR.contours) >render lines as mesh</button>
	</p>

	<p title="line width: 1 to 20" >
		line width <output id=DLMoutLineWidth class=floatRight >10</output><br>
		<input type="range" id="DLMrngLineWidth" min=1 max=20 step=1 value=10 oninput=DLM.renderLines(CFR.contours); >
	</p>

	<p>
		<button onclick=DLM.applyMaterialNormal() >apply material normal</button>
	</p>

	<p>
		<button onclick=DLM.applyMaterialRandom() >apply material random</button>
	</p>

	<p>
		<button onclick=DLM.applyMaterialTexture() >apply material texture</button>
	</p>

	<div>
		<input type=checkbox id=DLMchkWireframe onchange=DLM.toggleWireframe(); > wireframe
	</div>

	<p title="opacity: 0 to 100%" >
		opacity <output id=outOpacity class=floatRight >85%</output><br>
		<input type="range" id="rngOpacity" min=0 max=100 step=1 value=85 oninput="group.material.opacity= 0.01 * this.value";" >
	</p>


</details>

	`;

	return htm;

};




DLM.renderLines = function (contours) {

	if (!contours) { alert("First please load a file"); }

	scene.remove(group);

	group = new THREE.Group();

	for (let contour of contours) {

		width = 0.1 * parseFloat( DLMrngLineWidth.value );

		vertices = contour.map( vertex => new THREE.Vector3().fromArray( vertex.map( coord => parseFloat( coord) ) ) );
		verticesHigh = vertices.map( vertex => new THREE.Vector3( vertex.x, vertex.y, vertex.z + width ) );

		const verticesBoth = vertices.concat( verticesHigh );

		const geometry = new THREE.PlaneGeometry( 1, 1, contour.length - 1, 1);
		geometry.vertices = verticesBoth;

		if (geometry.vertices.length > 1) {

			//console.log('', child, geometry);
			geometry.verticesNeedUpdate = true;
			geometry.elementsNeedUpdate = true;
			geometry.morphTargetsNeedUpdate = true;
			geometry.uvsNeedUpdate = true;
			geometry.normalsNeedUpdate = true;
			geometry.colorsNeedUpdate = true;
			geometry.tangentsNeedUpdate = true;

			//const material = new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random(), side: 2 });
			const material = new THREE.MeshNormalMaterial({ side: 2 });
			const mesh = new THREE.Mesh(geometry, material);

			group.add( mesh );

		} else {

			//console.log('contour', contour);

		}

	}

	scene.add(group);

	zoomObjectBoundingSphere();

}


DLM.applyMaterialNormal = function () {


	group.traverse(child => {

		if (child.geometry) {

			var geometry = child.geometry;
			//console.log('', child, geometry);
			geometry.verticesNeedUpdate = true;
			geometry.elementsNeedUpdate = true;
			geometry.morphTargetsNeedUpdate = true;
			geometry.uvsNeedUpdate = true;
			geometry.normalsNeedUpdate = true;
			geometry.colorsNeedUpdate = true;
			geometry.tangentsNeedUpdate = true;

		}


		if (child.type === "Mesh") {
			child.material = new THREE.MeshNormalMaterial();
			child.material.needsUpdate = true;

		}

	})

}


DLM.applyMaterialRandom = function () {

	group.traverse(child => {

		if (child.type === "Mesh") {

			child.material = new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random(), opacity: 0.85, side: 2, transparent: true })
		}

	} )

}



DLM.applyMaterialTexture = function () {

	url = "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg";

	texture = new THREE.TextureLoader().load(url);


	group.traverse(child => {
		if (child.type === "Mesh") {
			child.material = new THREE.MeshBasicMaterial({ color: 0xdddddd, map: texture, opacity: 0.85, side: 2, transparent: true })

		}
	});

}


DLM.toggleWireframe = function () {

	if (!DLM.wireframe) {

		DLM.wireframe = false;

	}

	DLM.wireframe = !DLM.wireframe;

	const groups = group.geometry ? [group] : group.children;

	for (let group of groups) {

		group.material.wireframe = DLM.wireframe

	}

};






DLM.reset = function () {

	scene.remove(edges, boxHelper);

	axesHelper.visible = true;

	DLMchkWireframe.checked = false;
	DLMchkBoxHelper.checked = false;
	DLMchkEdges.checked = false;
	edges = null;
	boxHelper = null;

};
