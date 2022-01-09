const Command = require("../../base/Command.js")
	const Discord = require("discord.js")

class Configuration extends Command {

	constructor (client) {
		super(client, {
			name: "configuration",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "conf", "config" , "settings" ],
			memberPermissions: [ "MANAGE_GUILD" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args, data) {

		const guildData = data.guild;

		const embed = new Discord.MessageEmbed()
			.setAuthor(message.guild.name, message.guild.iconURL())
			.setThumbnail(message.author.displayAvatarURL())
			.setColor(this.client.config.embed.color)
			.setFooter(this.client.config.embed.footer);
			
		// Guild prefix
		embed.addField(message.translate("Moderation/configuration:PREFIX_TITLE"), guildData.prefix);

		// Ignored channels
		embed.addField(message.translate("Moderation/configuration:IGNORED_CHANNELS_TITLE"),
			(guildData.ignoredChannels.length > 0) ?
				guildData.ignoredChannels.map((ch) => `<#${ch}>`).join(", ")
				:   message.translate("Moderation/configuration:NO_IGNORED_CHANNELS")
		);

		// Special channels
		embed.addField(message.translate("Moderation/configuration:SPECIAL_CHANNELS"),
			message.translate("Moderation/settings:MODLOGS", {
				channel:    guildData.plugins.modlogs
					? `<#${guildData.plugins.modlogs}>`
					: message.translate("common:NOT_DEFINED")
			}) + "\n" +
			message.translate("Moderation/configuration:SUGGESTIONS", {
				channel:    guildData.plugins.suggestions
					? `<#${guildData.plugins.suggestions}>`
					: message.translate("common:NOT_DEFINED")
			}) + "\n" +
			message.translate("Moderation/configuration:REPORTS", {
				channel:    guildData.plugins.reports
					? `<#${guildData.plugins.reports}>`
					: message.translate("common:NOT_DEFINED")
			})
		);
        
		// Auto sanctions
		embed.addField(message.translate("Moderation/configuration:AUTO_SANCTIONS"),
			((guildData.plugins.warnsSanctions.kick) ?
				message.translate("Moderation/configuration:KICK_CONTENT", {
					count: guildData.plugins.warnsSanctions.kick
				})
				:   message.translate("Moderation/configuration:KICK_NOT_DEFINED")) + "\n" +
			((guildData.plugins.warnsSanctions.ban) ?
				message.translate("Moderation/configuration:BAN_CONTENT", {
					count: guildData.plugins.warnsSanctions.ban
				})
				:   message.translate("Moderation/configuration:BAN_NOT_DEFINED"))
		);


		// Auto-delete mod commands
		embed.addField(message.translate("Moderation/configuration:AUTODELETEMOD"),
			(!message.guild.autoDeleteModCommands) ?
				message.translate("Moderation/configuration:AUTODELETEMOD_ENABLED")
				:   message.translate("Moderation/configuration:AUTODELETEMOD_DISABLED")
		);

		// Dashboard link
		//embed.addField(message.translate("Moderation/settings:DASHBOARD_TITLE"), `[${message.translate("Moderation/configuration:DASHBOARD_CONTENT")}](${this.client.config.supportURL})`);
		embed.setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL())
		message.channel.send({embeds : [embed]});
			

}}

module.exports = Configuration;
