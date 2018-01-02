import axios from 'axios'

class SteamAPI {

    apiRequest (requestName) {
        return (queryObject) => {
            axios.post(`${process.env.REACT_APP_API_URL}/services/steam/${requestName}`, queryObject).then(console.log)
        }
    }
}



const getPlayerSummaries = (queryObject) => {
    // * '''steamids''' REQUIRED
    // ** Comma-delimited list (an array works here) of 64 bit Steam IDs to return profile information for.  Up to 100 Steam IDs can be requested.    return `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}${flattenQuery(queryObject)}`

    // ==== Result data ====

    // ===== Public Data =====

    // *'''steamid'''
    // ** 64bit SteamID of the user
    // *'''personaname'''
    // ** The player's persona name (display name)
    // *'''profileurl'''
    // ** The full URL of the player's Steam Community profile.
    // *'''avatar'''
    // ** The full URL of the player's 32x32px avatar.  If the user hasn't configured an avatar, this will be the default ? avatar.
    // *'''avatarmedium'''
    // ** The full URL of the player's 64x64px avatar.  If the user hasn't configured an avatar, this will be the default ? avatar.
    // *'''avatarfull'''
    // ** The full URL of the player's 184x184px avatar.  If the user hasn't configured an avatar, this will be the default ? avatar.
    // *'''personastate'''
    // ** The user's current status.  0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to trade, 6 - looking to play.  If the player's profile is private, this will always be "0", except if the user has set their status to looking to trade or looking to play, because a bug makes those status appear even if the profile is private.
    // *'''communityvisibilitystate'''
    // ** This represents whether the profile is visible or not, and if it is visible, why you are allowed to see it.  Note that because this WebAPI does not use authentication, there are only two possible values returned: 1 - the profile is not visible to you (Private, Friends Only, etc), 3 - the profile is "Public", and the data is visible.  Mike Blaszczak's [http://forums.steampowered.com/forums/showpost.php?p=31955251&postcount=3 post on Steam forums] says, "The community visibility state this API returns is different than the privacy state. It's the effective visibility state from the account making the request to the account being viewed given the requesting account's relationship to the viewed account."
    // *'''profilestate'''
    // ** If set, indicates the user has a community profile configured (will be set to '1')
    // *'''lastlogoff'''
    // ** The last time the user was online, in unix time.
    // *'''commentpermission'''
    // ** If set, indicates the profile allows public comments.

    // ===== Private Data =====

    // *'''realname'''
    // ** The player's "Real Name", if they have set it.
    // *'''primaryclanid'''
    // ** The player's primary group, as configured in their Steam Community profile.
    // *'''timecreated'''
    // ** The time the player's account was created.
    // *'''gameid'''
    // ** If the user is currently in-game, this value will be returned and set to the gameid of that game.
    // *'''gameserverip'''
    // ** The ip and port of the game server the user is currently playing on, if they are playing on-line in a game using Steam matchmaking.  Otherwise will be set to "0.0.0.0:0".
    // *'''gameextrainfo'''
    // ** If the user is currently in-game, this will be the name of the game they are playing.  This may be the name of a non-Steam game shortcut.
    // *'''cityid'''
    // ** This value will be removed in a future update (see loccityid)
    // *'''loccountrycode'''
    // ** If set on the user's Steam Community profile, The user's country of residence, 2-character ISO country code
    // *'''locstatecode'''
    // ** If set on the user's Steam Community profile, The user's state of residence
    // *'''loccityid'''
    // ** An internal code indicating the user's city of residence.  A future update will provide this data in a more useful way.
    // ** [https://github.com/Holek/steam-friends-countries <tt>steam_location</tt>] gem/package makes player location data readable for output.

}

const getFriendList = (queryObject) => {
    // * '''steamid''' REQUIRED
    // ** 64 bit Steam ID to return friend list for.

    // ==== Result data ====

    // The user's friends list, as an array of friends. Nothing will be returned if the profile is private.

    // * '''steamid'''
    // ** 64 bit Steam ID of the friend.
    // * '''relationship'''
    // ** Relationship qualifier
    // * '''friend_since'''
    // ** Unix timestamp of the time when the relationship was created.
}

const getPlayerAchievements = (queryObject) => {
    // * '''steamid''' REQUIRED
    // ** 64 bit Steam ID to return friend list for.
    // * '''appid''' REQUIRED?
    // ** The ID for the game you're requesting

    // ==== Result data ====

    // A list of achievements.

    // * '''apiname'''
    // ** The API name of the achievement
    // * '''achieved'''
    // ** Whether or not the achievement has been completed.
    // * '''unlocktime'''
    // ** Unlock timestamp (unix). Defaults to "0" if achievement was not unlocked or time is unknown.
    // * '''name''' (optional)
    // ** Localized achievement name
    // * '''description''' (optional)
    // ** Localized description of the achievement
}

const getUserStatsForGame = (queryObject) => {
    // * '''steamid''' REQUIRED
    // ** 64 bit Steam ID to return friend list for.
    // * '''appid''' REQUIRED
    // ** The ID for the game you're requesting

    // Returns a list of achievements for this user by app id
}

