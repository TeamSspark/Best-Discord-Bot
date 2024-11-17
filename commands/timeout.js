const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout (mute) a user')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to timeout')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('duration')
                .setDescription('The duration of the timeout in seconds')
                .setRequired(true)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const duration = interaction.options.getInteger('duration') * 1000;

        if (!interaction.member.permissions.has('MUTE_MEMBERS')) {
            return interaction.reply({ content: 'You don\'t have permission to mute members!', ephemeral: true });
        }

        const member = await interaction.guild.members.fetch(user.id);
        if (member) {
            await member.timeout(duration, 'Timed out by bot');
            return interaction.reply({ content: `Muted ${user.tag} for ${duration / 1000} seconds.` });
        } else {
            return interaction.reply({ content: 'Could not find that user.', ephemeral: true });
        }
    },
};
