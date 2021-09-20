let angle = 0.0;

function setup() {
    createCanvas(innerWidth,innerHeight, 'webgl');
    background(255, 255, 255);
    noFill();
}

function draw() {
    angle += Math.PI / 180;
    background(0, 0, 0);
    rotate(Math.PI);
    rotateY(angle);
    scale(Math.min(width/2.0, height/2.0));

    beginShape(LINE_STRIP);
    stroke(0, 0, 255);
    vertex( 0.0, 0.5, 0.0);
    vertex(-0.5,-0.5, 0.0);
    vertex( 0.5,-0.5, 0.0);
    vertex( 0.0, 0.5, 0.0);
    endShape();
}
