const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './web/src'),
  entry: {
    js: './app.jsx'
  },
  output: {
    path: path.resolve(__dirname, './web/dist'),
    filename: 'app.js'
  },
  devtool: 'inline-source-map',
  watchOptions: {
    // Polling is necessary because the Mac docker client doesn't raise
    // all of the fs events that webpack is expecting
    poll: 1000
  },
  module: {
    rules: [
      {
        test: /\.(sass|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          // This loader handles resolving SASS relative URLs from other
          // paths, particularly USWDS in the node_modules directory.
          'resolve-url-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader?presets[]=es2015,presets[]=react']
      },
      {
        test: /\.html$/,
        use: ['file-loader?name=[name].[ext]']
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      }
    ]
  }
};
