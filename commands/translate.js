const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
    .setName('translate')
    .setDescription('Translate a text to english')
    .addStringOption((option) => option.setName('text')
    .setDescription('Text to translate')
    .setRequired(true)),
    run: async ({ interaction }) => {
        try {
            const text = interaction.options.get('text').value;
            const response = await fetch(`https://api.kastg.xyz/api/tool/translate?input=${text}&to=en&from=auto`);
            const data = await response.json();
            const translation = data.result[0];
            const fromLanguage = translation.from_language;
            const toLanguage = translation.to_language;
            const inputText = translation.input;
            const outputText = translation.output;

            const embed = new EmbedBuilder()
                .setTitle('Translate')
                .setDescription(`
                Detected language: ${fromLanguage}
                Translation: ${outputText}
                `)
                .setFooter({ text: `${interaction.user.username}` })
                .setTimestamp()
                .setColor('Purple')
        
            interaction.reply({embeds: [embed]});
        } catch (error) {
            const embed = new EmbedBuilder()
                .setTitle('Translate')
                .setDescription(`Error, please try again later`)
                .setFooter({ text: `${interaction.user.username}` })
                .setTimestamp()
                .setColor('Purple')
        
            interaction.reply({embeds: [embed]});
        }
    },
};