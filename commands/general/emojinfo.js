const { MessageEmbed} = require("discord.js")
const Command = require("../../base/Command.js")

class Emoji extends Command {
  constructor (client) {
      super(client, {
          name: "emojiinfo",
          dirname: __dirname,
          enabled: true,
          guildOnly: false,
          aliases: [ "ei" ],
          memberPermissions: [],
          botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
          nsfw: false,
          ownerOnly: false,
          cooldown: 5000
      });
  }

  async run (message, args, data ,client) {
        try{
        const has = /<a?:.+:\d+>/gm;
        if (!args[0]) {
             return message.sendT("general/emojiinfo:args" ,null, {
                prefixEmoji: "error"
            })
        }
        
        let emoji = args[0];
        const emoji_regex = /^(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])+$/;
        if (emoji_regex.test(emoji)) return message.sendT("general/emojiinfo:unicode" ,null, {
            prefixEmoji: "error"
        })

        if (!has.test(emoji) 
        && !this.client.emojis.cache.find(x=>x.name==args[0])
        && !this.client.emojis.cache.has(emoji)) {
            return message.sendT("general/emojiinfo:invalid" ,null, {
                prefixEmoji: "error"
            })
        } 
        
        const embed = new MessageEmbed()
            .setColor(message.member.displayHexColor === "#000000" ? 'RANDOM' : message.member.displayHexColor)
            .setTimestamp(Date.now())
    .setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL());
        let id = emoji.includes("<") ? emoji.replace("<", "").replace(">", "").split(":")[2] : this.client.emojis.cache.find(x=>x.name===emoji||x.id===emoji).id;
        if (!this.client.emojis.cache.has(id)) return message.sendT("general/emojiinfo:not_exist",null, {
			prefixEmoji: "error"
		})
        let e = this.client.emojis.cache.get(id);

        embed.setAuthor("Emoji: " + e.name, "https://cdn.discordapp.com/emojis/818987710693900329.png?v=1")
        let roles = [];
        e.roles.cache.forEach(r => {
            roles.push("<@&" + r.id + ">");
        });

        embed.setDescription(`
        🆔 **ID**: \`${e.id}\`
        ${this.client.customEmojis.gif} **Animated**: \`${e.animated ? 'Yes' : 'No'}\`
        ${this.client.customEmojis.discord} **Guild**: \`${e.guild.name}\`
        ${this.client.customEmojis.roles}**Roles that can use this emoji**: ${roles.length < 1 ? "@everyone" : roles.join(", ")}
        ${this.client.customEmojis.cooldown} **Created at**: ${new Date(e.createdAt).toUTCString()}
        `)
            .setThumbnail(e.url);
        message.channel.send({embeds : [embed]}); 
      }catch{error =>{
        console.log(error)}
      }



    }}
    module.exports = Emoji;
