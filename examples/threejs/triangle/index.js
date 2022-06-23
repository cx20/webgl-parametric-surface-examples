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

    let positions = new Float32Array([
         0.0,  0.5, 0.0, // v0
        -0.5, -0.5, 0.0, // v1
         0.5, -0.5, 0.0, // v2
         0.0,  0.5, 0.0  // v0
    ]);
    let colors = new Float32Array([
         0.0,  0.0, 1.0, // v0
         0.0,  0.0, 1.0, // v1
         0.0,  0.0, 1.0, // v2
         0.0,  0.0, 1.0  // v0
    ]);

    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    let material = new THREE.LineBasicMaterial({
        vertexColors: true
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
