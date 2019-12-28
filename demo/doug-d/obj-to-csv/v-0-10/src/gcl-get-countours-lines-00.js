

const GCL = {};

GCL.tolerance = 0.001;

THREE.Vector3.prototype.equals = function (v, tolerance) {

	if (tolerance === undefined) {
		return v.x === this.x && v.y === this.y && v.z === this.z;
	} else {
		return (
			Math.abs(v.x - this.x) < tolerance &&
			Math.abs(v.y - this.y) < tolerance &&
			Math.abs(v.z - this.z) < tolerance
		);
	}

};



GCL.getMenu = function () {

	const htm =

		`
<details id-getGCL open>

<summary>Get contour lines </summary>

<p>
<button onclick=GCL.getContourLines(); >get contour lines </button>


</p>
</details>

`;

return htm;
}


GCL.getContourLines = function () {

	//console.log('', GCP.facesIsolines);

	index = 0;

	for (isoline of GCP.facesIsolines) {

		console.log('\nindex', ++ index );
		GCL.isoline = isoline;
		GCL.getIsoline(isoline);

	}

};


GCL.getIsoline = function (isoline) {

	const face1 = isoline[0];

	console.log('face1', face1 );

	GCL.vertices = [face1.intersections[0], face1.intersections[1]];

	GCL.index = [face1.index[0].join(), face1.index[1].join()];

	console.log('ind', GCL.index );

	obj = { face: face1, vertexNext: face1.intersections[1] }

	GCL.getNextObj(obj);

};



GCL.getNextObj = function (obj) {
	//console.log('obj', obj);

	let objNew = GCL.getNextFace(obj.vertexNext);
	//console.log('objNew', objNew);

	if (objNew.vertexNext) {

		GCL.vertices.push(objNew.vertexNext);
		GCL.index.push(objNew.index);

		const oo = { face: objNew.face, vertexNext: objNew.vertexNext }
		GCL.getNextObj(oo)

	} else {

		console.log('\nvertices\n', GCL.vertices[ 0 ], GCL.vertices[ 1 ],  GCL.vertices[ 2 ],  GCL.vertices[ 3 ]);

		GCL.addLine(GCL.vertices);

	}

};

GCL.getNextFace = function (vertex) {

	console.log('next face vertex', vertex);

	let vertexNext;
	let index;
	let face;
	i = 0;

	for (face of GCL.isoline) {

		i++;

		if ( i === 10) { break }

		if (face.intersections[0].equals(vertex, GCL.tolerance) && !GCL.index.includes( face.index[1].join() ) ) {

			console.log('00', face.intersections[0].equals(vertex, GCL.tolerance));
			console.log('iiii0',  !GCL.index.includes(  !GCL.index.includes( face.index[1].join() ) ));
			console.log(i, 'face', face,  face.index[1]);
			vertexNext = face.intersections[1];
			console.log('newvertexNext', vertexNext);
			index = face.index[1].join();
			console.log('index', index);
			break;

		} else if ( face.intersections[1] ===  vertex  && !GCL.index.includes( face.index[0].join() ) ) {

			console.log('11', face.intersections[1].equals(vertex, GCL.tolerance));
			console.log('iii', !GCL.index.includes(face.index[0]));
			console.log(i, 'face', face);

			vertexNext = face.intersections[0];
			console.log('newvertexNext', vertexNext);
			index = face.index[0].join();
			console.log('index', index);
			break;

		}

	}

	//console.log(i, 'face', face);
	return { face, vertexNext, index };

};



GCL.addLine = function (vertices) {

	console.log('vertices.length', vertices.length);
	console.log('vertices', vertices);

	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;

	const material = new THREE.LineBasicMaterial({ color: "red" });
	const line = new THREE.Line(geometry, material);

	scene.add(line);

};
