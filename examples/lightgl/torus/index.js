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

    // Prepare torus coordinate data
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    //
     
    // x = (R + r cos(v)) cos(u)
    // y = (R + r cos(v)) sin(u)
    // z = r sin(v)
    // 
    // u is an element of the set of numbers [0, 2 pi]
    // v is an element of the set of numbers [0, 2 pi]
    
    gl.begin(gl.POINTS);
    gl.pointSize(2.0);
    var ustep = Math.PI * 5 / 180;
    var vstep = Math.PI * 5 / 180;
    var R = 0.5;
    var r = 0.2;
    for (var v = 0; v <= 2 * Math.PI; v += vstep) {
        for (var u = 0; u <= 2 * Math.PI; u += ustep) {
            var x = (R + r * Math.cos(v)) * Math.cos(u);
            var y = (R + r * Math.cos(v)) * Math.sin(u);
            var z = r * Math.sin(v);
            gl.color(x + 0.5, y + 0.5, z + 0.5, 1.0);
            gl.vertex(x, y, z);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
