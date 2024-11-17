const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('poll')
        .setDescription('Create a poll')
        .addStringOption(option =>
            option.setName('question')
                .setDescription('The question for the poll')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option1')
                .setDescription('First option')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option2')
                .setDescription('Second option')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('option3')
                .setDescription('Third option')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('option4')
                .setDescription('Fourth option')
                .setRequired(false)),
    async execute(interaction) {
        const question = interaction.options.getString('question');
        const options = [
            interaction.options.getString('option1'),
            interaction.options.getString('option2'),
            interaction.options.getString('option3'),
            interaction.options.getString('option4'),
        ].filter(option => option);

        let pollMessage = `**${question}**\n`;

        options.forEach((option, index) => {
            pollMessage += `\n${index + 1}. ${option}`;
        });

        const pollEmbed = {
            color: 0x0099ff,
            title: 'Poll',
            description: pollMessage,
            timestamp: new Date(),
        };

        const poll = await interaction.channel.send({ embeds: [pollEmbed] });

        for (let i = 0; i < options.length; i++) {
            await poll.react(`${i + 1}️⃣`);
        }

        await interaction.reply({ content: 'Poll created!', ephemeral: true });
    },
};
