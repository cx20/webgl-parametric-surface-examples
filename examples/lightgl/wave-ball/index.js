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

    // Prepare coordinate data of Wave Ball
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 

    // Wellenkugel
    // http://www.3d-meier.de/tut3/Seite63.html
    // 
    //   x = u cos(cos(u)) cos(v)
    //   y = u cos(cos(u)) sin(v)
    //   z = u sin(cos(u))
    //   
    //   u is an element of the set of numbers [0, 14.5]
    //   v is an element of the set of numbers [0, 2 pi]

    gl.begin(gl.POINTS);
    gl.pointSize(1.0);
    var ustep = 0.1;
    var vstep = Math.PI * 5 / 180;
    for (var v = 0; v <= 2 * Math.PI; v += vstep) {
        for (var u = 0; u <= 14.5; u += ustep) {
            var x = u * Math.cos(Math.cos(u)) * Math.cos(v);
            var y = u * Math.cos(Math.cos(u)) * Math.sin(v);
            var z = u * Math.sin(Math.cos(u));
            var x2 = x/25;
            var y2 = y/25;
            var z2 = z/25;
            gl.color(x2 + 0.5, y2 + 0.5, z2 + 0.5, 1.0);
            gl.vertex(x2, y2, z2);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
