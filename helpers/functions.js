const languages = require("../languages/language-meta.json").map((l) => l.moment).filter((l) => l !== "en");
languages.forEach((l) => {
	require(`moment/locale/${l}.js`);
});
const Discord = require("discord.js");
const mongo = require("../mongo")
const config = require("../config")
var _this = this;

module.exports = {

	ProgressBar(value, maxValue, size) {
		const percentage = value / maxValue; // Calculate the percentage of the bar
		const progress = Math.round(size * percentage); // Calculate the number of square caracters to fill the progress side.
		const emptyProgress = size - progress; // Calculate the number of dash caracters to fill the empty progress side.

		const progressText = "▇".repeat(progress); // Repeat is creating a string with progress * caracters in it
		const emptyProgressText = "—".repeat(emptyProgress); // Repeat is creating a string with empty progress * caracters in it
		const percentageText = Math.round(percentage * 100) + "%"; // Displaying the percentage of the bar

		const Bar = progressText + emptyProgressText; // Creating the bar
		return {
			Bar,
			percentageText
		};
	},
	convertMTime(duration) {

		var milliseconds = parseInt((duration % 1000) / 100),
			seconds = parseInt((duration / 1000) % 60),
			minutes = parseInt((duration / (1000 * 60)) % 60),
			hours = parseInt((duration / (1000 * 60 * 60)) % 24);

		hours = (hours < 10) ? "0" + hours : hours;
		minutes = (minutes < 10) ? "0" + minutes : minutes;
		seconds = (seconds < 10) ? "0" + seconds : seconds;

		if (duration < 3600000) {
			return minutes + ":" + seconds;
		} else {
			return hours + ":" + minutes + ":" + seconds;
		}
	},
	sendTime(Channel, Error) {
		let embed = new Discord.MessageEmbed()
			.setColor("BLUE")
			.setDescription(Error);

		Channel.send({
			embeds: [embed]
		});
	},
	setNowplayingMessage(message) {
		if (this.nowPlayingMessage && !this.nowPlayingMessage.deleted)
			this.nowPlayingMessage.delete();
		return (this.nowPlayingMessage = message);
	},

	async dataCheck(table, query) {
		return new Promise(promise => {
			mongo.db("zara").collection(table).find(query).toArray(function (err, result) {
				if (err) throw err;
				if (result.length == 0) { //if there is no database
					promise(null)
				} else { //if there is a database
					promise(result[0])

				}
			});
		})
	},
	valorantErrorHandler(message, gdata) {
		var type
		const errormsg = gdata.error
		let errorStatuscode = gdata.statusCode
		type = errorStatuscode
		switch (type) {
			case 404:
				if (errormsg === "Not Found") return message.channel.send("User Not Found!")
				break
			case 200:

				break;
			default:
				break;
		}
	},

	/**
	 * Gets message prefix
	 * @param {object} message The Discord message
	 * @returns The prefix
	 */
	getPrefix(message, data) {
		if (message.channel.type !== "dm") {
			const prefixes = [
				`<@!${message.client.user.id}> `,
				`<@${message.client.user.id}> `,
				data.guild.prefix
			];
			let prefix = null;
			prefixes.forEach((p) => {
				if (message.content.startsWith(p) || message.content.toLowerCase().startsWith(p)) {
					prefix = p;
				}
			});
			return prefix;
		} else {
			return true;
		}
	},
	async markDown(code, text) {
		return `\`\`\`${code}\n${text}\`\`\``
	},
	// This function return a valid link to the support server
	async supportLink(client) {
		const guild = client.guilds.cache.get(client.config.support.id);
		const member = guild.me;
		const channel = guild.channels.cache.find((ch) => ch.permissionsFor(member.id).has("CREATE_INSTANT_INVITE"));
		if (channel) {
			const invite = await channel.createInvite({
				maxAge: 0
			}).catch(() => {});
			return invite ? invite.url : null;
		} else {
			return " ";
		}
	},

	// This function sort an array 
	sortByKey(array, key) {
		return array.sort(function (a, b) {
			const x = a[key];
			const y = b[key];
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		});
	},

	// This function return a shuffled array
	shuffle(pArray) {
		const array = [];
		pArray.forEach(element => array.push(element));
		let currentIndex = array.length,
			temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}
		return array;
	},

	// This function return a random number between min and max
	randomNum(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},

	convertTime(guild, time) {
		const absoluteSeconds = Math.floor((time / 1000) % 60);
		const absoluteMinutes = Math.floor((time / (1000 * 60)) % 60);
		const absoluteHours = Math.floor((time / (1000 * 60 * 60)) % 24);
		const absoluteDays = Math.floor(time / (1000 * 60 * 60 * 24));

		const d = absoluteDays ?
			absoluteDays === 1 ?
			guild.translate("time:ONE_DAY") :
			guild.translate("time:DAYS", {
				amount: absoluteDays
			}) :
			null;
		const h = absoluteHours ?
			absoluteHours === 1 ?
			guild.translate("time:ONE_HOUR") :
			guild.translate("time:HOURS", {
				amount: absoluteHours
			}) :
			null;
		const m = absoluteMinutes ?
			absoluteMinutes === 1 ?
			guild.translate("time:ONE_MINUTE") :
			guild.translate("time:MINUTES", {
				amount: absoluteMinutes
			}) :
			null;
		const s = absoluteSeconds ?
			absoluteSeconds === 1 ?
			guild.translate("time:ONE_SECOND") :
			guild.translate("time:SECONDS", {
				amount: absoluteSeconds
			}) :
			null;

		const absoluteTime = [];
		if (d) absoluteTime.push(d);
		if (h) absoluteTime.push(h);
		if (m) absoluteTime.push(m);
		if (s) absoluteTime.push(s);

		return absoluteTime.join(", ");
	},
	divide(a, b) {
		const out = +((a || 0) / (b || 0)).toFixed(2) || 0;
		if (isFinite(out)) return out;
		return a;
	},
	thousands_separators(num) {
		var num_parts = num.toString().split(".");
		num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return num_parts.join(".");
	},
	minecraftColorToHex(colorname) {
		switch (colorname) {
			case "BLACK":
				return "#000000";
			case "DARK_BLUE":
				return "#0100BD";
			case "DARK_GREEN":
				return "#00BF00";
			case "DARK_AQUA":
				return "#00BDBD";
			case "DARK_RED":
				return "#BE0000";
			case "DARK_PURPLE":
				return "#BC01BC";
			case "GOLD":
				return "#DB9F37";
			case "GRAY":
				return "#BEBDBE";
			case "DARK_GRAY":
				return "#3F3F3F";
			case "BLUE":
				return "#3F3FFE";
			case "GREEN":
				return "#3FFE3E";
			case "AQUA":
				return "#40FCFF";
			case "RED":
				return "#FF3E3F";
			case "LIGHT_PURPLE":
				return "#FE3FFE";
			case "YELLOW":
				return "#FEFD3F";
			case "WHITE":
				return "#FFFFFF";
		}
	},
	async hypixelError(e, message) {
		e = e.message.replace("[hypixel-api-reborn]", "")
		console.log(e)
		if (e.includes(`Server Error : 522 undefined!`)) return message.error(`${message.translate("hypixel/main:down")}`)
		if (e.includes(`Server Error : 521 undefined!`)) return message.error(`${message.translate("hypixel/main:down")}`)
		if (e.includes(`Player does not exist.`)) return message.error(`hypixel/main:playerexist`)
		if (e.includes("Nickname or uuid must be a string.")) return
		else if (e.includes(`Player has never logged into Hypixel.`)) return message.channel.send({
			content: "Player has never logged into Hypixel."
		})
		else {
			message.channel.send({
				content: e.message
			})
		}
		const webhook = new Discord.WebhookClient({
			id: "858324096533528588",
			token: "2y97rsewyLWz7jU7WDQI0etUHwdSrba87Q-yLa1wGp62vV8J4ftxm2zKXHUCgC-nePf9"
		});

		const content = `(Zara) [${message.author.tag}] ${e.message}`;
		webhook.send({
			content,
			username: message.content,
			avatarURL: "https://raw.githubusercontent.com/onekin1225/emoji/main/info.png"
		});


	},
	async verifyUser(message, args) {


		var result = await this.dataCheck("Hypixel", {
			Discord: message.author.id
		});

		if (args[0] != null) {
			return args[0]
		} else {
			const embed = new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL({
				dynamic: true,
				format: "png",
				size: 512
			})).setDescription(message.translate("hypixel/main:error")).setThumbnail("https://pbs.twimg.com/profile_images/1346968969849171970/DdNypQdN_400x400.png").setColor("RED")

			if (!result) return message.channel.send({
				embeds: [embed]
			})

			if (result) return result.uuid


		}
	},

	getNum(val) {
		val = +val || 0
		return val;
	},
	async valorantHandler(message, args, type) {
		let username
		let value = args.join(" ").split("#")


		const [user, tag] = (value)
		var result = await this.dataCheck("val", {
			Discord: message.author.id
		});
		console.log(result)
		let output
		let puuid = false
		let url
		let region = false
		let lol

		switch (type) {
			case "mmrh":
				output = "mmr-history";
				break;
			case "mmr":
				output = "mmr"
				break;
			case "mmrf":
				output = "mmr"
				lol = true
				break;
				// case "account":
				// 	output = "account";
				// 	region = true
				// 	 break;
		}
		let data = {}
		data.output = output
		if (args[0] != null || args[0] != undefined) {
			data.id = username
			data.username = `${user}#${tag}`
		} else {
			const embed = new Discord.MessageEmbed().setAuthor(message.author.tag, message.author.displayAvatarURL({
				dynamic: true,
				format: "png",
				size: 512
			})).setDescription(message.translate("hypixel/main:error")).setThumbnail("https://pbs.twimg.com/profile_images/1346968969849171970/DdNypQdN_400x400.png").setColor("RED")

			if (!result) return message.channel.send({
				embeds: [embed]
			})
			else data.puuid = result.puuid
			data.username = `${result.name}#${result.tag}`
			puuid = true
			console.log(result.puuid)
		}
		console.log(output)
		const user1 = encodeURI(user);
		const tag1 = encodeURI(tag)
		username = user1 + "/" + tag1
		if (lol) {
			if (puuid) {
				url = `https://api.henrikdev.xyz/valorant/v2/by-puuid/mmr/${region ? "" : "ap/"}` + data.puuid + "?filter="
			} else {
				url = `https://api.henrikdev.xyz/valorant/v2/mmr/${region ? "" : "ap/"}` + username + "?filter="
			}
		} else if (puuid) {
			url = `https://api.henrikdev.xyz/valorant/v1/by-puuid/${output}/${region ? "" : "ap/"}` + data.puuid
		} else {
			url = `https://api.henrikdev.xyz/valorant/v1/${output}/${region ? "" : "ap/"}` + username
		}

		data.url = url
		data.db = result
		console.log(url)
		return data


	},

	async parseEmoji(player) {
		const hello = await this.dataCheck("Hypixel", {
			uuid: player.uuid
		})
		console.log(hello)
		if (!hello) return ""
		if (hello.emoji) return hello.emoji
		else return "<:check:822695821710852096>"

	},
	getNum(val) {
		val = +val || 0
		return val;
	},
	formatURL(url) {

		if (!url || !url ?.includes('/') || !url ?.includes('.'))
			return false

		if (!/^(?:f|ht)tps?\:\/\//.test(url))
			url = "https://" + url
		return url
	},
	pick(arr, size) {
		if (typeof size === 'undefined') {
			return arr[Math.floor(Math.random() * arr.length)];
		}

		if (size > arr.length) {
			size = arr.length;
		}

		const copy = arr.slice();
		const items = [];

		while (size--) {
			const i = Math.floor(Math.floor() * copy.length);
			const item = copy.splice(i, 1)[0];
			items.push(item);
		}

		return items;
	},
	async changeData(database, collection, SelectParas, UpdateValues) {
		return await mongo.db(database).collection(collection).updateMany(SelectParas, {
			$set: UpdateValues
		}, {
			multi: true
		}, function (err, result) {
			if (err) throw err

			if (result) return result

		})
	}

};