

module.exports = {

    // bot system essentials
    "token": "NzY2NzQzMjQ4NzM0OTEyNTUz.X4nzSw.K76EueDhRKka9mnXGUNgHZXKvv8",
    "embedColor": "#47ffbf",
    "prefix": "+",
    
    //commands 
    "searchCMD": "search",
    "lookupCMD": "lookup",
    "playtimeCMD": "playtime",
    "modlogsCMD": "modlogs",
    "aboutCMD": "about",
    "helpCMD": "help",
    "setupCMD": "setup",
    




    // whitelist system
    "enableWhitelistedChannels": "Yes", // If you want anyone to be able to use the commands in any channel, set to 'No'

    "whitelisted_bypass_roles": [ // these roles can bypass a non-whitelisted channel
        "801425370854981645", // you can use // owner for example to label your roles :)
        "nextrole"
    ],
    "whitelisted_channels": [ // If enableWhitelistedChannels is set to 'yes' then these will be the list of channels that commands can work without being
    // on the list of bypass roles
        "802660204621594725",
        "channel2id"
        
    ],
    

    

// everything below is optional and is not needed for the core functions of the bot
// it is simply a status bot merged into this bot for convenience


    "enableLiveStatus": "Yes", // 'Yes' for enable, 'No' to disable
    //fivem server details (only needed if live status is enabled)
    // discord server details  (only needed if live status is enabled)
    "guildID": "747117497060163666", // id of the discord server 
    "channelID": "802568339842007070", // id of the channel for the status
    "messageID": "802671491753312267", // use the setup command to get this
    "serverName": "Grav's Flight Server", // name for the title of the embed
    "refreshTime": "15", // the amount of seconds it takes the bot to refresh the status. Recommended: 15 minimum
}