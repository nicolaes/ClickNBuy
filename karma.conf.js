var webpack = require("webpack"),
  path = require("path");

// Karma configuration
// Generated on Mon May 11 2015 14:13:57 GMT-0600 (MDT)

module.exports = function(config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "./test/specs/**/*.test.js"
    ],
    preprocessors: {
      "./test/specs/**/*.test.js": ["webpack"]
    },
    webpack: {
      module: {
        loaders: [
          { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "babel-loader?plugins=babel-plugin-rewire" },
          { test: /\.scss/, loader: "style!css!sass" }
        ]
      },
      plugins: [
        new webpack.ResolverPlugin([
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
        ])
      ],
      resolve: {
        root: [
          path.join(__dirname, "./app/bower_components"),
          path.join(__dirname, "./app/scripts"),
          path.join(__dirname, "./test/libs")
        ]
      }
    },
    webpackMiddleware: {
      noInfo: true
    },
    plugins: [
      require("karma-webpack"),
      require("karma-jasmine"),
      require("karma-chrome-launcher")
    ],
    reporters: ["dots"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ["Chrome"],
    singleRun: true
  });
};
