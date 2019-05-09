let angle = 0;
let gl = GL.create();

gl.onupdate = function(seconds) {
    angle += 45 * seconds;
};

gl.ondraw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -3);
    gl.rotate(30, 1, 0, 0);
    gl.rotate(angle, 0, 1, 0);

    // Prepare coordinate data of sine wave * cosine wave
    let data = [];
    let MAX = 24;
    let A = 1.0;
    let B = 2.0;
    gl.begin(gl.LINE_STRIP);
    for ( let i = 0; i <= MAX; i++ ) {
        let x = 0.5 * Math.cos(2 * Math.PI * i / MAX * A);
        let y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B);
        let z = 0.5 * Math.sin(2 * Math.PI * i / MAX * A);
        gl.color(x+0.5, y+0.5, z+0.5, 1.0);
        gl.vertex(x, y, z);
    }
    gl.end();
};

gl.fullscreen();
gl.animate();