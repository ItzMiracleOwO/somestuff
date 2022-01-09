const {
	SlashCommandSubcommandBuilder
} = require("@discordjs/builders");
const chalk = require("chalk");
const {
	REST
} = require('@discordjs/rest');
const {
	Routes
} = require('discord-api-types/v9');
const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const fetch = require("node-fetch")
module.exports = class {

	constructor(client) {
		this.client = client;
	}

	async run() {

		const client = this.client;
		console.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`, "ready");


		client.manager.init(client.user.id);
		const autoDetection = require("../helpers/deletedChannelDetection");

		autoDetection.init(client);

		const checkUnmutes = require("../helpers/checkUnmutes.js");
		checkUnmutes.init(client);


		const checkReminds = require("../helpers/checkReminds.js");

		checkReminds.init(client);
	}
}