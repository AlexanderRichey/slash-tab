const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

const config = {
  context: __dirname,
  entry: {
    app: "./src/app.js",
    popup: "./src/popup.js"
  },
  output: {
    path: path.join(__dirname, "dst"),
    filename: "[name].js",
    sourceMapFilename: "[name].js.map"
  },
  devtool: "source-map",
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
  mode: "none",
  plugins: [
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
      },
      {
        from: "src/*.png",
        to: path.join(__dirname, "dst"),
        flatten: true
      }
    ])
  ],
  resolve: {
    extensions: [".js", ".jsx"]
  }
};

module.exports = (env, argv) => {
  if (argv.mode === "production") {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production"),
          RELEASE: JSON.stringify(env.RELEASE)
        }
      })
    );

    if (env.RELEASE != "0") {
      config.plugins.push(
        new SentryWebpackPlugin({
          include: ".",
          ignore: ["node_modules", "webpack.config.babel.js"]
        })
      );
    }
  }

  if (argv.mode === "development") {
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env": {
          RELEASE: JSON.stringify(env.RELEASE)
        }
      })
    );
  }

  return config;
};
