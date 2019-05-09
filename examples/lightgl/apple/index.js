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

    // Prepare coordinate data of apple surface

    // x = cos (u) (4 + 3.8 cos (v))
    // y = sin (u) (4 + 3.8 cos (v))
    // z = (cos (v) + sin (v) -1) (1 + sin (v)) log (1-pi v / 10) +7.5 sin (v)
    // 
    // u is an element of the set of numbers [0, 2 pi]
    // v is an element of the set of numbers [-pi, pi]

    gl.begin(gl.LINE_STRIP);
    let ustep = Math.PI * 5 / 180;
    let vstep = Math.PI * 5 / 180;
    for (let v = -Math.PI; v <= Math.PI; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            let x = Math.cos(u) * (4 + 3.8 * Math.cos(v));
            let y = Math.sin(u) * (4 + 3.8 * Math.cos(v));
            let z = (Math.cos(v)+Math.sin(v)-1) * (1+Math.sin(v)) * Math.log(1-Math.PI * v/10)+7.5 * Math.sin(v);
            let x2 = x/20;
            let y2 = y/20;
            let z2 = z/20;
            gl.color(x2 + 0.5, y2 + 0.5, z2 + 0.5, 1.0);
            gl.vertex(x2, y2, z2);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
