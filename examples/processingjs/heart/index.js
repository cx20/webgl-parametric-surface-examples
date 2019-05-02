function sketchProc(p) {
    var angle = 0.0;

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
        var num = 16;
        for (var i = -Math.PI * num; i <= Math.PI * num; i++) {
            for (var j = -num; j <= num; j++) {
                var theta = i / num;
                var z0 = j / num;
                var r = 4 * Math.sqrt(1 - z0 * z0) * Math.pow(Math.sin(Math.abs(theta)), Math.abs(theta));
                var x1 = r * Math.sin(theta);
                var y1 = r * Math.cos(theta);
                var z1 = z0;
                var x2 = x1 / 8;
                var y2 = y1 / 8;
                var z2 = z1 / 8;
                p.stroke((x2+1.0)*255, (y2+0.5)*255, (z2+0.5)*255);
                p.vertex(x2, y2, z2);
            }
        }
        p.endShape();
    }
    
}

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var myp = new Processing(canvas, sketchProc);
}
