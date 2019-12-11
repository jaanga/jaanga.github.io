// copyright 2019 Theo Armour. MIT license.
// 2019-12-10 v0.00.00
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, meshPlane, controls */
// jshint esversion: 6
// jshint loopfunc: true

const DSS = {};

DSS.wireframe = undefined;


DSS.getMenu = function () {

//	window.addEventListener("onresetall", DDS.reset, false);

	const htm =
		`
<details open>

	<summary class="sumMenuTitle" >Display scene settings</summary>

	<p>Update the appearance of the scene. Has no effect on exported data.</p>


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




DSS.reset = function () {


	axesHelper.visible = true;

};
