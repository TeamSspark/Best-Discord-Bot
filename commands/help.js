const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Displays a list of available commands with emojis.'),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Bot Commands Help')
            .setDescription('Here is a list of all available commands for this bot!')

            // General Commands Section
            .addFields(
                { name: '📝 General Commands', value: 'Use these commands for general interactions with the bot.' },
                { name: '/ping', value: '🏓 Checks the bot\'s response time.' },
                { name: '/userinfo', value: '🧑‍💻 Displays information about a specific user.' },
                { name: '/serverinfo', value: '📊 Displays information about the current server.' },
                { name: '/setstatus', value: '🎮 Sets the bot\'s presence (status).' },

                // Administrative Commands Section
                { name: '🔨 Administrative Commands', value: 'Use these commands to manage the server and members.' },
                { name: '/kick', value: '🚪 Kicks a member from the server.' },
                { name: '/ban', value: '❌ Bans a member from the server.' },
                { name: '/timeout', value: '⏲️ Temporarily mutes a member for a set period.' },
                { name: '/clear', value: '🧹 Clears a specified number of messages from a channel.' },

                // Fun Commands Section
                { name: '🎉 Fun Commands', value: 'Use these commands to engage users with fun activities.' },
                { name: '/embed', value: '📌 Sends a customizable embed message.' },
                { name: '/emoji', value: '😄 Displays a custom emoji.' },
                { name: '/poll', value: '🗳️ Creates a poll in the current channel.' },

                // Currency Commands Section
                { name: '💰 Currency Commands', value: 'Use these commands to manage credits and virtual currency.' },
                { name: '/balance', value: '💸 Displays your current credit balance.' },
                { name: '/daily', value: '📅 Claims your daily credits.' },
                { name: '/pay', value: '💸 Sends a specified amount of credits to another user.' }
            )
            .setFooter({ text: 'Use the commands as described!' });

        await interaction.reply({ embeds: [embed] });
    },
};
