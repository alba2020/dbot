
const config = require('../config')
const { increaseNMembers } = require('../db')

let text = 'Привет, участник! Твой порядковый номер на рукаве: {}.'
text += 'На нашем сервере ты не найдешь ничего, кроме боли и страданий.'
text += 'Беги отсюда, пока не поздно. Беги, сука, быстрей, пока тьма не поглотила тебя.'

module.exports = async function(client, member) {
    if (member.guild.id !== config.guildId) return;

    // const saved = await saveUser(member.user)

    // client.channels.get(config.channels.welcome).send(member,
    //     text.replace('{}', getNumberOfMembers(client))

    const n = await increaseNMembers()

    client.channels
        .get(config.channels.welcome)
        .send(text.replace('{}', n + 1))
}
