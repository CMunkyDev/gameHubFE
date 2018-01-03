import React, { Component } from 'react'
import ServiceContainer from './UserPage/ServiceContainer'
import axios from 'axios'
import muiThemeable from 'material-ui/styles/muiThemeable'
import ServiceButtonBar from './UserPage/ServiceButtonBar'
import SteamAPI from '../service-calls/steam'
import LoginModal from './UserPage/LoginModal'

let steamCall = require('../fakeNews').response


class UserPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentUserId: null,
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
    }

    addTokenToHeader = function () {
        let token = localStorage.getItem('gamehubToken')
        axios.defaults.headers.common['auth'] = token
    }

    loginFormCallback = (formObject) => {
        this.addTokenToHeader()
        return axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formObject)
            .then(response => {
                if (response.data.authorization) {
                    localStorage.setItem('gamehubToken', response.data.authorization)
                }
            })
    }

    registrationFormCallback = (formObject) => {
        this.addTokenToHeader()
        return axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formObject)
    }

    render () { 
        return (
            <div className = "container-fluid">
                <LoginModal loginFormCallback={this.loginFormCallback} registrationFormCallback={this.registrationFormCallback}/>
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

export default UserPage
