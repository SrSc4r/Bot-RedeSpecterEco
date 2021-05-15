const Discord = require("discord.js");
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

    let avatar = message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 });

    let embed = new Discord.MessageEmbed()

    .setAuthor(`${config.botname}`, client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setThumbnail(avatar)
    .setDescription(`Calculando...`)
    .addField(`<a:CorretoGif:780968018758729748> ⇝ Ajuda`, `Use \`/ajuda\` para saber mais comandos!`)
    .setColor(config.cor)
    
    let embed2 = new Discord.MessageEmbed()

    .setAuthor(`${config.botname}`, client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setThumbnail(avatar)
    .setDescription(`Espero que não esteja alto 😬!`)
    .addField(`<a:CorretoGif:780968018758729748> ⇝ Ajuda`, `Use \`/ajuda\` para saber mais comandos!`)
    .setColor(config.cor)

    let embed_ping = new Discord.MessageEmbed()

    .setAuthor(`${config.botname}`, client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setThumbnail(avatar)
    .addField(`<a:Config:780967793616224326> ⇝ Ping`, `\`${parseInt(client.ws.ping)}\` ms.\n`)
    .addField(`<a:CorretoGif:780968018758729748> ⇝ Ajuda`, `Use \`/ajuda\` para saber mais comandos!`)
    .setColor(config.cor)

    const msg = await message.channel.send(embed)
    setTimeout(() => {
    	msg.edit(embed2)
    }, 3000) // 1000ms = 1s
    setTimeout(() => {
    	msg.edit(embed_ping)
    }, 5000)
}

exports.help = {
    name: "ping",
    aliases: ["latencia"]
}