import React, { Component } from 'react'
import UserPage from './UserPage'
import axios from 'axios'

class View extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentUserId: null,
            currentPageUser: null,
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

    parseUserInfoResponse (body) {
        let summary = body[0].response.players[0]
        let ownedGames = body[1].response.games
        let friendList = body[2].friendslist.friends
        let recentlyPlayed = body[3].response.games
        let playerBans = body[4].players[0]

        return {summary, ownedGames, friendList, recentlyPlayed, playerBans}
    }

    componentDidMount () {
        if (localStorage.getItem('gamehubToken')) {
           this.addTokenToHeader()
            axios.get(`${process.env.REACT_APP_API_URL}/api/users/current`)
                .then(response => {
                    this.setState(prev => {return {...prev, currentUserId: response.data.currentUser.id}})
                    this.addTokenToHeader()
                    let fullUrl = new URL(window.location)
                    let searchParams = fullUrl.searchParams
                    window.history.replaceState({}, document.title, "/")
                    if (searchParams.get("openid.identity")){
                        return this.storeSteamId(searchParams).then(result => axios.get(`${process.env.REACT_APP_API_URL}/steam/auth/${response.data.currentUser.id}`))
                    } else {
                        return axios.get(`${process.env.REACT_APP_API_URL}/steam/auth/${response.data.currentUser.id}`)
                    }
                }) 
                .then(idResponse => {
                    if (idResponse.data.steamId) {
                        this.addTokenToHeader()
                        axios.post(`${process.env.REACT_APP_API_URL}/services/steam/getOwnedGames`, { steamid: idResponse.data.steamId.users_service_id, include_played_free_games: '1'})
                        .then(gameResponse => {
                            this.setState(prev => {
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
                    this.componentDidMount()
                }
            })
    }

    registrationFormCallback = (formObject) => {
        this.addTokenToHeader()
        return axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, formObject)
    }

    logoutUser = () => {
        localStorage.removeItem("gamehubToken")
        this.setState(prev => {return {
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
        })
    }

    storeSteamId(params){
        let steamID = params.get('openid.identity').slice(-17)
        return axios.post(`${process.env.REACT_APP_API_URL}/api/users/${this.state.currentUserId}`, { users_service_id: steamID })
    }
    render() {
        return (
            <div>
                <UserPage bigState={this.state} loginFormCallback={this.loginFormCallback} registrationFormCallback={this.registrationFormCallback} logoutUser={this.logoutUser} />
            </div>
        )
    }
}

export default View