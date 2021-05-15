const Discord = require('discord.js');
const config = require('../../config.json');
const db = require('quick.db');

module.exports.run = async (client, message, args) => {

    let bank = db.all().filter(data => data.ID.startsWith(`bank_${message.guild.id}`)).sort((a, b) => b.data - a.data);
    
    let bank1;
    
    if(bank.length > 10){
        bank1 = 10

    } else {

        bank1 = bank.length
    }
    
    let content = "";

    for (let i = 0; i < bank1; i++) {
        let user = client.users.cache.get(bank[i].ID.split('_')[2])

        content += `🏅 **${i+1}º** : ${user} - Coins: (**${bank[i].data}**)\n`
    }

    const embed = new Discord.MessageEmbed()

    .setTitle(`📚 **|** Ranking Monetário`)
    .setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
    ${content}`)
    .setThumbnail("https://images-ext-1.discordapp.net/external/Bap8tA3f5bgf_2sl4b2v2m6bt2ySz8RapGqhra862Lo/https/media.discordapp.net/attachments/519287277499973632/522607596851691524/icons8-leaderboard-100.png")
    .setColor(config.cor)

    message.channel.send(`${message.author}`, embed);

}

exports.help = {
    name: "rank",
    aliases: ["ranking", "leaderboard"]
}