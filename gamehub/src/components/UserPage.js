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
            services: [{
                name: 'steam',
                style: {
                    tab: {
                        backgroundColor: '#181A21',
                        color: '#BBBBBB'
                    },
                    row: {
                        backgroundColor: '#181A21',
                        color: '#FFF'
                    }
                },
                userId: null,
                gameList: null,
                favoriteGames: null
            }],
            currentService: 0
        }
    }

    componentDidMount () {
        if (localStorage.getItem('gamehubToken')) {
           this.addTokenToHeader()
            axios.get(`${process.env.REACT_APP_API_URL}/api/users/current`)
                .then(response => {
                    this.setState(prev => {return {...prev, currentUserId: response.data.currentUser.id}})
                    this.addTokenToHeader()
                    return this.parseUri() || axios.get(`${process.env.REACT_APP_API_URL}/steam/auth/${response.data.currentUser.id}`)
                }) 
                .then(idResponse => {
                    if (idResponse.data) {
                        this.addTokenToHeader()
                        axios.post(`${process.env.REACT_APP_API_URL}/services/steam/getOwnedGames`, { steamid: idResponse.data.steamId.users_service_id, include_played_free_games: '1'})
                        .then(gameResponse => {
                            this.setState(prev => {
                                console.log(gameResponse)
                                let newState = { ...prev }
                                newState.services[newState.currentService] = { ...newState.services[newState.currentService], userId: idResponse.data.steamId.users_service_id, gameList: gameResponse.data.response.games }
                                return newState
                            })
                        })
                    }
                }) 
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

    logoutUser = () => {
        localStorage.removeItem("gamehubToken")
        this.state.currentUserId = null
    }

    async parseUri(){
        if (window.location.search){
            let fullUrl = new URL(window.location).searchParams
            // console.log(fullUrl.get('openid.ns'))
            // console.log(fullUrl.get('openid.mode'))
            // console.log(fullUrl.get('openid.claimed_id'))
            // console.log(fullUrl.get('openid.identity'))
            // console.log(fullUrl.get('openid.return_to'))
            // console.log(fullUrl.get('openid.response_nonce'))
            // console.log(fullUrl.get('openid.assoc_handle'))
            // console.log(fullUrl.get('openid.signed'))
            // console.log(fullUrl.get('openid.sig'))
            let steamID = fullUrl.get('openid.identity').slice(-17)
            console.log('Steam ID: ', steamID)
            this.addTokenToHeader()
            axios.post(`${process.env.REACT_APP_API_URL}/api/users/${this.state.currentUserId}`, { users_service_id: steamID })
            return {data: {steamId: { users_service_id: steamID}}}
        }
        return 0
    }

    render () {
        return (
            <div className = "container-fluid">
                <LoginModal loginFormCallback={this.loginFormCallback} registrationFormCallback={this.registrationFormCallback} logoutFunction={this.logoutUser} currentUserId={this.state.currentUserId}/>
                <div className = "row">
                    HEADER
                </div>
                <div className = "row">
                    USER INFO
                </div>
                <div className = "row">
                    < ServiceButtonBar services = { this.state.services }/>
                </div>
                <div className = "row">
                    < ServiceContainer service={this.state.services[this.state.currentService]}/>
                </div>
                <div className = "row">
                    FOOTER
                </div>
            </div>
        )
    }
}

export default UserPage
