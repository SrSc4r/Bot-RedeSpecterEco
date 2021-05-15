const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author; 
    let avatar = user.avatarURL({ dynamic: true, format: 'png', size: 1024 });
        
    let embed = new Discord.MessageEmbed()

        .setAuthor(`Avatar de ${user.username}`, "https://cdn.discordapp.com/emojis/770851436749258772.gif?v=1")
        .setImage(avatar)
        .setColor(config.cor)
       
    message.channel.send(`${user}`, embed)
}

exports.help = {
    name: "avatar",
    aliases: ["foto"]
}