module.exports = {
    name: 'reset',
    description: 'Manually reset the used words in !roll',
    async execute(message, client) {
        try {
        client.usedWords.clear();
        message.channel.send('Word list has been reset.');
        } catch (error) {
            console.log(error);
        }
    }
}