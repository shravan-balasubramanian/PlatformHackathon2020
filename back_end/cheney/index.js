'use strict';
var JSZip = require("jszip");
const ADMZIP = require('adm-zip');

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



const backend_blueprint = {
  "name": "first-app",
  "flows": [{
      "start": "a",
      "location": "backend",
      "blocks":[{
          "id": "a",
          "class": "onBackend",
          "edges": {
              "success": "b",
              "failure": "b"
          },
          "arguments":{
            event: "onTicketCreate"
          }
      },{
        "id": "b",
        "class": "request",
        "edges": {
        },
        "arguments":{
          "url": "https://www.google.co.in/",
          "method": "get"
        },
        "response": "Call suceeded"
    }]
  }]
}
  
const frontend_blueprint = {
  "name": "first-app",
  "flows": [{
      "start": "a",
      "location": "frontend",
      "blocks":[{
          "id": "a",
          "class": "request",
          "edges": {
              "success": "b",
              "failure": "c"
          },
          "arguments":{
            "url": "https://www.google.co.in/",
            "method": "get"
          },
          "response": "Call suceeded"
      },{
          "id": "b",
          "class": "notify",
          "edges": {},
          "arguments": {
              "message": "Suceeded",
              "type": "info"
          }
      },
      {
          "id": "c",
          "class": "notify",
          "edges": {},
          "arguments": {
              "message": "failed.",
              "type": "danger"
          }
      }]
  }]
}
  

const generateApp = function() {
    const app = chenify({
      flows: backend_blueprint.flows,
      iparams:  []
    });
    
    const zip = new ADMZIP();
    Object
    .keys(app)
    .forEach(file => {
      console.log(file)
      zip.addFile(file,app[file])
    })
    zip.writeZip("files.zip");
  };

generateApp();
module.exports = chenify;
