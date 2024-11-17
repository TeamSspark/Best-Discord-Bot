const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a user from the server')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('The user to ban')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('The reason for banning')
                .setRequired(false)),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply({ content: 'You don\'t have permission to ban members!', ephemeral: true });
        }

        const member = await interaction.guild.members.fetch(user.id);
        if (member) {
            await member.ban({ reason });
            return interaction.reply({ content: `Banned ${user.tag} for: ${reason}` });
        } else {
            return interaction.reply({ content: 'Could not find that user.', ephemeral: true });
        }
    },
};
