import React, { Component } from 'react'
import TextForm from '../generic/TextForm'

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

        this.state = {registration, login}
    }

    submitPoop (event) {
        event.preventDefault()
    }

    render () {
        console.log(this.state)
        return (
            <div>
                <TextForm formObj={this.state.registration} formId={'registrationForm'} submitCallback={this.submitPoop} />
                <TextForm formObj={this.state.login} formId={'loginForm'} submitCallback={this.submitPoop} />
            </div>
        )
    }
} 

export default LoginModal