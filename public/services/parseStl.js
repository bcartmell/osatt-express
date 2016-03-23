/* jshint esversion: 6, node: true */
'use strict';
const fs = require('fs');

function parseBuffer(data) {
  console.log('parsing buffer:', data);
  let vertices = [];

  // remove the HEADER, we don't need to parse it.
  data = data.slice(0,80);

  let facetsCount = data.readUIntLE(0,4);

  // the first 80 characters of an STL file are HEADER,
  // which we can ignore
  for (let i=4; i<data.length-12; i++) {
    let vertex = [];
    for (let j=0; j<12; j+=4) {
      vertex.push(data.readFloatLE(i+j));
    }
    vertices.push(vertex);
  }
  return vertices;
}

module.exports = {
  parseFile: function(filePath) {
    console.log('parsing file:', filePath);
    var data = fs.readFileSync(filePath);
    return parseBuffer(data);
    /* fs.readFile(filePath, function(err, data) {
      if (err) console.log(err);
      console.log('readFile result:', data);
      var vertices = parseBuffer(data);
      console.log('parseResult:', vertices);
      return vertices;
    }); */
  }
};
