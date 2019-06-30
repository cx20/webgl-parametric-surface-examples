let createScene = function (engine) {
    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0.0, -2.5), scene);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let positions = [];
    let colors = [];
    let indices = [];
    let idx = 0;
    let theta = 0.0;

    // Prepare coordinate data of Roman surface

    // x = sin(u) * cos(u) * sin(v) * sin(v)
    // y = sin(u) * sin(v) * cos(v)
    // z = cos(u) * sin(v) * cos(v)

    let ustep = Math.PI * 10 / 180;
    let vstep = Math.PI * 10 / 180;
    for (let v = 0; v <= 2 * Math.PI; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            RomanSurface(u, v);
            RomanSurface(u + ustep, v);
            RomanSurface(u + ustep, v + vstep);
            RomanSurface(u, v + vstep);
        }
    }

    function RomanSurface(u, v) {
        let x = Math.sin(u) * Math.cos(u) * Math.sin(v) * Math.sin(v);
        let y = Math.sin(u) * Math.sin(v) * Math.cos(v);
        let z = Math.cos(u) * Math.sin(v) * Math.cos(v);
        let r = x + 0.5;
        let g = y + 0.5;
        let b = z + 0.5;
        positions.push(x, y, z);
        colors.push(r, g, b, 1);
        indices.push(idx++);
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
    material.fillMode = BABYLON.Material.LineStripDrawMode;
    //material.fillMode = BABYLON.Material.PointFillMode;
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
