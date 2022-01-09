const Command = require("../../base/Command.js")
const Discord = require("discord.js");
const { embed } = require("../../config.js");
const mojangjs = require('mojangjs');
class key extends Command {
    constructor (client) {1
        super(client, {
            name: "key",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ "key" ,"keys"  ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: true,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        const { Errors } = require('hypixel-api-reborn');
        const mongo = require("../../mongo")
        const Hypixel = require('hypixel-api-reborn');
        const hypixel = require('../../helpers/hypanke')(this.client.config.apiKeys.hypixel)
        const pagination = require('discord.js-pagination')
        
    
        
        hypixel.getKeyInfo().then(keyinfo => {
            const uuid = keyinfo.owner
            mojangjs.getNameFromUUID(uuid).then(name => {
    

              const Embed = new Discord.MessageEmbed()
              var keyidd = keyinfo.key.length;
              var ids = keyinfo.key.slice(0,(keyidd / 2))
              for (var x = 0; x <= (keyidd / 2) - 1;x++){
                ids += "×"
              }
          
              Embed.addField("Owner Of API Key" , name , true)
              Embed.addField("Key" , ids , true)
              Embed.addField("limitPerMinute:" , keyinfo.limitPerMinute , true)
              Embed.addField("requestsInPastMin:" ,keyinfo.requestsInPastMin , true)
              Embed.addField("Reset After" , keyinfo.resetsAfter , true)
              Embed.addField("Total Requests" , keyinfo.totalRequests , true)
              Embed.setFooter(this.client.config.embed.footer , this.client.user.displayAvatarURL())

              message.channel.send({embeds :[Embed]})
          })
          }
          ).catch(e => {
            console.error(e);
          });


    }}
module.exports = key;