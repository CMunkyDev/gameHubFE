import React, {Component} from 'react';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import Home from 'material-ui/svg-icons/action/home'
import Mail from 'material-ui/svg-icons/content/mail'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';

const homeIcon = <Home />;
const mailIcon = <Mail />;
const thumbIcon = <ThumbUp />;

const bottomStyle = {
    position: 'fixed',
    bottom: 0,
    width: "calc(100% - 40px)"
}

class BottomNavigationExampleSimple extends Component {

  render() {
    return (
      <Paper zDepth={1} style={bottomStyle}>
        <BottomNavigation>
          <BottomNavigationItem
            label="Home"
            icon={homeIcon}
          />
          <BottomNavigationItem
            label="Mail"
            icon={mailIcon}
          />
          <BottomNavigationItem
            label="Like"
            icon={thumbIcon}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default BottomNavigationExampleSimple