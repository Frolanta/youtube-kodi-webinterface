import './styles/app.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import App from 'components/App';
import Home from 'components/Home';

ReactDOM.render(
    <App>
      <Home></Home>
    </App>,
document.getElementById('react'));
