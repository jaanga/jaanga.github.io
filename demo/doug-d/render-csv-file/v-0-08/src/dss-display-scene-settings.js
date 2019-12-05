// copyright 2019 Theo Armour. MIT license.
// 2019-11-24 v0.00.01


const DSS = {};

DSS.wireframe = undefined;


DSS.getMenu = function () {

	const htm =
		`
<details>

	<summary class="sumMenuTitle" >Display scene settings</summary>

	<p>Update the appearance of the scene.</p>


	Toggles
	<div>
		<input type=checkbox onchange="sceneRotation = sceneRotation === 1 ? 0 : 1;" checked > rotation
	</div>

	<div>
		<input type=checkbox onchange=axesHelper.visible=!axesHelper.visible; checked > axes
	<div>


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

</details>

	`;

	return htm;

};


DSS.toggleEdges = function () {

	if (!edges) {

		const groups = group.geometry ? [group] : group.children;

		edges = true;

		for (let group of groups) {

			const edgesGeometry = new THREE.EdgesGeometry(group.geometry);
			const edgeLines = new THREE.LineSegments(edgesGeometry, new THREE.LineBasicMaterial({ color: 0x333333 }));
			edgeLines.userData = "edgeLines"
			group.add(edgeLines);

			edgeLines.visible = false;
		}

	}

	group.traverse(child => {

		if (child.userData === "edgeLines") {

			child.visible = !child.visible
		}
	} );


};


DSS.toggleBoxHelper = function () {

	if (!boxHelper) {

		boxHelper = new THREE.BoxHelper(group, 0xff0000);
		boxHelper.geometry.computeBoundingBox()
		scene.add(boxHelper);

		boxHelper.visible = false;

	}

	boxHelper.visible = !boxHelper.visible;
	console.log('boxHelper', JSON.stringify( boxHelper.geometry.boundingBox ) );

};


DSS.reset = function () {

	scene.remove( edges, boxHelper );

	axesHelper.visible = true;

	DSSchkBoxHelper.checked = false;
	DSSchkEdges.checked = false;
	edges = null;
	boxHelper = null;

};
