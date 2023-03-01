require('dotenv').config(); ///to access the token
const Discord = require('discord.js');
const {Client, GatewayIntentBits, Embed} = require('discord.js');
const fs = require('fs');

const prefix = '!';
const words = ["apple", "banana", "cherry", "date", "elderberry"];

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMembers, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ], 
});

client.once('ready', c => {
    console.log(`${c.user.tag} is ready and online!`);
});

client.repeat = false;
client.usedWords = new Set();
client.commands = new Discord.Collection();

//.js files in commands folder/load all cmd files
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('messageCreate', message => {
    //console.log('Message Content: ' + message.content); //message properties of user's message
    if(!message.content.startsWith(prefix) || message.author.bot) //to distinguish if the user is not a bot and ignore if prefix isn't included
        return;

    // Parse command and arguments / for multiple commands inline
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    
    const cmd = client.commands.get(command);
    if (!cmd) 
        return message.reply(`Unknown command '${command}'`);
    try {
        switch (command) {
            case 'helpls':
                client.commands.get('helpls').execute(message, client.commands);
                break;
            case 'list':
                client.commands.get('list').execute(message, words);
                break;
            case 'ping':
                client.commands.get('ping').execute(message);
                break;
            case 'repeat':
                client.commands.get('repeat').execute(message, client);
                break;
            case 'reset':
                client.commands.get('reset').execute(message, client);
                break;
            case 'roll':
                client.commands.get('roll').execute(message, words, client.repeat, client.usedWords);
                break;
        } 
    } catch (error) {
        console.error(error);
        message.reply('Error executing command');
    }

    // //no need for now
    // if (message.content.startsWith('!add_word')) {
    //     // Get the word from the message content and add it to the words array
    //     const newWord = message.content.slice(9).toLowerCase().trim();
    //     if (!words.includes(newWord)) {
    //       words.push(newWord);
    //     message.channel.send(`${newWord} has been added to the word list.`);
    //     } else
    //         message.channel.send(`${newWord} is already in the word list.`);
        
    // }
});

client.on('interactionCreate', (interaction) => {
    if(!interaction.isChatInputCommand()) return;
    console.log(interaction.commandName);
    if(interaction.commandName === 'hey') {
        interaction.reply('hey');
    }

    if(interaction.commandName === 'embed') {
        const embed = new Discord.EmbedBuilder()
        .setTitle('Embed Title')
        .setDescription('This is an embed description')
        .setColor('Random')
        .addFields({
            name: 'Field title',
            value: 'Some random value',
            inline: true,
        }, {
            name: 'Field title',
            value: 'Some random value',
            inline: true,
        });

        interaction.reply({ embeds: [embed] });
    }
});

//token of the bot (discord portal)
client.login(process.env.TOKEN);