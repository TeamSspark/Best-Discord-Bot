const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Displays information about the server'),
    async execute(interaction) {
        const server = interaction.guild;
        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('Server Information')
            .setThumbnail(server.iconURL({ dynamic: true }))
            .addFields(
                { name: 'Server Name', value: server.name, inline: true },
                { name: 'Server ID', value: server.id, inline: true },
                { name: 'Member Count', value: server.memberCount.toString(), inline: true },
                { name: 'Owner', value: `<@${server.ownerId}>`, inline: true },
                { name: 'Region', value: server.preferredLocale, inline: true },
                { name: 'Created At', value: server.createdAt.toDateString(), inline: true }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
