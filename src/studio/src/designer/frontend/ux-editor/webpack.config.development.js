const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const common = require('./webpack.common');

module.exports = {
  ...common,
  mode: 'development',
  devtool: 'eval',
  performance: {
    hints: 'warning',
  },
  module: {
    rules: [
      ...common.module.rules,
      {
        test: /\.svg$/,
        use: {
          loader: 'svg-inline-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              url: false,
            },
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
        ],
      },
      {
        test: /\.tsx?/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
        },
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    ...common.plugins,
    new ForkTsCheckerWebpackPlugin({
      eslint: {
        files:
          './{actions,config,features,reducers,sagas,sharedResources,store,types,utils}/**/*.{ts,tsx,js,jsx}',
      },
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      title: 'TypeScript',
      excludeWarnings: false,
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
