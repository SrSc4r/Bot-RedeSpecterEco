const superagent = require("snekfetch");
const Discord = require('discord.js');
const config = require('../../config.json');

exports.run = async (client, message, args) => {
    
    superagent.get('https://coronavirus-19-api.herokuapp.com/countries/brazil').end((err, response) => {

        let confirmados = response.body.cases;
        let regiao = response.body.country;
        let hoje = response.body.todayCases;
        let mortes = response.body.deaths;
        let morteshoje = response.body.todayDeaths;
        let recuperados = response.body.recovered;
        let ativos =  response.body.active;
        let grave = response.body.critical;
        
        const corona = new Discord.MessageEmbed()

        .setTitle(`${config.botname} - Coronavírus`)
        .setColor(config.cor)
        .setDescription(`**Levem as mãos queridos! e se cuidem**.`)
        .addField('Estatística no Brasil:', `**Confirmados**: ${confirmados}\n **Hoje**: ${hoje}\n **Morte**s: ${mortes}\n **Mortes Hoje**: ${morteshoje}\n **Recuperados**: ${recuperados}\n **Ativos**: ${ativos}\n **Grave**: ${grave}`)

     message.channel.send(corona)
   })
}

exports.help = {
    name: "corona",
    aliases: ["covid"]
}