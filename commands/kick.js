const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a user from the server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to kick')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for kicking')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            return interaction.reply({ content: 'You don\'t have permission to kick members!', ephemeral: true });
        }

        const member = await interaction.guild.members.fetch(user.id);
        if (member) {
            await member.kick(reason);
            return interaction.reply({ content: `Kicked ${user.tag} for: ${reason}` });
        } else {
            return interaction.reply({ content: 'Could not find that user.', ephemeral: true });
        }
    },
};
