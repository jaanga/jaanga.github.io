// copyright 2019 Theo Armour. MIT license.
// See pushme-pullyou.github.io/templates-01/threejs-hamburger/v-0-02/src/
// 2019-12-22 v0.00.01
/* global THREE, zoomObjectBoundingSphere, divMessage, eventResetAll, scene, mesh, meshPlane, controls */
// jshint esversion: 6
// jshint loopfunc: true

const OR = {};


OR.getMenu = function () {

	window.addEventListener("onresetall", OR.reset, false);

	const htm =
`
<details id=detOR >

	<summary title="source: or-object-rotation-01.js" >Object rotation </summary>

	<p  title="XYZ = RGB">Rotate the model around the origin.</p>

	<p title="rotation: -180&deg; to 180&deg; around red line">
		x-axis <output id=outRotationX >0</output>&deg; &nbsp;
		<button onclick=OR.updateRotationX(0) >0</button>
		<button onclick=OR.updateRotationX(90) >90</button>
		<button onclick=OR.updateRotationX(180) >180</button>
		<button onclick=OR.updateRotationX(-90) >-90</button>
	</p>
	<p>
		<input type="range" id="rngRotatationX" min=-180 max=180 step=1 value=0
			oninput=OR.updateRotationX(this.value) title="cursor keys OK" >
	</p>

	<p title="rotation: -180&deg; to 180&deg; around green line"" >
		y-axis <output id=outRotationY class=floatRight >0</output>&deg; &nbsp;
		<button onclick=OR.updateRotationY(0) >0</button>
		<button onclick=OR.updateRotationY(90) >90</button>
		<button onclick=OR.updateRotationY(180) >180</button>
		<button onclick=OR.updateRotationY(-90) >-90</button>
	</p>
	<p>
		<input type="range" id="rngRotatationY" min=-180 max=180 step=1  value=0
			oninput=OR.updateRotationY(this.value) title="cursor keys OK" >
	</p>

	<p title="rotation: -180&deg; to 180&deg; around blue line" >
		z-axis <output id=outRotationZ class=floatRight >0</output>&deg; &nbsp;
		<button onclick=OR.updateRotationZ(0) >0</button>
		<button onclick=OR.updateRotationZ(90) >90</button>
		<button onclick=OR.updateRotationZ(180) >180</button>
		<button onclick=OR.updateRotationZ(-90) >-90</button>
	</p>
	<p>
		<input type="range" id="rngRotatationZ" min=-180 max=180 step=1  value=0
			oninput=OR.updateRotationZ(this.value) title="cursor keys OK" >
	</p>

</details>
`;

	// add cursor keys

	return htm;

};



OR.updateRotationX = function (angle) {

	mesh.rotation.x = angle * Math.PI / 180;

	outRotationX.innerHTML = angle;

	mesh.updateMatrix();

};



OR.updateRotationY = function (angle) {

	mesh.rotation.y = angle * Math.PI / 180;

	outRotationY.innerHTML = angle;

	mesh.updateMatrix();

};



OR.updateRotationZ = function (angle) {

	mesh.rotation.z =  angle * Math.PI / 180;

	outRotationZ.innerHTML = angle;

	mesh.updateMatrix();

};


OR.reset = function () {


	rngRotatationX.value = 0;
	outRotationX.innerHTML = 0;

	rngRotatationY.value = 0;
	outRotationY.innerHTML = 0;

	rngRotatationZ.value = 0;
	outRotationZ.innerHTML = 0;

};