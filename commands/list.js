module.exports = {
    name: 'list',
    description: 'List all words in the array',
    async execute(message, words) {
        try {
            message.channel.send(`Words in the array: \n${words.join('\n')}`);
        } catch (error) {
            console.log(error);
        }
    }
}