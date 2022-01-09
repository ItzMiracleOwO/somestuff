const Command = require("../../base/Command.js")
class LeaveCommand extends Command {
    constructor (client) {1
        super(client, {
            name: "leave",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ 'dc'  ],
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

        player.destroy();
        
        let thing = new MessageEmbed()
            .setColor("RANDOM")
            .setDescription(`*Leave the voice channel**\nThank you for using ${this.client.user.username}!`)
          return message.reply({embeds: [thing]});
    }
}
module.exports = LeaveCommand