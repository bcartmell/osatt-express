/* jshint esversion: 6, node: true */
const path = require('path');
const parseStl = require('./parseStl');

console.log('parseStl:', parseStl);

module.exports = {
  getStlModel: function() {
    console.log('parseStl.parseFile', parseStl.parseFile);
    var parseData = parseStl.parseFile('./CAD/sphere_chopped/sphere_chopped.stl');
    console.log('services.getStlModel returning', parseData);
    return parseData;
  }
};
