
const { Message } = require('../db')

module.exports = async function(client, message, args) {

    let tenMinutesAgo = new Date(); tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10)
    let msTen = await Message.find({
        createdTimestamp: {
            $gt: tenMinutesAgo
        }
    })
    
    message.channel.send('Сообщения за последние 10 минут')    
    message.channel.send(msTen.map(m => {
        return `${m.createdTimestamp}: ${m.user.name}: ${m.content}`
    }))
}

module.exports.aliases = []
