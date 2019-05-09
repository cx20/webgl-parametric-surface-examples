let angle = 0;
let theta = 0;
let gl = GL.create();

gl.onupdate = function(seconds) {
    angle += 45 * seconds;
};

gl.ondraw = function() {
    theta += Math.PI * 1/180;
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.loadIdentity();
    gl.translate(0, 0, -3);
    gl.rotate(-60, 1, 0, 0);
    gl.rotate(angle, 0, 0, 1);

    // Plot a three-dimensional function
    gl.begin(gl.POINTS);
    gl.pointSize(2.0);
    for ( let j = -10; j < 10; j += 0.2 ) {
        for ( let i = -10; i < 10; i += 0.2) {
            let x = i;
            let y = j;
            let z = Math.sin(Math.sqrt(x*x+y*y) + theta)/Math.sqrt(x*x+y*y);
            let x2 = x / 10;
            let y2 = y / 10;
            let z2 = z / 2;
            gl.color(x2+0.5, y2+0.5, z2+0.5, 1.0);
            gl.vertex(x2, y2, z2);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
