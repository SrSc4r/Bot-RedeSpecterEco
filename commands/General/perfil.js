const config = require('../../config.json');
const Discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-BR');

module.exports.run = async (client, message, args) => {

    let user = client.users.cache.get(args-[0]) || message.mentions.users.first() ||  message.author;

    let statusmebro;

    if(user.presence.status === "dnd") statusmebro = `<:perturbe:737361184738639913> Ocupado`;
    if(user.presence.status === "idle") statusmebro = `<:ausente:737361184516341843> Ausente`;
    if(user.presence.status === "offline") statusmebro = `<:indisponivel:737361184503627777> Offline`;
    if(user.presence.status === "online") statusmebro = `<:disponivel:737360773596184616> Online`;

    let member = message.guild.member(user);

    let money = db.fetch(`money_${message.guild.id}_${user.id}`)
    if(money === null) money = 0;

    let bank = db.fetch(`bank_${message.guild.id}_${user.id}`);
    if(bank == null) bank = 0;

    database.ref(`Servidores/${message.guild.id}/SistemaXP/Cache/${message.author.id}`).once("value").then(async function(db) {
        if(db.val() == null) {
            return message.channel.send(`${user} não está em meu **banco de dados**! Deve enviar  menssagem para ser registrado!`);
        
        } else {

            const embed = new Discord.MessageEmbed()

            .setAuthor(`<:member:769395576101404694> Informações de ${user.tag}`)
            .setDescription(`󠂪󠂪 󠂪󠂪 󠂪󠂪󠂪 󠂪󠂪 󠂪󠂪` +
            `\n<a:coroa:769396795989032981> **|** Apelido: ${member.nickname !== null ? `${member.nickname}` : '`Nenhum`'}` +
            `\n<a:746860452784504852:769409221455904828> **|** Tag: \`#${user.discriminator}\`` +
            `\n<a:atualiza_animado:772087585135919124> **|** ID: \`${user.id}\`` +
            `\n\n<:member:769395576101404694> **|** Conta criada: ${moment(user.createdAt).format('LL')}` +
            `\n<:lupa:769396728955928617> **|** Entrou aqui: ${moment(member.joinedAt).format('LL')}` +
            `\n<:idcard:769395848412659762> **|** Status: ${statusmebro}` +
            `\n\n<a:brilha:769396916013760563> **|** Nivel: ${db.val().level}` +
            `\n<:notificacao:769409217039433738> **|** XP: ${db.val().xp}` + 
            `\n<a:money:769396599989469205> **|** Money: (**R$${money}**)` +
            `\n<a:cc:772088757498413105> **|** Banco: (**R$${bank}**)` +
            `\n\n`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true, format: 'png', size: 1024 }))
            .setColor(config.cor)
            
            return message.channel.send(`${user}`, embed)
        }
    })
}

exports.help = {
    name: "perfil",
    aliases: ["profile", "about"]
}