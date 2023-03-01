module.exports = {
    name: 'roll',
    description: 'Roll a random word',
    async execute(message, words, repeat, usedWords) {
        let randomWord;
        if (repeat) {
            randomWord = words[Math.floor(Math.random() * words.length)];
        } else {
            const unusedWords = words.filter(word => !usedWords.has(word));
            randomWord = unusedWords[Math.floor(Math.random() * unusedWords.length)];
            usedWords.add(randomWord);
        }
        message.channel.send(`Roll: ${randomWord}`);

        if(usedWords.size === words.length) {
            usedWords.clear();
            console.log('Words have been reset.');
            message.channel.send('All words have been used. Words have now been reset.');
        }
    }
}