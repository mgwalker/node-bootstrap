const path = require('path');

function localPath(filename) {
  return path.join(__dirname, 'redux', filename);
}

module.exports = {
  requires: ['react'],
  npm: {
    deps: ['redux', 'react-redux']
  },
  files: {
    'web/src/app.jsx': localPath('entry-point.jsx'),
    'web/src/reducers/index.js': localPath('reducers.js'),
    'web/src/actions/index.js': localPath('actions.js')
  }
};
