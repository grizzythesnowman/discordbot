module.exports = {
    name: 'helpls',
    description: 'Displays all available commands',
    async execute(message, commands) {
        let helpMsg = 'These are all my commands: \n\n';
        commands.forEach(command => {
            helpMsg += `**${command.name}**: ${command.description}\n`;
        });
        message.channel.send(helpMsg);
    }
};