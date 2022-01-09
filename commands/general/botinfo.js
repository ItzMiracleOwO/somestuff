const Command = require("../../base/Command.js")
const Discord = require("discord.js");
const os = require('os');
const mongo = require("../../mongo")    
class Stats extends Command {

	constructor (client) {
		super(client, {
			name: "botinfo",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: [ "statistics", "infobot", "botinfos", "bot-infos", "bot-info", "infos-bot", "info-bot" , "bi" , "ping" ],
			memberPermissions: [],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
	
		
        let system;
		let OPERATING
        if(os.platform() === "win32" || os.platform() === "win64") {
            system = this.client.customEmojis.windows + `• ${message.translate("general/botinfo:SYSTEM")}`
			OPERATING = ` Windows `;
        }else if(os.platform() === "linux") {
            system = this.client.customEmojis.linux + `• ${message.translate("general/botinfo:SYSTEM")}`
			OPERATING = os.type();
        }else {
            system = os.platform();
        }


		let cpus;
        for(var i = 0, len = os.cpus().length; i < len; i++) {
            var cpu = os.cpus()[i];
            cpus = cpu.model;
        }
        function  markDown (code , text){
			return `\`\`\`${code}\n${text}\`\`\``
		  }
		  function  mark (text){
			return `\`\`${text}\`\``
		  }
		  let coll = mongo.db("Zara");


		  let hypixel
		  await coll.collection('Hypixel').countDocuments().then (data => hypixel = data)

		  let daily 
		  await coll.collection("daily").countDocuments().then (data => daily = data)
		  const memory = `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`
			const statsEmbed = new Discord.MessageEmbed()
			function  test (text){
				return `┕\`\`${text}\`\``
			  }
			  statsEmbed.setColor(data.config.embed.color)
      		.setThumbnail(this.client.user.displayAvatarURL({ dynamic: true, size: 512 }))
			.setAuthor(message.translate("common:STATS"))
			.addField(this.client.customEmojis.status.online+" "+message.translate("general/botinfo:ONLINE_TITLE") , test(message.translate("general/botinfo:ONLINE_CONTENT", {
				time: message.convertTime(Date.now()+this.client.uptime, "from")}
				)),true
			)
			.addField(`${this.client.customEmojis.ping} ${message.translate("general/botinfo:ping")}` , test(Math.round(this.client.ws.ping) + "ms") , true)
			.addField(this.client.customEmojis.ram+" "+message.translate("general/botinfo:RAM_TITLE"), `${test(memory)}`, true)
			.addField(this.client.customEmojis.server+" "+message.translate("general/botinfo:Servers"), `${test(this.client.guilds.cache.size)}`, true)
			//.addField('\u200b', '⁣ ')
			.addField(`${this.client.customEmojis.check} ${message.translate("general/botinfo:Verified")}`, `${test(hypixel)}`, true)
			.addField(`🔎 ${message.translate("general/botinfo:Tracked")}`, `${test(daily)}`, true)
			.setFooter(data.config.embed.footer)

			
	
		// 	.addField(this.client.customEmojis.version+" "+message.translate("general/botinfo:VERSIONS_TITLE"), `\`Discord.js : v${Discord.version}\`\n\`Nodejs : v${process.versions.node}\``, true)
		// 	 .addField(this.client.customEmojis.voice+" "+message.translate("general/botinfo:MUSIC_TITLE"), message.translate("general/botinfo:MUSIC_CONTENT", {
		// 	 	count: this.client.voice.connections.size
		// 	 }), true)
            
			 .addField(this.client.customEmojis.Cpu +"CPU" , "```"+`${cpus.replace("(R)", "").replace("(R)", "").split("@").slice(0)[0]}` +"```", true)
		statsEmbed.addField(this.client.customEmojis.link+" "+message.translate("general/botinfo:LINKS_TITLE"), message.translate("misc:STATS_FOOTER", {
			inviteLink: `https://discord.com/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot%20applications.commands`,
			supportLink: "https://discord.gg/invite/sBTFjyRs3q",
			VoteLink: "https://top.gg/bot/651692927072075787/vote"
		})
		);
		message.channel.send({embeds : [statsEmbed]});

	}

}

module.exports = Stats;
