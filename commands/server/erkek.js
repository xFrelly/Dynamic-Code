const Discord = require('discord.js');
module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission('MANAGE_NICKNAMES'))
    message.channel.send('Bu komutu kullanmak için yetkin yok.')
    else{
    let erkek = message.guild.roles.cache.find(role => role.name == 'Erkek') || message.guild.roles.cache.get('id')//Buraya rol idsini yazın.
    const member = message.mentions.members.first();

    member.roles.add(erkek)
    message.react('✅')
    await message.delete();
    
    }
    
}

module.exports.conf = {
    aliases: ["erkekkayit" , "boy" , "gentleman"],
    permLevel : 4
}

exports.help = {
    name : "erkek"
}