// copyright Theo Armour. MIT license.
// 2019-12-26 v00
/* global THREE, MMS, GCTdivToggles, GCTchkLabels, drawPlacard, GCTdivMessage, GCTchkPoints,
GCTrnGCTntoursCount, GCToutContourCount, GCTrnGCTntourPosition, GCToutContourPosition, GCTdivStatsNew,
scene, mesh, meshPlane */
// jshint esversion: 6
// jshint loopfunc: true


const GCT = {};

//GCT.contourPoints = undefined;

GCT.getMenu = function() {


	window.addEventListener("onresetall", GCT.reset, false);

	const htm =

	`
	<details id=detGCT open >

	<summary id=GCTdivToggles >Contour display settings</summary>

	<div>
		<input type=checkbox onchange="mesh.visible=!mesh.visible" checked >
		OBJ model
	</div>
	<div>
		<input type=checkbox onchange="GCL.contourLines.visible=!GCL.contourLines.visible" checked >
		contour lines
	</div>
	<div title="Zoom way in in order to view the points" >
		<input type=checkbox id=GCTchkPoints onchange=GCT.toggleContourPoints() checked >
		contour points
	</div>
	<div title="Display start (red) and end (blue) of each polyline" >
		<input type=checkbox id=GCTchkClosed onchange=GCT.toggleClosed() checked >
		polylines start and end
	</div>
	<div title=Show very tiny line segments" >
		<input type=checkbox id=GCTchkShortPolylines onchange="GCT.toggleShortPolylines();" checked >
		very short polylines <span id=GCTspnShortPolylines ></span>
	</div>
		<div title="" >
		<input type=checkbox id=GCTchkMultiplePolylines onchange="GCT.toggleMultiplePolylines();" checked >
		contours w/ > 1 polylines <span id=GCTspnMultiplePolylines ></span>
	</div>
	</div>
	<div title="" >
		<input type=checkbox id=GCTchkClosedPolylines onchange="GCT.toggleClosedPolylines();" checked >
		closed polylines<span id=GCTspnClosedPolylines ></span>
	</div>

	<div title="" >
		<input type=checkbox id=GCTchkClockwise onchange="GCT.toggleClockwise();" checked >
		clockwise or not<span id=GCTspnClockwise ></span>
	</div>

	<div title="Display tags with the elevation of each contour" >
		<input type=checkbox id=GCTchkLabels onchange="GCT.toggleLabels()" >
		level labels
	</div>

	</details>

	<hr>
	`;

	return htm;

};


GCT.reset = function () {

	scene.remove(GCT.contourPoints, GCT.labels);

	GCT.contourPoints = new THREE.Group();
	GCT.labels = new THREE.Group();

	scene.add(GCT.contourPoints);
	scene.add(GCT.labels);

	const checkBoxes = detGCT.querySelectorAll("input");

	checkBoxes.forEach(box => box.checked = true);

	//GCTchkPoints.checked = false;
	GCTchkLabels.checked = false;
	GCTchkClosed.checked = false;
	GCTchkShortPolylines.checked = false;
	GCTchkMultiplePolylines.checked = false;
	GCTchkClosedPolylines.checked = false;
	GCTchkClockwise.checked = false;


}


GCT.addPointsIsoline = function (vertices) {


	const geometry = new THREE.Geometry();
	geometry.vertices = vertices;

	const pointsMaterial = new THREE.PointsMaterial({ size: 1, color: 0x00ff00 });

	const points = new THREE.Points(geometry, pointsMaterial);
	// //console.log('points', points);

	GCT.pointsIsolines.add(points);



};


GCT.toggleContourPoints = function () {

	if (GCP.pointsIsolines.children.length === 0) {

		const geometry = new THREE.Geometry();
		geometry.vertices = GCO.points;

		const pointsMaterial = new THREE.PointsMaterial({ size: 0.5, color: 0x00ff00 });

		const points = new THREE.Points(geometry, pointsMaterial);
		// //console.log('points', points);

		GCT.contourPoints.add(points);

		GCT.contourPoints.visible = false;

	}

	GCP.pointsIsolines.visible = !GCP.pointsIsolines.visible;

};


GCT.toggleClosed = function () {

	if (GCO.closed.children.length === 0) {

		GCO.contourLines.children.forEach((contours, index) => {

			for (let contour of contours.children) {


				const vertexStart = contour.geometry.vertices[0];

				const vertexEnd = contour.geometry.vertices[contour.geometry.vertices.length - 1];

				const closed = vertexStart.equals(vertexEnd, 1)

				console.log('closed', closed);

				console.log('vertexStart', vertexStart);
				console.log('vertexEnd', vertexEnd);

				if (closed) {

					let geometryTT = new THREE.BoxGeometry(0.3, 0.9, 0.3);
					let materialTT = new THREE.MeshBasicMaterial({ color: "red" });
					let touching = new THREE.Mesh(geometryTT, materialTT);
					touching.position.copy(vertexStart);
					GCO.closed.add(touching);


					geometryTT = new THREE.BoxGeometry(0.3, 0.3, 0.9);
					materialTT = new THREE.MeshBasicMaterial({ color: "blue" });
					touching = new THREE.Mesh(geometryTT, materialTT);
					touching.position.copy(vertexEnd);
					GCO.closed.add(touching);


				}

				//let elevation = index * GCO.delta + GCO.box3.max.z;
				// const label = drawPlacard(index + "", 0.02, 120, GCO.box3.min.x - 5, 0, elevation);
				// GCT.labels.add(label);

			}

		});

		GCO.closed.visible = false;

	}

	GCO.closed.visible = !GCO.closed.visible;

};


