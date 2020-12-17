'use strict';

function generate(blueprint, files) {
  let manifest = {
    'platform-version': '2.0',
     product: {
      "freshdesk": {}
    }
  };
  let isFrontend = false;
  for(var flow in blueprint.flows) {
    if(flow.location === 'frontend') {
      manifest.product.freshdesk = {
        location: {
          ticket_background: {
            url: 'template.html'
          }
        }
      }
    }
  }

  // Does the app have a serverless file?
  const hasServer = Object.keys(files).some(file => file.startsWith('server/'));

  if (hasServer) {
    manifest.dependencies = {
      needle: '2.0.1'
    };
  }

  return {
    'manifest.json': JSON.stringify(manifest, null, 2)
  };
}

module.exports = generate;
