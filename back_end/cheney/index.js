'use strict';
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

module.exports = chenify;