GCT.toggleShortPolylines = function () {

	if (GCO.shortPolylines.children.length === 0) {

		let count = 0;

		for (let i = 0; i < GCO.contourLines.children.length; i++) {

			const lines = GCO.contourLines.children[i];

			//console.log('short lines', lines.children.length);

			for (let j = 0; j < lines.children.length; j++) {

				const line = lines.children[j];

				const length = GCO.getLength(line);


				if (length < 0.09) {
					count++;

					vertexStart = line.geometry.vertices[0]
					vertexEnd = line.geometry.vertices[ line.geometry.vertices.length - 1 ]
					console.log('j', j, 'length', length, "line", line);

					let geometryTT = new THREE.BoxGeometry(0.3, 2, 0.3);
					let materialTT = new THREE.MeshBasicMaterial({ color: "magenta" });
					let touching = new THREE.Mesh(geometryTT, materialTT);
					touching.position.copy(vertexStart);
					GCO.shortPolylines.add(touching);


					geometryTT = new THREE.BoxGeometry(0.3, 0.3, 2);
					materialTT = new THREE.MeshBasicMaterial({ color: "cyan" });
					touching = new THREE.Mesh(geometryTT, materialTT);
					touching.position.copy(vertexEnd);
					GCO.shortPolylines.add(touching);

	//				GCO.contourLines.children[i].children.splice(j, 1);


				}
			}

		}

		GCO.shortPolylines.visible = false;

		console.log('short line count', count);

		GCTspnShortPolylines.innerHTML = `${ count } found`
	}

	GCO.shortPolylines.visible = !GCO.shortPolylines.visible;


}


GCT.toggleMultiplePolylines = function () {

	if ( GCTchkMultiplePolylines.checked ) {

		GCO.contourLines.children.forEach((contour, index) => {

			console.log('contour.length', contour.children.length);

			if (contour.children.length === 1) {

				contour.visible = false;

			} else {

				console.log('', contour.children);


			}


		});

	} else {

		GCO.contourLines.children.forEach(contour => contour.visible = true);

	}

};


GCT.toggleClosedPolylines = function () {

	if ( GCTchkClosedPolylines.checked ) {

		GCO.contourLines.children.forEach(contours => {


			for ( let contour of contours.children ) {

				//console.log( 'cc', contour );
				const vertices = contour.geometry.vertices;

				//console.log( '', vertices );
				const vertexStart = vertices[0];
				const vertexEnd = vertices[vertices.length - 1];

				if (vertexStart.equals(vertexEnd, GCO.tolerance ) ) {

					contour.visible = true;

				} else {

					contour.visible = false;

				}

			}


		});

	} else {

		GCO.contourLines.children.forEach(contour => contour.children.forEach( line => line.visible = true ) );

	}

}


GCT.toggleClockwise = function () {

	if ( GCTchkClockwise.checked ) {

		GCO.contourLines.children.forEach(contours => {


			for ( let contour of contours.children ) {

				//console.log( 'cc', contour );
				const vertices = contour.geometry.vertices;

				//console.log( '', vertices );
				const vertexStart = vertices[0];
				const vertexSecond = vertices[1];
				const vertexEnd = vertices[vertices.length - 2];

				const plane = GCT.getPlane(vertices)

				if (plane) {

					normal = plane.normal

					console.log('normal', normal, vertices.length );

					if (normal.z < 0) {

						console.log('11', vertices[ 1 ]);
						vertices.reverse();
						console.log('22', vertices[ 1 ]);
						contour.geometry.verticesNeedUpdate = true;

						plane2 = GCT.getPlane( vertices)

						contours.remove(contour);

						const geometry = new THREE.Geometry();
						geometry.vertices = vertices;

						const material = new THREE.LineBasicMaterial({ color: "magenta" });
						const line = new THREE.Line(geometry, material);

						contours.add( line )

					}

				} else {

					console.log('contour', contour);
				}


			}


		});

	} else {

		GCO.contourLines.children.forEach(contour => contour.children.forEach( line => line.visible = true ) );

	}

};


GCT.getPlane = function( points, start = 0 ) {
	//console.log( 'points', points, start );

	if ( points.length - start - 2 <= 0 ) { return }

	const triangle = new THREE.Triangle();

	triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );

	if ( triangle.getArea() === 0 && ( ++start < points.length - 2 ) ) { // looks like points are colinear and do not form a plane therefore try next set of points

		GCT.getPlane( points, start );

	}

	return triangle.getPlane( new THREE.Plane() );

};

GCT.toggleLabels = function () {


	if (GCT.labels.children.length === 0) {

		GCL.contourLines.children.forEach((contour, index) => {

			let elevation = index * GCO.delta + GCO.box3.max.z;
			const label = drawPlacard(index + ". " + elevation.toFixed(1), 0.02, 120, GCO.box3.min.x - 5, 0, elevation);
			GCT.labels.add(label);

		});

		GCT.labels.visible = false;

	}

	GCT.labels.visible = !GCT.labels.visible;

};


