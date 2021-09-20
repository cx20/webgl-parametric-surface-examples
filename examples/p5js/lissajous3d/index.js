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
    // x = sin(2 * pi / 360 * t1 + alpha)
    // y = sin(2 * pi / 360 * t2 + beta)
    // z = sin(2 * pi / 360 * t3 + gamma)

    let MAX = 360;
    let A = 100.0;
    let B = 99.0;
    let C = 1.0;
    let alpha = Math.PI/4;
    let beta  = Math.PI/3;
    let theta = 0; // Math.PI/2;
    beginShape(TRIANGLE_STRIP);
    for ( let i = 0; i <= MAX; i += 0.1 ) {
        let x = 0.5 * Math.sin(2 * Math.PI * i / MAX * A + alpha);
        let y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B + beta);
        let z = 0.5 * Math.sin(2 * Math.PI * i / MAX * C + theta);
        fill((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
        vertex(x, y, z);
        x0 = x;
        y0 = y;
        z0 = z;
    }
    endShape();
}