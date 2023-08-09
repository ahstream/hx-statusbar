const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  devServer: {
    static: '../verify/dist',
  },
  entry: './verify/index.js',
  output: {
    path: path.resolve(__dirname, '../', 'verify/dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin(), new MiniCssExtractPlugin()],
};
