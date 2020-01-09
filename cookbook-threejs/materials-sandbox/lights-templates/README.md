# Read M

## Interesting use of lights

* https://threejs.org/examples/#webgl_animation_keyframes << amb + point >>
* https://threejs.org/examples/webgl_clipping.html
	* tw lights moving
* https://threejs.org/examples/#webgl_geometry_teapot
	* has light edit menu
* https://threejs.org/examples/#webgl_lights_pointlights2
* https://threejs.org/examples/#webgl_loader_draco

* lights
* https://github.com/mrdoob/three.js/blob/master/examples/webgl_loader_ply.html << shadow light function
* https://threejs.org/examples/#webgl_loader_ttf << mirror>>

lights that move

* https://threejs.org/examples/#webgl_lights_spotlights
* https://threejs.org/examples/#webgl_shadowmap_vsm
* https://threejs.org/examples/#webgl_shadowmap_pointlight

Marching cubes

scene.background = new THREE.Color( 0x443333 );
scene.fog = new THREE.Fog( 0x443333, 1, 4 );

scene.background = new THREE.Color( 0xa0a0a0 );
scene.fog = new THREE.Fog( 0xa0a0a0, 200, 1000 );

scene.background = new THREE.Color( 0x72645b );
scene.fog = new THREE.Fog( 0x72645b, 2, 15 );
new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )

## Other intersting examples

* https://threejs.org/examples/#webgl_refraction
* https://threejs.org/examples/#webgl_points_dynamic