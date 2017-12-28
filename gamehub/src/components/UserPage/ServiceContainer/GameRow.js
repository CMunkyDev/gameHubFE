import React from 'react'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'

const GameRow = ({game}) => {
  let gameIconURL = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
  let timePlayedString = `Time Played: ${(game.playtime_forever / 60).toFixed(1)} hours`
  let avatarStyle = {borderRadius: '25%', height:'32px', width: '32px', padding: '4px', backgroundColor: 'rgb(1,1,1)'}
  return (
    <ListItem
      leftAvatar = {<Avatar src={gameIconURL} style={avatarStyle} />} 
      primaryText = {game.name} 
      secondaryText = {timePlayedString}
    />
  )
}

export default GameRow
