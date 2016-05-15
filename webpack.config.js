// webpack.config.js

var webpack = require('webpack');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  entry: {
    'index' : './app/dist/index.jsx'
  },
  output: {
    path: './public/build',
    filename: '[name].js' // Template based on keys in entry above
  },
  module: {
    loaders: [
      { test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude : /(node_modules)/,
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          plugins: [
            "add-module-exports",
            "transform-decorators-legacy"
          ]
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
  plugins: [commonsPlugin],
  watch : true
};
