let createScene = function (engine) {
    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, 2.5));
    camera.attachControl(canvas);
    camera.maxZ = 100;
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let positions = [
        new BABYLON.Vector3( 0.0,  0.5, 0.0), // v0
        new BABYLON.Vector3(-0.5, -0.5, 0.0), // v1
        new BABYLON.Vector3( 0.5, -0.5, 0.0), // v2
        new BABYLON.Vector3( 0.0,  0.5, 0.0), // v0
    ];

    let mesh = BABYLON.Mesh.CreateLines("mesh", positions, scene, true);
    mesh.color = new BABYLON.Color3(0, 0, 1);

    scene.registerBeforeRender(function () {
        scene.activeCamera.alpha += 0.01;
    });
    
    return scene;
};

let canvas = document.querySelector("#renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
let scene = createScene( engine );
engine.runRenderLoop(function () {
    scene.render();
});
