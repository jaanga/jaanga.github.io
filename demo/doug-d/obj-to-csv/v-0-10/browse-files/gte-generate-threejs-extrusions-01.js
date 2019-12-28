
const GTE = {};


GTE.extrusions = undefined;

GTE.extrudeSettingsDefault = {
	steps: 2,
	depth: 50,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 1,
	bevelOffset: 20,
	bevelSegments: 1
};

GTE.getMenu = function () {

	const htm =
		`
<details id=detGTE>

	<summary>Generate extrusions</summary>

	<p>
		<button onclick=GTE.addBox(); >add box</button>

		<button onclick=GTE.addBoxLineTo(); >add box line to</button>
	</p>

	<p>
		<button onclick=GTE.addPolygon(); >draw polygon</button>
		<button onclick="GTE.addPolygon(3)" >3</button>
		<button onclick="GTE.addPolygon(4)" >4</button>
		<button onclick="GTE.addPolygon(6)" >6</button>
		<button onclick="GTE.addPolygon(8)" >8</button>
		<button onclick="GTE.addPolygon(24)" >24</button>
	</p>

	<p>
		<button onclick=GTE.addMalteseCross(); >add maltese cross </button>
	</p>

	<hr>

</details>
		`;

	return htm;

};

GTE.getMenuSettings = function () {

	const htm =
		`
<details id=detGTEsettings>

	<summary>Extrusions settings</summary>

	<p>
		<input type=checkbox id=GTEchkBevelEnabled checked > bevelEnabled<br>

		<input type=number id=GTEinpDepth value=50 > depth<br>
	</p>

	<hr>

</details>
		`;

	return htm;

};


GTE.reset = function () {

	scene.remove(mesh);

	//mesh = new THREE.Group();

	//scene.add( mesh);

	GTE.extrudeSettings = {
		steps: 2,
		depth: parseFloat( GTEinpDepth.value ),
		bevelEnabled: GTEchkBevelEnabled.checked,
		bevelThickness: 1,
		bevelSize: 1,
		bevelOffset: 0,
		bevelSegments: 1
	};

	console.log('GTE.extrudeSettings ', GTE.extrudeSettings);

};


GTE.addBox = function () {

	GTE.reset();

	const v = (x, y, z) => new THREE.Vector3(x, y, z);
	const length = 50, width = 50;
	vertices = [v(0, 0, 0), v(0, width, 0), v(length, width, 0), v(length, 0, 0)]

	shape = new THREE.Shape().setFromPoints(vertices);

	GTE.extrudeGeometry(shape);

};


GTE.addBoxLineTo = function () {

	GTE.reset();

	const v = (x, y, z) => new THREE.Vector3(x, y, z);
	const length = 50, width = 50;

	shape = new THREE.Shape()

	shape.moveTo( 0,0 );
	shape.lineTo( 0, width );
	shape.lineTo( length, width );
	shape.lineTo( length, 0 );
	shape.lineTo( 0, 0 );

	GTE.extrudeSettings.steps = 10;

	GTE.extrudeGeometry(shape)

};


GTE.addPolygon = function (sides = 5, size = 20) {

	GTE.reset();

	const v = (x, y, z) => new THREE.Vector3(x, y, z);
	const vertices = [];
	const delta = 2 * Math.PI / sides;

	for (let i = 0; i < sides; i++) {

		vertices.push(v(size * Math.cos(i * delta), size * Math.sin(i * delta), 0))

	}

	shape = new THREE.Shape().setFromPoints(vertices);

	GTE.extrudeGeometry(shape);

};



GTE.addPolygon = function (sides = 5, size = 20) {

	GTE.reset();

	const v = (x, y, z) => new THREE.Vector3(x, y, z);
	const vertices = [];
	const delta = 2 * Math.PI / sides;

	for (let i = 0; i < sides; i++) {

		vertices.push(v(size * Math.cos(i * delta), size * Math.sin(i * delta), 0))

	}

	shape = new THREE.Shape().setFromPoints(vertices);

	GTE.extrudeGeometry(shape);

};


GTE.addMalteseCross = function () {

	GTE.reset();

	const v = (x, y, z) => new THREE.Vector3(x, y, z);
	const height = 50, width = 50; tailIn = 7; tailOut = 0.0001;cheek = 30;
	vertices = [
		v(0, height - cheek, 0),
		v(tailIn, height - cheek, 0),
		v(tailOut, height, 0),
		v(width, height, 0),

		v(width, tailOut, 0),
		v(width - cheek, tailIn, 0),
		v(width -cheek, -tailIn, 0),
		v(width, -tailOut, 0),

		v( width, -height, 0),

		v(tailOut, -height, 0),
		v(tailIn, -height + cheek, 0),
		v( -tailIn, -height + cheek ),
		v(-tailOut, -height, 0),


		v(-width, -height, 0),

		v(-width, -tailOut, 0),
		v(-width + cheek, -tailIn, 0),
		v( -width + cheek, tailIn, 0),
		v(- width, tailOut, 0),

		v(-width, height, 0),
		v(-tailOut, height, 0),

		v(- tailIn, height - cheek, 0),
		v( 0, height - cheek, 0 )

	]

	GTE.extrudeSettings.bevelEnabled = false;

	shape = new THREE.Shape().setFromPoints(vertices);

	GTE.extrudeGeometry(shape);


}




GTE.extrudeGeometry = function (shape, extrudeSettings) {

	//GTE.reset()

	const v = (x, y, z) => new THREE.Vector3(x, y, z);

	shape = shape ? shape : new THREE.Shape([v(0, 0, 0), v(0, 50, 0), v(50, 50, 0), v(50, 0, 0)]);

	extrudeSettings = extrudeSettings || GTE.extrudeSettings;

	var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	var material = new THREE.MeshNormalMaterial({ wireframe: true });
	mesh = new THREE.Mesh(geometry, material);

	scene.add(mesh);

};