import React, { Component } from 'react'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Tabs, Tab } from 'material-ui/Tabs'

class LoginModal extends Component {
    constructor(props) {
        super(props)
        this.registration = {
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
                validationFunction: null //this.jankyPasswordCheckFix
            },
            passCheck: {
                value: '',
                validationString: '',
                validationFunction: this.passwordVerificationValidation
            }
        }
        this.login = {
            email: {
                value: '',
                validationString: '',
                validationFunction: null
            },
            password: {
                value: '',
                validationString: '',
                validationFunction: null
            }
        }

        this.state = {
            registration: this.registration,
            login: this.login,
            open: false,
            currentError : '',
            errorColor: 'red'
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({
            registration: this.registration,
            login: this.login,
            open: false,
            currentError: ''
        });
    }

    jankyPasswordCheckFix = firstPasswordInput => {
        let passVerificationValidationString = this.state.registration.passCheck.value === firstPasswordInput ? '' : `Passwords don't match`
        this.setState(prev => {
            return {
                ...prev,
                registration: {...prev.registration, passCheck: { ...prev.registration.passCheck, validationString: passVerificationValidationString}}
            }
        })
    }

    passwordVerificationValidation = secondPasswordInput => {
        return this.state.registration.password.value === secondPasswordInput ? '' : `Passwords don't match`
    }

    //validation Function takes in the input's value and returns a validation string
    handleChange = (validationFunction) => {
        return (event) => {
            event.persist()
            let stateKey = event.target.name
            let stateParent = event.target.form.id
            this.setState(prev => {
                let newValidationString = validationFunction ? validationFunction(event.target.value) : prev[stateParent][stateKey].validationString
                return { ...prev, currentError: '', [stateParent]: { ...prev[stateParent], [stateKey]: {...prev[stateParent][stateKey], value: event.target.value, validationString: newValidationString} } }
            })
        }
    }

    handleSubmit = (postRequestCallback, formKey) => {
        return (event) => {
            event.preventDefault()
            let formObject = {}
            let valid = true
            for (let key in this.state[formKey]) {
                if (this.state[formKey][key].validationString) valid = false
                formObject[key] = this.state[formKey][key].value
            }
            if (valid) {
                postRequestCallback(formObject)
                    .then(prev => {
                            if (formKey === 'login'){
                                this.setState(prev => {
                                    return {
                                        ...prev,
                                        login: this.login,
                                        open: false
                                    }
                                })
                            } else if (formKey === 'registration') {
                                this.setState(prev => {                                    
                                    return {
                                        ...prev,
                                        registration: this.registration,
                                        currentError: "Account created!  Please login.",
                                        errorColor: "green"
                                    }
                                })
                            }
                        }
                    )
                    .catch(error => {
                        if (!error.response) {
                            //SERVER NOT UP
                            console.log('SERVER DOWN?')
                        } else {
                            this.setState(prev => {
                                return {
                                    ...prev,
                                    currentError: error.response.data.message
                                }
                            })
                        }
                    })
            }
        }
    }

    clearError = () => {
        this.setState({currentError: ''})
    }

    render() {
        return (
            <div className='loginButton'>
                { !this.props.currentUser.id ? <RaisedButton label="Login/Signup" onClick={this.handleOpen} /> : <RaisedButton label="Logout" onClick={this.props.logoutUser} /> }
                <Dialog
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    <Tabs>
                        <Tab label="Login" onActive={this.clearError}>
                            <form id = "login" onSubmit={this.handleSubmit(this.props.loginFormCallback, 'login')}>
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
                                    <RaisedButton label={'Cancel'} onClick={this.handleClose}/>
                                    <RaisedButton type='submit' label={'Submit'}/>
                                </div>
                            </form>
                        </Tab>
                        <Tab label="Signup" onActive={this.clearError}>
                            <form id = "registration" onSubmit={this.handleSubmit(this.props.registrationFormCallback, 'registration')}>
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
                                    <RaisedButton type='submit' label={'Submit'}/>
                                </div>
                            </form>
                        </Tab>
                    </Tabs>
                    <div style={{textAlign: 'center'}}>
                        <div style={{color: this.state.errorColor}}>
                            {this.state.currentError}
                        </div>
                    </div>
                </Dialog>
            </div>
        )
    }
}

export default LoginModal