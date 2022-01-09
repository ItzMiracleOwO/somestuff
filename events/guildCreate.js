const Discord = require("discord.js");

module.exports = class {

	constructor (client) {
		this.client = client;
	}
    
	async run (guild) {
		guild = await guild.fetch();

		const messageOptions = {};

		const userData = await this.client.findOrCreateUser({ id: guild.ownerID });
		this.client.functions.log(null, `Joined ${guild.name} [${this.client.guilds.cache.size}]`, true, "info");
	// 	const REGEX_CHINESE=/[\u4e00-\u9fff]|[\u3400-\u4dbf]|[\u{20000}-\u{2a6df}]|[\u{2a700}-\u{2b73f}]|[\u{2b740}-\u{2b81f}]|[\u{2b820}-\u{2ceaf}]|[\uf900-\ufaff]|[\u3300-\u33ff]|[\ufe30-\ufe4f]|[\uf900-\ufaff]|[\u{2f800}-\u{2fa1f}]/u;


	// 				let defaultChannel = "";
	// 	guild.channels.cache.forEach((channel) => {
	// 		if(channel.type == "GUILD_TEXT" && defaultChannel == "") {
	// 		  if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
	// 			defaultChannel = channel;
	// 		  }
	// 		}
	// 	  })
	// 	  console.log(defaultChannel)
	// 				const guilds = await this.client.findOrCreateGuild({ id: defaultChannel.guild.id })
				

	// 	  const thanksEmbed = new Discord.MessageEmbed()
	// 	  const hasChinese = REGEX_CHINESE.test(defaultChannel.name)
	// 	  thanksEmbed.setAuthor(this.client.user.tag , this.client.user.displayAvatarURL())
	// 	  thanksEmbed.setTimestamp()
	// 	  thanksEmbed.setThumbnail(this.client.user.displayAvatarURL())
	// 	  if(hasChinese === true){

	// 		thanksEmbed.setTitle("謝謝您將我加入到您的伺服器中")
	// 		thanksEmbed.setDescription("🇹🇼 系統檢測您的頂部頻道名稱語言")
	// 		thanksEmbed.addField(this.client.customEmojis.link+" • 連結", 
	// 		`● [邀請連結](https://discord.com/oauth2/authorize?client_id=651692927072075787&permissions=8&scope=bot) 
	// 			● [官方群组 ](https://discord.gg/invite/sBTFjyRs3q)
	//    ● [投票連結](https://top.gg/bot/651692927072075787/vote)
	  
	//   `)
	// 		guilds.language = "zh-TW"
	// 		await guilds.save();
	// 			} else {
			
	// 		thanksEmbed.setTitle("Thank you for adding me to your guild")
	// 		thanksEmbed.addField("🇺🇸 English" ,`If u Want Set Language, Type ${this.client.config.prefix}setlang english `)
	// 		thanksEmbed.addField(this.client.customEmojis.link+" • Links", 
	// 		`● [Invite](https://discord.com/oauth2/authorize?client_id=651692927072075787&permissions=8&scope=bot) 
	// 			● [SupportServer](https://discord.gg/invite/sBTFjyRs3q)
	//    ● [Vote](https://top.gg/bot/651692927072075787/vote)
	  
	//   `)
	// 	}
	// 	messageOptions.embed = thanksEmbed;

	// 	defaultChannel.send(messageOptions).catch((err) => {});

	// //	this.client.channels.cache.get(this.client.config.support.logs).send(`被邀請到 ${guild.name} 了！(伺服器數： ${this.client.guilds.cache.array().length}`);
	  
	}
};  
