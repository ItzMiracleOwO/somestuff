const Command = require("../../base/Command.js")
const { Util, MessageEmbed, Permissions } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
const prettyMilliseconds = require("pretty-ms");
const sPlayer = require("../../helpers/player")
class StopCommand extends Command {
    constructor (client) {1
        super(client, {
            name: "stop",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ 'stop'  ],
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

        const autoplay = player.get("autoplay")
        if (autoplay === true) {
            player.set("autoplay", false);
        }

        player.stop();
        player.queue.clear();

    

		    let thing = new MessageEmbed()
            .setColor("RANDOM")
            .setTimestamp()
            .setDescription(`Stopped the music`)
        message.reply({embeds: [thing]});
      }
    }
    

    
module.exports = StopCommand;