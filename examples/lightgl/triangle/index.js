var gl = GL.create();

gl.ondraw = function() {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.translate(0, 0, -2.5);
    gl.color(0.0, 0.0, 1.0);
    gl.begin(gl.LINE_STRIP);
    gl.vertex( 0.0, 0.5, 0.0);
    gl.vertex(-0.5,-0.5, 0.0);
    gl.vertex( 0.5,-0.5, 0.0);
    gl.vertex( 0.0, 0.5, 0.0);
    gl.end();
};

gl.fullscreen();
