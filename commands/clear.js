const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear a number of messages from the channel')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('The number of messages to clear')
                .setRequired(true)),
    async execute(interaction) {
        const amount = interaction.options.getInteger('amount');

        if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
            return interaction.reply({ content: 'You don\'t have permission to manage messages!', ephemeral: true });
        }

        await interaction.channel.bulkDelete(amount, true);
        return interaction.reply({ content: `Successfully deleted ${amount} messages.` });
    },
};
