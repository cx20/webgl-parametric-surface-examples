const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, 2.5));
    camera.attachControl(canvas);
    camera.maxZ = 100;
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    const positions = [
        new BABYLON.Vector3( 0.0,  0.5, 0.0), // v0
        new BABYLON.Vector3(-0.5, -0.5, 0.0), // v1
        new BABYLON.Vector3( 0.5, -0.5, 0.0), // v2
        new BABYLON.Vector3( 0.0,  0.5, 0.0), // v0
    ];

    const options = {
        points: positions
    }
    const mesh = BABYLON.MeshBuilder.CreateLines("mesh", options, scene);
    mesh.color = new BABYLON.Color3(0, 0, 1);

    scene.registerBeforeRender(function () {
        scene.activeCamera.alpha += 0.01 * scene.getAnimationRatio();
    });
    
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
