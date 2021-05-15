const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');
const fs = require('fs');
const bdd = require('./connections/bdd.json');
const TicektsId = new Array();

//CARREGA OS COMANDOS
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
    if(err) console.error(err);
    files.forEach((f, i) => {
        let folder = f.split('.');
        if(folder[1]) return;
        fs.readdir(`./commands/${f}/`, (err, jsf) => {
            let jsfiles = jsf.filter(f => f.split(".").pop() === "js");
            if(jsfiles.length <= 0 ) {
                return;
            }
        jsfiles.forEach((j, k) => {
                let props = require(`./commands/${f}/${j}`);
                client.commands.set(props.help.name, props);
                if(!props.help || !props.help.aliases || props.help.aliases[0] == '') return;
                props.help.aliases.forEach(alias => {
                    client.aliases.set(alias, props.help.name);
         
                })
            });
        })
    })
});



client.on("message", async message => {
    let msg =  message.content.toLowerCase();
    if (message.content.startsWith(`<@${client.user.id}>`)){
      message.channel.send(` :robot: Olá! Eu sou o *${client.user.username}* e estou aqui para te ajudar! :robot:\nPara começar, o meu prefixo é / e com o comando /ajuda tu consegue ver todos os comandos disponíveis! `)
    }
    
      if (message.content.startsWith("Qual o IP?")){
      message.channel.send(`Olá, <@${client.user.id}> o servidor pode ser acessado pelos seguintes IPs: jogar.redespecter.com  ou  redespecter.com`)
    }

    if (message.author.bot) return undefined;      
    let user = message.author; 
  
          
    if (message.content.indexOf(client.prefix) !== 0) return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        let commands = require(`./commands/${command}.js`);
      
        commands.run(client, message, args);
    } catch (e){
        console.log(e);
    } finally{}
});


client.on("message", async (message, user) => {
    if (message.author.bot || message.channel.type === "dm") return;
    if (!message.guild) return;
    if (!message.channel.send) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if (!message.content.startsWith(config.prefix)) return;

    let commandfile = client.commands.get(cmd.slice(config.prefix.length)) || client.commands.get(client.aliases.get(cmd.slice(config.prefix.length)));
    if (commandfile) commandfile.run(client, message, args);
    if (!commandfile) return;
});

client.on("ready", message => {
    console.log(`[BOT] Aplicação iniciada com sucesso!`)
    client.user.setActivity(config.status, {
        type: "PLAYING",
        url: "https://forum.redespecter.com"
    })
});

client.on("guildMemberAdd", async member => {
    client.channels.get("784841953106985171").send(`😄 **${member.user.username}** entrou no servidor!`);
  });

  client.on("guildMemberRemove", async member => {
    client.channels.get("784841955497607189").send(`__${member.user.username}__ saiu do servidor. 😢`);
  });

//client.on("guildMemberAdd", member => {
//    const welcomeEmbed = new Discord.MessageEmbed()
//    
//    .setColor(config.cor)
//    .setAuthor(`Bem-vindo(a) ${member.user.tag} !`, member.user.displayAvatarURL({ dynamic: true, size: 4096 }))
//    .setDescription(`Seja bem-vindo à **${config.botname}**, aqui você pode se comunicar com os nossos jogadores e ficar a par de todas as nossas novidades!`)
//    .addField("IP:", `\`${config.ip}\``, true)
//    .addField("Loja:", `[Clique aqui!](https://${config.loja})`, true)
//    .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 4096 }));
//    
//    client.channels.cache.get('784841953106985171').send(welcomeEmbed)
//    client.guilds.get("569684605121200153").channels.get("787329245075734528").setName( 'Membros: '+ client.users.size);
//});

//SISTEMA DE CAPTCHA
client.on('raw', async dados => {

    if(dados.t !== "MESSAGE_REACTION_ADD") return
    if(dados.d.message_id != config.msgid) return

    let servidor = client.guilds.cache.get(config.guildid)
    let membro = servidor.members.cache.get(dados.d.user_id)

    let cargo = servidor.roles.cache.get(config.roleid)
  
    if(dados.t === "MESSAGE_REACTION_ADD") {

    if(dados.d.emoji.name === "✅") {
        if(membro.roles.cache.has(cargo)) return
            membro.roles.add(cargo)

        servidor.channels.cache.get(config.channelcaptcha).messages.fetch(dados.d.message_id).then(message => {
        message.reactions.cache.find(r => r.emoji.name === "✅").users.remove(dados.d.user_id)
            
            })
        }
    }
});



