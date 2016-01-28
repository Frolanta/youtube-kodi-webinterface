import { Component } from 'react'
import MyTheme from 'styles/MyTheme.js';
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';

@ThemeDecorator(ThemeManager.getMuiTheme(MyTheme))
class App extends Component {

  render () {
    return this.props.children
  }

}

export default App
