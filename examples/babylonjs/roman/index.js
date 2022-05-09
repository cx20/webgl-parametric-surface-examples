const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0.0, -2.5), scene);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    const positions = [];
    const colors = [];
    const indices = [];
    let idx = 0;
    let theta = 0.0;

    // Prepare coordinate data of Roman surface

    // x = sin(u) * cos(u) * sin(v) * sin(v)
    // y = sin(u) * sin(v) * cos(v)
    // z = cos(u) * sin(v) * cos(v)

    const ustep = Math.PI * 10 / 180;
    const vstep = Math.PI * 10 / 180;
    for (let v = 0; v <= 2 * Math.PI; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            RomanSurface(u, v);
            RomanSurface(u + ustep, v);
            RomanSurface(u + ustep, v + vstep);
            RomanSurface(u, v + vstep);
        }
    }

    function RomanSurface(u, v) {
        const x = Math.sin(u) * Math.cos(u) * Math.sin(v) * Math.sin(v);
        const y = Math.sin(u) * Math.sin(v) * Math.cos(v);
        const z = Math.cos(u) * Math.sin(v) * Math.cos(v);
        const r = x + 0.5;
        const g = y + 0.5;
        const b = z + 0.5;
        positions.push(x, y, z);
        colors.push(r, g, b, 1);
        indices.push(idx++);
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
    material.fillMode = BABYLON.Material.LineStripDrawMode;
    //material.fillMode = BABYLON.Material.PointFillMode;
    mesh.material = material;
    mesh.material.backFaceCulling = false;
    
    scene.registerBeforeRender(function () {
        mesh.rotation.y = theta;
        theta += 0.03 * scene.getAnimationRatio();
    });
    
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
