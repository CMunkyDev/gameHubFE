import React from 'react'

const Button = ({text, attributes, callback}) => {
    if (callback) {
        attributes.onClick = callback
    }
    return (
        <button {...attributes}>
            {text}
        </button>
    )
}

export default Button