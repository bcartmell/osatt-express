import makeMesh from './renderMesh.js';

window.getMesh = function getMesh(path) {
  const request = new XMLHttpRequest();
  request.open('GET', path);
  request.addEventListener('load', () => {
    makeMesh.addModel(JSON.parse(request.responseText));
  });
  request.send();
};

window.makeMesh = makeMesh;
