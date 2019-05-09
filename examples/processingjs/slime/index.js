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
        p.rotate(60, 1, 0, 0);
        p.rotate(angle, angle, angle, 1);
        p.scale(Math.min(p.width/2.0, p.height/2.0));

        // Prepare slime coordinate data
        // x = b (cos(v) (r + sin(v))) cos(u)
        // y = a (r + sin(v))
        // z = b (cos(v) (r + sin(v))) sin(u)

        //p.beginShape(p.POINTS);
        p.beginShape(p.LINE_STRIP);
        p.strokeWeight(1.0);
        let a = 1;
        let b = 1;
        let c = 1;
        let r = 1;
        let ustep = Math.PI * 5 / 180;
        let vstep = Math.PI * 5 / 180;
        for (let v = -Math.PI/2; v <= Math.PI/2; v += vstep) {
            for (let u = 0; u <= 2 * Math.PI; u += ustep) {
                let x = b * (Math.cos(v) * (r + Math.sin(v))) * Math.cos(u);
                let y = a * (r + Math.sin(v));
                let z = b * (Math.cos(v) * (r + Math.sin(v))) * Math.sin(u);
                let x2 = x/2;
                let y2 = y/2 - 0.5;
                let z2 = z/2;
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
