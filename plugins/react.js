const path = require('path');

function localPath(filename) {
  return path.join(__dirname, 'react', filename);
}

module.exports = {
  npm: {
    deps: ['react', 'react-dom'],
    devDeps: [
      'babel-preset-es2015',
      'babel-preset-react',
      'babelify',
      'browserify',
      'eslint-config-airbnb',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react'
    ]
  },
  scripts: {
    'build-js': 'browserify -d -t [ babelify --presets [ react es2015 ] ] web/src/app.jsx -o web/dist/app.js'
  },
  eslintPaths: ['web/src/**/*.js', 'web/src/**/*.jsx'],
  buildComponents: ['build-js'],
  eslint: {
    extends: 'airbnb'
  },
  files: {
    'web/.gitignore': localPath('gitignore'),
    'web/dist/index.html': localPath('index.html'),
    'web/src/app.jsx': localPath('entry-point.jsx'),
    'web/.eslintrc.json': localPath('eslintrc.json')
  }
};
