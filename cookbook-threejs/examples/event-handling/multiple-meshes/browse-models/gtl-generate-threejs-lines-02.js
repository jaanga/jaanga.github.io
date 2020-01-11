

// https://github.com/jaanga/jaanga.github.io/tree/master/cookbook-threejs/examples/geometry/lines/generate-threejs-lines


const GTL = {};

GTL.lines = undefined;

GTL.getMenu = function () {

	const htm =
`
<details>

	<summary title="source: gtl-generate-threejs-lines-01.js" >Generate Three.js Lines</summary>

	<p>
		<button onclick="GTL.addSquare()" >addSquare</button> <button onclick="GTL.addSquare(5)" >5</button> <button onclick="GTL.addSquare(50)" >50</button>
	</p>

	<p>
		<button onclick="GTL.addPolygon()" >addPolygon</button>
		<button onclick="GTL.addPolygon(3)" >3</button>
		<button onclick="GTL.addPolygon(4)" >4</button>
		<button onclick="GTL.addPolygon(6)" >6</button>
		<button onclick="GTL.addPolygon(8)" >8</button>
		<button onclick="GTL.addPolygon(24)" >24</button>
	</p>

	<p>
		<button onclick="GTL.addSpiral()" >addSpiral</button>
		<button onclick="GTL.addSpiral(3)" >3</button>
		<button onclick="GTL.addSpiral(4)" >4</button>
		<button onclick="GTL.addSpiral(6)" >6</button>
		<button onclick="GTL.addSpiral(8)" >8</button>
		<button onclick="GTL.addSpiral(24)" >24</button>
	</p>

	<p>
		<button onclick=GTL.updateColorRandom(); >update color random</button>
	</p>

	<p>
		<button onclick=GTL.updateColorByVertexRandom(); >update color by vertex random</button>
	</p>

	<p>
		<button onclick=GTL.updateColorByVertexSpectrum(); >update color by vertex Spectrum</button>
	</p>

	<p>
		<button onclick=GTL.getNormal() >get normal</button>

		<button onclick=GTL.reverseNormal() >reverse normal</button>
	</p>
	<hr>
</details>
`;

	return htm;
};




GTL.reset = function() {

	scene.remove( GTL.lines );

	GTL.lines = new THREE.Group();

	scene.add( GTL.lines );

}



GTL.addSquare = function (size = 20) {

	GTL.reset();

	const v = (x, y, z) => new THREE.Vector3(x, y, z);

	const vertices = [v(size, size, 0), v(size, -size, 0),
	v(-size, -size, 0), v(-size, size, 0)];

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;

	const material = new THREE.LineBasicMaterial({ color: 0x000000 });
	const line = new THREE.LineLoop(geometry, material);

	GTL.lines.add(line);

	return line;

};



GTL.addPolygon = function (sides = 5, size = 20) {

	GTL.reset();

	const v = (x, y, z) => new THREE.Vector3(x, y, z);

	const vertices = [];

	const delta = 2 * Math.PI / sides;

	for (let i = 0; i < sides; i++) {

		vertices.push(v(size * Math.cos(i * delta), size * Math.sin(i * delta), 0))

	}

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;

	const material = new THREE.LineBasicMaterial({ color: 0x000000 });
	const line = new THREE.LineLoop(geometry, material);

	GTL.lines.add(line);

	return line;

};


GTL.addSpiral = function (sides = 5, size = 20, turns = 10) {

	GTL.reset();

	const v = (x, y, z) => new THREE.Vector3(x, y, z);

	const vertices = [];

	const delta = 2 * Math.PI / sides;

	for (let i = 0; i < sides * turns; i++) {

		vertices.push(v(size * Math.cos(i * delta), size * Math.sin(i * delta), 5 * i /sides ))

	}

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices; //.reverse();

	const material = new THREE.LineBasicMaterial({ color: 0x000000 });
	const line = new THREE.Line(geometry, material);

	GTL.lines.add(line);

	return line;

};



GTL.updateColorRandom = function () {

	GTL.lines.children.forEach(line => line.material.color.set(0xffffff * Math.random()))

};



GTL.updateColorByVertexRandom = function () {

	GTL.lines.children.forEach(line => {

		const vertices = line.geometry.vertices;

		GTL.lines.remove(line);

		const geometry = new THREE.Geometry();
		geometry.vertices = vertices;

		for (let i = 0; i < geometry.vertices.length; i += 2) {

			geometry.colors[i] = new THREE.Color(0xffffff * Math.random());
			geometry.colors[i + 1] = geometry.colors[i];

		}

		const material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

		const lineNew = line.type === "Line" ? new THREE.Line(geometry, material) : new THREE.LineLoop(geometry, material);;

		//console.log('', lineNew);

		GTL.lines.add(lineNew);

	});

};



GTL.updateColorByVertexSpectrum = function () {

	GTL.lines.children.forEach(line => {

		const vertices = line.geometry.vertices;

		GTL.lines.remove(line);

		const geometry = new THREE.Geometry();
		geometry.vertices = vertices;

		for (let i = 0; i < geometry.vertices.length; i += 2) {

			geometry.colors[i] = new THREE.Color().setHSL( i / geometry.vertices.length, 0.8, 0.5);
			geometry.colors[i + 1] = geometry.colors[i];

		}

		const material = new THREE.LineBasicMaterial({ vertexColors: THREE.VertexColors });

		const lineNew = line.type === "Line" ? new THREE.Line(geometry, material) : new THREE.LineLoop(geometry, material);;

		//console.log('', lineNew);

		GTL.lines.add(lineNew );

	});

};



GTL.getNormal = function() {

	const points = GTL.lines.children[0].geometry.vertices;

	const plane = GTL.getPlane(points);

	const normal = plane.normal;

	console.log('plane', plane, '\nnormal', normal);

};

GTL.reverseNormal = function() {

	//const geometry = GTL.lines.children[0].geometry;

	const points = GTL.lines.children[0].geometry.vertices.reverse();

	const plane = GTL.getPlane(points);

	//const normal = plane.normal;

	console.log('plane', plane, '\nnormal', plane.normal);

};



GTL.getPlane = function( points, start = 0 ) {
	//console.log( 'points', points, start );

	if ( points.length - start - 2 <= 0 ) { return }

	const triangle = new THREE.Triangle();

	triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );
	//console.log('triangle', triangle, triangle.getArea());

	if ( triangle.getArea() === 0 && ( ++start < points.length - 2 ) ) { // looks like points are colinear and do not form a plane therefore try next set of points

		GTL.getPlane( points, start );

	}

	return triangle.getPlane( new THREE.Plane() );

};