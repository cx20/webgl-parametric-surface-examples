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

    // Prepare coordinate data of apple surface

    // x = cos (u) (4 + 3.8 cos (v))
    // y = sin (u) (4 + 3.8 cos (v))
    // z = (cos (v) + sin (v) -1) (1 + sin (v)) log (1-pi v / 10) +7.5 sin (v)
    // 
    // u is an element of the set of numbers [0, 2 pi]
    // v is an element of the set of numbers [-pi, pi]

    beginShape(POINTS);
    strokeWeight(2.0);
    let ustep = Math.PI * 5 / 180;
    let vstep = Math.PI * 5 / 180;
    for (let v = -Math.PI; v <= Math.PI; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            let x = Math.cos(u) * (4 + 3.8 * Math.cos(v));
            let y = Math.sin(u) * (4 + 3.8 * Math.cos(v));
            let z = (Math.cos(v)+Math.sin(v)-1) * (1+Math.sin(v)) * Math.log(1-Math.PI * v/10)+7.5 * Math.sin(v);
            let x2 = x/20;
            let y2 = y/20;
            let z2 = z/20;
            stroke((x2+0.5)*255, (y2+0.5)*255, (z2+0.5)*255);
            vertex(x2, y2, z2);
        }
    }
    endShape();
}