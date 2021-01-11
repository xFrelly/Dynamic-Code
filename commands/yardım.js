const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {

        const komutlarembed = new Discord.MessageEmbed()
  
          .setAuthor(message.client.user.username , message.client.user.displayAvatarURL({dynamic : true}))
          .setDescription('İşte Komutlarım :')
          .addFields({
            name : 'Moderatör',
            value : '`!yasakla , !tükür , !uyarı ekle <kişi> <sebep> , !temizle , !duyuru <metin> , !isim <kişi> <yenisim>`', //mod komutlarınızı yazın
            inline: true
          },
          {
            name : 'Kayıt',
            value : '`!kadın , !erkek`', //kayıt komutlarınızı yazın
            inline : true
          },
          {
            name : 'Ceza',
            value : '`!uyarılmış , !eğitimsiz , !hapis , !mute , !unmute`', //ceza komutlarınızı yazın
            inline : true
          },
          )
          .setFooter(message.guild.name , message.guild.iconURL({dynamic : true}))
          .setTimestamp()
        message.channel.send(komutlarembed);
}

exports.conf = {
  aliases: ["help" , "komutlar"],
  permLevel : 0
}
exports.help = {
  name : "yardım"
}