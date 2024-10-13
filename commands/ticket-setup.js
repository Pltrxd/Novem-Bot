const { SlashCommandBuilder, EmbedBuilder, ChannelType, ActionRowBuilder, StringSelectMenuBuilder, PermissionsBitField } = require('discord.js');
const ticketSchema = require('../src/Schemas/ticketSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket-setup')
        .setDescription('Setup ticket system')
        .addChannelOption(option => option.setName('channel').setDescription('Channel to send the ticket message').addChannelTypes(ChannelType.GuildText).setRequired(true))
        .addChannelOption(option => option.setName('log').setDescription('Log channel').addChannelTypes(ChannelType.GuildText).setRequired(true))
        .addChannelOption(option => option.setName('general').setDescription('Category: General').addChannelTypes(ChannelType.GuildCategory).setRequired(true))
        .addChannelOption(option => option.setName('service').setDescription('Category: Service').addChannelTypes(ChannelType.GuildCategory).setRequired(true))
        .addChannelOption(option => option.setName('conflict').setDescription('Category: Conflict').addChannelTypes(ChannelType.GuildCategory).setRequired(true))
        .addChannelOption(option => option.setName('partner').setDescription('Category: Partner').addChannelTypes(ChannelType.GuildCategory).setRequired(true)),
    run: async ({ interaction }) => {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return await interaction.reply({ content: 'You need Administrator permission to use this command', ephemeral: true });
        }

        const channel = interaction.options.getChannel('channel');
        const log = interaction.options.getChannel('log');

        const category1 = interaction.options.getChannel('general');
        const category2 = interaction.options.getChannel('service');
        const category3 = interaction.options.getChannel('conflict');
        const category4 = interaction.options.getChannel('partner');

        const data = await ticketSchema.findOne({ Guild: interaction.guild.id });

        if (!data) {
            await ticketSchema.create({
                Guild: interaction.guild.id,
                ChannelGeneral: category1.id,
                ChannelService: category2.id,
                ChannelConflict: category3.id,
                ChannelPartner: category4.id,
                Log: log.id,
                Ticket: 'first'
            });
        } else {
            await interaction.reply({ content: 'You already have ticket message set up, run /ticket-disable to remove it' });
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle('👋🏻｜ Welcome to Novem Tech Support! ｜🎫')
            .setDescription(`
                Thank you for reaching out to us. We're here to assist you with any questions or issues you may have. Please select one of the following support categories to help us direct your request to the right team:

- **☎️｜General Support:** 
For all inquiries related to our services, troubleshooting, or any other general questions.
- **🔨｜Custom Order Support:** 
Need assistance with a custom order? We’re here to guide you through the process and address any specific needs.
- **⏰｜Conflict Report:**
 If you’ve encountered any issues or disputes, report them here and our team will work to resolve them promptly.
- **🤝｜Partnership Support:**
 Interested in partnering with Novem or need assistance with an existing partnership? Reach out to our dedicated team.
`)
            .setFooter({ text: `${interaction.guild.name}` })
            .setColor('Purple');

        const menu = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('select')
                    .setMaxValues(1)
                    .setPlaceholder('Ticket categories')
                    .addOptions(
                        {
                            label: 'General Assistance',
                            value: 'Subject: General Assistance'
                        },
                        {
                            label: 'Service Ticket',
                            value: 'Subject: Service Ticket'
                        },
                        {
                            label: 'Conflict Ticket',
                            value: 'Subject: Conflict Ticket'
                        },
                        {
                            label: 'Partnership Ticket',
                            value: 'Subject: Partnership Ticket'
                        }
                    )
            );

        await channel.send({ embeds: [embed], components: [menu] });
        await interaction.reply({ content: `Ticket system setup completed in ${channel}`, ephemeral: true });
    },
};