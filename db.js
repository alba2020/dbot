const mongoose = require('mongoose')

// var User = mongoose.model('User', {
//     discordId: {
//         type: String,
//         required: true,
//         unique: true // index, not a validation
//     },
//     name: {
//         type: String,
//         required: true
//     }
// })

var Message = new mongoose.model('Message', {
    discordId: {
        type: String,
        required: true,
        unique: true // index, not a validation
    },
    content: String,
    createdTimestamp: Date,
    user: {
        name: String,
        discordId: String
    }
})

var Record = new mongoose.model('Record', {
    key: String,
    valueStr: String,
    valueNum: Number
})

const N_MEMBERS = 'n_members'

async function saveNMembers(n) {
    let record = await Record.findOne({ key: N_MEMBERS }).exec()
    if (!record) {
        record = new Record({ key: N_MEMBERS, valueNum: n })
    } else {
        record.valueNum = n
    }
    const saved = await record.save()
    return saved.valueNum
}

async function loadNMembers() {
    let record = await Record.findOne({ key: N_MEMBERS }).exec()
    if (!record)
        return 0
    return record.valueNum
}

async function increaseNMembers() {
    const n = await loadNMembers()
    return await saveNMembers(n + 1)
}

async function decreaseNMembers() {
    const n = await loadNMembers()
    return await saveNMembers(n - 1)
}


async function getNumberOfMessagesToday() {
    let today = new Date(); today.setHours(0, 0, 0, 0)
    let msToday = await Message.find({
        createdTimestamp: {
            $gt: today
        }
    }).exec()
    return msToday.length
}

async function saveUser(user) {
    let newUser = new User({ discordId: user.id, name: user.username })
    return await newUser.save()
}

module.exports = {
    // User,
    Message,
    getNumberOfMessagesToday,
    saveUser,
    saveNMembers,
    loadNMembers,
    increaseNMembers,
    decreaseNMembers
}
