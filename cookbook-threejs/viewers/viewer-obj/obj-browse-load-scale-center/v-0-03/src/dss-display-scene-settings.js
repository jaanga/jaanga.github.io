// copyright 2019 Theo Armour. MIT license.
// 2019-11-24 v0.00.01


const DSS = {};


DSS.getMenu = function () {

	const htm =
		`
<details open>

	<summary class="sumMenuTitle" >Display scene settings</summary>

	<p>
		<button onclick=controls.reset(); >reset view</button>
	</p>

	Toggles
	<div>
		<input type=checkbox onchange="sceneRotation = sceneRotation === 1 ? 0 : 1;" checked > rotation
	</div>

	<div>
		<input type=checkbox onchange=axesHelper.visible=!axesHelper.visible; checked > axes
	<div>

	<div>
		<input type=checkbox onchange=mesh.material.wireframe=!mesh.material.wireframe; > wireframe
	</div>

	<div>
		<input type=checkbox onchange=controls.staticMoving=!controls.staticMoving; checked > rotation damping
	</div>

	<div>
		<input type=checkbox onchange=DSS.toggleEdges(); > edges
	</div>

	<div>
		<input type=checkbox onchange=DSS.toggleBoxHelper(); > boxHelper
	</div>

	<p>
		rotation speed
		<input type="range" id="inpSpeed" onclick="sceneRotation=0.03 * this.value;" />
	</p>

	<p>
		dynamic damping factor
		<input type="range" id="inpSpeed" onclick="controls.dynamicDampingFactor=0.01 * this.value;" />
	</p>

	<p title="opacity: 0 to 100%" >
		opacity <output id=outOpacity class=floatRight >85%</output><br>
		<input type="range" id="rngOpacity" min=0 max=100 step=1 value=85 oninput="mesh.material.opacity= 0.01 * this.value";" >
	</p>

</details>

	`;

	return htm;

};


DSS.toggleEdges = function () {

	if (!edges) {

		const edgesGeometry = new THREE.EdgesGeometry(mesh.geometry);
		edges = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({ color: 0x333333 }));
		mesh.add( edges);

		edges.visible = false;

	}

	edges.visible = !edges.visible;

};


DSS.toggleBoxHelper = function () {

	if (!boxHelper) {

		boxHelper = new THREE.BoxHelper(mesh, 0xff0000);
		scene.add(boxHelper);

		boxHelper.visible = false;

	}

	boxHelper.visible = !boxHelper.visible;

};