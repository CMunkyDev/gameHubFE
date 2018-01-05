import React from 'react'
import Avatar from 'material-ui/Avatar';

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
    if (!props.user || !props.user.username) return ''
    let {username} = props.user.username
    if (props.user.steamInfo.summary) {
        console.log('summary: ',props.user.steamInfo.summary)
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
        } = props.user.steamInfo.summary
    }
    return (
        <div style={{ background: 'red' }}>
            <Avatar size={50} src={avatar} />
            kadsnflkjsdnfkjsdn
        </div>
    )
}

export default UserInfo