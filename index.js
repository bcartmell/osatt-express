'use strict';
const express = require('express');
const fs = require('fs');
const parseStl = require('./parseStl');

const app = express();

app.use(express.static(__dirname + '/public', { index: 'html/index.html' }));

app.get('/', express.static(__dirname + './public/html/index.html'));

app.get('/model/*', (req, res) => {
  const urlArr = req.originalUrl.split('/');
  let modelName = urlArr[urlArr.length - 1];
  const modelType = modelName.slice(modelName.lastIndexOf('.'));
  modelName = modelName.slice(0, -modelType.length);

  const modelPath = __dirname + '/CAD/' + modelName + '/' + modelName + modelType;

  fs.readFile(modelPath, (err, data) => {
    if (err) throw err;
    res.send(JSON.stringify(parseStl(data)));
  });
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});

