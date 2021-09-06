let container;
let camera, scene, renderer;
let mesh;
let theta = 0;
let rad = 0.0;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 3.5;
    scene = new THREE.Scene();

    let MAX = 360;
    let A = 100.0;
    let B = 99.0;
    let C = 1.0;
    let alpha = Math.PI/4;
    let beta  = Math.PI/3;
    let theta = 0; // Math.PI/2;

    let geometry = new THREE.BufferGeometry();
    let positions = new Float32Array((MAX*10+1) * 3);
    let colors = new Float32Array((MAX*10+1) * 3);
    let indices = new Uint16Array((MAX*10+1) * 1);

    let k = 0;
    for ( let i = 0; i <= MAX; i += 0.1 ) {
        let x = 0.5 * Math.sin(2 * Math.PI * i / MAX * A + alpha);
        let y = 0.5 * Math.sin(2 * Math.PI * i / MAX * B + beta);
        let z = 0.5 * Math.sin(2 * Math.PI * i / MAX * C + theta);
        positions[k * 3 + 0] = x;
        positions[k * 3 + 1] = y;
        positions[k * 3 + 2] = z;
        
        colors[k * 3 + 0] = x + 0.5;
        colors[k * 3 + 1] = y + 0.5;
        colors[k * 3 + 2] = z + 0.5;
        
        indices[k] = k;
        
        k++;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    
    let material = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    mesh = new THREE.Line(geometry, material, THREE.LineStrip);

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate(timestamp) {
    render(timestamp);
    requestAnimationFrame(animate);
}

function render(timestamp) {
    //rad += Math.PI * 1.0 / 180.0
    rad = timestamp / 1000; // Seconds since the first requestAnimationFrame (ms)
    mesh.rotation.y = rad;
    renderer.render(scene, camera);
}
