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

function globalize(key, $) {
  global[key] = $;
  
  return Promise.resolve($);
}

function request(configs) {
  return new Promise(function(resolve, reject) {
    var url;
    var params= {};
    if(configs.domain.includes('shopify')) {
      params = {
          "order": {
            "line_items": [
              {
                "title": configs.item_name,
                "price": 74.99,
                "grams": "1300",
                "quantity": configs.quantity,
                "tax_lines": [
                  {
                    "price": 13.5,
                    "rate": 0.06,
                    "title": "State tax"
                  }
                ]
              }
            ],
            "transactions": [
              {
                "kind": "sale",
                "status": "success",
                "amount": 238.47
              }
            ],
            "total_tax": 13.5,
            "currency": "EUR"
          }
      }
      url = `https://${configs.api_key}:${configs.password}@${configs.domain}/admin/api/2020-10/orders.json`
    }
    return needleNPM.request('post', url, params, {json: true}, function(error, response) {
      if (error) {
        return reject(error);
      }
      
      if (response.statusCode !== 200) {
        return reject({
          response: response.body,
          headers: response.headers,
          status: response.statusCode
        })
      }
      return resolve({
        response: response.body,
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

function ifelse(configs, $) {
  return new Promise(function(resolve, reject) {
    switch (configs.op) {
      case '==':
        configs.left == configs.right ? resolve($) : reject($);
        break;
      case '!=':
        configs.left != configs.right ? resolve($) : reject($);
        break;
      case '>':
        configs.left > configs.right ? resolve($) : reject($);
        break;
      case '<':
        configs.left < configs.right ? resolve($) : reject($);
        break;
      case '>=':
        configs.left >= configs.right ? resolve($) : reject($);
        break;
      case '<=':
        configs.left <= configs.right ? resolve($) : reject($);
        break;
    }
  });
}