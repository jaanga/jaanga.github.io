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
			<button title="pressMe" onclick=GCP.drawIntersectionPoints(); ><b>get single contour</b></button>
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




function getStats() {

	const vertices = contours.reduce( (acc, contour) => acc += contour.length, 0 )

	const htm =
	`
	<p>contours: ${ contours.length }</p>
	<p>vertices: ${ vertices }</p>
	`;

	divStats.innerHTML = htm;

}
