const Discord = require("discord.js")

const Command = require("../../base/Command.js");

class GayCommand extends Command {

	constructor (client) {
		super(client, {
			name: "gay",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [  ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 1000
		});
	}

	async run (message , data) {
  var gayPerecent = Math.floor(Math.random() * 100)
  if(message.mentions.users.first()) {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    console.log(user)
    var embed = new Discord.MessageEmbed()
    .setColor("#7289DA")
                		.setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL());
    if(gayPerecent > 50) {
    embed.setDescription(`${user.user.tag} ${message.translate("info資料/emoji:yes")} ${gayPerecent}% gay :rainbow:`)
    } else {
    embed.setDescription(`${user.user.tag} ${message.translate("info資料/emoji:yes")} ${gayPerecent}% gay 👍`)
    }
      message.channel.send({embed});
  } else {
    var embed = new Discord.MessageEmbed()
    .setColor("#7289DA")
    		.setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL());
    if(gayPerecent > 50) {
    embed.setDescription(`${message.author.username} ${message.translate("info資料/emoji:yes")} ${gayPerecent}% gay :rainbow:`)
    .setFooter(data.config.embed.footer);
    } else {
    embed.setDescription(`${message.author.username} ${message.translate("info資料/emoji:yes")} ${gayPerecent}% gay 👍`)
    .setFooter(data.config.embed.footer);
    }
      message.channel.send({embeds : [embed]});
  }
}

}

module.exports = GayCommand;
