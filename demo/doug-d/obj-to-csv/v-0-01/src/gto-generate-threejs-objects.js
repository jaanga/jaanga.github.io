
const GTO = {}

GTO.geometries = [

	["Box", 20, 20, 50 ],
	["Cone", 30, 60, 30],
	["Cylinder", 15, 30, 60, 20 ],
	["Sphere", 50, 50, 20 ],
	["Tetrahedron", 50],
	["Dodecahedron", 50, 0],
	["Icosahedron", 50, 0],
	["Octahedron", 50, 0],
	["Torus", 40, 10, 12, 32 ],
	["TorusKnot", 50, 18, 64, 24 ]
];


GTO.getMenu = function () {

	const gto = GTO.geometries.map( ( geometry, index ) =>
		`<option>${ geometry[ 0 ] }</option>`
	).join( "" );

	const htm =
		`
<details open >

	<summary>Generate Three.js objects</summary>

	<p>
		<select onchange=GTO.drawGeometry(this.selectedIndex) size=8 >${ gto }</select>
	</p>

</details>
	`;

	return htm;

}


GTO.drawGeometry = function ( index ) {

	window.dispatchEvent(eventResetAll);

	scene.remove( mesh );

	const items = GTO.geometries[ index ];
	const geometry = new THREE[ items.shift() + "Geometry" ]( ...items );
	const material = new THREE.MeshNormalMaterial( { opacity: 0.85, side:2, transparent: true });

	mesh = new THREE.Mesh(geometry, material);

	scene.add(mesh);


}
