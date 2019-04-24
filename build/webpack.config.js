const path = require('path');

module.exports = {
  mode: 'production',
  entry: './lib/delete-files',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
  },
  node: {
    fs: 'empty',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
