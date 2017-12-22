import React from 'react'

const GameRow = ({game}) => {
  return (
    <div className='container-fluid'>
      <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`}></img>
      <span>{game.name}</span>
      <span>Total time {(game.playtime_forever/60).toFixed(1)} hours </span>
      <span>Last fortnight {(game.playtime_2weeks) ? (game.playtime_2weeks/60).toFixed(1) : 'Not played' }</span>
    </div>
  )
}

export default GameRow
