import React, { Component } from 'react'
import { List } from 'material-ui/List'
import GameRow from './ServiceContainer/GameRow'
import GameListToolbar from './ServiceContainer/GameListToolbar'
import RaisedButton from 'material-ui/RaisedButton'
import muiThemeable from 'material-ui/styles/muiThemeable'

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

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
            {this.state.sortedNFilteredGames.map((game, index) => <GameRow service={this.props.service} game={game} key={index} />)}

          </List>
        </div>
      )
    } else if (this.props.currentUserId) {
      return (
        <div className="noGames">
          <p>It looks like you don't have any {this.props.service.name.capitalize()} games.  Click the button to connect to your {this.props.service.name.capitalize()} account!</p>
          <form action="http://localhost:3001/steam/auth" method="post">
            <RaisedButton type='submit'>Connect with {this.props.service.name.capitalize()}</RaisedButton>
          </form>
        </div>
      )
    } else {
      return (
        <div>
        </div>
      )
    }
  }

}

export default muiThemeable()(ServiceContainer)
