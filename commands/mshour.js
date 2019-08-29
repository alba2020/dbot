
const { Message } = require('../db')

module.exports = async function(client, message, args) {

    let thisHour = new Date(); thisHour.setMinutes(0)
    let msH = await Message.find({
        createdTimestamp: {
            $gt: thisHour
        }
    }).exec()

    message.channel.send('Сообщения за последний час')
    message.channel.send(msH.map(m => {
        return `${m.createdTimestamp}: ${m.user.name}: ${m.content}`
    }))
}

module.exports.aliases = []
