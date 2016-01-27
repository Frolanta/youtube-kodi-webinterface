import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

export default {

  resolve: {
    modulesDirectories: ['node_modules', 'src']
  },

  entry: [
    './src/app'
  ],

  loaders: [{
    test: /\.(woff)$/,
    exclude: /node_modules/,
    loader: 'url-loader?limit=100000'
  }],

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },

  plugins: [
    new HtmlWebpackPlugin({ template: 'index.html' })
  ],

  node: {
    fs: 'empty'
  },

  progress: true

}
