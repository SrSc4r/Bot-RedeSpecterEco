const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');
const ms = require('parse-ms');

module.exports.run = async (client, message, args) => {
    
    let user = message.author;
    let timeout = 86400000;
    let daily = await db.fetch(`daily_${message.guild.id}_${user.id}`);
    let amount = Math.floor(Math.random() * 10000) + 1000;

    let money = db.fetch(`money_${message.guild.id}_${user.id}`)
    if(money === null) money = 0;
    
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
        let time = ms(timeout - (Date.now() - daily));
  
        let timeEmbed = new Discord.MessageEmbed()

        .setTitle(`${config.botname} - Diario`)
        .setThumbnail("https://images-ext-1.discordapp.net/external/kzOqBZHTySSMCx1LqysrCYUGR3jmHz6X5z5s9YDJpzI/https/cdn2.iconfinder.com/data/icons/large-shop-icons/512/Dollar_coin_money_cash_investment.png")
        .setColor(config.cor)
        .setDescription(` 󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪\nVocê terá que aguardar **${time.hours} horas e ${time.minutes} minutos ${time.seconds} segundos** para usar coletar seus coins novamente.\n 󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪`)

        message.channel.send(`${user}`, timeEmbed);

    } else {

        let moneyEmbed = new Discord.MessageEmbed()

        .setTitle(`:dollar: **|** Recompensa Diaria`)
        .setThumbnail("https://images-ext-1.discordapp.net/external/kzOqBZHTySSMCx1LqysrCYUGR3jmHz6X5z5s9YDJpzI/https/cdn2.iconfinder.com/data/icons/large-shop-icons/512/Dollar_coin_money_cash_investment.png")
        .setColor(config.cor)
        .setDescription(` 󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪\nOlá ${message.author} você acaba de ganhar **${amount} coins**. Acumulando assim **${amount+money} coins** em sua conta!\n 󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪`)

        message.channel.send(`${user}`, moneyEmbed);
        db.add(`money_${message.guild.id}_${user.id}`, amount);
        db.set(`daily_${message.guild.id}_${user.id}`, Date.now());

    }
}

exports.help = {
    name: "daily",
    aliases: ["diario", "recompensa"]
}