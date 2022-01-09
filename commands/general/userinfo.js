const axios = require("axios");
const Discord = require("discord.js");
const moment = require("moment")
const Command = require("../../base/Command.js")
const asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};
const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

class Userinfo extends Command {
  constructor (client) {
      super(client, {
          name: "userinfo",
          dirname: __dirname,
          enabled: true     ,
          guildOnly: false,
          aliases: ["ui"],
          memberPermissions: [],
          botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
          nsfw: false,
          ownerOnly: false,
          cooldown: 5000
      });
  }

  async run (message, args, data ) {
    const moment = require("moment");
    const DEVICES = {
        web: "🌐",
        desktop: "💻",
        mobile: "📱"
    };
    
    const BADGES = {
        "DISCORD_EMPLOYEE": this.client.customEmojis.badge.DISCORD_STAFF,
      "PARTNERED_SERVER_OWNER": this.client.customEmojis.badge.DISCORD_PARTNER,
      "BUGHUNTER_LEVEL_1": this.client.customEmojis.badge.DISCORD_BUGHUNTER,
      "HYPESQUAD_EVENTS": this.client.customEmojis.badge.HYPESQUAD_EVENTS,
      "HOUSE_BRAVERY": this.client.customEmojis.badge.HOUSE_BRAVERY,
      "HOUSE_BRILLIANCE": this.client.customEmojis.badge.HOUSE_BRILLIANCE,
      "HOUSE_BALANCE": this.client.customEmojis.badge.HOUSE_BALANCE,
      "EARLY_SUPPORTER": this.client.customEmojis.badge.EARLY_SUPPORTER,
      "VERIFIED_BOT":  this.client.customEmojis.badge.VERIFIED_BOT,
        "EARLY_VERIFIED_BOT_DEVELOPER": this.client.customEmojis.badge.VERIFIED_DEVELOPER,
    };

    const member = message.mentions.members.last() || message.guild.members.cache.get(args[0]) || message.member;
    const customdata = await axios.get(`https://discord.com/api/guilds/${message.guild.id}/members/${member.user.id}`, {
            headers: {
                Authorization: `Bot ${this.client.config.token}`
            }
        }).then(d => d.data);
        let aurl
        if(customdata.avatar && customdata.avatar != member.user.avatar){
            aurl = customdata.avatar.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
            aurl = `https://cdn.discordapp.com/guilds/${message.guild.id}/users/${member.user.id}/avatars/${customdata.avatar}${aurl}`;
        } 
    
      
    
    const upperCase = str => {
        return str.toUpperCase().replace(/_/g, " ").split(" ")
                  .join(" ")
    }

    let userFlags;
    if (member.user.flags === null) {
        userFlags = ''
    } else {
        userFlags = member.user.flags.toArray();
 
    }
    let bot
    const bdata = await axios.get(`https://discord.com/api/users/${member.user.id}`, {
        headers: {
            Authorization: `Bot ${this.client.config.token}`
        }
    }).then(d => d.data);
    let url
        if(bdata.banner){
        url = bdata.banner.startsWith("a_") ? ".gif?size=4096" : ".png?size=4096";
        url = `https://cdn.discordapp.com/banners/${member.user.id}/${bdata.banner}${url}`;
    }
    let avatar
    if(customdata.avatar){
        avatar = aurl 
    }else{
        avatar = member.user.displayAvatarURL({dynamic : true , size : 512})
    }
    if(!member.user.bot) { bot = message.translate("common:NO") } else if (member.user.bot) { bot =message.translate("common:YES") }
    const embed = new Discord.MessageEmbed()

        .setAuthor(`${member.user.tag} `, member.user.displayAvatarURL({dynamic : true , size : 512})) 
        .setThumbnail(avatar)
        .setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL())
        .addField(message.translate("general/userinfo:UserBadges") , userFlags.length ? userFlags.map(flag => BADGES[flag]).join("") : "None" , true)
        .addField(message.translate("general/userinfo:Created") ,  `${moment(member.user.createdTimestamp).format('YYYY-MM-DD HH:mm:ss')} \n ${moment(member.user.createdTimestamp).locale(message.translate("general/userinfo:locale")).fromNow()}` , true)
        .addField(message.translate("general/userinfo:Joining"),  `${moment(member.joinedAt).format('YYYY-MM-DD HH:mm:ss')} \n  ${moment(member.joinedAt).locale(message.translate("general/userinfo:locale")).fromNow()}` , true)
        .addField(message.translate("general/userinfo:Nickname") , member.displayName || "None" , true)
        .addField(message.translate("general/userinfo:IS_BOT") , bot , true)
        .addField(message.translate("general/userinfo:Color") , upperCase(member.displayHexColor) , true)
        .addField(message.translate("general/userinfo:ID") , member.user.id , true)
        .setColor(`${member.displayHexColor || RANDOM}`)
        if(bdata.banner){
        embed.setImage(url)
        }
        if(!member.user.bot){


        const memberData = (member.id === message.author.id ? data.memberData : await this.client.findOrCreateMember({ id: member.id, guildID: message.guild.id}));
		const userData = (member.id === message.author.id ? data.userData : await this.client.findOrCreateUser({ id: member.id }));
		if(userData.lover && !this.client.users.cache.get(userData.lover)){
			await this.client.users.fetch(userData.lover, true);
		}

		if(userData.lover && !this.client.users.cache.get(userData.lover)){
			await this.client.users.fetch(userData.lover, true);
		}
			embed.addField(message.translate("economy/profile:REGISTERED"), message.printDate(new Date(memberData.registeredAt)), true)
			embed.addField(message.translate("economy/profile:BIRTHDATE"), (!userData.birthdate ? message.translate("economy/profile:NO_BIRTHDATE"): message.printDate(new Date(userData.birthdate))), true)
			embed.addField(message.translate("economy/profile:LOVER"), (!userData.lover ? message.translate("economy/profile:NO_LOVER") : this.client.users.cache.get(userData.lover).tag), true)
        }
        // let discordBtn = new MessageButton()
        // .setLabel("Custom Avatar")
        // .setStyle("LINK")
        // .setURL(aurl);
  
        //   const inviteBtn = new MessageButton()
        //   .setLabel("Custom Banner")
        //   .setStyle('LINK')
        //   .setURL(url)
  
        //   let buttonRow = new MessageActionRow()
        //   .addComponents(discordBtn, inviteBtn);
          if (message.slash) return message.slash.deferReply().then(message.slash.followUp({
              embeds: [embed],
            //   components: [buttonRow]
             }
              ))
            else return message.channel.send({
              embeds: [embed],
            //   components: [buttonRow]
            }).catch(console.error);


    }
}
module.exports = Userinfo;
