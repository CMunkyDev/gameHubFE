import React, { Component } from 'react'
import GameRow from './ServiceContainer/GameRow'


// let fakeData = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${XXXXXXXXXXXXXXXXXXXXX}&steamid=${playerId}&include_appinfo=1`


// favoriteGames = [favoriteGamesIDArray]

// userGames = [{game1}, {game2}]

class ServiceContainer extends Component {
  constructor(props){
    super(props)
  }
//PRETENDING WE ARE HITTING EACH TIME
  render(){

    return (
      <div className='container-fluid'>
        //ARRAY OF GAMEROWS
        {/* { this.props.favoriteGames[this.props.currentService.id].map( gameId => < GameRow gameId={gameId} />  ) } */}
        {this.props.userGames.map(game => < GameRow game={game}  />)}

      </div>
    )
  }

}

export default ServiceContainer
