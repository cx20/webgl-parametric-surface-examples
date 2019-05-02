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

        // Prepare torus coordinate data
         
        // x = (R + r cos(v)) cos(u)
        // y = (R + r cos(v)) sin(u)
        // z = r sin(v)
        // 
        // u is an element of the set of numbers [0, 2 pi]
        // v is an element of the set of numbers [0, 2 pi]

        p.beginShape(p.POINTS);
        p.strokeWeight(2.0);
        var ustep = Math.PI * 5 / 180;
        var vstep = Math.PI * 5 / 180;
        var R = 0.5;
        var r = 0.2;
        for (var v = 0; v <= 2 * Math.PI; v += vstep) {
            for (var u = 0; u <= 2 * Math.PI; u += ustep) {
                var x = (R + r * Math.cos(v)) * Math.cos(u);
                var y = (R + r * Math.cos(v)) * Math.sin(u);
                var z = r * Math.sin(v);
                p.stroke((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
                p.vertex(x, y, z);
            }
        }
        p.endShape();
    }
    
}

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var myp = new Processing(canvas, sketchProc);
}
