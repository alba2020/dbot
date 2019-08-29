
const { User, Message } = require('../db')

var config = require('../config')

module.exports = async function(client, message) {
    
    if (!message || // нет сообщения
        message.author.bot || // автор - бот
        (message.guild && message.guild.id !== config.guildId)) { // не наш сервер
            return
        }

    if (message.content.startsWith("!")) {
        if (message.channel.id === config.channels.commands ||
            message.member.roles.has(config.roles.admin) || 
            message.member.roles.has(config.roles.moderator) ||
            message.member.roles.has(config.roles.eventHost)) {

                let [cmd, ...params] = message.content
                                        .slice(1) // убрать '!'
                                        .split(' ') // сделать массив
                                        .filter(token => token) // убрать пустые строки
                                        .map(token => token.toLowerCase()) // toLowerCase
                
                if (client.commands.hasOwnProperty(cmd)) {
                    message.react("🛐")
                    client.commands[cmd](client, message, params)
                } else {
                    message.channel.send('Неизвестная команда')
                }
            }
        return
    }

    // receivedMessage.react("👍")
    // receivedMessage.channel.send("Message received: " + receivedMessage.content)

    var message = new Message({
        discordId: message.id,
        content: message.content,
        createdTimestamp: message.createdTimestamp,
        user: {
            discordId: message.author.id,
            name: message.author.username,
        }
    })
    // console.log('created', receivedMessage.createdTimestamp)
    const saved = await message.save()
    // console.log('saved', saved)

    Message.countDocuments().exec((err, count) => {
        if (err) {
            console.error(err)
            return
        }
        console.log('total message count:', count)
    })

    


    // console.log('size', receivedMessage.channel.messages.size)
    // console.log('size', receivedMessage.channel.messages)
    // console.log(receivedMessage)
}
