

const { createEmbed } = require('../utils')

module.exports = async function(client, message, args) {
    
    // message.channel.send('--- embed test ---')

    // const embed = new RichEmbed()
    //   // Set the title of the field
    //   .setTitle('A slick little embed')
    //   // Set the color of the embed
    //   .setColor(0xFF0000)
    //   // Set the main content of the embed
    //   .setDescription('Hello, this is a slick embed!');
    // // Send the embed to the same channel as the message
    
    // message.channel.send(embed);

    var s = args.join('')
    console.log('-----------------')
    console.log(s)
    console.log('-----------------')
    var e = JSON.parse(s)

    const embed = createEmbed(e)

    // message.channel.send('text', {
    //     embed: embed
    // })
    const sentMsg = await message.channel.send(embed)
    console.log(sentMsg.id)

}

module.exports.aliases = ['e', 'em']
