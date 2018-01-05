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
            if (!this.state.currentUser.id) {
                await this.getCurrentUser()
             } else {
                 if (!this.state.currentUser.steamInfo) { 
                     let steamInfo = await this.grabSteamInfo(this.state.currentUser.steamId)
                     this.setState(prev => {
                         return {...prev, currentUser: {...prev.currentUser, steamInfo}}
                     })
                 }
             }
        }
    }


    grabSteamInfo = (steamId) => {
        return axios.post(`${process.env.REACT_APP_API_URL}/services/steam/player_info`, { steamid: steamId, include_played_free_games: '1' })
            .then(userInfoResponse => {
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
        return axios.get(`${process.env.REACT_APP_API_URL}/api/users/current`)
            .then(response => {
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
        await this.getAllCurrentUserInfo()
        await this.getAllCurrentUserInfo()
    }
                        // if (currentUser.steamId) {
                            
    //                     } else {

    //                     }
    //                     this.setState(prev => { return { ...prev, currentUser: { ...prev.currentUser, ...response.data.currentUser } } })
    //                     this.addTokenToHeader()
    //                     let fullUrl = new URL(window.location)
    //                     let searchParams = fullUrl.searchParams
    //                     window.history.replaceState({}, document.title, "/")
    //                     if (searchParams.get("openid.identity")) {
    //                         return this.storeSteamId(searchParams).then(result => axios.get(`${process.env.REACT_APP_API_URL}/steam/auth/${response.data.currentUser.id}`))
    //                     } else {
    //                         return axios.get(`${process.env.REACT_APP_API_URL}/steam/auth/${response.data.currentUser.id}`)
    //                     }
    //                 })
    //                 .then(idResponse => {
    //                     if (idResponse.data.steamId) {
    //                         this.addTokenToHeader()
                            
    //                     }
    //                 }) 
    //         }
    //     }
    // }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.currentPageUsername !== this.state.currentPageUsername) {
           this.getCurrentPageUser()
        }
    }

    componentDidMount = async () => {
        await this.fillCurrentUserState()
        this.setState(prev => {
            return {...prev, currentPageUsername: prev.currentUser.username}
        })
        
        

        // if (localStorage.getItem('gamehubToken')) {
        //    this.addTokenToHeader()
        //     axios.get(`${process.env.REACT_APP_API_URL}/api/users/current`)
        //         .then(response => {
        //             this.setState(prev => {return {...prev, currentUser: {...prev.currentUser, ...response.data.currentUser}}})
        //             this.addTokenToHeader()
        //             let fullUrl = new URL(window.location)
        //             let searchParams = fullUrl.searchParams
        //             window.history.replaceState({}, document.title, "/")
        //             if (searchParams.get("openid.identity")){
        //                 return this.storeSteamId(searchParams).then(result => axios.get(`${process.env.REACT_APP_API_URL}/steam/auth/${response.data.currentUser.id}`))
        //             } else {
        //                 return axios.get(`${process.env.REACT_APP_API_URL}/steam/auth/${response.data.currentUser.id}`)
        //             }
        //         }) 
        //         .then(idResponse => {
        //             if (idResponse.data.steamId) {
        //                 this.addTokenToHeader()
        //                     this.setState(prev => {
        //                         let newState = { ...prev }
        //                         newState.currentUser.steamId = idResponse.data.steamId.users_service_id,

        //                         return newState
        //                     })
        //                 })
        //             }
        //         }) 
        // }
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