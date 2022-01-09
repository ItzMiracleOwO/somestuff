const { registerFont } = require('canvas');


registerFont('./assets/fonts/minecraft/Minecraft-Regular.otf', {family: 'Minecraft'});
registerFont('./assets/fonts/setofont.ttf', {family: 'setofont'});

//registerFont('./assets/fonts/minecraft/Minecraftia-Regular.ttf', {family: 'Minecraftia'});
registerFont( './assets/fonts/minecraft/minecraft-bold.otf', {family: 'Minecraft', weight:'bold'});
registerFont('./assets/fonts/minecraft/minecraft-bold-italic.otf', {family: 'Minecraft', weight:'bold', style:'italic'});
registerFont( './assets/fonts/minecraft/minecraft-italic.otf', {family: 'Minecraft', style:'italic'});
registerFont( './assets/fonts/zh-cn.ttf', {family: "Roboto"});

const colors = {
    '0': {color:'000000',textshadow:'000000'},
    '1': {color:'0000AA',textshadow:'00006A'},
    '2': {color:'00AA00',textshadow:'006A00'},
    '3': {color:'00AAAA',textshadow:'006A6A'},
    '4': {color:'AA0000',textshadow:'6A0000'},
    '5': {color:'AA00AA',textshadow:'6A006A'},
    '6': {color:'FFAA00',textshadow:'BF6A00'},
    '7': {color:'999999',textshadow:'595959'},
    '8': {color:'3f3f3f',textshadow:'000000'},
    '9': {color:'5555FF',textshadow:'1515BF'},
    'a': {color:'55FF55',textshadow:'15BF15'},
    'b': {color:'55FFFF',textshadow:'15BFBF'},
    'c': {color:'FF5555',textshadow:'BF1515'},
    'd': {color:'FF55FF',textshadow:'BF15BF'},
    'e': {color:'FFFF55',textshadow:'BFBF15'},
    'f': {color:'FFFFFF',textshadow:'BFBFBF'}
};


function or(a, b){
    return (typeof a === 'undefined') ? b : a;
}

const measure = (text,size,cvs) => {
    const ctx = cvs.getContext('2d');
    let bold = false;
    let len = size*0.05;
    for(const part of text.split('§')){
        if(part.charAt(0)==='l') bold = true;
        else if (part.charAt(0)==='r') bold = false;
        ctx.font = `${bold?'bold':''} ${size}px "Minecraftia"`;
        len += ctx.measureText(part.substring(1)).width;
    }
    return len;
}

/**
 * 
 * @param {*} cvs 
 * @param {string} msg 
 * @param {{x:number,y:number,size:number,shadow:boolean,star:boolean}} options 
 */
 const print = (cvs, msg, options={}) =>{
    const x = or(options.x);
    const y = or(options.y);
    const size = or(options.size,40);
    if(msg.includes("&".replace(/&/gi , "§")))
    if(!msg.startsWith('§'))msg='§7'+msg;
    const ctx = cvs.getContext('2d');
    ctx.fillStyle = "#ffffff";
    let parts = msg.split('§') 
    let position = size*0.05;
    const offSet = Math.max(1,size*0.02);
    const adjustedy = y+size*(5/6);
    let bold = false;
    let italic = false;
    let color = colors['7'];
    for(const part of parts){
        const key = part.charAt(0);
        color = colors[key] || color;
        if(key==='l') bold = true;
        else if(key==='n') italic = true;
        else if(key==='r') {
            bold = false;
            italic = false;
        }
        ctx.font = `${bold?'bold':''} ${italic?'italic':''} ${size}px "setofont"`;
        if(shadow){
            ctx.fillStyle = `#${color.textshadow}`;
            ctx.fillText(part.substring(1),Math.floor(x+position+offSet),Math.floor(adjustedy+offSet));
        }
        ctx.fillStyle = `#${color.color}`;
        ctx.fillText(part.substring(1),Math.floor(x+position),Math.floor(adjustedy));
        
        position += ctx.measureText(part.substring(1)).width;
    }
}

