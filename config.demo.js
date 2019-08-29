
// переименовать в config.js и заполнить данные

module.exports = {

    guildId: '', // сервер, на котором слушаем

    channels: {
        commands: '', // канал, на котором выполняются команды
        
        statMoscowTime: '', // статистика - московское время
        statMessages: '', // статистика - сообщений за сутки
        statMembers: '', // статистика - количество участников

        welcome: '', // канал для приветствий
    },

    roles: {
        admin: '',
        moderator: '',
        eventHost: '',
    }

}
