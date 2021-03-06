const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/models', to: 'models' },
      { from: 'src/assets/users', to: 'users' }
  ]),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      title: `Face Recognition | Talabat`,
      hash: true,
      filename: "index.html" //relative to root of the application
    })
  ]
};
