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
    rotateZ(angle/10);
    scale(Math.min(width/2.0, height/2.0));

    // Prepare coordinate data of heart surface
    //beginShape(LINE_STRIP);
    beginShape(POINTS);
    strokeWeight(2.0);
    let num = 16;
    for (let i = -Math.PI * num; i <= Math.PI * num; i++) {
        for (let j = -num; j <= num; j++) {
            let theta = i / num;
            let z0 = j / num;
            let r = 4 * Math.sqrt(1 - z0 * z0) * Math.pow(Math.sin(Math.abs(theta)), Math.abs(theta));
            let x1 = r * Math.sin(theta);
            let y1 = r * Math.cos(theta);
            let z1 = z0;
            let x2 = x1 / 8;
            let y2 = y1 / 8;
            let z2 = z1 / 8;
            stroke((x2+1.0)*255, (y2+0.5)*255, (z2+0.5)*255);
            vertex(x2, y2, z2);
        }
    }
    endShape();
}
