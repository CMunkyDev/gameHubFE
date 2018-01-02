import React, { Component } from 'react'
import TextField from 'material-ui/TextField';

/************
formObj = {
    inputName: {
        type: x,
        value: y,
        validationString = '',
        validationFunction: z
    }
}
validationFun: takes in input value, returns validation string.
************/
class TextForm extends Component {
    constructor (props) {
        super(props)
        let { formObj, submitCallback, formId } = props
        this.state = formObj
        this.submitCallback = submitCallback
    }

    handleChange = (validationFunction) => {
        return (event) => {
            event.persist()
            let stateKey = event.target.name
            this.setState(prev => {
                let newValidationString = validationFunction ? validationFunction(event.target.value) : prev[stateKey].validationString
                return { ...prev, [stateKey]: { ...prev[stateKey], value: event.target.value, validationString: newValidationString } }
            })
        }
    }

    compileForm = () => {
        let compiledForm = []
        for (let inputName in this.state) {
            compiledForm = [...compiledForm, 
                <TextField 
                    type={this.state[inputName].type}
                    name={inputName}
                    value={this.state[inputName].value}
                    errorText={this.state[inputName].validationString}
                    onChange={this.handleChange(this.state[inputName].validationFunction)}
                    floatingLabelText={inputName}
                />
            ]
        }
        return compiledForm
    }

    render () {
        return (
            <form id = {this.props.formId} onSubmit = {this.submitCallback}>
                {this.compileForm()}
            </form>
        )
    }
}





export default TextForm