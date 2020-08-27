const { merge } = require('webpack-merge');
const devConfig = require('./webpack.config.js');

module.exports = merge(devConfig, {
  mode: 'production',
});
