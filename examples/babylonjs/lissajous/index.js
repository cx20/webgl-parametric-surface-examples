const MAX = 360;
const R = 20;
const A = 1;
const B = 2;

let createScene = function (engine) {
    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(20, 20, 100));
    camera.attachControl(canvas);
    camera.maxZ = 200;
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let points = [];
    for ( let i = 0; i <= MAX; i++ ) {
        let x = R * Math.cos(2 * Math.PI * i / MAX * A);
        let y = R * Math.sin(2 * Math.PI * i / MAX * B);
        let z = R * Math.sin(2 * Math.PI * i / MAX * A);
        points.push(new BABYLON.Vector3(x, y, z));
    }

    let mesh = BABYLON.Mesh.CreateLines("mesh", points, scene, true);
    mesh.color = new BABYLON.Color3(1, 1, 0);

    scene.registerBeforeRender(function () {
        scene.activeCamera.alpha += 0.03;
    });
    
    return scene;
};

let canvas = document.querySelector("#renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
let scene = createScene( engine );
engine.runRenderLoop(function () {
    scene.render();
});
