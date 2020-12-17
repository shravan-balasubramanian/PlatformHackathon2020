'use strict';
const express = require('express');
var bodyParser = require('body-parser')
const app = express()
const port = 3000

const jsonParser = bodyParser.json()

// Generators are sequential, hence an array to preserve order.
const generators = [
  require('./lib/generators/app.js'),
  require('./lib/generators/server.js'),
  require('./lib/generators/iparams.js'),
  require('./lib/generators/manifest.js'),
  require('./lib/generators/digest.js')
];

function chenify(blueprint) {
  const files = {
    'blueprint.json': JSON.stringify(blueprint, null, 2)
  };

  generators.reduce((files, generate) => Object.assign(files, generate(blueprint, files)), files);

  return files;
}

app.post('/chenify', jsonParser, (req, res) => {
  const blueprint = req.body;
  const result = chenify(blueprint);
  res.send({ result })
});

app.get('/', (req, res) => res.send('HELLO. Try /chenify'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
