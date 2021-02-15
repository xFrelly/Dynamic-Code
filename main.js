const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json')
var AsciiTable = require('ascii-table')
const PREFİX = ayarlar.prefix;

client.on('ready', () => {
  console.log('Bot şu anda aktif!')
  let mesajlar = [
    "!yardım",
    "The Dark Gate RP"
  ]
  let statü = [
    "idle",
    "dnd",
    "online"
  ]
  setInterval(function() {
  let randomstatü = statü[Math.floor(Math.random() * statü.length)] 

  client.user.setStatus(randomstatü)
  },3000)
  setInterval(function(){
    let randommesaj = mesajlar[Math.floor(Math.random() * mesajlar.length)] 
    client.user.setActivity(randommesaj)
  },3000)
});//Bu kodda ise hareketli durum ve statü nasıl yapılır kısaca gösteriliyor. idle(boşta),dnd(rahatsız etmeyin),online(çevrimiçi)

const fs = require('fs')
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()

fs.readdirSync('./commands').forEach(dir => {
  const commandFiles = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'))
  for (const file of commandFiles){
    const komutlar = require(`./commands/${dir}/${file}`)
    const table = new AsciiTable('Dynamic Code') //Buraya konsol logda gözükecek komutların hangi botta olacağını yazıyoruz. Kısaca botunuzun ismi.

    table
    .setHeading("Komut" , "Status" , "Aliases")

    if(komutlar.help.name){
      client.commands.set(komutlar.help.name , komutlar)
      table.addRow(komutlar.help.name , "✔️" , komutlar.conf.aliases)
    }else {
      table.addRow(komutlar.help.name , "❌")
      continue;
    }
    komutlar.conf.aliases.forEach(alias => {
      client.aliases.set(alias ,komutlar.help.name)
    });
    console.log(table.toString())
  }
})//Burası command handler. Commands(komutlar) dosyasını çalıştırmak için gereken komutlar. 

client.on('message' , message => {
  let client = message.client;
  if(message.author.bot) return;
  if(!message.content.startsWith(PREFİX)) return;
  let command = message.content.split(' ')[0].slice(PREFİX.length)
  let params = message.content.split(' ').slice(1)
  let perms = client.elevation(message)
  let cmd;
  if(client.commands.has(command)) {
    cmd = client.commands.get(command)
  }else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command))
  }
  if(cmd){
    if(perms < cmd.conf.permLevel)return;
    cmd.run(client , message , params , perms)
  }
})//Burası ise commands dosyasında tanımlamak yerine burda tanımlayıp orada da tanımlı olmasın sağlayan kodumuz. Değiştirmemeniz tavsiye edilir

client.elevation = message => {
  if(!message.guild) return;
  let permlvl = 0;
  if(message.member.hasPermission('MANAGE_ROLES')) permlvl = 1;
  if(message.member.hasPermission('BAN_MEMBERS')) permlvl = 2;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if(message.member.hasPermission('MANAGE_NICKNAMES')) permlvl = 4;
  if(message.member.hasPermission("MANAGE_GUILD")) permlvl = 5;
  if(message.author.id === ayarlar.authorid) permlvl = 6
}//Burada ise permission(izinler) yer alıyor.

client.on('guildMemberAdd', async (member) => {
  if(db.has(`${member.guild.id}_otorol`)) {
    var role = db.fetch(`${member.guild.id}_otorol`)
    member.addRole(role)
  } else {
    return;
  }
  if(db.has(`${member.guild.id}_otokanal`)) {
    var kanal = client.channels.get(db.fetch(`${member.guild.id}_otokanal`))
    const embed = new Discord.MessageEmbed()
    .setDescription(`Yeni katılan ${member} kullanıcısına <@&${role}> rolü verildi`)
    .setTimestamp()
    kanal.send(embed)
  } else {
    return;
  }
})
client.login(ayarlar.token);
