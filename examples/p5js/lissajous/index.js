let angle = 0.0;

function setup() {
    createCanvas(innerWidth,innerHeight, 'webgl');
    background(255, 255, 255);
    noFill();
}

function draw() {
    angle += Math.PI / 180;
    background(0, 0, 0);
    rotateY(angle);
    scale(Math.min(width/2.0, height/2.0));
    noStroke();

    // Prepare coordinate data of sine wave * cosine wave
    let MAX = 24;
    let A = 1.0;
    let B = 2.0;
    beginShape(TRIANGLE_STRIP);
    for ( let i = 0; i <= MAX; i++ ) {
        let x = 0.5 * Math.cos(2 * Math.PI * i / MAX * A);
        let y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B);
        let z = 0.5 * Math.sin(2 * Math.PI * i / MAX * A);
        fill((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
        vertex(x, y, z);
    }
    endShape();
}
