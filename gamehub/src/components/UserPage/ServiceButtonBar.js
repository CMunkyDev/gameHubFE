import React from 'react'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { Tabs, Tab } from 'material-ui/Tabs'

//[{name: Steam, }]
const ServiceButtonBar = (props) => {
    return (
        <Tabs>
            {props.services.map(service => <Tab label = {service.name.toUpperCase()} style = {service.style.tab}/>)}
        </Tabs>
    )
}

export default muiThemeable()(ServiceButtonBar)