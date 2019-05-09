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
        p.rotate(Math.PI);
        p.scale(Math.min(p.width/2.0, p.height/2.0));

        p.beginShape(p.LINE_STRIP);
        p.stroke(0, 0, 255);
        p.vertex( 0.0, 0.5, 0.0);
        p.vertex(-0.5,-0.5, 0.0);
        p.vertex( 0.5,-0.5, 0.0);
        p.vertex( 0.0, 0.5, 0.0);
        p.endShape();
    }
}

window.onload = function () {
    let canvas = document.getElementById("canvas");
    let myp = new Processing(canvas, sketchProc);
}

