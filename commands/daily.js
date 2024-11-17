const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily')
        .setDescription('Claim your daily reward!'),

    async execute(interaction) {
        await interaction.deferReply();

        const userId = interaction.user.id;

        try {
            let user = await User.findOne({ userId });

            if (!user) {
                user = new User({
                    userId,
                    balance: 0,
                    lastClaim: null,
                });
            }

            const currentDate = new Date();
            const lastClaimDate = user.lastClaim;

            if (lastClaimDate && lastClaimDate.toDateString() === currentDate.toDateString()) {
                return interaction.editReply({ content: 'You have already claimed your daily reward today!', ephemeral: true });
            }

            const randomAmount = Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000;

            user.balance += randomAmount;
            user.lastClaim = currentDate;

            await user.save();

            interaction.editReply({ content: `You have claimed your daily reward of ${randomAmount}! Your new balance is ${user.balance}.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.editReply({ content: 'There was an error while claiming your daily reward. Please try again later.', ephemeral: true });
        }
    }
};
