var fs = require("fs");
var WebpackOnBuildPlugin = require('on-build-webpack');
var spawn = require("child_process").spawn;
var path = require('path');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var babelSettings =
        {
          presets:['react']
        };

module.exports = [{
  target: 'node',
  externals: nodeModules,
  entry: "./src/server.js",
  output: {
    path: "./build",
    filename: "server.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // check for .js or .jsx files
        exclude: /node_modules/,
        loader: 'babel',
        query: {
        presets: ['react', 'es2015']
      }

      }
    ]
  },
        resolve: {
        extensions: [ '', '.js', '.jsx' ],
        fallback: path.join(__dirname, "node_modules")
    },


    resolveLoader: {
        root: path.join(__dirname, "node_modules")
    }
},
{
  target: 'web',
  entry: "./src/client.js",
  output: {
    path: "./build",
    filename: "client.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/, // check for .js or .jsx files
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
      resolve: {
        extensions: [ '', '.js', '.jsx' ],
        fallback: path.join(__dirname, "node_modules")
    },


    resolveLoader: {
        root: path.join(__dirname, "node_modules")
    }
},
];
