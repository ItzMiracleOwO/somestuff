const Command = require("../../base/Command.js")
class loopCoomand extends Command {
    constructor (client) {1
        super(client, {
            name: "loop",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ 'repeat'  ],
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


		  const emojiloop = this.client.customEmojis.music.loop;

        if (args.length && /queue/i.test(args[0])) {
            player.setQueueRepeat(!player.queueRepeat);
            const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
			let thing = new MessageEmbed()
				.setColor("RANDOM")
				.setTimestamp()
				.setDescription(`${emojiloop} Loop queue is now **${queueRepeat}**`)
		   return message.reply({embeds: [thing]});
        }

        player.setTrackRepeat(!player.trackRepeat);
        const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
		let thing = new MessageEmbed()
        .setColor("RANDOM")
			.setTimestamp()
			.setDescription(`${emojiloop} Loop track is now **${trackRepeat}**`)
		    return message.reply({embeds: [thing]});
    }
}
module.exports = loopCoomand