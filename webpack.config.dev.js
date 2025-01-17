require('dotenv').config();
process.env.NODE_ENV = 'development';

const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const PreactRefreshPlugin = require('@prefresh/webpack');
const { createBaseConfig } = require('./webpack.config.base');

module.exports = (env = {}) =>
  merge(createBaseConfig(env), {
    devServer: {
      historyApiFallback: true,
      hot: true,
      port: process.env.PORT || 8000,
    },
    devtool: 'cheap-module-source-map',
    mode: 'development',
    plugins: [
      new MiniCssExtractPlugin(),
      process.env.MOCK_API &&
        new DefinePlugin({
          'process.env.SBANKEN_API_BASE_URL': '"http://localhost:4300/sbanken/api"',
          'process.env.SBANKEN_IDENTITY_SERVER_URL':
            '"http://localhost:4300/sbanken/identity/token"',
          'process.env.YNAB_API_BASE_URL': '"http://localhost:4300/ynab/api"',
        }),
      new PreactRefreshPlugin(),
    ].filter(Boolean),
  });
