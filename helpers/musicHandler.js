const languages = require("../languages/language-meta.json").map((l) => l.moment).filter((l) => l !== "en");
languages.forEach((l) => {
	require(`moment/locale/${l}.js`);
});
const {MessageEmbed ,Permissions} = require("discord.js");
const mongo = require("../mongo")
const config = require("../config")
const functions = require("./functions")
class Myclass {

    detectVoiceChannel(message,channel){
        if (!message.member.voice.channel)
        return functions.sendTime(
          message.channel,
          "❌ | **你需要在已給音頻道理!**"
        );
      if (
        message.guild.me.voice.channel &&
        message.member.voice.channel.id !== message.guild.me.voice.channel.id
      )
        return functions.sendTime(
          message.channel,
          ":x: | **你需要在已給音頻道理!**"
        );
        // if(!message.guild.me.permissionsIn(message.member.voice.channel).has([Permissions.FLAGS.CONNECT , Permissions.FLAGS.SPEAK])) return message.channel.send(
        //     {embeds: 
        //         [new MessageEmbed()
        //             .setColor("RED")
        //             .setDescription(`I don't have enough permissions connect your vc please give me permission \`CONNECT\` or \`SPEAK\`.`)]
        //     });
    }
}
module.exports = new Myclass();