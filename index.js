/*
--------------------------------------
------Created By Grav------
--https://github.com/Gravxd--
--------------------------------------

Message from Grav:

Hey everyone,

Welcome to TxAdmin Bot for Discord. (Version: 1.0.0)

This bot was made because I noticed that a lot of server owners have been requesting Tabarra (Creator of TxAdmin)
for additions like an APi usable with Discord Bots.

I realised that after some testing, I was able to use a discord bot to output most of the important tx information
like punishments & user stats.

If you have any issues at all with the bot (AFTER FOLLOWING THE INSTRUCTIONS PROPERLY), you can join my discord for support! 
https://discord.gg/ZYHxxba

If you like this bot, please consider leaving a star on https://github.com/Gravxd/TxAdmin-Bot
If you are a developer, feel free to push suggestions, additions or changes as I'm nowhere near an expert at this.

Thank you for reading!
Grav

*/




const { Client, RichEmbed } = require("discord.js");

const Discord = require("discord.js");

const config = require('./config.js');

const client = new Client({
  disableEveryone: true // set to false if you want the bot to be able to ping @ everyone
});

const prefix = config.prefix; // Prefix for all commands

client.on("ready", () => {
  console.log(`Bot launched successfully. Logged in as: ${client.user.tag}`);
});





//console.log(txDataFile.players) // returns all fields

/*let timestamp = 1611175240
var myDate = new Date( timestamp*1000);
console.log(myDate.toGMTString())
*/

