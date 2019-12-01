

const OR = {};


OR.getMenu = function () {

	window.addEventListener("onresetall", OR.reset, false);

	const htm =
		`
<details open >

	<summary>Object rotation </summary>

	<p>Rotate the model around the origin.</p>

	<p title="rotation: -180 to 180" >
		rotation x <output id=outRotationX >0</output><br>
		<input type="range" id="rngRotatationX" min=-180 max=180 step=1 value=0
			oninput=OR.updateRotationX(this.value)>
	</p>

	<p title="rotation: -180 to 180" >
		rotation y <output id=outRotationY class=floatRight >0</output><br>
		<input type="range" id="rngRotatationY" min=-180 max=180 step=1  value=0
			oninput=OR.updateRotationY(this.value)>
	</p>

	<p title="rotation: -180 to 180" >
		rotation z <output id=outRotationZ class=floatRight >0</output><br>
		<input type="range" id="rngRotatationZ" min=-180 max=180 step=1  value=0
			oninput=OR.updateRotationZ(this.value)>
	</p>

</details>
`;

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