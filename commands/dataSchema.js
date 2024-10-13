const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const testSchema = require("..//src/Schemas/test");
const ticketSchema = require("..//src/Schemas/ticketSchema");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("read-schema")
    .setDescription("Testing a schema"),
  run: async ({ interaction }) => {
    try {
      const data = await testSchema.find();

      var values = [];
      await data.forEach(async (d) => {
        values.push(d.name);
      });

      const embed = new EmbedBuilder()
        .setTitle("Database")
        .setDescription(`${values.join("\n")}`)
        .setFooter({ text: `${interaction.user.username}` })
        .setTimestamp()
        .setColor("Purple");

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      const embed = new EmbedBuilder()
        .setTitle("Database")
        .setDescription(`Database error or empty`)
        .setFooter({ text: `${interaction.user.username}` })
        .setTimestamp()
        .setColor("Purple");

      await interaction.reply({ embeds: [embed] });
    }
  },
};