import React, { Component } from 'react'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';

class GameListToolbar extends Component {
    constructor (props) {
        super(props)

    }

    render () {
        return (
            <Toolbar >
                <ToolbarGroup>
                    SORT
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarGroup>
                    FILTER
                </ToolbarGroup>
                <ToolbarSeparator />
                <ToolbarGroup>
                    SEARCH
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default GameListToolbar