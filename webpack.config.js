const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({ template: './public/index.html' });
const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: './src/main.js',
  output: {
    filename: './public/assets/js/bundle.js'
  },
  module: {
    rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
  },
  plugins: [HTMLWebpackPluginConfig,
    new webpack.WatchIgnorePlugin([
        path.join(__dirname, "node_modules")
      ])
    ],
  devServer: {
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: 9000,
    overlay: true,
    open: true
  }
};