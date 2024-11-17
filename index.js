const { Client, GatewayIntentBits, REST, Routes, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.log('❌ MongoDB connection error:', err));

// Discord Client Setup
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

// Command Collection
client.commands = new Collection();
const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

// Load Commands
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (!command.data || typeof command.data.toJSON !== 'function' || !command.execute) {
        console.warn(`⚠️ Skipping "${file}": Missing "data" or "execute" property, or "data" is not a valid SlashCommandBuilder.`);
        continue;
    }
    client.commands.set(command.data.name, command);
}

// Once Client Ready
client.once('ready', async () => {
    console.log('\n==============================');
    console.log('      Made by Team Spark      ');
    console.log('==============================');
    console.log(`✅ Logged in as ${client.user.tag}!`);

    // Register Slash Commands
    const commands = client.commands.map(command => command.data.toJSON());
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

    try {
        console.log('🚀 Registering slash commands...');
        await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
        console.log('✅ Slash commands registered successfully.');
    } catch (error) {
        console.error('❌ Error registering slash commands:', error);
    }

    // Log Loaded Commands
    console.log('\n📜 Loaded Commands:');
    console.log('==============================');
    client.commands.forEach(cmd => console.log(`✔️ ${cmd.data.name}`));
    console.log('==============================\n');

    // Set Bot Presence
    client.user.setPresence({
        status: 'online',
        activities: [
            {
                name: 'Best Bot | Made by Team Spark',
                type: 'WATCHING',
            }
        ],
    });
});

// Handle Interactions
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: '❌ There was an error while executing this command!', ephemeral: true });
    }
});

// Login
client.login(process.env.TOKEN);

// Add a non-removable "Team Spark" message
Object.defineProperty(global, 'MadeByTeamSpark', {
    value: 'This bot was made by Team Spark. All rights reserved.',
    writable: false,
    configurable: false,
    enumerable: false,
});
