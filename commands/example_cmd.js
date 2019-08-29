
module.exports = function(client, message, args) {
    message.channel.send('this is example command')
}

module.exports.aliases = ['example_alias1', 'example_alias2']
