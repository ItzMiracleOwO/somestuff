const Command = require("../../base/Command.js")
const DBLStats = require('dblstatistics.js')
const { MessageEmbed } = require("discord.js")

class dblstat extends Command {
    constructor (client) {1
        super(client, {
            name: "dbl",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "dblstats"  ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 5000
        });
    }

    async run (message, args, data) {
        const dbl = new DBLStats(this.client.config.apiKeys.dblStats)
        const botID = args?.[0]?.replace(/[<@!>]/g, "")
        if(!botID) return message.channel.send("Please give a bot id")
          // try eris's cache

        let bot
        bot = await this.client.users.fetch(botID)
  // Fetch from discord
        if(!bot) bot = await this.client.users.cache .fetch(botID).catch(_ => {})

        const botInfo = await dbl.getBot(botID).catch(_ => {})

        if(!botInfo) return message.channel.send("'Bot is not listed.")

        const embed = new MessageEmbed()
        .setAuthor(
            `Bot info for ${bot.username}`,
            'https://dblstats.com',
            `https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png?size=1024`).setColor(this.client.color)
          .setDescription(`**[View Here](https://dblstats.com/bot/${bot.id})**
    ${botInfo.short_desc}`)
          .addField('Library', botInfo.lib || 'None specified', true)
          .addField('Prefix', botInfo.prefix, true)
          .addField('Total Votes', botInfo.total_votes, true)
          .addField('Monthly Votes', botInfo.monthly_votes, true)
          .addField('Shard Count', botInfo.shard_count, true)
          .addField('Server Count', botInfo.server_count, true)
          .addField("Approved At:" , botInfo.approved_at , true)
          .addField("Website " , botInfo.website || "None" , true)
          .addField("Owners" , botInfo.owners , true)
          .setFooter(data.config.embed.footer)
          .setImage(`https://dblstatistics.com/bot/${botInfo.id}/widget/ranks?width=1700&height=900&cache=${Math.ceil(Math.random()*1298723465876)}`, null,1700, 900)
          message.channel.send({embeds : [embed]})

    }}
module.exports = dblstat;