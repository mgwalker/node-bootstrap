const path = require('path');

module.exports = {
  npm: {
    deps: ['express', 'body-parser'],
    devDeps: ['eslint-config-airbnb-base', 'eslint-plugin-import']
  },
  files: {
    'api/main.js': path.join(__dirname, 'express', 'main.js'),
    'api/.eslintrc.json': path.join(__dirname, 'express', 'eslintrc.json'),
  },
  eslintPaths: ['api/**/*.js']
};
