const { SlashCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField, ActionRow } = require('discord.js');
const ticketSchema = require('../src/Schemas/ticketSchema');
require('dotenv').config();

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket-assign')
    .setDescription('Assign an user to the ticket')
    .addUserOption(option => option.setName('user').setDescription('User to assign').setRequired(true))
    .addStringOption(option => option.setName('job').setDescription('User job in here').setRequired(true)
    .addChoices(
        { name: 'Scripting', value: 'scripter' },
        { name: 'Building', value: 'building' },
        { name: 'Modeling', value: 'modeler' },
        { name: 'None', value: 'none' },
    )),
    run: async ({ interaction }) => {
        const supportRole = process.env.TICKET_SUPPORT_ID;
        const user = interaction.options.getUser('user');
        const job = interaction.options.get('job').value;

        if (!interaction.member.roles.cache.has(supportRole)) return await interaction.reply({ content: 'Only ticket support can do this', ephermal: true }) 
            try {
                //await interaction.deferReply();

                const channel = interaction.channel;
                
                if (!channel.name.startsWith('ticket-')) {
                    return await interaction.reply({ content: 'This command can only be used in ticket channels.', ephemeral: true });
                }

                await channel.permissionOverwrites.create(user, {
                    ViewChannel: true,
                    SendMessages: true,
                });
                
                const dmEmbed = new EmbedBuilder()
                    .setTitle(`You have been assigned to a ticket: <#${channel.id}>`)
                    .setDescription(`Your job: ${job}`)
                    .setFooter({ text: `${interaction.guild.name}` })
                    .setTimestamp()
                    .setColor('Purple');

                await user.send({ embeds: [dmEmbed] }).catch(err => {
                    console.error('Error sending DM:', err);
                });

                await interaction.reply({ content: `${user} assigned: ${job}`, components: [] });
            } catch (error) {
                console.error('Error handling close ticket interaction:', error);
            }
    },
};