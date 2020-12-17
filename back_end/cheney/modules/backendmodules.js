const needleNPM = require('needle');

const EventEmitter = function() {
  const handlers = {};
  
  this.on = function(event, handler) {
    if (handlers.hasOwnProperty(event)) {
      handlers[event].push(handler);
    } else {
      handlers[event] = [ handler ];
    }
  };
  
  this.emit = function(event, payload) {
    (handlers[event] || []).forEach(h => h(payload));
  };
}

const client = new EventEmitter();

const global = {};

/**
 *  Can't use promises here as they can't be resolved multiple times.
 */
function onBackend(configs) {
  return {
    then: function(callback) {
      client.on(configs.event, callback);
    }
  };
}

function globalize(configs, $) {
  global[configs.key] = $;
  
  return Promise.resolve($);
}

function request(configs) {
  return new Promise(function(resolve, reject) {
    return needleNPM(configs, function(error, response, body) {
      if (error) {
        return reject(error);
      }
      
      if (response.statusCode !== 200) {
        return reject({
          response: body,
          headers: response.headers,
          status: response.statusCode
        })
      }
      
      return resolve({
        response: body,
        headers: response.headers,
        status: response.statusCode
      });
    });
  });
}

function endInvoke(configs, $) {
  renderData(null, $)

  return Promise.resolve({});
}

function contextify(key, $) {
  console.log(`Storing ${JSON.stringify($)} with key as ${key}`);
}

function end() {}
