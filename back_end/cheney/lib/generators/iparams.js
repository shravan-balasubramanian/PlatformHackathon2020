'use strict';

function generate(blueprint) {
  const iparams = blueprint.configs || {} ;

  return {
    'config/iparams.json': JSON.stringify(iparams, null, 2)
  };
}

module.exports = generate;