const printText = (cvs, msg, options={}) =>{
    const x = or(options.x);
    const y = or(options.y);
    const size = or(options.size,40);

    if(msg.startsWith("&".replace(/&/gi , "§")))
    if(!msg.startsWith('§'))msg='§7'+msg;
    const ctx = cvs.getContext('2d');
    ctx.fillStyle = "#ffffff";
    let parts = msg.split('§') 
    let position = size*0.05;
    const offSet = Math.max(1,size*0.02);
    const adjustedy = y+size*(5/6);
    let bold = false;
    let italic = false;
 
    let color = colors['7'];
    for(const part of parts){
        const key = part.charAt(0);
        color = colors[key] || color;
        if(key==='l') bold = true;
        else if(key==='n') italic = true;
        else if(key==='r') {
            bold = false;
            italic = false;
        }
        
        ctx.font = `${bold?'bold':''} ${italic?'italic':''} ${size}px "Minecraft"`;
   
            //shadow
            ctx.fillStyle = `#${color.textshadow}`;
            ctx.fillText(part.substring(1),Math.floor(x+position+offSet),Math.floor(adjustedy+offSet));
        
        ctx.fillStyle = `#${color.color}`;
        ctx.fillText(part.substring(1),Math.floor(x+position),Math.floor(adjustedy));
        
        position += ctx.measureText(part.substring(1)).width;
    }
}
const star = (cvs , player , options ={}) =>{
    const x = or(options.x);
    const y = or(options.y);
    const size = or(options.size,40);

    let bw = player.stats.bedwars.level
                            let one = bw.toString().slice(0,1)
                            let two = bw.toString().slice(-3,-2)
                            let three = bw.toString().slice(-2,-1)
                            let four = bw.toString().slice(-1)
                            const star = player.stats.bedwars.level;
                            let Star = `[${player.stats.bedwars.level}✫]`
                            let bedwarsLogo
                            if (star >= 0 && star <= 99) {bedwarsLogo = `§7${Star}`}
                            if (star >= 100 && star <= 199) {bedwarsLogo = `§f${Star}`}
                            if (star >= 200 && star <= 299) {bedwarsLogo = `§6${Star}`}
                            if (star >= 300 && star <= 399) {bedwarsLogo = `§b${Star}`}
                            if (star >= 400 && star <= 499) {bedwarsLogo = `§2${Star}`}
                            if (star >= 500 && star <= 599) {bedwarsLogo = `§3${Star}`}
                            if (star >= 600 && star <= 699) {bedwarsLogo = `§4${Star}`}
                            if (star >= 700 && star <= 799) {bedwarsLogo = `§d${Star}`}
                            if (star >= 800 && star <= 899) {bedwarsLogo = `§9${Star}`}
                            if (star >= 900 && star <= 999) {bedwarsLogo = `§5${Star}`}
                            if (star >= 1000 && star <= 1099) {bedwarsLogo = `§c[§6${one}§e${two}§a${three}§b${four}§d✫§5]`}
                            if (star >= 1100 && star <= 1199) {bedwarsLogo = `§7[§f${one}${two}${three}${four}§7❂]`}
                            if (star >= 1200 && star <= 1299) {bedwarsLogo = `§7[§e${one}${two}${three}${four}§6❂§7]`}
                            if (star >= 1300 && star <= 1399) {bedwarsLogo = `§7[§b${one}${two}${three}${four}§3❂§7]`}
                            if (star >= 1400 && star <= 1499) {bedwarsLogo = `§7[§a${one}${two}${three}${four}§2❂§7]`}
                            if (star >= 1500 && star <= 1599) {bedwarsLogo = `§7[§3${one}${two}${three}${four}§9❂§7]`}
                            if (star >= 1600 && star <= 1699) {bedwarsLogo = `§7[§c${one}${two}${three}${four}§4❂§7]`}
                            if (star >= 1700 && star <= 1799) {bedwarsLogo = `§7[§d${one}${two}${three}${four}§5❂§7]`}
                            if (star >= 1800 && star <= 1899) {bedwarsLogo = `§7[§9${one}${two}${three}${four}§1❂§7]`}
                            if (star >= 1900 && star <= 1999) {bedwarsLogo = `§5[§b${one}${two}${three}${four}§8❂§7]`}
                            if (star >= 2000 && star <= 2099) {bedwarsLogo = `§7[§7${one}§f${two}${three}§7${four}❂§7]`}
                            if (star >= 2100 && star <= 2199) {bedwarsLogo = `§f[${one}§e${two}${three}§6${four}⚝]`}
                            if (star >= 2200 && star <= 2299) {bedwarsLogo = `§6[${one}§f${two}${three}§b${four}§3⚝]`}
                            if (star >= 2300 && star <= 2399) {bedwarsLogo = `§5[${one}§d${two}${three}§6${four}§e⚝]`}
                            if (star >= 2400 && star <= 2499) {bedwarsLogo = `§b[${one}§f${two}${three}§7${four}§8⚝]`}
                            if (star >= 2500 && star <= 2599) {bedwarsLogo = `§f[${one}§a${two}${three}§2${four}⚝]`}
                            if (star >= 2600 && star <= 2699) {bedwarsLogo = `§4[${one}§c${two}${three}§d${four}§5⚝]`}
                            if (star >= 2700 && star <= 2799) {bedwarsLogo = `§e[${one}§f${two}${three}§8${four}§5⚝]`}
                            if (star >= 2800 && star <= 2899) {bedwarsLogo = `§a[${one}§2${two}${three}§6${four}§e⚝]`}
                            if (star >= 2900 && star <= 2999) {bedwarsLogo = `§b[${one}§3${two}${three}§9${four}§1⚝]`}
                            if (star >= 3000 && star <= 3099) {bedwarsLogo = `§e[${one}§6${two}${three}§c${four}§4⚝]`}
                            printText(cvs ,`${bedwarsLogo}`,{x , y , size , shadow:true});
}
const rank = (cvs , player , options={}) =>{
    const x = or(options.x);
    const y = or(options.y);
    const size = or(options.size,40);
    let bedwar = or(options.star,false);
    const mvp_color = {
        "RED" :  `§c`,
        "GOLD" : `§6`,
        "GREEN" : `§a`,
        "YELLOW" : `§e`,
        "LIGHT_PURPLE" : `§d`,
        "WHITE" : `§f`,
        "BLUE" : `§9`,
        "DARK_GREEN" : `§2`,
        "DARK_RED": `§4`,
        "DARK_AQUA" : `§3`,
        "DARK_PURPLE": `§5`,
        "DARK_GRAY": `§8`,
        "BLACK" : `§0`,
        "DARK_BLUE" : `§1`,
        "AQUA": "§b"}
  

    let bw = player.stats.bedwars.level
                            let one = bw.toString().slice(0,1)
                            let two = bw.toString().slice(-3,-2)
                            let three = bw.toString().slice(-2,-1)
                            let four = bw.toString().slice(-1)
                            const star = player.stats.bedwars.level;
                            let Star = `[${player.stats.bedwars.level}✫]`
                            let bedwarsLogo
                            if (star >= 0 && star <= 99) {bedwarsLogo = `§7${Star}`}
                            if (star >= 100 && star <= 199) {bedwarsLogo = `§f${Star}`}
                            if (star >= 200 && star <= 299) {bedwarsLogo = `§6${Star}`}
                            if (star >= 300 && star <= 399) {bedwarsLogo = `§b${Star}`}
                            if (star >= 400 && star <= 499) {bedwarsLogo = `§2${Star}`}
                            if (star >= 500 && star <= 599) {bedwarsLogo = `§3${Star}`}
                            if (star >= 600 && star <= 699) {bedwarsLogo = `§6${Star}`}
                            if (star >= 700 && star <= 799) {bedwarsLogo = `§d${Star}`}
                            if (star >= 800 && star <= 899) {bedwarsLogo = `§9${Star}`}
                            if (star >= 900 && star <= 999) {bedwarsLogo = `§5${Star}`}
                            if (star >= 1000 && star <= 1099) {bedwarsLogo = `§c[§6${one}§e${two}§a${three}§b${four}§d✫§5]`}
                            if (star >= 1100 && star <= 1199) {bedwarsLogo = `§7[§f${one}${two}${three}${four}§7❂]`}
                            if (star >= 1200 && star <= 1299) {bedwarsLogo = `§7[§e${one}${two}${three}${four}§6❂§7]`}
                            if (star >= 1300 && star <= 1399) {bedwarsLogo = `§7[§b${one}${two}${three}${four}§3❂§7]`}
                            if (star >= 1400 && star <= 1499) {bedwarsLogo = `§7[§a${one}${two}${three}${four}§2❂§7]`}
                            if (star >= 1500 && star <= 1599) {bedwarsLogo = `§7[§3${one}${two}${three}${four}§9❂§7]`}
                            if (star >= 1600 && star <= 1699) {bedwarsLogo = `§7[§c${one}${two}${three}${four}§4❂§7]`}
                            if (star >= 1700 && star <= 1799) {bedwarsLogo = `§7[§d${one}${two}${three}${four}§5❂§7]`}
                            if (star >= 1800 && star <= 1899) {bedwarsLogo = `§7[§9${one}${two}${three}${four}§1❂§7]`}
                            if (star >= 1900 && star <= 1999) {bedwarsLogo = `§5[§b${one}${two}${three}${four}§8❂§7]`}
                            if (star >= 2000 && star <= 2099) {bedwarsLogo = `§7[§7${one}§f${two}${three}§7${four}❂§7]`}
                            if (star >= 2100 && star <= 2199) {bedwarsLogo = `§f[${one}§e${two}${three}§6${four}⚝]`}
                            if (star >= 2200 && star <= 2299) {bedwarsLogo = `§6[${one}§f${two}${three}§b${four}§3⚝]`}
                            if (star >= 2300 && star <= 2399) {bedwarsLogo = `§5[${one}§d${two}${three}§6${four}§e⚝]`}
                            if (star >= 2400 && star <= 2499) {bedwarsLogo = `§b[${one}§f${two}${three}§7${four}§8⚝]`}
                            if (star >= 2500 && star <= 2599) {bedwarsLogo = `§f[${one}§a${two}${three}§2${four}⚝]`}
                            if (star >= 2600 && star <= 2699) {bedwarsLogo = `§4[${one}§c${two}${three}§d${four}§5⚝]`}
                            if (star >= 2700 && star <= 2799) {bedwarsLogo = `§e[${one}§f${two}${three}§8${four}§5⚝]`}
                            if (star >= 2800 && star <= 2899) {bedwarsLogo = `§a[${one}§2${two}${three}§6${four}§e⚝]`}
                            if (star >= 2900 && star <= 2999) {bedwarsLogo = `§b[${one}§3${two}${three}§9${four}§1⚝]`}
                            if (star >= 3000 && star <= 3099) {bedwarsLogo = `§e[${one}§6${two}${three}§c${four}§4⚝]`}

      let rank
      if(!player.rank.includes(player.rank)){rank= player.rank}
      if(player.rank === "Default") {
        rank= "§7[NONE] "}
      if(player.rank=== "VIP") {rank = "§a[VIP§a] "}
      if(player.rank=== "VIP+") {rank = "§a[VIP§6+§a] "}
      if(player.rank === "MVP"){rank = "§b[MVP] "}
      if(player.rank=== "MVP+"){rank = `§b[MVP${!player.plusColor ? mvp_color.RED : mvp_color[player.plusColor.color ]}+§b] `}
      if(player.rank === "OWNER") {rank ="§c[OWNER] "}
      if(player.rank === "Helper") {rank = "§9[HELPER] "}
      if(player.rank === "Moderator") {rank = "§2[MOD] "}
      if(player.rank === "YouTube")  {rank = "§c[§fYOUTUBE§c] "}
      if(player.rank === "Admin")  {rank= "§c[ADMIN] "}
      if(player.rank === "PIG+++") {rank= "§d[PIG§b+++§d] "}
      if(player.rank === "MVP++"){
        if(player.prefixColor.color === "AQUA"){
            rank = `§b[MVP${!player.plusColor ? mvp_color.RED : mvp_color[player.plusColor.color ]}++§b] `
        }
        if(player.prefixColor.color === "GOLD"){
          rank = `§6[MVP${!player.plusColor ? mvp_color.RED : mvp_color[player.plusColor.color ]}++§6] `
        }
      }
      if(bedwar){
        printText(cvs ,`${bedwarsLogo} ${rank + player.nickname}`,{x , y , size , shadow:true});
      }else{
        printText(cvs ,`${rank + player.nickname}`,{x , y , size , shadow:true});
    }
      }
   


module.exports = { measure, printText, rank ,print, star, or, colors };
