var container = document.getElementById('container');
var containerInnerWidth = container.offsetWidth;
var containerInnerHeight = container.offsetHeight;

var camera, scene, renderer, group;

//used by mouse tracking
var windowHalfX = containerInnerWidth / 2;
var windowHalfY = containerInnerHeight / 2;

var SHADOW_MAP_WIDTH = 2048, SHADOW_MAP_HEIGHT = 2048;
var NEAR = 10, FAR = 999.05;

init();
update();

function init() {

//-----------------------------------------------------------------------------// 
//loading animation
//-----------------------------------------------------------------------------// 

    //to display loading animation before it's ready
    $(document).ready(function () {
        if ($('.loading-container').length) {

            //to show loading animation
            $imgloader = $('.loading-container');
            $loadingimg = $('<div id="canvasloader-container" class="onepix-imgloader"></div>');


//          $loadingimg.attr("src","images/flexslider/loading.gif");
            $imgloader.prepend($loadingimg);

//          canvasloader code
            var cl = new CanvasLoader('canvasloader-container');
            cl.setColor('#4f4f4f'); // default is '#000000'
            cl.setDiameter(45); // default is 40
            cl.setDensity(75); // default is 40
            cl.setRange(0.7); // default is 1.3
            cl.setSpeed(3); // default is 2
            cl.setFPS(22); // default is 24
            cl.show(); // Hidden by default

            $(window).load(function () {
                $('.onepix-imgloader').fadeOut();
                // fade in content (using opacity instead of fadein() so it retains it's height.
                $('.loading-container > *:not(.onepix-imgloader)').fadeTo(8000, 100);

            });

        }

    });

//-----------------------------------------------------------------------------//  
//setup camara
//-----------------------------------------------------------------------------//  

    camera = new THREE.PerspectiveCamera(75, containerInnerWidth / containerInnerHeight, 0.1, 10000);
    camera.position.z = 3;
    camera.position.y = 2;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

//-----------------------------------------------------------------------------//
//init scene
//-----------------------------------------------------------------------------//

    scene = new THREE.Scene();
    group = new THREE.Object3D();

    initDebug();

    initMouse();

    window.addEventListener('resize', onWindowResize, false);

//-----------------------------------------------------------------------------//
//load geometry 
//-----------------------------------------------------------------------------//

//simple generated primitive with custom shader
//-----------------------------------------------//
//    material = new CustomMat("textures/texture.jpg", THREE.SimpleShader);
    material = new CustomMat("textures/texture.jpg", THREE.DisplacementShader);
    geometry = new THREE.SphereGeometry(1, 80, 80);
    mesh = new THREE.Mesh(geometry, material);
    group.add(mesh);

//-----------------------------------------------------------------------------//
//setup scene
//-----------------------------------------------------------------------------//

    //scene graph (group.add(mesh); is in the loaders)
    scene.add(group);
    
    // fog
    scene.fog = new THREE.FogExp2(0xdfdfdf, 0.04);
    
//-----------------------------------------------------------------------------//
//setup renderer
//-----------------------------------------------------------------------------//

//  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(containerInnerWidth, containerInnerHeight);

    renderer.setClearColor(0xdfdfdf, 1);
//  renderer.autoClear = false;

    renderer.shadowMapEnabled = true;
    //renderer.shadowMapType = THREE.PCFShadowMap;
    //soft shadowmap version
    renderer.shadowMapType = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

//-----------------------------------------------------------------------------//
//setup lights
//-----------------------------------------------------------------------------//

    light = new THREE.SpotLight(0xffffff, 1, 0, Math.PI / 2, 1);
    light.position.set(0.5, 3, 3);
    light.target.position.set(0, 0, 0);

    // cast shadow
    light.castShadow = true;
    light.shadowCameraNear = 1;
    light.shadowCameraFar = 10;
    light.shadowCameraFov = 50;

    //show light camera frustrum
    //light.shadowCameraVisible = true;

    light.shadowBias = 0.0001;
    light.shadowDarkness = 0.5;

    light.shadowMapWidth = SHADOW_MAP_WIDTH;
    light.shadowMapHeight = SHADOW_MAP_HEIGHT;

    scene.add(light);

    //secondary light
    light = new THREE.DirectionalLight(0x002288, 1);
    light.position.set(-1, -1, -1);
    scene.add(light);

    //ambient light
    light = new THREE.AmbientLight(0x222222);
    scene.add(light);

}

function onWindowResize() {

    // make sure to updtate the container proportions on window resize
    containerInnerWidth = container.offsetWidth;
    containerInnerHeight = container.offsetHeight;

    windowHalfX = containerInnerWidth / 2;
    windowHalfY = containerInnerHeight / 2;

    camera.aspect = containerInnerWidth / containerInnerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(containerInnerWidth, containerInnerHeight);

}

function update() {

    requestAnimationFrame(update);

    //update mouse tracking
    updateMouse();

    renderer.render(scene, camera);
    stats.update();

}