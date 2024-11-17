const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  data: {
    name: 'help',
    description: 'Displays a help menu for all available commands.',
  },

  async execute(interaction) {
    // Check if it's a button interaction
    if (interaction.isButton()) {
      const category = interaction.customId;

      // Create embed for different categories
      let embed;
      if (category === 'general') {
        embed = new MessageEmbed()
          .setTitle('General Commands 📝')
          .addField('/ping', '🏓 Checks the bot\'s response time.')
          .addField('/userinfo', '🧑‍💻 Displays information about a specific user.')
          .addField('/serverinfo', '📊 Displays information about the current server.')
          .addField('/setstatus', '🎮 Sets the bot\'s presence (status).');
      } else if (category === 'admin') {
        embed = new MessageEmbed()
          .setTitle('Administrative Commands 🔧')
          .addField('/kick', '🚪 Kicks a member from the server.')
          .addField('/ban', '❌ Bans a member from the server.')
          .addField('/timeout', '⏲️ Temporarily mutes a member for a set period.')
          .addField('/clear', '🧹 Clears a specified number of messages from a channel.');
      } else if (category === 'fun') {
        embed = new MessageEmbed()
          .setTitle('Fun Commands 🎉')
          .addField('/embed', '📌 Sends a customizable embed message.')
          .addField('/emoji', '😄 Displays a custom emoji.')
          .addField('/poll', '🗳️ Creates a poll in the current channel.');
      } else if (category === 'currency') {
        embed = new MessageEmbed()
          .setTitle('Currency Commands 💰')
          .addField('/balance', '💸 Displays your current credit balance.')
          .addField('/daily', '📅 Claims your daily credits.')
          .addField('/pay', '💸 Sends a specified amount of credits to another user.');
      }

      // Send the embed response and remove buttons
      await interaction.update({
        content: `Here are the ${category.charAt(0).toUpperCase() + category.slice(1)} Commands:`,
        embeds: [embed],
        components: [], // Remove buttons after interaction
      });
    } else {
      // Create buttons for each category when the /help command is used
      const generalButton = new MessageButton()
        .setCustomId('general')
        .setLabel('General Commands')
        .setStyle('PRIMARY');

      const adminButton = new MessageButton()
        .setCustomId('admin')
        .setLabel('Administrative Commands')
        .setStyle('PRIMARY');

      const funButton = new MessageButton()
        .setCustomId('fun')
        .setLabel('Fun Commands')
        .setStyle('PRIMARY');

      const currencyButton = new MessageButton()
        .setCustomId('currency')
        .setLabel('Currency Commands')
        .setStyle('PRIMARY');

      // Row containing all the buttons
      const row = new MessageActionRow().addComponents(
        generalButton,
        adminButton,
        funButton,
        currencyButton
      );

      // Send a message with buttons when /help is used
      await interaction.reply({
        content: 'Click a button to view the command categories!',
        components: [row],
      });
    }
  },
};
