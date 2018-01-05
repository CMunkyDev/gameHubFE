import React, { Component } from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField'
import Toggle from 'material-ui/Toggle'
import FlatButton from 'material-ui/FlatButton'


class GameListToolbar extends Component {
    constructor (props) {
        super(props)
        this.sortDirections = ['ASC', 'DESC']
        this.toggleSortDirection = this.toggleSortDirection.bind(this)
        this.showUnplayedToggle = this.showUnplayedToggle.bind(this)
    }

    toggleSortDirection (event) {
        let direction = this.sortDirections.filter(direction => direction !== this.props.sortDirection.toUpperCase())[0]
        this.props.toolbarFun.changeSortDirection(direction)
    }

    handleSortClick (key) {
        return (event) => {
            this.props.toolbarFun.changeSortKey(key)
        }
    }

    colorIf(name, prop = this.props.sortKey, color = '#0E0B16') {
        return name == prop ? {color} : {}
    }

    showUnplayedToggle(event, newVal) {
        if (newVal) {
            this.props.toolbarFun.removeFilterKey('playtime_forever')
        } else if (!newVal) {
            this.props.toolbarFun.addFilterKey('playtime_forever')
        }
    }

    handleSearchChange = (event, query) => {
        this.props.toolbarFun.changeSearchQuery(query)
    }

    render () {
        return (
            <Toolbar >
                <ToolbarGroup style={{ display: 'flex', width: '28%'}}>
                    <FlatButton style={this.colorIf('name')} label="Name" onClick={this.handleSortClick('name')}/>
                    <FlatButton style={this.colorIf('time')} label="Played" onClick={this.handleSortClick('time')}/>
                    <FlatButton label={this.props.sortDirection} onClick={this.toggleSortDirection} />
                </ToolbarGroup>
                <ToolbarGroup style={{ display: 'flex', width: '18%'}}>
                    <Toggle label='Show Unplayed Games' onToggle={this.showUnplayedToggle}/>
                </ToolbarGroup>
                <ToolbarGroup style={{ display: 'flex', width: '28%' }}>
                    <TextField hintText='Game Search...' onChange={this.handleSearchChange}/>
                </ToolbarGroup>
            </Toolbar>
        )
    }
}

export default GameListToolbar