const { SlashCommandBuilder } = require('discord.js');
const User = require('../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your current credit balance'),
    async execute(interaction) {
        const user = await User.findOne({ userId: interaction.user.id });
        if (!user) {
            await User.create({ userId: interaction.user.id });
            return interaction.reply('You don\'t have an account yet! Try using the `/daily` command to start earning credits.');
        }

        return interaction.reply(`💰 Your balance: **${user.balance} credits**`);
    },
};
