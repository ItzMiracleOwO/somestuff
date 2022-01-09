const xpCooldown = {},
	cmdCooldown = {};
const Discord = require("discord.js");
const {
	Util,
	MessageEmbed,
	Permissions
} = require("discord.js");
module.exports = class {
	constructor(client) {
		this.client = client;
	}

	async run(message) {
		// if (message.channel.type === 'news') message.crosspost(message);
		const data = {};
		if (message.author.bot) return
		if (message.guild && !message.member) {
			await message.guild.members.fetch(message.author.id);
		}
		const client = this.client;
		data.config = client.config;
		if (message.guild) {
			const guild = await client.findOrCreateGuild({
				id: message.guild.id
			});
			message.guild.data = data.guild = guild
		}
		if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
			if (message.guild) {
				return message.sendT("misc:HELLO_SERVER", {
					username: message.author.username,
					prefix: data.guild.prefix
				});
			}
		}

		if (message.guild) {
			const memberData = await client.findOrCreateMember({
				id: message.author.id,
				guildID: message.guild.id
			});
			data.memberData = memberData;
		}

		const userData = await client.findOrCreateUser({
			id: message.author.id
		});
		data.userData = userData;

		// Gets the prefix
		const prefix = client.config.prefix || client.functions.getPrefix(message, data);
		if (!prefix) return;

		const args = message.content.slice((typeof prefix === "string" ? prefix.length : 0)).trim().split(/ +/g);
		const command = args.shift().toLowerCase();
		const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

		if (!message.guild) {
			return message.error("misc:GUILD_ONLY");
		}

		if (message.guild) {
			let neededPermissions = [];
			if (!cmd.conf.botPermissions.includes("EMBED_LINKS")) {
				cmd.conf.botPermissions.push("EMBED_LINKS");
			}
			cmd.conf.botPermissions.forEach((perm) => {
				neededPermissions = [];
				if (!message.channel.permissionsFor(message.guild.me).has(perm)) {
					neededPermissions.push(perm);
				}
			});
			if (client.config.owner.includes(message.author.id)) {
				if (neededPermissions.length > 0) {
					console.log(neededPermissions)
					return message.error("misc:MISSING_BOT_PERMS", {
						list: neededPermissions.map((p) => `\`${p}\``).join(", ")
					});
				}
			} else {
				if (neededPermissions.length > 0) {
					return message.error("misc:MISSING_BOT_PERMS", {
						list: neededPermissions.map((p) => `\`${p}\``).join(", ")
					});
				}
				cmd.conf.memberPermissions.forEach((perm) => {
					if (!message.channel.permissionsFor(message.member).has(perm)) {
						neededPermissions.push(perm);
					}
				});
				if (neededPermissions.length > 0) {
					return message.error("misc:MISSING_MEMBER_PERMS", {
						list: neededPermissions.map((p) => `\`${p}\``).join(", ")
					});
				}
			}
		}

		const embed = new MessageEmbed()
			.setColor("RED");

		const player = this.client.manager.get(message.guild.id)
		if (cmd.music.player && !player) {
			embed.setDescription(message.translate("music:NothingPlaying"))
			return message.channel.send({
				embeds: [embed]
			})
		}
		if (cmd.music.sameVoiceChannel) {
			if (message.guild.me.voice.channel) {
				if (message.guild.me.voice.channelId !== message.member.voice.channelId) {
					embed.setDescription(message.translate("music:sameVoiceChannel", {
						bot: message.client.user
					}));
					return message.channel.send({
						embeds: [embed]
					});
				}
			}
		}
		if (cmd.music.inVoiceChannel && !message.member.voice.channel) {
			embed.setDescription(message.translate("music:JoinVoiceChannel"));
			return message.channel.send({
				embeds: [embed]
			});
		}
		if (cmd.music.CheckPermChannel) {
			embed.setDescription(message.translate("music:Missed_perm"))
			if (!message.guild.me.permissions.has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({
				embeds: [embed]
			});

			const {
				channel
			} = message.member.voice;
			embed.setDescription(message.translate("music:Missed_permC"))
			if (!message.guild.me.permissionsIn(channel).has([Permissions.FLAGS.CONNECT, Permissions.FLAGS.SPEAK])) return message.channel.send({
				embeds: [embed]
			});

		}

		if (!message.channel.nsfw && cmd.conf.nsfw) {
			return message.error("misc:NSFW_COMMAND");
		}

		if (!cmd.conf.enabled) {

			return message.channel.send({
				content: message.translate("misc:COMMAND_DISABLED")
			})
		}

		if (cmd.conf.server) {

			const guild = this.client.guilds.cache.get("789718401882914866")
			if (!guild.members.cache.get(message.author.id)) return message.channel.send(new Discord.MessageEmbed().setDescription(message.translate("misc:JOINSERVER")))
		}
		if (cmd.conf.ownerOnly && !client.config.owner.includes(message.author.id)) {
			return message.error("misc:OWNER_ONLY");
		}

		let uCooldown = cmdCooldown[message.author.id];
		if (!uCooldown) {
			cmdCooldown[message.author.id] = {};
			uCooldown = cmdCooldown[message.author.id];
		}
		const time = uCooldown[cmd.help.name] || 0;



		if (time && (time > Date.now())) {
			return message.error("misc:COOLDOWNED", {
				seconds: Math.ceil((time - Date.now()) / 1000)
			});
		}


		if (client.config.owner.includes(message.author.id)) {

		} else {
			cmdCooldown[message.author.id][cmd.help.name] = Date.now() + cmd.conf.cooldown;
		}

		client.logger.log(`${message.author.username} (${message.author.id}) ran command ${cmd.help.name}`, "cmd");



		if (data.userData.blacklist.enabled) {
			return message.channel.send({
				embeds: [new MessageEmbed()
					.setTitle(message.author.tag)
					.setColor("RED")
					.setThumbnail(client.user.displayAvatarURL(true))
					.setDescription(message.translate("misc:BLACKLISTED", {
						unactivated: this.client.customEmojis.unactivated,
						reason: data.userData.blacklist.reason
					}))
				]
			})
		}

		cmd.run(message, args, data).catch(error => {
			console.error(error)
			return message.error("misc:ERR_OCCURRED");
		})
	}
}