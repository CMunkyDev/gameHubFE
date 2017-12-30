import React, { Component } from 'react'
import ServiceContainer from './UserPage/ServiceContainer'
import axios from 'axios'
import muiThemeable from 'material-ui/styles/muiThemeable'
import ServiceButtonBar from './UserPage/ServiceButtonBar'
let steamCall = require('../fakeNews').response


class UserPage extends Component {
    constructor(props){
        super(props)
        this.state = {
        
        services: [{ name: 'steam', id: '6561197980971766', style: {
            tab: {
                backgroundColor: '#181A21',
                color: '#BBBBBB'
            },
            row: {
                backgroundColor: '#181A21',
                color: '#FFF'
            }
        }}],
        favoriteGames:{'steam': [226700, 224760, 252950]},
        currentService: 0,
        userGames: {'steam': [...steamCall.games]}
        }
        console.log(props.muiTheme.palette)
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
                    < ServiceButtonBar services = { this.state.services }/>
                </div>
                <div className = "row">
                    < ServiceContainer service={this.state.services[this.state.currentService]} favoriteGames={this.state.favoriteGames[this.state.services[this.state.currentService].name]} userGames={this.state.userGames[this.state.services[this.state.currentService].name]}/>
                </div>
                <div className = "row">
                    //FOOTER
                </div>
            </div>
        )
    }
}

export default muiThemeable()(UserPage)
