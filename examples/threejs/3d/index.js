import * as THREE from 'three';

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

    let WIDTH_SEGMENT = 100;
    let HEIGHT_SEGMENT = 100;

    let geometry = new THREE.BufferGeometry();
    let positions = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);
    let colors = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);

    let k = 0;
    for (let j = -10; j < 10; j += 0.2) {
        for (let i = -10; i < 10; i += 0.2) {
            let x = i;
            let y = j;
            let z = Math.sin(Math.sqrt(x * x + y * y) + theta) / Math.sqrt(x * x + y * y);
            let x2 = x / 10;
            let y2 = y / 10;
            let z2 = z / 2;
            positions[k * 3 + 0] = x2;
            positions[k * 3 + 1] = y2;
            positions[k * 3 + 2] = z2;

            colors[k * 3 + 0] = x2 + 0.5;
            colors[k * 3 + 1] = y2 + 0.5;
            colors[k * 3 + 2] = z2 + 0.5;

            k++;
        }
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    //let material = new THREE.PointsMaterial( { size: 1.0, vertexColors: true} );
    let material = new THREE.PointsMaterial( { size: 0.05, vertexColors: true} );

    mesh = new THREE.Points( geometry, material );

    mesh.rotation.x = -Math.PI * 60/180;

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
    mesh.rotation.z = rad;
    renderer.render(scene, camera);
}
