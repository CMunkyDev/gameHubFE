import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Tabs, Tab } from 'material-ui/Tabs';

class LoginModal extends Component {
    constructor(props) {
        super(props)
        let registration = {
            email: {
                value: '',
                validationString: '',
                validationFunction: null
            },
            username: {
                value: '',
                validationString: '',
                validationFunction: null
            },
            password: {
                value: '',
                validationString: '',
                validationFunction: null
            },
            passCheck: {
                value: '',
                validationString: '',
                validationFunction: null
            }
        }
        let login = {
            email: {
                value: '',
                validationString: '',
                validationFunction: this.fakeValidation
            },
            password: {
                value: '',
                validationString: '',
                validationFunction: null
            }
        }

        this.state = {
            registration,
            login,
            open: false
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    fakeValidation (string) {
        return string
    }



    //validation Function takes in the input's value and returns a validation string
    handleChange = (validationFunction) => {
        return (event) => {
            event.persist()
            let stateKey = event.target.name
            let stateParent = event.target.form.id
            this.setState(prev => {
                let newValidationString = validationFunction ? validationFunction(event.target.value) : prev[stateParent][stateKey].validationString
                return { ...prev, [stateParent]: { ...prev[stateParent], [stateKey]: {...prev[stateParent][stateKey], value: event.target.value, validationString: newValidationString} } }
            })
        }
    }

    handleSubmit = (postRequestCallback, formKey) => {
        return (event) => {
            let formObject = {}
            for (let key in this.state[formKey]) {
                formObject[key] = this.state[formKey][key].value
            }
            postRequestCallback(formObject)
        }
    }

    render() {
        return (
            <div>
                <RaisedButton label="Login/Signup" onClick={this.handleOpen} />
                <Dialog
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <Tabs>
                        <Tab label="Login">
                            <form id = "login" >
                                <TextField
                                    type="email"
                                    name="email"
                                    value={this.state.login.email.value}
                                    errorText={this.state.login.email.validationString}
                                    onChange={this.handleChange(this.state.login.email.validationFunction)}
                                    fullWidth={true}
                                    hintText="E-mail"
                                />
                                <TextField
                                    type="password"
                                    name="password"
                                    value={this.state.login.password.value}
                                    errorText={this.state.login.password.validationString}
                                    onChange={this.handleChange(this.state.login.password.validationFunction)}
                                    fullWidth={true}
                                    hintText="Password"
                                />
                                <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                                    <RaisedButton label={'Cancel'} onClick={this.handleClose} />
                                    <RaisedButton label={'Submit'} onClick={this.handleSubmit(this.props.loginFormCallback, 'login')}/>
                                </div>
                            </form>
                        </Tab>
                        <Tab label="Signup">
                            <form id = "registration" >
                                <TextField
                                    type="email"
                                    name="email"
                                    value={this.state.registration.email.value}
                                    errorText={this.state.registration.email.validationString}
                                    onChange={this.handleChange(this.state.registration.email.validationFunction)}
                                    fullWidth={true}
                                    hintText="E-mail"
                                />
                                <TextField
                                    type="text"
                                    name="username"
                                    value={this.state.registration.username.value}
                                    errorText={this.state.registration.username.validationString}
                                    onChange={this.handleChange(this.state.registration.username.validationFunction)}
                                    fullWidth={true}
                                    hintText="Username"
                                />
                                <TextField
                                    type="password"
                                    name="password"
                                    value={this.state.registration.password.value}
                                    errorText={this.state.registration.password.validationString}
                                    onChange={this.handleChange(this.state.registration.password.validationFunction)}
                                    fullWidth={true}
                                    hintText="Password"
                                />
                                <TextField
                                    type="password"
                                    name="passCheck"
                                    value={this.state.registration.passCheck.value}
                                    errorText={this.state.registration.passCheck.validationString}
                                    onChange={this.handleChange(this.state.registration.passCheck.validationFunction)}
                                    fullWidth={true}
                                    hintText="Password Verification"
                                />
                                <div style={{ display: "flex", justifyContent: "space-around", width: "100%" }}>
                                    <RaisedButton label={'Cancel'} onClick={this.handleClose}/>
                                    <RaisedButton label={'Submit'} onClick={this.handleSubmit(this.props.registrationFormCallback, 'registraion')}/>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                </Dialog>
            </div>
        )
    }
}

export default LoginModal