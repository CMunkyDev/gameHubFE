import React, { Component } from 'react'
import ServiceContainer from './UserPage/ServiceContainer'
import ServiceButtonBar from './UserPage/ServiceButtonBar'
import BottomBar from './UserPage/BottomBar'
import Header from './UserPage/Header'
import UserInfo from './UserPage/UserInfo'

//let steamCall = require('../fakeNews').response

class UserPage extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        console.log('BS: ',this.props.bigState)
        console.log('CPU: ',this.props.bigState.currentPageUser)
        return (
            <div className = "container-fluid">
                <div className = "row">
                    <Header userSearch={this.props.userSearch} loginFormCallback={this.props.loginFormCallback} registrationFormCallback={this.props.registrationFormCallback} logoutUser={this.props.logoutUser} currentUser={this.props.bigState.currentUser}/>
                    <UserInfo user={this.props.bigState.currentPageUser} />
                </div>
                <div className = "row">
                    < ServiceButtonBar user={this.props.bigState.currentPageUser || {}} services = { this.props.bigState.services }/>
                </div>
                <div className = "row">
                    < ServiceContainer user={this.props.bigState.currentPageUser || {}} service={this.props.bigState.services[this.props.bigState.currentService]}/>
                </div>
                <div className = "row">
                    <BottomBar />
                </div>
            </div>
        )
    }
}

export default UserPage
