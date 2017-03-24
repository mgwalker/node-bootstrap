const path = require('path');

function localPath(filename) {
  return path.join(__dirname, 'react', filename);
}

module.exports = {
  npm: {
    deps: ['react', 'react-dom'],
    devDeps: [
      'babel-core',
      'babel-loader',
      'babel-preset-es2015',
      'babel-preset-react',
      'css-loader',
      'eslint-config-airbnb',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
      'file-loader',
      'node-sass',
      'resolve-url-loader',
      'sass-loader',
      'webpack'
    ]
  },
  scripts: {
    'build-js': 'webpack -p'
  },
  eslintPaths: ['web/src/**/*.js', 'web/src/**/*.jsx'],
  buildComponents: ['build-js'],
  eslint: {
    extends: 'airbnb'
  },
  files: {
    'web/.gitignore': localPath('gitignore'),
    'web/src/index.html': localPath('index.html'),
    'web/src/app.jsx': localPath('entry-point.jsx'),
    'web/.eslintrc.json': localPath('eslintrc.json'),
    'webpack.config.js': localPath('webpack.config.js')
  }
};
