

const OR = {};


OR.getMenu = function () {

	window.addEventListener("onresetall", OR.reset, false);

	const htm =
		`
<details open >

	<summary>Object rotation </summary>

	<p title="rotation: -180 to 180" >
		rotation x <output id=outRotationX >0</output><br>
		<input type="range" id="rngRotatationX" min=${ -Math.PI} max=${Math.PI} step=0.1 value=0
			oninput=OR.updateRotationX(this.value)>
	</p>

	<p title="rotation: -180 to 180" >
		rotation y <output id=outRotationY class=floatRight >0</output><br>
		<input type="range" id="rngRotatationY" min=${ -Math.PI} max=${Math.PI} step=0.1 value=0
			oninput=OR.updateRotationY(this.value)>
	</p>

	<p title="rotation: -180 to 180" >
		rotation z <output id=outRotationZ class=floatRight >0</output><br>
		<input type="range" id="rngRotatationZ" min=${ -Math.PI} max=${Math.PI} step=0.1 value=0
			oninput=OR.updateRotationZ(this.value)>
	</p>

</details>
`;

	return htm;

};



OR.updateRotationX = function (angle) {

	mesh.rotation.x = angle;

	outRotationX.innerHTML = ((180 / Math.PI) * angle).toFixed();


	mesh.updateMatrix();

};



OR.updateRotationY = function (angle) {

	//console.log('a', angle );

	mesh.rotation.y = angle;

	outRotationY.innerHTML = ((180 / Math.PI) * angle).toFixed();

	//console.log('', mesh.rotation.z);

	mesh.updateMatrix();

};



OR.updateRotationZ = function (angle) {

	//console.log('a', angle );

	mesh.rotation.z = angle;

	outRotationZ.innerHTML = ((180 / Math.PI) * angle).toFixed();

	//console.log('', mesh.rotation.z);

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