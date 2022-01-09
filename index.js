require("./helpers/extenders");
process.env.TZ = 'America/Atikokan';
const util = require("util"),
	fs = require("fs"),
	readdir = util.promisify(fs.readdir),
	mongoose = require("mongoose"),
	chalk = require("chalk")
require('date.format'), {
		readdirSync
	} = require("fs"), {
		MessageEmbed
	} = require("discord.js"),
	prettyMilliseconds = require("pretty-ms"), {
		LavasfyClient
	} = require("lavasfy"), {
		Manager
	} = require("erela.js")
const Chino = require("./base/Chino"),
	client = new Chino()

const init = async () => {
	const directories = await readdir("./commands/");
	client.logger.log(`[檔案] 讀取 ${directories.length} categories.`, "log");
	directories.forEach(async (dir) => {
		const commands = await readdir("./commands/" + dir + "/");
		commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
			const response = client.loadCommand("./commands/" + dir, cmd);
			if (response) {
				client.logger.log(response, "error");
			}
		});
	});



	const evtFiles = await readdir("./events/");
	client.logger.log(`[活動] 讀取 ${evtFiles.length} events.`, "log");
	evtFiles.forEach((file) => {
		const eventName = file.split(".")[0];
		//	client.logger.log(`[活動]: ${eventName}`);
		const event = new(require(`./events/${file}`))(client);
		client.on(eventName, (...args) => event.run(...args));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
	client.login(client.config.token);

	mongoose.connect(client.config.mongoDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}).then(() => {
		client.logger.log("已連接資料庫", "log")
	}).catch((err) => {
		client.logger.log("Unable to connect to the Mongodb database. Error:" + err, "error")
	});

	const languages = require("./helpers/languages");
	client.translations = await languages();

	client.Lavasfy = new LavasfyClient({
			clientID: client.config.Spotify.ClientID,
			clientSecret: client.config.Spotify.ClientSecret,
			playlistPageLoadLimit: 3,
			filterAudioOnlyResult: true,
			autoResolve: true,
			useSpotifyMetadata: true,
		},
		[{
			id: client.config.Lavalink.id,
			host: client.config.Lavalink.host,
			port: client.config.Lavalink.port,
			password: client.config.Lavalink.pass,
			secure: client.config.Lavalink.secure,
		}, ]
	);

	client.manager = new Manager({
			// plugins: [
			//   new deezer(),
			//   new apple(),
			//   new facebook(),
			// ],
			nodes: [{
				identifier: client.config.Lavalink.id,
				host: client.config.Lavalink.host,
				port: client.config.Lavalink.port,
				password: client.config.Lavalink.pass,
				secure: client.config.Lavalink.secure,
			}, ],
			send(id, payload) {

				const guild = client.guilds.cache.get(id);
				if (guild) guild.shard.send(payload);
			},
		})
		.on("nodeConnect", (node) =>
			client.logger.log(`Lavalink: Node ${node.options.identifier} connected`, "ready")
		)
		.on("nodeError", (node, error) =>
			client.logger.log(
				`Lavalink: Node ${node.options.identifier} had an error: ${error.message}`, "error"
			)
		)
		.on("trackStart", async (message, player, track) => {
			client.SongsPlayed++;
			console.log(player)
			let TrackStartedEmbed = new MessageEmbed()
				.setAuthor(`目前播放 ♪`)
				.setDescription(`[${track.title}](${track.uri})`)
				.addField("點歌:", `${track.requester}`, true)
				.addField(
					"長度:",
					`\`${prettyMilliseconds(track.duration, {
				  colonNotation: true,
				})}\``,
					true
				)
				.setColor(client.config.embed.color);
			//.setFooter("Started playing at");
			let NowPlaying = await client.channels.cache
				.get(player.textChannel)
				.send({
					embeds: [TrackStartedEmbed]
				});
			client.functions.setNowplayingMessage(NowPlaying);
		})
		.on("queueEnd", (player) => {
			let QueueEmbed = new MessageEmbed()
				.setAuthor("音樂列隊完結")
				.setColor(client.config.embed.color)
				.setTimestamp();
			client.channels.cache.get(player.textChannel).send({
				embeds: [QueueEmbed]
			});
			// if (!this.botconfig["24/7"]) player.destroy();
		})
		.on("playerMove", async (player, oldChannel, newChannel) => {

			const guild = client.guilds.cache.get(player.guild)
			if (!guild) return;
			const channel = guild.channels.cache.get(player.textChannel);
			if (oldChannel === newChannel) return;
			if (newChannel === null || !newChannel) {
				if (!player) return;
				if (channel) await channel.send({
					embeds: [new MessageEmbed().setDescription(`我從 <#${oldChannel}> 斷綫了!`)]
				})
				return player.destroy();
			} else {
				player.voiceChannel = newChannel;

				if (channel) await channel.send({
					embeds: [new MessageEmbed().setDescription(`我被移動到 <#${player.voiceChannel}> 了!`)]
				});
				if (player.paused) player.pause(false);
			}
		})

};
init();
client.on("disconnect", () => client.logger.log("Bot is disconnecting...", "warn"))
	.on("reconnecting", () => client.logger.log("Bot reconnecting...", "log"))
	.on("error", (e) => {
		client.logger.log(e, "error")
	})
process.on("unhandledRejection", (err) => {
	console.error(err);
});