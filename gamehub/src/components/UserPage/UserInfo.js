import React from 'react'
import Avatar from 'material-ui/Avatar'
import Paper from 'material-ui/Paper'

// Example
// {
//     "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fa/fa36289a94eb1b2b22489f54e7f31249a8cdc0e5.jpg",
//     "avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fa/fa36289a94eb1b2b22489f54e7f31249a8cdc0e5_full.jpg",
//     "avatarmedium": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fa/fa36289a94eb1b2b22489f54e7f31249a8cdc0e5_medium.jpg",
//     "communityvisibilitystate": 3,
//     "lastlogoff": 1515053053,
//     "loccityid": 4030,
//     "loccountrycode": "US",
//     "locstatecode": "WA",
//     "personaname": "CrazyMunky [music]",
//     "personastate": 0,
//     "personastateflags": 0,
//     "primaryclanid": "999999999999999999",
//     "profilestate": 1,
//     "profileurl": "http://steamcommunity.com/id/ImaKeelJ00/",
//     "realname": "Matt",
//     "steamid": "76561197980971766",
//     "timecreated": 1139796214
// }


const UserInfo = (props) => {
    console.log(props)
    if (!props.user || !props.user.username) return ''
    let username = props.user.username
    if (props.user.steamInfo.userInfo) {
        console.log('summary: ',props.user.steamInfo.userInfo)
        var {
            avatar,
            avatarfull,
            avatarmedium,
            communityvisibilitystate,
            lastlogoff,
            loccityid,
            loccountrycode,
            locstatecode,
            personaname,
            personastate,
            personastateflags,
            primaryclanid,
            profilestate,
            profileurl,
            realname,
            steamid,
            timecreated
        } = props.user.steamInfo.userInfo
    }
    return (
        <Paper style={{background: '#191A21', paddingLeft:'15%', color: '#FFF', minHeight: "150px", paddingTop: '10px', paddingBottom: '10px'}}>
            <div style={{ float: 'left', background: '#191A21', height: '130px'}}>
                <img style={{width: '130px', borderRadius: '25%'}} src={avatarfull} />
            </div>
            <div style={{ background: '#191A21', display: 'flex', paddingLeft: '20px'}}>
                <div style={{display: 'block'}}>
                    <h1 style={{margin: "9px 0"}}>{username}</h1>
                    <a href={profileurl} style={{color: '#FFF'}}><h4 style={{margin: "9px 0"}}>Steam: {personaname}</h4></a>
                    <h5 style={{margin: "9px 0"}}>Name: {realname}</h5>
                    <h5 style={{margin: "9px 0"}}>State: {locstatecode}</h5>
                </div>
            </div>

        </Paper>
    )
}

export default UserInfo