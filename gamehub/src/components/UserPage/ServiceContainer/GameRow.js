import React from 'react'
import Avatar from 'material-ui/Avatar'
import { ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import muiThemeable from 'material-ui/styles/muiThemeable'
import path from 'path'

const GameRow = ({service, muiTheme, game}) => {
  let gameIconURL = `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
  let timePlayedString = `Time Played: ${(game.playtime_forever / 60).toFixed(1)} hours`
  let avatarStyle = {borderRadius: '25%', height:'32px', width: '32px', padding: '4px', backgroundColor: muiTheme.palette.canvasColor}
  let itemStyle = {backgroundColor: muiTheme.palette.primary3Color, color: muiTheme.palette.textColor}
  return (
    <ListItem
      leftAvatar={<Avatar src={game.img_icon_url ? gameIconURL : 'https://iconmonstr.com/wp-content/g/gd/png.php?size=96&padding=0&icon=assets/source/2014/png/iconmonstr-steam-3.png&in=iconmonstr-steam-3.png&bgShape=iconmonstr-shape-11.png&bgColorR=255&bgColorG=255&bgColorB=255&iconColorR=0&iconColorG=0&iconColorB=0'} style={avatarStyle} />} 
      primaryText = {game.name} 
      secondaryText = {timePlayedString}
      style = {service.style.row}
    />
  )
}

export default muiThemeable()(GameRow)
