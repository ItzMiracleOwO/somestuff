const Command = require("../../base/Command.js")
const { MessageEmbed } = require("discord.js");

class resume extends Command {
    constructor (client) {1
        super(client, {
            name: "resume",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ ],
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
    

    
            const emojiresume = this.client.customEmojis.music.resume;
    
            if (!player.paused) {
                let thing = new MessageEmbed()
                    .setColor("RED")
                    .setDescription(`${emojiresume} The player is already **resumed**.`)
                    .setTimestamp()
              return message.reply({embeds: [thing]});
            }
    
            player.pause(false);
    
            let thing = new MessageEmbed()
                .setDescription(`${emojiresume} **Resumed**\n[${song.title}](${song.uri})`)
                .setColor(client.embedColor)
                .setTimestamp()
            return message.reply({embeds: [thing]});
        
    }
}
module.exports = resume