'use strict';

const builder = require('../builder.js');

const fs = require('fs');

function generate(blueprint) {
  const serverJS = blueprint
                    .flows
                    .filter(flow => flow.location === 'backend')
                    .map(builder.build)
                    .join('\n\n');

  if (serverJS) {
    return {
      'server/server.js': fs.readFileSync(__dirname + '/../../modules/backendmodules.js', 'utf8') + builder.backendWrapper(serverJS)
    };
  }

  return {};
}

module.exports = generate;
