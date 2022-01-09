const Command = require("../../base/Command.js")
const { Util, MessageEmbed, Permissions } = require("discord.js");
const { TrackUtils, Player } = require("erela.js");
const prettyMilliseconds = require("pretty-ms");
const sPlayer = require("../../helpers/player")
class playCommand extends Command {
    constructor (client) {1
        super(client, {
            name: "play",
            dirname: __dirname,
            enabled: true,
            guildOnly: false,
            aliases: [ 'p'  ],
            memberPermissions: [],
            botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ,"CONNECT","SPEAK"],
            nsfw: false,
            ownerOnly: false,
            sameVoiceChannel: true,
            inVoiceChannel: true,
            CheckPermChannel : true,
            cooldown: 5000
        });
    }

    async run (message, args, data) {
      let SearchString = args.join(" ");
        const { convertTime } = this.client.functions
        const { channel } = message.member.voice;
       
        
        this.client.music.detectVoiceChannel(message)
    
        const prefix = this.client.functions.getPrefix(message, data);
        if (!SearchString)
        return this.client.functions.sendTime(
          message.channel,
          `**用法 - **\`${prefix}play [歌曲名稱/鏈接]\``
        );
      if (
        message.guild.me.voice.channel &&
        message.member.voice.channel.id !== message.guild.me.voice.channel.id
      )
        return this.client.functions.sendTime(
          message.channel,
          ":x: | **你必須要在一個語音頻道來使用這個指令!**"
        );

        const emojiaddsong =  this.client.customEmojis.music.addsong
        const emojiplaylist =   this.client.customEmojis.music.playlist
        
        if(SearchString.startsWith("https://open.spotify.com/playlist/")) message.channel.send({ embeds: [new MessageEmbed().setAuthor(`Spotify`, "https://i.imgur.com/cK7XIkw.png").setColor("RANDOM").setTimestamp().setDescription(`加載中, 請稍後...`)]}).then(msg => { setTimeout(() => {msg.delete()}, 3000);
           })
           
        const player = this.client.manager.create({
          guild: message.guild.id,
          voiceChannel: message.member.voice.channel.id,
          textChannel: message.channel.id,
          selfDeafen: true,
          volume: 100,
        });
        
        if (player.state != "CONNECTED") await player.connect();
        try {
          if (SearchString.match(this.client.Lavasfy.spotifyPattern)) {
            await this.client.Lavasfy.requestToken();
            let node = this.client.Lavasfy.nodes.get(this.client.config.Lavalink.id);
            let Searched = await node.load(SearchString);
          if (Searched.loadType === "PLAYLIST_LOADED") {
              let songs = [];
             for (let i = 0; i < Searched.tracks.length; i++)
                songs.push(TrackUtils.build(Searched.tracks[i], message.author));
              player.queue.add(songs);
              if (!player.playing && !player.paused && player.queue.totalSize === Searched.tracks.length)
                player.play();
             const thing = new MessageEmbed()
                 .setColor("RANDOM")
                 .setTimestamp()
                 .setDescription(`${emojiplaylist} **添加到列隊:** [${Searched.playlistInfo.name}](${SearchString}) - [\`${Searched.tracks.length}\`]`)
              return message.channel.send({embeds: [thing]});
         } else if (Searched.loadType.startsWith("TRACK")) {
              player.queue.add(TrackUtils.build(Searched.tracks[0], message.author));
           if (!player.playing && !player.paused && !player.queue.size)
                player.play();
                const thing = new MessageEmbed()
                 .setColor("RANDOM")
                 .setTimestamp()
                 .setDescription(`${emojiplaylist} ***添加到列隊:** - [${Searched.tracks[0].info.title}](${Searched.tracks[0].info.uri})`)
             return message.channel.send({embeds: [thing]});
               } else {
             return message.channel.send({ embeds: [new MessageEmbed().setColor("RANDOM").setTimestamp().setDescription('there were no results found.')]});
            }
          } else {
            let Searched = await player.search(SearchString, message.author);
             if (!player)
               return message.channel.send({ embeds: [new MessageEmbed().setColor("RANDOM").setTimestamp().setDescription("Nothing is playing right now...")]});
    
             if (Searched.loadType === "NO_MATCHES")
               return message.channel.send({ embeds: [new MessageEmbed()].setColor("RANDOM").setTimestamp().setDescription(`No matches found for - [this]${SearchString}`)});
            else if (Searched.loadType == "PLAYLIST_LOADED") {
              player.queue.add(Searched.tracks);
              if (!player.playing && !player.paused &&
                player.queue.totalSize === Searched.tracks.length)
                player.play();
             const thing = new MessageEmbed()
                 .setColor("RANDOM")
                 .setTimestamp()
                 .setDescription(`添加到列隊: [${Searched.playlist.name}](${SearchString}) - \`${Searched.tracks.length}\` songs - \`[${convertTime(Searched.playlist.duration)}]\``)
               return message.channel.send({embeds: [thing]});
            } else {
              player.queue.add(Searched.tracks[0], message.author);
              if (!player.playing && !player.paused && !player.queue.size)
                player.play();
            const thing = new MessageEmbed()
                 .setColor("RANDOM")
                 .setTimestamp()
                 .setDescription(`添加到列隊: \n[${Searched.tracks[0].title}](${Searched.tracks[0].uri}) - \`[${convertTime(Searched.tracks[0].duration)}]\``);
               return message.channel.send({embeds: [thing]});
            }
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    

    
module.exports = playCommand;