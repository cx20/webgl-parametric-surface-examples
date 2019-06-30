let createScene = function (engine) {
    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0.0, -2.5), scene);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let positions = [];
    let colors = [];
    let indices = [];
    let idx = 0;
    let theta = 0.0;

    // Prepare coordinate data of Wave Ball
    // 

    // Wellenkugel
    // http://www.3d-meier.de/tut3/Seite63.html
    // 
    //   x = u cos(cos(u)) cos(v)
    //   y = u cos(cos(u)) sin(v)
    //   z = u sin(cos(u))
    //   
    //   u is an element of the set of numbers [0, 14.5]
    //   v is an element of the set of numbers [0, 2 pi]

    let ustep = 0.1;
    let vstep = Math.PI * 5 / 180;
    for (let v = 0; v <= 2 * Math.PI; v += vstep) {
        for (let u = 0; u <= 14.5; u += ustep) {
            let x = u * Math.cos(Math.cos(u)) * Math.cos(v);
            let y = u * Math.cos(Math.cos(u)) * Math.sin(v);
            let z = u * Math.sin(Math.cos(u));
            let x2 = x/25;
            let y2 = y/25;
            let z2 = z/25;
            positions.push(x2, y2, z2);
            colors.push(x2 + 0.5, y2 + 0.5, z2 + 0.5, 1);
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
        //mesh.rotation.x = theta;
        //mesh.rotation.y = theta;
        //mesh.rotation.z = theta;
        mesh.rotate(BABYLON.Axis.X, Math.PI * 1.0 / 180.0, BABYLON.Space.LOCAL);
        mesh.rotate(BABYLON.Axis.Y, Math.PI * 1.0 / 180.0, BABYLON.Space.LOCAL);
        //mesh.rotate(BABYLON.Axis.Z, Math.PI * 1.0 / 180.0, BABYLON.Space.LOCAL);
    });
    
    return scene;
};

let canvas = document.querySelector("#renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
let scene = createScene( engine );

engine.runRenderLoop(function () {
    scene.render();
});
