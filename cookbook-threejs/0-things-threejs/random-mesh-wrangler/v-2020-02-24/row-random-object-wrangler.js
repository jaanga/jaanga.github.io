// copyright 2020 Theo Armour. MIT license.
// See pushme-pullyou/templates-01/modules/template
// 2020-02-13
/* divContent */
// jshint esversion: 6
// jshint loopfunc: true


var ROW = {};



ROW.init = function () {

	ROWdivRandomObjectWrangler.innerHTML = ROW.getMenu();
	ROW.setSelectOptions()

};



ROW.getMenu = function () {

	const htm = `
<details open>

	<summary>
		Random Object Wrangler

		<span class="couponcode">??<span class="coupontooltip">aaa bbb ccc 123 456</span></span>

	</summary>

	<p><button onclick=ROW.resetObjects() >reset objects</button></p>

	<p><button onclick=ROW.wrangleObjects() >wrangle objects</button></p>

	<p><select id=ROWselObjects onchange=ROW.selectObject() size=20 ></select></p>

	<p>
		X: <output id=ROWoutPosX >0</output>
		<input type="range" id="ROWinpPosX" max=250 oninput=ROW.editObject() />
	</p>

	<p>
		Y: <output id=ROWoutPosY>0</output>
		<input type="range" id="ROWinpPosY" max=250 oninput=ROW.editObject() />
	</p>

	<p>
		Z: <output id=ROWoutPosZ>0</output>
		<input type="range" id="ROWinpPosZ" max=250 oninput=ROW.editObject() />
	</p>

	<div id=ROWdivMessage ></div>

</details>`;

	return htm;

};



ROW.resetObjects = function () {

	console.log( 'group', group );

	group.children.forEach( child => {

		child.position.copy( new THREE.Vector3() );

		child.rotation.set( 0, 0, 0 );

		child.scale.set( 1, 1, 1 );

	} );

};


ROW.wrangleObjects = function () {

	let x = 0;
	let y = 0
	group.children.forEach( ( child, i ) => {

		x = i % 10 === 0 ? 0 : x + 25;
		child.position.x = x

		y = i % 10 === 0 ? y + 25 : y;
		child.position.y = y



	} );

};

ROW.setSelectOptions = function () {

	options = group.children.map( ( child, i ) => `<option>object ${ i + 1 }</option>` );

	ROWselObjects.innerHTML = options;

};



ROW.selectObject = function () {

	if ( ROW.selected ) { ROW.selected.scale.set( 1, 1, 1 ); }

	index = ROWselObjects.selectedIndex;

	ROW.selected = group.children[ index ]

	ROW.selected.position.z += 28;

	ROWinpPosX.value = ROW.selected.position.x;

	ROWinpPosY.value = ROW.selected.position.y;

	ROW.selected.scale.set( 1, 1, 3 )

};



ROW.editObject = function () {

	//if ( ROW.selected ) { ROW.selected.scale.set( 1, 1, 1 ); }

	index = ROWselObjects.selectedIndex;

	ROW.selected = group.children[ index ]

	ROW.selected.position.x = ROWinpPosX.value;

	ROW.selected.position.y = ROWinpPosY.value;

	ROW.selected.position.z = ROWinpPosZ.value;

};
