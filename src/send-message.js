require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

const roles = [
    {
        id: '1266361349135536179',
        label: 'Member'
    },
]

client.on('ready', async (c) => {
    try {
        const channel = await client.channels.cache.get('1266361819321339935');
        if (!channel) return;

        const row = new ActionRowBuilder();

        roles.forEach((role) => {
            row.components.push(
                new ButtonBuilder()
                .setCustomId(role.id)
                .setLabel('Verify ✅')
                .setStyle(ButtonStyle.Success)
            )
        });

        await channel.send({
            content: 'Click the button below to verify',
            components: [row],
        });

        process.exit()
    } catch (error) {
        console.log(`Error: ${error}`);
    }
});

client.login(process.env.TOKEN);