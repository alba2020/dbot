
const { decreaseNMembers } = require('../db')

module.exports = async function(client, member) {
   
    // console.log('Deleting user', member.id)

    // const res = await User.deleteOne({ discordId: member.id }).exec()
    
    return await decreaseNMembers()
}
