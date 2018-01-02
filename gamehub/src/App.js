import React, { Component } from 'react';
import UserPage from './components/UserPage'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

const theme = getMuiTheme(darkBaseTheme)

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
        <UserPage />
      </MuiThemeProvider>
    )
  }
}

export default App;
