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
        p.rotate(angle, angle, angle/10, 1);
        p.scale(Math.min(p.width/2.0, p.height/2.0));

        // Prepare coordinate data of heart surface
        //p.beginShape(p.LINE_STRIP);
        p.beginShape(p.POINTS);
        p.strokeWeight(2.0);
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
                p.stroke((x2+1.0)*255, (y2+0.5)*255, (z2+0.5)*255);
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
