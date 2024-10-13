module.exports = async (interaction) => {
    try {
        if (interaction.isButton()) {
            const role = interaction.guild.roles.cache.get(interaction.customId);
            await interaction.deferReply({ ephemeral: true });
    
            if (!role) {
                return;
            }
    
            const hasRole = interaction.member.roles.cache.has(role.id);
    
            if (hasRole) {
                await interaction.editReply('You already verified');
                return;
            }
    
            await interaction.member.roles.add(role);
            await interaction.editReply('Verified');
        }
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}