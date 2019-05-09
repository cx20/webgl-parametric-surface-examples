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
    //z: 75,
    z: 30,
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

function initialCondition(parameter) {
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

function sketchProc(p) {
    let angle = 0.0;
    let theta = 0.0;

    p.setup = function() {
        p.size(innerWidth,innerHeight, p.P3D);
        p.background(255, 255, 255);
        p.noFill();
        initialCondition(peakPosition);
    }

    p.draw = function() {
        theta += Math.PI * 1/180;
        angle += Math.PI / 180;
        p.background(0, 0, 0);
        p.translate(p.width/2.0, p.height/2.0, 0);
        p.rotateX(30);
        p.rotateZ(angle);
        p.scale(Math.min(p.width/2.0, p.height/2.0));

        p.beginShape(p.POINTS);
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

        let a = 0;
        for (i = 0; i <= N; i++) {
            for (j = 0; j <= N; j++) {
                let x = (-N / 2 + i) * l * 0.02;
                let y = (-N / 2 + j) * l * 0.02;
                let z = f[1][i][j] * 0.02;
	            // Add vertex coordinate data
                p.stroke((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
                p.vertex(x, y, z);
                a++;
            }
        }
        p.endShape();
    }
}

window.onload = function () {
    let canvas = document.getElementById("canvas");
    let myp = new Processing(canvas, sketchProc);
}
