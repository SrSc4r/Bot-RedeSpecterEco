const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    let user = client.users.cache.get(args-[0]) || message.mentions.users.first() ||  message.author;

    let money = db.fetch(`money_${message.guild.id}_${user.id}`)
    if(money === null) money = 0;

    let bank = db.fetch(`bank_${message.guild.id}_${user.id}`);
    if(bank == null) bank = 0;

    const embed = new Discord.MessageEmbed()

    .setTitle(`:coin: **|** Carteira`)
    .setThumbnail("https://images-ext-1.discordapp.net/external/Y47qX6QpMUt_AaUj9AtuqkuuGO1HvAKdol_N0kFhMGc/https/images-ext-1.discordapp.net/external/kzOqBZHTySSMCx1LqysrCYUGR3jmHz6X5z5s9YDJpzI/https/cdn2.iconfinder.com/data/icons/large-shop-icons/512/Dollar_coin_money_cash_investment.png")
    .setDescription(` 󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
    👤 Usuário: **${user.username}**
    💵 Money: **R$${money}**
    🏛 Banco: **R$${bank}**`)
    .setColor(config.cor)

    message.channel.send(`${user}`, embed);
    
}

exports.help = {
    name: "money",
    aliases: ["coins", "carteira"]
}