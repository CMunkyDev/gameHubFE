import React, { Component } from 'react'
import UserPage from './UserPage'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'

class View extends Component {
    constructor(props){
        super(props)
        this.retrievedInfo = false
        this.state = {
            currentUser: {},
            userQuery: '',
            currentPageUsername: null,
            currentPageUser: {},
            fullPageError: '',
            services: [{
                name: 'steam',
                style: {
                    tab: {
                        backgroundColor: '#181A21',
                        color: '#BBB'
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

    parseUserInfoResponse = (body) => {
        let summary = body[0].response.players[0]
        let ownedGames = body[1].response.games
        let friendList = body[2].friendslist.friends
        let recentlyPlayed = body[3].response.games
        let playerBans = body[4].players[0]

        return {summary, ownedGames, friendList, recentlyPlayed, playerBans}
    }

    changeUserQuery = (event, value) => {
        this.setState(prev => {
            return {...prev, currentPageUsername: value}
        })
    }

    //if localStorage.getItem('gamehubToken')
        //if !state.currentUser.id
            //getCurrentUser
        //else 
            //if !state.currentUser.steamInfo
                //if state.currentUser.steamId
                    //getUserSteamInfo

                //else render steamLink button/suggestion
    //else render login suggestion & user Search

    getAllCurrentUserInfo = async () => {
        if (localStorage.getItem('gamehubToken')) {
            console.log('test3')
            if (!this.state.currentUser.id) {
                console.log('test4')
                await this.getCurrentUser()
             } else {
                 if (!this.state.currentUser.steamInfo) { 
                    console.log('test5')
                     let steamInfo = await this.grabSteamInfo(this.state.currentUser.steamId)
                     console.log('test6')
                     this.setState(prev => {
                        console.log('test7')
                         return {...prev, currentUser: {...prev.currentUser, steamInfo}}
                     })
                 }
             }
        }
    }


    grabSteamInfo = (steamId) => {
        return axios.post(`${process.env.REACT_APP_API_URL}/services/steam/player_info`, { steamid: steamId, include_played_free_games: '1' })
            .then(userInfoResponse => {
                console.log('grabSteamInfo', userInfoResponse)
                if (userInfoResponse) {
                    let { summary, ownedGames, friendList, recentlyPlayed, playerBans } = this.parseUserInfoResponse(userInfoResponse.data)
                    return { gameList: ownedGames, gameCount: ownedGames.length, recentGames: recentlyPlayed, friendList, friendCount: friendList.length, userInfo: summary, banStatus: playerBans }
                } else {
                    return null
                }
            })
    }

    getCurrentPageUser = () => {
        if (this.state.currentPageUsername) {
            this.getUserByUsernameOrEmail(this.state.currentPageUsername).then(user => {
                this.grabSteamInfo(user.steamId).then(pageUserSteamInfo => {
                    this.setState(prev => {
                        return { ...prev, currentPageUser: { ...user, steamInfo: pageUserSteamInfo }}
                    })
                })
            })
        }
    }

    getCurrentUser = () => {
        this.addTokenToHeader()
        console.log('testuser1')
        return axios.get(`${process.env.REACT_APP_API_URL}/api/users/current`)
            .then(response => {
                console.log('testuser2')
                this.setState(prev => {
                    return { ...prev, currentUser : response.data.currentUser }
                }) 
            })
    }

    getUserByUsernameOrEmail = (usernameOrEmail) => {
        this.addTokenToHeader()
        return axios.get(`${process.env.REACT_APP_API_URL}/api/users/search/${usernameOrEmail}`)
            .then(response => {
                return response.data.user
            })
    }

    fillCurrentUserState = async () => {
        console.log("test1")
        await this.getAllCurrentUserInfo()
        console.log("test2")
        await this.getAllCurrentUserInfo()
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.currentPageUsername !== this.state.currentPageUsername) {
           this.getCurrentPageUser()
        }
    }

    componentDidMount = async () => {
        console.log('asdf')
        await this.fillCurrentUserState()
        console.log(this.state)
        // this.setState(prev => {
        //     return {...prev, currentPageUsername: prev.currentUser.username}
        // }).then(response => {
        //     let fullUrl = new URL(window.location)
        //     let searchParams = fullUrl.searchParams
        //     window.history.replaceState({}, document.title, "/")
        //     if (searchParams.get("openid.identity")){
        //         return this.storeSteamId(searchParams).then(result => axios.get(`${process.env.REACT_APP_API_URL}/steam/auth/${response.data.currentUser.id}`))
        //     } 
        // })
    }

    addTokenToHeader () {
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
                currentUser: {},
                userQuery: '',
                currentPageUser: {},
                fullPageError: '',
                services: [{
                    name: 'steam',
                    style: {
                        tab: {
                            backgroundColor: '#181A21',
                            color: '#BBB'
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

    componentWillUpdate = (nextProps, nextState) => {
        if (!nextState.currentUser.id) {
            if (this.state.currentUser.username === nextState.currentPageUsername) {
                nextState.currentPageUsername = null
            }
        }
    }

    userSearch = (event) => {
        event.preventDefault()
        const searchValue = document.getElementById('userSearch')[0].value
        this.setState(prev => {
            return {...prev, currentPageUsername: searchValue}
        })
    }

    storeSteamId(params){
        let steamID = params.get('openid.identity').slice(-17)
        return axios.post(`${process.env.REACT_APP_API_URL}/api/users/${this.state.currentUser.id}`, { users_service_id: steamID })
    }

    render() {
        return (
            <div>
                <UserPage bigState={this.state} userSearch={this.userSearch} loginFormCallback={this.loginFormCallback} registrationFormCallback={this.registrationFormCallback} logoutUser={this.logoutUser} />
            </div>
        )
    }
}

export default View