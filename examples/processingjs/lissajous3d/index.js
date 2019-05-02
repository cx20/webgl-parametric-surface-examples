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
        p.translate(p.width/2.0, p.height/2.0, 50);
        p.rotateY(angle);
        p.scale(Math.min(p.width/2.0, p.height/2.0));

        // Prepare coordinate data of 3D Lissajous
    
        // x = sin(2 * pi / 360 * t1 + alpha)
        // y = sin(2 * pi / 360 * t2 + beta)
        // z = sin(2 * pi / 360 * t3 + gamma)

        var MAX = 360;
        var A = 100.0;
        var B = 99.0;
        var C = 1.0;
        var alpha = Math.PI/4;
        var beta  = Math.PI/3;
        var theta = 0; // Math.PI/2;
        p.beginShape(p.LINE_STRIP);
        for ( var i = 0; i <= MAX; i += 0.1 ) {
            var x = 0.5 * Math.sin(2 * Math.PI * i / MAX * A + alpha);
            var y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B + beta);
            var z = 0.5 * Math.sin(2 * Math.PI * i / MAX * C + theta);
            p.stroke((x+0.5)*255, (y+0.5)*255, (z+0.5)*255);
            p.vertex(x, y, z);
        }
        p.endShape();
    }
}

window.onload = function () {
    var canvas = document.getElementById("canvas");
    var myp = new Processing(canvas, sketchProc);
}

