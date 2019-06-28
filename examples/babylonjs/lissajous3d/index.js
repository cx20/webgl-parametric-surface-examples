const MAX = 360;
const R = 20;
const A = 100.0;
const B = 99.0;
const C = 1.0;
const alpha = Math.PI/4;
const beta  = Math.PI/3;
const gamma = 0; // Math.PI/2;
let theta = 0.0;

let createScene = function (engine) {
    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(20, 20, 100));
    camera.attachControl(canvas);
    camera.maxZ = 200;
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let points = [];
    for ( let i = 0; i <= MAX; i += 0.1 ) {
        let x = R * Math.sin(2 * Math.PI * i / MAX * A + alpha);
        let y = R * Math.sin(2 * Math.PI * i / MAX * B + beta);
        let z = R * Math.sin(2 * Math.PI * i / MAX * C + gamma);
        points.push(new BABYLON.Vector3(x, y, z));
    }

    let mesh = BABYLON.Mesh.CreateLines("mesh", points, scene, true);
    mesh.color = new BABYLON.Color3(1, 1, 0);

    scene.registerBeforeRender(function () {
        mesh.rotation.x = theta;
        mesh.rotation.y = theta;
        theta += 0.03;
    });
    
    return scene;
};

let canvas = document.querySelector("#renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
let scene = createScene( engine );
engine.runRenderLoop(function () {
    scene.render();
});
