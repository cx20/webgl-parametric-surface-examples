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

    // Prepare slime coordinate data
    // x = b (cos(v) (r + sin(v))) cos(u)
    // y = a (r + sin(v))
    // z = b (cos(v) (r + sin(v))) sin(u)
    const a = 1;
    const b = 1;
    const c = 1;
    const r = 1;
    const ustep = Math.PI * 5 / 180;
    const vstep = Math.PI * 5 / 180;
    for (let v = -Math.PI/2; v <= Math.PI/2; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            const x = b * (Math.cos(v) * (r + Math.sin(v))) * Math.cos(u);
            const y = a * (r + Math.sin(v));
            const z = b * (Math.cos(v) * (r + Math.sin(v))) * Math.sin(u);
            const x2 = x/2;
            const y2 = y/2 - 0.5;
            const z2 = z/2;
            positions.push(x2, z2, y2);
            colors.push(x2 + 0.5, y2 + 0.5, z2 + 0.5, 1);
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
    //material.fillMode = BABYLON.Material.LineStripDrawMode;
    material.fillMode = BABYLON.Material.PointFillMode;
    mesh.material = material;
    mesh.material.backFaceCulling = false;
    
    scene.registerBeforeRender(function () {
        //mesh.rotation.x = theta;
        //mesh.rotation.y = theta;
        //mesh.rotation.z = theta;
        mesh.rotate(BABYLON.Axis.X, Math.PI * 1.0 / 180.0 * scene.getAnimationRatio(), BABYLON.Space.LOCAL);
        mesh.rotate(BABYLON.Axis.Y, Math.PI * 1.0 / 180.0 * scene.getAnimationRatio(), BABYLON.Space.LOCAL);
        mesh.rotate(BABYLON.Axis.Z, Math.PI * 1.0 / 180.0 * scene.getAnimationRatio(), BABYLON.Space.LOCAL);
    });
    
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
