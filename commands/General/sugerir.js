const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

  message.channel.send(`Enviei o processo de sugestões no seu privado, ${message.author}.`)

  message.author.send(`${message.author}, qual é a sua sugestão ?`).then(async (msg_suges) => {
  
  let collector = msg_suges.channel.createMessageCollector(m => m.author.id === message.author.id, {max: 1})

  collector.on('collect', async (coletado) => {

  message.author.send(`${message.author}, sua sugestão foi enviada com sucesso. Se for aceita, você será respondido.`)

  let embed = new Discord.MessageEmbed()

    .setAuthor(`🔎 **|** Sugestões`, "https://cdn.discordapp.com/emojis/770851436749258772.gif?v=1")
    .addField("🗣 Membro", message.author, true)
    .addField("📋 Sugestão", coletado, true)
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 4096 }))
    .setColor(config.cor)

    let canal = client.channels.cache.get(config.sugesid).send(embed).then(async msg => {

      msg.react("👍🏻")
      msg.react("👎🏻")

      })
    })
  })
}

exports.help = {
    name: "sugerir",
    aliases: ["sugestao"]
}