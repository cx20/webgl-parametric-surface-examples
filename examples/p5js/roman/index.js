let angle = 0.0;

function setup() {
    createCanvas(innerWidth,innerHeight, 'webgl');
    background(255, 255, 255);
    noFill();
}

function draw() {
    angle += Math.PI / 180;
    background(0, 0, 0);
    //translate(width/2.0, height/2.0, 0);
    rotateX(angle);
    rotateY(angle);
    scale(Math.min(width/2.0, height/2.0));

    // Prepare coordinate data of Roman surface

    // x = sin(u) * cos(u) * sin(v) * sin(v)
    // y = sin(u) * sin(v) * cos(v)
    // z = cos(u) * sin(v) * cos(v)

    beginShape(POINTS);
    let ustep = Math.PI * 10 / 180;
    let vstep = Math.PI * 10 / 180;
    for (let v = 0; v <= 2 * Math.PI; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            RomanSurface(u, v);
            RomanSurface(u + ustep, v);
            RomanSurface(u + ustep, v + vstep);
            RomanSurface(u, v + vstep);
        }
        endShape();
    }
}

function RomanSurface(u, v) {
    let x = Math.sin(u) * Math.cos(u) * Math.sin(v) * Math.sin(v);
    let y = Math.sin(u) * Math.sin(v) * Math.cos(v);
    let z = Math.cos(u) * Math.sin(v) * Math.cos(v);
    stroke((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
    vertex(x, y, z);
}
