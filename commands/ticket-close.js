const { SlashCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField, ActionRow, Component } = require('discord.js');
const ticketSchema = require('../src/Schemas/ticketSchema')
const discordTranscripts = require('discord-html-transcripts')
const client = require(`../src/index`)
require('dotenv').config()

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ticket-close')
    .setDescription('Close the ticket'),
    run: async ({ interaction }) => {
        const supportRole = process.env.TICKET_SUPPORT_ID;
         
        if (!interaction.member.roles.cache.has(supportRole)) return await interaction.reply({ content: 'Only ticket support can do this', ephermal: true }) 
            try {
                const ticschema = await ticketSchema.findOne({ Guild: interaction.guild.id });
                const channel = interaction.channel;
                const logChannel = interaction.guild.channels.cache.find(ch => ch.id === ticschema.Log);

                if (channel.name.startsWith('ticket-')) {
                    const channelName = channel.name;
                    const userID = channelName.replace("ticket-", "");
                    const ticketOwner = await client.users.fetch(userID);

                    const logEmbed = new EmbedBuilder()
                        .setTitle('Log: Ticket Deleted')
                        .setDescription(`${channel.name} / ${channel}`)
                        .setThumbnail(interaction.guild.iconURL())
                        .addFields({ name: 'Closed by', value: `<@${interaction.user.id}>` })
                        .setFooter({ text: `${interaction.guild.name}` })
                        .setTimestamp()
                        .setColor('Red');
                    
                    const attachment = await discordTranscripts.createTranscript(channel);
                    await logChannel.send({ embeds: [logEmbed], files: [attachment] });

                    await channel.delete();

                    const dmEmbed = new EmbedBuilder()
                        .setTitle('Your ticket has been closed')
                        .setDescription('Thanks for contacting us')
                        .setFooter({ text: `${interaction.guild.name}` })
                        .setTimestamp()
                        .setColor('Purple');

                    await ticketOwner.send({ embeds: [dmEmbed] }).catch(err => {
                        console.error('Error sending DM:', err);
                    });
                } else {
                    return await interaction.reply({ content: 'This command can only be used in ticket channels.', ephemeral: true });
                }
            } catch (error) {
                console.error('Error handling close ticket interaction:', error);
            }
    },
};