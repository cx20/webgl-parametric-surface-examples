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
    gl.rotate(60, 1, 0, 0);
    gl.rotate(angle, angle, angle, 1);

    // Prepare coordinate data of apple surface
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    gl.begin(gl.LINE_STRIP);
    var ustep = Math.PI * 5 / 180;
    var vstep = Math.PI * 5 / 180;
    for (var v = -Math.PI; v <= Math.PI; v += vstep) {
        for (var u = 0; u <= 2 * Math.PI; u += ustep) {
            var x = Math.cos(u) * (4 + 3.8 * Math.cos(v));
            var y = Math.sin(u) * (4 + 3.8 * Math.cos(v));
            var z = (Math.cos(v)+Math.sin(v)-1) * (1+Math.sin(v)) * Math.log(1-Math.PI * v/10)+7.5 * Math.sin(v);
            var x2 = x/20;
            var y2 = y/20;
            var z2 = z/20;
            gl.color(x2 + 0.5, y2 + 0.5, z2 + 0.5, 1.0);
            gl.vertex(x2, y2, z2);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
