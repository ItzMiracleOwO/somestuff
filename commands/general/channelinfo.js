const Discord = require('discord.js');
const moment = require("moment")
const Command = require("../../base/Command.js")
class Channelinfo extends Command {
    constructor (client) {
        super(client, {
            name: "channelinfo",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "ci" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name === args.join(" ")) || message.channel
        if (!channel) {
            return message.error(message.translate("general/channelinfo:Error"));
        }

        const channelTypes = {
            dm: message.translate("general/emoji:dm"),
            group: message.translate("general/channelinfo:group") ,
            text:  message.translate("general/channelinfo:text"),
            voice: message.translate("general/channelinfo:voice"),
            category: message.translate("general/channelinfo:caregory") ,
            unknown:  message.translate("general/channelinfo:unknown"),
            news :"news"
        };

        const channelEmbed = new Discord.MessageEmbed()
                .setColor(0x00AE86)
                .setThumbnail(message.guild.iconURL)
                
                .addField(`:arrow_right: ${message.translate("general/channelinfo:Name")}`, channel.type === 'dm' ? `<@${channel.recipient.username}>` : channel.name, true)
                .addField(`:arrow_right: ${message.translate("general/channelinfo:id")}`, channel.id, true)
                .addField(`:arrow_right: ${message.translate("general/channelinfo:CreatedAt")}`, channel.createdAt.toDateString(), true)
                .addField(`:arrow_right: ${message.translate("general/channelinfo:nsfw")}`, channel.nsfw ? message.translate("general/channelinfo:yes") : message.translate("general/channelinfo:no"), true)
                .addField(`:arrow_right: ${message.translate("general/channelinfo:parent")}`, channel.parent ? channel.parent.name : message.translate("general/channelinfo:no"), true)
                .addField(`:arrow_right: ${message.translate("general/channelinfo:type")}`, channelTypes[channel.type], true)
                .addField(`:arrow_right: ${message.translate("general/channelinfo:topic")}`, channel.topic || message.translate("general/channelinfo:no"), true)
                        .setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL());
                console.log(channel.type)

        message.channel.send({embeds : [channelEmbed]});
    }
}
module.exports = Channelinfo;
