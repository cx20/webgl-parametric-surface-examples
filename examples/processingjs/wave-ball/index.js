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

	    // Prepare coordinate data of Wave Ball
	    // 
	
	    // Wellenkugel
	    // http://www.3d-meier.de/tut3/Seite63.html
	    // 
	    //   x = u cos(cos(u)) cos(v)
	    //   y = u cos(cos(u)) sin(v)
	    //   z = u sin(cos(u))
	    //   
	    //   u is an element of the set of numbers [0, 14.5]
	    //   v is an element of the set of numbers [0, 2 pi]
	
        p.beginShape(p.POINTS);
        p.strokeWeight(1.0);
        let ustep = 0.1;
        let vstep = Math.PI * 5 / 180;
        for (let v = 0; v <= 2 * Math.PI; v += vstep) {
            for (let u = 0; u <= 14.5; u += ustep) {
                let x = u * Math.cos(Math.cos(u)) * Math.cos(v);
                let y = u * Math.cos(Math.cos(u)) * Math.sin(v);
                let z = u * Math.sin(Math.cos(u));
                let x2 = x/25;
                let y2 = y/25;
                let z2 = z/25;
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
