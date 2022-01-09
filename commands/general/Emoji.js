const { MessageEmbed } = require("discord.js")
const Command = require("../../base/Command.js")

class Emoji extends Command {
  constructor (client) {
      super(client, {
          name: "emoji",
          dirname: __dirname,
          enabled: true,
          guildOnly: false,
          aliases: [  ],
          memberPermissions: [],
          botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
          nsfw: false,
          ownerOnly: false,
          cooldown: 5000
      });
  }

  async run (message, args, data ,client) {

        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        function Emoji(id) {
          return message.guild.emojis.cache.get(id).toString();
        }
        message.guild.emojis.cache.forEach((emoji) => {
          OverallEmojis++;
          if (emoji.animated) {
            Animated++;
            EmojisAnimated += Emoji(emoji.id);
          } else {
            EmojiCount++;
            Emojis += Emoji(emoji.id);
          }
        });
        let Embed = new MessageEmbed()
          .setTitle(`${message.translate("general/emoji:EMOJI")} ${message.guild.name}.`)
          .setDescription(
            `**${message.translate("general/emoji:Animated")}  [${Animated}]**:\n${EmojisAnimated}\n\n** ${message.translate("general/emoji:Standard")} [${EmojiCount}]**:\n${Emojis}\n\n**${message.translate("general/emoji:Count")} [${OverallEmojis}]**`
          )
          .setColor(`RANDOM`)
          .setFooter(data.config.embed.footer);
        message.channel.send({embeds : [Embed]});




    }}
    module.exports = Emoji;
