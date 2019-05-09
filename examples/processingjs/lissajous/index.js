function sketchProc(p) {
    let angle = 0.0;

    p.setup = function() {
        p.size(innerWidth,innerHeight, p.P3D);
        p.background(255, 255, 255);
        p.noFill();
    }

    p.draw = function() {
        angle += Math.PI / 180;
        p.background(0, 0, 0);
        p.translate(p.width/2.0, p.height/2.0, 0);
        p.rotateY(angle);
        p.scale(Math.min(p.width/2.0, p.height/2.0));

        // Prepare coordinate data of sine wave * cosine wave
        let MAX = 24;
        let A = 1.0;
        let B = 2.0;
        p.beginShape(p.LINE_STRIP);
        for ( let i = 0; i <= MAX; i++ ) {
            let x = 0.5 * Math.cos(2 * Math.PI * i / MAX * A);
            let y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B);
            let z = 0.5 * Math.sin(2 * Math.PI * i / MAX * A);
            p.stroke((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
            p.vertex(x, y, z);
        }
        p.endShape();
    }
}

window.onload = function () {
    let canvas = document.getElementById("canvas");
    let myp = new Processing(canvas, sketchProc);
}

