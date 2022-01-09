const Discord = require("discord.js");
const Command = require("../../base/Command.js")

class serverinfo extends Command {
  constructor (client) {
      super(client, {
          name: "serverinfo",
          dirname: __dirname,
          enabled: true,
          guildOnly: false,
          aliases: ["si" ],
          memberPermissions: [],
          botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
          nsfw: false,
          ownerOnly: false,
          cooldown: 5000
      });
  }

  async run (message, args, data) {

            
		let guild = message.guild;

		if(args[0]){
			let found = this.client.guilds.cache.get(args[0]);
			if(!found){
				found = this.client.cache.guilds.find((g) => g.id === args.join(" "));
				if(found){
					guild = found;
				}
			}
		}

		guild = await guild.fetch();


  const verificationLevels = {
    NONE: message.translate("general/serverinfo:None"),
    LOW: message.translate("general/serverinfo:Low"),
    MEDIUM: message.translate("general/serverinfo:Medium"),
    HIGH: message.translate("general/serverinfo:HIGH"),
    VERY_HIGH: message.translate("general/serverinfo:VERY_HIGH")
  };

        let region = {
            "brazil": `${message.translate("general/serverinfo:brazil")}`,
            "eu-central": `${message.translate("general/serverinfo:eu-central")}`,
            "singapore": `${message.translate("general/serverinfo:singapore")}`,
            "us-central": `${message.translate("general/serverinfo:us-central")}`,
            "sydney": `${message.translate("general/serverinfo:sydney")}`,
            "us-east": `${message.translate("general/serverinfo:us-east")}`,
            "us-south": `${message.translate("general/serverinfo:us-south")}`,
            "us-west": `${message.translate("general/serverinfo:us-west")}`,
            "eu-west": `${message.translate("general/serverinfo:eu-west")}`,
            "london": `${message.translate("general/serverinfo:london")}`,
            "hongkong": `${message.translate("general/serverinfo:hongkong")}`,
            "russia": `${message.translate("general/serverinfo:russia")}`,
            "southafrica": `${message.translate("general/serverinfo:southafrica")}`,
            "japan" : `${message.translate("general/serverinfo:japan")}`
        };
        const emojis = guild.emojis.cache;
    let inline = true

    let serverembed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .setAuthor(guild.name , guild.iconURL({ dynamic: true }))
    .setThumbnail(guild.iconURL({ dynamic: true }))
    .addField(`🔣 ${message.translate("general/serverinfo:Name")}`, guild.name, inline)
    .addField(`🆔 ${message.translate("general/serverinfo:ID")}`, guild.id, inline)
    // .addField(`👤 ${message.translate("general/serverinfo:Owner")}`,`<@${guild.ownerID}>`, inline)
    .addField(`🔒 ${message.translate("general/serverinfo:verlvl")}`, verificationLevels[guild.verificationLevel],inline)
    // .addField(`📜 ${message.translate("general/serverinfo:roles")}`, guild.roles.cache.size, inline)
     .addField(`👤 ${message.translate("general/serverinfo:Total_Members")} | 👥${message.translate("general/serverinfo:Members")} | 🤖 ${message.translate("general/serverinfo:Bots")}`, `${message.guild.members.cache.size} | ${message.guild.members.cache.filter(member => !member.user.bot).size} | ${message.guild.members.cache.filter(member => member.user.bot).size}`, inline)
    .addField(this.client.customEmojis.users+message.translate("common:MEMBERS"), message.translate("general/serverinfo:MEMBERS", {
      count: guild.members.cache.filter(m => !m.user.bot).size
    })+" | "+message.translate("general/serverinfo:BOTS", {
      count: guild.members.cache.filter(m => m.user.bot).size
    }), true)
  
    .addField(this.client.customEmojis.channels+message.translate("common:CHANNELS"), 
    ":speech_balloon: | "+ message.translate("general/serverinfo:TEXT_CHANNELS", {
      count:  guild.channels.cache.filter(c => c.type === "GUILD_TEXT").size
    })+":loud_sound: | "+message.translate("general/serverinfo:VOICE_CHANNELS", {
      count: guild.channels.cache.filter(c => c.type === "voice").size
    })+":dividers: | "+message.translate("general/serverinfo:CAT_CHANNELS", {
      count: guild.channels.cache.filter(c => c.type === "GUILD_CATEGORY").size
    })+":loudspeaker: | "+message.translate("general/serverinfo:NEWS_CHANNELS", {
      count: guild.channels.cache.filter(c => c.type === "GUILD_NEWS").size
    })+":shopping_cart: | "+message.translate("general/serverinfo:STORE_CHANNELS", {
      count: guild.channels.cache.filter(c => c.type === "GUILD_STORE").size
    }))
    
    
    
    
    
    // , true)

    // .addField(this.client.customEmojis.calendar+message.translate("general/serverinfo:createdAt"), message.printDate(guild.createdAt), true)
    // .addField(`🗓️ ${message.translate("general/serverinfo:joinat")}`,  message.printDate(message.member.joinedAt) , true)
    // .addField(`${message.translate("general/serverinfo:Boost_Status")}:`
    //  ,`<:server_level:733643540743061507> ${message.translate("general/serverinfo:Level")} - ${guild.premiumTier|| '0'} \n <:server_boost:733643540533608460> ${message.translate("general/serverinfo:Boost_Tier")} - ${guild.premiumSubscriptionCount || '0'} ` )
    // .addField(`${message.translate("general/serverinfo:Count")} [${emojis.size}]` , `${message.translate("general/serverinfo:Standard")} - ${emojis.filter(emoji => !emoji.animated).size}  \n ${message.translate("general/serverinfo:Animated")} - ${emojis.filter(emoji => emoji.animated).size}`)
  
    
    .setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL());

    message.channel.send({embeds : [serverembed]});

}

}
module.exports = serverinfo;