const getOwnedGames = (queryObject) => {
    // *'''steamid''' REQUIRED
    // ** The SteamID of the account.
    // *'''include_played_free_games''' (1 = true)
    // ** By default, free games like Team Fortress 2 are excluded (as technically everyone owns them).  If include_played_free_games is set, they will be returned if the player has played them at some point.  This is the same behavior as the games list on the Steam Community.

    // ==== Result layout ====

    // * '''game_count''' the total number of games the user owns (including free games they've played, if include_played_free_games was passed)
    // * A '''games''' array, with the following contents (note that if "include_appinfo" was not passed in the request, only '''appid''', '''playtime_2weeks''', and '''playtime_forever''' will be returned):
    // ** '''appid''' Unique identifier for the game
    // ** '''name''' The name of the game
    // ** '''playtime_2weeks''' The total number of minutes played in the last 2 weeks
    // ** '''playtime_forever''' The total number of minutes played "on record", since Steam began tracking total playtime in early 2009.
    // ** '''img_icon_url''', '''img_logo_url''' - these are the filenames of various images for the game.  To construct the URL to the image, use this format: <nowiki>http://media.steampowered.com/steamcommunity/public/images/apps/</nowiki>''{appid}''/''{hash}''.jpg.  For example, the TF2 logo is returned as "07385eb55b5ba974aebbe74d3c99626bda7920b8", which maps to the URL: [http://media.steampowered.com/steamcommunity/public/images/apps/440/07385eb55b5ba974aebbe74d3c99626bda7920b8.jpg]
    // ** '''has_community_visible_stats''' indicates there is a stats page with achievements or other game stats available for this game.  The uniform URL for accessing this data is <nowiki>http://steamcommunity.com/profiles/</nowiki>''{steamid}''/stats/''{appid}''.  For example, Robin's TF2 stats can be found at: [http://steamcommunity.com/profiles/76561197960435530/stats/440 http://steamcommunity.com/profiles/76561197960435530/stats/440].  You may notice that clicking this link will actually redirect to a vanity URL like /id/robinwalker/stats/TF2
}

const getRecentlyPlayedGames = (queryObject) => {
    // *'''steamid''' REQUIRED
    // ** The SteamID of the account.
    // *'''count'''
    // ** Optionally limit to a certain number of games (the number of games a person has played in the last 2 weeks is typically very small)

    // ==== Result layout ====

    // * '''total_count''' the total number of unique games the user has played in the last two weeks.  This is mostly significant if you opted to return a limited number of games with the '''count''' input parameter
    // * A '''games''' array, with the following contents:
    // ** '''appid''' Unique identifier for the game
    // ** '''name''' The name of the game
    // ** '''playtime_2weeks''' The total number of minutes played in the last 2 weeks
    // ** '''playtime_forever''' The total number of minutes played "on record", since Steam began tracking total playtime in early 2009.
    // ** '''img_icon_url''', '''img_logo_url''' - these are the filenames of various images for the game.  To construct the URL to the image, use this format: <nowiki>http://media.steampowered.com/steamcommunity/public/images/apps/</nowiki>''{appid}''/''{hash}''.jpg.  For example, the TF2 logo is returned as "07385eb55b5ba974aebbe74d3c99626bda7920b8", which maps to the URL: [http://media.steampowered.com/steamcommunity/public/images/apps/440/07385eb55b5ba974aebbe74d3c99626bda7920b8.jpg]
}

const getSchemaForGame = (queryObject) => {
    // *'''appid''' REQUIRED
    // ** The AppID of the game you want stats of

    // ==== Result layout ====

    // * '''game'''
    // ** '''gameName(string)'''
    // ** '''gameVersion (int) '''
    // ** '''availableGameStats'''
    // *** '''achievements(array)'''
    // **** '''name'''
    // **** '''defaultvalue'''
    // **** '''displayName'''
    // **** '''hidden'''
    // **** '''description'''
    // **** '''icon'''
    // **** '''icongray'''
    // *** '''stats(array)'''
    // **** '''name'''
    // **** '''defaultvalue'''
    // **** '''displayName'''
}

const getPlayerBans = (queryObject) => {
    // *'''steamids''' REQUIRED
    // ** Comma-delimited list (or array) of SteamIDs

    // ==== Result layout ====

    // * '''players''' List of player ban objects for each 64 bit ID requested
    // ** '''SteamId (string)''' The player's 64 bit ID.
    // ** '''CommunityBanned (bool) ''' Indicates whether or not the player is banned from [http://steamcommunity.com Steam Community].
    // ** '''VACBanned (bool)'''  Indicates whether or not the player has VAC bans on record.
    // ** '''NumberOfVACBans (int)'''  Number of VAC bans on record.
    // ** '''DaysSinceLastBan (int)'''  Number of days since the last ban.
    // ** '''NumberOfGameBans (int)'''  Number of bans in games, this includes CS:GO Overwatch bans.
    // ** '''EconomyBan (string)''' The player's ban status in the economy. If the player has no bans on record the string will be "none", if the player is on probation it will say "probation", etc.
}

export default SteamAPI