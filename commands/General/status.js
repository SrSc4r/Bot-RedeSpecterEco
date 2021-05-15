const Discord = require('discord.js');
const config = require('../../config.json');
const superagent = require('snekfetch');
const fs = require('fs');

module.exports.run = async (client, message, args) => {

    superagent.get(`https://api.mcsrvstat.us/2/${config.ip}`).end((err, response) => {

        let online1 = '<:on1:769409215646662657>'
        let offline1 = '<:off:769409216192446465>'

            let status = response.body.online ? online1 : offline1

            let online = response.body.players.online
            let maximo = response.body.players.max
            
            const lewdembed = new Discord.MessageEmbed()

            .setAuthor(`${config.botname} - Status`, "https://cdn.discordapp.com/emojis/770851436749258772.gif?v=1")
            .setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
            Atualmente o servidor se encontra com **${online}/${maximo}** jogadores jogando em toda rede.

            <:Offline:769395537828773899> **Status do Servidor:** ${status}

            <:kangaroo1:737128328565227520> **IP:** \`${config.ip}\``)
            .setColor(config.cor)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))

            message.channel.send(lewdembed)

        }).catch(O_o => {

            const embed = new Discord.MessageEmbed()

            .setAuthor(`${config.botname} - Status`, "https://cdn.discordapp.com/emojis/770851436749258772.gif?v=1")
            .setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
            Atualmente o servidor se encontra com **0/0** jogadores jogando em toda rede.

            <:Offline:769395537828773899> **Status do Servidor:** <:Cinza:781696931390554154>

            <:kangaroo1:737128328565227520> **IP:** \`${config.ip}\``)
            .setColor(config.cor)
            .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 4096 }))

        message.channel.send(embed)
    })
}

exports.help = {
    name: "status",
    aliases: ["ip"]
}