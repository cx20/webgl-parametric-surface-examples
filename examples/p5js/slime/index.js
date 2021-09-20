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
    rotateX(60);
    //rotateX(angle);
    rotateY(angle);
    rotateZ(angle);
    scale(Math.min(width/2.0, height/2.0));

    // Prepare slime coordinate data
    // x = b (cos(v) (r + sin(v))) cos(u)
    // y = a (r + sin(v))
    // z = b (cos(v) (r + sin(v))) sin(u)

    beginShape(POINTS);
    strokeWeight(2.0);
    let a = 1;
    let b = 1;
    let c = 1;
    let r = 1;
    let ustep = Math.PI * 5 / 180;
    let vstep = Math.PI * 5 / 180;
    for (let v = -Math.PI/2; v <= Math.PI/2; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            let x = b * (Math.cos(v) * (r + Math.sin(v))) * Math.cos(u);
            let y = a * (r + Math.sin(v));
            let z = b * (Math.cos(v) * (r + Math.sin(v))) * Math.sin(u);
            let x2 = x/2;
            let y2 = y/2 - 0.5;
            let z2 = z/2;
            stroke((x2+0.5)*255, (y2+0.5)*255, (z2+0.5)*255);
            vertex(x2, y2, z2);
        }
    }
    endShape();
}
