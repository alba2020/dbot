
const { saveNMembers } = require('../db')
const { updateStatistics, getNumberOfMembers } = require('../utils')

module.exports = async function(client) {

    console.log("Client ready. Connected as " + client.user.tag)

    client.guild = client.guilds.first()
    console.log('Server: ' + client.guild.name)

    // client.guild.members.filter(m => !m.user.bot).forEach(async m => {
        // console.log(m.user)
        // console.log('member id', m.id, 'user id', m.user.id)

        // let discordId = m.user.id
        // const exists = await User.findOne({ discordId: discordId }).exec()
        // if (exists) {
        //     console.log(`${exists.name} (${discordId}) found`)
        //     return
        // } else {
        //     const saved = await saveUser(m.user)
        //     console.log('new user', saved.name)
        // }
    // })

    const n = await saveNMembers(getNumberOfMembers(client))
    console.log('Участников на сервере: ' + n)

    let timer = setInterval(updateStatistics.bind(null, client), 5000)
}
