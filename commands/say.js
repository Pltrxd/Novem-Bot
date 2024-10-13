const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Make the bot say something')
    .addStringOption(option => option.setName('message').setDescription('Message for bot to say').setRequired(true)),
    run: async ({ interaction }) => {
        const msg = interaction.options.get('message').value;
        const channel = interaction.channel;

        const supportRole = process.env.TICKET_SUPPORT_ID;
        if (!interaction.member.roles.cache.has(supportRole)) return await interaction.reply({ content: 'Only ticket support can do this', ephermal: true })
        
        await channel.send({
            content: `${msg}`
        })

        await interaction.reply({
            content: `Sent`,
            ephemeral: true
        });
    },
};