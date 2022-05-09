const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(20, 20, 100));
    camera.attachControl(canvas);
    camera.maxZ = 200;
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    const MAX = 360;
    const R = 20;
    const A = 100.0;
    const B = 99.0;
    const C = 1.0;
    const alpha = Math.PI/4;
    const beta  = Math.PI/3;
    const gamma = 0; // Math.PI/2;
    let theta = 0.0;

    const points = [];
    const colors = [];
    for ( let i = 0; i <= MAX; i += 0.1 ) {
        const x = R * Math.sin(2 * Math.PI * i / MAX * A + alpha);
        const y = R * Math.sin(2 * Math.PI * i / MAX * B + beta);
        const z = R * Math.sin(2 * Math.PI * i / MAX * C + gamma);
        const r = x / R + 0.5;
        const g = y / R + 0.5;
        const b = z / R + 0.5;
        points.push(new BABYLON.Vector3(x, y, z));
        colors.push(new BABYLON.Color4(r, g, b, 1.0));
    }

    const options = {
        points: points,
        colors: colors
    }
    const mesh = BABYLON.MeshBuilder.CreateLines("mesh", options, scene);

    scene.registerBeforeRender(function () {
        mesh.rotation.x = theta;
        mesh.rotation.y = theta;
        theta += 0.03 * scene.getAnimationRatio();
    });
    
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
