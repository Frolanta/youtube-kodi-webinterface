import './styles/app.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

import App from 'components/App'

import Home from 'pages/Home'

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
    </Route>
  </Router>,
document.getElementById('react'))
