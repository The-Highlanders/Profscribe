var webpack 	= require('webpack');

var BUILD_DIR 	= __dirname + '/client/public';
var APP_DIR 	= __dirname + '/client/app';

var config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
   module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel-loader'
      }
    ]
  }
};

module.exports = config;