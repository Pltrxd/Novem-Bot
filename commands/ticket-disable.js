const { SlashCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField, ActionRow } = require('discord.js');
const ticketSchema = require('../src/Schemas/ticketSchema')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket-disable')
    .setDescription('Disable the ticket message and system'),
    run: async ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply({ content: 'You need Administrator permission to use this command', ephermal: true })
            try {
                await ticketSchema.deleteMany({ Guild: interaction.guild.id });
                await interaction.reply({ content: `Your ticket system has been removed`, ephemeral: true });
            } catch (err) {
                console.error(err);
                await interaction.reply({ content: `An error occurred while removing your ticket system`, ephemeral: true });
            }
    },
};