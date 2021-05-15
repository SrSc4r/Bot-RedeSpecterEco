const Discord = require("discord.js");
const moment = require("moment");
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {
  
  const inline = true
  const botAvatar = client.user.displayAvatarURL()
  const date = client.user.createdAt
  const userName = client.user.username
  const servsize = client.guilds.cache.size
  const usersize = client.users.cache.size

  const embed = new Discord.MessageEmbed()

    .setAuthor("Informações do Bot", "https://cdn.discordapp.com/emojis/770851436749258772.gif?v=1")
    .addField('🤖 **Nome**', userName)
    .addField('⚙️ **ID**', client.user.id)
    .addField('🔧 **Desenvolvedor**', '```ㅤㅤlukedluz#0001ㅤㅤ```')
    .addField('🔑 **Prefix:**', '```ㅤㅤ/ㅤㅤ```')
    .addField('📭 **Servidores**', `ㅤ🛡 ${servsize}`, true)
    .addField('👥 **Usuários**', `ㅤ👥 ${usersize}`, inline)
    .setColor(config.cor)
    .setThumbnail(botAvatar)
  
    message.channel.send(embed)
}

exports.help = {
  name: "botinfo",
  aliases: ["btinfo"]
}