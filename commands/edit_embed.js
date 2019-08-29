
const { createEmbed } = require('../utils')


module.exports = async function(client, message, args) {

    var [msgId, ...params] = args
    
    var s = params.join('')
    console.log('-----------------')
    console.log(s)
    console.log('-----------------')
    var e = JSON.parse(s)

    const embed = createEmbed(e)

    // message.channel.send('text', {
    //     embed: embed
    // })
    // const sentMsg = await message.channel.send(embed)
    // console.log(sentMsg.id)

    let msg = message.channel.messages.find(msg => msg.id === msgId)
    if (!msg) {
        message.channel.send('Сообщение не найдено')
        return
    }

    msg.edit(embed).catch(console.error)
}

module.exports.aliases = ['ee']
