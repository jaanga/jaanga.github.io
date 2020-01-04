// copyright 2019 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/threejs-hamburger/v-0-01/src/dss-display-scene-settings-01.js
// 2019-12-17 v0.00.01
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, meshPlane, controls */
// jshint esversion: 6
// jshint loopfunc: true

const DSS = {};

DSS.wireframe = undefined;


DSS.getMenu = function () {

	window.addEventListener("onresetall", DSS.reset );

	const htm =
		`
<details id=detDSS >

	<summary title="source: dss-display-scene-settings-01.js" >Display scene settings</summary>

	<p>Update the appearance of the scene. Has no effect on exported data.</p>

	Toggles

	<p>
		Select ground color: <input type="color" value="#ff00ff" id="DSSinpColorGround" oninput="ground.material.color=( new THREE.Color(this.value));" >
	</p>
	<p>
		<input type=checkbox onchange=ground.visible=!ground.visible; checked > ground
	</p>

	<p>
		<input type=checkbox onchange=axesHelper.visible=!axesHelper.visible; > axes
	</p>

	<p>
		<input type=checkbox onchange="sceneRotation = sceneRotation === 1 ? 0 : 1;" checked > rotation
	</p>
	<p>
		rotation speed
		<input type="range" id="inpSpeed" onclick="sceneRotation=0.03 * this.value;" />
	</p>


	<div>
		<input type=checkbox onchange=controls.staticMoving=!controls.staticMoving; checked > rotation damping
	</div>
	<p>
		dynamic damping factor
		<input type="range" id="inpSpeed" onclick="controls.dynamicDampingFactor=0.01 * this.value;" />
	</p>

</details>

	`;

	return htm;

};


DSS.reset = function () {

	axesHelper.visible = true;

	//console.log('DSS.reset');

};
