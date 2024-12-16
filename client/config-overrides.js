const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
 

  module.exports = function override(config, env) {
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);

  config.resolve.fallback = {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "http": require.resolve("stream-http"),
    "https": require.resolve("https-browserify"),
    "os": require.resolve("os-browserify/browser"),
    "url": require.resolve("url"),
    "net": false,
    "async_hooks": false
  };

  config.plugins.push(
    new NodePolyfillPlugin()
  );

  node: {
    net: "empty"
  }

  return config;
};






