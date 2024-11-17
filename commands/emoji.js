const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('emoji')
        .setDescription('Display a custom emoji')
        .addStringOption(option =>
            option.setName('emoji')
                .setDescription('The emoji to display')
                .setRequired(true)),
    async execute(interaction) {
        const emoji = interaction.options.getString('emoji');
        const emojiRegex = /<:\w+:(\d+)>/g;
        const match = emoji.match(emojiRegex);
        if (!match) {
            return interaction.reply({ content: 'Invalid emoji format! Please provide a valid emoji.', ephemeral: true });
        }

        const emojiID = match[0].split(':')[2].replace('>', '');
        const customEmoji = interaction.guild.emojis.cache.get(emojiID);

        if (customEmoji) {
            const embed = new EmbedBuilder()
                .setColor(0xFF0000)
                .setTitle('Emoji Information')
                .setDescription(`Here is your emoji: ${customEmoji}`)
                .addFields(
                    { name: 'Name', value: customEmoji.name, inline: true },
                    { name: 'ID', value: customEmoji.id, inline: true },
                    { name: 'URL', value: customEmoji.url, inline: true }
                )
                .setTimestamp();

            await interaction.reply({ embeds: [embed] });
        } else {
            await interaction.reply({ content: 'Could not find the emoji in this server.', ephemeral: true });
        }
    },
};
