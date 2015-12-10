var CustomMat = function (texturePath, shader) {

    var texture = onepixLoadTexture(texturePath);

    var uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    uniforms[ "texture1" ].value = texture;

    var parameters = {fragmentShader: shader.fragmentShader, vertexShader: shader.vertexShader, uniforms: uniforms};
    return new THREE.ShaderMaterial(parameters);
}


//used to load textures
function onepixLoadTexture(path) {

    // texture - texture must not be in same folder or there is an error.
    var texture = THREE.ImageUtils.loadTexture(path, {}, function () {
        // texture loaded
        $('#debug #textures').append("texture loaded: " + path + "<br>");
    },
            function () {
                //error, texture not loaded
                $('#debug #textures').append("unable to load: " + path + "<br>");
            });

    return texture;
}


