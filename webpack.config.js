const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: ['./client/src/app.tsx'],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    hot: true
  },
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.ts|.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([
      { from: 'client/src/models', to: 'models' }
      // { from: 'client/src/assets/users', to: 'users' }
    ]),
    new HtmlWebpackPlugin({
      template: 'client/src/index.html',
      title: `Face Recognition | Talabat`,
      hash: true,
      filename: 'index.html' //relative to root of the application
    })
  ]
};
