const mongodb = require('mongodb');
const MongoDB = "mongodb+srv://sc:Aa20080407@snowcafe.glniy.mongodb.net/sc?authSource=admin&replicaSet=atlas-cg3bb4-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"
const mongo = new mongodb.MongoClient(MongoDB, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	});
try {
	mongo.connect();
} catch (error) {
	console.error(error);
}
module.exports = mongo;