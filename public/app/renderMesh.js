/* jshint esversion: 6 */
import THREE from 'three';

const OrbitControls = require('three-orbit-controls')(THREE);

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const material = new THREE.MeshLambertMaterial({ wireframe: false, color: 0x00ff00 });
material.side = THREE.DoubleSide;

const controls = new OrbitControls(camera);

scene.add(new THREE.AmbientLight(0x333333));

renderer.setSize(window.innerWidth - 10, window.innerHeight - 10);
renderer.setClearColor(0x90C3D4);
document.body.appendChild(renderer.domElement);

function makeModelGeo(meshArr) {
  const modelGeo = new THREE.Geometry();

  let i = meshArr.length;
  while (i--) {
    meshArr[i].updateMatrix();
    modelGeo.merge(meshArr[i].geometry, meshArr[i].matrix);
  }

  return modelGeo;
}

function makeBufferGeometry(verticesArr) {
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(verticesArr.length * 3);
  const normals = new Float32Array(verticesArr.length * 3);

  for (let i = 0; i < verticesArr.length; i++) {
    for (let j = 0; j < 3; j++) {
      vertices[i * 3 + j] = (verticesArr[i][j]);
    }
  }

  geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.addAttribute('normal', new THREE.BufferAttribute(normals, 3));
  geometry.computeVertexNormals();
  return geometry;
}

camera.position.z = 12;
camera.lookAt(scene.position);

function addLight(position) {
  const light = new THREE.PointLight(0x777777);
  light.position.x = position.x;
  light.position.y = position.y;
  light.position.z = position.z;
  scene.add(light);
  // debugger;
}
addLight({ x: 0, y: 15, z: 15 });
addLight({ x: 15, y: -15, z: 15 });
addLight({ x: -15, y: -15, z: 15 });

addLight({ x: 15, y: 15, z: -15 });
addLight({ x: 0, y: -15, z: -15 });
addLight({ x: -15, y: 15, z: -15 });

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function relativePos(event, element) {
  const rect = element.getBoundingClientRect();
  return {
    x: Math.floor(event.clientX - rect.left),
    y: Math.floor(event.clientY - rect.top),
  };
}

function findMaxValue(arr) {
  // Find maximum value of nested Arrays
  let maxVal = 0;
  for (let i = 0, maxI = arr.length; i < maxI; i++) {
    let currentVal;
    if (arr[i] instanceof Array) currentVal = findMaxValue(arr[i]);
    else currentVal = arr[i];

    if (currentVal > maxVal) maxVal = Math.abs(currentVal);
  }
  return maxVal;
}

function setDistance(object, distance) {
  for (const axis in object.position) {
    if (object.position.hasOwnProperty(axis)) {
      if (object.position[axis] > 0) {
        object.position[axis] = distance;
      } else if (object.position[axis] < 0) {
        object.position[axis] = -distance;
      }
    }
  }
}

function setCameraDistance(camera, distance) {
  camera.position.x = distance;
  camera.position.y = distance;
  camera.position.z = distance;
}

function addModel(modelArr) {
  const material = new THREE.MeshLambertMaterial({ wireframe: false, color: 0x00ff00 });
  material.side = THREE.DoubleSide;
  const geometry = makeBufferGeometry(modelArr);
  const maxPos = findMaxValue(modelArr) + 20;

  setCameraDistance(camera, maxPos);
  camera.lookAt(scene.position);

  for (let i = 0; i < scene.children.length; i++) {
    if (scene.children[i] instanceof THREE.PointLight) {
      setDistance(scene.children[i], maxPos);
    }
  }

  const model = new THREE.Mesh(geometry, material);
  scene.add(model);
  render();
}

module.exports = {
  addModel: addModel,
  setCameraZ: function (cameraZ) {
    camera.position.z = cameraZ;
  },
};
