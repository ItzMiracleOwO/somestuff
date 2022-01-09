const {
    MessageEmbed
} = require("discord.js");
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://sc:Aa20080407@snowcafe.glniy.mongodb.net/sc";
var _db;
module.exports = {
    findMember: async (message, toFind) => {
        let member;
        if (message.mentions && message.mentions.members.size == 0 && message.mentions.users.size > 0) {
            const toFetch = await message.guild.fetchMember(message.mentions.users.first());
            return toFetch;
        } else {
            if (!toFind) return message.member;
            toFind = toFind.toLowerCase();
            member = message.mentions.members.first() || message.guild.members.cache.find((x) => x.user.username.toLowerCase() === toFind) || message.guild.members.get(toFind);
        }
        return member;
    },
    findRole: (message, toFind) => {
        toFind = toFind.toLowerCase();
        const role = message.guild.roles.cache.find((x) => x.name.toLowerCase() === toFind) || message.guild.roles.cache.find((x) => x.name.toLowerCase().startsWith(toFind)) || message.guild.roles.get(toFind);
        return role;
    },
    findChannel: (message, toFind) => {
        toFind = toFind.toLowerCase();
        const channel = message.mentions.channels.first() || message.guild.channels.cache.find((x) => x.name.toLowerCase().startsWith(toFind)) || message.guild.channels.cache.find((x) => x.name.toLowerCase() === (toFind)) || message.guild.channels.cache.get(toFind);
        return channel;
    },
    ErrorMsg: (bot, message, error) => {
        const errEmbed = new MessageEmbed()
            .setTitle("ERROR")
            .setColor("#ff0000")
            .setDescription(error)
            .setAuthor(message.author.username, bot.user.displayAvatarURL)
            .setFooter(bot.user.username, message.author.displayAvatarURL);
        message.channel.send(errEmbed);
    },
    getMember: function (message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.cache.get(toFind);

        if (!target && message.mentions.members)
            target = message.mentions.members.first();

        if (!target && toFind) {
            target = message.guild.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                    member.user.tag.toLowerCase().includes(toFind)
            });
        }

        if (!target)
            target = message.member;

        return target;
    },

    formatDate: function (date) {
        return new Intl.DateTimeFormat('en-US').format(date)
    },

    promptMessage: async function (message, author, time, validReactions) {
        // We put in the time as seconds, with this it's being transfered to MS
        time *= 1000;

        // For every emoji in the function parameters, react in the good order.
        for (const reaction of validReactions) await message.react(reaction);

        // Only allow reactions from the author, 
        // and the emoji must be in the array we provided.
        const filter = (reaction, user) => validReactions.includes(reaction.emoji.name) && user.id === author.id;

        // And ofcourse, await the reactions
        return message
            .awaitReactions(filter, {
                max: 1,
                time: time
            })
            .then(collected => collected.first() && collected.first().emoji.name);
    },

    connectToServer: function (callback) {
        MongoClient.connect(url, {
            useNewUrlParser: true
        }, function (err, client) {
            _db = client.db('Chino');
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    },
    thousands_separators: function (num) {
        var num_parts = num.toString().split(".");
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return num_parts.join(".");
    }

};