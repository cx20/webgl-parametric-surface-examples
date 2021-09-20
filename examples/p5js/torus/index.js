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
    rotate(60);
    rotateX(angle);
    rotateY(angle);
    rotateZ(angle);
    scale(Math.min(width/2.0, height/2.0));

    // Prepare torus coordinate data
     
    // x = (R + r cos(v)) cos(u)
    // y = (R + r cos(v)) sin(u)
    // z = r sin(v)
    // 
    // u is an element of the set of numbers [0, 2 pi]
    // v is an element of the set of numbers [0, 2 pi]

    beginShape(POINTS);
    strokeWeight(2.0);
    let ustep = Math.PI * 5 / 180;
    let vstep = Math.PI * 5 / 180;
    let R = 0.5;
    let r = 0.2;
    for (let v = 0; v <= 2 * Math.PI; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            let x = (R + r * Math.cos(v)) * Math.cos(u);
            let y = (R + r * Math.cos(v)) * Math.sin(u);
            let z = r * Math.sin(v);
            stroke((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
            vertex(x, y, z);
        }
    }
    endShape();
}
