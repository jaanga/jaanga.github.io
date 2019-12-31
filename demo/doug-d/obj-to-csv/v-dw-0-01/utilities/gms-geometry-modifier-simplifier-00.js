
//	Simplification Geometry Modifier
//    - based on code and technique
//	  - by Stan Melax in 1998
//	  - Progressive Mesh type Polygon Reduction Algorithm
// http://www.melax.com/polychop/

cont = GMS = {};

GMS.simplified = undefined;

GMS.reductionPercent = 80;

GMS.getMenu = function () {

	const htm =
		`
<details ontoggle=GMS.getScript() >
	<summary>Geometry simplify</summary>

	<p>Progressive Mesh type Polygon Reduction Algorithm</p>

	<p>
		% of existing to delete: <output id=GMSoutReductionPercent>${GMS.reductionPercent}</output>%<br>
		<input type="range" id="GMSrngReductionPercent" min=0 max=100 step=1 value=${GMS.reductionPercent}
		oninput="GMS.setReductionPercent();" >
	</p>
	<p>
		<button onclick=GMS.simplify() >simplify</button>

		<button onclick=GMS.simplifiedToMesh() >switch</button>

	</p>

	<p>
		<button onclick=GMS.simplified.material.wireframe=mesh.material.wireframe=!mesh.material.wireframe; >both wireframe</button>
		<button onclick=GMS.toggleFlatShading() >both flatShading</button>
	</p>

	<div id=GMSdivStats ></div>

</details>
		`;

	return htm;
}


GMS.getScript = function () {

	if (!GMS.simplifier) {

		GMS.simplifier = document.body.appendChild(document.createElement('script'));;
		GMS.simplifier.src = "https://cdn.jsdelivr.net/gh/mrdoob/three.js@r110/examples/js/modifiers/SimplifyModifier.js";

	}

	//console.log('GMS.simplifier', GMS.simplifier);

};


GMS.setReductionPercent = function () {

	GMS.reductionPercent = Number(GMSrngReductionPercent.value)
	GMSoutReductionPercent.value = GMS.reductionPercent;

};

GMS.getStats = function () {

	const htm =
		`
<p>mesh<br>
- vertices: ${ mesh.geometry.vertices.length.toLocaleString()}<br>
- faces: ${ mesh.geometry.faces.length.toLocaleString()}<br>
</p>
<p>simplified<br>
- vertices: ${ GMS.simplified.geometry.vertices.length.toLocaleString()}<br>
- faces: ${ GMS.simplified.geometry.faces.length.toLocaleString()}<br>
</p>
`;
	return htm;

}

GMS.simplify = function () {

	scene.remove( GMS.simplified );

	if ( mesh.geometry.isBufferGeometry ) {

		mesh.geometry = new THREE.Geometry().fromBufferGeometry( mesh.geometry );

	}

	const geometry = mesh.geometry.clone();
	geometry.computeFaceNormals();
	geometry.mergeVertices();
	geometry.computeVertexNormals();

	const material = new THREE.MeshNormalMaterial({ side: 2 });

	GMS.simplified = new THREE.Mesh( geometry, material);

	var count = Math.floor(GMS.simplified.geometry.vertices.length * GMS.reductionPercent / 100 ); // number of vertices to remove
	console.log('count', count);

	modifier = new THREE.SimplifyModifier();
	GMS.simplified.geometry = modifier.modify(GMS.simplified.geometry, count);
	GMS.simplified.geometry = new THREE.Geometry().fromBufferGeometry( GMS.simplified.geometry );
	GMS.simplified.material = new THREE.MeshNormalMaterial({ side: 2 });
	GMS.simplified.material.flatShading = true;


	GMS.simplified.position.x = 50;
	scene.add( GMS.simplified );

	GMSdivStats.innerHTML = GMS.getStats();

}

GMS.simplifiedToMesh = function () {

	scene.remove(mesh);

	mesh = GMS.simplified.clone();
	mesh.position.set( 0, 0, 0 )

	scene.add( mesh )
};


GMS.toggleFlatShading = function () {

	//GMS.simplified.material.flatShading = !GMS.simplified.material.flatShading;
	//GMS.simplified.material.needsUpdate = true

	mesh.material.flatShading = !mesh.material.flatShading
	mesh.material.needsUpdate = true;

}