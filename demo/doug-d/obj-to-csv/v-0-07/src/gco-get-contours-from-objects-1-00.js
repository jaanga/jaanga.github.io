// copyright Theo Armour. MIT license.
/* global THREE, MMS, GCOdivToggles, GCOchkLabels, drawPlacard, GCOdivMessage, GCOchkPoints,
GCOrngContoursCount, GCOoutContourCount, GCOrngContourPosition, GCOoutContourPosition, GCOdivStatsNew,
scene, mesh, meshPlane */
// jshint esversion: 6
// jshint loopfunc: true

const GCO = {};

GCO.contoursLength = 16;
GCO.constant = 0;
GCO.tolerance = 0.01;


var tolerance = 0.001;
var contours;

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

var pointOfIntersection = new THREE.Vector3();
var pointsOfIntersection = new THREE.Geometry();


var a = new THREE.Vector3(),
	b = new THREE.Vector3(),
	c = new THREE.Vector3();

var planePointA = new THREE.Vector3(),
	planePointB = new THREE.Vector3(),
	planePointC = new THREE.Vector3();

var lineAB = new THREE.Line3(),
	lineBC = new THREE.Line3(),
	lineCA = new THREE.Line3();


	GCO.getMenu = function () {

		window.addEventListener("onresetall", GCO.reset, false);

		const htm = `
	<details open>

		<summary>Get contour points</summary>

		<p>Adjust contour line parameters. Generate vertices. Draw points and lines.</p>

		<div id=GCOdivToggles >
			<p>
				Toggles
			</p>
	<!--
			<div>
				<input type=checkbox onchange="GCO.contoursSegments.visible=!GCO.contoursSegments.visible" checked >
				contour segments
			</div>
	-->
			<div>
				<input type=checkbox onchange="GCO.contourLines.visible=!GCO.contourLines.visible" checked >
				contour lines
			</div>

			<div>
				<input type=checkbox id=GCOchkPoints onchange=GCO.toggleContourPoints() checked >
				contour points
			</div>

			<div>
				<input type=checkbox id=GCOchkClosed onchange=GCO.toggleClosed() checked >
				closed
			</div>

			<div>
				<input type=checkbox onchange="mesh.visible=!mesh.visible" checked >
				model
			</div>

			<div>
				<input type=checkbox id=GCOchkLabels onchange="GCO.toggleLabels()" >
				labels
			</div>

		</div>


		<p>
			number of contours <output id=GCOoutContourCount >${GCO.contoursLength}</output><br>
			<input type="range" id="GCOrngContoursCount" min=1 max=256 step=1 value=${GCO.contoursLength}
			oninput="GCO.reset();GCO.contoursLength=this.value;GCOoutContourCount.innerHTML=this.value;" >
		</p>

		<p>
			<button title="pressMe" onclick=GCO.getContourPoints(); ><b>get multiple contours</b></button>

			<button title="pressMe" onclick=GCO.getContourPoints(32); >32</button>

			<button title="pressMe" onclick=GCO.getContourPoints(64); >64</button>

			<button title="pressMe" onclick=GCO.getContourPoints(128); >128</button>
		</p>

		<hr>

		<p>
			single contour position <output id=GCOoutContourPosition >${GCO.constant + 50}</output>%<br>
			<input type="range" id="GCOrngContourPosition" min=0 max=100 step=1 value=${GCO.constant + 50}
			oninput="GCO.setContourPosition();" >
		</p>

		<p>
			<button title="pressMe" onclick=drawIntersectionPoints(); ><b>get single contour</b></button>
		</p>

		<hr>

		<p>
			<button onclick=GCO.removeShortSegments(); >remove very short segments</button><br>
			Click until number removed is 0
		</p>

		<p>
			<button onclick=GCO.joinAdjacentSegments(); >join adjacent segments</button>
		</p>

		<div id=GCOdivMessage ></div>

		<div id=GCOdivStatsNew >Click until number no longer changes</div>

		<div id=GCOdivJoinSegments > </div>


	</details>
	`;

		return htm;
	};



