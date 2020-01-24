const discord = require("discord.js");
 
module.exports.run = async (bot, message, args, ops) => {
 
   
    var guildIDData = ops.active.get(message.guild.id);
 

    if (!guildIDData) return message.channel.send("Er is geen muziek aan het spelen");
 

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send("Verpest niet iemand zijn vibe omdat hij een stom liedje luistert");
 
    
    var amountUsers = message.member.voiceChannel.members.size;
 
    
    var amountSkip = Math.ceil(amountUsers / 2);
 
  
    if (!guildIDData.queue[0].voteSkips) guildIDData.queue[0].voteSkips = [];
 
 
    if (guildIDData.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`Je hebt al eens gestemt ${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);
 
  
    guildIDData.queue[0].voteSkips.push(message.member.id);
 

    ops.active.set(message.guild.id, guildIDData);
 
 
    if (guildIDData.queue[0].voteSkips.length >= amountSkip) {
 
        message.channel.send("Op naar het volgende liedje");
 

        return guildIDData.dispatcher.emit("end");
 
    }
 
    message.channel.send(`Tegevoegd van skip aanvraag. ${guildIDData.queue[0].voteSkips.length}/${amountSkip}`);
 
}
 
module.exports.help = {
    name: "skip"
}