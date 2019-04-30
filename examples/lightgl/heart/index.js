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
    gl.rotate(angle, angle, angle/10, 1);

    // Prepare coordinate data of heart surface
    //             1.0 y 
    //              ^  -1.0 
    //              | / z
    //              |/       x
    // -1.0 -----------------> +1.0
    //            / |
    //      +1.0 /  |
    //           -1.0
    // 
    //gl.begin(gl.LINE_STRIP);
    gl.begin(gl.POINTS);
    gl.pointSize(2.0);
    var num = 16;
    for (var i = -Math.PI * num; i <= Math.PI * num; i++) {
        for (var j = -num; j <= num; j++) {
            var theta = i / num;
            var z0 = j / num;
            var r = 4 * Math.sqrt(1 - z0 * z0) * Math.pow(Math.sin(Math.abs(theta)), Math.abs(theta));
            var x1 = r * Math.sin(theta);
            var y1 = r * Math.cos(theta);
            var z1 = z0;
            var x2 = x1 / 8;
            var y2 = y1 / 8;
            var z2 = z1 / 8;
            gl.color(x2 + 1.0, y2 + 0.5, z2 + 0.5, 1.0);
            gl.vertex(x2, y2, z2);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
