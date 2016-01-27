import path from 'path'
import webpack from 'webpack'

import webpackConfig from './config'

export default {

  ...webpackConfig,

  devtool: 'sourcemap',

  entry: [
    ...webpackConfig.entry,
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server'
  ],

  module: {
    loaders: [...webpackConfig.loaders, {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['react-hot', 'babel']
    }, {
      test: /\.s?css$/,
      loaders: ['style', 'css', 'autoprefixer', 'sass']
    }]
  },

  plugins: [
    ...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]

}
