import React, { Component } from 'react';
import View from './components/View'
import customBaseTheme from './customBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const theme = getMuiTheme(customBaseTheme)

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
            <View />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
