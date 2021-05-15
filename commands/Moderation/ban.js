const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

        var membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if(!membro) return message.reply('Ops! o formato desse comando é \`<usuário>\` \`<motivo do banimento>\`.');
        if(membro === message.member) return message.reply('Você não pode se banir o-0');

        var motivo = args.slice(1).join(" ");
        if(!motivo) return message.reply('Ops! o formato desse comando é \`<usuário>\` \`<motivo do banimento>\`.');
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply('🙄 Cara, só ADM pode banir alguém.');

        const ban = new Discord.MessageEmbed()
        
        .setDescription(`Você dejesa banir esse usuário: **${membro.user.username}** ?`)
        .setColor(config.cor)

        message.channel.send(ban).then(msg => {

            msg.react('✅')

            let filtro = (reaction, usuario) => reaction.emoji.name === '✅' && usuario.id === message.author.id;
            let coletor = msg.createReactionCollector(filtro, {max: 1})

            ban.setAuthor(`Punição`, membro.user.displayAvatarURL({ dynamic: true, size: 4096 }))
            ban.setDescription(`${membro} foi banido!`)
            ban.addField("Motivo", motivo)
            ban.addField("Duração", "Permanentemente", true)
            ban.addField("Aplicado por", message.author, true)


            coletor.on("collect", cp => {
                cp.remove(message.author.id);
                message.channel.bulkDelete(2)
                client.channels.cache.get(config.logsmod).send(ban)
                membro.ban();
        })    
    })
}

exports.help = {
    name: "ban",
    aliases: ["banir"]
}