// copyright 2019 Theo Armour. MIT license.
// 2019-11-27 v0.00.00


const DLM = {};


DLM.getMenu = function () {

	const htm =
		`
<details>

	<summary class="sumMenuTitle" >Draw mesh lines</summary>

	<p>Draw the data with on lines that have height and other features</p>

	<p>
		<button onclick=DLM.renderLines() >render lines as mesh</button>
	</p>

	<p title="line width: 1 to 20" >
		line width <output id=DLMoutLineWidth class=floatRight >10</output><br>
		<input type="range" id="DLMrngLineWidth" min=0.2 max=20 step=0.2 value=10 oninput=DLM.renderLines(CFR.contours); >
	</p>

	<p>
		<select id=DLMselSides oninput=DLM.renderLines(CFR.contours); size=3>
			<option >back side</option>
			<option>front side</option>
			<option selected>both sides</option>
		</select>
	</p>
	<p>
		<button onclick=DLM.applyMaterialNormal() >apply color normal</button>
	</p>

	<p>
		<button onclick=DLM.applyMaterialRandom() >apply color random</button>
	</p>

	<p>
		Select ground color: <input type="color" value="#ff00ff" id=DLMselMaterialColor >
	</p>
	<p>
		<button onclick=DLM.applyColorSelected() >apply selected color</button>
	</p>
	<p>
		<button onclick=DLM.applyMaterialTexture() >apply material texture</button>
	</p>

	<div>
		<input type=checkbox id=DLMchkWireframe onchange=DLM.toggleWireframe(); > wireframe
	</div>

	<p title="opacity: 0 to 100%" >
		opacity <output id=outOpacity class=floatRight >85%</output><br>
		<input type="range" id="rngOpacity" min=0 max=100 step=1 value=85 oninput="group.material.opacity= 0.01 * this.value";" >
	</p>


	<p>
		<button onclick=DLM.letsDance() >let's dance</button>
	</p>


</details>

	`;

	return htm;

};



DLM.letsDance = function() {

	light.intensity = 0.1;
	spotLight1 = createSpotlight( 0xFF7F00 );
	spotLight2 = createSpotlight( 0x00FF7F );
	spotLight3 = createSpotlight( 0x7F00FF );
	//lightHelper1, lightHelper2, lightHelper3;

	spotLight1.position.set( 15, 40, 45 );
	spotLight2.position.set( 0, 40, 35 );
	spotLight3.position.set( - 15, 40, 45 );

	lightHelper1 = new THREE.SpotLightHelper( spotLight1 );
	lightHelper2 = new THREE.SpotLightHelper( spotLight2 );
	lightHelper3 = new THREE.SpotLightHelper( spotLight3 );

	scene.add( spotLight1, spotLight2, spotLight3 );
	scene.add( lightHelper1, lightHelper2, lightHelper3 );


	function createSpotlight( color ) {
		var newObj = new THREE.SpotLight( color, 2 );
		newObj.castShadow = true;
		newObj.angle = 0.3;
		newObj.penumbra = 0.2;
		newObj.decay = 2;
		newObj.distance = 0;
		return newObj;
	}

	function animate2() {
		// tween( spotLight1 );
		// tween( spotLight2 );
		// tween( spotLight3 );
		// setTimeout( animate2, 5000 );
		// // console.log( '',23 );
		var time = Date.now() * 0.0005;
		xx = 4;
		spotLight1.position.x = Math.sin( time * 0.7 ) * 30 * xx;
		spotLight1.position.y = Math.cos( time * 0.5 ) * 40 * xx;
		spotLight1.position.z = Math.cos( time * 0.3 ) * 30 * xx;

		spotLight2.position.x = Math.cos( time * 0.3 ) * 30 * xx;
		spotLight2.position.y = Math.sin( time * 0.5 ) * 40 * xx;
		spotLight2.position.z = Math.sin( time * 0.7 ) * 30 * xx;

		spotLight3.position.x = Math.sin( time * 0.7 ) * 30 * xx;
		spotLight3.position.y = Math.cos( time * 0.3 ) * 40 * xx;
		spotLight3.position.z = Math.sin( time * 0.5 ) * 30 * xx;

		if ( lightHelper1 ) lightHelper1.update();
		if ( lightHelper2 ) lightHelper2.update();
		if ( lightHelper3 ) lightHelper3.update();

		requestAnimationFrame( animate2 );
	}
	animate2();


}

