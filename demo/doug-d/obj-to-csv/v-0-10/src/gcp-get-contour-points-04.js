// copyright Theo Armour. MIT license.
/* global THREE, MMS, GCOdivToggles, GCOchkLabels, drawPlacard, GCOdivMessage, GCOchkPoints,
GCOrngContoursCount, GCOoutContourCount, GCOrngContourPosition, GCOoutContourPosition, GCOdivStatsNew,
scene, mesh, meshPlane */
// jshint esversion: 6
// jshint loopfunc: true

const GCP = {};

GCP.constant = 1;


GCP.reset = function () {

	scene.remove(GCP.pointsIsolines);

	GCP.verticesIsolines = [];
	GCP.verticesIsoline = new THREE.Geometry();

	GCP.pointsIsolines = new THREE.Group();
	scene.add(GCP.pointsIsolines);


	GCP.facesIsolines = [];


};


GCP.getIntersectionPoints = function (constant = 1) {

	const normal = new THREE.Vector3(0, 0, -1);
	const plane = new THREE.Plane(normal, constant);

	// const a = new THREE.Vector3();
	// const b = new THREE.Vector3();
	// const c = new THREE.Vector3();

	const meshes = mesh.geometry ? [mesh] : mesh.children;

	GCP.verticesIsoline = new THREE.Geometry();
	GCP.facesIsoline = [];

	count = 0;

	for (let mesh of meshes) {

		//mesh.geometry = new THREE.Geometry().fromBufferGeometry(mesh.geometry);

		// mesh.geometry =
		// 	mesh.geometry.type === "BufferGeometry" ?
		// 		new THREE.Geometry().fromBufferGeometry(mesh.geometry)
		// 		: mesh.geometry;

		if ( mesh.geometry.isBufferGeometry ) {

			mesh.geometry = new THREE.Geometry().fromBufferGeometry( mesh.geometry );

		}
		mesh.geometry.faces.forEach(function (face, idx) {

			//mesh.localToWorld(a.copy(mesh.geometry.vertices[face.a]));
			//mesh.localToWorld(b.copy(mesh.geometry.vertices[face.b]));
			//mesh.localToWorld(c.copy(mesh.geometry.vertices[face.c]));

			// const lineAB = new THREE.Line3(a, b);
			// const lineBC = new THREE.Line3(b, c);
			// const lineCA = new THREE.Line3(c, a);

			GCP.intersections = [];
			GCP.index = [];

			// a = face.a;
			// b = face.b;
			// c = face.c;
			GCP.setPointOfIntersection( face.a, face.b, plane, idx);
			GCP.setPointOfIntersection( face.b, face.c, plane, idx);
			GCP.setPointOfIntersection( face.c, face.a, plane, idx);

			if (GCP.intersections.length) {

				GCP.facesIsoline.push( { idx, intersections: GCP.intersections, index: GCP.index})
			}


		});

		GCO.countFaces = mesh.geometry.faces.length;
		GCO.countVertices = mesh.geometry.vertices.length;

	}

	GCP.verticesIsolines.push(GCP.verticesIsoline.vertices);

	GCP.facesIsolines.push(GCP.facesIsoline);

	//console.log('GCP.facesIsolines', GCP.facesIsolines);

	GCP.addPointsIsoline(GCP.verticesIsoline.vertices);

	//requestAnimationFrame( () => GCP.addPointsIsoline( GCP.verticesIsoline.vertices ) );

};



GCP.setPointOfIntersection = function (idx1, idx2, plane, faceIdx) {

	const p1 = new THREE.Vector3();
	const p2 = new THREE.Vector3();
	mesh.localToWorld( p1.copy(mesh.geometry.vertices[ idx1]));
	mesh.localToWorld(p2.copy(mesh.geometry.vertices[ idx2]));

	const line = new THREE.Line3( p1, p2 );
	GCP.pointOfIntersection = plane.intersectLine(line, new THREE.Vector3());

	if (GCP.pointOfIntersection) {

		let p = GCP.pointOfIntersection.clone();
		//p.faceIndex = faceIdx;
		//p.checked = false;

		GCP.verticesIsoline.vertices.push(p);

		GCP.intersections.push(p);
		GCP.index.push([ idx1, idx2 ] );

		//GCP.index.push([ idx1, idx2 ] );

		//console.log('pp', p);

	}

};


GCP.addPointsIsoline = function () {

	const geometry = new THREE.Geometry();
	geometry.vertices = GCP.verticesIsoline.vertices;
	const pointsMaterial = new THREE.PointsMaterial({ size: 1, color: 0x00ff00 });

	const points = new THREE.Points(geometry, pointsMaterial);
	//console.log('points', points);

	GCP.pointsIsolines.add(points);

};