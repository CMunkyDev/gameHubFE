import React, { Component } from 'react'
import TextForm from '../generic/TextForm'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Tabs, Tab } from 'material-ui/Tabs';

class LoginModal extends Component {
    constructor (props) {
        super(props)
        let registration = {
            email: {
                type: 'email',
                value: '',
                validationString: '',
                validationFunction: null
            },
            username: {
                type: 'text',
                value: '',
                validationString: '',
                validationFunction: null
            },
            password: {
                type: 'password',
                value: '',
                validationString: '',
                validationFunction: null
            },
            passcheck: {
                type: 'password',
                value: '',
                validationString: '',
                validationFunction: null
            }
        }
        let login = {
            username: {
                type: 'text',
                value: '',
                validationString: '',
                validationFunction: null
            },
            password: {
                type: 'password',
                value: '',
                validationString: '',
                validationFunction: null
            }
        }

        this.state = {
            registration,
            login,
            open: false,
            tab: 'login'
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    submitPoop (event) {
        event.preventDefault()
    }

    render () {
        console.log(this.state)
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                onClick={this.handleClose}
            />,
        ]
        return (
            <div>
                <RaisedButton label="Login/Signup" onClick={this.handleOpen} />
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <Tabs>
                        <Tab label = { 'Login' } >
                            <TextForm formObj={this.state.login} formId={'loginForm'} submitCallback={this.submitPoop} />
                        </Tab>
                        <Tab label = { 'Sign Up' } >
                            <TextForm formObj={this.state.registration} formId={'registrationForm'} submitCallback={this.submitPoop} />
                        </Tab>
                    </Tabs>
                </Dialog>
            </div>
        )
    }
} 

export default LoginModal