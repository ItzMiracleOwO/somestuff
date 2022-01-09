const Command = require("../../base/Command.js")
const { Util, MessageEmbed, Permissions } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
const prettyMilliseconds = require("pretty-ms");
const sPlayer = require("../../helpers/player")
class clearqueue extends Command {
    constructor (client) {1
        super(client, {
            name: "clearqueue",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ 'cq'  ],
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

    
		player.queue.clear();

		const emojieject = this.client.customEmojis.music.remove;

		let thing = new MessageEmbed()
			.setColor("RANDOM")
			.setTimestamp()
			.setDescription(`${emojieject} Removed all songs from the queue`)
			  return message.reply({embeds: [thing]});
		
    }
}
module.exports = clearqueue