import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import config from '../webpack/development'

const port = 9000
const devConfig = {
  hot: true,
  noInfo: false,
  historyApiFallback: true,
  progress: true
}

new WebpackDevServer(webpack(config), devConfig)
  .listen(port, 'localhost', err => {
    if (err) { return console.log(err) } // eslint-disable-line no-console
    console.log(`Webpack listening on port ${port}`) // eslint-disable-line no-console
  })
