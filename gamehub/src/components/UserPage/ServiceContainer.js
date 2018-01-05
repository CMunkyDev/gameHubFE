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
      sortKey: 'time', //'time'
      sortDirection: 'ASC',
      searchQuery: '',
      filterKeys: ['playtime_forever'],
      sortedNFilteredGames: []
    }
    this.toolbarFun = {
      changeSortKey: this.changeSortKey.bind(this),
      addFilterKey: this.addFilterKey.bind(this),
      removeFilterKey: this.removeFilterKey.bind(this),
      changeSortDirection: this.changeSortDirection.bind(this),
      changeSearchQuery: this.changeSearchQuery.bind(this)
    }

    this.sortGames = this.sortGames.bind(this)
    this.filterGames = this.filterGames.bind(this)
  }

  componentWillUpdate (nextProps, nextState) {
    if (this.state.sortedNFilteredGames.length !== nextState.sortedNFilteredGames.length || this.state.sortKey !== nextState.sortKey || this.state.sortDirection !== nextState.sortDirection || this.state.filterKeys.length !== nextState.filterKeys.length || this.state.filterKeys.filter(key => !nextState.filterKeys.includes(key)).length || this.state.searchQuery) {
      nextState.sortedNFilteredGames = this.sortGames(nextState.sortKey, nextState.sortDirection, this.filterGames(nextState.userGames, nextState.filterKeys))
      if (this.state.searchQuery) nextState.sortedNFilteredGames = nextState.sortedNFilteredGames.filter(game => game.name.toLowerCase().includes(nextState.searchQuery.toLowerCase()))
    }
  }

  changeSearchQuery (newQuery) {
    this.setState(prev => {
      return {...prev, searchQuery: newQuery}
    })
  }

  // searchInGameNames (gameArray = this.state.sortedNFilteredGames, searchQuery = this.state.searchQuery) {
  //   this.setState(prev => {
  //       return { ...prev, sortedNFilteredGames: gameArray.filter(game => game.name.toLowerCase().includes(searchQuery.toLowerCase()))}
  //   })
  // }

  changeSortKey (key) {
    this.setState(prev => {
      return {...prev, sortKey: key}
    })
  }

  changeSortDirection (direction) {
    this.setState(prev => {
      return {...prev, sortDirection: direction}
    })
  }

  addFilterKey (key) {
    this.setState(prev => {
      return { ...prev, filterKeys: [ ...prev.filterKeys, key] }
    })
  }

  removeFilterKey (key) {
    this.setState(prev => {
      return { ...prev, filterKeys: [...prev.filterKeys.filter(thisKey => thisKey !== key)]}
    })
  }

  filterGames (gameArray = this.state.userGames, keysToFilter = this.state.filterKeys) {
    let thing = gameArray.filter(game => {
      if (keysToFilter.length) {
        return keysToFilter.reduce((bool, filterKey) => {
          
          if (!game[filterKey]) bool = false
          return bool
        }, true)
      } else {
        return true
      }
    })
    return thing
  }

  sortNFilter(key = this.state.sortKey, direction = this.state.sortDirection, gameArray = this.state.userGames, keysToFilter = this.state.filterKeys) {
    let filteredGames = this.filterGames(gameArray, keysToFilter)
    let sortedNFiltered = this.sortGames(key, direction, filteredGames)
    this.setState(prev => {
      return { ...prev, sortedNFilteredGames: sortedNFiltered}
    })
  }

  sortGames (key = this.state.sortKey, direction = this.state.sortDirection, gameArray = this.state.userGames) {
    let mappedGames = gameArray.map((game, i) => {
      let mapObj
      switch (key) {
        case 'name':
          mapObj = { index: i, value: game.name.toLowerCase() }
          break;
        case 'time':
          mapObj = { index: i, value: game.playtime_forever }
          break;
        default:
          mapObj = { index: i, value: game.playtime_forever }
          break;
      }
      return mapObj
    })

    mappedGames.sort(function (a, b) {
      if (a.value > b.value) {
        return 1;
      }
      if (a.value < b.value) {
        return -1;
      }
      return 0;
    })

    let final = mappedGames.map(function (el) {
      return gameArray[el.index];
    })

    let directed = direction.toLowerCase() === 'asc' ? final : final.reverse()
    return directed
  }

  componentDidMount () {
    this.setState(prev => {
      return { ...prev, userGames: this.props.service.gameList ? [...this.props.service.gameList] : [], sortedNFilteredGames: this.props.service.gameList ? [...this.props.service.gameList] : []}
    })
  }
//PRETENDING WE ARE HITTING EACH TIME
  render(){
    if (this.props.service.gameList && this.props.service.gameList.length !== this.state.userGames.length) {
      this.setState(prev => {
        return { ...prev, userGames: this.props.service.gameList ? [...this.props.service.gameList] : [], sortedNFilteredGames: this.props.service.gameList ? [...this.props.service.gameList] : [] }
      })
    } else {
    }
    if (this.props.service.userId) {
      return (
        <div>
          <GameListToolbar toolbarFun={this.toolbarFun} sortKey={this.state.sortKey} sortDirection={this.state.sortDirection}/>
          <List style={{ paddingTop: 0 }}>
            {/* { this.props.favoriteGames[this.props.currentService.id].map( gameId => < GameRow gameId={gameId} />  ) } */}
            {this.state.sortedNFilteredGames.map((game, index) => <GameRow service={this.props.service} game={game} />)}

          </List>
        </div>
      )
    } else if (this.props.currentUserId) {
      return (
        <div className="row">
          <form action="http://localhost:3001/steam/auth" method="post">
            <input type='submit' value='Connect with Steam' />
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
