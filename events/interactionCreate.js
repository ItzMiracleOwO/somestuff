require("../helpers/extenders");
const Discord = require("discord.js");

module.exports = class {
	constructor (client) {
		this.client = client;
	}

	async run (interaction) {
		
		const data = {}
		const client = this.client
		if (!interaction.isCommand()) return;
		if (!interaction.inGuild()) return interaction.reply("❌ ┃ 請在伺服器裡傳送指令!").catch(console.error);
		if (!interaction.guild) return interaction.reply("❌ ┃ 必須要在你的伺服器裡!").catch(console.error);
		if (!interaction.channel.permissionsFor(interaction.guild.me).has([
			Discord.Permissions.FLAGS.EMBED_LINKS,
			Discord.Permissions.FLAGS.SEND_MESSAGES 
		  ])) return interaction.reply("❌ ┃ 我沒有權限在此頻道發送訊息!").catch(console.error);
		let message = {
		  channel: interaction.channel,
		  guild: interaction.guild, 
		  author: interaction.user,
		  client,
		  content: null,
		  success : interaction.success,
		  translate : interaction.translate,
		  error : interaction.error,
		  member: interaction.member,
		  createdTimestamp: interaction.createdTimestamp,
		  slash: {
			followUp: function(data){
				return interaction.followUp(data);
			},
			deferReply: function(){
				return interaction.deferReply()
			},
			send: function(data) {
				return interaction.reply(data);
			  },
			edit: function(data) {
			  return interaction.editReply(data);
			},
			delete: function() {
			  return interaction.deleteReply();
			}
		  }
		};
		data.config = client.config;
	
		if(interaction.guild){
			const guild = await client.findOrCreateGuild({ id: interaction.guild.id });
			interaction.guild.data = data.guild = guild
		}

		if(interaction.guild){
			const memberData = await client.findOrCreateMember({ id: interaction.user.id, guildID: interaction.guild.id });
			data.memberData = memberData;
		}
		const userData = await client.findOrCreateUser({ id: interaction.user.id });
		data.userData = userData;

		const commandName = interaction.commandName.toLowerCase();

		const command = client.commands.get(commandName);
	  
		if (!command) return;
		let args = [];
		interaction.options.data.forEach(option => {
		  args.push(option.value);
		});
		this.client.functions.log(message, commandName, true, "command");
		client.logger.log(`${message.author.username} (${message.author.id}) ran SlashCommand ${commandName}`, "cmd");

		command.run(message, args, data).catch(error =>{
			console.error(error)
			this.client.functions.log(message, `${error.message} (Command:${command.help.name})` + "```" + error.stack + "```", false, "error")
			return message.slash.send(message.translate("misc:ERR_OCCURRED"));
		})


    }
}