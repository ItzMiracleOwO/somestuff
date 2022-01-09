const { MessageEmbed } = require("discord.js");
const Command = require("../../base/Command.js")


class LoveCommands extends Command {
    constructor (client) {
        super(client, {
            name: "love",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "affinity" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            cooldown: 2000
        });
    }

    async run (message, args, data) {
            if(!args[0]) return message.error(message.translate("general/love:Error"))
        // Get a member from mention, id, or username
        let person = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
          
        if(person == message.author.id) return message.error(message.translate("general/love:Tag_YourSelf"))
        
     const embed = new MessageEmbed()
        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = "💖".repeat(loveIndex) + "💔".repeat(10 - loveIndex);

   
        embed.setColor("#ffb6c1")
            .addField(`☁ **${person.displayName}** ${message.translate("general/love:Love")} **${message.member.displayName}**`,
            `💟 ${Math.floor(love)}%\n\n${loveLevel}`)
    .setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL());

        message.channel.send({embeds  : [embed]}); 
    }
    
}
module.exports = LoveCommands;