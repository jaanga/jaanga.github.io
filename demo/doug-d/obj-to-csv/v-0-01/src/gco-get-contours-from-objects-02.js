const GCO = {};

GCO.length = 3;
let limit = 1;

let plane;
let points;


let contour;
let contours = new THREE.Group();
let pointsOfIntersection;
let contourGroup;

GCO.tolerance = 0.001;

GCO.contourPoints = new THREE.Group();
GCO.contourSegments = new THREE.Group();
GCO.contourLines = new THREE.Group();

THREE.Vector3.prototype.equals = function(v, tolerance) {

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




GCO.getMenu = function () {

	window.addEventListener( "onresetall", GCO.reset, false );

	const htm =
		`
<details open>

	<summary>Get contour points</summary>

	<p>
		<button id="pressMe" onclick=GCO.getContourPoints(); ><b>get points</b></button>
	</p>

	number of contours <output id=GCOoutContourCount >${ GCO.length }</output><br>
	<input type="range" id="GCOrngContoursCount" min=1 max=256 step=1 value=${ GCO.length } oninput="GCO.reset();GCO.length=this.value;GCOoutContourCount.innerHTML=this.value;" >
</p>
</details>
`;

	return htm;

};


GCO.reset = function () {

	scene.remove( GCO.contourPoints, GCO.contourSegments, GCO.contourLines )

}


GCO.getContourPoints = function () {

	GCO.contourPoints = new THREE.Group();
	GCO.contourSegments = new THREE.Group();
	GCO.contourLines = new THREE.Group();

	scene.add(GCO.contourPoints);
	scene.add(GCO.contourSegments);
	scene.add(GCO.contourLines);

	//mesh.updateMatrix();

	const box3 = new THREE.Box3().setFromObject( mesh );
	const size = box3.getSize(new THREE.Vector3());
	const delta = size.z / GCO.length;

	//console.log('box3', box3);

	for ( let i = 0; i < GCO.length; i++ ) {

		const constant = i * delta + box3.min.z;

		GCO.getPoints(constant);

		//add requestAnimationFrame

	}

	GCO.getContourVertices();

}


GCO.getPoints = function (constant = 0) {

	//console.log('constant', constant);

	GCO.pointsOfIntersection = new THREE.Geometry();
	GCO.contourSegment = new THREE.Group;

	const normal = new THREE.Vector3(0, 0, 1);

	const plane = new THREE.Plane( normal, constant + 1 )

	const a = new THREE.Vector3();
	const b = new THREE.Vector3();
	const c = new THREE.Vector3();

	meshes = mesh.geometry ? [mesh] : mesh.children;

	for ( let child of meshes) {

		//console.log('child', child);

		child.geometry = child.geometry.type === "BufferGeometry" ?
			new THREE.Geometry().fromBufferGeometry(child.geometry) : child.geometry;

		child.geometry.faces.forEach(function (face, idx) {

			child.localToWorld(a.copy(child.geometry.vertices[face.a]));
			child.localToWorld(b.copy(child.geometry.vertices[face.b]));
			child.localToWorld(c.copy(child.geometry.vertices[face.c]));

			const lineAB = new THREE.Line3(a, b);
			const lineBC = new THREE.Line3(b, c);
			const lineCA = new THREE.Line3(c, a);

			GCO.vertices = [];

			GCO.setPointOfIntersection(lineAB, plane, idx );
			GCO.setPointOfIntersection(lineBC, plane, idx );
			GCO.setPointOfIntersection(lineCA, plane, idx );

			if (GCO.vertices.length) {

				//console.log('vertices', GCO.vertices);
				line = GCO.addLine(GCO.vertices);
				GCO.contourSegment.add( line );
			}

		});
	}

	const pointsMaterial = new THREE.PointsMaterial({size: 3, color: 0xffffff * Math.random() });
	const points = new THREE.Points(GCO.pointsOfIntersection, pointsMaterial);

	GCO.contourPoints.add(points);
	//console.log('GCO.contourPoints', GCO.contourPoints );
	GCO.contourSegments.add(GCO.contourSegment );



}


GCO.setPointOfIntersection = function (line, plane, index ) {

	const pointOfIntersection = plane.intersectLine(line, new THREE.Vector3());

	if (pointOfIntersection) {

		GCO.pointsOfIntersection.vertices.push(pointOfIntersection.clone());
		GCO.vertices.push(pointOfIntersection);

	}

};


GCO.addLine = function( vertices ) {

	// const v = function (x, y, z) { return new THREE.Vector3(x, y, z); };
	const geometry = new THREE.Geometry();
	geometry.vertices = vertices || [ v( -10, 0, 0 ),  v( 0, 10, -10 ), v( 10, 0, 0 ) ];
	const material = new THREE.LineBasicMaterial( { color: 0x000000 } );
	const line = new THREE.Line( geometry, material );

	//GCO.contourLine.add( line );
	return line;

}



GCO.getContourVertices = function () {

	for ( let contourLine of GCO.contourSegments.children.slice( 1 ) ) {
	//contourLine = GCO.contourSegments.children[1];

	const lines = contourLine.children;
	//console.log('lines', lines);

		GCO.linesLength = lines.length;

		const line0 = lines[0];

		if (!line0) { continue; }

		const verticesContour = line0.geometry.vertices;
		//console.log('verticesContour', verticesContour );

		GCO.getNextVertex( verticesContour[ 1 ], verticesContour, lines.slice(1) );

	}

}



GCO.getNextVertex = function (vertex, vertices, lines) {

	//console.log('vertex', vertex);

	for ( let line of lines) {

		const verticesLine = line.geometry.vertices;
		//console.log('verticesLine', verticesLine);

		const vertexFound = verticesLine.find( vertexLine => vertexLine.equals( vertex, GCO.tolerance ))

		if (vertexFound) {

			//console.log("verticesLine", verticesLine);
			//console.log("vertexFound", vertexFound);

			const vertexNext = verticesLine.find( vertex => vertex !== vertexFound )
			//console.log('vertexNext', vertexNext);

			const index = lines.indexOf(line);
			//console.log({ index })

			vertices.push(vertexNext);
			//console.log('vertices', vertices);

			lines.splice(index, 1);

			if (vertices.length <= GCO.linesLength ) {

				GCO.getNextVertex(vertexNext, vertices, lines);

			} else {

				line = GCO.addLine(vertices);

				line.material = new THREE.LineBasicMaterial({ color: 0xff0000 });

				GCO.contourLines.add(line);

			}

			break;
			
		} else {

			if ( vertex.equals( vertices[ 0 ], GCO.tolerance ) ) {

				console.log('', vertex, vertices[0], vertices.length, lines.length);

				const line = GCO.addLine(vertices);

				line.material = new THREE.LineBasicMaterial({ color: 0xff0000 });

				GCO.contourLines.add(line);

				const line0 = lines[0];

				if (!line0) { continue; }

				const verticesContour = line0.geometry.vertices;
				//console.log('verticesContour', verticesContour );

				GCO.getNextVertex( verticesContour[ 1 ], verticesContour, lines.slice(1) );

				break;
			}

		}

	}

}