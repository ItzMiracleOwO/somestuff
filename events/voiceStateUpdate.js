const mongo = require("../mongo")
const Discord = require("discord.js")
voicelist = []
const { VoiceState, MessageEmbed } = require("discord.js");
module.exports = class {

	constructor (client) {
		this.client = client;
	}
  
	async run (old, news) {

	let db 
	db = mongo.db("zara").collection("dvc")

	var query = { channelid: news.channelId };

	db.find(query).toArray( async function(err, docs) {
		const data = docs[0]
		if (!data)  return
	  

      let p = news.guild.channels.cache.get(data.CategoryId)
      let channel = await news.channel.guild.channels.create(`${news.member.user.username}`, { type: 'GUILD_VOICE', parent: p.id })
		  news.setChannel(channel , "dvc")
      voicelist.push(channel.id)

	  
  })

  if (voicelist.includes(old.channelId)) {
    if (old.channel.members.size === 0) {
        news.guild.channels.cache.get(old.channelId).delete()
        let index = voicelist.indexOf(old.channelId);
        if (index > -1) {
            voicelist.splice(index, 1);
        }
    }
  }
  let guildId = news.guild.id;
  const player = this.client.manager.get(guildId);

  // check if the bot is active (playing, paused or empty does not matter (return otherwise)
  if (!player || player.state !== "CONNECTED") return;

  // prepreoces the data
  const stateChange = {};
  // get the state change
  if (old.channel === null && news.channel !== null)
    stateChange.type = "JOIN";
  if (old.channel !== null && news.channel === null)
    stateChange.type = "LEAVE";
  if (old.channel !== null && news.channel !== null)
    stateChange.type = "MOVE";
  if (old.channel === null && news.channel === null) return; // you never know, right
  if (news.serverMute == true && old.serverMute == false)
    return player.pause(true);
  if (news.serverMute == false && old.serverMute == true)
    return player.pause(false);
  // move check first as it changes type
  if (stateChange.type === "MOVE") {
    if (old.channel.id === player.voiceChannel) stateChange.type = "LEAVE";
    if (news.channel.id === player.voiceChannel) stateChange.type = "JOIN";
  }
  // double triggered on purpose for MOVE events
  if (stateChange.type === "JOIN") stateChange.channel = news.channel;
  if (stateChange.type === "LEAVE") stateChange.channel = old.channel;

  // check if the bot's voice channel is involved (return otherwise)
  if (!stateChange.channel || stateChange.channel.id !== player.voiceChannel)
    return;

  // filter current users based on being a bot
  stateChange.members = stateChange.channel.members.filter(
    (member) => !member.user.bot
  );

  switch (stateChange.type) {
    case "JOIN":
      if (stateChange.members.size === 1 && player.paused) {
        let emb = new MessageEmbed()
          .setAuthor(`Resuming paused queue`)
          .setColor("RANDOM")
          .setDescription(
            `Resuming playback because all of you left me with music to play all alone`
          );
        await this.client.channels.cache.get(player.textChannel).send({embeds: [emb]});

        let msg2 = await this.client.channels.cache
          .get(player.textChannel)
          .send({embeds: [player.nowPlayingMessage.embeds[0]]});
        player.setNowplayingMessage(msg2);

        player.pause(false);
      }
      break;
    case "LEAVE":
      if (stateChange.members.size === 0 && !player.paused && player.playing) {
        player.pause(true);

        let emb = new MessageEmbed()
          .setAuthor(`Paused!`)
          .setColor("RANDOM")
          .setDescription(`The player has been paused because everybody left`);
        await this.client.channels.cache.get(player.textChannel).send({embeds: [emb]});
      }
      break;
  }

}}