//SISTEMA DE TICKET
client.on('message', async (message) => {

    let args = message.content.trim().split(/ +/g)

    if(message.content.startsWith(config.prefix + "close")) {
        if(TicektsId.includes(message.channel.id)) {
            CloseTicket(message)
        }
    }

    if(message.content.startsWith(config.prefix + "ticket")) {

        const embeds = new Discord.MessageEmbed()

            .setDescription('`Carregando sistema de tickets, em andamento!`')
            .setFooter(config.botname, client.user.avatarURL())
            .setTimestamp()
            .setColor(config.cor)

            message.channel.send(embeds)

        setTimeout(() => {

            const embed = new Discord.MessageEmbed()

            .setDescription('`Sistema de tickets carregado, envio de mensagem em andamento!`')
            .setFooter(config.botname, client.user.avatarURL())
            .setTimestamp()
            .setColor(config.cor)

            message.channel.send(embed)

            setTimeout(() => {

                const hour = new Date().getHours()
                const min = new Date().getMinutes()

                const embed = new Discord.MessageEmbed()

                .setTitle(config.PanelName)
                .setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪
                > Clique no emoji abaixo para ser redirecionado a criação de seu ticket.
                󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪`)
                .setColor(config.cor)
                .setFooter(config.botname +' - (v1.0.0) - '+hour+':'+min, client.user.avatarURL())

                client.channels.cache.get(config.channelid).send(embed).then(function (message) {

                    message.react(config.ReactEmoji)
                })

                const embede = new Discord.MessageEmbed()

                .setDescription('`Mensagem enviada com sucesso!`')
                .setColor(config.cor)
                .setFooter(config.botname, client.user.avatarURL());

                message.channel.send(embede)
            }, 5000)
        }, 6000)
    }
});

client.on('messageReactionAdd', async (reaction, user) => {

    const members = reaction.message.guild.members.cache.get(user.id)

    if(members.user.bot) return;

    if(reaction.message.channel.id === config.channelid) {
        if(reaction.emoji.name === config.ReactEmoji) {
            bdd.NumberTicket++;
            if(bdd.NumberTicket >= 10) {
                bdd.NumbersTicket = "00"
            } else if(bdd.NumberTicket >= 100) {
                bdd.NumbersTicket = "0"
            } else if(bdd.NumberTicket >= 1000) {
                bdd.NumberTicket = " "
            }

            reaction.remove().then(function (message) {
                message.message.react(config.ReactEmoji)
            })

            reaction.message.guild.channels.create('ticket-' + bdd.NumbersTicket+bdd.NumberTicket, {

                type: "text",
                permissionOverwrites: [
                {
                    allow: 'VIEW_CHANNEL',
                    deny: 'ADD_REACTIONS',
                    id: user.id
                },
                {
                    deny: 'VIEW_CHANNEL',
                    id: reaction.message.guild.id   
                },
                {
                    allow: 'VIEW_CHANNEL',
                    deny: 'ADD_REACTIONS',
                    id: config.StaffID
                }]

            }).then(msg => {

                const embed = new Discord.MessageEmbed()

                .setDescription(config.TicketDesc)
                .setFooter(config.botname, client.user.avatarURL())
                .setTimestamp()
                .setColor(config.cor)

                msg.send("Olá " + user.toString() + ".")
                msg.send(embed).then(function (message) {
                    message.react("🔒")
                })

                TicektsId.push(msg.id)
            })
        }
    }

    if(TicektsId.includes(reaction.message.channel.id)) {
        if(reaction.emoji.name === "🔒") {
            reaction.message.react("✅")
            const chooseArr = ["✅", "❎"]

            const reacted = await AwaitReact(reaction.message,user,10,chooseArr)
            const result = await getResult(reacted)

            if(reacted == "✅") {
                reaction.message.channel.send(result)
            }

            function getResult(me) {
                if(me === "✅") {

                    const embed = new Discord.MessageEmbed()

                    .setDescription('`O ticket fechará em 5 segundos`')
                    .setFooter(config.botname, client.user.avatarURL())
                    .setTimestamp()
                    .setColor(config.cor)

                    reaction.message.reactions.removeAll()
                    reaction.message.channel.setName("ticket-fechado")

                    setTimeout(() => {
                        reaction.message.channel.delete()
                    }, 5000)
                    return embed
                } else if(me === "❎") {
                    reaction.message.reactions.removeAll()
                    reaction.message.react('🔒')
                }
            }
        }
    }
});

async function AwaitReact(message, author, time, validReactions) {
    time *= 1000;
    for(const reaction of validReactions) await message.react(reaction)
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;
    return message
    .awaitReactions(filter, { max: 1, time: time }).then(collected => collected.first() && collected.first().emoji.name)
}

async function CloseTicket(message) {
    const chooseArr = ["✅", "❎"]

    const embed = new Discord.MessageEmbed()

    .setDescription('`Você quer fechar o ticket ?`')
    .setFooter(config.botname, client.user.avatarURL())
    .setTimestamp()
    .setColor(config.cor)

    const m = await message.channel.send(embed)
    const reacted = await AwaitReact(m, message.author, 10, chooseArr)
    const result = await getResult(reacted)

    message.channel.send(result)
    m.reactions.removeAll()

    function getResult(me) {
        if(me === "❎") {

            const embed = new Discord.MessageEmbed()

            .setDescription('`Ação cancelada`')
            .setFooter(config.botname, client.user.avatarURL())
            .setTimestamp()
            .setColor(config.cor)

            return embed
        } else if(me === "✅") {

            const embed = new Discord.MessageEmbed()

            .setDescription('`O ticket fechará em 5 segundos`')
            .setFooter(config.botname, client.user.avatarURL())
            .setTimestamp()
            .setColor(config.cor)

            message.channel.setName("ticket-fechado")

            setTimeout(() => {
                message.channel.delete()
            }, 5000)
            return embed
        }
    }
}

//LOGIN DO CLIENT
client.login(config.token)