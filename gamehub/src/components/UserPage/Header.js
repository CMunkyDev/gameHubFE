import React, { Component } from 'react'
import LoginModal from './LoginModal'
import TextField from 'material-ui/TextField'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'

const hiddenButton = {
    display: 'none'
}

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
                    <form id="userSearch" onSubmit={this.props.userSearch}>
                        <TextField hintText="User Search..."/>
                        <input type='submit' style={hiddenButton} />
                    </form>
                </ToolbarGroup>
                <ToolbarGroup>
                    <LoginModal loginFormCallback={this.props.loginFormCallback} registrationFormCallback={this.props.registrationFormCallback} logoutUser={this.props.logoutUser} currentUser={this.props.currentUser}/>
                </ToolbarGroup>
            </Toolbar>
            )
    }
}

export default Header