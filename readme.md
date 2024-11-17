# Discord Bot - A Discord Bot 🤖

Discord Bot is a powerful, customizable, and easy-to-use Discord bot made by **TeamSpark**. It includes various features like server management, user interaction, and fun utilities, all available through slash commands. This bot is designed to provide users with a seamless experience while interacting with a Discord server.

## Features 🌟

- **Slash commands** for bot interaction (e.g., `/ping`, `/userinfo`, `/setstatus`).
- Various **administrative commands** such as `/kick`, `/ban`, `/timeout`, and `/clear`.
- Fun and interactive commands like `/poll`, `/embed`, and `/emoji`.
- Customizable bot **presence** with commands like `/setstatus`.
- Interactive and visually appealing **embed messages** with emojis.
- **Credits system** for users to earn, check, and spend currency.
- **MongoDB** integration for storing and updating user balances.

## Prerequisites ⚙️

Before you get started, ensure that you have the following:

- A **Discord bot token** (you can create a bot on the [Discord Developer Portal](https://discord.com/developers/applications)).
- **Node.js** (v16.9.0 or higher) installed on your system. Download it from the [official Node.js website](https://nodejs.org/).
- A **text editor** like [VS Code](https://code.visualstudio.com/) for managing the code.

## Installation 🛠️

### Step 1: Clone the repository

Clone the repository to your local machine using the following command:

Copy code
``` bash
npm install
```
Step 3: Setup environment variables
Create a .env file in the root of the project directory and add your bot's token:

env
Copy code
```bash
TOKEN=your-bot-token-here
MONGO_URI=your-mongodb-connection-uri-hereStep
```
4: Run the bot
Start the bot by running the following command in your terminal:

bash
Copy code
```bash
node index.js
```
Once the bot is running, it will automatically register all slash commands with Discord and be ready for interaction.

Available Commands 📝
General Commands
/ping: 🏓 Checks the bot's response time.
/userinfo: 🧑‍💻 Displays information about a specific user.
/serverinfo: 📊 Displays information about the current server.
/setstatus: 🎮 Sets the bot's presence (status).

Administrative Commands
/kick: 🚪 Kicks a member from the server.
/ban: ❌ Bans a member from the server.
/timeout: ⏲️ Temporarily mutes a member for a set period.
/clear: 🧹 Clears a specified number of messages from a channel.

Fun Commands
/embed: 📌 Sends a customizable embed message.
/emoji: 😄 Displays a custom emoji.
/poll: 🗳️ Creates a poll in the current channel.

Currency Commands 💰
/balance: 💸 Displays your current credit balance.
/daily: 📅 Claims your daily credits.
/pay: 💸 Sends a specified amount of credits to another user.


Certainly! Below is an enhanced version of the README.md for your NQN Bot, which includes a credits and currency system integrated with MongoDB. This version includes code for a simple currency system (e.g., users can earn and spend credits), storing their balances in MongoDB.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Contributing 🤝
We welcome contributions from the community! If you have a feature request, bug fix, or improvement, please follow the steps below:

Fork the repository.
Create a new branch for your changes.
Make your changes.
Commit your changes.
Push to your forked repository.
Create a pull request.
Contact 📬
For any questions, feel free to reach out to the project maintainers.

Discord: https://discord.gg/f8DD9nA2J6
GitHub: TeamSpark GitHub