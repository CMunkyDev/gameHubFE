import React, { Component } from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import FlatButton from 'material-ui/FlatButton'


class GameListToolbar extends Component {
    constructor (props) {
        super(props)
        this.arrowIconDown = 'DESC'
        this.arrowIconUp = 'ASC'

        this.state = {
            nameSortButtonIcon: this.arrowIconUp,
            timeSortButtonIcon: this.arrowIconUp
        }
    }

    render () {
        return (
            <Toolbar >
                <ToolbarGroup style={{ display: 'flex', width: '28%'}}>
                    <FlatButton label="Game Name"/>
                    <FlatButton label={this.state.nameSortButtonIcon}/>
                    <FlatButton label="Time Played" />
                    <FlatButton label={this.state.timeSortButtonIcon} />
                </ToolbarGroup>
                <ToolbarGroup style={{ display: 'flex', width: '18%'}}>
                    <Toggle label='Show Unplayed Games'/>
                </ToolbarGroup>
                <ToolbarGroup style={{ display: 'flex', width: '28%' }}>
                    <TextField hintStyle={{color:'pink'}} hintText='Search...'/>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default GameListToolbar