function drawIntersectionPoints() {
	var mathPlane = new THREE.Plane();
	plane.localToWorld(planePointA.copy(plane.geometry.vertices[plane.geometry.faces[0].a]));
	plane.localToWorld(planePointB.copy(plane.geometry.vertices[plane.geometry.faces[0].b]));
	plane.localToWorld(planePointC.copy(plane.geometry.vertices[plane.geometry.faces[0].c]));
	mathPlane.setFromCoplanarPoints(planePointA, planePointB, planePointC);

	obj = mesh;

	obj.geometry = new THREE.Geometry().fromBufferGeometry( obj.geometry)
	obj.geometry.faces.forEach(function(face, idx) {
	  obj.localToWorld(a.copy(obj.geometry.vertices[face.a]));
	  obj.localToWorld(b.copy(obj.geometry.vertices[face.b]));
	  obj.localToWorld(c.copy(obj.geometry.vertices[face.c]));
	  lineAB = new THREE.Line3(a, b);
	  lineBC = new THREE.Line3(b, c);
	  lineCA = new THREE.Line3(c, a);
	  setPointOfIntersection(lineAB, mathPlane, idx);
	  setPointOfIntersection(lineBC, mathPlane, idx);
	  setPointOfIntersection(lineCA, mathPlane, idx);
	});

	var pointsMaterial = new THREE.PointsMaterial({
	  size: .5,
	  color: 0x00ff00
	});
	var points = new THREE.Points(pointsOfIntersection, pointsMaterial);
	scene.add(points);

	contours = getContours(pointsOfIntersection.vertices, [], true);
	// console.log("contours", contours);

	// contours.forEach(cntr => {
	// 	let cntrGeom = new THREE.Geometry();
	// 	cntrGeom.vertices = cntr;
	// 	let contour = new THREE.Line(cntrGeom, new THREE.LineBasicMaterial({
	// 	  color: Math.random() * 0xffffff //0x777777 + 0x777777
	// 	}));
	// 	scene.add(contour);
	// });

  }

  function setPointOfIntersection(line, plane, faceIdx) {
	pointOfIntersection = plane.intersectLine(line);
	if (pointOfIntersection) {
	  let p = pointOfIntersection.clone();
	  p.faceIndex = faceIdx;
	  p.checked = false;
	  pointsOfIntersection.vertices.push(p);
	};
  }



function setPointOfIntersection(line, plane, faceIdx) {

//console.log("line", line);

	pointOfIntersection = plane.intersectLine(line, new THREE.Vector3() );

	if (pointOfIntersection) {
		let p = pointOfIntersection.clone();
		p.faceIndex = faceIdx;
		p.checked = false;
		pointsOfIntersection.vertices.push(p);
	}
}

function getContours(points, contours, firstRun) {

	//console.log("firstRun:", firstRun);

	let contour = [];

	// find first line for the contour
	let firstPointIndex = 0;
	let secondPointIndex = 0;
	let firstPoint, secondPoint;

	for (let i = 0; i < points.length; i++) {

		if (points[i].checked == true) continue;

		firstPointIndex = i;
		firstPoint = points[firstPointIndex];
		firstPoint.checked = true;
		//console.log('firstPointIndex', i);

		secondPointIndex = getPairIndex(firstPoint, firstPointIndex, points);
		secondPoint = points[secondPointIndex];
		secondPoint.checked = true;
		//console.log('secondPointIndex', secondPointIndex);

		contour.push(firstPoint.clone());
		contour.push(secondPoint.clone());

		break;

	}

	contour = getContour(secondPoint, points, contour);

	if (contour ) {

		contours.push(contour);

		let allChecked = 0;

		points.forEach(p => allChecked += p.checked === true ? 1 : 0 );

		console.log('allChecked', allChecked, 'points.length', points.length);

		if (points.length - allChecked > 2) {

			return getContours(points, contours, false);

		}

	}

	return contours;

}

function getContour(currentPoint, points, contour) {

	let p1Index = getNearestPointIndex(currentPoint, points);
	let p1 = points[p1Index];
	p1.checked = true;

	let p2Index = getPairIndex(p1, p1Index, points);
	let p2 = points[p2Index];
	p2.checked = true;

	let isClosed = p2.equals(contour[0], tolerance);

	if (!isClosed) {
		contour.push(p2.clone());
		return getContour(p2, points, contour);
	} else {
		//console.log('p2', p2);
		contour.push(contour[0].clone());
		return contour;
	}
}


function getNearestPointIndex( currentPoint, points) {

	let index = 0;

	for ( let point of points) {

		if (point.checked === false && point.equals(currentPoint, tolerance)) { break; }
		index++;

	}

	return index;

}


function getPairIndex(point, pointIndex, points) {

	let index = 0;
	for (let i = 0; i < points.length; i++) {

		const p = points[i];
		if (i != pointIndex && p.checked === false && p.faceIndex === point.faceIndex) {
			index = i;
			break;
		}
	}
	return index;

}



function getStats() {

	const vertices = contours.reduce( (acc, contour) => acc += contour.length, 0 )

	const htm =
	`
	<p>contours: ${ contours.length }</p>
	<p>vertices: ${ vertices }</p>
	`;

	divStats.innerHTML = htm;

}
