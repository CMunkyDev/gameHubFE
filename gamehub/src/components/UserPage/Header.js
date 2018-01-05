import React, { Component } from 'react'
import LoginModal from './LoginModal'
import TextField from 'material-ui/TextField'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

class Header extends Component {

    render(){
        return (
            <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="gameHUB" />
                </ToolbarGroup>
                <ToolbarGroup>
                </ToolbarGroup>
                <ToolbarGroup>
                </ToolbarGroup>
                <ToolbarGroup>
                </ToolbarGroup>
                <ToolbarGroup>
                    <TextField hintText="User Search..."/>
                </ToolbarGroup>
                <ToolbarGroup>
                    <LoginModal loginFormCallback={this.props.loginFormCallback} registrationFormCallback={this.props.registrationFormCallback} logoutUser={this.props.logoutUser} currentUserId={this.props.currentUserId}/>
                </ToolbarGroup>
            </Toolbar>
            )
    }
}

export default Header