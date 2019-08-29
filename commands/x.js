

const { getMoscowTime }= require('../utils')
const { loadNMembers, increaseNMembers, decreaseNMembers } = require('../db')

module.exports = async function(client, message, args) {
    

    //var channel = message.channel

    // channel.messages.forEach(m => {
    //     channel.send(m)
    // })

    // console.log('size', channel.messages.size)
    // const n = await getNumberOfMessagesToday()
    // message.channel.send('сообщений сегодня ' + n)

    const n = await loadNMembers()
    message.channel.send(`n =  ${n}`)
    if (args[0] == 'plus') {
        message.channel.send('plus')
        increaseNMembers()
    } else if (args[0] == 'minus') {
        message.channel.send('minus')
        decreaseNMembers()
    }
}

module.exports.aliases = []
