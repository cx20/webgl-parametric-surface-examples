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
    gl.rotate(angle, angle, angle/10, 1);

    // Prepare coordinate data of heart surface
    //gl.begin(gl.LINE_STRIP);
    gl.begin(gl.POINTS);
    gl.pointSize(2.0);
    let num = 16;
    for (let i = -Math.PI * num; i <= Math.PI * num; i++) {
        for (let j = -num; j <= num; j++) {
            let theta = i / num;
            let z0 = j / num;
            let r = 4 * Math.sqrt(1 - z0 * z0) * Math.pow(Math.sin(Math.abs(theta)), Math.abs(theta));
            let x1 = r * Math.sin(theta);
            let y1 = r * Math.cos(theta);
            let z1 = z0;
            let x2 = x1 / 8;
            let y2 = y1 / 8;
            let z2 = z1 / 8;
            gl.color(x2 + 1.0, y2 + 0.5, z2 + 0.5, 1.0);
            gl.vertex(x2, y2, z2);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
