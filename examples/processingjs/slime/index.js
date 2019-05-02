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
        var a = 1;
        var b = 1;
        var c = 1;
        var r = 1;
        var ustep = Math.PI * 5 / 180;
        var vstep = Math.PI * 5 / 180;
        for (var v = -Math.PI/2; v <= Math.PI/2; v += vstep) {
            for (var u = 0; u <= 2 * Math.PI; u += ustep) {
                var x = b * (Math.cos(v) * (r + Math.sin(v))) * Math.cos(u);
                var y = a * (r + Math.sin(v));
                var z = b * (Math.cos(v) * (r + Math.sin(v))) * Math.sin(u);
                var x2 = x/2;
                var y2 = y/2 - 0.5;
                var z2 = z/2;
                p.stroke((x2+0.5)*255, (y2+0.5)*255, (z2+0.5)*255);
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
