const path = require('path');
const expressPlugin = require('./express');
const reactPlugin = require('./react');

function localPath(filename) {
  return path.join(__dirname, 'docker', filename);
}

module.exports = {
  prepare(pieces) {
    return new Promise((resolve) => {
      let hasBoth = 0;
      if (pieces.includes(expressPlugin)) {
        module.exports.npm.devDeps.push('nodemon');
        module.exports.files['docker-compose.yaml'] = localPath('docker-compose-api.yaml');
        module.exports.files['Dockerfile-api'] = localPath('Dockerfile-api');
        module.exports.scripts['start-api-dev'] = 'nodemon api/main.js';
        hasBoth += 1;
      }
      if (pieces.includes(reactPlugin)) {
        module.exports.npm.devDeps.push('webpack-dev-server');
        module.exports.files['docker-compose.yaml'] = localPath('docker-compose-web.yaml');
        module.exports.files['Dockerfile-web'] = localPath('Dockerfile-web');
        module.exports.scripts['start-web-dev'] = 'webpack-dev-server --host 0.0.0.0 --port 8000 --content-base web/src/';
        hasBoth += 1;
      }
      if (hasBoth === 2) {
        module.exports.files['docker-compose.yaml'] = localPath('docker-compose-web-and-api.yaml');
      }
      resolve(pieces);
    });
  },
  npm: {
    devDeps: []
  },
  files: { },
  scripts: { }
};
