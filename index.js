const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.client({disableEveryone: true})

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online`);
});

bot.login(botconfig.token);
