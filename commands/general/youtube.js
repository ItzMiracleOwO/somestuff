const Discord = require("discord.js");
const moment = require("moment")
const Command = require("../../base/Command.js")
const fetch = require("node-fetch")
class YouTubeTogeather extends Command {
  constructor (client) {
      super(client, {
          name: "youtube",
          dirname: __dirname,
          enabled: true     ,
          guildOnly: false,
          aliases: ["yt"],
          memberPermissions: [],
          botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
          nsfw: false,
          ownerOnly: false,
          cooldown: 5000
      });
  }

  async run (message, args, data ) {
    const member = message.member;
    const channel = message.member.voice.channel;
    if (!channel) return message.error(message.translate("music:JoinVoiceChannel"));

    this.client.together.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {

      if(!invite.code) return message.reply({ content: "Sadly I cannot start the yt together" })
      const btn1 = new Discord.MessageButton()
      .setLabel(message.translate("general/youtube:BUTTON_TEXT"))
      .setURL(`${invite.code}`)
      .setStyle('LINK')
  const row = new Discord.MessageActionRow().addComponents(btn1);
  let embed = new Discord.MessageEmbed()
  .setAuthor(`${this.client.user.username} | 📺 YouTube Together`, "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1")
  .setColor("#5865F2")
  .setDescription(message.translate("general/youtube:TEXT"))
  .setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL());
      return message.channel.send({
      components : [row],
      embeds : [embed]
      });

    })

  }
}
module.exports = YouTubeTogeather;
