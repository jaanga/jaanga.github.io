// copyright 2019 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/threejs-hamburger/v-0-01/src/dss-display-scene-settings-01.js
// 2019-12-17 v0.00.01
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, meshPlane, controls */
// jshint esversion: 6
// jshint loopfunc: true

const DSS = {};

DSS.wireframe = undefined;


DSS.getMenu = function () {

	window.addEventListener("onresetthree", DSS.reset );

	const htm =
		`
<details id=detDSS open >

	<summary title="source: dss-display-scene-settings-01.js" >Display scene settings

		<span class="couponcode" >??<span id=divDescription class="coupontooltip" >
		Update the appearance of the scene. Has no effect on exported data.
		</span></span>

	</summary>

	Toggles
	<p title="XYZ = RGB" >

		<label>
			<input type=checkbox onchange=ground.visible=!ground.visible; checked > ground
		</label>
	</p>
	<p>
		Select ground color: <input type="color" value="#ff00ff" id="DSSinpColorGround" oninput="ground.material.color=( new THREE.Color(this.value));" >
	</p>


	<p>
		<input type=checkbox onchange=axesHelper.visible=!axesHelper.visible; > axes
	</p>

	<p>
		<input type=checkbox id=ChkRotate onchange="controls.autoRotate=!controls.autoRotate" checked > rotation
	</p>
	<p>
		rotation speed
		<input type="range" id="inpSpeed" onchange="controls.rotateSpeed=+this.value;" />
	</p>

<!--
	<div>
		<input type=checkbox onchange=controls.staticMoving=!controls.staticMoving; checked > rotation damping
	</div>
	<p>
		dynamic damping factor
		<input type="range" id="inpSpeed" onclick="controls.dynamicDampingFactor=0.01 * this.value;" />
	</p>
-->

</details>

	`;

	return htm;

};


DSS.reset = function () {

	//axesHelper.visible = true;

	//console.log('DSS.reset');

};
