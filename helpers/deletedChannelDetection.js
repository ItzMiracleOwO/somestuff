module.exports = {
    init(client, callback) {
        const Discord = require('discord.js');
        var mongo = require('../mongo');

        async function dataBaseCheck(table,query) {
            return new Promise(promise => {
                mongo.db("zara").collection(table).find(query).toArray(function (err, result) {
                    if (err) throw err;
                    if (result.length == 0) {    //if there is no database
                        promise(null)
                    } else {                    //if there is a database
                        promise(result[0])
                        
                    }
                });
            })
        }
        async function checkDB(channel){
            var query2 = {channelid: channel.id};
            var result = await dataBaseCheck("dvc",query2);
            
            if(result){
                console.log(result.channelid + " result")
                console.log(channel.id + " channel id")
                if (result.channelid !== null) {
                    if(result.channelid == channel.id){
                        mongo.db("zara").collection("dvc").findOneAndDelete(query2, function(err, obj) {
                            if (err) throw err;
                            console.log(obj.result + " document(s) deleted");
                        })
                    }
                }
            }
        }
        client.on('channelDelete', channel => {checkDB(channel)})
    },
}