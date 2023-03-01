module.exports = {
    name: 'ping',
    description: 'this is a ping command',
    async execute(message) {
        try {
            message.reply('Pong!');
        } catch (error) {
            console.log(error);
        }
    }
}