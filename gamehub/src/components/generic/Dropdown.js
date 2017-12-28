import React from 'react'

//optionsObject is an object where the options are the keys and the values are the... values... {option: value, option: value}
const Dropdown = ({ optionsObject, attributes, defaultKey, firstRowText }) => {
    let options = []
    for (let key in optionsObject) {
        options = [...options, <option value={optionsObject[key]}>{key}</option>]
    }
    options = [<option disabled value={''} selected>{firstRowText || 'Select'}</option>, ...options]
    return (
        <select {...attributes} defaultValue = {optionsObject[defaultKey] || ''}>
            {options}
        </select>
    )
}

export default Dropdown
