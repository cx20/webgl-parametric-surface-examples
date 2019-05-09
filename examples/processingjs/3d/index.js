function sketchProc(p) {
    let angle = 0.0;
    let theta = 0.0;

    p.setup = function() {
        p.size(innerWidth,innerHeight, p.P3D);
        p.background(255, 255, 255);
        p.noFill();
    }

    p.draw = function() {
        theta += Math.PI * 1/180;
        angle += Math.PI / 180;
        p.background(0, 0, 0);
        p.translate(p.width/2.0, p.height/2.0, 0);
        p.rotateX(45);
        p.rotateZ(angle);
        p.scale(Math.min(p.width/2.0, p.height/2.0));

        // Plot a three-dimensional function
        p.beginShape(p.POINTS);
        for ( let j = -10; j < 10; j += 0.2 ) {
            for ( let i = -10; i < 10; i += 0.2) {
                let x = i;
                let y = j;
                let z = Math.sin(Math.sqrt(x*x+y*y) + theta)/Math.sqrt(x*x+y*y);
                let x2 = x / 10;
                let y2 = y / 10;
                let z2 = z / 2;
                p.stroke((x2+0.5)*255, (y2+0.5)*255, (z2+0.5)*255);
                p.vertex(x2, y2, z2);
            }
        }
        p.endShape();
    }
}

window.onload = function () {
    let canvas = document.getElementById("canvas");
    let myp = new Processing(canvas, sketchProc);
}
