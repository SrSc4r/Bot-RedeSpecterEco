const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR"))
    return message.channel.send(`${message.author}, você não possui permissão para executar esse comando!`)

    let comousar = new Discord.RichEmbed()
    
    	.setDescription("`Args` é um argumento necessário para a execução deste comando, revise os argumentos e tente novamente.")
    	.setColor(config.cor)

    if(!args[0]) return message.channel.send(comousar)

    const embed = new Discord.RichEmbed()
    
    	.setTitle('Enquete:')
    	.setDescription(args.join(' '))
    	.setColor(config.cor)
    	.setFooter(`Enquete criada por: ${message.author.username}`, message.author.displayAvatarURL({ dynamic: true, size: 4096 }))
    	.setTimestamp()
    
    let msg = await bot.channels.get("774093343659130890").send(embed).then(function (msg) {
    
        msg.react("👍")
        msg.react("👎")
        
        message.delete({
        timeout: 1000

    })
    })
}

exports.help = {
    name: "enquete",
    aliases: ["poll"]
}