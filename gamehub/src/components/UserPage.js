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
        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, formObject)
            .then(response => {
                if (response.data.authorization) {
                    localStorage.setItem('gamehubToken', response.data.authorization)
                }
            })
            .catch(console.log)
    }

    registrationFormCallback = (formObject) => {
        this.addTokenToHeader()
        axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formObject)
            .then(console.log)
    }

    parseUri(){
        if (window.location.search){
            let fullUrl = new URL(window.location).searchParams
            console.log(fullUrl.get('openid.ns'))
            console.log(fullUrl.get('openid.mode'))
            console.log(fullUrl.get('openid.claimed_id'))
            console.log(fullUrl.get('openid.identity'))
            console.log(fullUrl.get('openid.return_to'))
            console.log(fullUrl.get('openid.response_nonce'))
            console.log(fullUrl.get('openid.assoc_handle'))
            console.log(fullUrl.get('openid.signed'))
            console.log(fullUrl.get('openid.sig'))
            let steamID = fullUrl.get('openid.identity').slice(-17)
            console.log('Steam ID: ', steamID)
            this.addTokenToHeader()
            axios.patch(`${process.env.REACT_APP_API_URL}/api/users/1`, { users_service_id: steamID })
                .then(console.log)
        }
    }

    render () { 
        this.parseUri()
        return (
            <div className = "container-fluid">
                <LoginModal loginFormCallback={this.loginFormCallback} registrationFormCallback={this.registrationFormCallback}/>
                <div className = "row">
                    HEADER
                </div>
                <div className = "row">
                    USER INFO
                </div>
                <div className = "row">
                    <form action="http://localhost:3001/steam/auth" method="post">
                        <input type='submit' value='Connect with Steam'/>
                    </form>
                </div>
                <div className = "row">
                    < ServiceButtonBar services = { this.state.services }/>
                </div>
                <div className = "row">
                    < ServiceContainer service={this.state.services[this.state.currentService]} favoriteGames={this.state.favoriteGames[this.state.services[this.state.currentService].name]} userGames={this.state.userGames[this.state.services[this.state.currentService].name]}/>
                </div>
                <div className = "row">
                    FOOTER
                </div>
            </div>
        )
    }
}

export default UserPage
