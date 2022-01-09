const Discord = require("discord.js");


module.exports = class {

	constructor (client) {
		this.client = client;
	}
  
	async run (member) {

		member.guild.fetch().then(async (guild) => {

			const guildData = await this.client.findOrCreateGuild({ id: guild.id });
			member.guild.data = guildData;



		});
	}
};
  
