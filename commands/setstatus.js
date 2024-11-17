const { SlashCommandBuilder, ActivityType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setstatus')
        .setDescription('Sets the bot status')
        .addStringOption(option =>
            option.setName('status')
                .setDescription('The status to set (online, idle, dnd, invisible)')
                .setRequired(true)
        ),
    async execute(interaction, client) {
        try {
            await interaction.deferReply({ ephemeral: true });

            const status = interaction.options.getString('status');
            const validStatuses = ['online', 'idle', 'dnd', 'invisible'];

            if (!validStatuses.includes(status)) {
                return interaction.editReply({ content: 'Invalid status! Use one of: online, idle, dnd, invisible.' });
            }

            let statusType = null;
            switch (status) {
                case 'online':
                    statusType = 'online';
                    break;
                case 'idle':
                    statusType = 'idle';
                    break;
                case 'dnd':
                    statusType = 'dnd';
                    break;
                case 'invisible':
                    statusType = 'invisible';
                    break;
                default:
                    return interaction.editReply({ content: 'Invalid status!' });
            }

            await client.user.setPresence({
                status: statusType,
                activities: [{
                    name: 'Best Bot | Made By TeamSpark',
                    type: ActivityType.Playing,
                }]
            });

            await interaction.editReply({ content: `Bot status updated to **${status}**!` });

        } catch (error) {
            console.error(error);
            await interaction.editReply({ content: 'There was an error while executing this command!' });
        }
    },
};
