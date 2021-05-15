const Discord = require("discord.js");
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

        var membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!membro) return message.reply('Ops! o formato desse comando é \`<usuário>\` \`<motivo da expulsão>\`.');
        if(membro === message.member) return message.reply('Você não pode se banir o-0');

        var motivo = args.slice(1).join(" ");
        if(!motivo) return message.reply('Ops! o formato desse comando é \`<usuário>\` \`<motivo da expulsão>\`.');
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply('você é fraco, vc não consegue expulsar ninguém. chame algum adulto para ajuda-lo.');

        const kick = new Discord.MessageEmbed()

        .setColor(config.cor)
        .setDescription(`Você dejesa expulsar esse usuário: **${membro.user.username}** ?`)

        message.channel.send(kick).then(msg => {

            msg.react('✅')

            let filtro = (reaction, usuario) => reaction.emoji.name === '✅' && usuario.id === message.author.id;
            let coletor = msg.createReactionCollector(filtro, {max: 1})

            kick.setAuthor(`Punição`, membro.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            kick.setDescription(`${membro.user.username} foi expulso!`)
            kick.addField("Motivo", motivo)
            kick.addField("Duração", "Indefinido", true)
            kick.addField("Aplicado por", message.author, true)

            coletor.on("collect", cp => {
                cp.remove(message.author.id);
                client.channels.cache.get(config.logsmod).send(kick)
                membro.kick(); 
        })      
    })
}

exports.help = {
    name: "kick",
    aliases: ["expulsar"]
}