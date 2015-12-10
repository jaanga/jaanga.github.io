THREE.SimpleShader = {

	uniforms: {
            texture1: {type: "t", value: null},
            scale: {type: "f", value: 1.0},
	},

	vertexShader: [

                        "varying vec3 fNormal;",
                        
                        "void main() {",

                            "fNormal = normal;",

                            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

                        "}"

	].join("\n"),

	fragmentShader: [

                        "varying vec3 fNormal;",

			"void main( void ) {",

                            // compose the colour using the normals then 
                            // whatever is heightened by the noise is lighter
                            "gl_FragColor = vec4( fNormal, 1. );",

                        "}"

	].join("\n")

};