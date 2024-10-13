const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const testSchema = require('..//src/Schemas/test');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('test-schema')
    .setDescription('Testing a schema')
    .addStringOption(option => option.setName('schema-input')
    .setDescription('Text to save')
    .setRequired(true)),
    run: async ({ interaction }) => {
        const string = interaction.options.getString('schema-input');

        const embed = new EmbedBuilder()
            .setTitle('Database')
            .setDescription(`Saved`)
            .setFooter({ text: `${interaction.user.username}` })
            .setTimestamp()
            .setColor('Purple')
        

        await testSchema.create({
            name: string
        });

        await interaction.reply({embeds: [embed]});
    },
};