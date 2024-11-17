const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../models/User'); // assuming you're using a User model to store data

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pay')
        .setDescription('Pay some currency to another user!')
        .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to pay')
                .setRequired(true))
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('The amount of currency to pay')
                .setRequired(true)),

    async execute(interaction) {
        // Defer the reply to avoid the interaction timing out
        await interaction.deferReply();

        const payerId = interaction.user.id;
        const recipient = interaction.options.getUser('user');
        const amount = interaction.options.getInteger('amount');

        try {
            // Find the payer in the database
            let payer = await User.findOne({ userId: payerId });

            // If the payer doesn't exist in the database, create a new user
            if (!payer) {
                payer = new User({
                    userId: payerId,
                    balance: 0,
                    lastClaim: null,
                });
            }

            // Check if the payer has enough balance
            if (payer.balance < amount) {
                return interaction.editReply({ content: 'You do not have enough balance to make this payment.', ephemeral: true });
            }

            // Find the recipient in the database
            let recipientUser = await User.findOne({ userId: recipient.id });

            // If the recipient doesn't exist, create a new user
            if (!recipientUser) {
                recipientUser = new User({
                    userId: recipient.id,
                    balance: 0,
                    lastClaim: null,
                });
            }

            // Subtract the amount from the payer's balance
            payer.balance -= amount;

            // Add the amount to the recipient's balance
            recipientUser.balance += amount;

            // Save the changes to the database
            await payer.save();
            await recipientUser.save();

            // Respond to the payer
            interaction.editReply({ content: `You have successfully paid ${amount} to ${recipient.tag}. Your new balance is ${payer.balance}.`, ephemeral: true });
        } catch (error) {
            console.error(error);
            interaction.editReply({ content: 'There was an error while processing your payment. Please try again later.', ephemeral: true });
        }
    }
};
