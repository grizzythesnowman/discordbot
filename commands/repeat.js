module.exports = {
    name: 'repeat',
    description: "Toggle if user wants non/repeating questions.",
    async execute(message, client) {
        try {
            // Check if the user wants repeating words or not
            const repeat = (client.repeat) ? false : true;
            client.repeat = repeat;
            message.channel.send(`Repeat: ${repeat}`);
        } catch (error) {
            console.log(error);
        }
    }
}