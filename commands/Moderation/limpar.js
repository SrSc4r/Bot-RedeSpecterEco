const Discord = require('discord.js');
const config = require('../../config.json');

module.exports.run = async (client, message, args) => {

  if(!message.member) return
  
  if(!message.member.hasPermission('MANAGE_CHANNELS'))
  return message.channel.send(`${message.author}, você não possui permissão para executar esse comando!`).then(msg => msg.delete(6000));

  var limit = 501
  if (args.length === 1) {
  limit = parseInt(args[0])
  } else {
    
    if(!args[0]) return message.channel.send(`Ops! o formato desse comando é **${config.prefix}limpar** \`<quantidade>\`.`)
      
    return message.reply(comousar)
  }
      if (!Number.isInteger(limit)) return message.reply(`Talvez isso possa ajudá-lo: \`\`\`${process.env.PREFIX}${module.exports.help.usage}\`\`\``)
      limit++
      limit = Math.min(limit, 501)
  
      message.channel.bulkDelete(limit)
        .then(messages => {
          message.channel.send(`${message.author}, foram apagadas __**${messages.size}**__ mensagens.`).then(message => setTimeout(() => message.delete(), 2000))
  })
}

exports.help = {
    name: "limpar",
    aliases: ["clear", "cc"]
}