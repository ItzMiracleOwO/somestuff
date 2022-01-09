const path = require("path");

module.exports = class Command {
	constructor(client, {
		name = null,
		dirname = false,
		enabled = true,
		guildOnly = false,
		aliases = new Array(),
		botPermissions = new Array(),
		register = false,
		slash = {},
		slashReply = false,
		memberPermissions = new Array(),
		server = false,
		nsfw = false,
		premium = false,
		ownerOnly = false,
		player = false,
		sameVoiceChannel = false,
		inVoiceChannel = false,
		CheckPermChannel = false,
		cooldown = 3000
	}) {
		const category = (dirname ? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length - 1, 10)] : "Other");
		this.client = client;
		this.conf = {
			name,
			enabled,
			guildOnly,
			memberPermissions,
			botPermissions,
			nsfw,
			ownerOnly,
			cooldown,
			premium,
			server,
			slashReply
		};
		this.music = {
				sameVoiceChannel,
				inVoiceChannel,
				player,
				CheckPermChannel
			},
			this.help = {
				name,
				category,
				aliases
			};
		this.slash = {
			register,
			slash
		}
	}
};