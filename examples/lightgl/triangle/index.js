let angle = 0;
let gl = GL.create();

gl.onupdate = function(seconds) {
    angle += 45 * seconds;
};

gl.ondraw = function() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -3);
    gl.rotate(angle, 0, 1, 0);
    gl.color(0.0, 0.0, 1.0);
    gl.begin(gl.LINE_STRIP);
    gl.vertex( 0.0, 0.5, 0.0);
    gl.vertex(-0.5,-0.5, 0.0);
    gl.vertex( 0.5,-0.5, 0.0);
    gl.vertex( 0.0, 0.5, 0.0);
    gl.end();
};

gl.fullscreen();
gl.animate();
