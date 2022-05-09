const canvas = document.querySelector("#renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const MAX = 360;

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -300), scene);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    const positions = [];
    const colors = [];
    const indices = [];
    let idx = 0;
    const color = new BABYLON.Color3(0, 0, 0);
    for ( let t = 0; t <= 200; t += 0.01 ) {
        positions.push(0, 0, 0);
        BABYLON.Color3.HSVtoRGBToRef((t/200 * 360 | 0), 1, 1, color);
        colors.push(color.r, color.g, color.b, 1);
        indices.push(idx++);
    }

    const mesh = new BABYLON.Mesh("mesh", scene);
    const vertexData = new BABYLON.VertexData();
    
    vertexData.positions = positions;
    vertexData.indices = indices;
    vertexData.colors = colors;
    
    vertexData.applyToMesh(mesh, true); // Mesh を更新可能として作成する

    const material = new BABYLON.ShaderMaterial("material", scene, {
        vertexElement: "vs",
        fragmentElement: "fs",
    }, {
        attributes: ["position", "color"],
        uniforms: ["worldViewProjection"]
    });
    material.fillMode = BABYLON.Material.LineStripDrawMode;
    mesh.material = material;
    mesh.material.backFaceCulling = false;
    
    scene.registerBeforeRender(function () {
        randomHarmonograph();
    });
                         
    const R = 100;

    const alpha = Math.PI/4;
    const beta  = Math.PI/3;
    const gamma = 0; // Math.PI/2;

    const theta = 0.0;

    let A1 = 50, f1 = 2, p1 = 1/16, d1 = 0.02;
    let A2 = 50, f2 = 2, p2 = 3 / 2, d2 = 0.0315;
    let A3 = 50, f3 = 2, p3 = 13 / 15, d3 = 0.02;
    let A4 = 50, f4 = 2, p4 = 1, d4 = 0.02;

    function randomHarmonograph() {
        f1 = (f1 + Math.random() / 40) % 10;
        f2 = (f2 + Math.random() / 40) % 10;
        f3 = (f3 + Math.random() / 40) % 10;
        f4 = (f4 + Math.random() / 40) % 10;
        p1 += (Math.PI*2 * 0.5 / 360);
        
        drawHarmonograph();
    }
    
    function drawHarmonograph()
    {
        const positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
        for (let i = 0; i < positions.length; i += 3) {
            const t = i / 200;
            const x = A1 * Math.sin(f1 * t + Math.PI * p1) * Math.exp(-d1 * t) + A2 * Math.sin(f2 * t + Math.PI * p2) * Math.exp(-d2 * t);
            const y = A3 * Math.sin(f3 * t + Math.PI * p3) * Math.exp(-d3 * t) + A4 * Math.sin(f4 * t + Math.PI * p4) * Math.exp(-d4 * t);
            const z = A1 * Math.cos(f1 * t + Math.PI * p1) * Math.exp(-d1 * t) + A2 * Math.cos(f2 * t + Math.PI * p2) * Math.exp(-d2 * t);
    
            positions[i+0] = x;
            positions[i+1] = y;
            positions[i+2] = z;
        }
        //mesh.setVerticesData(BABYLON.VertexBuffer.PositionKind, positions);
        mesh.updateVerticesData(BABYLON.VertexBuffer.PositionKind, positions);  // updateVerticesData() を使用する場合は Mesh を更新可能に設定する必要がある
    }
    
    return scene;
};

const scene = createScene();

engine.runRenderLoop(function () {
    scene.render();
});
