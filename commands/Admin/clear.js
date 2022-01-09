const Command = require("../../base/Command.js");

class Clear extends Command {

	constructor (client) {
		super(client, {
			name: "clear",
			dirname: __dirname,
			enabled: true,
			guildOnly: true,
			aliases: [ "clear", "bulkdelete", "purge" ],
			memberPermissions: [ "MANAGE_MESSAGES" ],
			botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS", "MANAGE_MESSAGES" , "MANAGE_CHANNELS" ],
			nsfw: false,
			ownerOnly: false,
			cooldown: 3000
		});
	}

	async run (message, args) {
	let amount = args[0];
		if(!amount || isNaN(amount) || parseInt(amount) < 1){
			return message.error("Administration/clear:MISSING_AMOUNT");
		}

		let int = args[0];
        if (int > 100) int = 100;

        try {
            await message.delete()
            const fetch = await message.channel.messages.fetch({ limit: int });
            const deletedMessages = await message.channel.bulkDelete(fetch, true);

            const results = {};
            for (const [, deleted] of deletedMessages) {
                const user = `${deleted.author.username}#${deleted.author.discriminator}`;
                if (!results[user]) results[user] = 0;
                results[user]++;
            }

            const userMessageMap = Object.entries(results);

            const finalResult = `${deletedMessages.size} message${deletedMessages.size > 1 ? 's' : ''} were removed!\n\n${userMessageMap.map(([user, messages]) => `**${user}** : ${messages}`).join('\n')}`;
            await message.channel.send({ content: finalResult }).then(async (msg) => setTimeout(() => msg.delete(), 5000))
        } catch (err) {
            if (String(err).includes('Unknown Message')) return console.log('[ERROR!] Unknown Message');
        }
	}

}

module.exports = Clear;
