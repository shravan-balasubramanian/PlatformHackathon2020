'use strict';

const builder = require('../builder.js');

const fs = require('fs');

function generate(blueprint) {
  
  const appJS = blueprint
                .flows
                .filter(flow => flow.location === 'frontend')
                .map(builder.build)
                .join('\n\n');

  if (appJS) {
    return {
      'app/app.js': fs.readFileSync(__dirname + '/../../modules/frontendmodules.js', 'utf8') + appJS  ,
      'app/template.html': fs.readFileSync(__dirname + '/../../modules/template.html', 'utf8') 
    };
  }

  return {};
}

module.exports = generate;
