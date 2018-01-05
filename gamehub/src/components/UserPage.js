import React, { Component } from 'react'
import ServiceContainer from './UserPage/ServiceContainer'
import ServiceButtonBar from './UserPage/ServiceButtonBar'
import LoginModal from './UserPage/LoginModal'
import BottomBar from './UserPage/BottomBar'

//let steamCall = require('../fakeNews').response

class UserPage extends Component {
    constructor(props){
        super(props)
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
                    < ServiceButtonBar services = { this.props.bigState.services }/>
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
