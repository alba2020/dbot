const Discord = require('discord.js')
const mongoose = require('mongoose')

const client = new Discord.Client()
client.commands = {}

mongoose.connect(
    'mongodb+srv://trash:secret123@cluster0-off3z.mongodb.net/apple?retryWrites=true&w=majority',
    { useNewUrlParser: true, useCreateIndex: true }
).then (conn => {
    console.log('DB connected')
    loadEvents()
    loadCommands()
    login()
})

function loadEvents() {
    console.log('=========== loading events =============')
    var normalizedPath = require("path").join(__dirname, "events");
    require("fs").readdirSync(normalizedPath).forEach(function(fileName) {
        var handler = require("./events/" + fileName);
        let eventName = fileName.replace(/\.[^/.]+$/, "") // drop extension
        client.on(eventName, handler.bind(null, client))
        console.log(`${fileName} loaded`)
    })
    console.log('=========================================')
}

function loadCommands() {
    console.log('=========== loading commands =============')
    var normalizedPath = require("path").join(__dirname, "commands");
    require("fs").readdirSync(normalizedPath).forEach(function(fileName) {
        var handler = require("./commands/" + fileName);
        let cmdName = fileName.replace(/\.[^/.]+$/, "") // drop extension
        client.commands[cmdName] = handler
        console.log(`command ${cmdName} loaded`)
        handler.aliases.forEach(aliasName => {
            client.commands[aliasName] = handler
            console.log(`setting alias ${aliasName}`)
        })
    })
    console.log('=========================================')
}

// setTimeout(function() {
//     console.log('Done');
// }, 3000);

function login() {
    // // Get your bot's secret token from:
    // // https://discordapp.com/developers/applications/
    // // Click on your application -> Bot -> Token -> "Click to Reveal Token"
    bot_secret_token = "NjExNjY1MDU4ODM3MDM3MDY2.XVXIYw.wwFbaBL3NsrfCHyeSL73VvVaifM"
    client.login(bot_secret_token)
}
