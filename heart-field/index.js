var container, scene, camera, renderer, group, controls, camHelper;

var w = window.innerWidth,
  h = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(60, w / h, 1, 2000);
  camHelper = new THREE.CameraHelper(camera);

  scene = new THREE.Scene();

  group = new THREE.Group();

  scene.add(group);

  var light = new THREE.PointLight("0xffff00");

  light.position.set(10, 0, 25);
  scene.add(light);

  function addShape(shape, color, x, y, z, rx, ry, rz, s) {
    var extrudeSettings = {
      amount: 1,
      bevelEnabled: true,
      bevelSegments: 1,
      steps: 1,
      bevelSize: 1,
      bevelThickness: 1,
    };
    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);

    var material = new THREE.MeshNormalMaterial();

    var mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(x, y, z);
    mesh.rotation.set(rx, ry, rz);
    mesh.scale.set(s, s, s);

    group.add(mesh);
  }
  // Shape
  var x = 0,
    y = 0;

  var shape = new THREE.Shape();

  shape.moveTo(x + 5, y + 5);
  shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
  shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
  shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
  shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
  shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
  shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);

  var numberOfShapes = 1000;

  for (i = 0; i < numberOfShapes; i++) {
    addShape(
      shape,
      0xff3333, // color
      Math.random() * 5, // x pos
      Math.random() * i * 20, // y pos
      Math.random() * i * 20, // z pos
      Math.random() > 0.5 ? -1 : 1 * 2 * Math.PI, // x rotation
      Math.random() * 3 * Math.PI, // y rotation
      Math.random() * 2 * Math.PI, // z rotation
      1
    );
  }
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  container.appendChild(renderer.domElement);
  renderer.setClearColor(0xf4cccc);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  camera = new THREE.PerspectiveCamera(60, w / h, 1, 2000);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  camera.position.x = 140;
  camera.position.y = 55;
  camera.position.z = 140;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  render();
}

function render() {
  renderer.render(scene, camera);
}
