const Discord = require('discord.js');
const moment = require('moment');
const config = require('../../config.json');
moment.locale('pt-BR');

module.exports.run = async (client, message, args) => {

  let online = message.guild.members.cache.filter(a => a.presence.status == "online").size;
  let ocupado = message.guild.members.cache.filter(a => a.presence.status == "dnd").size;
  let ausente = message.guild.members.cache.filter(a => a.presence.status == "idle").size;
  let offline = message.guild.members.cache.filter(a => a.presence.status == "offline").size;

  let totalmembros = message.guild.memberCount;
  let canaistexto = message.guild.channels.cache.filter(a => a.type === "text").size;
  let canaisvoz = message.guild.channels.cache.filter(a => a.type === "voice").size;

  const embed = new Discord.MessageEmbed()

  .setTitle(message.guild.name)
  .setDescription(` 󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
    👑 **|** Dono: ${message.guild.owner.user.tag}
    📍 **|** ID: ${message.guild.id}
    😄 **|** Emojis: (${message.guild.emojis.cache.size})
    📃 **|** Cargos: (${message.guild.roles.cache.size})

    📑 **|** Canais: (${canaistexto+canaisvoz})
    🔊 **|** Voz: ${canaisvoz}
    💬 **|** Texto: ${canaistexto}

    🕒 **|** Criado em: ${moment(message.guild.createdAt).format('LLL')}
    🌎 **|** Região: ${message.guild.region.charAt(0).toUpperCase() + message.guild.region.slice(1)}
    👥 **|** Membros: (${totalmembros})

    :green_square: **|** Online: (${online})
    :yellow_square: **|** Ausente: (${ausente})
    :red_square: **|** Ocupado: (${ocupado})
    :black_large_square: **|** Offline: ${offline}`)
  .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
  .setColor(config.cor)

  message.channel.send(`${message.author}`)
  message.channel.send(embed)

}

exports.help = {
    name: "serverinfo",
    aliases: ["info"]
}