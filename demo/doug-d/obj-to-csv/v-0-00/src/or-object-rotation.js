

const OR = {};


OR.getMenu = function() {

	const htm =
		`
<details>

	<summary>Object rotation </summary>


	<p title="opacity: 0 to 100%" >
		opacity <output id=outOpacity class=floatRight >85%</output><br>
		<input type="range" id="rngOpacity" min=0 max=100 step=1 value=85 oninput="mesh.material.opacity= 0.01 * this.value";" >
	</p>

</details>
`

	console.log('', htm);

	return htm;

}