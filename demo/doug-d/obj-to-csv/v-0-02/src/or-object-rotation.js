

const OR = {};


OR.getMenu = function () {

	window.addEventListener( "onresetall", OR.reset, false );

	const htm =
		`
<details open >

	<summary>Object rotation </summary>

	<p title="rotation: -180 to 180" >
		rotation x <output id=outRotationX >0</output><br>
		<input type="range" id="rngRotatationX" min=${ -Math.PI } max=${ Math.PI } step=0.1 value=0
			oninput=OR.updateRotationX(this.value)>
	</p>

	<p title="rotation: -180 to 180" >
		rotation z <output id=outRotationZ class=floatRight >0</output><br>
		<input type="range" id="rngRotatationZ" min=${ -Math.PI } max=${ Math.PI } step=0.1 value=0
			oninput=OR.updateRotationZ(this.value)>
	</p>

</details>
`

	return htm;


}



OR.updateRotationX = function ( angle ) {

	mesh.rotation.x = angle;

	outRotationX.innerHTML = ((180 / Math.PI) * angle).toFixed();

	mesh.traverse(child => {

		if (child.type === "Mesh") {
		//console.log('child', child);
	geometry = child.geometry;
	geometry.verticesNeedUpdate = true;
	geometry.elementsNeedUpdate = true;
	geometry.morphTargetsNeedUpdate = true;
	geometry.uvsNeedUpdate = true;
	geometry.normalsNeedUpdate = true;
	geometry.colorsNeedUpdate = true;
	geometry.tangentsNeedUpdate = true;


		}


	} );


	mesh.updateMatrix();

}


OR.updateRotationZ = function ( angle ) {

	//console.log('a', angle );

	mesh.rotation.y = angle;

	outRotationZ.innerHTML = ( (180 / Math.PI) * angle ).toFixed();

	//console.log('', mesh.rotation.z);

	mesh.updateMatrix();

}


OR.reset = function () {



}