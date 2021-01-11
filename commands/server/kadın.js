const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_NICKNAMES'))
    message.channel.send('Bu komutu kullanmak için yetkin yok.')
    else{
    let kadın = message.guild.roles.cache.find(role=> role.name == 'Kadın') || message.guild.roles.cache.get('id')//Buraya rol idsini yazın.
    const member = message.mentions.members.first();

    member.roles.add(kadın)
    message.react('✅')
    await message.delete();
    
    }
    
}

exports.conf = {
    aliases: ["kadınkayit" , "kız" , "girl" , "lady"],
    permLevel : 4
}
exports.help = {
    name : "kadın"
}