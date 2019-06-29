let c, gl;
let aLoc = [];
let uLoc = [];

let positions = [];
let colors = [];

let translation;
let scale;
let eye;
let center;
let up;
let view;
let mvMatrix = mat4.create();
let pMatrix = mat4.create();

let rad = 0;

function initWebGL() {
    c = document.getElementById("c");
    gl = c.getContext("experimental-webgl");

    resizeCanvas();
    window.addEventListener("resize", function(){
        resizeCanvas();
    });
}

function resizeCanvas() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    gl.viewport(0, 0, c.width, c.height);
}

function initShaders() {
    let p = gl.createProgram();
    let vs = gl.createShader(gl.VERTEX_SHADER);
    let fs = gl.createShader(gl.FRAGMENT_SHADER);
    let v = document.getElementById("vs").textContent;
    let f = document.getElementById("fs").textContent;
    gl.shaderSource(vs, v);
    gl.shaderSource(fs, f);
    gl.compileShader(vs);
    gl.compileShader(fs);
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.useProgram(p);
    aLoc[0] = gl.getAttribLocation(p, "position");
    aLoc[1] = gl.getAttribLocation(p, "color");
    gl.enableVertexAttribArray(aLoc[0]);
    gl.enableVertexAttribArray(aLoc[1]);
    uLoc[0] = gl.getUniformLocation(p, "pjMatrix");
    uLoc[1] = gl.getUniformLocation(p, "mvMatrix");
}

function initBuffers() {
/*
    // 3次元リサージュの座標データを用意
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    const MAX = 360;
    const A = 100.0;
    const B = 99.0;
    const C = 1.0;
    const alpha = Math.PI/4;
    const beta  = Math.PI/3;
    const gamma = 0; // Math.PI/2;
    for ( let i = 0; i <= MAX; i += 0.1 ) {
        let x = 0.5 * Math.sin(2 * Math.PI * i / MAX * A + alpha);
        let y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B + beta);
        let z = 0.5 * Math.sin(2 * Math.PI * i / MAX * C + gamma);
        let r = x + 0.5;
        let g = y + 0.5;
        let b = z + 0.5;
        positions = positions.concat([x, y, z]);
        colors = colors.concat([r, g, b])
    }
*/
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
    
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 3, gl.FLOAT, false, 0, 0);
}


function RomanSurface(u, v) {
    let x = Math.sin(u) * Math.cos(u) * Math.sin(v) * Math.sin(v);
    let y = Math.sin(u) * Math.sin(v) * Math.cos(v);
    let z = Math.cos(u) * Math.sin(v) * Math.cos(v);
    let r = x + 0.5;
    let g = y + 0.5;
    let b = z + 0.5;
    positions = positions.concat([x, y, z]);
    colors = colors.concat([r, g, b])
}

function render(){
    rad += Math.PI * 1.0 / 180.0;

    mat4.perspective(pMatrix, 45, window.innerWidth / window.innerHeight, 0.1, 100.0);
    mat4.identity(mvMatrix);
    var translation = vec3.create();
    vec3.set(translation, 0.0, 0.0, -2.0);
    mat4.translate(mvMatrix, mvMatrix, translation);
    mat4.rotate(mvMatrix, mvMatrix, rad, [0, 1, 0]);

    gl.uniformMatrix4fv(uLoc[0], false, pMatrix);
    gl.uniformMatrix4fv(uLoc[1], false, mvMatrix);
    
    draw();

    requestAnimationFrame(render);
}

function draw() {
    gl.drawArrays(gl.LINE_STRIP, 0, positions.length / 3);
    gl.drawArrays(gl.POINTS, 0, positions.length / 3);
    gl.flush();
}

window.onload = function() {
    initWebGL();
    initShaders();
    initBuffers();
    render();
};
