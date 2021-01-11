const Discord = require('discord.js')

exports.run = async(client , message , args) => {
    let target = message.mentions.members.first()
if(!message.member.hasPermission('BAN_MEMBERS') || !message.member.hasPermission('ADMINISTRATOR')){
    message.channel.send('Bu yetkiye sahip değilsin!')
}else if (!target) {
    message.channel.send('Kimi banlayacaksın?')
}else {
    target.ban()
    let embed = new Discord.MessageEmbed()
    .setDescription(`${target}' sunucudan başarıyla yasaklandı.`)
    .setFooter(message.guild.name , message.guild.iconURL({dynamic : true}))
    .setTimestamp()
    message.channel.send(embed)
}
}
exports.conf = {
    aliases : ["yasakla"],
    permLevel : 2
}
exports.help = {
    name : "ban"
}