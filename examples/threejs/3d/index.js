var container;
var camera, scene, renderer;
var mesh;
var theta = 0;

init();
animate();

function init() {
    container = document.getElementById('container');
    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 3.5;
    scene = new THREE.Scene();

    var WIDTH_SEGMENT = 100;
    var HEIGHT_SEGMENT = 100;

    var geometry = new THREE.BufferGeometry();
    var positions = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);
    var colors = new Float32Array((WIDTH_SEGMENT + 1) * (HEIGHT_SEGMENT + 1) * 3);

    var k = 0;
    for (var j = -10; j < 10; j += 0.2) {
        for (var i = -10; i < 10; i += 0.2) {
            var x = i;
            var y = j;
            var z = Math.sin(Math.sqrt(x * x + y * y) + theta) / Math.sqrt(x * x + y * y);
            var x2 = x / 10;
            var y2 = y / 10;
            var z2 = z / 2;
            positions[k * 3 + 0] = x2;
            positions[k * 3 + 1] = y2;
            positions[k * 3 + 2] = z2;

            colors[k * 3 + 0] = x2 + 0.5;
            colors[k * 3 + 1] = y2 + 0.5;
            colors[k * 3 + 2] = z2 + 0.5;

            k++;
        }
    }

    geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    //var material = new THREE.PointsMaterial( { size: 1.0, vertexColors: THREE.VertexColors } );
    var material = new THREE.PointsMaterial( { size: 0.05, vertexColors: THREE.VertexColors } );

    mesh = new THREE.Points( geometry, material );

    mesh.rotation.x = -Math.PI * 60/180;

    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

var rad = 0.0;
function render() {
    rad += Math.PI * 1.0 / 180.0
    mesh.rotation.z = rad;
    renderer.render(scene, camera);
}
