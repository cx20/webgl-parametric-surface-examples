let angle = 0.0;
let theta = 0.0;

function setup() {
    createCanvas(innerWidth,innerHeight, 'webgl');
    background(255, 255, 255);
    noFill();
}

function draw() {
    theta += Math.PI * 1/180;
    angle += Math.PI / 180;
    background(0, 0, 0);
    //translate(width/2.0, height/2.0, 0);
    rotateX(45);
    rotateZ(angle);
    scale(Math.min(width/2.0, height/2.0));

    // Plot a three-dimensional function
    beginShape(POINTS);
    for ( let j = -10; j < 10; j += 0.2 ) {
        for ( let i = -10; i < 10; i += 0.2) {
            let x = i;
            let y = j;
            let z = Math.sin(Math.sqrt(x*x+y*y) + theta)/Math.sqrt(x*x+y*y);
            let x2 = x / 10;
            let y2 = y / 10;
            let z2 = z / 2;
            stroke((x2+0.5)*255, (y2+0.5)*255, (z2+0.5)*255);
            vertex(x2, y2, z2);
        }
    }
    endShape();
}
