const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    example: './src/example.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../', 'dist'),
    clean: true,
    globalObject: 'this',
    library: {
      name: 'index',
      type: 'umd',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new ESLintPlugin(), new NodePolyfillPlugin(), new MiniCssExtractPlugin({ filename: 'main.css' })],
  resolve: {
    extensions: ['.js'],
    fallback: {
      fs: false,
      tls: false,
      net: false,
      child_process: false,
      stream: require.resolve('readable-stream'),
    },
  },
};
