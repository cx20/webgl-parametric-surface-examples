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
        p.rotate(90, 1, 0, 0);
        p.rotate(angle, 0, 0, -1);
        p.scale(Math.min(p.width/2.0, p.height/2.0));

        // Prepare coordinate data of seashell surface
    
        // x = (a*(1-v/(2*pi))*(1+cos(u)) + c) * cos(n*v)
        // y = (a*(1-v/(2*pi))*(1+cos(u)) + c) * sin(n*v)
        // z = b*v/(2*pi) + a*(1-v/(2*pi)) * sin(u)
        // 
        // a,b: these determine how pointy or flat the shell is (informally...)
        // c: determines how much the shell overlaps with itself
        // n: the number of spirals in the shell

        p.beginShape(p.POINTS);
        p.strokeWeight(2.0);
        var ustep = Math.PI * 5 / 180;
        var vstep = Math.PI * 5 / 180;
        var a = 0.2;
        var b = 0.6;
        var c = 0.2;
        var n = 2.0;
        for (var v = 0; v <= 2 * Math.PI; v += vstep) {
            for (var u = 0; u <= 2 * Math.PI; u += ustep) {
                x = (a * (1 - v / (2 * Math.PI)) * (1 + Math.cos(u)) + c) * Math.cos(n * v);
                y = (a * (1 - v / (2 * Math.PI)) * (1 + Math.cos(u)) + c) * Math.sin(n * v);
                z = b * v / (2 * Math.PI) + a * (1 - v / (2 * Math.PI)) * Math.sin(u);
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
