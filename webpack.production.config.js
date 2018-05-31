'use strict';
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const config = require('./webpack.development.config.js');

config.entry = path.resolve(path.join(__dirname, 'src', 'client', 'index.js'));

delete config.devtool;
delete config.output.publicPath;
delete config.watch;

config.plugins = config.plugins.concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  })
]);

config.externals = [
  nodeExternals({
    modulesFromFile: true
  })
];

module.exports = config;
