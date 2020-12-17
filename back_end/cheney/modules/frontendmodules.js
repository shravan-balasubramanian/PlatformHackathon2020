

window.context = {};

function begin() {
  return new Promise(function(resolve, reject) {
    window.addEventListener('load', function() {
      app.initialized().then(function(client) {
        window.client = window.client || client;
        
        client.iparams.get().then(function(iparams) {
          window.iparams = iparams;
          resolve({});
        }, reject);
      }, reject);
    });
  });
}

/**
 *  Can't use promises here as they can't be resolved multiple times.
 */
function on(configs) {
  return {
    then: function(callback) {
      document.addEventListener(configs.event, callback);
    }
  };
}

function onAppEvent(configs) {
  return {
    then: function(callback) {
      client.events.on(configs.event, callback);
    }
  };
}

function hideEntity(configs) {
  return client.interface.trigger('hide', {
    id: configs.entity
  });
}

function emit(configs, $) {
  document.dispatchEvent(new CustomEvent(configs.event, {
    detail: $
  }));

  return Promise.resolve($);
}

function invoke(configs, $) {
  return client.request.invoke(configs.method, $);
}

function request(configs) {
  return client.request[configs.method](configs.url, configs.options || {});
}

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

function notify(configs) {
  return client.interface.trigger('showNotify', configs);
}

function db(configs) {
  return client.db[configs.method](configs.key, configs.value);
}

function contextify(key, $) {
  console.log(`Storing ${JSON.stringify($)} with key as ${key}`);
  window.context[key] = $;
}

function end() {
  console.log('Reached end of flow.');
}

