const Discord = require('discord.js');
const client = new Discord.Client();
const isaret = require('./isaret.json');

var prefix = isaret.prefix


client.on('ready', () => {
  console.log(`Basarıyla sunucuya girdi. ${client.user.tag}!`);
});


//sunucudan girislerde mesaj gelmesi
client.on('guildMemberAdd', member => {
  const genel = member.guild.channels.cache.find(channel => channel.name === 'genel');
  genel.send(`Avengersa Hoş Geldin, ${member}`);
  member.send(`${member} Avengers sunucusuna Hoş Geldin.`);
});

client.on('guildMemberRemove', member => {
  const genel = member.guild.channels.cache.find(channel => channel.name === 'genel');
  genel.send(`Avengers bir yoldaş kaybetti, ${member}`);
});

//sunucuya giriş yapıldığında rol atar.
client.on('guildMemberAdd', member => {
  let role = member.guild.roles.cache.find(role => role.name === 'Hawkeye')
  member.roles.add(role);
});
//sunucuda rol verir.
client.on("message", message => {
  if(message.content.startsWith(prefix + 'rolver')) {
  if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapamazsın')
  let role = message.mentions.roles.first();
  let member = message.mentions.member.first();
  member.roles.add(role)
  }
});


// metin işlemleri
client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'ping') {
    msg.reply('Pong!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === prefix + 'hedviga') {
    msg.reply('Ölü bedeni tam 42 yıl sonra bulundu.');
  }
});

//kick ve ban alanı
client.on('message', message => {
  if (!message.guild) return;
  if (message.content.startsWith('!kick')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapamazsın')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick()
          .then(() => {
          const kick = message.guild.channels.cache.find(channel => channel.name === 'genel');
           kick.send(`${user.tag} kişisi kicklenmiştir`);
          })
          .catch(err => {
            message.reply('Bunu yapamam.');
            console.error(err);
          });
      } else {
        message.reply("Bahsettiğin kişi bizim sunucuda bulunmuyor");
      }
    } else {
      message.reply("Atılacak kişiyi yazmadın");
    }
  }
});

//ban

client.on('message', message => {
  if (!message.guild) return;
if (message.content.startsWith('!ban')) {
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Bunu yapamazsın')
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .ban()
          .then(() => {
          const ban = message.guild.channels.cache.find(channel => channel.name === 'genel')
           ban.send(`${user.tag} kişisi banlanmıştır.`);
          })
          .catch(err => {
            message.reply('Bunu yapamam.');
            console.error(err);
          });
      } else {
        message.reply("Bahsettiğin kişi bizim sunucuda bulunmuyor");
      }
    } else {
      message.reply("Yasaklanacak kişiyi yazmadın.");
    }
  }
});

//oylama
client.on('message', message => {
  if(message.content.startsWith(prefix + 'oylama')){
    const args = message.content.split(' ').slice(1)
    const botmesajı = args.join(" ")

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Oylama yapmak için Thor olman gerek.');
    if(!botmesajı) return message.reply('Oylamanın ne olacağını yazmadın');

    const embed = new MessageEmbed()
    .setTitle('oylama')
    .setDescription(botmesajı)
    .setFooter('Jarvis')
    message.channel.send({embed: embed }).then( embedMessage => {
      embedMessage.react("✅")
      embedMessage.react("❌");
    })
  }
});

//duyuru
client.on('message',message =>{
  if(message.content.startsWith(prefix + 'duyuru')){
    const kanal = message.mentions.channels.first();
    const args = message.content.split(' ').slice(2)
    const botmesajı = args.join(" ")

    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Duyuru yapmak için Thor olman gerek.');
    if(!botmesajı) return message.reply('Duyurunun ne olacağını yazmadınız.');
    if(!kanal) return message.reply('Kanalı tanımlamadınız.');
    kanal.send(botmesajı);
    message.delete(message.author)
  }
});



client.login('token')
