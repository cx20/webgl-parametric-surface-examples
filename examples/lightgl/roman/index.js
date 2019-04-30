var angle = 0;
var gl = GL.create();

gl.onupdate = function(seconds) {
    angle += 45 * seconds;
};

gl.ondraw = function() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -2);
    gl.rotate(-60, 1, 0, 0);
    gl.rotate(angle, 0, 0, 1);

    // Prepare coordinate data of Roman surface
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 

    // x = sin(u) * cos(u) * sin(v) * sin(v)
    // y = sin(u) * sin(v) * cos(v)
    // z = cos(u) * sin(v) * cos(v)

    gl.begin(gl.LINE_STRIP);
    var ustep = Math.PI * 10 / 180;
    var vstep = Math.PI * 10 / 180;
    for (var v = 0; v <= 2 * Math.PI; v += vstep) {
        for (var u = 0; u <= 2 * Math.PI; u += ustep) {
            RomanSurface(u, v);
            RomanSurface(u + ustep, v);
            RomanSurface(u + ustep, v + vstep);
            RomanSurface(u, v + vstep);
        }
    }
    gl.end();
};

function RomanSurface(u, v) {
    var x = Math.sin(u) * Math.cos(u) * Math.sin(v) * Math.sin(v);
    var y = Math.sin(u) * Math.sin(v) * Math.cos(v);
    var z = Math.cos(u) * Math.sin(v) * Math.cos(v);
    gl.color(x + 0.5, y + 0.5, z + 0.5, 1.0);
    gl.vertex(x, y, z);
}

gl.fullscreen();
gl.animate();
