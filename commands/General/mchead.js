const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

  	const player = args[0]
  	const mchead = new Discord.MessageEmbed()

  		.setTitle(`Aqui está a cabeça de ${player}!`)
  		.setURL(`https://mc-heads.net/head/${player}/500`)
  		.setImage(`https://mc-heads.net/head/${player}/140`)
  		.setColor(config.cor)
    
  	message.channel.send(mchead)
  	
}

exports.help = {
    name: "mchead",
    aliases: ["head"]
}