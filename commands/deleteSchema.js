const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const testSchema = require('..//src/Schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('delete-schema')
    .setDescription('Testing a schema'),
    run: async ({ interaction }) => {
        const data = await testSchema.find();

        await data.forEach(async d => {
            await testSchema.deleteOne({ name: d.name });
        });

        const embed = new EmbedBuilder()
            .setTitle('Database')
            .setDescription(`Deleted`)
            .setFooter({ text: `${interaction.user.username}` })
            .setTimestamp()
            .setColor('Purple')

        await interaction.reply({embeds: [embed]});
    },
};