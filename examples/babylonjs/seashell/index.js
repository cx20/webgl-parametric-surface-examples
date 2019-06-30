let createScene = function (engine) {
    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0.0, -2.5), scene);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let positions = [];
    let colors = [];
    let indices = [];
    let idx = 0;
    let theta = 0.0;

    // Prepare coordinate data of seashell surface

    // x = (a*(1-v/(2*pi))*(1+cos(u)) + c) * cos(n*v)
    // y = (a*(1-v/(2*pi))*(1+cos(u)) + c) * sin(n*v)
    // z = b*v/(2*pi) + a*(1-v/(2*pi)) * sin(u)
    // 
    // a,b: these determine how pointy or flat the shell is (informally...)
    // c: determines how much the shell overlaps with itself
    // n: the number of spirals in the shell

    let ustep = Math.PI * 5 / 180;
    let vstep = Math.PI * 5 / 180;
    let a = 0.2;
    let b = 0.6;
    let c = 0.2;
    let n = 2.0;
    for (let v = 0; v <= 2 * Math.PI; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            x = (a * (1 - v / (2 * Math.PI)) * (1 + Math.cos(u)) + c) * Math.cos(n * v);
            y = (a * (1 - v / (2 * Math.PI)) * (1 + Math.cos(u)) + c) * Math.sin(n * v);
            z = b * v / (2 * Math.PI) + a * (1 - v / (2 * Math.PI)) * Math.sin(u);
            positions.push(x, z, y);
            colors.push(x + 0.5, y + 0.5, z + 0.5, 1);
            indices.push(idx++);
        }
    }
    
    let mesh = new BABYLON.Mesh("mesh", scene);
    let vertexData = new BABYLON.VertexData();
    
    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.colors = colors;
    vertexData.applyToMesh(mesh, true);

    let material = new BABYLON.ShaderMaterial("material", scene, {
        vertexElement: "vs",
        fragmentElement: "fs",
    }, {
        attributes: ["position", "color"],
        uniforms: ["worldViewProjection"]
    });
    //material.fillMode = BABYLON.Material.LineStripDrawMode;
    material.fillMode = BABYLON.Material.PointFillMode;
    mesh.material = material;
    mesh.material.backFaceCulling = false;
    
    scene.registerBeforeRender(function () {
        mesh.rotation.y = theta;
    });
    
    return scene;
};

let canvas = document.querySelector("#renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
let scene = createScene( engine );

engine.runRenderLoop(function () {
    scene.render();
});
