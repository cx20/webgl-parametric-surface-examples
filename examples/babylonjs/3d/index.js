const MAX = 360;
const R = 100;

const alpha = Math.PI/4;
const beta  = Math.PI/3;
const gamma = 0; // Math.PI/2;

let theta = 0.0;
let mesh;

let createScene = function (engine) {
    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0.5, -2.5), scene);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let positions = [];
    let colors = [];
    let indices = [];
    let idx = 0;
    let color = new BABYLON.Color4(0, 0, 0, 1);
    for (let j = -10; j < 10; j += 0.2) {
        for (let i = -10; i < 10; i += 0.2) {
            positions.push(0, 0, 0);
            colors.push(0, 0, 0, 1);
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
    material.fillMode = BABYLON.Material.PointFillMode;
    mesh.material = material;
    mesh.material.backFaceCulling = false;
    
    scene.registerBeforeRender(function () {
        draw();
        mesh.rotation.y = theta;
    });
                         
    function draw() {
        let positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        let colors = mesh.getVerticesData(BABYLON.VertexBuffer.ColorKind);
        theta += Math.PI * 1/180;
        let k = 0;
        for (let j = -10; j < 10; j += 0.2) {
            for (let i = -10; i < 10; i += 0.2) {
                let x = i;
                let y = Math.sin(Math.sqrt(i * i + j * j) + theta) / Math.sqrt(i * i + j * j);
                let z = j;
                let x2 = x / 10;
                let y2 = y / 2;
                let z2 = z / 10;
                positions[k * 3 + 0] = x2;
                positions[k * 3 + 1] = y2;
                positions[k * 3 + 2] = z2;
                colors[k * 4 + 0] = x2 + 0.5;
                colors[k * 4 + 1] = y2 + 0.5;
                colors[k * 4 + 2] = z2 + 0.5;
                colors[k * 4 + 3] = 1.0;
                k++;
            }
        }

        mesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
        mesh.updateVerticesData(BABYLON.VertexBuffer.ColorKind, colors);
    }
    
    return scene;
};

let canvas = document.querySelector("#renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
let scene = createScene( engine );

engine.runRenderLoop(function () {
    scene.render();
});
