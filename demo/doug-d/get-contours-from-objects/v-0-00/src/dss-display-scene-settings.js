// copyright 2019 Theo Armour. MIT license.
// 2019-11-24 v0.00.01


const DSS = {};

DSS.wireframe = undefined;


DSS.getMenu = function () {

	const htm =
		`
<details open>

	<summary class="sumMenuTitle" >Display scene settings</summary>

	Toggles
	<div>
		<input type=checkbox onchange="GCO.contourSegments.visible=!GCO.contourSegments.visible" checked >
		contour segments
	</div>
	<div>
		<input type=checkbox onchange="GCO.contourLines.visible=!GCO.contourLines.visible" checked >
		contour lines
	</div>

	<div>
		<input type=checkbox onchange="GCO.contourPoints.visible=!GCO.contourPoints.visible" checked >
		contour points
	</div>

	<br>

	<div>
		<input type=checkbox onchange="sceneRotation = sceneRotation === 1 ? 0 : 1;" checked > rotation
	</div>

	<div>
		<input type=checkbox onchange=axesHelper.visible=!axesHelper.visible; checked > axes
	<div>

	<div>
		<input type=checkbox id=DSSchkWireframe onchange=DSS.toggleWireframe(); > wireframe
	</div>

	<div>
		<input type=checkbox onchange=controls.staticMoving=!controls.staticMoving; checked > rotation damping
	</div>

	<div>
		<input type=checkbox id=DSSchkEdges onchange=DSS.toggleEdges(); > edges
	</div>

	<div>
		<input type=checkbox id=DSSchkBoxHelper onchange=DSS.toggleBoxHelper(); > boxHelper
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




DSS.toggleWireframe = function () {

	if (!DSS.wireframe) {

		DSS.wireframe = false;

	}

	DSS.wireframe = !DSS.wireframe;

	const meshes = mesh.geometry ? [mesh] : mesh.children;

	for (let mesh of meshes) {

		mesh.material.wireframe = DSS.wireframe

	}

};



DSS.toggleEdges = function () {

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


DSS.toggleBoxHelper = function () {

	if (!boxHelper) {

		boxHelper = new THREE.BoxHelper(mesh, 0xff0000);
		boxHelper.geometry.computeBoundingBox()
		scene.add(boxHelper);

		boxHelper.visible = false;

		console.log('boxHelper', JSON.stringify( boxHelper.geometry.boundingBox ) );

	}

	boxHelper.visible = !boxHelper.visible;

};


DSS.reset = function () {

	scene.remove( edges, boxHelper );

	axesHelper.visible = true;

	DSSchkWireframe.cheked = false;
	DSSchkBoxHelper.checked = false;
	DSSchkEdges.checked = false;
	edges = null;
	boxHelper = null;

};
