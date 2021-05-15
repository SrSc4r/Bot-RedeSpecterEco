const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

  const ajuda = new Discord.MessageEmbed()

  .setTitle(`<:specter:779074906901184542> | Lista de Comandos`)
  .setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
  <a:746860452784504852:769409221455904828> - **Comandos de Moderação**
  <a:money:769396599989469205> - **Comandos de Economia**
  <a:spotify:769399227439775764> - **Comandos de Música**
  <a:mine:769396525331382283> - **EM BREVE**
  <a:atualiza_animado:772087585135919124> - **EM BREVE**
  <a:sorteio:769394147764338698> - **Comandos de Diversão**`)
  .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
  .setColor(config.cor)

  message.channel.send(ajuda).then(msg => {

    msg.react('◀').then(r => {
    msg.react('📚').then(r => {
    msg.react('💵').then(r => {
    msg.react('🎵').then(r => {
    msg.react('😂').then(r => {

  })
  })
  })
  })
  })

  const inicioFilter = (reaction, user) => reaction.emoji.name === '◀' && user.id === message.author.id;
  const modFilter = (reaction, user) => reaction.emoji.name === '📚' && user.id === message.author.id;
  const ecoFilter = (reaction, user) => reaction.emoji.name === '💵' && user.id === message.author.id;
  const musicFilter = (reaction, user) => reaction.emoji.name === '🎵' && user.id === message.author.id;
  const divFilter = (reaction, user) => reaction.emoji.name === '😂' && user.id === message.author.id;

  const inicio = msg.createReactionCollector(inicioFilter);
  const mod = msg.createReactionCollector(modFilter);
  const eco = msg.createReactionCollector(ecoFilter);
  const music = msg.createReactionCollector(musicFilter);
  const div = msg.createReactionCollector(divFilter);

  const embedajuda = new Discord.MessageEmbed()

  .setTitle(`<:specter:779074906901184542> | Lista de Comandos`)
  .setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
  <a:746860452784504852:769409221455904828> - **Comandos de Moderação**
  <a:money:769396599989469205> - **Comandos de Economia**
  <a:spotify:769399227439775764> - **Comandos de Música**
  <a:mine:769396525331382283> - **EM BREVE**
  <a:atualiza_animado:772087585135919124> - **EM BREVE**
  <a:sorteio:769394147764338698> - **Comandos de Diversão**`)
  .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
  .setColor(config.cor)

  const embedmod = new Discord.MessageEmbed()

  .setTitle(`<a:746860452784504852:769409221455904828> | Comandos de Moderação`)
  .setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
  **/ban** - Bane um usuário mencionado.
  **/kick** - Expulsa o usuário do discord.
  **/mute** - Silencia o usuário.`)
  .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
  .setColor(config.cor)

  const embedeco = new Discord.MessageEmbed()

  .setTitle(`<a:money:769396599989469205> | Comandos de Economia`)
  .setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
  **/money** - Mostra a quantidade de money.
  **/work** - Trabalhe para ganhar mais money.
  **/rank** - Mostra o rank monetário do grupo.
  **/pay** - Envia uma quantia de dinheiro.
  **/xp** - Mostra a quantia de XP e Nivel.
  **/rob** - Roube money de alguma pessoa.
  **/dep** - Deposite o dinheiro e evite ser roubado.
  **/daily** - Pegue sua recompensa diária.
  **/with** - Realize um saque do banco.`)
  .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
  .setColor(config.cor)

  const embedmusic = new Discord.MessageEmbed()

  .setTitle(`<a:spotify:769399227439775764> | Comandos de Música`)
  .setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
  **/tocar** - Toque uma música.
  **/volume** - Altere o volume da música.
  **/tocando** - Mostra a música que está tocando.`)
  .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
  .setColor(config.cor)

  const embeddiv = new Discord.MessageEmbed()

  .setTitle(`<a:sorteio:769394147764338698> | Comandos de Diversão`)
  .setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
  **/avatar** - Mostra o avatar de um jogador.
  **/perfil** - Mostra as informações de um jogador.
  **/beijar** - Ain... o amor é tão lindo... 💕`)
  .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))
  .setColor(config.cor)

  inicio.on('collect', r2 => {
    r2.users.remove(message.author.id)
    msg.edit(embedajuda)
  })

  mod.on('collect', r2 => {
    r2.users.remove(message.author.id)
    msg.edit(embedmod)
  })

  eco.on('collect', r2 => {
    r2.users.remove(message.author.id)
    msg.edit(embedeco)
  })

  music.on('collect', r2 => {
    r2.users.remove(message.author.id)
    msg.edit(embedmusic)
  })

  div.on('collect', r2 => {
    r2.users.remove(message.author.id)
    msg.edit(embeddiv)
  })

  })
}

exports.help = {
  name: "ajuda",
  aliases: ["help"]
}