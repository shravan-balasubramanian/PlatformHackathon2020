const PurgecssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

module.exports = {
  publicPath: '/',
  outputDir: 'dist/',
  devServer: {
    disableHostCheck: true,
  },
  configureWebpack: {
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/index.html'),
          path.join(__dirname, './src/**/*.vue'),
          path.join(__dirname, './src/**/*.js'),
        ]),
        only: ['bundle', 'vendor'],
      }),
    ],
    entry: {
      app: './src/main.js',
    },
  },
};
