import React, { Component } from 'react';
import View from './components/View'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const theme = getMuiTheme(darkBaseTheme)

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div>
            <section alt="background" className="backgroundStyle" />
            <View />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
