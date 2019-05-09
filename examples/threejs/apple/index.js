let container;
let camera, scene, renderer;
let mesh;
let rad = 0.0;

let WIDTH_SEGMENT = 72;
let HEIGHT_SEGMENT = 72;
let WIDTH_SIZE = 1.0 * 2 / WIDTH_SEGMENT;
let HEIGHT_SIZE = 1.0 * 2 / WIDTH_SEGMENT;

let geometry = new THREE.BufferGeometry();
let positions = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);
let colors = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 3.5;
    scene = new THREE.Scene();

    scene.add( new THREE.AmbientLight( 0xffffff ) );

    let ustep = Math.PI * 5 / 180;
    let vstep = Math.PI * 5 / 180;
    let i = 0;
    for (let v = -Math.PI; v <= Math.PI; v += vstep) {
        for (let u = 0; u <= 2 * Math.PI; u += ustep) {
            let x = Math.cos(u) * (4 + 3.8 * Math.cos(v));
            let y = Math.sin(u) * (4 + 3.8 * Math.cos(v));
            let z = (Math.cos(v)+Math.sin(v)-1) * (1+Math.sin(v)) * Math.log(1-Math.PI * v/10)+7.5 * Math.sin(v);
            let x2 = x/20;
            let y2 = y/20;
            let z2 = z/20;
            positions[i * 3 + 0] = x2;
            positions[i * 3 + 1] = y2;
            positions[i * 3 + 2] = z2;

            colors[i * 3 + 0] = x2 + 0.8;
            colors[i * 3 + 1] = y2 + 0.2;
            colors[i * 3 + 2] = z2 + 0.2;
            
            i++;
        }
    }

    let indices = new Uint16Array(WIDTH_SEGMENT * HEIGHT_SEGMENT * 6);
    i = 0;
    for (let row = 0; row < HEIGHT_SEGMENT; row++) {
        for (let col = 0; col < WIDTH_SEGMENT; col++) {
            let a = (row + 1) * (WIDTH_SEGMENT + 1) + col;
            let b = (row + 0) * (WIDTH_SEGMENT + 1) + col;
            let c = (row + 0) * (WIDTH_SEGMENT + 1) + col + 1;
            let d = (row + 1) * (WIDTH_SEGMENT + 1) + col + 1;
            indices[i * 6 + 0] = b;
            indices[i * 6 + 1] = a;
            indices[i * 6 + 2] = c;
            indices[i * 6 + 3] = a;
            indices[i * 6 + 4] = d;
            indices[i * 6 + 5] = c;
            i++;
        }
    }
    
    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    
    let material = new THREE.MeshPhongMaterial( {
        color: 0xffffff,
        flatShading: true,
        vertexColors: THREE.VertexColors,
        shininess: 0
    } );

    //mesh = new THREE.Mesh(geometry, material);
    mesh = new THREE.Line(geometry, material);
    mesh.rotation.x = -Math.PI * 60/180;
    mesh.rotation.y = Math.PI * 10/180;

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    render();
    requestAnimationFrame(animate);
}

function render() {
    rad += Math.PI * 1.0 / 180.0
    mesh.rotation.x = rad;
    mesh.rotation.z = rad;
    renderer.render(scene, camera);
}
