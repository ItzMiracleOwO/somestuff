module.exports = {
	token: "",
	support: {
		id: "", 
		logs: "", 
		message : ""
	},
	mongoDB: "", // The URl of the mongodb database
	prefix: "d-", 
	embed: {
		color: "#87cefa", 
		footer: "mDefender | 伺服器保護" 
	},
	defaultLanguage: "Chinese", 
	owner: [""],
	Spotify : {
		ClientID : "",
		ClientSecret : ""
	},
	Lavalink: {
		id : "Main",
		host : "localhost",
		pass : "",
		port : 2333,
		secure: false, // Set this to true if the lavalink uses SSL or you're hosting lavalink on repl.it
	},
	apiKeys: {
		// FORTNITE FNBR: https://fnbr.co/api/docs
		fortniteTRN: "",
		// DBL: https://discordbots.org/api/docs#mybots
		dbl: "",
		// AMETHYSTE: https://api.amethyste.moe
		amethyste: "",

		osu: "",

		dblStats : "",

		hypixel : "",

		CLARIFAI : "",

		twitch: "",
		
		darkbot : ""
	},
	status: [
        {
            name: "Bot is Current Test Version ",
            type: "LISTENING"
        }
	],
	webhook:{
		id : "",
		token : "-",
	}
};
