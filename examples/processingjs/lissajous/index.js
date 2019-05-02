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
        p.rotateY(angle);
        p.scale(Math.min(p.width/2.0, p.height/2.0));

        // Prepare coordinate data of sine wave * cosine wave
        var MAX = 24;
        var A = 1.0;
        var B = 2.0;
        p.beginShape(p.LINE_STRIP);
        for ( var i = 0; i <= MAX; i++ ) {
            var x = 0.5 * Math.cos(2 * Math.PI * i / MAX * A);
            var y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B);
            var z = 0.5 * Math.sin(2 * Math.PI * i / MAX * A);
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

