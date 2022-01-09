const Command = require("../../base/Command.js")
class RemoveCommand extends Command {
    constructor (client) {1
        super(client, {
            name: "remove",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ 'rm'  ],
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


    const position = (Number(args[0]) - 1);
       if (position > player.queue.size) {
        const number = (position + 1);
         let thing = new MessageEmbed()
            .setColor("RED")
            .setDescription(`No songs at number ${number}.\nTotal Songs: ${player.queue.size}`);
            return message.reply({embeds: [thing]});
        }

    const song = player.queue[position]
		player.queue.remove(position);

		const emojieject = this.client.customEmojis.music.remove;

		let thing = new MessageEmbed()
			.setColor("RANDOM")
			.setTimestamp()
			.setDescription(`${emojieject} Removed\n[${song.title}](${song.uri})`)
		  return message.reply({embeds: [thing]});
    }
}
module.exports = RemoveCommand