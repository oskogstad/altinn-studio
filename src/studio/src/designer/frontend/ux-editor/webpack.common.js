const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
  entry: [
    'core-js/modules/es.object.assign',
    'core-js/modules/es.array.find-index',
    'core-js/modules/es.array.find',
    './index.tsx',
  ],
  output: {
    filename: 'ui-editor.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
    alias: {
      'app-shared': path.resolve(__dirname, '../shared/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'ui-editor.css',
    }),
  ],
};