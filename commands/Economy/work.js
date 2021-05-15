const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports.run = async (client, message, args) => {

    let user = message.author;
    
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)

    let timeout = 600000;
    
    if (author !== null && timeout - (Date.now() - author) > 0) {
        
        let time = ms(timeout - (Date.now() - author));
    
        let timeEmbed = new Discord.MessageEmbed()

        .setTitle(`${config.botname} - Trabalho`)
        .setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
        🚫 **|** Você já trabalhou recentemente!\n\nTente novamente em **${time.minutes} minutos e ${time.seconds} segundos.**`)
        .setColor(config.cor)

        message.channel.send(`${user}`, timeEmbed);
    
    } else {

        let replies = ['Programador', 'Traficante', 'Construtor', 'Agricultor', 'Garçom', 'Mecanico', 'Cozinheiro', 'Vendedor', 'Barqueiro', 'YouTuber', 'Padeiro']
  
        let result = Math.floor((Math.random() * replies.length));

        let amount = Math.floor(Math.random() * 5000) + 1;

        let embed1 = new Discord.MessageEmbed()

        .setTitle(`🔨 **|** Trabalho`)
        .setDescription(`${user.username} trabalhou como **${replies[result]}** e ganhou:\n\n<a:money:769396599989469205> **${amount} coins.**`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
        .setColor(config.cor)

        message.channel.send(`${user}`, embed1);
        
        db.add(`money_${message.guild.id}_${user.id}`, amount);
        db.set(`work_${message.guild.id}_${user.id}`, Date.now());
    }
}

exports.help = {
    name: "work",
    aliases: ["trabalhar"]
}