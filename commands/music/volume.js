const Command = require("../../base/Command.js")
const { Util, MessageEmbed, Permissions } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
const prettyMilliseconds = require("pretty-ms");
const sPlayer = require("../../helpers/player")
class StopCommand extends Command {
    constructor (client) {1
        super(client, {
            name: "volume",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ 'vol' , "v" ],
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
		
		const volumeEmoji = this.client.customEmojis.music.volumehigh;

		if (!args.length) {
			let thing = new MessageEmbed()
			.setColor(client.embedColor)
			.setTimestamp()
			.setDescription(`${volumeEmoji} The current volume is: **${player.volume}%**`)
			return message.reply({embeds: [thing]});
		}

		const volume = Number(args[0]);
		
		if (!volume || volume < 0 || volume > 100) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`Usage: ${prefix}volume <Number of volume between 0 - 100>`)
            return message.reply({embeds: [thing]});
		}

		player.setVolume(volume);

		if (volume > player.volume) {
			var emojivolume = client.emoji.volumehigh;
			let thing = new MessageEmbed()
				.setColor("RANDOM")
				.setTimestamp()
				.setDescription(`${emojivolume} Volume set to: **${volume}%**`)
		  return message.reply({embeds: [thing]});
		} else if (volume < player.volume) {
			var emojivolume = message.client.emoji.volumelow;
			let thing = new MessageEmbed()
				.setColor("RANDOM")
				.setTimestamp()
				.setDescription(`${emojivolume} Volume set to: **${volume}%**`)
		  return message.reply({embeds: [thing]});
		} else {
			let thing = new MessageEmbed()
				.setColor("RANDOM")
				.setTimestamp()
				.setDescription(`${volumeEmoji} Volume set to: **${volume}%**`)
			return message.reply({embeds: [thing]});
		}
		
    }
}
module.exports = StopCommand