const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const WebpackBar = require('webpackbar');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    'app': [path.resolve(__dirname, 'src/index.tsx')],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/i,
        exclude: /node_modules/,
        use: [
          require.resolve('babel-loader'),
          require.resolve('eslint-loader'),
        ],
      },
      {
        test: /\.s?css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: isDev,
              sourceMap: isDev,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: isDev,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: isDev,
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        loader: 'svg-inline-loader',
        options: {
          removeTags: true,
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, 'wwwroot'),
    publicPath: '/',
  },
  plugins: [
    new DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV || 'production'}'`,
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
    }),
    new WebpackBar({
      color: 'hotpink',
      name: 'Sbanken → YNAB',
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.d.ts'],
  },
  stats: {
    modules: false,
    entrypoints: false,
    children: false,
  },
};
