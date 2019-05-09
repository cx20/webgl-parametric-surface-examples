let angle = 0;
let gl = GL.create();

gl.onupdate = function(seconds) {
    angle += 45 * seconds;
};

gl.ondraw = function() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -2);
    gl.rotate(60, 1, 0, 0);
    gl.rotate(angle, angle, angle, 1);

    // Prepare slime coordinate data
    // x = b (cos(v) (r + sin(v))) cos(u)
    // y = a (r + sin(v))
    // z = b (cos(v) (r + sin(v))) sin(u)
    gl.begin(gl.LINE_STRIP);
    //gl.begin(gl.POINTS);
    gl.pointSize(2.0);
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
            gl.color(x2 + 0.5, y2 + 0.5, z2 + 0.5, 1.0);
            gl.vertex(x2, y2, z2);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
