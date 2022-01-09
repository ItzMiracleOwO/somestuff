const Discord = require("discord.js")
const voice = require("@discordjs/voice");
// const { opus, FFmpeg, VolumeTransformer } = require("prism-media");

class Player {
    /**
     * @param {Object} queue Server Queue
     * @param {Client} client Discord.js Client
     */
    constructor(queue, client) {
      this.queue = queue;
      this.client = client;
    }
  
    /**
     * Connect to channel
     * @param {VoiceChannel} channel Voice channel to connect
     */
    async connect(channel) {
      this.queue.connection = await voice.joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });
      this._createPlayer(channel)
      this.queue.connection.on(voice.VoiceConnectionStatus.Disconnected, async (oldState, newState) => {
        try {
          await Promise.race([
            entersState(connection, voice.VoiceConnectionStatus.Signalling, 5000),
            entersState(connection, voice.VoiceConnectionStatus.Connecting, 5000),
          ]);
        } catch (error) {
          this.client.queue.delete(connection.guild.id);
          this.queue.connection.destroy();
        }
      });
    }

}