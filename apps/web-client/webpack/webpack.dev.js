const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  devServer: {
    contentBase: __dirname,
    port: 8080,
    allowedHosts: [".ui.localhost"],
    sockPath: "/socket",
    sockPort: 8080
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
});
