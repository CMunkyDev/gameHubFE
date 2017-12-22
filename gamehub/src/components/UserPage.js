import React, { Component } from 'react'
import ServiceContainer from './UserPage/ServiceContainer'
let steamCall = require('../fakeNews').response


class UserPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      services: [{name: 'steam'}],
      favoriteGames:{'steam': [226700, 224760, 252950]},
      currentService: 0,
      userGames: {'steam': [...steamCall.games]}
    }
  }

    render () {
        return (
            <div className = "container-fluid">
                <div className = "row">
                    //HEADER
                </div>
                <div className = "row">
                    //USER INFO
                </div>
                <div className = "row">
                    //SERVICE BUTTON BAR
                </div>
                <div className = "row">
                  < ServiceContainer favoriteGames={this.state.favoriteGames[this.state.services[this.state.currentService].name]} userGames={this.state.userGames[this.state.services[this.state.currentService].name]}/>
                </div>
                <div className = "row">
                    //FOOTER
                </div>
            </div>
        )
    }
}

export default UserPage
