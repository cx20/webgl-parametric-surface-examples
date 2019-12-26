let camera, scene, renderer;
let mesh;
let rad = 0.0;

let WIDTH_SEGMENT =  32;
let HEIGHT_SEGMENT = 32;
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

    let num = 16;
    let i = 0;
    for (let v = -num; v <= num; v++) {
        for (let u = -num; u <= num; u++) {
            let theta = Math.PI * v / num;
            let z0 = u / num;
            let r = 4 * Math.sqrt(1 - z0 * z0) * Math.pow(Math.sin(Math.abs(theta)), Math.abs(theta));
            let x1 = r * Math.sin(theta);
            let y1 = r * Math.cos(theta);
            let z1 = z0 * 1.3;
            let x2 = x1 / 8;
            let y2 = y1 / 8;
            let z2 = z1 / 8;
            positions[i * 3 + 0] = x2;
            positions[i * 3 + 1] = y2;
            positions[i * 3 + 2] = z2;

            colors[i * 3 + 0] = x2 + 0.9;
            colors[i * 3 + 1] = y2 + 0.1;
            colors[i * 3 + 2] = z2 + 0.3;
            
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
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    
    let material = new THREE.MeshPhongMaterial( {
        color: 0xffffff,
        flatShading: true,
        vertexColors: THREE.VertexColors,
        shininess: 0
    } );

    //mesh = new THREE.Mesh(geometry, material);
    mesh = new THREE.Line(geometry, material);
    mesh.rotation.x = Math.PI * 60/180;
    mesh.rotation.y = -Math.PI * 10/180;

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
    //mesh.rotation.y = rad;
    mesh.rotation.z = rad;
    renderer.render(scene, camera);
}
