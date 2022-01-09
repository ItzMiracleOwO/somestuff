const Command = require("../../base/Command.js")
const { MessageEmbed } = require("discord.js");


class nowplaying extends Command {
    constructor (client) {1
        super(client, {
            name: "nowplaying",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: ["np"],
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
        const { convertMTime , ProgressBar} = this.client.functions
        const player = this.client.manager.get(message.guild.id);

        const song = player.queue.current
        const emojimusic = this.client.customEmojis.music.music;
        var total = song.duration;
        var current = player.position;
        
        let embed = new MessageEmbed()
            .setDescription(`${emojimusic} **Now Playing**\n[${song.title}](${song.uri}) - \`[${convertMTime(song.duration)}]\`- [${song.requester}]`)
            .setThumbnail(song.displayThumbnail("3"))
            .setColor("RANDOM")
            .addField(
                "Duration",
                `${
                  this.client.functions.ProgressBar(
                    player.position,
                    player.queue.current.duration,
                    15
                  ).Bar
                } \`[${prettyMilliseconds(player.position, {
                  colonNotation: true,
                })} / ${prettyMilliseconds(player.queue.current.duration, {
                  colonNotation: true,
                })}]\``
              )
            return message.channel.send({embeds: [embed]})
	
    }
}
module.exports = nowplaying