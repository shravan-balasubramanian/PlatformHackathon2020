'use strict';

function generate(blueprint, files) {
  const toDigest = Object.keys(files)
                    .filter(file => file === 'manifest.json' || file.startsWith('app/'))
                    .reduce((content, file) => content + files[file], '');

  return {
    'digest.md5': Buffer.from(toDigest).toString('hex')
  };
}

module.exports = generate;
