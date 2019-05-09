let angle = 0;
let gl = GL.create();

gl.onupdate = function(seconds) {
    angle += 45 * seconds;
};

gl.ondraw = function() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -3);
    gl.rotate(30, 1, 0, 0);
    gl.rotate(angle, 0, 1, 0);

    // Prepare coordinate data of 3D Lissajous

    // x = sin(2 * pi / 360 * t1 + alpha)
    // y = sin(2 * pi / 360 * t2 + beta)
    // z = sin(2 * pi / 360 * t3 + gamma)

    let MAX = 360;
    let A = 100.0;
    let B = 99.0;
    let C = 1.0;
    let alpha = Math.PI/4;
    let beta  = Math.PI/3;
    let theta = 0; // Math.PI/2;
    gl.begin(gl.LINE_STRIP);
    for ( let i = 0; i <= MAX; i += 0.1 ) {
        let x = 0.5 * Math.sin(2 * Math.PI * i / MAX * A + alpha);
        let y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B + beta);
        let z = 0.5 * Math.sin(2 * Math.PI * i / MAX * C + theta);
        gl.color(x+0.5, y+0.5, z+0.5, 1.0);
        gl.vertex(x, y, z);
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