DLM.renderLines = function () {

	const v = (x, y, z) => new THREE.Vector3(x, y, z);

	if ( !CSV.contours ) { alert( "First please load a file" ); }

	group.traverse( child => {

		if ( child.isMesh || child.isLine || child.isSprite ) {

			child.geometry.dispose();
			child.material.dispose();

		}

	} );


	scene.remove(group);

	group = new THREE.Group();

	DLMoutLineWidth.value = DLMrngLineWidth.value;

	//const material = new THREE.MeshNormalMaterial( { side: DLMselSides.selectedIndex } );
	const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random(), side: DLMselSides.selectedIndex, specular: 0xffffff } );

	for (let contour of CSV.contours) {

		//console.log('contour', contour);
		width = 0.3 * parseFloat( DLMrngLineWidth.value );

		vertices = contour.map( vertex => new THREE.Vector3().fromArray( vertex.map( coord => parseFloat( coord) ) ) );
		//console.log('vertices', vertices);
		//console.log('', box3);

		if (vertices.length > 2) {

			// box3 = new THREE.Box3().setFromPoints(vertices);
			// center = box3.getCenter( new THREE.Vector3() )
			// plane = new THREE.Plane().setFromCoplanarPoints(vertices[0], center, vertices[vertices.length - 2 ])

			// if (plane.normal.z > 0) {

			// 	console.log('plane', plane);
			// 	vertices.reverse();
			// }

			const cw = THREE.ShapeUtils.isClockWise(vertices);
			//console.log('cw', cw);

			if ( cw === false ) { vertices.reverse() }

			const cw2 = THREE.ShapeUtils.isClockWise(vertices);
			//console.log('cw', cw, cw2 );

		}

		const geometry = new THREE.PlaneGeometry( 10, 10, 1, vertices.length - 1 );


		//const mesh = new THREE.Mesh( geometry, material );

		//const material = new THREE.MeshNormalMaterial();

		mesh = new THREE.Mesh( geometry, material );
		mesh.receiveShadow = true;
		mesh.castShadow = true;
		//console.log('mesh', mesh);


		let j = 0;

		for ( let i = 0; i < vertices.length; i++ ) {

			const vt = vertices[ i ];
			mesh.geometry.vertices[ j++ ] = vt;
			mesh.geometry.vertices[ j++ ] = v( vt.x, vt.y, vt.z + width);

		}


		geometry.computeFaceNormals();
		geometry.computeVertexNormals();
		geometry.computeBoundingBox();
		geometry.computeBoundingSphere();

		geometry.verticesNeedUpdate = true;
		geometry.elementsNeedUpdate = true;
		geometry.morphTargetsNeedUpdate = true;
		geometry.uvsNeedUpdate = true;
		geometry.normalsNeedUpdate = true;
		geometry.colorsNeedUpdate = true;
		geometry.tangentsNeedUpdate = true;

		group.add( mesh );

	}

	scene.add(group);

	//zoomObjectBoundingSphere();

}


DLM.applyMaterialNormal = function () {

	group.traverse(child => {

		if (child.geometry) {

			// var geometry = child.geometry;
			// //console.log('', child, geometry);
			// geometry.verticesNeedUpdate = true;
			// geometry.elementsNeedUpdate = true;
			// geometry.morphTargetsNeedUpdate = true;
			// geometry.uvsNeedUpdate = true;
			// geometry.normalsNeedUpdate = true;
			// geometry.colorsNeedUpdate = true;
			// geometry.tangentsNeedUpdate = true;

		}


		if (child.type === "Mesh") {

			child.material = new THREE.MeshNormalMaterial( { side: DLMselSides.selectedIndex });
			child.material.needsUpdate = true;

		}

	})

}


DLM.applyMaterialRandom = function () {

	group.traverse(child => {

		if (child.type === "Mesh") {

			child.material = new THREE.MeshBasicMaterial({ color: 0xffffff * Math.random(), opacity: 0.85, side: DLMselSides.selectedIndex, transparent: true })
		}

	} )

}

DLM.applyColorSelected = function () {

	const hex = DLMselMaterialColor.value;
	const color = new THREE.Color( hex );

	group.traverse(child => {

		if (child.type === "Mesh") {

			//child.material = new THREE.MeshBasicMaterial( { color: 0xffffff * Math.random(), opacity: 0.85, side: DLMselSides.selectedIndex, transparent: true } )
			child.material = new THREE.MeshPhongMaterial( { color: color, side: DLMselSides.selectedIndex, specular: 0xffffff } );

		}

	} )

}

DLM.applyMaterialTexture = function () {

	url = "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg";

	texture = new THREE.TextureLoader().load(url);


	group.traverse(child => {
		if (child.type === "Mesh") {
			child.material = new THREE.MeshBasicMaterial({ color: 0xdddddd, map: texture, opacity: 0.85, side: DLMselSides.selectedIndex, transparent: true })

		}
	});

}


DLM.toggleWireframe = function () {

	if (!DLM.wireframe) {

		DLM.wireframe = false;

	}

	DLM.wireframe = !DLM.wireframe;

	const groups = group.geometry ? [group] : group.children;

	for (let group of groups) {

		group.material.wireframe = DLM.wireframe

	}

};






DLM.reset = function () {

	scene.remove(edges, boxHelper);

	axesHelper.visible = true;

	DLMchkWireframe.checked = false;
	DLMchkBoxHelper.checked = false;
	DLMchkEdges.checked = false;
	edges = null;
	boxHelper = null;

};
