const Command = require("../../base/Command.js"),
	Discord = require("discord.js"),
	ms = require("ms"),
	mongo = require("../../mongo")

class vc extends Command {

	constructor (client) {
		super(client, {
			name: "vc",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ 'dynamicvc', 'newvc' , "dvc"],
			memberPermissions: [ "MANAGE_CHANNELS" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_CHANNELS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {
		let db 
		db = mongo.db("zara")
        let category = await message.channel.guild.channels.create(message.translate("Administration/dvc:category"), { type: 'GUILD_CATEGORY', position: 0 })
        await category.setPosition(0) //創建語音
        let channel = await message.channel.guild.channels.create(message.translate("Administration/dvc:dvc"), { type: 'GUILD_VOICE', userLimit: 1, parent: category.id })
		
		db.collection("dvc").insertOne({CategoryId: category.id.toString() , channelid : channel.id.toString() , guildID : message.guild.id})

		message.reply({embeds : [new Discord.MessageEmbed()
		.setTitle(this.client.customEmojis.voice + message.translate("Administration/dvc:EMBED_TITLE"))
		.setDescription(message.translate("Administration/dvc:EMBED_DESC"))
		.setColor("GREEN")
		.setFooter(data.config.embed.footer)
		]})
		
		/*
		            mongo.db('Users').collection('Users').findOne({Discord:message.author.id})
            .then(doc=>{
                if(doc==null){
                    mongo.db('Users').collection('Users').insertOne({"Discord":message.author.id,"uuid":player.uuid});
                }else{
                    mongo.db('Users').collection('Users').updateOne({Discord:message.author.id},{$set:{"Discord":message.author.id,"uuid":player.uuid}});
                }
			})
			*/

    }}
    module.exports = vc
