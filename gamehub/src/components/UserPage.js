import React, { Component } from 'react'
import ServiceContainer from './UserPage/ServiceContainer'
import ServiceButtonBar from './UserPage/ServiceButtonBar'
import LoginModal from './UserPage/LoginModal'
import BottomBar from './UserPage/BottomBar'

//let steamCall = require('../fakeNews').response

class UserPage extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentUserId: this.props.bigState.currentUserId,
            services: this.props.bigState.services,
            currentService: this.props.bigState.currentService
        }
    }

    render () {
        return (
            <div className = "container-fluid">
                <LoginModal loginFormCallback={this.props.loginFormCallback} registrationFormCallback={this.props.registrationFormCallback} logoutFunction={this.props.logoutUser} currentUserId={this.props.bigState.currentUserId}/>
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
                    < ServiceContainer currentUserId={this.state.currentUserId} service={this.state.services[this.state.currentService]}/>
                </div>
                <div className = "row">
                    <BottomBar />
                </div>
            </div>
        )
    }
}

export default UserPage
