const Discord = require("discord.js");
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

    const player = args[0]
    const mcbody = new Discord.MessageEmbed()

        .setColor(config.cor)
        .setTitle(`Aqui está a skin de ${player}!`)
        .setURL(`https://mc-heads.net/body/${player}/500`)
        .setImage(`https://mc-heads.net/body/${player}/500`)
    
    message.channel.send(mcbody)
}

exports.help = {
  name: "mcskin",
  aliases: ["skin"]
}