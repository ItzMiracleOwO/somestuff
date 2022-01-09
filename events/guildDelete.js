const Discord = require("discord.js");

module.exports = class {

	constructor (client) {
		this.client = client;
	}
    
	async run (guild) {
		this.client.functions.log(null, `Leave ${guild.name} [${this.client.guilds.cache.size}]`, true, "info");
		const guilds = await this.client.findOrCreateGuild({ id: guild.id })

		guilds.remove({id : guild.id}, function(err, result) {
			if (err) {
			  console.err(err);
			} else {
				this.client.functions.log(null, `Remove ${guild.name} data`, true, "info");
			}
		  });
		
	}
};  
