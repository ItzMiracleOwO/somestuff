const { Guild, Message, MessageEmbed , Interaction } = require("discord.js");
const config = require("../config");
const { APIMessage, Structures } = require("discord.js");
Guild.prototype.translate = function(key, args) {
	const language = this.client.translations.get(this.data.language);
	if (!language) throw "Message: Invalid language set in data.";
	return language(key, args);
};
Interaction.prototype.translate = function(key, args) {
	const language = this.client.translations.get(
		this.guild ? this.guild.data.language : "en-US"
	);
	if (!language) throw "Message: Invalid language set in data.";
	return language(key, args);
};
Interaction.prototype.error = function(key, args, options = {}) {
	options.prefixEmoji = "error";
	return this.replyT(key, args, options);
};	
Interaction.prototype.success = function(key, args, options = {}) {
	options.prefixEmoji = "success";
	return this.replyT(key, args, options);
};	
Interaction.prototype.replyT = function(key, args, options = {}) {
	console.log("hello")
	let string = this.translate(key, args);
	if (options.prefixEmoji) {
		string = `${this.client.customEmojis[options.prefixEmoji]} | ${string}`;
	}
	if (options.edit) {
		return this.edit(string);
	} else {
		return this.reply(string);
	}
};

Message.prototype.translate = function(key, args) {
	const language = this.client.translations.get(
		this.guild ? this.guild.data.language : "en-US"
	);
	if (!language) throw "Message: Invalid language set in data.";
	return language(key, args);
};

// Wrapper for sendT with error emoji
Message.prototype.error = function(key, args, options = {}) {
	options.prefixEmoji = "error";
	return this.sendT(key, args, options);
};

// Wrapper for sendT with success emoji
Message.prototype.success = function(key, args, options = {}) {
	options.prefixEmoji = "success";
	return this.sendT(key, args, options);
};


// Translate and send the message
Message.prototype.sendT = function(key, args, options = {}) {
	let string = this.translate(key, args);
	if (options.prefixEmoji) {
		string = `${this.client.customEmojis[options.prefixEmoji]} | ${string}`;
	}
	if (options.edit) {
		return this.edit(string);
	} else {
		return this.channel.send({content : string});
	}
};
Message.prototype.sendR = function(key, args, options = {}) {
	let string = this.translate(key, args);
	if (options.prefixEmoji) {
		string = `${this.client.customEmojis[options.prefixEmoji]} | ${string}`;
	}
	if (options.edit) {
		return this.edit(string);
	} else {
		return this.reply({content : string});
	}
};

//Format a date
Message.prototype.printDate = function(date, format) {
	return this.client.printDate(date, format, this.guild.data.language);
};

// Convert time
Message.prototype.convertTime = function(time, type, noPrefix) {
	return this.client.convertTime(time, type, noPrefix, (this.guild && this.guild.data) ? this.guild.data.language : null);
};

MessageEmbed.prototype.errorColor = function() {
	this.setColor("#FF0000");
	return this;
};

MessageEmbed.prototype.successColor = function() {
	this.setColor("#32CD32");
	return this;
};

MessageEmbed.prototype.defaultColor = function() {
	this.setColor(config.color);
	return this;
};
