const discord = require("discord.js");
const botConfig = require("./config.json");



const fs = require("fs");

const active = new Map();

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen!`)

        bot.commands.set(fileGet.help.name, fileGet);

    })
});


bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`);

    bot.user.setActivity("Music", { type: "LISTENING" });
})



bot.on("message", async message => {


    //Als bot bericht stuurt stuur dan return
    if (message.author.bot) return;

    if (message.channel.type === "dm") return;



    var prefix = "!";

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var arguments = messageArray.slice(1);

    var commands = bot.commands.get(command.slice(prefix.length));


    var options = {

        active: active

    }

    var args = messageArray.slice(1);

    if (commands) commands.run(bot, message, args, options)





    if (!commands) {

    }
    
    

});

bot.login(process.env.token)