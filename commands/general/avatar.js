const Discord = require("discord.js")
const Command = require("../../base/Command.js")

class Avatar extends Command {
	constructor (client) {
		super(client, {
			name: "avatar",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["av"],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

    async run (message, args, data) {
        let target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        var sendAvatar = (person) => {
            const embed = new Discord.MessageEmbed().setImage(person.displayAvatarURL({ dynamic: true, size: 512, format :"png" })).setColor("RANDOM").setDescription(`<@${person.id}> ${message.translate("general/avatar:The_Avatar")}`).setTitle(`${message.translate("general/avatar:Embed_Avatar")}`).setURL(person.displayAvatarURL())    .setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL());

            message.channel.send({embeds: [embed]})
        }
        if (!target) {
            if (!message.avatarURL) {
                sendAvatar(message.author)
            }
        }
        else {
            if (!message.avatarURL) {
                sendAvatar(target.user)
            }
            else {
                sendAvatar(target)
            }
        }

        }
      
}

module.exports = Avatar;
