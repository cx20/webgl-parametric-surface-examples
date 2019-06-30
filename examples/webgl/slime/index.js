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
    // Prepare slime coordinate data
    // x = b (cos(v) (r + sin(v))) cos(u)
    // y = a (r + sin(v))
    // z = b (cos(v) (r + sin(v))) sin(u)
    let a = 1;
    let b = 1;
    let c = 1;
    let r = 1;
    let ustep = Math.PI * 5 / 180;
    let vstep = Math.PI * 5 / 180;
    for (let v = -Math.PI/2; v <= Math.PI/2; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            let x = b * (Math.cos(v) * (r + Math.sin(v))) * Math.cos(u);
            let y = a * (r + Math.sin(v));
            let z = b * (Math.cos(v) * (r + Math.sin(v))) * Math.sin(u);
            let x2 = x/2;
            let y2 = y/2 - 0.5;
            let z2 = z/2;
            positions = positions.concat([x2, z2, y2]);
            colors = colors.concat([x2 + 0.5, y2 + 0.5, z2 + 0.5])
        }
    }
            
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[1], 3, gl.FLOAT, false, 0, 0);
}

function render(){
    rad += Math.PI * 1.0 / 180.0;

    mat4.perspective(pMatrix, 45, window.innerWidth / window.innerHeight, 0.1, 100.0);
    mat4.identity(mvMatrix);
    let translation = vec3.create();
    vec3.set(translation, 0.0, 0.0, -2.0);
    mat4.translate(mvMatrix, mvMatrix, translation);
    mat4.rotate(mvMatrix, mvMatrix, rad, [1, 1, 1]);

    gl.uniformMatrix4fv(uLoc[0], false, pMatrix);
    gl.uniformMatrix4fv(uLoc[1], false, mvMatrix);
    
    draw();

    requestAnimationFrame(render);
}

function draw() {
    //gl.drawArrays(gl.LINE_STRIP, 0, positions.length / 3);
    gl.drawArrays(gl.POINTS, 0, positions.length / 3);
    gl.flush();
}

window.onload = function() {
    initWebGL();
    initShaders();
    initBuffers();
    render();
};
