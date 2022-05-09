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

    // Prepare coordinate data of apple surface

    // x = cos (u) (4 + 3.8 cos (v))
    // y = sin (u) (4 + 3.8 cos (v))
    // z = (cos (v) + sin (v) -1) (1 + sin (v)) log (1-pi v / 10) +7.5 sin (v)
    // 
    // u is an element of the set of numbers [0, 2 pi]
    // v is an element of the set of numbers [-pi, pi]

    const ustep = Math.PI * 5 / 180;
    const vstep = Math.PI * 5 / 180;
    for (let v = -Math.PI; v <= Math.PI; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            const x = Math.cos(u) * (4 + 3.8 * Math.cos(v));
            const y = Math.sin(u) * (4 + 3.8 * Math.cos(v));
            const z = (Math.cos(v)+Math.sin(v)-1) * (1+Math.sin(v)) * Math.log(1-Math.PI * v/10)+7.5 * Math.sin(v);
            const x2 = x/20;
            const y2 = y/20;
            const z2 = z/20;
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
        //mesh.rotation.z = theta;
        mesh.rotate(BABYLON.Axis.X, Math.PI * 1.0 / 180.0 * scene.getAnimationRatio(), BABYLON.Space.LOCAL);
        mesh.rotate(BABYLON.Axis.Z, Math.PI * 1.0 / 180.0 * scene.getAnimationRatio(), BABYLON.Space.LOCAL);
    });
    
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
