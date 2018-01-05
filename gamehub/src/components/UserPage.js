import React, { Component } from 'react'
import ServiceContainer from './UserPage/ServiceContainer'
import ServiceButtonBar from './UserPage/ServiceButtonBar'
import BottomBar from './UserPage/BottomBar'
import Header from './UserPage/Header'
import UserInfo from './UserPage/UserInfo'

//let steamCall = require('../fakeNews').response

class UserPage extends Component {
    render () {
        return (
            <div className = "container-fluid">
                <div className = "row">
                    <Header loginFormCallback={this.props.loginFormCallback} registrationFormCallback={this.props.registrationFormCallback} logoutUser={this.props.logoutUser} currentUserId={this.props.bigState.currentUserId}/>
                    <UserInfo />
                </div>
                <div className = "row">
                    < ServiceButtonBar currentUserId={this.props.bigState.currentUserId} services = { this.props.bigState.services }/>
                </div>
                <div className = "row">
                    < ServiceContainer currentUserId={this.props.bigState.currentUserId} service={this.props.bigState.services[this.props.bigState.currentService]}/>
                </div>
                <div className = "row">
                    <BottomBar />
                </div>
            </div>
        )
    }
}

export default UserPage
