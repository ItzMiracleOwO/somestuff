const { boolean } = require("mathjs");
const mongoose = require("mongoose")

const genToken = () => {
	let token = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzy0123456789.-_";
	for (let i = 0; i < 32; i++){
		token += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return token;
};

const userSchema = new mongoose.Schema({

	/* REQUIRED */
	id: { type: String }, // Discord ID of the user

	/* ECONOMY (GLOBAL) */
	rep: { type: Number, default: 0 }, // Reputation points of the user
	bio: { type: String }, // Biography of the user
	birthdate: { type: Number }, // Birthdate of the user (the timestamp)
	lover: { type: String }, // The person with whom the user is in a relationship

	/* STATS */
	registeredAt: { type: Number, default: Date.now() }, // Registered date of the user

	/* ACHIEVEMENTS */
	achievements: { type: Object, default: {
		married: {
			achieved: false,
			progress: {
				now: 0,
				total: 1
			}
		},
		work: {
			achieved: false,
			progress: {
				now: 0,
				total: 10
			}
		},
		firstCommand: {
			achieved: false,
			progress: {
				now: 0,
				total: 1
			}
		},
		slots: {
			achieved: false,
			progress: {
				now: 0,
				total: 3
			}
		},
		tip: {
			achieved: false,
			progress: {
				now: 0,
				total: 1
			}
		},
		rep: {
			achieved: false,
			progress: {
				now: 0,
				total: 20
			},
		},
		invite: {
			achieved: false,
			progress: {
				now: 0,
				total: 1
			}
		}
	}},

	/* COOLDOWN */
	cooldowns: { type: Object, default: {
		rep: 0
	}},

	/* OTHER INFORMATIONS */
	afk: { type: String, default: null },
	reminds: { type: Array, default: [] }, 
	premium : {type : Boolean , default : false},
	blacklist : { type : Object , default : {
		enabled : false,
		reason : ""
	}},
	logged: { type: Boolean, default: false },
	heart: {type : Boolean ,  default : false },
	apiToken: { type: String, default: genToken() } 

});

userSchema.method("genApiToken", async function(){
	this.apiToken = genToken();
	await this.save();
	return this.apiToken;
});


module.exports = mongoose.model("User", userSchema);