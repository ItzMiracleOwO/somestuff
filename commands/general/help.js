const Command = require("../../base/Command.js")
const {
	MessageEmbed,
	MessageButton,
	MessageActionRow
} = require("discord.js");

class Help extends Command {
	constructor(client) {
		super(client, {
			name: "help",
			dirname: __dirname,
			enabled: true,
			guildOnly: false,
			aliases: ["aide", "commands", "cmds", "cmd"],
			slash: {
				name: "help",
				description: "Show commands list or informations about a command.",
				options: [{
					name: "command",
					description: "The Command Name",
					type: 3,
					required: false,
				}]
				//   {
				// 	"name": "help",
				// 	"description": "Show commands list or informations about a command.",
				// 	"options": [
				// 		{
				// 			"name": "command",
				// 			"description": "The Command Name",
				// 			"type": 3,
				// 			"required": false
				// 		}
				// 	]
				// }
			},
			memberPermissions: [],
			botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
			nsfw: false,
			ownerOnly: false,
			cooldown: 5000
		});
	}

	async run(message, args, data) {
		if (args[0]) {

			const isCustom = (message.guild && data.guild.customCommands ? data.guild.customCommands.find((c) => c.name === args[0]) : false);

			// if the command doesn't exist, error message
			const cmd = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));
			if (!cmd && isCustom) {
				return message.error("general/help:CUSTOM", {
					cmd: args[0]
				});
			} else if (!cmd) {

				return message.success("general/help:NOT_FOUND", {
					search: args[0]
				});
			}

			const description = message.translate(`${cmd.help.category}/${cmd.help.name}:DESCRIPTION`);
			const usage = message.translate(`${cmd.help.category}/${cmd.help.name}:USAGE`, {
				prefix: message.guild ?
					data.guild.prefix :
					""
			});
			const examples = message.translate(`${cmd.help.category}/${cmd.help.name}:EXAMPLES`, {
				prefix: message.guild ?
					data.guild.prefix :
					""
			});

			// Creates the help embed
			const groupEmbed = new MessageEmbed()
				.setThumbnail(this.client.user.displayAvatarURL())
				.setAuthor(message.translate("general/help:CMD_TITLE", {
					prefix: message.guild ? data.guild.prefix : "",
					cmd: cmd.help.name
				}))
				.addField(message.translate("general/help:FIELD_DESCRIPTION"), description, true)
				.addField(message.translate("general/help:FIELD_USAGE"), usage)
				.addField(message.translate("general/help:FIELD_EXAMPLES"), examples, true)
				.addField(message.translate("general/help:FIELD_ALIASES"), cmd.help.aliases.length > 0 ? cmd.help.aliases.map(a => "`" + a + "`").join("\n") : message.translate("general/help:NO_ALIAS"), true)
				.addField(message.translate("general/help:FIELD_PERMISSIONS"), cmd.conf.memberPermissions.length > 0 ? cmd.conf.memberPermissions.map((p) => "`" + p + "`").join("\n") : message.translate("general/help:NO_REQUIRED_PERMISSION"), true)
				.setColor(this.client.config.embed.color)
				.setFooter({ text: this.client.config.embed.footer, iconURL: this.client.user.displayAvatarURL() });
			// and send the embed in the current channel
			if (message.slash) return message.slash.send({
				embeds: [groupEmbed]
			}).catch(console.error);
			else return message.channel.send({
				embeds: [groupEmbed]
			}).catch(console.error);
		}

		const categories = [];
		const commands = this.client.commands.filter((c) => c.conf.enabled);

		commands.forEach((command) => {
			if (!categories.includes(command.help.category)) {
				if (command.help.category === "Owner" && !this.client.config.owner.includes(message.author.id)) {
					return;
				}
				categories.push(command.help.category);
			}
		});

		const emojis = this.client.customEmojis;

		const embed = new MessageEmbed()
			.setThumbnail(this.client.user.displayAvatarURL())

			.setDescription(message.translate("general/help:INFO", {
				prefix: message.guild ?
					data.guild.prefix :
					""
			}))
			.setThumbnail(this.client.user.displayAvatarURL())
			.setColor(data.config.embed.color)
			.setFooter({ text: this.client.config.embed.footer, iconURL: this.client.user.displayAvatarURL() });

			const Lol = {
				"general": "一般",
				"owner": "機器人擁有者",
				"admin": "管理員",
				"music": "音樂",
				"economic": "經濟",
				"owner": "擁有者",
				"game": "游戲",
				"moderation": "伺服器設定"
			}

		categories.sort().forEach((cat) => {
			const tCommands = commands.filter((cmd) => cmd.help.category === cat);
			embed.addField(Lol[cat.toLowerCase()] + " " + " - (" + tCommands.size + ")", tCommands.map((cmd) => "`" + cmd.help.name + "`").join(", "));
		});
		if (message.guild) {
			if (data.guild.customCommands.length > 0) {
				embed.addField(emojis.categories.custom + " " + message.guild.name + " | " + message.translate("general/help:CUSTOM_COMMANDS") + " - (" + data.guild.customCommands.length + ")", data.guild.customCommands.map((cmd) => "`" + cmd.name + "`").join(", "));
			}
		}
		embed.setThumbnail(this.client.user.displayAvatarURL())
		embed.setAuthor(message.translate("general/help:TITLE", {
			name: this.client.user.username
		}), this.client.user.displayAvatarURL());

		if (message.slash) return message.slash.deferReply().then(message.slash.followUp({
			embeds: [embed]
		}))
		else return message.channel.send({
			embeds: [embed]
		}).catch(console.error);
	}

}

module.exports = Help;