var camera, scene, renderer, loader;
var geometry, material, mesh;

var w = window.innerWidth,
  h = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(60, w / h, 1, 2000);

  camHelper = new THREE.CameraHelper(camera);

  camera.position.z = 1;

  scene = new THREE.Scene();

  loader = new THREE.GLTFLoader();

  const url = "./frozen_flame_opened.glb";

  loader.load(
    url,
    function (gltf) {
      scene.add(gltf.scene);
      console.warn(gltf);
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
    }
  );

  renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  renderer.setClearColor(0xf4cccc);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);

  camera.position.x = 140;
  camera.position.y = 55;
  camera.position.z = 140;
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}
