const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_ROLES'))
    message.channel.send('Bu komutu kullanmak için yetkin yok.')
    else{
    let sustur = message.guild.roles.cache.get('')||message.guild.roles.cache.find(r => r.name === "Mute" || "mute")//boşluğa id yi yazın.
    let yetki = message.guild.roles.cache.get('')//Yetkiliye veriyorsa yetkisini alın boşluğa id yi yazın
    const member = message.mentions.members.first();

    member.roles.add(sustur)
    member.roles.remove(yetki)
    message.react('✅')
    await message.delete();
    }
}

exports.conf = {
    aliases: ["sustur"],
    permLevel : 5
}
exports.help = {
    name : "mute"
}