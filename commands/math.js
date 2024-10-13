const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    run: ({ interaction }) => {
        const subcommand = interaction.options.getSubcommand();

        if (subcommand === 'sum') {
            const num1 = interaction.options.get('first-number').value;
            const num2 = interaction.options.get('second-number').value;

            const embed = new EmbedBuilder()
                .setTitle('Math: Sum')
                .setDescription(`${num1} + ${num2} = ${num1 + num2}`)
                .setFooter({ text: `${interaction.user.username}` })
                .setTimestamp()
                .setColor('Purple')
        
            interaction.reply({embeds: [embed]});
        }

        if (subcommand === 'sub') {
            const num1 = interaction.options.get('first-number').value;
            const num2 = interaction.options.get('second-number').value;

            const embed = new EmbedBuilder()
                .setTitle('Math: Sub')
                .setDescription(`${num1} - ${num2} = ${num1 - num2}`)
                .setFooter({ text: `${interaction.user.username}` })
                .setTimestamp()
                .setColor('Purple')
        
            interaction.reply({embeds: [embed]});
        }

        if (subcommand === 'divide') {
            const num1 = interaction.options.get('first-number').value;
            const num2 = interaction.options.get('second-number').value;

            const embed = new EmbedBuilder()
                .setTitle('Math: Divide')
                .setDescription(`${num1} / ${num2} = ${num1 / num2}`)
                .setFooter({ text: `${interaction.user.username}` })
                .setTimestamp()
                .setColor('Purple')
        
            interaction.reply({embeds: [embed]});
        }

        if (subcommand === 'percentage') {
            const num1 = interaction.options.get('number').value;
            const num2 = interaction.options.get('percentage').value;

            const embed = new EmbedBuilder()
                .setTitle('Math: Percentage')
                .setDescription(`${num2}% of ${num1} = ${(num2 / 100) * num1}`)
                .setFooter({ text: `${interaction.user.username}` })
                .setTimestamp()
                .setColor('Purple')
        
            interaction.reply({embeds: [embed]});
        }

        if (subcommand === 'multiply') {
            const num1 = interaction.options.get('number').value;
            const num2 = interaction.options.get('multiply').value;

            const embed = new EmbedBuilder()
                .setTitle('Math: Multiply')
                .setDescription(`${num1} x ${num2} = ${num1 * num2}`)
                .setFooter({ text: `${interaction.user.username}` })
                .setTimestamp()
                .setColor('Purple')
        
            interaction.reply({embeds: [embed]});
        }
    },

    data: new SlashCommandBuilder()
        .setName('math')
        .setDescription('Do some math')
        .addSubcommand((subcommand) => subcommand
        .setName('sum')
        .setDescription('Sum 2 number')
        .addIntegerOption((option) => option
        .setName('first-number')
        .setDescription('First number to sum')
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName('second-number')
        .setDescription('Second number to sum')
        .setRequired(true)))

        .addSubcommand((subcommand) => subcommand
        .setName('sub')
        .setDescription('Sub 2 number')
        .addIntegerOption((option) => option
        .setName('first-number')
        .setDescription('First number to sub')
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName('second-number')
        .setDescription('Second number to sub')
        .setRequired(true)))
        
        .addSubcommand((subcommand) => subcommand
        .setName('divide')
        .setDescription('Divide 2 number')
        .addIntegerOption((option) => option
        .setName('first-number')
        .setDescription('First number to divide')
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName('second-number')
        .setDescription('Second number to divide')
        .setRequired(true)))

        .addSubcommand((subcommand) => subcommand
        .setName('percentage')
        .setDescription('Get the percentage of a number')
        .addIntegerOption((option) => option
        .setName('number')
        .setDescription('Total number')
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName('percentage')
        .setDescription('Percentage %')
        .setRequired(true)))

        .addSubcommand((subcommand) => subcommand
        .setName('multiply')
        .setDescription('Multiply a number')
        .addIntegerOption((option) => option
        .setName('number')
        .setDescription('Number to multiply')
        .setRequired(true))
        .addIntegerOption((option) => option
        .setName('multiply')
        .setDescription('Multiply by?')
        .setRequired(true))),
};