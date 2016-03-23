'use strict';

const express = require('express');
const fs = require('fs');
const parseStl = require('./parseStl');

const app = express();

app.use(express.static(__dirname + '/public', {index: 'html/index.html'}));

app.get('/', express.static(__dirname + './public/html/index.html'));

app.get('/model/*', function(req, res) {
  let urlArr = req.originalUrl.split('/');
  let modelName = urlArr[urlArr.length-1];
  let modelType = modelName.slice(modelName.lastIndexOf('.'));
  modelName = modelName.slice(0, -modelType.length);
  console.log(modelName);
  console.log(modelType);

  let modelPath = __dirname + '/CAD/' + modelName + '/' + modelName+modelType;

  fs.readFile(modelPath, function(err, data) {
    if (err) throw err;
    res.send(JSON.stringify(parseStl(data)));
  });
});

app.listen(3000, function() {
  console.log('App running on port 3000');
});


