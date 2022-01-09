const Command = require("../../base/Command.js")
const { MessageEmbed } = require("discord.js");

class skip extends Command {
    constructor (client) {1
        super(client, {
            name: "skip",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: ["s" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
			player : true,
            sameVoiceChannel: true,
            inVoiceChannel: true,
            CheckPermChannel : true,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

		const player = this.client.manager.get(message.guild.id);
    const song = player.queue.current;

           player.stop();
           
		const emojiskip = this.client.customEmojis.music.skip;

		let thing = new MessageEmbed()
			.setDescription(`${emojiskip} **Skipped**\n[${song.title}](${song.uri})`)
			.setColor("RANDOM")
			.setTimestamp()
		return message.reply({embeds: [thing]}).then(msg => { setTimeout(() => {msg.delete()}, 3000);
       })
    }
}
module.exports = skip