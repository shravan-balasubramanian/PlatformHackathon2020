require=function(){return function t(n,e,r){function i(s,f){if(!e[s]){if(!n[s]){var u="function"==typeof require&&require;if(!f&&u)return u(s,!0);if(o)return o(s,!0);var a=new Error("Cannot find module '"+s+"'");throw a.code="MODULE_NOT_FOUND",a}var c=e[s]={exports:{}};n[s][0].call(c.exports,function(t){return i(n[s][1][t]||t)},c,c.exports,t,n,e,r)}return e[s].exports}for(var o="function"==typeof require&&require,s=0;s<r.length;s++)i(r[s]);return i}}()({1:[function(t,n,e){const r=/{{|}}/g,i=[],o=["onTicketCreate","onTicketUpdate","onNoteCreate","onContactCreate","onContactUpdate"];function s(t,n){const e=(o=n.arguments||{},JSON.stringify(o,function(t,n){return r.test(n)?"`"+n.replace(r,function(t){return"{{"===t?"${":"}"})+"`":n}).replace(/"`|`"/g,"`"));var o;const s=n.edges.failure||"end",f=n.edges.success||"end",u=n.class.replace(/ |-/g,"_");return"onBackend"===n.class?(i.push(JSON.parse(e).event),`\nfunction ${n.id}() {\n      ${u}(${e})\n        .then(function($) {\n          globalize("result",$.data.ticket);\n          return ${f}();\n        }, ${s});\n    }`):`\nfunction ${n.id}() {\n  ${u}(${e})\n    .then(function($) {\n      contextify('${n.result}', $);\n      return ${f}();\n    }, ${s});\n}`}n.exports={build:function(t,n){const e=t.blocks.map(t=>s(0,t));var r;return r=t.start,("frontend"===t.location?`begin().then(${r}, end);\n`:`${r}();`)+e.join("\n")},backendWrapper:function(t){const n=Array.from(new Set(i)),e={events:n.filter(t=>o.includes(t)).map(t=>({event:t,callback:t}))};return n.forEach(t=>{e[t]=`\`function(message) { client.emit('${t}', message); }\``}),`\n\n${t}\n\nexports=${JSON.stringify(e)};`.replace(/"`|`"/g,"")}}},{}],2:[function(t,n,e){"use strict";const r=t("../builder.js");n.exports=function(t){const n=t.flows.filter(t=>"frontend"===t.location).map(r.build).join("\n\n");return n?{"app/app.js":"\n\nwindow.context = {};\n\nfunction begin() {\n  return new Promise(function(resolve, reject) {\n    window.addEventListener('load', function() {\n      app.initialized().then(function(client) {\n        window.client = window.client || client;\n        \n        client.iparams.get().then(function(iparams) {\n          window.iparams = iparams;\n          resolve({});\n        }, reject);\n      }, reject);\n    });\n  });\n}\n\n/**\n *  Can't use promises here as they can't be resolved multiple times.\n */\nfunction on(configs) {\n  return {\n    then: function(callback) {\n      document.addEventListener(configs.event, callback);\n    }\n  };\n}\n\nfunction onAppEvent(configs) {\n  return {\n    then: function(callback) {\n      client.events.on(configs.event, callback);\n    }\n  };\n}\n\nfunction hideEntity(configs) {\n  return client.interface.trigger('hide', {\n    id: configs.entity\n  });\n}\n\nfunction emit(configs, $) {\n  document.dispatchEvent(new CustomEvent(configs.event, {\n    detail: $\n  }));\n\n  return Promise.resolve($);\n}\n\nfunction invoke(configs, $) {\n  return client.request.invoke(configs.method, $);\n}\n\nfunction request(configs) {\n  return client.request[configs.method](configs.url, configs.options || {});\n}\n\nfunction ifelse(configs, $) {\n  return new Promise(function(resolve, reject) {\n    switch (configs.op) {\n      case '==':\n        configs.left == configs.right ? resolve($) : reject($);\n        break;\n      case '!=':\n        configs.left != configs.right ? resolve($) : reject($);\n        break;\n      case '>':\n        configs.left > configs.right ? resolve($) : reject($);\n        break;\n      case '<':\n        configs.left < configs.right ? resolve($) : reject($);\n        break;\n      case '>=':\n        configs.left >= configs.right ? resolve($) : reject($);\n        break;\n      case '<=':\n        configs.left <= configs.right ? resolve($) : reject($);\n        break;\n    }\n  });\n}\n\nfunction notify(configs) {\n  return client.interface.trigger('showNotify', configs);\n}\n\nfunction db(configs) {\n  return client.db[configs.method](configs.key, configs.value);\n}\n\nfunction contextify(key, $) {\n  console.log(`Storing ${JSON.stringify($)} with key as ${key}`);\n  window.context[key] = $;\n}\n\nfunction end() {\n  console.log('Reached end of flow.');\n}\n\n"+n,"app/template.html":'<html>\n  <script src="https://static.freshcloud.io/fdk/2.0/assets/fresh_client.js"><\/script>\n  <script src="https://code.jquery.com/jquery-1.9.1.min.js"><\/script>\n  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">\n  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"><\/script>\n  <script src="app.js"><\/script>\n  <body>\n    \n  </body>\n</html>\n'}:{}}},{"../builder.js":1}],3:[function(t,n,e){(function(t){(function(){"use strict";n.exports=function(n,e){const r=Object.keys(e).filter(t=>"manifest.json"===t||t.startsWith("app/")).reduce((t,n)=>t+e[n],"");return{"digest.md5":t.from(r).toString("hex")}}}).call(this)}).call(this,t("buffer").Buffer)},{buffer:8}],4:[function(t,n,e){"use strict";n.exports=function(t){const n=t.configs||{};return{"config/iparams.json":JSON.stringify(n,null,2)}}},{}],5:[function(t,n,e){"use strict";n.exports=function(t,n){let e={"platform-version":"2.0",product:{freshdesk:{}}};for(var r in t.flows)"frontend"===r.location&&(e.product.freshdesk={location:{ticket_background:{url:"template.html"}}});return Object.keys(n).some(t=>t.startsWith("server/"))&&(e.dependencies={needle:"2.0.1"}),{"manifest.json":JSON.stringify(e,null,2)}}},{}],6:[function(t,n,e){"use strict";const r=t("../builder.js");n.exports=function(t){const n=t.flows.filter(t=>"backend"===t.location).map(r.build).join("\n\n");return n?{"server/server.js":'const needleNPM = require(\'needle\');\n\nconst EventEmitter = function() {\n  const handlers = {};\n  \n  this.on = function(event, handler) {\n    if (handlers.hasOwnProperty(event)) {\n      handlers[event].push(handler);\n    } else {\n      handlers[event] = [ handler ];\n    }\n  };\n  \n  this.emit = function(event, payload) {\n    (handlers[event] || []).forEach(h => h(payload));\n  };\n}\n\nconst client = new EventEmitter();\n\nconst global = {};\n\n/**\n *  Can\'t use promises here as they can\'t be resolved multiple times.\n */\nfunction onBackend(configs) {\n  return {\n    then: function(callback) {\n      client.on(configs.event, callback);\n    }\n  };\n}\n\nfunction globalize(key, $) {\n  global[key] = $;\n  \n  return Promise.resolve($);\n}\n\nfunction request(configs) {\n  return new Promise(function(resolve, reject) {\n    var url;\n    var params= {};\n    if(configs.domain.includes(\'shopify\')) {\n      params = {\n          "order": {\n            "line_items": [\n              {\n                "title": configs.item_name,\n                "price": 74.99,\n                "grams": "1300",\n                "quantity": configs.quantity,\n                "tax_lines": [\n                  {\n                    "price": 13.5,\n                    "rate": 0.06,\n                    "title": "State tax"\n                  }\n                ]\n              }\n            ],\n            "transactions": [\n              {\n                "kind": "sale",\n                "status": "success",\n                "amount": 238.47\n              }\n            ],\n            "total_tax": 13.5,\n            "currency": "EUR"\n          }\n      }\n      url = `https://${configs.api_key}:${configs.password}@${configs.domain}/admin/api/2020-10/orders.json`\n    }\n    return needleNPM.request(\'post\', url, params, {json: true}, function(error, response) {\n      if (error) {\n        return reject(error);\n      }\n      \n      if (response.statusCode !== 200) {\n        return reject({\n          response: response.body,\n          headers: response.headers,\n          status: response.statusCode\n        })\n      }\n      return resolve({\n        response: response.body,\n        headers: response.headers,\n        status: response.statusCode\n      });\n    });\n  });\n}\n\nfunction endInvoke(configs, $) {\n  renderData(null, $)\n\n  return Promise.resolve({});\n}\n\nfunction contextify(key, $) {\n  console.log(`Storing ${JSON.stringify($)} with key as ${key}`);\n}\n\nfunction end() {}\n\nfunction ifelse(configs, $) {\n  return new Promise(function(resolve, reject) {\n    switch (configs.op) {\n      case \'==\':\n        configs.left == configs.right ? resolve($) : reject($);\n        break;\n      case \'!=\':\n        configs.left != configs.right ? resolve($) : reject($);\n        break;\n      case \'>\':\n        configs.left > configs.right ? resolve($) : reject($);\n        break;\n      case \'<\':\n        configs.left < configs.right ? resolve($) : reject($);\n        break;\n      case \'>=\':\n        configs.left >= configs.right ? resolve($) : reject($);\n        break;\n      case \'<=\':\n        configs.left <= configs.right ? resolve($) : reject($);\n        break;\n    }\n  });\n}'+r.backendWrapper(n)}:{}}},{"../builder.js":1}],7:[function(t,n,e){"use strict";e.byteLength=function(t){var n=a(t),e=n[0],r=n[1];return 3*(e+r)/4-r},e.toByteArray=function(t){var n,e,r=a(t),s=r[0],f=r[1],u=new o(function(t,n,e){return 3*(n+e)/4-e}(0,s,f)),c=0,h=f>0?s-4:s;for(e=0;e<h;e+=4)n=i[t.charCodeAt(e)]<<18|i[t.charCodeAt(e+1)]<<12|i[t.charCodeAt(e+2)]<<6|i[t.charCodeAt(e+3)],u[c++]=n>>16&255,u[c++]=n>>8&255,u[c++]=255&n;2===f&&(n=i[t.charCodeAt(e)]<<2|i[t.charCodeAt(e+1)]>>4,u[c++]=255&n);1===f&&(n=i[t.charCodeAt(e)]<<10|i[t.charCodeAt(e+1)]<<4|i[t.charCodeAt(e+2)]>>2,u[c++]=n>>8&255,u[c++]=255&n);return u},e.fromByteArray=function(t){for(var n,e=t.length,i=e%3,o=[],s=0,f=e-i;s<f;s+=16383)o.push(c(t,s,s+16383>f?f:s+16383));1===i?(n=t[e-1],o.push(r[n>>2]+r[n<<4&63]+"==")):2===i&&(n=(t[e-2]<<8)+t[e-1],o.push(r[n>>10]+r[n>>4&63]+r[n<<2&63]+"="));return o.join("")};for(var r=[],i=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",f=0,u=s.length;f<u;++f)r[f]=s[f],i[s.charCodeAt(f)]=f;function a(t){var n=t.length;if(n%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var e=t.indexOf("=");return-1===e&&(e=n),[e,e===n?0:4-e%4]}function c(t,n,e){for(var i,o,s=[],f=n;f<e;f+=3)i=(t[f]<<16&16711680)+(t[f+1]<<8&65280)+(255&t[f+2]),s.push(r[(o=i)>>18&63]+r[o>>12&63]+r[o>>6&63]+r[63&o]);return s.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63},{}],8:[function(t,n,e){(function(n){(function(){"use strict";var n=t("base64-js"),r=t("ieee754");e.Buffer=s,e.SlowBuffer=function(t){+t!=t&&(t=0);return s.alloc(+t)},e.INSPECT_MAX_BYTES=50;var i=2147483647;function o(t){if(t>i)throw new RangeError('The value "'+t+'" is invalid for option "size"');var n=new Uint8Array(t);return n.__proto__=s.prototype,n}function s(t,n,e){if("number"==typeof t){if("string"==typeof n)throw new TypeError('The "string" argument must be of type string. Received type number');return a(t)}return f(t,n,e)}function f(t,n,e){if("string"==typeof t)return function(t,n){"string"==typeof n&&""!==n||(n="utf8");if(!s.isEncoding(n))throw new TypeError("Unknown encoding: "+n);var e=0|l(t,n),r=o(e),i=r.write(t,n);i!==e&&(r=r.slice(0,i));return r}(t,n);if(ArrayBuffer.isView(t))return c(t);if(null==t)throw TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);if(P(t,ArrayBuffer)||t&&P(t.buffer,ArrayBuffer))return function(t,n,e){if(n<0||t.byteLength<n)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<n+(e||0))throw new RangeError('"length" is outside of buffer bounds');var r;r=void 0===n&&void 0===e?new Uint8Array(t):void 0===e?new Uint8Array(t,n):new Uint8Array(t,n,e);return r.__proto__=s.prototype,r}(t,n,e);if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type number');var r=t.valueOf&&t.valueOf();if(null!=r&&r!==t)return s.from(r,n,e);var i=function(t){if(s.isBuffer(t)){var n=0|h(t.length),e=o(n);return 0===e.length?e:(t.copy(e,0,0,n),e)}if(void 0!==t.length)return"number"!=typeof t.length||q(t.length)?o(0):c(t);if("Buffer"===t.type&&Array.isArray(t.data))return c(t.data)}(t);if(i)return i;if("undefined"!=typeof Symbol&&null!=Symbol.toPrimitive&&"function"==typeof t[Symbol.toPrimitive])return s.from(t[Symbol.toPrimitive]("string"),n,e);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t)}function u(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('The value "'+t+'" is invalid for option "size"')}function a(t){return u(t),o(t<0?0:0|h(t))}function c(t){for(var n=t.length<0?0:0|h(t.length),e=o(n),r=0;r<n;r+=1)e[r]=255&t[r];return e}function h(t){if(t>=i)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+i.toString(16)+" bytes");return 0|t}function l(t,n){if(s.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||P(t,ArrayBuffer))return t.byteLength;if("string"!=typeof t)throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof t);var e=t.length,r=arguments.length>2&&!0===arguments[2];if(!r&&0===e)return 0;for(var i=!1;;)switch(n){case"ascii":case"latin1":case"binary":return e;case"utf8":case"utf-8":return R(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*e;case"hex":return e>>>1;case"base64":return M(t).length;default:if(i)return r?-1:R(t).length;n=(""+n).toLowerCase(),i=!0}}function p(t,n,e){var r=t[n];t[n]=t[e],t[e]=r}function g(t,n,e,r,i){if(0===t.length)return-1;if("string"==typeof e?(r=e,e=0):e>2147483647?e=2147483647:e<-2147483648&&(e=-2147483648),q(e=+e)&&(e=i?0:t.length-1),e<0&&(e=t.length+e),e>=t.length){if(i)return-1;e=t.length-1}else if(e<0){if(!i)return-1;e=0}if("string"==typeof n&&(n=s.from(n,r)),s.isBuffer(n))return 0===n.length?-1:y(t,n,e,r,i);if("number"==typeof n)return n&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,n,e):Uint8Array.prototype.lastIndexOf.call(t,n,e):y(t,[n],e,r,i);throw new TypeError("val must be string, number or Buffer")}function y(t,n,e,r,i){var o,s=1,f=t.length,u=n.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(t.length<2||n.length<2)return-1;s=2,f/=2,u/=2,e/=2}function a(t,n){return 1===s?t[n]:t.readUInt16BE(n*s)}if(i){var c=-1;for(o=e;o<f;o++)if(a(t,o)===a(n,-1===c?0:o-c)){if(-1===c&&(c=o),o-c+1===u)return c*s}else-1!==c&&(o-=o-c),c=-1}else for(e+u>f&&(e=f-u),o=e;o>=0;o--){for(var h=!0,l=0;l<u;l++)if(a(t,o+l)!==a(n,l)){h=!1;break}if(h)return o}return-1}function d(t,n,e,r){e=Number(e)||0;var i=t.length-e;r?(r=Number(r))>i&&(r=i):r=i;var o=n.length;r>o/2&&(r=o/2);for(var s=0;s<r;++s){var f=parseInt(n.substr(2*s,2),16);if(q(f))return s;t[e+s]=f}return s}function v(t,n,e,r){return N(R(n,t.length-e),t,e,r)}function w(t,n,e,r){return N(function(t){for(var n=[],e=0;e<t.length;++e)n.push(255&t.charCodeAt(e));return n}(n),t,e,r)}function b(t,n,e,r){return w(t,n,e,r)}function m(t,n,e,r){return N(M(n),t,e,r)}function E(t,n,e,r){return N(function(t,n){for(var e,r,i,o=[],s=0;s<t.length&&!((n-=2)<0);++s)e=t.charCodeAt(s),r=e>>8,i=e%256,o.push(i),o.push(r);return o}(n,t.length-e),t,e,r)}function A(t,e,r){return 0===e&&r===t.length?n.fromByteArray(t):n.fromByteArray(t.slice(e,r))}function B(t,n,e){e=Math.min(t.length,e);for(var r=[],i=n;i<e;){var o,s,f,u,a=t[i],c=null,h=a>239?4:a>223?3:a>191?2:1;if(i+h<=e)switch(h){case 1:a<128&&(c=a);break;case 2:128==(192&(o=t[i+1]))&&(u=(31&a)<<6|63&o)>127&&(c=u);break;case 3:o=t[i+1],s=t[i+2],128==(192&o)&&128==(192&s)&&(u=(15&a)<<12|(63&o)<<6|63&s)>2047&&(u<55296||u>57343)&&(c=u);break;case 4:o=t[i+1],s=t[i+2],f=t[i+3],128==(192&o)&&128==(192&s)&&128==(192&f)&&(u=(15&a)<<18|(63&o)<<12|(63&s)<<6|63&f)>65535&&u<1114112&&(c=u)}null===c?(c=65533,h=1):c>65535&&(c-=65536,r.push(c>>>10&1023|55296),c=56320|1023&c),r.push(c),i+=h}return function(t){var n=t.length;if(n<=k)return String.fromCharCode.apply(String,t);var e="",r=0;for(;r<n;)e+=String.fromCharCode.apply(String,t.slice(r,r+=k));return e}(r)}e.kMaxLength=i,s.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(t){return!1}}(),s.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(s.prototype,"parent",{enumerable:!0,get:function(){if(s.isBuffer(this))return this.buffer}}),Object.defineProperty(s.prototype,"offset",{enumerable:!0,get:function(){if(s.isBuffer(this))return this.byteOffset}}),"undefined"!=typeof Symbol&&null!=Symbol.species&&s[Symbol.species]===s&&Object.defineProperty(s,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),s.poolSize=8192,s.from=function(t,n,e){return f(t,n,e)},s.prototype.__proto__=Uint8Array.prototype,s.__proto__=Uint8Array,s.alloc=function(t,n,e){return function(t,n,e){return u(t),t<=0?o(t):void 0!==n?"string"==typeof e?o(t).fill(n,e):o(t).fill(n):o(t)}(t,n,e)},s.allocUnsafe=function(t){return a(t)},s.allocUnsafeSlow=function(t){return a(t)},s.isBuffer=function(t){return null!=t&&!0===t._isBuffer&&t!==s.prototype},s.compare=function(t,n){if(P(t,Uint8Array)&&(t=s.from(t,t.offset,t.byteLength)),P(n,Uint8Array)&&(n=s.from(n,n.offset,n.byteLength)),!s.isBuffer(t)||!s.isBuffer(n))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(t===n)return 0;for(var e=t.length,r=n.length,i=0,o=Math.min(e,r);i<o;++i)if(t[i]!==n[i]){e=t[i],r=n[i];break}return e<r?-1:r<e?1:0},s.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},s.concat=function(t,n){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return s.alloc(0);var e;if(void 0===n)for(n=0,e=0;e<t.length;++e)n+=t[e].length;var r=s.allocUnsafe(n),i=0;for(e=0;e<t.length;++e){var o=t[e];if(P(o,Uint8Array)&&(o=s.from(o)),!s.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(r,i),i+=o.length}return r},s.byteLength=l,s.prototype._isBuffer=!0,s.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var n=0;n<t;n+=2)p(this,n,n+1);return this},s.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var n=0;n<t;n+=4)p(this,n,n+3),p(this,n+1,n+2);return this},s.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var n=0;n<t;n+=8)p(this,n,n+7),p(this,n+1,n+6),p(this,n+2,n+5),p(this,n+3,n+4);return this},s.prototype.toString=function(){var t=this.length;return 0===t?"":0===arguments.length?B(this,0,t):function(t,n,e){var r=!1;if((void 0===n||n<0)&&(n=0),n>this.length)return"";if((void 0===e||e>this.length)&&(e=this.length),e<=0)return"";if((e>>>=0)<=(n>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return U(this,n,e);case"utf8":case"utf-8":return B(this,n,e);case"ascii":return $(this,n,e);case"latin1":case"binary":return j(this,n,e);case"base64":return A(this,n,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return _(this,n,e);default:if(r)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),r=!0}}.apply(this,arguments)},s.prototype.toLocaleString=s.prototype.toString,s.prototype.equals=function(t){if(!s.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===s.compare(this,t)},s.prototype.inspect=function(){var t="",n=e.INSPECT_MAX_BYTES;return t=this.toString("hex",0,n).replace(/(.{2})/g,"$1 ").trim(),this.length>n&&(t+=" ... "),"<Buffer "+t+">"},s.prototype.compare=function(t,n,e,r,i){if(P(t,Uint8Array)&&(t=s.from(t,t.offset,t.byteLength)),!s.isBuffer(t))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof t);if(void 0===n&&(n=0),void 0===e&&(e=t?t.length:0),void 0===r&&(r=0),void 0===i&&(i=this.length),n<0||e>t.length||r<0||i>this.length)throw new RangeError("out of range index");if(r>=i&&n>=e)return 0;if(r>=i)return-1;if(n>=e)return 1;if(n>>>=0,e>>>=0,r>>>=0,i>>>=0,this===t)return 0;for(var o=i-r,f=e-n,u=Math.min(o,f),a=this.slice(r,i),c=t.slice(n,e),h=0;h<u;++h)if(a[h]!==c[h]){o=a[h],f=c[h];break}return o<f?-1:f<o?1:0},s.prototype.includes=function(t,n,e){return-1!==this.indexOf(t,n,e)},s.prototype.indexOf=function(t,n,e){return g(this,t,n,e,!0)},s.prototype.lastIndexOf=function(t,n,e){return g(this,t,n,e,!1)},s.prototype.write=function(t,n,e,r){if(void 0===n)r="utf8",e=this.length,n=0;else if(void 0===e&&"string"==typeof n)r=n,e=this.length,n=0;else{if(!isFinite(n))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");n>>>=0,isFinite(e)?(e>>>=0,void 0===r&&(r="utf8")):(r=e,e=void 0)}var i=this.length-n;if((void 0===e||e>i)&&(e=i),t.length>0&&(e<0||n<0)||n>this.length)throw new RangeError("Attempt to write outside buffer bounds");r||(r="utf8");for(var o=!1;;)switch(r){case"hex":return d(this,t,n,e);case"utf8":case"utf-8":return v(this,t,n,e);case"ascii":return w(this,t,n,e);case"latin1":case"binary":return b(this,t,n,e);case"base64":return m(this,t,n,e);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,t,n,e);default:if(o)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),o=!0}},s.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var k=4096;function $(t,n,e){var r="";e=Math.min(t.length,e);for(var i=n;i<e;++i)r+=String.fromCharCode(127&t[i]);return r}function j(t,n,e){var r="";e=Math.min(t.length,e);for(var i=n;i<e;++i)r+=String.fromCharCode(t[i]);return r}function U(t,n,e){var r=t.length;(!n||n<0)&&(n=0),(!e||e<0||e>r)&&(e=r);for(var i="",o=n;o<e;++o)i+=O(t[o]);return i}function _(t,n,e){for(var r=t.slice(n,e),i="",o=0;o<r.length;o+=2)i+=String.fromCharCode(r[o]+256*r[o+1]);return i}function S(t,n,e){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(t+n>e)throw new RangeError("Trying to access beyond buffer length")}function x(t,n,e,r,i,o){if(!s.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(n>i||n<o)throw new RangeError('"value" argument is out of bounds');if(e+r>t.length)throw new RangeError("Index out of range")}function C(t,n,e,r,i,o){if(e+r>t.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("Index out of range")}function T(t,n,e,i,o){return n=+n,e>>>=0,o||C(t,0,e,4),r.write(t,n,e,i,23,4),e+4}function I(t,n,e,i,o){return n=+n,e>>>=0,o||C(t,0,e,8),r.write(t,n,e,i,52,8),e+8}s.prototype.slice=function(t,n){var e=this.length;t=~~t,n=void 0===n?e:~~n,t<0?(t+=e)<0&&(t=0):t>e&&(t=e),n<0?(n+=e)<0&&(n=0):n>e&&(n=e),n<t&&(n=t);var r=this.subarray(t,n);return r.__proto__=s.prototype,r},s.prototype.readUIntLE=function(t,n,e){t>>>=0,n>>>=0,e||S(t,n,this.length);for(var r=this[t],i=1,o=0;++o<n&&(i*=256);)r+=this[t+o]*i;return r},s.prototype.readUIntBE=function(t,n,e){t>>>=0,n>>>=0,e||S(t,n,this.length);for(var r=this[t+--n],i=1;n>0&&(i*=256);)r+=this[t+--n]*i;return r},s.prototype.readUInt8=function(t,n){return t>>>=0,n||S(t,1,this.length),this[t]},s.prototype.readUInt16LE=function(t,n){return t>>>=0,n||S(t,2,this.length),this[t]|this[t+1]<<8},s.prototype.readUInt16BE=function(t,n){return t>>>=0,n||S(t,2,this.length),this[t]<<8|this[t+1]},s.prototype.readUInt32LE=function(t,n){return t>>>=0,n||S(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},s.prototype.readUInt32BE=function(t,n){return t>>>=0,n||S(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},s.prototype.readIntLE=function(t,n,e){t>>>=0,n>>>=0,e||S(t,n,this.length);for(var r=this[t],i=1,o=0;++o<n&&(i*=256);)r+=this[t+o]*i;return r>=(i*=128)&&(r-=Math.pow(2,8*n)),r},s.prototype.readIntBE=function(t,n,e){t>>>=0,n>>>=0,e||S(t,n,this.length);for(var r=n,i=1,o=this[t+--r];r>0&&(i*=256);)o+=this[t+--r]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*n)),o},s.prototype.readInt8=function(t,n){return t>>>=0,n||S(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},s.prototype.readInt16LE=function(t,n){t>>>=0,n||S(t,2,this.length);var e=this[t]|this[t+1]<<8;return 32768&e?4294901760|e:e},s.prototype.readInt16BE=function(t,n){t>>>=0,n||S(t,2,this.length);var e=this[t+1]|this[t]<<8;return 32768&e?4294901760|e:e},s.prototype.readInt32LE=function(t,n){return t>>>=0,n||S(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},s.prototype.readInt32BE=function(t,n){return t>>>=0,n||S(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},s.prototype.readFloatLE=function(t,n){return t>>>=0,n||S(t,4,this.length),r.read(this,t,!0,23,4)},s.prototype.readFloatBE=function(t,n){return t>>>=0,n||S(t,4,this.length),r.read(this,t,!1,23,4)},s.prototype.readDoubleLE=function(t,n){return t>>>=0,n||S(t,8,this.length),r.read(this,t,!0,52,8)},s.prototype.readDoubleBE=function(t,n){return t>>>=0,n||S(t,8,this.length),r.read(this,t,!1,52,8)},s.prototype.writeUIntLE=function(t,n,e,r){(t=+t,n>>>=0,e>>>=0,r)||x(this,t,n,e,Math.pow(2,8*e)-1,0);var i=1,o=0;for(this[n]=255&t;++o<e&&(i*=256);)this[n+o]=t/i&255;return n+e},s.prototype.writeUIntBE=function(t,n,e,r){(t=+t,n>>>=0,e>>>=0,r)||x(this,t,n,e,Math.pow(2,8*e)-1,0);var i=e-1,o=1;for(this[n+i]=255&t;--i>=0&&(o*=256);)this[n+i]=t/o&255;return n+e},s.prototype.writeUInt8=function(t,n,e){return t=+t,n>>>=0,e||x(this,t,n,1,255,0),this[n]=255&t,n+1},s.prototype.writeUInt16LE=function(t,n,e){return t=+t,n>>>=0,e||x(this,t,n,2,65535,0),this[n]=255&t,this[n+1]=t>>>8,n+2},s.prototype.writeUInt16BE=function(t,n,e){return t=+t,n>>>=0,e||x(this,t,n,2,65535,0),this[n]=t>>>8,this[n+1]=255&t,n+2},s.prototype.writeUInt32LE=function(t,n,e){return t=+t,n>>>=0,e||x(this,t,n,4,4294967295,0),this[n+3]=t>>>24,this[n+2]=t>>>16,this[n+1]=t>>>8,this[n]=255&t,n+4},s.prototype.writeUInt32BE=function(t,n,e){return t=+t,n>>>=0,e||x(this,t,n,4,4294967295,0),this[n]=t>>>24,this[n+1]=t>>>16,this[n+2]=t>>>8,this[n+3]=255&t,n+4},s.prototype.writeIntLE=function(t,n,e,r){if(t=+t,n>>>=0,!r){var i=Math.pow(2,8*e-1);x(this,t,n,e,i-1,-i)}var o=0,s=1,f=0;for(this[n]=255&t;++o<e&&(s*=256);)t<0&&0===f&&0!==this[n+o-1]&&(f=1),this[n+o]=(t/s>>0)-f&255;return n+e},s.prototype.writeIntBE=function(t,n,e,r){if(t=+t,n>>>=0,!r){var i=Math.pow(2,8*e-1);x(this,t,n,e,i-1,-i)}var o=e-1,s=1,f=0;for(this[n+o]=255&t;--o>=0&&(s*=256);)t<0&&0===f&&0!==this[n+o+1]&&(f=1),this[n+o]=(t/s>>0)-f&255;return n+e},s.prototype.writeInt8=function(t,n,e){return t=+t,n>>>=0,e||x(this,t,n,1,127,-128),t<0&&(t=255+t+1),this[n]=255&t,n+1},s.prototype.writeInt16LE=function(t,n,e){return t=+t,n>>>=0,e||x(this,t,n,2,32767,-32768),this[n]=255&t,this[n+1]=t>>>8,n+2},s.prototype.writeInt16BE=function(t,n,e){return t=+t,n>>>=0,e||x(this,t,n,2,32767,-32768),this[n]=t>>>8,this[n+1]=255&t,n+2},s.prototype.writeInt32LE=function(t,n,e){return t=+t,n>>>=0,e||x(this,t,n,4,2147483647,-2147483648),this[n]=255&t,this[n+1]=t>>>8,this[n+2]=t>>>16,this[n+3]=t>>>24,n+4},s.prototype.writeInt32BE=function(t,n,e){return t=+t,n>>>=0,e||x(this,t,n,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[n]=t>>>24,this[n+1]=t>>>16,this[n+2]=t>>>8,this[n+3]=255&t,n+4},s.prototype.writeFloatLE=function(t,n,e){return T(this,t,n,!0,e)},s.prototype.writeFloatBE=function(t,n,e){return T(this,t,n,!1,e)},s.prototype.writeDoubleLE=function(t,n,e){return I(this,t,n,!0,e)},s.prototype.writeDoubleBE=function(t,n,e){return I(this,t,n,!1,e)},s.prototype.copy=function(t,n,e,r){if(!s.isBuffer(t))throw new TypeError("argument should be a Buffer");if(e||(e=0),r||0===r||(r=this.length),n>=t.length&&(n=t.length),n||(n=0),r>0&&r<e&&(r=e),r===e)return 0;if(0===t.length||0===this.length)return 0;if(n<0)throw new RangeError("targetStart out of bounds");if(e<0||e>=this.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),t.length-n<r-e&&(r=t.length-n+e);var i=r-e;if(this===t&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(n,e,r);else if(this===t&&e<n&&n<r)for(var o=i-1;o>=0;--o)t[o+n]=this[o+e];else Uint8Array.prototype.set.call(t,this.subarray(e,r),n);return i},s.prototype.fill=function(t,n,e,r){if("string"==typeof t){if("string"==typeof n?(r=n,n=0,e=this.length):"string"==typeof e&&(r=e,e=this.length),void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!s.isEncoding(r))throw new TypeError("Unknown encoding: "+r);if(1===t.length){var i=t.charCodeAt(0);("utf8"===r&&i<128||"latin1"===r)&&(t=i)}}else"number"==typeof t&&(t&=255);if(n<0||this.length<n||this.length<e)throw new RangeError("Out of range index");if(e<=n)return this;var o;if(n>>>=0,e=void 0===e?this.length:e>>>0,t||(t=0),"number"==typeof t)for(o=n;o<e;++o)this[o]=t;else{var f=s.isBuffer(t)?t:s.from(t,r),u=f.length;if(0===u)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(o=0;o<e-n;++o)this[o+n]=f[o%u]}return this};var L=/[^+/0-9A-Za-z-_]/g;function O(t){return t<16?"0"+t.toString(16):t.toString(16)}function R(t,n){var e;n=n||1/0;for(var r=t.length,i=null,o=[],s=0;s<r;++s){if((e=t.charCodeAt(s))>55295&&e<57344){if(!i){if(e>56319){(n-=3)>-1&&o.push(239,191,189);continue}if(s+1===r){(n-=3)>-1&&o.push(239,191,189);continue}i=e;continue}if(e<56320){(n-=3)>-1&&o.push(239,191,189),i=e;continue}e=65536+(i-55296<<10|e-56320)}else i&&(n-=3)>-1&&o.push(239,191,189);if(i=null,e<128){if((n-=1)<0)break;o.push(e)}else if(e<2048){if((n-=2)<0)break;o.push(e>>6|192,63&e|128)}else if(e<65536){if((n-=3)<0)break;o.push(e>>12|224,e>>6&63|128,63&e|128)}else{if(!(e<1114112))throw new Error("Invalid code point");if((n-=4)<0)break;o.push(e>>18|240,e>>12&63|128,e>>6&63|128,63&e|128)}}return o}function M(t){return n.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(L,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function N(t,n,e,r){for(var i=0;i<r&&!(i+e>=n.length||i>=t.length);++i)n[i+e]=t[i];return i}function P(t,n){return t instanceof n||null!=t&&null!=t.constructor&&null!=t.constructor.name&&t.constructor.name===n.name}function q(t){return t!=t}}).call(this)}).call(this,t("buffer").Buffer)},{"base64-js":7,buffer:8,ieee754:9}],9:[function(t,n,e){e.read=function(t,n,e,r,i){var o,s,f=8*i-r-1,u=(1<<f)-1,a=u>>1,c=-7,h=e?i-1:0,l=e?-1:1,p=t[n+h];for(h+=l,o=p&(1<<-c)-1,p>>=-c,c+=f;c>0;o=256*o+t[n+h],h+=l,c-=8);for(s=o&(1<<-c)-1,o>>=-c,c+=r;c>0;s=256*s+t[n+h],h+=l,c-=8);if(0===o)o=1-a;else{if(o===u)return s?NaN:1/0*(p?-1:1);s+=Math.pow(2,r),o-=a}return(p?-1:1)*s*Math.pow(2,o-r)},e.write=function(t,n,e,r,i,o){var s,f,u,a=8*o-i-1,c=(1<<a)-1,h=c>>1,l=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=r?0:o-1,g=r?1:-1,y=n<0||0===n&&1/n<0?1:0;for(n=Math.abs(n),isNaN(n)||n===1/0?(f=isNaN(n)?1:0,s=c):(s=Math.floor(Math.log(n)/Math.LN2),n*(u=Math.pow(2,-s))<1&&(s--,u*=2),(n+=s+h>=1?l/u:l*Math.pow(2,1-h))*u>=2&&(s++,u/=2),s+h>=c?(f=0,s=c):s+h>=1?(f=(n*u-1)*Math.pow(2,i),s+=h):(f=n*Math.pow(2,h-1)*Math.pow(2,i),s=0));i>=8;t[e+p]=255&f,p+=g,f/=256,i-=8);for(s=s<<i|f,a+=i;a>0;t[e+p]=255&s,p+=g,s/=256,a-=8);t[e+p-g]|=128*y}},{}],cheney:[function(t,n,e){"use strict";const r=[t("./lib/generators/app.js"),t("./lib/generators/server.js"),t("./lib/generators/iparams.js"),t("./lib/generators/manifest.js"),t("./lib/generators/digest.js")];n.exports=function(t){const n={"blueprint.json":JSON.stringify(t,null,2)};return r.reduce((n,e)=>Object.assign(n,e(t,n)),n),n}},{"./lib/generators/app.js":2,"./lib/generators/digest.js":3,"./lib/generators/iparams.js":4,"./lib/generators/manifest.js":5,"./lib/generators/server.js":6}]},{},[]);
