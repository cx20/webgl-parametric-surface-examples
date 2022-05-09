const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0.5, -2.5), scene);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    const positions = [];
    const colors = [];
    const indices = [];
    let idx = 0;
    const color = new BABYLON.Color4(0, 0, 0, 1);
    for (let j = -10; j < 10; j += 0.2) {
        for (let i = -10; i < 10; i += 0.2) {
            positions.push(0, 0, 0);
            colors.push(0, 0, 0, 1);
            indices.push(idx++);
        }
    }
    
    const mesh = new BABYLON.Mesh("mesh", scene);
    const vertexData = new BABYLON.VertexData();
    
    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.colors = colors;
    vertexData.applyToMesh(mesh, true);

    const material = new BABYLON.ShaderMaterial("material", scene, {
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
                         
    const MAX = 360;
    const R = 100;

    const alpha = Math.PI/4;
    const beta  = Math.PI/3;
    const gamma = 0; // Math.PI/2;

    let theta = 0.0;

    function draw() {
        const positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        const colors = mesh.getVerticesData(BABYLON.VertexBuffer.ColorKind);
        theta += Math.PI * 1/180 * scene.getAnimationRatio();
        let k = 0;
        for (let j = -10; j < 10; j += 0.2) {
            for (let i = -10; i < 10; i += 0.2) {
                const x = i;
                const y = Math.sin(Math.sqrt(i * i + j * j) + theta) / Math.sqrt(i * i + j * j);
                const z = j;
                const x2 = x / 10;
                const y2 = y / 2;
                const z2 = z / 10;
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

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
