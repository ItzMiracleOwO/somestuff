const Command = require("../../base/Command.js"),
	Discord = require("discord.js");

class Announcement extends Command {

	constructor (client) {
		super(client, {
			name: "announcement",
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
        
		const text = args.join(" ");
		if(!text){
			return message.error("Administration/announcement:MISSING_TEXT");
		}
		if(text.length > 1030){
			return message.error("Administration/announcement:TOO_LONG");
		}

		message.delete().catch(() => {});

		let mention = "";
		let metions = false
            
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
						metions = true
						collector.stop(true);
						c.stop(true);
					} else if(m.content.toLowerCase() === "every"){
						mention = "@everyone";
						tmsg1.delete();
						metions = true
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
			const dateTime = Date.now();
			const timestamp = Math.floor(dateTime / 1000);

			const embed = new Discord.MessageEmbed()
				.setAuthor(message.translate("Administration/announcement:TITLE"))
				.setColor(data.config.embed.color)
				.setTimestamp()
				.addField("👑" + message.translate("Administration/announcement:Poster"), message.author.tag)
				.addField("🕒" + message.translate("Administration/announcement:Post_Time") , `<t:` +  timestamp + `>`)
				.setDescription("💬" +message.translate("Administration/announcement:Post_Info") + "\n" + text)
	    .setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL());
				if(metions) return message.channel.send({content : mention , embeds : [embed]})
				else message.channel.send({embeds : [embed]});
		});

	}

}

module.exports = Announcement;
