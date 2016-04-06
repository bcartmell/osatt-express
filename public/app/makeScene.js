import THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);

module.exports = {
  buildScene: function buildScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const controls = new OrbitControls(camera);
    scene.add(camera)
    scene.add(new THREE.AmbientLight(0x333333));
    return scene;
  },
  buildRenderer: function buildRenderer({
    x = window.innerWidth - 10,
    y = window.innerHeight - 10,
    clearColor = 0x90C3D4,
  } = {}) {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(x, y);
    renderer.setClearColor(clearColor);
  },
};
