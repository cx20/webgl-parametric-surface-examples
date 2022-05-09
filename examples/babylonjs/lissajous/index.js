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
    const A = 1;
    const B = 2;

    const points = [];
    const colors = [];
    for ( let i = 0; i <= MAX; i++ ) {
        const x = R * Math.cos(2 * Math.PI * i / MAX * A);
        const y = R * Math.sin(2 * Math.PI * i / MAX * B);
        const z = R * Math.sin(2 * Math.PI * i / MAX * A);
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
    mesh.color = new BABYLON.Color3(1, 1, 0);

    scene.registerBeforeRender(function () {
        scene.activeCamera.alpha += 0.03 * scene.getAnimationRatio();
    });
    
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
