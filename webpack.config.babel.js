const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: {
    app: "./src/app.js",
    popup: "./src/popup.js"
  },
  output: {
    path: path.join(__dirname, "dst"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  mode: "development",
  optimization: {
    minimize: false
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   "process.env": {
    //     NODE_ENV: JSON.stringify("production")
    //   }
    // }),
    new CopyWebpackPlugin([
      {
        from: "src/*.html",
        to: path.join(__dirname, "dst"),
        flatten: true
      },
      {
        from: "src/manifest.json",
        to: path.join(__dirname, "dst"),
        flatten: true
      }
    ])
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
