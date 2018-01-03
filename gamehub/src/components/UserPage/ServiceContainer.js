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
  }
//PRETENDING WE ARE HITTING EACH TIME
  render(){
    if (this.props.serviceUserId) {
      return (
        <div>
          <GameListToolbar />
          <List style={{ paddingTop: 0 }}>
            {/* { this.props.favoriteGames[this.props.currentService.id].map( gameId => < GameRow gameId={gameId} />  ) } */}
            {this.props.userGames.map((game, index) => <GameRow service={this.props.service} game={game} />)}

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
