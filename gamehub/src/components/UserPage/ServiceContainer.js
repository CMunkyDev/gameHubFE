import React, { Component } from 'react'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import GameRow from './ServiceContainer/GameRow'
import GameListToolbar from './ServiceContainer/GameListToolbar'
import muiThemeable from 'material-ui/styles/muiThemeable'


// let fakeData = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${XXXXXXXXXXXXXXXXXXXXX}&steamid=${playerId}&include_appinfo=1`


// favoriteGames = [favoriteGamesIDArray]

// userGames = [{game1}, {game2}]

class ServiceContainer extends Component {
  constructor(props){
    super(props)

    this.state = {
      userGames: [],
      sortedNFilteredGames: []
    }
  }

  componentDidMount () {
    this.setState(prev => {
      return { ...prev, userGames: this.props.service.gameList || [], sortedNFilteredGames: this.props.service.gameList || []}
    })
  }
//PRETENDING WE ARE HITTING EACH TIME
  render(){
    if (this.props.service.gameList && this.props.service.gameList.length !== this.state.userGames.length) {
      this.setState(prev => {
        return {...prev, userGames: this.props.service.gameList, sortedNFilteredGames: this.props.service.gameList}
      })
    } else {

    }
    if (this.props.service.userId) {
      return (
        <div>
          <GameListToolbar />
          <List style={{ paddingTop: 0 }}>
            {/* { this.props.favoriteGames[this.props.currentService.id].map( gameId => < GameRow gameId={gameId} />  ) } */}
            {this.state.sortedNFilteredGames.map((game, index) => <GameRow service={this.props.service} game={game} />)}

          </List>
        </div>
      )
    } else {
      return (
        <div className="row">
          <form action="http://localhost:3001/steam/auth" method="post">
            <input type='submit' value='Connect with Steam' />
          </form>
        </div>
      )
    }
  }

}

export default muiThemeable()(ServiceContainer)
