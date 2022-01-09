const Command = require("../../base/Command.js")
const { MessageEmbed } = require("discord.js");

class skipto extends Command {
    constructor (client) {1
        super(client, {
            name: "skipto",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "jump"],
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


        const position = Number(args[0]);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`Usage: ${message.client.prefix}skipto <Number of song in queue>`)
            return message.reply({embeds: [thing]});
		}

        player.queue.remove(0, position - 1);
        player.stop();
		
		const emojijump = this.client.customEmojis.music.jump;

		let thing = new MessageEmbed()
			.setDescription(`${emojijump} Forward **${position}** Songs`)
			.setColor(client.embedColor)
			.setTimestamp()
			
		return message.reply({embeds: [thing]});

    }
}
module.exports = skipto