function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600*24));
  var h = Math.floor(seconds % (3600*24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
  }
//console.log(secondsToDhms(minute))


// the red barrier sign emoji

const noEmoji = ':no_entry_sign:';
const wrenchEmoji = ':wrench:';

// commands
const searchCMD = prefix + config.searchCMD;
const setupCMD = prefix + config.setupCMD;

const ptCMD = prefix + config.playtimeCMD;
const lookupCMD = prefix + config.lookupCMD;

// currently not in use
const logsCMD = prefix + config.modlogsCMD;

// misc
const aboutCMD = prefix + config.aboutCMD;
const helpCMD = prefix + config.helpCMD;


// may be used later

const commandsCMD = `${prefix}commands`;
const cmdsCMD = `${prefix}cmds`;

// channel controls

const whitelistedChannels = config.whitelisted_channels;

// server (live status requirements)

const serverIP = config.serverIP;
const serverPort = config.serverPort;



// ignore the format, its just easier to read & change for people :)
let bot_commands = [];
bot_commands.push(`${ptCMD}: Search a user's total playtime`, `${lookupCMD}: Lookup identifiers to find user info`, 
`${aboutCMD}: View the bot info`,
`${searchCMD}: Search a user via discord mention`,
`${helpCMD}: Open the support manual`)



client.on('message', message => {
  const txDataFile = require("../Server/txData/default/data/playersDB.json"); // This should be the directory of playersDB.json

  if(message.guild) {
    if(config.enableWhitelistedChannels === 'Yes') {

    let whitelistedUserRoles = [];
    let whitelistedChannelConfirm = [];
    let whitelistedChannelList = [];

    whitelistedChannels.forEach(channel => {
      if(message.channel.id === channel) {
        whitelistedChannelList.push(channel)
      }
    })
    config.whitelisted_bypass_roles.forEach(role => {
      message.member.roles.forEach(member_role => {

        if(member_role.id === role) {
          whitelistedUserRoles.push(role)
        }

      })
      
    }) 
    if(!whitelistedChannelList.length) {

      if(!whitelistedUserRoles.length) {
        return;
      }

    }
    
  }
  }
  if(message.content.toLowerCase().startsWith(aboutCMD)) {

    // uptime
    let uptime_days = Math.floor(client.uptime / 86400000);
    let uptime_hours = Math.floor(client.uptime / 3600000) % 24;
    let uptime_minutes = Math.floor(client.uptime / 60000) % 60;
    let uptime_seconds = Math.floor(client.uptime / 1000) % 60;

    // getting the amount of warns + bans

    let tx_ban_amount = [];
    let tx_warn_amount = []; // Build ourselves some empty arrays for later use

    txDataFile.actions.forEach(action => {
      if(action.type === 'warn') {
        tx_warn_amount.push(action) // We are only pushing the action object, as we don't need specific information from the array, just the object itself
      }
      if(action.type === 'ban') {
        tx_ban_amount.push(action)
      }
    })
    // For each action in the database, we are pushing any actions that match our target type into our arrays. Im pushing any bans into tx_ban_amount and warns into tx_warn_amount

    if(!tx_warn_amount.length) {
      tx_warns = '0';
    } else {
      tx_warns = tx_warn_amount.length;
    }
    // if there is warns that have been pushed through, we know there is 0 warns in the database, so we default the output value to 0
    // same for the bans below
    if(!tx_ban_amount.length) {
      tx_bans = '0';
    } else {
      tx_bans = tx_ban_amount.length;
    }


    const about_embed = new RichEmbed()
    .setColor(config.embedColor)
    .setTitle(`**__TxAdmin Bot__**`)
    .addField(`**Developer**`, `[Grav](https://github.com/Gravxd)`)
    .addField(`**Support Server**`, `[Join Here](https://discord.gg/ZYHxxba)`)
    .addField(`**Invite**`, `[Download Me (FiveMods)](https://fivemods.net/user/Grav)`)
    .addField(`**Uptime**`, `${uptime_days}d ${uptime_hours}h ${uptime_minutes}m ${uptime_seconds}s`)
    .addField(`**Server Punishments**`, `\`${tx_bans}\` Bans & \`${tx_warns}\` Warns`)
    message.channel.send(about_embed)

  } 
  else if(message.content.toLowerCase().startsWith(helpCMD)) {

    const help_embed = new RichEmbed()
    .setColor(config.embedColor)
    .setTitle(`**__Support Manual__**`)
    .setDescription(`\`\`\`${bot_commands.join('\n')}\`\`\``)

    message.channel.send(help_embed)
  }
  else if(message.content.toLowerCase().startsWith(ptCMD)) {
    if(message.author.bot || !message.guild) return;
    const args = message.content.substring(ptCMD.length).split(" ");

    const input = args.slice(1).join(" ");
    /*if(!input) {
      const no_input = new RichEmbed()
      .setColor(config.embedColor)
      .setDescription(`${noEmoji} **| Please provide a valid search!**`)
      return message.channel.send(no_input)
    }*/
    if(message.content.toLowerCase() === ptCMD) {

      const usage_playtime = new RichEmbed()
      .setColor(config.embedColor)
      .setDescription(`${wrenchEmoji} **| Usage:** \`${ptCMD} [name]\``)
      return message.channel.send(usage_playtime)

    }

    const filtered = txDataFile.players.filter(e => e.name.toLowerCase().includes(input.toLowerCase()));

    if(filtered.length > 0) {
      let ab = '';
      for(var n in filtered) {

        let unix_timestamp = filtered[n].tsLastConnection;
          var date = new Date(unix_timestamp * 1000);
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          const actionDate2 = date.toDateString()
          let actionDate3 = (actionDate2 + ' | ' + formattedTime);
        ab += `\n\n**${parseInt(n) + 1})** **Name:** ${filtered[n].name} | **FiveM ID:** ${filtered[n].license.substring(0,4)}... | **Playtime:** ${secondsToDhms(filtered[n].playTime*60)} | **Last Connected:** ${actionDate3}`
      }

      if(ab.length > 2048) {
        const exceeding_size = new RichEmbed()
        .setColor(config.embedColor)
        .setDescription(`${noEmoji} | Your query returned too many results.. Try searching for a more specific username!`);
        return message.channel.send(exceeding_size)
      }

      const result_embed = new RichEmbed()
      .setColor(config.embedColor)
      .setDescription(`Your query returned \`${filtered.length}\` users!\n${ab}`)
      message.channel.send(result_embed)

    } else {
    
      const no_results_embed = new RichEmbed()
      .setColor(config.embedColor)
      .setDescription(`${noEmoji} **| Your query returned no results!**`);
      return message.channel.send(no_results_embed)
    }
  }

  else if(message.content.toLowerCase().startsWith(lookupCMD)) {
    const args = message.content.substring(lookupCMD.length).split(" ");
    const type = args[1];
    const input = args.slice(2).join(" ");


    if(message.content.toLowerCase() === `${prefix}lookup`) {

      const usage_embed = new RichEmbed()
      .setColor(config.embedColor)
      .setDescription(`${wrenchEmoji} **| Usage:** \`${lookupCMD} [type] [input]\`\n\n**Examples:**\n \`${lookupCMD} id steam:11000011bad90ed\`\n\`${lookupCMD} name Grav\`\n\n**Supported Types:**\n\`id (steam, license, discord)\`\n\`name\`\n\nBy searching with the \`name\` type, you need to be case sensitive & it will output identifiers.\n\nUsing the \`id\` type will result in an output of the user's punishments.`)
      return message.channel.send(usage_embed)

    }

    if(type === 'name') {

      if(!input) {
        const no_input = new RichEmbed()
        .setColor(config.embedColor)
        .setDescription(`${noEmoji} **| Please provide a valid name to search!**`)
        return message.channel.send(no_input)
      } else {
    const filtered = txDataFile.actions.filter(e => e.playerName === input);

    if(filtered.length > 0) {
      let ab = '';
      for(var n in filtered) {
        let connectionValue = [];
        ab += `\n\n**${parseInt(n) + 1})** **Name:** ${filtered[n].playerName} \`${filtered[n].identifiers}\``
      }

      if(ab.length > 2048) {
        const exceeding_size = new RichEmbed()
        .setColor(config.embedColor)
        .setDescription(`${noEmoji} | Your query returned too many results.. Try searching for a more specific username!`);
        return message.channel.send(exceeding_size)
      }

      const result_embed = new RichEmbed()
      .setColor(config.embedColor)
      .setDescription(`Your query returned \`${filtered.length}\` users!\n${ab}`)
      message.channel.send(result_embed)

    } else {

      const no_results_embed = new RichEmbed()
      .setColor(config.embedColor)
      .setDescription(`${noEmoji} **| Your query returned no results!**`);
      return message.channel.send(no_results_embed)
    }
      } // if name is provided as the lookup type
    } else if(type === 'id') {

      if(!input) {

        const no_input = new RichEmbed()
        .setColor(config.embedColor)
        .setDescription(`${noEmoji} **| Please provide a valid id to search!**\n\`Usage: ${lookupCMD} id discord:516341620967473165\``)
        return message.channel.send(no_input)

      } else { // if someone provides some input

        if(
          !input.toLowerCase().startsWith('steam:') && 
          !input.toLowerCase().startsWith('license:') && 
          !input.toLowerCase().startsWith('discord:')
        ) {
          
          const invalid_input = new RichEmbed()
          .setColor(config.embedColor)
          .setDescription(`${noEmoji} **| You did not provide a valid \`id\` in the form of license, discord or steam!**`)
          return message.channel.send(invalid_input)

        } else { 

            if(input.toLowerCase().startsWith('steam:')) {

              let userIDs = [];
              txDataFile.actions.forEach(action => {

                if(action.identifiers.includes(input)) {


                  let actionTS = new Date( action.timestamp*1000);
                  let actionDate = actionTS.toGMTString(actionTS)
                  userIDs.push(`[${action.type}] Reason: ${action.reason} | Moderator: ${action.author} | ${actionDate}`)


                }
              })


              if(!userIDs.length) {
                const no_results_user = new RichEmbed()
                .setColor(config.embedColor)
                .setDescription(`${noEmoji} **| Your query returned no results!**`)
                return message.channel.send(no_results_user)
              }
              const embed = new RichEmbed()
              .setColor(config.embedColor)
              .setDescription(`**Results**\n${userIDs.join('\n')}`)
              message.channel.send(embed)
              
            } else if(input.toLowerCase().startsWith('discord:')) {

            } else {
              
            }
        }
      }
    }
  } // lookup cmd end
  else if(message.content.toLowerCase().startsWith(searchCMD)) { // this is a lookup command only to be used via +discord @user // Not mentioning a user will not work
    
    if(message.content.toLowerCase() === searchCMD) {

      const usage_search = new RichEmbed()
      .setColor(config.embedColor)
      .setDescription(`${wrenchEmoji} **| Usage:** \`${searchCMD} @user\``)
      return message.channel.send(usage_search)

    }
    
    if(message.mentions.members.size === 1) {


      const lookupMember = message.mentions.members.first();


      if(!lookupMember) {
        const error_embed = new RichEmbed()
        .setColor(config.embedColor)
        .setDescription(`${noEmoji} **| There was an error.. Please try again!**`)
        return message.channel.send(error_embed)
      }


      const test = txDataFile.actions.filter(e => e.identifiers.includes(`discord:${lookupMember.id}`))


      if(!test.length) {
        const no_result = new RichEmbed()
        .setColor(config.embedColor)
        .setDescription(`${noEmoji} **| This user has no results!**`);
        return message.channel.send(no_result)
      }


      const filtered = test[0].identifiers.filter(e => e.includes('license:'));
      
      const filtered_players = txDataFile.players.filter(e => e.license);
      //console.log(filtered_players)
      let finalUserInfo2 = [];

      let finalUserInfo = [];





      filtered_players.forEach(fp => {

        let newID = String(filtered).slice(8);

        if(fp.license === newID) {

          let unix_timestamp = 1597609131
          var date = new Date(unix_timestamp * 1000);
          var hours = date.getHours();
          var minutes = "0" + date.getMinutes();
          var seconds = "0" + date.getSeconds();
          var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
          const actionDate2 = date.toDateString()
          let actionDate3 = (actionDate2 + ' | ' + formattedTime);

          //console.log(actionDate)

          finalUserInfo.push(`**Playtime:** ${secondsToDhms(fp.playTime*60)}\n**First Login:** ${actionDate2}`)

        }
      })


      if(!finalUserInfo.length) {
        return message.reply(`error!`)
      }


      
      const identifiersFilter = txDataFile.actions.filter(function(i, n) {
        if(i.identifiers.includes(String(filtered))) {
          return i.identifiers;
        }
      })



      let steamID = [];
      let licenseID = [];

      test[0].identifiers.forEach(i => {
        if(i.startsWith('steam:')) {
          steamID.push(i.slice(6))
        }
        if(i.startsWith('license:')) {
          licenseID.push(i.slice(8))
        }
      })


      if(!steamID.length) {
        steamID = 'Not Found!';
      }

      if(!licenseID.length) {
        licenseID = 'Not Found!';
      }



      let playerBans = [];


      let playerWarns = [];

      const banFilter = txDataFile.actions.filter(function(i , n) {
        if(i.identifiers.includes(String(filtered))) {


          let reason;

          if(i.type === 'ban') {


            let actionTS = new Date( i.timestamp*1000);
            let actionDate = actionTS.toGMTString(actionTS)



            if(i.reason.length > 10) {
              reason = i.reason.substring(0, 10) + '..';
            } else {
              reason = i.reason;
            }


            playerBans.push(`[ban] Reason: ${reason} | Moderator: ${i.author} | ${actionDate}`)


          }
        }
      })


      const warnFilter = txDataFile.actions.filter(function(i , n) {
        if(i.identifiers.includes(String(filtered))) {



          let reason;
          if(i.type === 'warn') {


            let actionTS = new Date( i.timestamp*1000);
            let actionDate = actionTS.toGMTString(actionTS)


            if(i.reason.length > 10) {
              reason = i.reason.substring(0, 10) + '..'; // we dont want to exceed discord embed character limits so we slice our reasoning
            } else {
              reason = i.reason;
            }

            playerWarns.push(`[warn] Reason: ${reason} | Moderator: ${i.author} | ${actionDate}`)
          }

        }
      })

      let playerBanList;

      let playerWarnList;

      let banAmount;

      let warnAmount;


      if(playerBans.length) {
        playerBanList = playerBans.join('\n')
        banAmount = playerBans.length;
      } else { 
        playerBanList = 'None to display';
        banAmount = '0';
      }


      if(playerWarns.length) {
        playerWarnList = playerWarns.join('\n')
        warnAmount = playerWarns.length;
      } else {
        playerWarnList = 'None to display';
        warnAmouint = '0';
      }

      


      const embed = new RichEmbed()
      .setColor(config.embedColor)
      .setDescription(`${finalUserInfo[0]}\n\n**__Identifiers__**\n**Hex ID:** \`${steamID}\`\n**License:** \`${licenseID}\`\n\n**__History__**\n**Bans** - \`${banAmount}\`\n${playerBanList}\n**Warns** - \`${warnAmount}\`\n${playerWarnList}`)
      message.channel.send(embed)
    
    } else {

      const invalid_input = new RichEmbed()
      .setColor(config.embedColor)
      .setDescription(`${noEmoji} **| Please mention a user after using \`${searchCMD}\`!`)
      return message.channel.send(invalid_input)
      
    }
  }
  else if(message.content.toLowerCase() === setupCMD) {
    message.channel.send(`Setting up...`).then(msg => {
      
      const status_setup = new RichEmbed()
        .setColor(config.embedColor)
        .addField(`**Server ID:**`, msg.guild.id)
        .addField(`**Channel ID:**`, msg.channel.id)
        .addField(`**Message ID:**`, msg.id)
        msg.edit(status_setup)

    })
  }
})






client.on('ready', () => {

  const statusMode = config.enableLiveStatus;

  if(statusMode === 'Yes') {

    const messageID = config.messageID;

    const serverID = config.guildID;

    const channelID = config.channelID;

    const mainServer = client.guilds.get(serverID)

    if(!mainServer) {
      console.log(`You have enabled live status but have not provided a valid guild id!`)
      client.destroy();
    }
    
    const statusChannel = mainServer.channels.get(channelID)
    
    if(!statusChannel) {
      console.log(`You have enabled live status but have not provided a valid channel id!`)
      client.destroy();
    }

    const fetch = require('node-fetch');

    const serverIP = config.serverIP;
    
    const serverPort = config.serverPort;
    

    setInterval(async() => {
      const playerFile = await fetch('http://161.97.120.243:30120/players.json')
      
      const newPlayerFile = await playerFile.json()

      let serverPlayers = [];

      newPlayerFile.forEach(player => {
        serverPlayers.push(`[${player.id}] ${player.name}`)
      })

      let playerAmount;

      if(serverPlayers.length) {
        playerAmount = serverPlayers.length;
      } else {
        playerAmount = '0';
      }

      let serverName;

      if(config.serverName) {
        serverName = config.serverName;
      } else {
        serverName = 'None Set!';
      }

      let playerList;

      if(serverPlayers.length) {
        playerList = serverPlayers.join(', ')
      } else {
        playerList = 'None Online!';
      }

      const status_embed = new RichEmbed()
      .setColor(config.embedColor)
      .setTitle(`**__` + serverName + `__**`)
      .setDescription(`\`${playerList}\``)
      .setFooter(`TxAdmin Bot - A project by Grav`);

      statusChannel.fetchMessage(messageID).then(messageToEdit => {

        messageToEdit.edit(status_embed).catch(err => {

          if(err) {
            console.log(err)
          }

        })

      })


    }, config.refreshTime*1000);

  } else {
    return;
  }

})


client.login(config.token)
