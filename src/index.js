require('dotenv').config();
const { Client, IntentsBitField, PermissionsBitField,EmbedBuilder, ActivityType, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ButtonBuilder,ButtonStyle, ChannelType, StringSelectMenuBuilder } = require('discord.js');
const { CommandHandler } = require('djs-commander');
const mongoose = require('mongoose');
const path = require('path');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

module.exports = client;

new CommandHandler({
    client,
    commandsPath: path.join(__dirname, '../commands'),
    eventsPath: path.join(__dirname, '../events'),
    testServer: process.env.GUILD_ID,
});

const ticketSchema = require('./Schemas/ticketSchema');

client.on('interactionCreate', async (interaction) => {
    if(interaction.isButton()) return;
    if(interaction.isChatInputCommand()) return;

    const modal = new ModalBuilder()
        .setTitle('Please fill out with more information')
        .setCustomId('modal')

    const reason = new TextInputBuilder()
        .setCustomId('reason')
        .setRequired(true)
        .setLabel('Reason and details')
        .setPlaceholder('Specify us a reason for opening this ticket')
        .setStyle(TextInputStyle.Paragraph)

    const firstActionRow = new ActionRowBuilder().addComponents(reason);

    modal.addComponents(firstActionRow);

    let choices;
    if (interaction.isStringSelectMenu()) {
        choices = interaction.values;

        const result = choices.join('');
        
        const data = await ticketSchema.findOne({ Guild: interaction.guild.id });
        
        if (data) {
            const filter = { Guild: interaction.guild.id };
            const update = { Ticket: result };

            ticketSchema.updateOne(filter, update, {
                new: true
            }).then(value => {
                console.log(value);
            });
        }
    }


    if (!interaction.isModalSubmit()) {
        if (interaction.customId === 'select') {
            interaction.showModal(modal)
        }
    }
})

client.on('interactionCreate', async (interaction) => {
    if (interaction.isModalSubmit()) {
        if (interaction.customId === 'modal') {
            try {
                const data = await ticketSchema.findOne({ Guild: interaction.guild.id });
                
                const reasonInput = interaction.fields.getTextInputValue('reason');
            
                const posChannel = interaction.guild.channels.cache.find(c => c.name === `ticket-${interaction.user.id}`);
                if (posChannel) {
                    return await interaction.reply({ content: `You already have a ticket open - ${posChannel}`, ephemeral: true });
                }
                
                switch (data.Ticket) {
                    case "Subject: General Ticket":
                        var category = data.ChannelGeneral;
                        break;
                    case "Subject: Service Ticket":
                        var category = data.ChannelService;
                        break;
                    case "Subject: Conflict Ticket":
                        var category = data.ChannelConflict;
                        break;
                    case "Subject: Partnership Ticket":
                        var category = data.ChannelPartner;
                        break;
                }
                
                //const category = data.Channel;
                
                const dateOptions = {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric', 
                    minute: 'numeric', 
                    second: 'numeric', 
                    timeZoneName: 'short'
                };

                const embed = new EmbedBuilder()
                    .setTitle(`${interaction.user.username}'s Ticket`)
                    .setDescription('Thanks for opening a ticket at Novem, please describe your issue until the support gets to you.')
                    .setThumbnail(interaction.guild.iconURL())
                    .addFields({ name: 'User', value: `<@${interaction.user.id}>` })
                    .addFields({ name: 'User ID', value: `${interaction.user.id}` })
                    .addFields({ name: 'Created At', value: `${interaction.user.createdAt.toLocaleDateString('en-US', dateOptions)}` })
                    .addFields({ name: 'Joined At', value: `${interaction.member.joinedAt.toLocaleDateString('en-US', dateOptions)}` })
                    .addFields({ name: 'Type', value: `${data.Ticket}` })
                    .addFields({ name: 'Reason', value: `${reasonInput}` })
                    .setFooter({ text: `${interaction.guild.name}` })
                    .setTimestamp()
                    .setColor('Purple');
                    
                let channel = await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.id}`,
                    type: ChannelType.GuildText,
                    parent: category,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                        },
                        {
                            id: process.env.TICKET_SUPPORT_ID,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                        },
                    ],
                });
                
                const logEmbed = new EmbedBuilder()
                    .setTitle('Log: Ticket Created')
                    .setDescription(`${channel}`)
                    .setThumbnail(interaction.guild.iconURL())
                    .addFields({ name: 'User', value: `<@${interaction.user.id}>` })
                    .addFields({ name: 'Type', value: `${data.Ticket}` })
                    .addFields({ name: 'Reason', value: `${reasonInput}` })
                    .setFooter({ text: `${interaction.guild.name}` })
                    .setTimestamp()
                    .setColor('Green');

                const logChannel = interaction.guild.channels.cache.find(ch => ch.id === data.Log);
                
                let msg = await channel.send({ embeds: [embed], content: "<@&1260958532795236556>", components: [] });
                let log = await logChannel.send({ embeds: [logEmbed], components: [] });

                await interaction.reply({ content: `Your ticket is now open in ${channel}`, ephemeral: true });
            
            } catch (error) {
                console.error('An error occurred:', error);
            }
        }
    }
});

client.login(process.env.TOKEN);