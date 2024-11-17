const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('userinfo')
        .setDescription('Displays information about a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get information about')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const member = await interaction.guild.members.fetch(user.id);
        const embed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle(`${user.username} Information`)
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .addFields(
                { name: 'Username', value: user.username, inline: true },
                { name: 'ID', value: user.id, inline: true },
                { name: 'Discriminator', value: user.discriminator, inline: true },
                { name: 'Status', value: member.presence ? member.presence.status : 'offline', inline: true },
                { name: 'Joined At', value: member.joinedAt.toDateString(), inline: true }
            )
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
