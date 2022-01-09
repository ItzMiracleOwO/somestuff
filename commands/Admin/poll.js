const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Poll extends Command {

	constructor (client) {
		super(client, {
			name: "poll",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [],
			memberPermissions: [ "MENTION_EVERYONE" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
        
		const question = args.join(" ");
		if(!question){
			return message.error("Administration/poll:MISSING_QUESTION").then(msg => {msg.delete(5000)})
		}

		message.delete().catch(() => {});

		let mention = "";
            
		const msg = await message.sendT("Administration/announcement:MENTION_PROMPT");

		const collector = new Discord.MessageCollector(message.channel, (m) => m.author.id === message.author.id, { time: 240000 });
            
		collector.on("collect", async (tmsg) => {
    
			if(tmsg.content.toLowerCase() === message.translate("common:NO").toLowerCase()){
				tmsg.delete();
				msg.delete();
				collector.stop(true);
			}
            
			if(tmsg.content.toLowerCase() === message.translate("common:YES").toLowerCase()){
				tmsg.delete();
				msg.delete();
				const tmsg1 = await message.sendT("Administration/announcement:MENTION_TYPE_PROMPT");
				const c = new Discord.MessageCollector(message.channel, (m) => m.author.id === message.author.id, { time: 60000 });
				c.on("collect", (m) => {
					if(m.content.toLowerCase() === "here"){
						mention = "@here";
						tmsg1.delete();
						m.delete();
						collector.stop(true);
						c.stop(true);
					} else if(m.content.toLowerCase() === "every"){
						mention = "@everyone";
						tmsg1.delete();
						m.delete();
						collector.stop(true);
						c.stop(true);
					}
				});
				c.on("end", (collected, reason) => {
					if(reason === "time"){
						return message.error("misc:TIMES_UP");
					}
				});
			}
		});
    
		collector.on("end", (collected, reason) => {
    
			if(reason === "time"){
				return message.error("misc:TIMES_UP");
			}
    

			const success = this.client.customEmojis.success.split(":")[1];
			const error = this.client.customEmojis.error.split(":")[1];

			const success1 = Discord.Util.parseEmoji(this.client.customEmojis.success).id;
			const error2 = Discord.Util.parseEmoji(this.client.customEmojis.error).id;

			const embed = new Discord.MessageEmbed()
				.setAuthor(message.translate("Administration/poll:TITLE"))
				.setColor(data.config.embed.color)
				.addField(question, message.translate("Administration/poll:REACT", {
					success: "<a:succes200:764873698838446121>",
					error: "<a:error404:764873699627106325>"
				}))
	    .setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL());

			message.channel.send(mention, embed).then(async (m) => {
				await m.react(success1)
				await m.react(error2);
			});
		});

	}

}

module.exports = Poll;