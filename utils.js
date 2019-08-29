
const { RichEmbed } = require('discord.js');

const config = require('./config')
const { getNumberOfMessagesToday, loadNMembers } = require('./db')

function _getMoscowTime() {
    var now = new Date()
    return {
        hours: (now.getUTCHours() + 3) % 24, // GMT+3
        minutes: now.getMinutes()
    }
}

const _prependZero = val => ("0" + val).slice(-2)

async function updateStatistics(client) {

    let {hours, minutes} = _getMoscowTime()
    hours = _prependZero(hours)
    minutes = _prependZero(minutes)
    client.channels.get(config.channels.statMoscowTime).setName(`🕓${hours}:${minutes} МСК`)

    let n = await getNumberOfMessagesToday()
    client.channels.get(config.channels.statMessages).setName(`📨Сообщения: ${n}`)

    const nMembers = await loadNMembers()
    client.channels.get(config.channels.statMembers).setName(`💤Участники: ${nMembers}`)
}

const getNumberOfMembers = (client) => {
    let nMembers = 0
    client.guild.members.filter(m => !m.user.bot).forEach(m => {
        nMembers++
    })
    return nMembers
}

function createEmbed(e) {
    const embed = new RichEmbed()
    const fields = ['title', 'description', 'color', 'footer', 'image', 'thumbnail']

    for (let prop in e) {
        if (e.hasOwnProperty(prop)) {
            if (fields.indexOf(prop) !== -1) {
                let methodName = 'set' + prop[0].toUpperCase() + prop.slice(1)
                // console.log('methodName', methodName)
                embed[methodName](e[prop])
            }
        }
    }
    return embed
}

module.exports = {
    updateStatistics,
    getNumberOfMembers,
    createEmbed
}
