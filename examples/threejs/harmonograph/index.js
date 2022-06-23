let scene, camera, renderer;

let MAX = 10000;
let geometry = new THREE.BufferGeometry();
let positions = new Float32Array(MAX * 3);
let colors = new Float32Array(MAX * 3);
let indices = new Uint16Array(MAX * 1);
let line;
let theta = 0;

let A1 = 50, f1 = 2, p1 = 1/16, d1 = 0.02;
let A2 = 50, f2 = 2, p2 = 3 / 2, d2 = 0.0315;
let A3 = 50, f3 = 2, p3 = 13 / 15, d3 = 0.02;
let A4 = 50, f4 = 2, p4 = 1, d4 = 0.02;

init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 200;
    scene.add(camera);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    initHarmonograph();
}

function initHarmonograph()
{
    for (let i = 0; i < MAX; i++) {
        indices[i] = i;
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    let material = new THREE.LineBasicMaterial({vertexColors: true});
    line = new THREE.Line(geometry, material, THREE.LineStrip);
    scene.add(line);
}

function randomHarmonograph() {
    f1 = (f1 + Math.random() / 40) % 10;
    f2 = (f2 + Math.random() / 40) % 10;
    f3 = (f3 + Math.random() / 40) % 10;
    f4 = (f4 + Math.random() / 40) % 10;
    p1 += (Math.PI*2 * 0.5 / 360);
    drawHarmonograph();
}

function drawHarmonograph()
{
    let x, y, z;
    let t = 0.0;
    let color = new THREE.Color();
    for (let i = 0; i < MAX; i++) {
        x = A1 * Math.sin(f1 * t + Math.PI * p1) * Math.exp(-d1 * t) + A2 * Math.sin(f2 * t + Math.PI * p2) * Math.exp(-d2 * t);
        y = A3 * Math.sin(f3 * t + Math.PI * p3) * Math.exp(-d3 * t) + A4 * Math.sin(f4 * t + Math.PI * p4) * Math.exp(-d4 * t);
        z = A1 * Math.cos(f1 * t + Math.PI * p1) * Math.exp(-d1 * t) + A2 * Math.cos(f2 * t + Math.PI * p2) * Math.exp(-d2 * t);
        line.geometry.attributes.position.array[i*3 + 0] = x;
        line.geometry.attributes.position.array[i*3 + 1] = y;
        line.geometry.attributes.position.array[i*3 + 2] = z;
        
        color.setHSL((i/MAX * 360 | 0) / 360.0, 0.80, 0.50);
        line.geometry.attributes.color.array[i*3 + 0] = color.r;
        line.geometry.attributes.color.array[i*3 + 1] = color.g;
        line.geometry.attributes.color.array[i*3 + 2] = color.b;

        t += 0.01;
    }
    line.geometry.attributes.position.needsUpdate = true; 
}

function animate(timestamp) {
    render(timestamp);
    requestAnimationFrame(animate);
}

function render(timestamp) {
    randomHarmonograph();

    camera.lookAt( scene.position );
    camera.position.x = 200 * Math.sin( theta * Math.PI / 180 ) * -1; // �t��]
    camera.position.y = 200 * Math.sin( 10 * Math.PI / 180 );
    camera.position.z = 200 * Math.cos( theta * Math.PI / 180 );
    
    theta++;

    renderer.render( scene, camera );
}
