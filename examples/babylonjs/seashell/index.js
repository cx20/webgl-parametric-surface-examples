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

    // Prepare coordinate data of seashell surface

    // x = (a*(1-v/(2*pi))*(1+cos(u)) + c) * cos(n*v)
    // y = (a*(1-v/(2*pi))*(1+cos(u)) + c) * sin(n*v)
    // z = b*v/(2*pi) + a*(1-v/(2*pi)) * sin(u)
    // 
    // a,b: these determine how pointy or flat the shell is (informally...)
    // c: determines how much the shell overlaps with itself
    // n: the number of spirals in the shell

    const ustep = Math.PI * 5 / 180;
    const vstep = Math.PI * 5 / 180;
    const a = 0.2;
    const b = 0.6;
    const c = 0.2;
    const n = 2.0;
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
        mesh.rotation.y = theta;
        theta += 0.03 * scene.getAnimationRatio();
    });
    
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
