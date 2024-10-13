const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Return bot latelancy'),
    run: ({ interaction }) => {
        const embed = new EmbedBuilder()
            .setTitle('Pong!')
            .setDescription(`Pong ${Date.now() - interaction.createdTimestamp}ms`)
            .setFooter({ text: `${interaction.user.username}` })
            .setTimestamp()
            .setColor('Purple')
        
        interaction.reply({embeds: [embed]});
    },
};