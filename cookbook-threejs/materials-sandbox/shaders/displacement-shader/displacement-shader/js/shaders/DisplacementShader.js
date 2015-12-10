THREE.DisplacementShader = {

	uniforms: {
            texture1: { type: "t", value: null },
            scale: { type: "f", value: 1.0 },
	},

	vertexShader: [

                        "varying vec2 vUv;",
                        "varying float noise;",
                        "varying vec3 fNormal;",
                        "uniform sampler2D texture1;",
                        "uniform float scale;",
                        
                        "void main() {",

                            "vUv = uv;",
                            "fNormal = normal;",
                            
                            "vec4 noiseTex = texture2D( texture1, vUv );",
                            
                            "noise = noiseTex.r;",
                            //adding the normal scales it outward
                            //(normal scale equals sphere diameter)
                            "vec3 newPosition = position + normal * noise * scale;",

                            "gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );",

                        "}"

	].join("\n"),

	fragmentShader: [

			"varying vec2 vUv;",
                        "varying float noise;",
                        "varying vec3 fNormal;",

			"void main( void ) {",

                            // compose the colour using the normals then 
                            // whatever is heightened by the noise is lighter
                            "gl_FragColor = vec4( fNormal * noise, 1. );",

                        "}"

	].join("\n")

};