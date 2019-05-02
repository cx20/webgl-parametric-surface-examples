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

        // Prepare coordinate data of apple surface

        // x = cos (u) (4 + 3.8 cos (v))
        // y = sin (u) (4 + 3.8 cos (v))
        // z = (cos (v) + sin (v) -1) (1 + sin (v)) log (1-pi v / 10) +7.5 sin (v)
        // 
        // u is an element of the set of numbers [0, 2 pi]
        // v is an element of the set of numbers [-pi, pi]

        p.beginShape(p.LINE_STRIP);
        var ustep = Math.PI * 5 / 180;
        var vstep = Math.PI * 5 / 180;
        for (var v = -Math.PI; v <= Math.PI; v += vstep) {
            for (var u = 0; u <= 2 * Math.PI; u += ustep) {
                var x = Math.cos(u) * (4 + 3.8 * Math.cos(v));
                var y = Math.sin(u) * (4 + 3.8 * Math.cos(v));
                var z = (Math.cos(v)+Math.sin(v)-1) * (1+Math.sin(v)) * Math.log(1-Math.PI * v/10)+7.5 * Math.sin(v);
                var x2 = x/20;
                var y2 = y/20;
                var z2 = z/20;
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
