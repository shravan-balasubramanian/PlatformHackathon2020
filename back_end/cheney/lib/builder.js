const liquidMatcher = /{{|}}/g;

const events = [];

const productEvents = [ 'onTicketCreate', 'onTicketUpdate', 'onNoteCreate', 'onContactCreate', 'onContactUpdate' ];

function flowBase(startID, type) {
  if (type === 'frontend') {
    return `begin().then(${startID}, end);\n`;
  }

  return `${startID}();`;
}

function backendWrapper(temp) {
  const uniques = Array.from(new Set(events));
  const toExport = {
    events: uniques.filter(e => productEvents.includes(e)).map(e => {
      return { event: e, callback: e };
    })
  };

  uniques.forEach(e => {
    toExport[e] = `\`function(message) { client.emit('${e}', message); }\``
  });

  return `\n\n${temp}\n\nexports=${JSON.stringify(toExport)};`.replace(/"`|`"/g, '');
}

function deliquidizer(object) {
  return JSON.stringify(object, function(key, value) {
    if (liquidMatcher.test(value)) {
      return '`' + value.replace(liquidMatcher, function(match) {
        return match === '{{' ? '${' : '}';
      }) + '`';
    }

    return value;
  }).replace(/"`|`"/g, '`');
}

/**
 *  Each block has a class assoicated with it. The class name is unique and essentially describes
 *  the block's functionality. However, the class name might not be the implementation's name. This
 *  function converts the class name to the implementation's name.
 *
 *    Class Name                          Implementation Name
 *     request                                  request
 *     show-notification                    show_notification
 */
function blockClassToImplName(className) {
  return className.replace(/ |-/g, '_');
}

/**
 *  Accepts a JSON representation of a block and converts it to its equivalent JS code and
 *  returns said code as a string.
 */
function blockToCode(flowID, block) {
  const args = deliquidizer(block.arguments || {});

  const fail = block.edges.failure || 'end',
        success = block.edges.success || 'end';

  const implName = blockClassToImplName(block.class);

  if (block.class === 'onBackend') {
    events.push(JSON.parse(args).event);
  }

  return `\nfunction ${block.id}() {
  ${implName}(${args})
    .then(function($) {
      contextify('${block.result}', $);
      return ${success}();
    }, ${fail});
}`;
}

function build(flow, flowID) {
  const codeBlocks =  flow.blocks.map(block => blockToCode(flowID, block)),
        base = flowBase(flow.start, flow.location);

  return base + codeBlocks.join('\n');
}

module.exports = {
  build,
  backendWrapper
};
