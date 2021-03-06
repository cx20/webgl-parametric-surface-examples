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
    gl.rotate(angle, 0, 0, -1);

    // Prepare coordinate data of seashell surface

    // x = (a*(1-v/(2*pi))*(1+cos(u)) + c) * cos(n*v)
    // y = (a*(1-v/(2*pi))*(1+cos(u)) + c) * sin(n*v)
    // z = b*v/(2*pi) + a*(1-v/(2*pi)) * sin(u)
    // 
    // a,b: these determine how pointy or flat the shell is (informally...)
    // c: determines how much the shell overlaps with itself
    // n: the number of spirals in the shell

    gl.begin(gl.POINTS);
    gl.pointSize(2.0);
    let ustep = Math.PI * 5 / 180;
    let vstep = Math.PI * 5 / 180;
    let a = 0.2;
    let b = 0.6;
    let c = 0.2;
    let n = 2.0;
    for (let v = 0; v <= 2 * Math.PI; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            x = (a * (1 - v / (2 * Math.PI)) * (1 + Math.cos(u)) + c) * Math.cos(n * v);
            y = (a * (1 - v / (2 * Math.PI)) * (1 + Math.cos(u)) + c) * Math.sin(n * v);
            z = b * v / (2 * Math.PI) + a * (1 - v / (2 * Math.PI)) * Math.sin(u);
            gl.color(x + 0.5, y + 0.5, z + 0.5, 1.0);
            gl.vertex(x, y, z);
        }
    }
    gl.end();
};

gl.fullscreen();
gl.animate();
