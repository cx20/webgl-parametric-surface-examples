let angle = 0.0;

function setup() {
    createCanvas(innerWidth,innerHeight, 'webgl');
    background(255, 255, 255);
    noFill();
}

function draw() {
    angle += Math.PI / 180;
    background(0, 0, 0);
    rotateX(45);
    rotateZ(angle);
    scale(Math.min(width/2.0, height/2.0));

    // Prepare coordinate data of seashell surface

    // x = (a*(1-v/(2*pi))*(1+cos(u)) + c) * cos(n*v)
    // y = (a*(1-v/(2*pi))*(1+cos(u)) + c) * sin(n*v)
    // z = b*v/(2*pi) + a*(1-v/(2*pi)) * sin(u)
    // 
    // a,b: these determine how pointy or flat the shell is (informally...)
    // c: determines how much the shell overlaps with itself
    // n: the number of spirals in the shell

    beginShape(POINTS);
    strokeWeight(2.0);
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
            stroke((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
            vertex(x, y, z);
        }
    }
    endShape();
}