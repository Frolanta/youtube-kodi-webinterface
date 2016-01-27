import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

import webpackConfig from './config'

export default {

  ...webpackConfig,

  module: {
    loaders: [...webpackConfig.loaders, {
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: ['babel']
    }, {
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass')
    }]
  },

  plugins: [
    ...webpackConfig.plugins,
    new ExtractTextPlugin('main.min.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ],

  stats: {
    colors: true,
    reasons: false,
    hash: false,
    version: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    cached: false,
    cachedAssets: false
  }

}
