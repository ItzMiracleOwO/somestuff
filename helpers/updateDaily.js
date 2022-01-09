const Discord = require("discord.js");
const mongo = require("../mongo")
const CronJob = require('cron').CronJob;
const fetch = require("node-fetch");
require('date.format');
module.exports = {
    
	/**
     * Starts checking...
     * @param {object} client The Discord Client instance
     */
	async init(client){
        new CronJob('*	*	*	*	*	', function() {
     
            }, null, true, 'America/Atikokan').start();

        let dbName = "test"
        let updateDaily = async() => {
            let db = mongo.db("zara")
            db.collection("Chino").find({}).toArray(function(err, docs) {
            
                for (const value of docs) {
                    fetch(`https://api.sk1er.club/player/${value.uuid}`)
                    .then(res => res.json())
                    .then(( player ) => {
                        const player_uuid = player["player"].uuid
                         db.collection(dbName).findOne({"uuid" : player_uuid})
                         .then(doc=>{
                             if(doc){
                             let bedwars
                             if(player["player"]["stats"]["Bedwars"] === undefined){bedwars = null } else {
                           
                               var bwbedb =player["player"]["stats"]["Bedwars"]["beds_broken_bedwars"];
                               var bwbedl =player["player"]["stats"]["Bedwars"]["beds_lost_bedwars"];
                               var bwfdeath =player["player"]["stats"]["Bedwars"]["final_deaths_bedwars"];
                               var bwloss = player["player"]["stats"]["Bedwars"]["losses_bedwars"];
                               var bwwins = player["player"]["stats"]["Bedwars"]["wins_bedwars"];
                               var bwkills = player["player"]["stats"]["Bedwars"]["kills_bedwars"];
                               var bwdeaths = player["player"]["stats"]["Bedwars"]["deaths_bedwars"];
                               var bwfkill = player["player"]["stats"]["Bedwars"]["final_kills_bedwars"]
                               var bwgame = player["player"]["stats"]["Bedwars"]["games_played_bedwars"]
                               bedwars = {
                                 "kills" : bwkills,
                                 "deaths" : bwdeaths,
                                   "losses": bwloss,
                                   "f_kills" :bwfkill,
                                   "f_deaths" : bwfdeath,
                                   "wins": bwwins,
                                   "b_broken" : bwbedb,
                                   "b_lost" : bwbedl,
                                   "playedGames" : bwgame,
                                   
                               }}
                             let mw 
                             if(player["player"]["stats"]["Walls3"]===undefined){mw = null} else {
                               
                    
                               var mwwins = player["player"]["stats"]["Walls3"]["wins"] ;
                               var mwassists = player["player"]["stats"]["Walls3"]["assists"];
                               var mwfdeaths = player["player"]["stats"]["Walls3"]["final_deaths"];
                               var mwplayed = player["player"]["stats"]["Walls3"]["games_played"];
                               var mwkills = player["player"]["stats"]["Walls3"]["kills"];
                               var mwloss = player["player"]["stats"]["Walls3"]["losses"];
                               var mwdeaths = player["player"]["stats"]["Walls3"]["deaths"];
                               var mwfassists = player["player"]["stats"]["Walls3"]["final_assists"]
                               var mwfkills = player["player"]["stats"]["Walls3"]["final_kills"]
                    
                               mw = {
                                 "wins": mwwins,
                                 "losses": mwloss,
                                 "kills": mwkills,
                                 "deaths" : mwdeaths,
                                 "assists": mwassists,
                                 "f_kills" : mwfkills,
                                 "f_deaths" : mwfdeaths,
                                 "f_assists": mwfassists,
                                 "playedGames" : mwplayed
                               }
                    
                             }
                             let sw 
                    
                             if(player["player"]["stats"]["SkyWars"] === undefined){sw = null} else {
                             
                               var swheads = player["player"]["stats"]["SkyWars"]["heads"];
                               var swloss = player["player"]["stats"]["SkyWars"]["losses"];
                               var swwins = player["player"]["stats"]["SkyWars"]["wins"];
                               var swkills = player["player"]["stats"]["SkyWars"]["kills"];
                               var swdeaths = player["player"]["stats"]["SkyWars"]["deaths"];
                               var swgame = player["player"]["stats"]["SkyWars"]["games"];
                               var swshard = player["player"]["stats"]["SkyWars"]["shard"]||0;
                               var swexp =  player["player"]["stats"]["SkyWars"]["skywars_experience"] 
                    
                    
                               sw = {
                                 "wins": swwins,
                                 "losses": swloss,
                                 "kills": swkills,
                                 "deaths" : swdeaths,
                                 "heads" : swheads,
                                 "exp" : swexp,
                                 "shards" : swshard,
                                 "playedGames" : swgame
                               }
                    
                    
                               var select = {
                                 "uuid":player_uuid,
                                 }
                             var update = {
                                 "uuid": player_uuid,
                                 "registeredAt": Date.now(),
                                 mw,
                                 sw,
                                 bedwars
                                     }
                    
                    
                                      changeData("Chino" , dbName , select , update)
                                 }}
                             })
                    })
                }
         
            })
        } // update daily {}

    }
}