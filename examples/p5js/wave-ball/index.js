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
    noStroke();

    // Prepare coordinate data of Wave Ball
    // 

    // Wellenkugel
    // http://www.3d-meier.de/tut3/Seite63.html
    // 
    //   x = u cos(cos(u)) cos(v)
    //   y = u cos(cos(u)) sin(v)
    //   z = u sin(cos(u))
    //   
    //   u is an element of the set of numbers [0, 14.5]
    //   v is an element of the set of numbers [0, 2 pi]

    beginShape(POINTS);
    strokeWeight(2.0);
    let ustep = 0.1;
    let vstep = Math.PI * 5 / 180;
    for (let v = 0; v <= 2 * Math.PI; v += vstep) {
        for (let u = 0; u <= 14.5; u += ustep) {
            let x = u * Math.cos(Math.cos(u)) * Math.cos(v);
            let y = u * Math.cos(Math.cos(u)) * Math.sin(v);
            let z = u * Math.sin(Math.cos(u));
            let x2 = x/25;
            let y2 = y/25;
            let z2 = z/25;
            stroke((x2+0.5)*255, (y2+0.5)*255, (z2+0.5)*255);
            vertex(x2, y2, z2);
        }
    }
    endShape();
}
