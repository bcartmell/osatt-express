/* jshint esversion: 6 */
import THREE from 'three';

const renderer = new THREE.WebGLRenderer();
let model;
let scene = new THREE.Scene(); 
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
let light = new THREE.PointLight(0xffffff);
let light1 = new THREE.PointLight(0xffffff);
let material = new THREE.MeshLambertMaterial( {wireframe: false, color: 0x00ff00 });
material.side = THREE.DoubleSide;

renderer.setSize( window.innerWidth-10, window.innerHeight-10);
renderer.setClearColor(0x90C3D4);
document.body.appendChild(renderer.domElement);


function makeModelGeo(meshArr) {
  var modelGeo = new THREE.Geometry();

  var i = meshArr.length;
  while (i--) {
    meshArr[i].updateMatrix();
    modelGeo.merge(meshArr[i].geometry, meshArr[i].matrix);
  }

  return modelGeo;
}

/* function makeMeshExample(vertexPositions) {
  vertexPositions = vertexPositions || [
      [-1.0, -1.0,  1.0],
      [ 1.0, -1.0,  1.0],
      [ 1.0,  1.0,  1.0],

      [ 1.0,  1.0,  1.0],
      [-1.0,  1.0,  1.0],
      [-1.0, -1.0,  1.0]
    ];

  var geometry = new THREE.BufferGeometry();
  // create a simple square shape. We duplicate the top left and bottom right
  // vertices because each vertex needs to appear once per triangle.
  var vertices = new Float32Array( vertexPositions.length * 3 ); // three components per vertex


  // components of the position vector for each vertex are stored
  // contiguously in the buffer.
  for ( var i = 0; i < vertexPositions.length; i++ )
  {
    vertices[ i*3 + 0 ] = vertexPositions[i][0];
    vertices[ i*3 + 1 ] = vertexPositions[i][1];
    vertices[ i*3 + 2 ] = vertexPositions[i][2];
  }

  // itemSize = 3 because there are 3 values (components) per vertex
  geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
  return new THREE.Mesh( geometry, material );
} */

function makeBufferGeometry(verticesArr) {
  let geometry = new THREE.BufferGeometry();
  let vertices = new Float32Array(verticesArr.length * 3);
  let normals   = new Float32Array( verticesArr.length * 3 );

  for(let i=0; i<verticesArr.length; i++) {
    for (let j=0; j<3; j++) {
      vertices[i*3 + j] = (verticesArr[i][j]);
    }
  }

  geometry.addAttribute( 'position', new THREE.BufferAttribute(vertices, 3));
  geometry.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
  geometry.computeVertexNormals(); 
  return geometry;
  // return new THREE.Mesh(geometry, material);
}

camera.position.z = 12;
camera.lookAt(scene.position);

light.position.x = 10;
light.position.y = 15;
light.position.z = 25;

light1.position.x = -10;
light1.position.y = -15;
light1.position.z = -25;

scene.add(light);
scene.add(light1);


function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

renderer.domElement.addEventListener('mousedown', function(event) {
  var startPos = relativePos(event, renderer.domElement);
  trackDrag(function(event) {
    model.rotation.y += event.movementX / 100;
    model.rotation.x += event.movementY / 100;
  });
}, false);

function trackDrag(onMove, onEnd) {
  function end(event) {
    removeEventListener('mousemove', onMove);
    removeEventListener('mouseup', end);
    if (onEnd) onEnd(event);
  }
  addEventListener('mousemove', onMove);
  addEventListener('mouseup', end);
}

function relativePos(event, element) {
  var rect = element.getBoundingClientRect();
  return {
    x: Math.floor(event.clientX - rect.left),
    y: Math.floor(event.clientY - rect.top)
  };
}

function addModel(modelArr) {
  let material = new THREE.MeshLambertMaterial( {wireframe: false, color: 0x00ff00 });
  material.side = THREE.DoubleSide;

  model = new THREE.Mesh(makeBufferGeometry(modelArr) , material);
  scene.add(model);
  render();
}

module.exports = {
  addModel: addModel,
  setCameraZ: function(cameraZ) {
    camera.position.z = cameraZ;
  }
};
