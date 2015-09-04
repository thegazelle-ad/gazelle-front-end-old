var fs = require("fs");

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
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
        loaders: ['babel', 'flowcheck']
      }
    ]
  }
}
