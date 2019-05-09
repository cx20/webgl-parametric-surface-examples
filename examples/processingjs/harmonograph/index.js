function sketchProc(p) {
    let angle = 0;
    let MAX = 3600;
    let A1 = 0.5, f1 = 2, p1 = 1/16, d1 = 0.02;
    let A2 = 0.5, f2 = 2, p2 = 3 / 2, d2 = 0.0315;
    let A3 = 0.5, f3 = 2, p3 = 13 / 15, d3 = 0.02;
    let A4 = 0.5, f4 = 2, p4 = 1, d4 = 0.02;

    p.setup = function() {
        p.size(innerWidth,innerHeight, p.P3D);
        p.background(255, 255, 255);
        p.noFill();
    }

    p.draw = function() {
        angle += Math.PI / 180;
        p.background(0, 0, 0);
        p.translate(p.width/2.0, p.height/2.0, 0);
        p.rotateX(45);
        p.rotateZ(angle);
        p.scale(Math.min(p.width/2.0, p.height/2.0));

        p.randomHarmonograph();
    }

    p.randomHarmonograph = function() {
        f1 = (f1 + Math.random() / 40) % 10;
        f2 = (f2 + Math.random() / 40) % 10;
        f3 = (f3 + Math.random() / 40) % 10;
        f4 = (f4 + Math.random() / 40) % 10;
        p1 += (Math.PI*2 * 0.5 / 360);
        p.drawHarmonograph();
    }

    p.drawHarmonograph = function ()
    {
        // x = A1 * sin(f1 * t + p1) * exp(-d1 * t) + A2 * sin(f2 * t + p2) * exp(-d2 * t)
        // y = A3 * sin(f3 * t + p3) * exp(-d3 * t) + A4 * sin(f4 * t + p4) * exp(-d4 * t)
        let x, y, z;
        let t = 0;
        p.beginShape(p.LINE_STRIP);
        for (let i = 0; i < MAX; i++) {
            x = A1 * Math.sin(f1 * t + Math.PI * p1) * Math.exp(-d1 * t) + A2 * Math.sin(f2 * t + Math.PI * p2) * Math.exp(-d2 * t);
            y = A3 * Math.sin(f3 * t + Math.PI * p3) * Math.exp(-d3 * t) + A4 * Math.sin(f4 * t + Math.PI * p4) * Math.exp(-d4 * t);
            z = A1 * Math.cos(f1 * t + Math.PI * p1) * Math.exp(-d1 * t) + A2 * Math.cos(f2 * t + Math.PI * p2) * Math.exp(-d2 * t);
            p.stroke((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
            p.vertex(x, y, z);
            t += 0.01;
        }
        p.endShape();
    }
}

window.onload = function () {
    let canvas = document.getElementById("canvas");
    let myp = new Processing(canvas, sketchProc);
}
