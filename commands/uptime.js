const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const client = require('../src/index.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Return bot uptime'),
    run: ({ interaction }) => {
        let totalSeconds = (client.uptime / 1000);
        let days = Math.floor(totalSeconds / 86400);
        totalSeconds %= 86400;
        let hours = Math.floor(totalSeconds / 3600);
        totalSeconds %= 3600;
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = Math.floor(totalSeconds % 60);
        let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

        const embed = new EmbedBuilder()
            .setTitle('Uptime')
            .setDescription(`${uptime}`)
            .setFooter({ text: `${interaction.user.username}` })
            .setTimestamp()
            .setColor('Purple')
        
        interaction.reply({embeds: [embed]});
    },
};