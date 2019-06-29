let c, gl;

let aLoc = [];
let uLoc = [];
let data = [];
let colors = [];

let mvMatrix = mat4.create();
let pMatrix = mat4.create();

let rad = 0;

let baseTime = +new Date;
let time = 0;
let f1 = 2;
let f2 = 2;
let f3 = 2;
let f4 = 2;

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
    console.log(gl.getShaderInfoLog(vs));
    console.log(gl.getShaderInfoLog(fs));
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    gl.useProgram(p);
    aLoc[0] = gl.getAttribLocation(p, "position");
    uLoc[0] = gl.getUniformLocation(p, 'pjMatrix');
    uLoc[1] = gl.getUniformLocation(p, 'mvMatrix');
    uLoc[2] = gl.getUniformLocation(p, 'time');
    uLoc[3] = gl.getUniformLocation(p, 'f1');
    uLoc[4] = gl.getUniformLocation(p, 'f2');
    uLoc[5] = gl.getUniformLocation(p, 'f3');
    uLoc[6] = gl.getUniformLocation(p, 'f4');
    gl.enableVertexAttribArray(aLoc[0]);
}

function initBuffers() {
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
    let MAX = 360;
    let A = 100.0;
    let B = 99.0;
    let C = 1.0;
    let alpha = Math.PI/4;
    let beta  = Math.PI/3;
    let theta = 0; // Math.PI/2;
    for ( let i = 0; i <= MAX; i += 0.1 ) {
        let x = i;
        let y = 0.0;
        let z = 0.0;
        data = data.concat([x, y, z]);
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aLoc[0], 3, gl.FLOAT, false, 0, 0);
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

function render() {
    rad += Math.PI * 1.0 / 180.0;

    let c = Math.cos(rad);
    let s = Math.sin(rad);

    mat4.perspective(pMatrix, 45, window.innerWidth / window.innerHeight, 0.1, 1000.0);
    mat4.identity(mvMatrix);
    let translation = vec3.create();
    vec3.set(translation, 0.0, 0.0, -2.0);
    mat4.translate(mvMatrix, mvMatrix, translation);
    mat4.rotate(mvMatrix, mvMatrix, rad, [0, 1, 0]);

    gl.uniformMatrix4fv(uLoc[0], false, pMatrix);
    gl.uniformMatrix4fv(uLoc[1], false, mvMatrix);

    // uniform float time 
    time = (+new Date - baseTime) / 1000;
    gl.uniform1f(uLoc[2], time);


    // uniform float f1～f4
    f1 = (f1 + Math.random() / 40) % 10;
    f2 = (f2 + Math.random() / 40) % 10;
    f3 = (f3 + Math.random() / 40) % 10;
    f4 = (f4 + Math.random() / 40) % 10;
    gl.uniform1f(uLoc[3], f1);
    gl.uniform1f(uLoc[4], f2);
    gl.uniform1f(uLoc[5], f3);
    gl.uniform1f(uLoc[6], f4);
    
    gl.drawArrays(gl.LINE_STRIP, 0, data.length / 3);
    gl.drawArrays(gl.POINTS, 0, data.length / 3);
    gl.flush();
}

initWebGL();
initShaders();
initBuffers();
animate();
