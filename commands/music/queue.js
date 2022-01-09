const Command = require("../../base/Command.js")

const { Client, Message, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const pms = require("pretty-ms");
const load = require("lodash");
const prettyMilliseconds = require("pretty-ms");
class queuecommand extends Command {
    constructor (client) {1
        super(client, {
            name: "queue",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ 'q' , "pl" ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
            nsfw: false,
            ownerOnly: false,
            player : true,
            sameVoiceChannel: true,
            inVoiceChannel: true,
            CheckPermChannel : true,
            cooldown: 5000
        });
    }

    async run (message, args, data) {

        const player = this.client.manager.get(message.guild.id);
      
        if(player.queue.length === "0" || !player.queue.length) {
            const embed = new MessageEmbed()
            .setColor("RANDOM")
            .addField(
                "Duration",
                `${
                  this.client.functions.ProgressBar(
                    player.position,
                    player.queue.current.duration,
                    15
                  ).Bar
                } \`[${prettyMilliseconds(player.position, {
                  colonNotation: true,
                })} / ${prettyMilliseconds(player.queue.current.duration, {
                  colonNotation: true,
                })}]\``
              )
            .setDescription(`Now playing [${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${pms(player.position)} / ${pms(player.queue.current.duration)} ]\` • [${player.queue.current.requester}]`)
 
            await message.channel.send({
                embeds: [embed]
            }).catch(() => {});
        } else {
            const queuedSongs = player.queue.map((t, i) => `\`${++i}\` • [${t.title}](${t.uri}) • \`[ ${pms(t.duration)} ]\` • [${t.requester}]`);

            const mapping = load.chunk(queuedSongs, 10);
            const pages = mapping.map((s) => s.join("\n"));
            let page = 0;

            if(player.queue.size < 11) {
                const embed = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`**Now playing**\n[${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${pms(player.position)} / ${pms(player.queue.current.duration)} ]\` • [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`)
                .setTimestamp()
                .setFooter(`Page ${page + 1}/${pages.length}`, message.author.displayAvatarURL({ dynamic: true }))
                .setThumbnail(player.queue.current.thumbnail)
                .setTitle(`${message.guild.name} Queue`)
                .addField(
                    "Duration",
                    `${
                      this.client.functions.ProgressBar(
                        player.position,
                        player.queue.current.duration,
                        15
                      ).Bar
                    } \`[${prettyMilliseconds(player.position, {
                      colonNotation: true,
                    })} / ${prettyMilliseconds(player.queue.current.duration, {
                      colonNotation: true,
                    })}]\``
                  )
                await message.channel.send({
                    embeds: [embed]
                })
            } else {
                const embed2 = new MessageEmbed()
                .setColor("RANDOM")
                .setDescription(`**Now playing**\n[${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${pms(player.position)} / ${pms(player.queue.current.duration)} ]\` • [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`)
                .setTimestamp()
                .setFooter(`Page ${page + 1}/${pages.length}`, message.author.displayAvatarURL({ dynamic: true }))
                .setThumbnail(player.queue.current.thumbnail)
                .setTitle(`${message.guild.name} Queue`)
                .addField(
                    "Duration",
                    `${
                      this.client.functions.ProgressBar(
                        player.position,
                        player.queue.current.duration,
                        15
                      ).Bar
                    } \`[${prettyMilliseconds(player.position, {
                      colonNotation: true,
                    })} / ${prettyMilliseconds(player.queue.current.duration, {
                      colonNotation: true,
                    })}]\``
                  )
                const but1 = new MessageButton()
                .setCustomId("queue_cmd_but_1")
                .setEmoji("⏭️")
                .setStyle("PRIMARY")

                const but2 = new MessageButton()
                .setCustomId("queue_cmd_but_2")
                .setEmoji("⏮️")
                .setStyle("PRIMARY")

                const but3 = new MessageButton()
                .setCustomId("queue_cmd_but_3")
                .setEmoji("⏹️")
                .setStyle("DANGER")

                const row1 = new MessageActionRow().addComponents([
                    but2, but3, but1
                ]);

                const msg = await message.channel.send({
                    embeds: [embed2],
                    components: [row1]
                })

                const collector = message.channel.createMessageComponentCollector({
                    filter: (b) => {
                        if(b.user.id === message.author.id) return true;
                        else {
                            b.reply({
                                ephemeral: true,
                                content: `Only **${message.author.tag}** can use this button, if you want then you've to run the command again.`
                            });
                            return false;
                        };
                    },
                    time: 60000*5,
                    idle: 30e3
                });

                collector.on("collect", async (button) => {
                    if(button.customId === "queue_cmd_but_1") {
                        await button.deferUpdate().catch(() => {});
                        page = page + 1 < pages.length ? ++page : 0;

                        const embed3 = new MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`**Now playing**\n[${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${pms(player.position)} / ${pms(player.queue.current.duration)} ]\` • [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`)
                        .setTimestamp()
                        .setFooter(`Page ${page + 1}/${pages.length}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setThumbnail(player.queue.current.thumbnail)
                        .setTitle(`${message.guild.name} Queue`)
                        .addField(
                            "Duration",
                            `${
                              this.client.functions.ProgressBar(
                                player.position,
                                player.queue.current.duration,
                                15
                              ).Bar
                            } \`[${prettyMilliseconds(player.position, {
                              colonNotation: true,
                            })} / ${prettyMilliseconds(player.queue.current.duration, {
                              colonNotation: true,
                            })}]\``
                          )
                        await msg.edit({
                            embeds: [embed3],
                            components: [row1]
                        })
                    } else if(button.customId === "queue_cmd_but_2") {
                        await button.deferUpdate().catch(() => {});
                        page = page > 0 ? --page : pages.length - 1;

                        const embed4 = new MessageEmbed()
                        .setColor("RANDOM")
                        .setDescription(`**Now playing**\n[${player.queue.current.title}](${player.queue.current.uri}) • \`[ ${pms(player.position)} / ${pms(player.queue.current.duration)} ]\` • [${player.queue.current.requester}]\n\n**Queued Songs**\n${pages[page]}`)
                        .setTimestamp()
                        .setFooter(`Page ${page + 1}/${pages.length}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setThumbnail(player.queue.current.thumbnail)
                        .setTitle(`${message.guild.name} Queue`)
                        .addField(
                            "Duration",
                            `${
                              this.client.functions.ProgressBar(
                                player.position,
                                player.queue.current.duration,
                                15
                              ).Bar
                            } \`[${prettyMilliseconds(player.position, {
                              colonNotation: true,
                            })} / ${prettyMilliseconds(player.queue.current.duration, {
                              colonNotation: true,
                            })}]\``
                          )
                        await msg.edit({
                            embeds: [embed4],
                            components: [row1]
                        }).catch(() => {});
                    } else if(button.customId === "queue_cmd_but_3") {
                        await button.deferUpdate().catch(() => {});
                        collector.stop();
                    } else return;
                });

                collector.on("end", async () => {
                    await msg.edit({
                        components: []
                    })
                });
            }
        }
   
    }
}
module.exports = queuecommand