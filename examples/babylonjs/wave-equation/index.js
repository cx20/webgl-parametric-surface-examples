////////////////////////////////////////////////////////////////////
// Physical system definition
////////////////////////////////////////////////////////////////////

//Size of two-dimensional square lattice
//let N = 100;
//let l = 1.0;
let N = 50;
let l = 2.0;

let dt = 0.1; // delta time
let dd = 1.0; // space spacing
let v = 4; // velocity

// Set boundary condition
let BC = "Neumann"; //or "Dirichlet"

let peakPosition = {
    x: 0,
    y: 0,
    z: 75,
    sigma2: 50
};
let peakPosition_bound = {
    x_min: -50,
    x_max: 50,
    y_min: -50,
    y_max: 50,
    z_min: -50,
    z_max: 100,
    sigma2_min: 10,
    sigma2_max: 100
};

let Tn = 3;
let f = new Array(Tn);

function initCondition(parameter) {
    let x0 = parameter.x;
    let y0 = parameter.y;
    let z0 = parameter.z;
    let sigma2 = parameter.sigma2;
    for (let t = 0; t < Tn; t++) {
        f[t] = new Array(N);
        for (i = 0; i <= N; i++) {
            f[t][i] = new Array(N);
            for (j = 0; j <= N; j++) {
                let x = (-N / 2 + i) * l;
                let y = (-N / 2 + j) * l;
                // initial conditions
                let z = z0 * Math.exp(-(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)) / (2 * sigma2));
                f[0][i][j] = z;
            }
        }
    }
    for (let i = 1; i <= N - 1; i++) {
        for (let j = 1; j <= N - 1; j++) {
            f[1][i][j] = f[0][i][j] + v * v / 2.0 * dt * dt / (dd * dd) * (f[0][i + 1][j] + f[0][i - 1][j] + f[0][i][j + 1] + f[0][i][j - 1] - 4.0 * f[0][i][j]);
        }
    }
    if (BC == "Dirichlet") {
        // Dirichlet boundary condition
        for (let i = 0; i <= N; i++) {
            f[1][i][0] = f[1][i][N] = f[1][0][i] = f[1][N][i] = 0.0; // boundary condition
        }
    } else if (BC == "Neumann") {
        // Neumann boundary condition
        for (let i = 1; i <= N - 1; i++) {
            f[1][i][0] = f[1][i][1];
            f[1][i][N] = f[1][i][N - 1];
            f[1][0][i] = f[1][1][i];
            f[1][N][i] = f[1][N - 1][i];
        }
        // Corner processing
        f[1][0][0] = (f[1][0][1] + f[1][1][0]) / 2;
        f[1][0][N] = (f[1][0][N - 1] + f[1][1][N]) / 2;
        f[1][N][0] = (f[1][N - 1][0] + f[1][N][1]) / 2;
        f[1][N][N] = (f[1][N - 1][N] + f[1][N][N - 1]) / 2;
    }
}

let createScene = function (engine) {
    initCondition(peakPosition);
    
    let theta = 0;

    let scene = new BABYLON.Scene(engine);
    let camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0.5, -2.5), scene);
    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    let positions = [];
    let colors = [];
    let indices = [];
    let idx = 0;
    for (i = 0; i <= N; i++) {
        for (j = 0; j <= N; j++) {
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
        
        for (let i = 1; i <= N - 1; i++) {
            for (let j = 1; j <= N - 1; j++) {
                f[2][i][j] = 2.0 * f[1][i][j] - f[0][i][j] + v * v * dt * dt / (dd * dd) * (f[1][i + 1][j] + f[1][i - 1][j] + f[1][i][j + 1] + f[1][i][j - 1] - 4.0 * f[1][i][j]);
            }
        }
        if (BC == "Dirichlet") {
            // Dirichlet boundary condition
            for (let i = 0; i <= N; i++) {
                f[2][i][0] = f[2][i][N] = f[2][0][i] = f[2][N][i] = 0.0; // boundary condition
            }
        } else if (BC == "Neumann") {
            // Neumann boundary condition
            for (let i = 1; i <= N - 1; i++) {
                f[2][i][0] = f[2][i][1];
                f[2][i][N] = f[2][i][N - 1];
                f[2][0][i] = f[2][1][i];
                f[2][N][i] = f[2][N - 1][i];
            }
            // Corner processing
            f[2][0][0] = (f[2][0][1] + f[2][1][0]) / 2;
            f[2][0][N] = (f[2][0][N - 1] + f[2][1][N]) / 2;
            f[2][N][0] = (f[2][N - 1][0] + f[2][N][1]) / 2;
            f[2][N][N] = (f[2][N - 1][N] + f[2][N][N - 1]) / 2;

        }
        // Replace the array numbers for the next calculation. Past information is lost here.
        for (let i = 0; i <= N; i++) {
            for (let j = 0; j <= N; j++) {
                f[0][i][j] = f[1][i][j];
                f[1][i][j] = f[2][i][j];
            }
        }

        let k = 0;
        for (i = 0; i <= N; i++) {
            for (j = 0; j <= N; j++) {
                let x = (-N / 2 + i) * l * 0.02;
                let y = f[1][i][j] * 0.02;
                let z = (-N / 2 + j) * l * 0.02;

                positions[k * 3 + 0] = x;
                positions[k * 3 + 1] = y;
                positions[k * 3 + 2] = z;
                colors[k * 4 + 0] = x + 0.5;
                colors[k * 4 + 1] = y + 0.5;
                colors[k * 4 + 2] = z + 0.5;
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
