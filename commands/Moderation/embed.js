const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

    if(!message.member.hasPermission('MANAGE_MESSAGES'))
        return message.reply("você não possui permissão para utilizar este comando.")

   	message.channel.send(`Em qual canal você deseja anunciar ?`).then(msg => {
   		let cp = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1}).on('collect', c => {
   			canal = c.mentions.channels.first()
   		if(!canal) {
   			message.reply('mencione um canal.')
   		} else {
   			message.channel.send('Qual a mensagem desse anuncio ?').then(msg2 => {
   				let cl = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1}).on('collect', c => {
   					desc = c.content

   				message.channel.send('Qual o titulo ?').then(msg3 => {
   					let ck = message.channel.createMessageCollector(x => x.author.id === message.author.id, {max: 1}).on('collect', c => {
   						title = c.content

   					message.channel.send(`Anúncio enviado com sucesso para ${canal}`)


   					let name = (`${config.botname}`)
    				let avatar = { avatar: 'https://images-ext-2.discordapp.net/external/tkgSoactGHzGRHDuSnS2a8-hFdoaUrSx6TWOlkGDb6k/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/780806407212761129/035f4e2461abff08065c5a19245a6dd4.png'}

    				let embed = new Discord.MessageEmbed()

    					.setAuthor(`${title}`, "https://cdn.discordapp.com/emojis/770102358482616331.gif?v=1")
        			.setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
        			${desc}`)
        			.setColor(config.cor)

    				    canal.createWebhook(name, avatar).then(w => {
            		w.send(embed).then(() => w.delete())

      					})
   					})
   				})
   				})
   			})
   		}
   		})
   	})
}

exports.help = {
    name: "embed",
    aliases: ["anunciar", "aviso", "avisar", "anuncio", "web"]
}